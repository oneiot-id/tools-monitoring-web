// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import INavButton from "../../types/navbutton";
import { baseUrl } from "../../helper/navigation";

export default function NavbarButton(props: INavButton) {
  // const [isSelected, setIsSelected] = useState(props.selected);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${baseUrl}/${props.nav}`);
    props.setIndex();
  };

  return (
    <div
      style={{cursor: 'pointer'}}
      className={
        props.selected
          ? "bg-[#414FF4] p-[0.625rem] rounded-xl transition-all duration-[300ms] hover:scale-110 hover:bg-[#3a47d9]"
          : "transition-all duration-[300ms] hover:scale-110 hover:bg-[#D9D9D9] hover:p-[0.5rem] hover:rounded-xl"
      }
      
      onClick={handleClick}
    >
      <img
        src={props.selected ? props.activeIcon : props.unactiveIcon}
        alt=""
        className="w-[20px] h-[20px]"
      />
    </div>
  );
}
