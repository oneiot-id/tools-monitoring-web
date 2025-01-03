import { IThresholdSetting } from "../components/ThresholdSetting";
import { WidgetThreshold } from "../types/widgetThreshold";

export function calculateThreshold(value: number, threshold: IThresholdSetting): WidgetThreshold{
    const diffToMax = Math.abs(value  - Number(threshold.high)); 
    const diffToMin = Math.abs(value  - Number(threshold.low)); 

    if(value  > Number(threshold.high) || value  < Number(threshold.low))
    {
        return WidgetThreshold.Danger;        
    }
    else if(diffToMax < Number(threshold.warning) || diffToMin < Number(threshold.warning))
    {
        return WidgetThreshold.Warning;
    }
    else
    {
        return WidgetThreshold.Ok;
    }
}