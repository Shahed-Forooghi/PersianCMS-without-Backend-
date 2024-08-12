import "./Sidebar.css";
import { AiOutlineHome } from "react-icons/ai";
import {NavLink } from "react-router-dom";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { BsBagCheck, BsCurrencyDollar } from "react-icons/bs";

export default function Sidebar() {
  return (
    <div className="fixed bg-[--blue] w-fit text-[--white] h-[100vh] flex-1">
      <h1 className="sidebar-title text-[1.4rem] p-4 border-b-2 border-[#6c48bb] hidden sm:block">
        به داشبورد خود خوش آمدید
      </h1>
      <ul className="sidebar-links mt-5 *:p-2 sm:*:p-4">
        <NavLink className="mb-5" to="/">
            <AiOutlineHome /> 
            <span className="hidden sm:inline">صفحه اصلی</span>
        </NavLink>
        <NavLink to={'/products'}>
            <MdProductionQuantityLimits /> 
            <span className="hidden sm:inline">محصولات</span>
        </NavLink>
        <NavLink to={'/comments'}>
            <BiCommentDetail /> 
            <span className="hidden sm:inline">کامنت ها</span>
        </NavLink>
        <NavLink to={'/users'}>
            <FiUsers /> 
            <span className="hidden sm:inline">کاربران</span>
        </NavLink>
        <NavLink to={'/orders'}>
            <BsBagCheck />
            <span className="hidden sm:inline">سفارشات</span>
        </NavLink>
        <NavLink to={'/offs'}>
            <BsCurrencyDollar />
            <span className="hidden sm:inline">تخفیف ها</span>
        </NavLink>
      </ul>
    </div>
  );
}
