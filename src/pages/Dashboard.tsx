// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

import VoltageWidget from "../components/VoltageWidget";
import PageContainer from "../components/PageContainer";
import TemperatureWidget from "../components/TemperatureWidget";
import StatisticsWidget from "../components/StatisticsWidget";
import { useEffect, useState } from "react";
import TemperatureWidgetL from "../components/TemperatureWidgetL";
import { IMonitoringData } from "../types/IMonitoringData";
import { useNavigate } from "react-router-dom";
import { getAllDatas, getThresholds } from "../utils/database";
import { padDate } from "../helper/datehelper";
// import { baseUrl } from "../helper/navigation";
import { IThresholdSetting } from "../components/ThresholdSetting";

// const data: IMonitoringData[] = [
//   {
//     timestamp: new Date("2024-12-01T08:00:00"), // December 1, 2024, 08:00 AM
//     value: 1,
//   },
//   {
//     timestamp: new Date("2024-12-01T09:00:00"), // December 1, 2024, 09:00 AM
//     value: 2,
//   },
//   {
//     timestamp: new Date("2024-12-02T10:00:00"), // December 2, 2024, 10:00 AM
//     value: 3,
//   },
//   {
//     timestamp: new Date("2024-12-02T11:00:00"), // December 2, 2024, 11:00 AM
//     value: 2.1,
//   },
//   {
//     timestamp: new Date("2024-12-03T12:00:00"), // December 3, 2024, 12:00 PM
//     value: 4,
//   },
//   {
//     timestamp: new Date("2024-12-03T13:30:00"), // December 3, 2024, 13:30 PM
//     value: 1.5,
//   },
//   {
//     timestamp: new Date("2024-12-04T15:00:00"), // December 4, 2024, 03:00 PM
//     value: 2.8,
//   },
//   {
//     timestamp: new Date("2024-12-05T16:00:00"), // December 5, 2024, 04:00 PM
//     value: 3.5,
//   },
// ];

export default function Dashboard() {
  const [teganganAcData, setTeganganAcData] = useState<IMonitoringData[]>([
    {
      timestamp: "",
      value: 0,
    },
  ]);
  const [teganganDC14VData, setTeganganDc14VData] = useState<IMonitoringData[]>(
    [
      {
        timestamp: "",
        value: 0,
      },
    ]
  );
  const [teganganDC5VData, setTeganganDC5VData] = useState<IMonitoringData[]>([
    {
      timestamp: "",
      value: 0,
    },
  ]);
  const [kelembapanPanelData, setKelembapanPanelData] = useState<
    IMonitoringData[]
  >([
    {
      timestamp: "",
      value: 0,
    },
  ]);
  const [temperaturePanelData, setTemperaturePanelData] = useState<
    IMonitoringData[]
  >([
    {
      timestamp: "",
      value: 0,
    },
  ]);
  const [temperatureAlatData, setTemperatureAlatData] = useState<
    IMonitoringData[]
  >([
    {
      timestamp: "",
      value: 0,
    },
  ]);
  const [thresholdDatas, setThresholdDatas] = useState<Map<string, IThresholdSetting>>(new Map());

  const fetchDatas = async () => {
    const dataTeganganAc = await getAllDatas("tegangan-ac");
    const dataTeganganDc14v = await getAllDatas("tegangan-dc-14v");
    const dataTeganganDc5v = await getAllDatas("tegangan-dc-5v");
    const dataKelembapanPanel = await getAllDatas("kelembapan-panel");
    const dataTemperaturePanel = await getAllDatas("temperature-panel");
    const dataTemperatureAlat = await getAllDatas("temperature-alat");
    const dataThreshold = await getThresholds();

    if (dataTeganganAc.length > 0) setTeganganAcData(dataTeganganAc);

    if (dataTeganganDc14v.length > 0) setTeganganDc14VData(dataTeganganDc14v);

    if (dataTeganganDc5v.length > 0) setTeganganDC5VData(dataTeganganDc5v);

    if (dataKelembapanPanel.length > 0)
      setKelembapanPanelData(dataKelembapanPanel);

    if (dataTemperaturePanel.length > 0)
      setTemperaturePanelData(dataTemperaturePanel);

    if (dataTemperatureAlat.length > 0)
      setTemperatureAlatData(dataTemperatureAlat);

    setThresholdDatas(dataThreshold);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user") == null)
      navigate("/tools-monitoring-web/");

    fetchDatas();

    setInterval(() => {
      fetchDatas();

    }, 60 * 1000);
  }, []);

  return (
    <PageContainer
      title="Dashboard"
      subtitle="Overview dan Monitoring Peralatan"
    >
      {/* widgets desktop */}
      <div className="flex flex-row flex-grow w-full mb-5 items-end justify-end text-end text-[0.9rem] ">
        <p>
          Terakhir diperbarui{" "}
          <span className="font-bold">
            {teganganAcData.length > 0
              ? `${padDate(
                  new Date(
                    teganganAcData[teganganAcData.length - 1].timestamp
                  ).getHours()
                )}:${padDate(
                  new Date(
                    teganganAcData[teganganAcData.length - 1].timestamp
                  ).getMinutes()
                )}:${padDate(
                  new Date(
                    teganganAcData[teganganAcData.length - 1].timestamp
                  ).getSeconds()
                )}`
              : "--:--:--"}
          </span>
        </p>
      </div>
      <div className="md:flex w-[100%] justify-between hidden">
        <div className="flex flex-row justify-between w-[65%] gap-[2.8rem]">
          <div className="flex w-[70%] flex-col gap-[2.8rem]">
            <VoltageWidget
              value={teganganAcData[teganganAcData.length - 1].value}
              title={"Tegangan AC"}
              mUnit={"Volt"}
              threshold={thresholdDatas.get('parameter-vac') ?? {high: 0, low: 0, warning: 0, link: '', title:''}}
            />
            <VoltageWidget
              value={teganganDC14VData[teganganDC14VData.length - 1].value}
              title={"DC 14 V"}
              mUnit={"Volt"}
              threshold={thresholdDatas.get('parameter-dc-14v') ?? {high: 0, low: 0, warning: 0, link: '', title:''}}
            />
          </div>
          <div className="flex flex-col gap-[2.8rem] w-[35%] justify-center items-center">
            <TemperatureWidget
              title={"Alat"}
              value={temperatureAlatData[temperatureAlatData.length - 1].value}
              unit={"Temperature"}
              threshold={thresholdDatas.get('parameter-t-alat') ?? {high: 0, low: 0, warning: 0, link: '', title:''}}
            />
            <VoltageWidget
              value={teganganDC5VData[teganganDC5VData.length - 1].value}
              title={"DC 5V"}
              mUnit={"Volt"}
              threshold={thresholdDatas.get('parameter-dc-5v') ?? {high: 0, low: 0, warning: 0, link: '', title:''}}
            />
          </div>
        </div>
        <div className="flex w-[30%] items-end justify-end flex-col">
          <TemperatureWidgetL
            title={"Panel"}
            value1={temperaturePanelData[temperaturePanelData.length - 1].value}
            value2={kelembapanPanelData[kelembapanPanelData.length - 1].value}
            unit1={"Temperature"}
            unit2={"Kelembapan"}
            threshold1={thresholdDatas.get('parameter-t-panel') ?? {high: 0, low: 0, warning: 0, link: '', title:''}}
            threshold2={thresholdDatas.get('parameter-humid-panel') ?? {high: 0, low: 0, warning: 0, link: '', title:''}}
          />
        </div>
      </div>

      <div className="flex md:hidden w-full gap-5 overflow-scroll">
        <div className="overflow-hidden overflow-x-scroll w-fit">
          <div className="flex w-fit gap-5">
            <VoltageWidget
              value={teganganAcData[teganganAcData.length - 1].value}
              title={"Tegangan AC"}
              mUnit={"Volt"}
              threshold={thresholdDatas.get('parameter-vac') ?? {high: 0, low: 0, warning: 0, link: '', title:''}}
            />

            <VoltageWidget
              value={teganganDC14VData[teganganDC14VData.length - 1].value}
              title={"DC 14V"}
              mUnit={"Volt"}
              threshold={thresholdDatas.get('parameter-dc-14v') ?? {high: 0, low: 0, warning: 0, link: '', title:''}}
            />

            <VoltageWidget
              value={teganganDC5VData[teganganDC5VData.length - 1].value}
              title={"DC 5V"}
              mUnit={"Volt"}
              threshold={thresholdDatas.get('parameter-dc-5v') ?? {high: 0, low: 0, warning: 0, link: '', title:''}}
            />
          </div>
        </div>
      </div>

      <div className="flex mt-5 md:hidden overflow-scroll w-full">
        <div className="w-fit overflow-scroll">
          <div className="flex w-fit items-center gap-5">
            <TemperatureWidgetL
              title={"Panel"}
              value1={
                temperaturePanelData[temperaturePanelData.length - 1].value
              }
              value2={kelembapanPanelData[kelembapanPanelData.length - 1].value}
              unit1={"Temperature"}
              unit2={"Kelembapan"}
              threshold1={thresholdDatas.get('parameter-t-panel') ?? {high: 0, low: 0, warning: 0, link: '', title:''}}
              threshold2={thresholdDatas.get('parameter-humid-panel') ?? {high: 0, low: 0, warning: 0, link: '', title:''}}
            />

            <TemperatureWidget
              title={"Alat"}
              value={temperatureAlatData[temperatureAlatData.length - 1].value}
              unit={"Temperature"}
              threshold={thresholdDatas.get('parameter-t-alat') ?? {high: 0, low: 0, warning: 0, link: '', title:''}}
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="flex flex-col items-start w-full gap-8">
        <h1 className="font-bold text-[1.5rem] mt-[1.5rem]">Statistik</h1>
        <div className="flex md:flex-row flex-col justify-between w-full flex-grow gap-6">
          <StatisticsWidget
            title={"Tegangan AC"}
            datas={teganganAcData ?? []}
          />
          <StatisticsWidget
            title={"Tegangan DC 14V"}
            datas={teganganDC14VData ?? []}
          />
        </div>
        <div className="flex md:flex-row flex-col justify-between w-full flex-grow gap-6">
          <StatisticsWidget
            title={"Tegangan DC 5V"}
            datas={teganganDC5VData ?? []}
          />
          <StatisticsWidget
            title={"Temperature Panel"}
            datas={temperaturePanelData ?? []}
          />
        </div>
        <div className="flex md:flex-row flex-col justify-between w-full flex-grow gap-6">
          <StatisticsWidget
            title={"Kelembapan Panel"}
            datas={kelembapanPanelData ?? []}
          />
          <StatisticsWidget
            title={"Temperature Alat"}
            datas={temperatureAlatData ?? []}
          />
        </div>
      </div>
    </PageContainer>
  );
}
