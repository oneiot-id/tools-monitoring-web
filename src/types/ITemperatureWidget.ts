import { IThresholdSetting } from "../components/ThresholdSetting";

export interface ITemperatureWidget{
    title: string;
    value: number;
    unit: string;
    threshold: IThresholdSetting;
}

export interface ITemperatureWidgetLarge{
    title: string;
    value1: number;
    value2: number;
    unit1: string;
    unit2: string;
    threshold1: IThresholdSetting;
    threshold2: IThresholdSetting;
}

enum TemperatureWidgetTextColor{
    Ok = '#6BD68B',
    Warning = '#F6810C',
    Danger = '#CD3D2E'
}

export {TemperatureWidgetTextColor};