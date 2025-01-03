import { useEffect, useState } from "react";
import { ITemperatureWidget, TemperatureWidgetTextColor } from "../types/ITemperatureWidget";
import { calculateThreshold } from "../helper/calculateThreshold";

export default function TemperatureWidget(props: ITemperatureWidget) {

    const [textColor, setTextColor] = useState('')

  useEffect(() => {
    const type = calculateThreshold(props.value, props.threshold);
    setTextColor(TemperatureWidgetTextColor[type])
  });

  return (
    <div className="flex flex-col justify-between rounded-[1.25rem] box-sh bg-[#FAFAFA] md:h-[100%] h-[175px]  md:max-w-[260px] w-[300px] md:w-[100%] md:max-h-[176px] py-[1.25rem]">
      <h1 className="font-medium text-[1.25rem]">{props.title}</h1>
      <p style={{color: textColor}} className="font-bold text-[2rem]">
        {props.unit.toLowerCase() == 'temperature' ? `${props.value.toFixed(1)}°` : `${props.value.toFixed(1)}%`}
      </p>
      <p className="font-normal text-[0.875rem]">{props.unit}</p>
    </div>
  );
}
