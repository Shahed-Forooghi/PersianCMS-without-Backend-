// import { useState } from "react";
import ReactDom from "react-dom";


export default function DeleteModal({setShowDeleteModal , deleteBtnHandler , msg}) {
  return ReactDom.createPortal(
    <div className={`fixed top-0 items-center justify-center bg-[rgba(0,0,0,0.5)] h-[100vh] w-full duration-200 transition-all visible opacity-100 flex`}>
      <div className="bg-[--white] p-[25px] sm:p-[50px] text-center rounded-xl sm:rounded-[20px]">
        <h1 className=" text-xl sm:text-4xl">{msg}</h1>
        <div className="flex justify-evenly items-center mt-[20px]">
          <button onClick={() => {
            deleteBtnHandler()
          }} className="bg-[--blue] text-[--white] py-1 sm:py-[10px] px-3 sm:px-5 text-lg rounded-md sm:rounded-[10px]">
            بله
          </button>
          
          <button onClick={() => setShowDeleteModal(false)} className="py-1 sm:py-[10px] px-3 sm:px-5 text-lg rounded-md sm:rounded-[10px] border-black border">
            خیر
          </button>
        </div>
      </div>
    </div>,

    document.getElementById("modal")
  );
}
