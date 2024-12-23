import React, { useEffect, useState } from "react";
import bgImage from "/backgrounds/23786.jpg";
import hidePasswordIcon from "/icons/hide (1).png";
import showPasswordIcon from "/icons/show.png";
import {doc, getDoc} from "firebase/firestore";
import { IUser } from "../types/user";
import { useNavigate } from "react-router-dom";
import { sha256 } from "js-sha256";
import { db } from "../utils/firebase";

export default function LoginPage() {
  const [user, setUser] = useState<IUser>({
    id: 0,
    username: "",
    password: "",
    fullname: "",
    picture: "",
  });

  const [notification, setNotification] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.name;
    const value = e.target.value;

    setUser((prev: IUser) => {
      return { ...prev, [target]: value };
    });
  };

  const handleLogin = async () => {
    const username = user.username;
    const password = sha256(user.password);

    const usersRef = doc(db, 'users', username);
    const userData = (await getDoc(usersRef)).data() as IUser;

    if(userData == null)
      setNotification('User is not exist')
    else if(userData.username != username)
      setNotification('Username is not valid')
    else if(userData.password != password)
      setNotification('Password is not match')
    else if(username == userData.username && password == userData.password)
    {
      navigate('/dashboard')
      setNotification('')
    }
    else
      setNotification('Username or password is not valid')
    
  };

  useEffect(() => {
    const disableButton: boolean = user.username == "" || user.password == "";
    setIsDisabled(disableButton);
  }, [user, passwordVisible]);

  return (
    <div className="login-page">
      <img
        src={bgImage}
        className="absolute w-[100vw] h-[100vh]  object-cover lg:-left-[15%]"
        alt=""
      />
      <div className="login-form shadow-3xl border-gray-400 border-[1px] text-left w-[22rem] lg:w-96">
        <div className="flex items-start flex-col gap-4 ">
          <h1 className="font-bold text-[2rem]">Sign In</h1>
          <p className="text-[1rem]">Masuk untuk akses dashboard monitoring</p>
        </div>
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="w-full border-black border-[1.5px] rounded-xl h-[3.75rem] p-2 focus:border-blue-500"
          onChange={handleChange}
        ></input>
        <div className="flex flex-row w-full items-center">
          <input
            name="password"
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            className="w-full border-black border-[1.5px] rounded-xl h-[3.75rem] p-2 focus:border-blue-500"
            onChange={handleChange}
          ></input>
          <img
            src={passwordVisible ? hidePasswordIcon : showPasswordIcon}
            className="absolute flex w-[30px] h-[30px] right-10"
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        </div>
        {notification != "" && (
          <p className="text-red-500 font-bold self-center">
            {notification}
          </p>
        )}
        <button
          className="bg-button-blue text-white w-40 h-12 rounded-xl self-center font-bold text-[1.25rem] disabled:bg-gray-500"
          disabled={isDisabled}
          onClick={handleLogin}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
