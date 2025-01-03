import { useEffect, useState } from "react";
import IWidget, { WidgetSize, WidgetType } from "../types/widgetInterface";


export default function VoltageWidget(props: IWidget) {

    const [bgColor, setBgColor] = useState('#000000')
    const [textColor, setTextColor] = useState('#FFFFFF')
    const [width, setWidth] = useState('0%')
    const [height, setHeight] = useState('0%')
    
    const setup = () => {
        const diffToMax = Math.abs(props.value as number - Number(props.threshold.high)); 
        const diffToMin = Math.abs(props.value as number - Number(props.threshold.low)); 
        
        let bgCol = '';
        let textCol = '';

        // console.log(Number(props.threshold.low))

        if(props.value as number > Number(props.threshold.high) || props.value as number < Number(props.threshold.low))
        {
            bgCol = WidgetType['DangerBg'];
            textCol =WidgetType['DangerText'];
        }
        else if(diffToMax < Number(props.threshold.warning) || diffToMin < Number(props.threshold.warning))
        {
            bgCol = WidgetType['WarningBg'];
            textCol =WidgetType['WarningText'];
        }
        else
        {
            bgCol = WidgetType['OkBg'];
            textCol =WidgetType['OkText'];
        }

        if(props.wSize == null)
        {
            setWidth(WidgetSize.LargeW);
            setHeight(WidgetSize.LargeH);
        }

        setBgColor(bgCol)
        setTextColor(textCol)
        
        
    }

    useEffect(() => {
        setup();
    }, [bgColor, textColor, width, height, props.value])

    return(
        <div 
        style={{backgroundColor: bgColor, color: textColor}}
        className={`flex flex-col max-w-[430px] max-h-[175px] w-[300px] h-[100vh] md:w-[100%] md:h-[175px] sm:flex-grow rounded-[1.25rem] justify-evenly`} >
            <h1 className="text-[1.25rem]">{props.title}</h1>
            <p className="text-[2rem] font-bold">{(props.value as number).toFixed(1)}</p>
            <p className="text-[1rem]">{props.mUnit}</p>
        </div>
    )
}