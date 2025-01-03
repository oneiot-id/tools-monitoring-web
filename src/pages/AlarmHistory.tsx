import PageContainer from "../components/PageContainer";
import filterIcon from "/icons/filter w.png";
import exportIcon from "/icons/export w.png";
import deleteIcon from "/icons/bin.png";
import { AlarmType, IAlarmData } from "../types/IMonitoringData";
import { useEffect, useState } from "react";
// import {  } from "../helper/dummydata";
import { padDate } from "../helper/datehelper";
import FilterWindowAlarm from "../components/FilterWindowAlarm";
import * as xlsx from "xlsx";
import { deleteAlarm, deleteAllData, getAllAlarms } from "../utils/database";
import alarmIcon from "/icons/bell-ring b.png";

export default function AlarmHistory() {
  const [originalData, setOriginalData] = useState<IAlarmData[]>([]);
  const [data, setData] = useState<IAlarmData[]>([]);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = async () => {
    const alarms = await getAllAlarms();

    setOriginalData(alarms);
    setData(alarms);
  };

  const exportData = () => {
    if (!data || data.length === 0) return; // Ensure data is valid

    const wb = xlsx.utils.book_new();

    console.log(data);

    const excelData = data.map((v) => {
      const timestamp = new Date(v.timestamp);

      return {
        Date: `${String(timestamp.getDate()).padStart(2, "0")}/${String(
          timestamp.getMonth() + 1
        ).padStart(2, "0")}/${timestamp.getFullYear()}`,
        Timestamp: `${String(timestamp.getHours()).padStart(2, "0")}:${String(
          timestamp.getMinutes()
        ).padStart(2, "0")}:${String(timestamp.getSeconds()).padStart(2, "0")}`,
        Alarm: v.alarm,
        Type: v.type,
        Description: v.description,
      };
    });

    const ws = xlsx.utils.json_to_sheet(excelData); // Convert data to sheet format
    xlsx.utils.book_append_sheet(wb, ws, "Alarm Log"); // Append sheet to workbook

    // Generate timestamp for the file name
    const now = new Date();
    const formattedTimestamp = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");

    const formattedTime = [
      String(now.getHours()).padStart(2, "0"),
      String(now.getMinutes()).padStart(2, "0"),
      String(now.getSeconds()).padStart(2, "0"),
    ].join("-");

    const fileName = `Alarm Log ${formattedTimestamp} ${formattedTime}.xlsx`;

    xlsx.writeFile(wb, fileName); // Write file to disk
  };

  return (
    <PageContainer
      title="Alarm History"
      subtitle="Log semua alarm yang pernah terjadi"
    >
      <div className="flex flex-col bg-[#FAFAFA] box-sh w-full h-max rounded-xl md:p-[1.875rem] p-[1.25rem]  ">
        {showConfirmation && (
          <div
            className={`${
              showConfirmation ? "slide-down" : "slide-up"
            } slide-down bg-black-transparent w-full h-full fixed top-0 left-0 
                        z-[100] flex items-center justify-center `}
          >
            <div className="flex flex-col bg-white max-w-[300px] h-[375px] md:w-full w-[75%] rounded-xl px-[25px] justify-evenly items-center">
              <img src={alarmIcon} alt="" className="w-[75px] h-[75px]" />
              <p>
                Apakah Anda yakin untuk menghapus seluruh data pada{" "}
                <span className="font-bold">Alarm Log?</span>
              </p>
              <div className="text-white font-bold flex flex-row justify-evenly w-full">
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    await deleteAllData("alarms");
                    setShowConfirmation(false);
                    fetchDatas();
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
        <div className="flex flex-row w-full items-center my-[1.85rem]">
          <h1 className="font-bold text-[1.5rem] flex-1 text-start">
            Alarm Log
          </h1>
          <div className="flex flex-row gap-5">
            {/* delete all button */}
            <div
              style={{ cursor: "pointer" }}
              className="flex items-center justify-center rounded-xl bg-[#E3210C] hover:opacity-70 transition-all duration-200 max-w-[100px] md:w-[100px] w-max h-[40px] p-2 text-white text-[0.875rem] font-bold"
              onClick={() => setShowConfirmation(true)}
            >
              <img
                src={deleteIcon}
                alt=""
                className="w-[20px] h-[20px] md:hidden block"
              />
              <p className="hidden md:block">Delete All</p>
            </div>
            {/* delete filter button */}
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setFilterExpanded(!filterExpanded)}
              className="flex items-center justify-center rounded-xl bg-[#FF6174] max-w-[100px] md:w-[100px] w-max h-[40px] p-2 hover:opacity-70 transition-all duration-200 text-white text-[0.875rem] font-bold gap-2"
            >
              <img src={filterIcon} alt="" className="w-[20px] h-[20px]" />
              <p className="hidden md:block">Filter</p>
            </div>
            {/* export  button */}
            <div
              style={{ cursor: "pointer" }}
              onClick={exportData}
              className="flex items-center justify-center rounded-xl bg-[#414FF4] max-w-[100px] md:w-[100px] w-max h-[40px] p-2 hover:opacity-70 transition-all duration-200 text-white text-[0.875rem] font-bold gap-2"
            >
              <img
                src={exportIcon}
                alt=""
                className="w-[20px] h-[20px] md:hidden block"
              />
              <p className="hidden md:block">Export</p>
            </div>
            <FilterWindowAlarm
              data={originalData}
              setData={setData}
              visible={filterExpanded}
            />
          </div>
        </div>

        <div className="bg-[#F7F9FA] box-sh-sm rounded-xl flex flex-col md:px-10  w-full h-[844px] pt-4 gap-8 max-h-[600px] overflow-scroll">
          <div className="grid grid-cols-5 w-full min-w-[500px] justify-between font-semibold text-[1rem] ">
            <p>Tanggal</p>
            <p>Waktu</p>
            <p>Alarm</p>
            <p>Tipe Alarm</p>
            <p>Deskripsi</p>
          </div>
          {data.map((v, i) => {
            return <AlarmData {...v} refresh={fetchDatas} key={i} />;
          })}
        </div>
      </div>
    </PageContainer>
  );
}

function AlarmData(props: IAlarmData) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  return (
    <div 
    // style ={{cursor: 'pointer'}}
    onClick={() => {
      if(!showConfirmation)
        setShowDeleteButton(!showDeleteButton)
    }}
    className="grid grid-cols-5 min-w-[500px]  w-full justify-between">
      {showConfirmation && (
        <div
          className={`${
            showConfirmation ? "slide-down" : "slide-up"
          } slide-down bg-black-transparent w-full h-full fixed top-0 left-0 
                        z-[100] flex items-center justify-center `}
        >
          <div className="flex flex-col bg-white max-w-[300px] h-[375px] md:w-full w-[75%] rounded-xl px-[25px] justify-evenly items-center">
            <img src={alarmIcon} alt="" className="w-[75px] h-[75px]" />
            <p>
              Apakah Anda yakin untuk menghapus 1 data pada{" "}
              <span className="font-bold">Alarm Log?</span>
            </p>
            <div className="text-white font-bold flex flex-row justify-evenly w-full">
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await deleteAlarm(props.timestamp.toString());
                  setShowConfirmation(false);
                  props.refresh();
                }}
                className="bg-[#3DBC06] min-w-[70px] px-3 py-2 rounded-lg hover:opacity-70 transition-all duration-200"
              >
                Ya
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirmation(false);
                  setShowDeleteButton(false);
                }}
                className="bg-[#E3210C]  min-w-[70px] px-3 py-2 rounded-lg hover:opacity-70 transition-all duration-200 text-center"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteButton && (
        <div
          onClick={async (_) => {
            //delete the firebase data
            setShowConfirmation(true);
          }}
          style={{ cursor: "pointer" }}
          className="flex items-center justify-center bg-[#E3210C] hover:bg-[#e3220cce] transition-all duration-200 text-white rounded-xl "
        >
          <p className="px-[10px]">Delete</p>
        </div>
      )}
      {
        !showDeleteButton && (
          <p>{`${padDate(new Date(props.timestamp).getDate())}/${padDate(
            new Date(props.timestamp).getMonth() + 1
          )}/${padDate(new Date(props.timestamp).getFullYear())}`}</p>
        )

      }
      <p>{`${padDate(new Date(props.timestamp).getHours())}:${padDate(
        new Date(props.timestamp).getMinutes()
      )}:${padDate(new Date(props.timestamp).getSeconds())}`}</p>
      <p>{props.alarm}</p>
      <p style={{ color: AlarmType[props.type] }} className="font-bold">
        {props.type}
      </p>
      <p>{props.description}</p>
    </div>
  );
}
