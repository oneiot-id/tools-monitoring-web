import { useEffect, useState } from "react";
import { IAlarmData } from "../types/IMonitoringData";

export interface IFilterOneDay {
  data: IAlarmData[];
  setData: (newData: IAlarmData[]) => void;
  visible: boolean;
  onDateChange: (formattedDate: string) => void;
}

const date = new Date();

export default function FilterOneDay(props: IFilterOneDay) {
  const [disableApplyFilterButton, setDisableApplyFilterButton] =
    useState(true);

  const [filterDate, setFilterDate] = useState<string>(
    localStorage.getItem("filterDate") || ""
  );

  useEffect(() => {
    applyFilterOnce()
  }, []);

  useEffect(() => {
    setDisableApplyFilterButton(filterDate === "");
  }, [filterDate]);

  const applyFilter = () => {
    const selectedDate = new Date(filterDate);
    const startTime = selectedDate.setHours(0, 0, 0, 0);
    const endTime = selectedDate.setHours(23, 59, 59, 999);

    const newData = props.data.filter((d) => {
      const dataTime = new Date(d.timestamp).getTime();
      return dataTime >= startTime && dataTime <= endTime;
    });

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "short",
    };
    const formattedDate = selectedDate.toLocaleDateString("id-ID", options);

    props.setData(newData);
    props.onDateChange(formattedDate);
    localStorage.setItem("filterDate", filterDate);
  };

  const applyFilterOnce = () => {
    const today = new Date();
    const startTime = today.setHours(0, 0, 0, 0);
    const endTime = today.setHours(23, 59, 59, 999);

    const newData = props.data.filter((d) => {
      const dataTime = new Date(d.timestamp).getTime();
      return dataTime >= startTime && dataTime <= endTime;
    });

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "short",
    };
    const formattedDate = today.toLocaleDateString("id-ID", options);

    props.setData(newData);
    props.onDateChange(formattedDate);
    localStorage.setItem("filterDate", today.toISOString().split("T")[0]);

    // console.log('Apply once');
    
  };

  const clearFilter = () => {
    const today = new Date();
    const startTime = today.setHours(0, 0, 0, 0);
    const endTime = today.setHours(23, 59, 59, 999);

    const newData = props.data.filter((d) => {
      const dataTime = new Date(d.timestamp).getTime();
      return dataTime >= startTime && dataTime <= endTime;
    });

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "short",
    };
    const formattedDate = today.toLocaleDateString("id-ID", options);

    setFilterDate("");
    props.setData(newData);
    props.onDateChange(formattedDate);
    localStorage.removeItem("filterDate");
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(e.target.value);
  };

  return (
    <div
      className={`absolute flex flex-col gap-[0.8rem] bg-[#FAFAFA] 
                        shadow-lg w-[197px] h-[200px] rounded-xl translate-y-12 z-10 
                        py-[0.8rem] px-[1rem]
                        duration-200 ${props.visible ? "absolute" : "hidden"}`}
    >
      <h1 className="font-bold text-[1rem]">Filter</h1>
      <div className="flex flex-col items-start text-[0.8rem] justify-evenly h-full flex-grow">
        <p className="">Date</p>
        <input
          className="filter-date w-full"
          value={filterDate}
          type="date"
          name="filterDate"
          id=""
          onChange={handleDateChange}
          max={`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`}
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
