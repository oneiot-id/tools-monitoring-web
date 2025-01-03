import { useEffect, useState } from "react";
import { calculateThreshold } from "../helper/calculateThreshold";
import {
  ITemperatureWidgetLarge,
  TemperatureWidgetTextColor,
} from "../types/ITemperatureWidget";

export default function TemperatureWidget(props: ITemperatureWidgetLarge) {
  const [textColor1, setTextColor1] = useState("");
  const [textColor2, setTextColor2] = useState("");

  useEffect(() => {
    const type1 = calculateThreshold(props.value1, props.threshold1);
    const type2 = calculateThreshold(props.value2, props.threshold2);

    setTextColor1(TemperatureWidgetTextColor[type1]);
    setTextColor2(TemperatureWidgetTextColor[type2]);
  });

  return (
    <div className="flex flex-col justify-between rounded-[1.25rem] box-sh bg-[#FAFAFA] md:h-[100%] md:max-w-[260px] max-w-[300px] w-[300px] h-[175px] md:w-[100%] py-[1.25rem]">
      <h1 className="font-medium text-[1.25rem]">{props.title}</h1>

      <div className="flex flex-row justify-around items-center font-bold text-[2rem]">
        <p style={{ color: textColor1 }}>
          {props.unit1.toLowerCase() == "temperature"
            ? `${props.value1.toFixed(1)}°`
            : `${props.value1.toFixed(1)}%`}
        </p>
        <p style={{ color: textColor2 }}>
          {props.unit2.toLowerCase() == "temperature"
            ? `${props.value2.toFixed(1)}°`
            : `${props.value2.toFixed(1)}%`}
        </p>
      </div>
      <div className="flex flex-row font-normal text-[0.875rem] justify-around">
        <p>{props.unit1}</p>
        <p>{props.unit2}</p>
      </div>
    </div>
  );
}
