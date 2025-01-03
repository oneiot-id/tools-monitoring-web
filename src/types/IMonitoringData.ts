

export interface IStatistics {
    title: string;
    datas: IMonitoringData[];
}

export interface IMonitoringData {
    value: number;
    timestamp: Date | string;
}

export interface IStatisticDetails {
    min: number;
    max: number;
    avg: number;
    now: number;
}

export interface ITableData {
    timestamp: Date | string;
    value: number;
    suffix: string;
    link: string;
    refresh: () => void;
    // showConfirmation: (show: boolean) => void;
}

export interface IAlarmData {
    timestamp: Date | string;
    alarm: string;
    type: string;
    description: string;
    refresh: () => void;
}

export interface IAlarmHistoryPage {
    title: string;
    data: IAlarmData[]
}

export const AlarmType: { [key: string]: string } = {
    Ok: '#6BD68B',
    Warning: '#F38D19',
    Danger: '#E3210C',
};
