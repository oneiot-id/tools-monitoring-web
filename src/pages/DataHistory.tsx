import PageContainer from "../components/PageContainer";
import DataHistoryTable from "../components/DataHistoryTable";
import { getAllDatas } from "../utils/database";
import { useEffect, useState } from "react";
import { IMonitoringData } from "../types/IMonitoringData";

export default function DataHistory() {
  const [teganganAcData, setTeganganAcData] = useState<IMonitoringData[]>([
    {
      timestamp: "2024-12-01T08:00:00",
      value: 0,
    },
  ]);
  const [teganganDC14VData, setTeganganDc14VData] = useState<IMonitoringData[]>(
    [
      {
        timestamp: "2024-12-01T08:00:00",
        value: 0,
      },
    ]
  );
  const [teganganDC5VData, setTeganganDC5VData] = useState<IMonitoringData[]>([
    {
      timestamp: "2024-12-01T08:00:00",
      value: 0,
    },
  ]);
  const [kelembapanPanelData, setKelembapanPanelData] = useState<
    IMonitoringData[]
  >([
    {
      timestamp: "2024-12-01T08:00:00",
      value: 0,
    },
  ]);
  const [temperaturePanelData, setTemperaturePanelData] = useState<
    IMonitoringData[]
  >([
    {
      timestamp: "2024-12-01T08:00:00",
      value: 0,
    },
  ]);
  const [temperatureAlatData, setTemperatureAlatData] = useState<
    IMonitoringData[]
  >([
    {
      timestamp: "2024-12-01T08:00:00",
      value: 0,
    },
  ]);

  const fetchDatas = async () => {
    const dataTeganganAc = await getAllDatas("tegangan-ac");
    const dataTeganganDc14v = await getAllDatas("tegangan-dc-14v");
    const dataTeganganDc5v = await getAllDatas("tegangan-dc-5v");
    const dataKelembapanPanel = await getAllDatas("kelembapan-panel");
    const dataTemperaturePanel = await getAllDatas("temperature-panel");
    const dataTemperatureAlat = await getAllDatas("temperature-alat");

    // if(dataTeganganAc.length > 0)
    setTeganganAcData(dataTeganganAc);
    setTeganganDc14VData(dataTeganganDc14v);
    setTeganganDC5VData(dataTeganganDc5v);
    setKelembapanPanelData(dataKelembapanPanel);
    setTemperaturePanelData(dataTemperaturePanel);
    setTemperatureAlatData(dataTemperatureAlat);
  };


  useEffect(() => {
    fetchDatas();

    setInterval(() => {
      fetchDatas();
    }, 60 * 1000);
  }, []);

  return (
    <PageContainer title="Data History" subtitle="Log semua data monitoring">
      <div className="flex flex-col w-full md:gap-[1.75rem]">
        <div className="flex lg:flex-row flex-col h-max w-full justify-between lg:gap-[3.75rem]">
          <DataHistoryTable
            title={"Tegangan AC"}
            data={teganganAcData}
            suffix={"V"}
            link={"tegangan-ac"}
            refresh={fetchDatas}
          />
          <DataHistoryTable
            title={"Tegangan DC 14V"}
            data={teganganDC14VData}
            suffix={"V"}
            link={"tegangan-dc-14v"}
            refresh={fetchDatas}
          />
        </div>
        <div className="flex lg:flex-row flex-col h-max w-full justify-between lg:gap-[3.75rem]">
          <DataHistoryTable
            title={"Tegangan DC 5V"}
            data={teganganDC5VData}
            suffix={"V"}
            link={"tegangan-dc-5v"}
            refresh={fetchDatas}
          />
          <DataHistoryTable
            title={"Kelembapan Panel"}
            data={kelembapanPanelData}
            suffix={"%"}
            link={"kelembapan-panel"}
            refresh={fetchDatas}
          />
        </div>
        <div className="flex lg:flex-row flex-col h-max w-full justify-between lg:gap-[3.75rem]">
          <DataHistoryTable
            title={"Temperature Panel"}
            data={temperaturePanelData}
            suffix={"°C"}
            link={"temperature-panel"}
            refresh={fetchDatas}
          />
          <DataHistoryTable
            title={"Temperature Alat"}
            data={temperatureAlatData}
            suffix={"°C"}
            link={"temperature-alat"}
            refresh={fetchDatas}
          />
        </div>
      </div>
    </PageContainer>
  );
}
