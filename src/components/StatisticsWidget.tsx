import { IMonitoringData, IStatistics } from "../types/IMonitoringData";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import * as xlsx from "xlsx";
import filterIcon from "/icons/filter (1).png";
import exportIcon from "/icons/export 2.png";
import { IStatisticsFiltering } from "../types/IStatisticsFiltering";


export default function StatisticsWidget(props: IStatistics) {
  const [data, setData] = useState<IMonitoringData[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState<IStatisticsFiltering>({
    startDate: undefined,
    endDate: undefined,
    startTime: undefined,
    endTime: undefined,
  });

  const [filterValue, setFilterValue] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  const [disableApplyFilterButton, setDisableApplyFilterButton] =
    useState(true);

    useEffect(() => {
        const formattedData = props.datas.map((v) => ({
          ...v,
          timestamp: `${new Date(v.timestamp).getHours().toString().padStart(2, "0")}:${new Date(v.timestamp).getMinutes().toString().padStart(2, "0")}:${new Date(v.timestamp).getSeconds().toString().padStart(2, "0")}`,
        }));
        setData(formattedData);
      
        const disable =
          filterValue.startTime === "" ||
          filterValue.endTime === "" ||
          filterValue.startDate === "" ||
          filterValue.endDate === "";
        setDisableApplyFilterButton(disable);

      }, [props.datas, filterValue]);
      
  const applyFilter = () => {
    const startUnix = filter.startDate ? filter.startDate.getTime() : 0;
    
    const startTimeMillis = filter.startTime
      ? (filter.startTime.getHours() * 3600 +
          filter.startTime.getMinutes() * 60) *
        1000
      : 0;   

    const endUnix = filter.endDate ? filter.endDate.getTime() : 0;
    const endTimeMillis = filter.endTime
      ? (filter.endTime.getHours() * 3600 + filter.endTime.getMinutes() * 60) *
        1000
      : 0;

    const startTime = startUnix + startTimeMillis - 25200000;
    const endTime = endUnix + endTimeMillis - 25200000;


    let newData = props.datas.filter((d) => {
      const t = d.timestamp as Date;
      const dataTime = t.getTime();

      return dataTime >= startTime && dataTime <= endTime;
    });

    setData(newData); // Set the filtered data
  };

  const clearFilter = () => {
    const formattedData = props.datas.map((v) => ({
      ...v,
      timestamp: `${new Date(v.timestamp)
        .getHours()
        .toString()
        .padStart(2, "0")}:${new Date(v.timestamp)
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${new Date(v.timestamp)
        .getSeconds()
        .toString()
        .padStart(2, "0")}`,
    }));

    setFilterValue({
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    });

    setDisableApplyFilterButton(false);
    setData(formattedData);
  };

  const filterTemporary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.name;
    const value = e.target.value;

    const newValue = target.includes("Date")
      ? new Date(value)
      : new Date(Date.parse(`01 Jan 1970 ${value}:00`));

    setFilter((prev) => ({
      ...prev,
      [target]: newValue,
    }));

    setFilterValue((prev) => ({
      ...prev,
      [target]: value,
    }));
  };

  const exportData = () => {
    const wb = xlsx.utils.book_new();
    const excelData = data.map((v) => {
      const timestamp = new Date(v.timestamp);
      return {
        Date: `${timestamp.getDate()}/${
          timestamp.getMonth() + 1
        }/${timestamp.getFullYear()}`,
        Timestamp: `${String(timestamp.getHours()).padStart(2, "0")}:${String(
          timestamp.getMinutes()
        ).padStart(2, "0")}:${String(timestamp.getSeconds()).padStart(2, "0")}`,
        Value: v.value,
      };
    });

    const ws = xlsx.utils.json_to_sheet(excelData);
    const date = new Date();
    const details = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    };

    const fileName = `${props.title} ${details.year}-${String(
      details.month
    ).padStart(2, "0")}-${String(details.date).padStart(2, "0")} ${String(
      details.hour
    ).padStart(2, "0")}-${String(details.minute).padStart(2, "0")}-${String(
      details.second
    ).padStart(2, "0")}.xlsx`;

    xlsx.utils.book_append_sheet(wb, ws, `${props.title}`);
    xlsx.writeFile(wb, fileName);
  };



  const date = new Date();

  return (
    <div className="flex flex-col bg-[#FAFAFA] w-max-[535px] lg:w-[535px] h-fit rounded-[1.25rem] py-[0.95rem] px-[1.5rem] w-[100%]">
      <div
        onClick={() => setIsFilterOpen(false)}
        className={`${
          isFilterOpen ? "visible" : "hidden"
        } w-[100vw] h-[100vh] bg-transparent fixed left-0 top-0 z-0`}
      ></div>
      <div className="flex flex-row justify-center flex-grow">
        <div className="flex-1"></div>
        <h1 className="flex-[2] font-bold items-center text-center text-[1rem]">
          {props.title}
        </h1>
        <div className="flex flex-row flex-1 justify-end">
          {/* Filtering */}
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center bg-[#EDEDED] w-[1.5rem] h-[1.5rem] rounded-[100%] hover:bg-[#cbcaca] transition-all duration-200"
          >
            <img src={filterIcon} alt="" className="w-[18px] h-[18px]" />
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => exportData()}
            className="flex items-center justify-center bg-[#EDEDED] w-[1.5rem] h-[1.5rem] rounded-[100%] ml-5 hover:bg-[#cbcaca] transition-all duration-200"
          >
            <img src={exportIcon} alt="" className="w-[18px] h-[18px]" />
          </div>

          <div
            className={`absolute flex flex-col gap-[0.8rem] bg-[#FAFAFA] 
                        shadow-lg w-[197px] h-[373px] rounded-xl transform translate-y-12 z-10 
                        py-[0.8rem] px-[1rem]
                        ${isFilterOpen ? "visible" : "hidden"}
                        duration-200`}
          >
            <h1 className="font-bold text-[1rem]">Filter</h1>
            <div className="flex flex-col items-start text-[0.8rem] justify-evenly h-full flex-grow">
              <p className="">Start Date</p>
              <input
                className="filter-date w-full"
                value={filterValue.startDate}
                type="date"
                name="startDate"
                id=""
                onChange={filterTemporary}
                max={`${date.getFullYear()}-${
                  date.getMonth() + 1
                }-${date.getDate()}`}
              />
              <p className="">End Date</p>
              <input
                className="filter-date w-full"
                value={filterValue.endDate}
                type="date"
                name="endDate"
                id=""
                onChange={filterTemporary}
                max={`${date.getFullYear()}-${
                  date.getMonth() + 1
                }-${date.getDate()}`}
              />
              <p className="">Start Time</p>
              <input
                className="filter-date w-full"
                value={filterValue.startTime}
                type="time"
                name="startTime"
                id=""
                onChange={filterTemporary}
              />
              <p className="">End Time</p>
              <input
                value={filterValue.endTime}
                className="filter-date w-full"
                type="time"
                name="endTime"
                id=""
                onChange={filterTemporary}
              />
            </div>
            <div className="flex gap-5">
              <button
                onClick={clearFilter}
                className="bg-[#bdbdbd] w-[72px] h-[40px] self-center py-0 text-white 
                        rounded-[1.15rem] text-[0.85rem] 
                        hover:bg-[#908f8f] transition-all duration-300"
              >
                Clear
              </button>

              <button
                disabled={disableApplyFilterButton}
                onClick={applyFilter}
                className="bg-[#3DBC06] w-[72px] h-[40px] self-center py-0 text-white 
                        rounded-[1.15rem] text-[0.85rem] 
                        hover:bg-[#309903] transition-all duration-300 disabled:bg-[#bdbdbd]"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[100%] h-[250px] my-[1rem] max-h-[400px] items-center justify-center">
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ transform: "translateX(-1.5rem)" }}
        >
          <LineChart
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="timestamp" style={{ fontSize: "0.75rem" }} />
            <YAxis style={{ fontSize: "0.75rem" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <StatisticsDetails data={data} />
    </div>
  );
}

interface StatisticsDetailsProps {
  data: IMonitoringData[];
}

function StatisticsDetails({ data }: StatisticsDetailsProps) {
  const [details, setDetails] = useState({
    min: 0,
    max: 0,
    avg: 0,
    now: 0,
  });

  const calculateStatistics = () => {
    const values = data.map((v) => v.value);

    if (data.length === 0) return;

    let sum = 0;
    values.forEach((v) => {
      sum += v;
    });

    const dataLength = data.length;
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const avgValue = sum / dataLength;
    const nowValue = values[dataLength - 1];

    setDetails({
      min: minValue,
      max: maxValue,
      avg: avgValue,
      now: nowValue,
    });
  };

  useEffect(() => {
    calculateStatistics();
  }, [data]);

  return (
    <div className="flex flex-row justify-evenly">
      <div>
        <p className="value">{details.min.toFixed(1)}</p>
        <p className="info">Min</p>
      </div>
      <div>
        <p className="value">{details.max.toFixed(1)}</p>
        <p className="info">Max</p>
      </div>
      <div>
        <p className="value">{details.now.toFixed(1)}</p>
        <p className="info">Now</p>
      </div>
      <div>
        <p className="value">{details.avg.toFixed(1)}</p>
        <p className="info">Avg</p>
      </div>
    </div>
  );
}
