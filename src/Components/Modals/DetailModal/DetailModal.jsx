import { useEffect } from "react";
import ReactDom from "react-dom";
import { CgClose } from "react-icons/cg";

export default function DetailModal({ setShowDetailModal, children }) {
  useEffect(() => {
    const checkKey = (event) => {
      // console.log(event.keyCode);
      if (event.keyCode === 27) {
        setShowDetailModal(false);
      }
    };
    window.addEventListener("keydown", checkKey);
  });

  return ReactDom.createPortal(
    <div
      className={`fixed top-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] h-[100vh] w-full duration-200 transition-all visible opacity-100`}
    >
      <div className="bg-[--white] rounded-[5px]">
        <button
          onClick={() => setShowDetailModal(false)}
          className="w-5 h-5 sm:w-7 sm:h-7"
        >
          <CgClose className="w-full h-full mt-2 mr-2" />
        </button>
        {children}
      </div>
    </div>,

    document.getElementById("modal")
  );
}
