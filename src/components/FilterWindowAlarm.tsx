import { useEffect, useState } from "react";
import { IStatisticsFiltering } from "../types/IStatisticsFiltering";
import { IAlarmData } from "../types/IMonitoringData";

export interface IFilterWindow {
  data: IAlarmData[];
  setData: (newData: IAlarmData[]) => void;
  visible: boolean;
}

export interface IFiltering {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

const date = new Date();

export default function FilterWindowAlarm(props: IFilterWindow) {
  const [disableApplyFilterButton, setDisableApplyFilterButton] =
    useState(true);

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

  useEffect(() => {
    const disable =
      filterValue.startTime === "" ||
      filterValue.endTime === "" ||
      filterValue.startDate === "" ||
      filterValue.endDate === "";
    setDisableApplyFilterButton(disable);
  }, [filterValue]);

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

    let newData = props.data.filter((d) => {
      const t = d.timestamp as Date;
      const dataTime = t.getTime();

      return dataTime >= startTime && dataTime <= endTime;
    });

    console.log(newData)
    props.setData(newData)
    // props.setFilterExpanded(false);
  };

  const clearFilter = () => {
    // const formattedData = props.data.map((v) => ({
    //   ...v,
    //   timestamp: `${new Date(v.timestamp)
    //     .getHours()
    //     .toString()
    //     .padStart(2, "0")}:${new Date(v.timestamp)
    //     .getMinutes()
    //     .toString()
    //     .padStart(2, "0")}:${new Date(v.timestamp)
    //     .getSeconds()
    //     .toString()
    //     .padStart(2, "0")}`,
    // }));

    setFilterValue({
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    });

    setDisableApplyFilterButton(false);
    props.setData(props.data);
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

  return (
    <div
      className={`absolute flex flex-col gap-[0.8rem] bg-[#FAFAFA] 
                        shadow-lg w-[197px] h-[373px] rounded-xl translate-y-12 z-10 
                        py-[0.8rem] px-[1rem]
                        duration-200 ${props.visible ? "absolute" : "hidden"}`}
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
          max={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
        />
        <p className="">End Date</p>
        <input
          className="filter-date w-full"
          value={filterValue.endDate}
          type="date"
          name="endDate"
          id=""
          onChange={filterTemporary}
          max={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
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
  );
}
