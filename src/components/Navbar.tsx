import { useEffect, useState } from "react";
import INavButton from "../types/navbutton";
import NavbarButton from "./Navbar/NavbarButton";

// Icons
import dashboardIconActive from "/icons/dashboard (1).png";
import dashboardIconUnactive from "/icons/dashboard.png";
import databaseIconActive from "/icons/database w.png";
import databaseIconUnactive from "/icons/database b.png";
import alarmIconActive from "/icons/history w.png";
import alarmIconUnactive from "/icons/history b.png";
import thresholdIconActive from "/icons/equalizer w.png";
import thresholdIconUnactive from "/icons/equalizer b.png";

import downArrowIcon from "/icons/right-arrow.png";
import NavbarProfile from "./Navbar/NavbarProfile";

import alarmIcon from "/icons/bell-ring b.png";
import MobileNavigation from "./MobileNavigation";
import { IUser } from "../types/user";

export interface INavbar{
  user: IUser
  setShowAlarm: (show: boolean) => void;
}

export default function Navbar(props: INavbar) {
  const [selectedNav, setSelectedNav] = useState(0);
  const [expandNav, setExpandNav] = useState(false);


  useEffect(() => {

  }, [props.user])

  const navButtons: INavButton[] = [
    {
      activeIcon: dashboardIconActive,
      unactiveIcon: dashboardIconUnactive,
      nav: "dashboard",
      selected: false,
      setIndex: () => {
        setSelectedNav(0);
      },
    },
    {
      activeIcon: databaseIconActive,
      unactiveIcon: databaseIconUnactive,
      nav: "data-history",
      selected: false,
      setIndex: () => {
        setSelectedNav(1);
      },
    },
    {
      activeIcon: alarmIconActive,
      unactiveIcon: alarmIconUnactive,
      nav: "alarm-history",
      selected: false,
      setIndex: () => {
        setSelectedNav(2);
      },
    },
    {
      activeIcon: thresholdIconActive,
      unactiveIcon: thresholdIconUnactive,
      nav: "parameter-settings",
      selected: false,
      setIndex: () => {
        setSelectedNav(3);
      },
    },
  ];

  return (
    <div>
      {expandNav && (
        <MobileNavigation
          setExpanded={setExpandNav}
          setSelectedNav={setSelectedNav}
        />
      )}
      <nav className="z-[90] fixed nav-shadow top-0 left-1/2 transform -translate-x-1/2  flex flex-row justify-between items-center bg-[#F4F4F4] w-[89%]  h-[80px] mx-auto max-w-[1198px] rounded-[1.25rem] my-[22px] self-center px-[0.95rem] lg:px-[3.4rem]">
        {/* down-arrow    */}
        <div
          onClick={(_) => setExpandNav(!expandNav)}
          style={{ cursor: "pointer" }}
          className="flex flex-1 lg:hidden items-start justify-start  rounded-[100%]"
        >
          <img
            src={downArrowIcon}
            alt=""
            className="p-[6px] bg-[#EDEDED] rounded-[100%]  hover:scale-125 transition-all duration-200  w-[30px] h-[30px] "
          />
        </div>

        {/* buttons */}
        <div className="flex-1 flex-row items-center gap-[1.75rem] hidden lg:flex ">
          {navButtons.map((button, index) => {
            button.selected = index == selectedNav;
            return <NavbarButton {...button} key={index} />;
          })}
        </div>

        {/* Title */}
        <div className="text-[1.25rem] font-bold flex-1 md:flex hidden text-center items-center justify-center">
          Monitoring Peralatan
        </div>

        {/* User */}
        <div className="flex flex-1 justify-end items-center">
          {/* Alarm button */}
          <div
            onClick={() => props.setShowAlarm(true)}
            style={{ cursor: "pointer" }}
            className="flex md:hidden justify-self-end h-[30px] w-[30px] bg-[#EDEDED] items-center justify-center p-[6px] rounded-[100%] hover:scale-110 transition-all duration-200 hover:bg-[#c6c6c6]"
          >
            <img src={alarmIcon} alt="" className="block w-[20px] h-[20px]" />
          </div>
          <NavbarProfile user={props.user} selectNav={setSelectedNav} />
        </div>
      </nav>
    </div>
  );
}
