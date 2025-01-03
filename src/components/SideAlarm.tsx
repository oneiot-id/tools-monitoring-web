import { useEffect, useState } from "react";
import arrowIcon from "/icons/right-arrow.png";
import { IAlarmData } from "../types/IMonitoringData";
import { getAllAlarms } from "../utils/database";
import { padDate } from "../helper/datehelper";
import FilterOneDay from "./FilterOneDay";
// import filterIcon from '/icons/fil'

const width = 360;

export default function SideAlarm() {
  const [originalData, setOriginalData] = useState<IAlarmData[]>([
    {
      timestamp: "",
      alarm: "",
      type: "",
      description: "",
      refresh: function (): void {
        throw new Error("Function not implemented.");
      },
    },
  ]);
  const [alarmData, setAlarmData] = useState<IAlarmData[]>();
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [dateNow, setDateNow] = useState("");
  const [filterReady, setFilterReady] = useState(false);

  const fetchAllarmData = async () => {
    const data = await getAllAlarms();
    const timestamp = data[data.length - 1].timestamp;

    setOriginalData(data);
    if (alarmData == null) {
      setAlarmData(data);
      // console.log(timestamp);
      localStorage.setItem("alarm-timestamp", JSON.stringify(timestamp));
    }
    setFilterReady(true);
  };

  useEffect(() => {
    fetchAllarmData();
  }, [alarmData]);

  return (
    <div
      style={{
        transform: expanded ? "translateX(0px)" : `translateX(${width}px)`,
      }}
      className={`md:flex hidden fixed top-auto right-0 h-[100vh] w-max 
                        items-center justify-center z-[100] 
                        transition-all duration-500 ease-in-out`}
    >
      <div
        className={`flex flex-row h-full justify-center items-center w-full`}
      >
        <div
          onClick={() => setExpanded(!expanded)}
          style={{ cursor: "pointer" }}
          className="flex items-center justify-center rounded-tl-xl rounded-bl-xl bg-[#FAFAFA] h-[135px] w-[40px] box-sh-sm"
        >
          <img
            src={arrowIcon}
            alt=""
            className={`w-[25px] ${
              !expanded ? "rotate-90" : "-rotate-90"
            } transition-all duration-500`}
          />
        </div>
        <div
          style={{ width: `${width}px` }}
          className={`flex flex-col py-8 px-6 gap-6 bg-[#FAFAFA] rounded-[1.2rem] max-w-[380px] max-h-[576px] h-[576px] box-sh-sm`}
        >
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-bold text-[1.2rem]">Alarm</h1>
            <div className="flex items-start justify-end">
              <div
                style={{ cursor: "pointer" }}
                className="flex bg-[#0C0C0C] w-[90px] min-w-max h-[28px] text-white font-bold p-4 items-center justify-center 
                          rounded-xl text-[.75rem] hover:opacity-70 transition-all duration-200"
                onClick={() => setFilterExpanded(!filterExpanded)}
              >
                {dateNow}
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
          </div>
          <div className="block h-full w-full overflow-y-auto justify-center items-start">
            <div className="overflow-y gap-6  flex flex-col">
              {alarmData != undefined &&
                alarmData
                  .slice()
                  .reverse()
                  .map((alarm, index) => {
                    return <SideAlarmData key={index} {...alarm} />;
                  })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

enum SideAlarmType {
  "Ok" = "#6BD68B",
  "Warning" = "#FCEAA3",
  "Danger" = "#E3210C",
}

function SideAlarmData(props: IAlarmData) {
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    if (props.type.toLowerCase() == "warning") {
      setTextColor("#000000");
      setBgColor(SideAlarmType["Warning"]);
    } else if (props.type.toLowerCase() == "danger") {
      setTextColor("#FFFFFF");
      setBgColor(SideAlarmType["Danger"]);
    } else {
      setTextColor("#000000");
      setBgColor(SideAlarmType["Ok"]);
    }
  }, [props]);

  return (
    <div
      style={{ backgroundColor: `${bgColor}` }}
      className="flex flex-row w-full h-[80px]  gap-3 rounded-xl px-4 py-5"
    >
      <div
        style={{ color: textColor }}
        className="flex flex-col items-start flex-1 justify-evenly text-start"
      >
        <h1 className="font-bold text-[0.875rem]">{props.alarm}</h1>
        <p className="text-[0.75rem]">{props.description}</p>
      </div>
      <div
        style={{ color: textColor }}
        className="flex h-full items-center justify-center "
      >
        <p className="text-[0.625rem]">{`${padDate(
          new Date(props.timestamp).getHours()
        )}:${padDate(new Date(props.timestamp).getMinutes())}:${padDate(
          new Date(props.timestamp).getSeconds()
        )}`}</p>
      </div>
    </div>
  );
}
