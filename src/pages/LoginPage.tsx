import bgImage from "/backgrounds/23786.jpg";

export default function LoginPage() {
  return (
    <div className="login-page">
      <img src={bgImage} className="login-image" alt="" />
      <div className="login-form shadow-2xl">
        <div className="flex items-start flex-col gap-4">
          <h1 className="font-bold text-[2rem]">Sign In</h1>
          <p className="text-[1rem]">Masuk untuk akses dashboard monitoring</p>
        </div>
        <input type="text" placeholder="Username" className="w-full border-black border-[1.5px] rounded-xl h-[3.75rem] p-2 focus:border-blue-500 ring-0"></input>
        <input type="text" placeholder="Password" className="w-full border-black border-[1.5px] rounded-xl h-[3.75rem] p-2 focus:border-blue-500"></input>
        <button className="bg-button-blue text-white w-44 h-12 rounded-xl self-center font-bold text-[1.25rem]">
          Sign In
        </button>
      </div>
    </div>
  );
}
