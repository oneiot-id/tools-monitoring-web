import { useNavigate } from "react-router-dom";
import closeIcon from "/icons/close 2.png";
import { baseUrl } from "../helper/navigation";
import { useState } from "react";

export interface IMobileNavigation {
  setExpanded: (b: boolean) => void;
  setSelectedNav: (i: number) => void
}

export default function MobileNavigation(props: IMobileNavigation) {
  const [showed, setShowed] = useState(true);

  const navigate = useNavigate();

  return (
    <div
      className={`fixed lg:hidden flex bg-white z-[100] top-0 left-0 w-[100vw] h-[100vh]  flex-col items-start px-10 py-11 gap-12
                font-bold text-[1.5rem] ${showed ? "slide-down" : "slide-up"}`}
    >
      <img
        onClick={() => {
          setShowed(false);
          setTimeout(() => {
            props.setExpanded(false);
          }, 400);
        }}
        style={{ cursor: "pointer" }}
        src={closeIcon}
        alt=""
        className="w-[25px] hover:scale-110 hover:opacity-70 transition-all duration-300"
      />
      <NavButton
        text="Dashboard"
        nav="dashboard"
        setExpanded={props.setExpanded}
        setSelectedNav={props.setSelectedNav}
        index={0}
      />
      <NavButton
        text="Data History"
        nav="data-history"
        setExpanded={props.setExpanded}
        setSelectedNav={props.setSelectedNav}
        index={1}
      />
      <NavButton
        text="Alarm History"
        nav="alarm-history"
        setExpanded={props.setExpanded}
        setSelectedNav={props.setSelectedNav}
        index={2}
      />
      <NavButton
        text="Parameter Settings"
        nav="parameter-settings"
        setExpanded={props.setExpanded}
        setSelectedNav={props.setSelectedNav}
        index={3}
      />
      <p
        style={{ cursor: "pointer" }}
        onClick={() => {
            localStorage.removeItem('user');
            navigate(`${baseUrl}/`);

        }}
        className="text-red-500 hover:scale-110 hover:opacity-70 transition-all duration-300"
      >
        Sign out
      </p>
    </div>
  );
}

interface INavButton extends IMobileNavigation{
  text: string;
  nav: string;
  index: number;
}

function NavButton({ text, nav, index, setExpanded, setSelectedNav }: INavButton) {
  const navigate = useNavigate();
  return (
    <p
      onClick={() => {
        setSelectedNav(index)
        setExpanded(false);
        navigate(`${baseUrl}/${nav}`);
      }}
      style={{ cursor: "pointer" }}
      className="hover:scale-110 hover:opacity-70 transition-all duration-300"
    >
      {text}
    </p>
  );
}
