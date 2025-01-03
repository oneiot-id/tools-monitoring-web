import PageContainerProps from "../types/pagecontainerinterface";

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="flex flex-col items-start max-w-[1198px] rounded-[1.25rem] mx-auto bg-[#F4F4F4] w-[89%] h-fit mt-[8.5rem]">
      <div className="flex flex-col items-start md:p-[2.5rem] pt-[2.1rem] px-[1rem] flex-1 w-full">
        <h1 className="font-bold text-[1.5rem] md:text-[2rem] text-left mb-[0.5rem]">
          {title == "" ? "Dashboard" : title}
        </h1>
        <p className="text-left text-base md:text-[1.25rem] mb-[1.2rem]">{subtitle}</p>
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
