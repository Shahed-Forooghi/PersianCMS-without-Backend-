import { AiOutlineBell } from "react-icons/ai";
import { BsBrightnessHigh } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import "./Header.css";

export default function Header() {
  return (
    <div className="header flex justify-between items-center">
      <div className="flex items-center gap-x-1">
        <img
          className=" w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full"
          src="./img/resumepic.jpg"
          alt=""
        />
        <div className="flex flex-col sm:gap-1">
          <h1 className="text-[10px] sm:text-xl">شاهد فروغی</h1>
          <h3 className="text-[7px] sm:text-lg text-[#858585]">
            برنامه نویس فرانت اند
          </h3>
        </div>
      </div>
      <div className="flex h-fit items-center gap-x-1 sm:gap-x-5">
        <div className="flex items-center justify-between w-[85px] sm:w-[400px] h-[30px] sm:h-[45px] bg-[--white] rounded-[7px] sm:rounded-[15px] pl-[2px] shadow-[rgba(149,157,165,0.2) 0 8px 24px]">
          <input
            className="outline-none border-none bg-none pr-[2px] w-full sm:pr-5 text-[8px] sm:text-lg"
            type="text"
            placeholder="جست و جو کنید ... "
          />
          <button className="flex items-center text-[8px] sm:text-lg sm:w-[135px] rounded-[7px] h-[25px] sm:h-[40px] bg-[--blue] text-[--white] px-2 sm:px-5 py-1">
            <span className="hidden sm:inline">جست و جو</span>
            <FaSearch className="sm:hidden" />
          </button>
        </div>
        <button className="icon sm:w-[40px] sm:h-[40px]  text-[10px] sm:text-lg  rounded-[7px] h-[25px] w-[25px]  bg-[--blue] text-[--white] pr-[7px] sm:p-[10px]">
          <AiOutlineBell />
        </button>
        <button className="icon sm:w-[40px] sm:h-[40px] text-[10px] sm:text-lg  rounded-[7px] h-[25px] w-[25px]  bg-[--blue] text-[--white] pr-[7px] sm:p-[10px]">
          <BsBrightnessHigh />
        </button>
      </div>
    </div>
  );
}
