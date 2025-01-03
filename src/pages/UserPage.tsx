import { useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import defaultUserIcon from "/icons/default-user-icon.png";
import showIcon from "/icons/show.png";
import hideIcon from "/icons/hide (1).png";
import { baseUrl } from "../helper/navigation";
import { useEffect, useState } from "react";
import { getUser, updateUser } from "../utils/database";
import { IUser } from "../types/user";
import { sha256 } from "js-sha256";
import userIcon from "/icons/user.png";

export interface IUserPage{
    setUser : (user: IUser) => void
}

export default function UserPage(props: IUserPage) {
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>({
    fullname: "",
    id: 0,
    password: "",
    picture: "",
    username: "",
  });

  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
    picture: "",
    newpass: "",
    newpassconfirm: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [warning, setWarning] = useState("");

  const [showConfirmation, setShowConfirmation] = useState(false);

  const fetchUser = async () => {
    const u = await getUser();

    if (u != null) {
        props.setUser(u);
      setUser(u);
      setUserForm({
        username: u.username,
        password: "",
        picture: u.picture,
        newpass: "",
        newpassconfirm: "",
      });
    }
  };

  const handleChange = (e: any) => {
    const target = e.target.name;
    const value = e.target.value;

    setUserForm((prev) => ({
      ...prev,
      [target]: value,
    }));
  };

  const handleUpdate = async () => {
    // Hash the old password from the form
    const oldPasswordHashed = sha256(userForm.password);

    if (user.password !== oldPasswordHashed) {
      setWarning("Password lama tidak benar");
      return;
    }

    if (userForm.newpass !== userForm.newpassconfirm) {
      setWarning("Password baru dan konfirmasi tidak sama");
      return;
    }

    setShowConfirmation(true);
  };

  const confirmUpdate = async () => {
    const newPasswordHashed = sha256(userForm.newpass);

    const updatedUser = {
      id: 0, // Pastikan ID sesuai dengan kebutuhan Anda
      username: userForm.username,
      password: newPasswordHashed,
      fullname: userForm.username, // Jika fullname tidak relevan, ganti sesuai kebutuhan
      picture: userForm.picture,
    }

    try {
      await updateUser(updatedUser);

      setWarning("");
      fetchUser();
    } catch (error) {
      console.error("Error updating user:", error);
      setWarning("Terjadi kesalahan saat memperbarui password");
    }

    localStorage.setItem('user', JSON.stringify(updatedUser))
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <PageContainer title="Profile" subtitle="Kustomisasi akun sesuai pengguna">
      {showConfirmation && (
        <div className={`${showConfirmation ? 'slide-down' : 'slide-up'} slide-down bg-black-transparent w-full h-full fixed top-0 left-0 
                        z-[100] flex items-center justify-center `}>
          <div className="flex flex-col bg-white max-w-[300px] h-[375px] md:w-full w-[75%] rounded-xl px-[25px] justify-evenly items-center">
            <img src={userIcon} alt="" className="w-[75px] h-[75px]" />
            <p>Apakah Anda yakin untuk memperbarui profile pengguna?</p>
            <div className="text-white font-bold flex flex-row justify-evenly w-full">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  confirmUpdate();
                  setShowConfirmation(false)

                }}
                className="bg-[#3DBC06] min-w-[70px] px-3 py-2 rounded-lg hover:opacity-70 transition-all duration-200"
              >
                Ya
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirmation(false)
                }}
                className="bg-[#E3210C]  min-w-[70px] px-3 py-2 rounded-lg hover:opacity-70 transition-all duration-200 text-center"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col bg-[#FFFFFF] box-sh-sm rounded-[1.25rem] w-full justify-center items-center max-w-[420px] h-max pt-[1.5rem] md:px-[3.375rem] px-[2.375rem]">
          <img
            src={user.picture == "" ? defaultUserIcon : user.picture}
            alt=""
            className="w-[150px] h-[150px] object-cover rounded-[100%] min-w[150px] min-h[150px]"
          />

          <form
            action=""
            className="w-full flex items-center flex-col gap-9 mt-9"
          >
            <input
              className="text-center font-bold text-[2rem] w-[50%] 
                        border-b-gray-500 border-[2px]  
                        border-transparent focus:border-b-[#414FF4] outline-none "
              type="text"
              name="username"
              id="username"
              value={userForm.username}
              onChange={handleChange}
            />
            {warning != "" && (
              <p
                className={`font-bold text-[#E3210C]
                }`}
              >
                {warning}
              </p>
            )}
            <input
              className="border-black border-[1px] rounded-[.5rem] px-[0.8rem] w-full h-[60px]"
              type="text"
              name="picture"
              id="picture"
              placeholder="Picture Link"
              value={userForm.picture}
              onChange={handleChange}
            />
            <div className="flex flex-row w-full items-center justify-end">
              <input
                className="border-black border-[1px] rounded-[.5rem] px-[0.8rem] w-full h-[60px] pr-[2.5rem]"
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password Sekarang"
                onChange={handleChange}
                value={userForm.password}
              />
              <img
                style={{ cursor: "pointer" }}
                onClick={() => setPasswordVisible(!passwordVisible)}
                src={passwordVisible ? hideIcon : showIcon}
                alt=""
                className="absolute w-[30px] mr-2"
              />
            </div>
            <input
              className="border-black border-[1px] rounded-[.5rem] px-[0.8rem] w-full h-[60px]"
              type={passwordVisible ? "text" : "password"}
              name="newpass"
              id="newpass"
              placeholder="Password Baru"
              onChange={handleChange}
              value={userForm.newpass}
            />
            <input
              className="border-black border-[1px] rounded-[.5rem] px-[0.8rem] w-full h-[60px]"
              type={passwordVisible ? "text" : "password"}
              name="newpassconfirm"
              id="newpassconfirm"
              placeholder="Password Konfirmasi"
              onChange={handleChange}
              value={userForm.newpassconfirm}
            />
            <div className="flex flex-row w-full justify-evenly text-white font-bold mb-9">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
                className="bg-[#3DBC06] px-4 py-2 rounded-lg hover:opacity-70 transition-all duration-200"
              >
                Update
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate(`${baseUrl}`);
                }}
                className="bg-[#E3210C] px-4 py-2 rounded-lg  hover:opacity-70 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}
