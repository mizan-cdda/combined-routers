// import { Icon } from "@/@core-components/builder-components/IconHandler/IconComponent";

const FooterArea = ({ isActive }: any) => {
  return (
    <div className="  w-full h-[56px] flex fixed bottom-0 right-0  bg-primary text-white ">
      <div
        className={` ${
          isActive ? "md:ml-20 ml-72 " : "md:ml-72 ml-20"
        } text-white  px-10   bg-transparent w-full flex justify-between items-center duration-300 ease-in-out transition-all `}
      >
        <div className="">
          <span className="text-base lg:text-lg leading-[18px] ">
            © 2024 Pyreactor inc.
          </span>
        </div>

        <div className="flex space-x-4">
          {/* <Icon nameIcon="FaFacebookF" className="text-[#666666] text-2xl" />
          <Icon nameIcon="FaTwitter" className="text-[#666666] text-2xl" />
          <Icon nameIcon="FaGithub" className="text-[#666666] text-2xl" /> */}
        </div>
      </div>
    </div>
  );
};

export default FooterArea;
