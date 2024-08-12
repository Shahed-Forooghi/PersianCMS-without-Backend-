// import React from 'react'
import { useEffect } from "react";
import ReactDom from "react-dom";
import { CgClose } from "react-icons/cg";

export default function EditModal({ children, onSubmit, onClose }) {
  useEffect(() => {
    const checkKey = (event) => {
      // console.log(event.keyCode);
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", checkKey);

    return () => window.removeEventListener("keydown", checkKey);
  });

  return ReactDom.createPortal(
    <div
      className={`fixed top-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] h-[100vh] w-full duration-200 transition-all visible opacity-100`}
    >
      <div className="w-[300px] h-fit sm:h-auto sm:w-[800px] bg-[--white] ">
        <button onClick={() => onClose()} className=" sm:w-7 sm:h-7">
          <CgClose className="w-full h-full mt-2 mr-2" />
        </button>
        <form
          onSubmit={(event) => onSubmit(event)}
          className="text-center sm:p-[30px]"
        >
        <h1 className="sm:text-2xl">اطلاعات جدید را وارد نمایید</h1>
          <div className="grid grid-cols-2 gap-2">
          {children}
          </div>
          <input
            className=" my-2 sm:mt-5 sm:w-full py-1 sm:py-2 px-[10px] bg-[--blue] text-[--white]"
            type="submit"
            value="ثبت اطلاعات جدید"
          />
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
