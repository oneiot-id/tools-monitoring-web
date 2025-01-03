import { IThresholdSetting } from "../components/ThresholdSetting";

interface IWidget{
    value: number | string;
    title: string;
    mUnit: string;
    threshold: IThresholdSetting;
    wSize?: WidgetSize;
}

enum WidgetType{
    OkBg = '#6BD68B',
    WarningBg = '#FCEAA3',
    DangerBg = '#CD3D2E',
    OkText = '#000000',
    WarningText = '#000000',
    DangerText = '#FFFFFF'
}

enum WidgetSize{
    LargeW = '430',
    LargeH = '100%',
    SmallW = '0%',
    SmallH = '1%'
}

// max-w-[430px] max-h-[175px] 

export default IWidget;
export {WidgetType, WidgetSize};