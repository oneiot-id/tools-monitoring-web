// import { IDataHistory } from "../types/IDataHistory";
import filterIcon from "/icons/filter w.png";
import exportIcon from "/icons/export w.png";
import arrow from "/icons/down-arr.png";

import { IDataTable } from "../types/IDataHistory";
import { padDate } from "../helper/datehelper";
import { useEffect, useState } from "react";

import * as xlsx from "xlsx";
import { IMonitoringData, ITableData } from "../types/IMonitoringData";
import FilterWindow from "./FilterWindow";
import { deleteAllData, deleteData } from "../utils/database";
import trashIcon from "/icons/trash.png";

export default function DataHistoryTable(props: IDataTable) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [data, setData] = useState<IMonitoringData[]>([
    {
      timestamp: "",
      value: 0,
    },
  ]);

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const exportData = () => {
    if (data == null) return;

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
        Value: `${v.value}${props.suffix}`,
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

  return (
    <div
      className={`bg-[#FAFAFA] lg:max-w-[530px] w-full h-max 
                    box-sh rounded-[1.25rem] md:p-[1.875rem] p-[0.75rem] pt-[1.875rem] md:pb-0 pb-0 mb-5`}
    >
      {showConfirmation && (
        <div
          className={`${
            showConfirmation ? "slide-down" : "slide-up"
          } slide-down bg-black-transparent w-full h-full fixed top-0 left-0 
                        z-[100] flex items-center justify-center `}
        >
          <div className="flex flex-col bg-white max-w-[300px] h-[375px] md:w-full w-[75%] rounded-xl px-[25px] justify-evenly items-center">
            <img src={trashIcon} alt="" className="w-[75px] h-[75px]" />
            <p>
              Apakah Anda yakin untuk menghapus seluruh data pada{" "}
              <span className="font-bold">{props.title}?</span>
            </p>
            <div className="text-white font-bold flex flex-row justify-evenly w-full">
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await deleteAllData(props.link);
                  props.refresh();
                  setShowConfirmation(false);
                }}
                className="bg-[#3DBC06] min-w-[70px] px-3 py-2 rounded-lg hover:opacity-70 transition-all duration-200"
              >
                Ya
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirmation(false);
                }}
                className="bg-[#E3210C]  min-w-[70px] px-3 py-2 rounded-lg hover:opacity-70 transition-all duration-200 text-center"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={(_) => setFilterExpanded(false)}
        className={`bg-transparent top-0 left-0 w-full h-full ${
          filterExpanded ? "absolute" : "hidden"
        }`}
      ></div>
      <div className="flex flex-row mb-5 md:mb-[1.875rem] items-center">
        <div className="flex w-full font-bold md:text-[1.5rem] text-[1.2rem] flex-1 items-start justify-start">
          <h1>{props.title}</h1>
        </div>
        {!isExpanded && (
          <div
            className="rotate-180"
            style={{ cursor: "pointer" }}
            onClick={(_) => setIsExpanded(!isExpanded)}
          >
            <img
              src={arrow}
              alt=""
              className="hover:p-2 hover:bg-slate-300 rounded-xl transition-all duration-[300ms]"
            />
          </div>
        )}
        {isExpanded && (
          <div className="flex flex-row justify-end  gap-[0.875rem] overflow-visible">
            <div
              onClick={async (_) => {
                //delete all firebase data
                console.log(props.link);
                setShowConfirmation(true);
              }}
              style={{ cursor: "pointer" }}
              className="bg-[#E3210C] hover:bg-[#e3220cce] transition-all duration-200 md:w-[75px] w-[30px] h-[30px] rounded-lg flex items-center justify-center"
            >
              <p className="text-white hidden md:block">Delete</p>
              <p className="text-white md:hidden">D</p>
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={(_) => setFilterExpanded(!filterExpanded)}
              className="flex items-center justify-center rounded-lg bg-[#414FF4] hover:bg-[#3a47d5] transition-all duration-200 w-[30px] h-[30px]"
            >
              <img src={filterIcon} alt="" className="w-[18px] h-[18px] " />
            </div>
            <div
              onClick={(_) => exportData()}
              style={{ cursor: "pointer" }}
              className="flex items-center justify-center rounded-lg bg-[#414FF4] hover:bg-[#3a47d5] transition-all duration-200 w-[30px] h-[30px]"
            >
              <img src={exportIcon} alt="" className="w-[18px] h-[18px] " />
            </div>

            <FilterWindow
              data={props.data}
              setData={setData}
              visible={filterExpanded}
            />
          </div>
        )}
      </div>

      {isExpanded && (
        <div
          className="flex flex-col bg-[#F7F9FA] box-sh-sm w-full max-h-[445px] h-[445px] rounded-xl md:py-[1.55rem] py-[1.25rem] 
                                md:px-[2.25rem] px-[1.6rem] overflow-y-auto gap-5"
        >
          <div
            className="flex flex-row items-center justify-between 
                        w-full h-[55px] rounded-xl
                        font-semibold mb-[0.75rem]
                        "
          >
            <p className="flex flex-row items-end justify-start min-w-[85px]">
              Tanggal
            </p>
            <p className="flex-1">Waktu</p>
            <p className="flex flex-row items-end justify-end min-w-[60px]">
              Value
            </p>
          </div>

          {data?.map((d, index) => {
            return (
              <DataHistoryTableData
                key={index}
                suffix={props.suffix}
                timestamp={d.timestamp}
                value={d.value}
                link={props.link}
                refresh={props.refresh}
              />
            );
          })}
        </div>
      )}

      {isExpanded && (
        <div
          onClick={(_) => setIsExpanded(!isExpanded)}
          style={{ cursor: "pointer" }}
          className="w-full h-full flex items-center justify-center py-3"
        >
          <img
            src={arrow}
            alt=""
            className="hover:p-2 hover:bg-slate-300 rounded-xl transition-all duration-[300ms]"
          />
        </div>
      )}
    </div>
  );
}

function DataHistoryTableData({
  timestamp,
  value,
  suffix,
  link,
  refresh,
}: ITableData) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <div
      onClick={(_) => {
        setIsExpanded(!isExpanded);
      }}
      style={{ cursor: "pointer" }}
      className="flex flex-row w-full justify-between items-center gap-4"
    >
      {showConfirmation && (
        <div
          className={`${
            showConfirmation ? "slide-down" : "slide-up"
          } slide-down bg-black-transparent w-full h-full fixed top-0 left-0 
                        z-[100] flex items-center justify-center `}
        >
          <div className="flex flex-col bg-white max-w-[300px] h-[375px] md:w-full w-[75%] rounded-xl px-[25px] justify-evenly items-center">
            <img src={trashIcon} alt="" className="w-[75px] h-[75px]" />
            <p>Apakah Anda yakin untuk menghapus 1 data?</p>
            <div className="text-white font-bold flex flex-row justify-evenly w-full">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteData(link, timestamp.toString());
                  refresh();
                  setShowConfirmation(false);
                }}
                className="bg-[#3DBC06] min-w-[70px] px-3 py-2 rounded-lg hover:opacity-70 transition-all duration-200"
              >
                Ya
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirmation(false);
                }}
                className="bg-[#E3210C]  min-w-[70px] px-3 py-2 rounded-lg hover:opacity-70 transition-all duration-200 text-center"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
      {isExpanded && (
        <div
          onClick={async (_) => {
            //delete the firebase data
            setShowConfirmation(true);
          }}
          style={{ cursor: "pointer" }}
          className="bg-[#E3210C]  hover:bg-[#e3220cce] transition-all duration-200 text-white rounded-xl "
        >
          <p className="px-[10px]">Delete</p>
        </div>
      )}
      {!isExpanded && (
        <p className="min-w-[85px]">{`${padDate(
          new Date(timestamp).getDate()
        )}/${padDate(new Date(timestamp).getMonth() + 1)}/${padDate(
          new Date(timestamp).getFullYear()
        )}`}</p>
      )}

      <p className="flex items-end min-w-[80px] justify-end">{`${padDate(
        new Date(timestamp).getHours()
      )}:${padDate(new Date(timestamp).getMinutes())}:${padDate(
        new Date(timestamp).getSeconds()
      )}`}</p>
      <p className="min-w-[60px] flex justify-end">{`${value.toFixed(1)}${
        suffix != null ? suffix : ""
      }
      `}</p>
    </div>
  );
}
