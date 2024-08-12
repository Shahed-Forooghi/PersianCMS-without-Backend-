// import React from "react";
import { MdDelete } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { SiAnswer } from "react-icons/si";
import DetailModal from "../../Modals/DetailModal/DetailModal";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import { useState } from "react";
import { FaBan } from "react-icons/fa";
export default function CommentsTable({
  comments,
  deleteComment,
  // getAllComments,
  acceptComment,
  rejectComment
}) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [mainCommentInfo, setMainCommentInfo] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentID, setCommentID] = useState(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal , setShowRejectModal] = useState(false)

  const deleteBtnHandler = () => {
    deleteComment(commentID);
    setShowDeleteModal(false);
    // getAllComments();
  };

  const acceptBtnHandler = () => {
    acceptComment(commentID);
    setShowAcceptModal(false);
  };

  const rejectBtnHandler = (commentID) => {
    rejectComment(commentID)
    setShowRejectModal(false)
  }


  return (
    <div className="bg-[--white] rounded-[20px] mt-[38px] pt-5">
      <table className="w-full sm:w-[98%] mx-auto">
        <thead>
          <tr className="*:text-[10px] sm:*:text-[16px] ">
            <th>نام کاربر</th>
            <th>محصول</th>
            <th>کامنت</th>
            <th>تاریخ</th>
            <th>ساعت</th>
            <th className="sm:hidden">حذف</th>
            <th className="sm:hidden">پاسخ</th>
            <th className="sm:hidden">تایید</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr
              key={comment.id}
              className="*:text-center *:text-[11px] sm:*:text-sm h-[50px] sm:h-[60px]"
            >
              <td className="w-[65px] sm:w-[150px]">{comment.userID}</td>
              <td>{comment.productID}</td>
              <td>
                <button
                  onClick={() => {
                    setShowDetailModal(true), setMainCommentInfo(comment);
                  }}
                  className="bg-[--blue] text-[--white]  sm:py-[10px] p-1 rounded-md sm:px-5 sm:text-lg sm:rounded-[10px]"
                >
                  دیدن متن
                </button>
              </td>
              <td>{comment.date}</td>
              <td>{comment.hour}</td>

              <td className="sm:w-28">
                <button
                  onClick={() => {
                    setShowDeleteModal(true), setCommentID(comment.id);
                  }}
                  className="bg-[--blue] text-[--white]  sm:py-[10px] p-1 rounded-md sm:px-5 sm:text-lg sm:rounded-[10px]"
                >
                  <span className="hidden sm:inline">حذف</span>
                  <MdDelete className="text-lg sm:hidden" />
                </button>
              </td>
              <td className="sm:w-28">
                <button className="bg-[--blue] text-[--white]  sm:py-[10px] p-1 rounded-md sm:px-5 sm:text-lg sm:rounded-[10px]">
                  <span className="hidden sm:inline">پاسخ</span>
                  <SiAnswer className="text-lg sm:hidden" />
                </button>
              </td>
              <td className="sm:w-28 ">
                {!comment.isAccept ? (
                  <button
                    onClick={() => {
                      setShowAcceptModal(true), setCommentID(comment.id);
                    }}
                    className="bg-[--blue] text-[--white]  sm:py-[10px] p-1 rounded-md sm:px-5 sm:text-lg sm:rounded-[10px]"
                  >
                    <span className="hidden sm:inline">تایید</span>
                    <GiConfirmed className="text-lg sm:hidden" />
                  </button>
                ) : (
                  <button className="bg-[--blue] text-[--white]  sm:py-[10px] p-1 rounded-md sm:px-5 sm:text-lg sm:rounded-[10px]">
                    <span className="hidden sm:inline">رد کردن</span>
                    <FaBan className="text-lg sm:hidden" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDetailModal && (
        <DetailModal setShowDetailModal={setShowDetailModal}>
          <p className="py-5 px-9 text-xl">{mainCommentInfo.body}</p>
        </DetailModal>
      )}
      {showDeleteModal && (
        <DeleteModal
          msg={'آیا از حذف کامنت اطمینان دارید ؟'}
          deleteBtnHandler={deleteBtnHandler}
          setShowDeleteModal={setShowDeleteModal}
        ></DeleteModal>
      )}
      {showAcceptModal && (
        <DeleteModal
          msg={'آیا از تایید کامنت اطمینان دارید ؟ '}
          setShowDeleteModal={setShowAcceptModal}
          deleteBtnHandler={acceptBtnHandler}
        />
      )}
      {showRejectModal && (<DeleteModal msg={'آیا از رد کردن کامنت اطمینان دارید ؟'}
        setShowDeleteModal={setShowRejectModal}
        deleteBtnHandler={rejectBtnHandler}
      />)}
    </div>
  );
}
