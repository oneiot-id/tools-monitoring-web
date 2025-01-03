import { useEffect, useState } from "react";
import arrowIcon from "/icons/right-arrow.png";
import { IAlarmData } from "../types/IMonitoringData";
import FilterOneDay from "./FilterOneDay";
import { getAllAlarms } from "../utils/database";
import { padDate } from "../helper/datehelper";

export interface IMobileAlarm {
  show: (show: boolean) => void;
}

export default function MobileAlarm(props: IMobileAlarm) {
  const [originalData, setOriginalData] = useState<IAlarmData[]>([]);
  const [alarmData, setAlarmData] = useState<IAlarmData[]>([]);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [dateNow, setDateNow] = useState("");
  const [filterReady, setFilterReady] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const fetchAllarmData = async () => {
    const data = await getAllAlarms();
    const timestamp = data[data.length - 1]?.timestamp;
    setOriginalData(data);
    if (!alarmData.length) {
      setAlarmData(data);
      localStorage.setItem("alarm-timestamp", JSON.stringify(timestamp));
    }
    setFilterReady(true);
  };

  useEffect(() => {
    fetchAllarmData();
  }, []);

  useEffect(() => {}, [expanded]);

  return (
    <div
      className={`fixed pt-12 md:hidden bottom-0 left-0 w-full h-[100vh] bg-white z-[100] transition-all duration-500 
                  flex flex-col items-start p-6 gap-6 font-bold text-[1.5rem] ${
                    expanded ? "slide-down" : "slide-up"
                  }`}
    >
      <div className="flex w-full justify-between items-center">
        <h1 className="text-[1.75rem] font-bold">Alarm</h1>
        <img
          onClick={async () => {
            setExpanded(false);
            setTimeout(() => {
              props.show(false);
            }, 400);
          }}
          src={arrowIcon}
          alt="Toggle"
          className={`w-[25px]  transition-all duration-500 cursor-pointer rotate-180 ${
            expanded ? "rotate-0-anim" : "rotate-180-anim"
          }`}
        />
      </div>
      <div className="flex items-start justify-between w-full">
        <div
          onClick={() => setFilterExpanded(!filterExpanded)}
          className="flex bg-black text-white text-[0.875rem] font-bold px-4 py-2 rounded-xl cursor-pointer hover:opacity-70"
        >
          {dateNow || "Filter by Date"}
        </div>
        {filterReady && (
          <FilterOneDay
            data={originalData}
            setData={setAlarmData}
            visible={filterExpanded}
            onDateChange={setDateNow}
          />
        )}
      </div>
      <div className="flex flex-col w-full gap-4 overflow-y-auto">
        {alarmData
          .slice()
          .reverse()
          .map((alarm, index) => (
            <MobileSideAlarmData key={index} {...alarm} />
          ))}
      </div>
    </div>
  );
}

enum MobileSideAlarmType {
  Ok = "#6BD68B",
  Warning = "#FCEAA3",
  Danger = "#E3210C",
}

function MobileSideAlarmData(props: IAlarmData) {
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [textColor, setTextColor] = useState("#000000");

  useEffect(() => {
    if (props.type.toLowerCase() === "warning") {
      setTextColor("#000000");
      setBgColor(MobileSideAlarmType.Warning);
    } else if (props.type.toLowerCase() === "danger") {
      setTextColor("#FFFFFF");
      setBgColor(MobileSideAlarmType.Danger);
    } else {
      setTextColor("#000000");
      setBgColor(MobileSideAlarmType.Ok);
    }
  }, [props]);

  return (
    <div
      style={{ backgroundColor: bgColor, color: textColor }}
      className="flex w-full p-4 rounded-xl gap-4 items-center"
    >
      <div className="flex-1 text-start">
        <h1 className="text-[1rem] font-bold">{props.alarm}</h1>
        <p className="text-[0.875rem]">{props.description}</p>
      </div>
      <div>
        <p className="text-[0.75rem]">
          {`${padDate(new Date(props.timestamp).getHours())}:${padDate(
            new Date(props.timestamp).getMinutes()
          )}:${padDate(new Date(props.timestamp).getSeconds())}`}
        </p>
      </div>
    </div>
  );
}
