import { ChangeEvent, useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export interface IThresholdSetting {
  title: string;
  low: number | string;
  high: number | string;
  warning: number | string;
  link: string;
}

export default function ThresholdSetting(props: IThresholdSetting) {
  const [data, setData] = useState<IThresholdSetting>({
    title: "",
    low: 0,
    high: 0,
    warning: 0,
    link: "",
  });

  useEffect(() => {
    setData(props);
  }, [props]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({...data, [name]: value });
  };

  const applyChange = async () => {
    const uploadData = {
      low: Number(data?.low),
      high: Number(data?.high),
      warning: Number(data?.warning),
    };

    if (props.link != null) {
        try{
            const dbRef = doc(db, "parameter", props.link);
            await updateDoc(dbRef, uploadData);
        }
        catch(e)
        {
            const dbRef = doc(db, "parameter", props.link);
            await setDoc(dbRef, uploadData);
        }
    }
    alert(`Settings ${props.title} tersimpan!`)
  };

  return (
    <div className="bg-[#FAFAFA] box-sh-sm md:max-w-[290px] w-[100%]  h-max rounded-xl p-[25px] pb-0">
      <h1 className="font-bold text-[1.2rem]">{props.title}</h1>
      <div className="flex flex-col items-start mt-[1.2rem] gap-[0.75rem]">
        <p>Low Threshold</p>
        <input
          type="text"
          name="low"
          id=""
          className="w-full bg-[#F4F4F4] h-[35px] rounded-xl text-center"
          value={data?.low}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col items-start mt-[1.2rem] gap-[0.75rem]">
        <p>High Threshold</p>
        <input
          type="text"
          name="high"
          id=""
          className="w-full bg-[#F4F4F4] h-[35px] rounded-xl text-center"
          value={data?.high}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col items-start mt-[1.2rem] gap-[0.75rem]">
        <p>Warning Alert</p>
        <input
          type="text"
          name="warning"
          id=""
          className="w-full bg-[#F4F4F4] h-[35px] rounded-xl text-center"
          value={data?.warning}
          onChange={handleChange}
        />
      </div>
      <button
        onClick={applyChange}
        className="bg-[#3DBC06] w-[72px] h-[32px] text-white font-bold rounded-[20px] my-[20px] text-[0.75rem] hover:opacity-70 transition-all duration-200"
      >
        Apply
      </button>
    </div>
  );
}
