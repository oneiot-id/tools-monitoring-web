import { useEffect, useState } from "react";
import { IUser } from "../../types/user";
import defaultPicture from "/icons/default-user-icon.png";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../helper/navigation";

export interface INavbarProfile{
  user: IUser;
  selectNav :(index: number) => void;
}

export default function NavbarProfile(props: INavbarProfile) {
  const [currentUser, setCurrentUser] = useState<IUser>({
    id: 0,
    username: "",
    password: "",
    fullname: "",
    picture: "",
  });

  let greeting = "";

  const dateNow = new Date();
  const hourNow = dateNow.getHours();

  switch (true) {
    case hourNow >= 0 && hourNow < 12:
      greeting = "Selamat pagi";
      break;
    case hourNow >= 12 && hourNow < 15:
      greeting = "Selamat siang";
      break;
    case hourNow >= 15 && hourNow < 18:
      greeting = "Selamat sore";
      break;
    default:
      greeting = "Selamat malam";
      break;
  }

  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('user') == null)
      navigate("/tools-monitoring-web/")
    else
    {
      try{
          const userLocalStorage = JSON.parse(
            localStorage?.getItem("user") ?? ""
          ) as IUser;
      
          // fetchUser();
          setCurrentUser(userLocalStorage)
      }
      catch(e)
      {
        localStorage.removeItem('user')
      }
    }
  }, [props]);

  // const fetchUser = async () => {
  //   const u = await getUser();

  //   if(u != null)
  //     setUser(u);
  // }

  return (
    <div
      className="flex flex-row items-center"
      onClick={() => {
        props.selectNav(-1);
        navigate(`${baseUrl}/user-page`)
      }}
    >
      <p className="text-base hidden lg:block">
        {greeting + `, `}{" "}
        <span className="font-bold">{currentUser.username}</span>
      </p>
      <img
        style={{ cursor: "pointer" }}
        className="flex w-[50px] h-[50px] rounded-[100%] ml-[1rem] hover:scale-110 transition-all duration-200 object-cover"
        src={props.user.picture == "" ? defaultPicture : props.user.picture}
        alt=""
      />
    </div>
  );
}
