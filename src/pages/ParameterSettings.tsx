import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import ThresholdSetting, {
  IThresholdSetting,
} from "../components/ThresholdSetting";
import { getThresholds } from "../utils/database";
import { getParameter } from "../helper/getparameter";

export default function ParameterSettings() {
  const [parameterVac, setParameterVac] = useState<Map<string, IThresholdSetting>>(new Map());

  useEffect(() => {
    fetchParameter();
  }, []);

  const fetchParameter = async () => {
    const dbData = await getThresholds();

    setParameterVac(dbData);
  }
  
  return (
    <PageContainer
      title="Parameter Settings"
      subtitle="Atur parameter threshold"
    >
      <div className="grid grid-flow-row auto-rows-max grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full md:gap-[128px] gap-[48px]">
        <ThresholdSetting
          title={"Parameter VAC"}
          low={getParameter('parameter-vac', parameterVac).low}
          high={getParameter('parameter-vac', parameterVac).high}
          warning={getParameter('parameter-vac', parameterVac).warning}
          link={"parameter-vac"}
        />
        <ThresholdSetting
          title={"Parameter DC 14V"}
          low={getParameter('parameter-dc-14v', parameterVac).low}
          high={getParameter('parameter-dc-14v', parameterVac).high}
          warning={getParameter('parameter-dc-14v', parameterVac).warning}
          link={"parameter-dc-14v"}
        />
        <ThresholdSetting
          title={"Parameter DC 5V"}
          low={getParameter("parameter-dc-5v", parameterVac).low}
          high={getParameter("parameter-dc-5v", parameterVac).high}
          warning={getParameter("parameter-dc-5v", parameterVac).warning}
          link={"parameter-dc-5v"}
        />
        <ThresholdSetting
          title={"Parameter Kelembapan Panel"}
          low={getParameter("parameter-humid-panel", parameterVac).low}
          high={getParameter("parameter-humid-panel", parameterVac).high}
          warning={getParameter("parameter-humid-panel", parameterVac).warning}
          link={"parameter-humid-panel"}
        />
        <ThresholdSetting
          title={"Parameter Temperature Panel"}
          low={getParameter("parameter-t-panel", parameterVac).low}
          high={getParameter("parameter-t-panel", parameterVac).high}
          warning={getParameter("parameter-t-panel", parameterVac).warning}
          link={"parameter-t-panel"}
        />
        <ThresholdSetting
          title={"Parameter Temperature Alat"}
          low={getParameter("parameter-t-alat", parameterVac).low}
          high={getParameter("parameter-t-alat", parameterVac).high}
          warning={getParameter("parameter-t-alat", parameterVac).warning}
          link={"parameter-t-alat"}
        />
      </div>
    </PageContainer>
  );
}
