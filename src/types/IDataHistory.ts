import { IMonitoringData } from "./IMonitoringData";

export interface IDataHistory extends IMonitoringData{
    suffix: string;
}

export interface IDataTable{
    title: string;
    suffix: string;
    data: IMonitoringData[];
    link: string;
    refresh: () => void;
}