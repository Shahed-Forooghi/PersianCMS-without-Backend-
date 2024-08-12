// import React from "react";
import { MdDelete } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import "./UsersTable.css";
import { useState } from "react";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import EditModal from "../../Modals/EditModal/EditModal";
import DetailModal from "../../Modals/DetailModal/DetailModal"
export default function UsersTable({ users, removeUser , editUser }) {
  const [userID, setUserID] = useState(null);
  const [mainUserInfos , setMainUserInfos] = useState({})
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal , setShowDetailModal] = useState(false)
  const [newName , setNewName] = useState('')
  const [newLastName , setNewLastName ] = useState('')
  const [newUsername , setNewUsername] = useState('')
  const [newPhone , setNewPhone] = useState('')
  const [newPass ,setNewPass] = useState('')
  const [newCity , setNewCity] = useState('')
  const [newEmail , setNewEmail] = useState('')
  const [newAddress , setNewAddress] = useState('')
  const [newBuyCount , setNewBuyCount] = useState('')
  const [newScore , setNewScore] = useState('')

  const removeBtnUser = () => {
    removeUser(userID);
    setShowRemoveModal(false);
  };

  const updateUserHandler = (event) => {
    event.preventDefault()
    let updateUser = {
        firsname : newName ,
        lastname : newLastName ,
        username : newUsername ,
        password : newPass ,
        phone : newPhone ,
        city : newCity ,
        email : newEmail ,
        address : newAddress ,
        score : newScore ,
        buy : newBuyCount ,
    }
    editUser(updateUser , userID)
    setShowEditModal(false)
  }


  return (
    <div className="sm:bg-[--white] rounded-md mx-auto sm:rounded-[20px] sm:mt-[38px] sm:pt-5">
      <table className="userstable w-[90%] sm:w-[98%] mx-auto">
        <thead>
          <tr className="*:text-[10px] sm:*:text-[16px]">
            <th>نام و نام خانوادگی</th>
            <th>نام کاربری</th>
            <th>رمز عبور</th>
            <th>شماره تماس</th>
            <th>ایمیل</th>
            <th className="sm:hidden">حذف</th>
            <th className="sm:hidden">جزئیات</th>
            <th className="sm:hidden">ویرایش</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="bg-[--white] sm:bg-none *:text-[11px] sm:*:text-sm sm:h-[60px] sm:*:text-center"
            >
              <td data-label={"نام و نام خانوادگی"}>
                {user.firsname} {user.lastname}
              </td>
              <td data-label={"نام کاربری"}>{user.username}</td>
              <td data-label={"رمز عبور"}>{user.password}</td>
              <td data-label={"شماره تماس"}>{user.phone}</td>
              <td data-label={"ایمیل"}>{user.email}</td>

              <td data-label={"حذف"}>
                <button
                  onClick={() => {
                    setShowRemoveModal(true);
                    setUserID(user.id);
                  }}
                  className="bg-[--blue] text-[--white]  sm:py-[10px] p-1 rounded-sm sm:px-5 sm:text-lg sm:rounded-[10px]"
                >
                  <span className="hidden sm:inline">حذف</span>
                  <MdDelete className="sm:hidden" />
                </button>
              </td>
              <td data-label={"جزئیات"}>
                <button onClick={() => {setShowDetailModal(true) , setMainUserInfos(user)}} className="bg-[--blue] text-[--white]  sm:py-[10px] p-1 rounded-sm sm:px-5 sm:text-lg sm:rounded-[10px]">
                  <span className="hidden sm:inline">جزئیات</span>
                  <BiSolidDetail className="sm:hidden" />
                </button>
              </td>
              <td data-label={"ویرایش"}>
                <button onClick={() => {setShowEditModal(true) ,
                   setUserID(user.id)
                   setNewName(user.firsname)
                   setNewLastName(user.lastname)
                   setNewUsername(user.username)
                   setNewPhone(user.phone)
                   setNewPass(user.password)
                   setNewCity(user.city)
                   setNewEmail(user.email)
                   setNewAddress(user.address)
                   setNewBuyCount(user.buy)
                   setNewScore(user.score)
                   }} className="bg-[--blue] text-[--white]  sm:py-[10px] p-1 rounded-sm sm:px-5 sm:text-lg sm:rounded-[10px]">
                  <span className="hidden sm:inline">ویرایش</span>
                  <FaEdit className="sm:hidden" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDetailModal && (
        <DetailModal setShowDetailModal={setShowDetailModal}>
          <table>
            <thead>
              <tr className="text-center *:p-3 sm:*:p-7 text-sm sm*:text-2xl">
                <th>شهر</th>
                <th>آدرس</th>
                <th>امتیاز</th>
                <th>میزان خرید</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center *:text-center sm:*:p-7 text-sm sm:*:text-2xl">
                <td>{mainUserInfos.city}</td>
                <td>{mainUserInfos.address}</td>
                <td>{mainUserInfos.score}</td>
                <td>{mainUserInfos.buy}</td>
              </tr>
            </tbody>
          </table>
        </DetailModal>
      )}
      {showRemoveModal && (
        <DeleteModal
          msg={"آیا از حذف کاربر اطمینان دارید ؟"}
          deleteBtnHandler={removeBtnUser}
          setShowDeleteModal={setShowRemoveModal}
        ></DeleteModal>
      )}
      {showEditModal && (
        <EditModal onClose={setShowEditModal} onSubmit={updateUserHandler}>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[90%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              {/* <AiOutlineDollarCircle /> */}
            </span>
            <input
              formMethod="PUT"
              className="outline-none border-none bg-inherit text-[8px] sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="text"
              placeholder="نام را وارد کنید ..."
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[90%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              {/* <AiOutlineDollarCircle /> */}
            </span>
            <input
              className="outline-none border-none bg-inherit text-[8px] sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="text"
              placeholder="نام کاربری را وارد کنید ..."
              value={newUsername}
              onChange={(event) => setNewUsername(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[90%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              {/* <AiOutlineDollarCircle /> */}
            </span>
            <input
              className="outline-none border-none bg-inherit text-[8px] sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="text"
              placeholder="نام خانوادگی را وارد کنید ..."
              value={newLastName}
              onChange={(event) => setNewLastName(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[90%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              {/* <AiOutlineDollarCircle /> */}
            </span>
            <input
              className="outline-none border-none bg-inherit text-[8px] sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="text"
              placeholder="رمز عبور جدید را وارد کنید ..."
              value={newPass}
              onChange={(event) => setNewPass(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[90%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              {/* <AiOutlineDollarCircle /> */}
            </span>
            <input
              className="outline-none border-none bg-inherit text-[8px] sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="text"
              placeholder=" شماره تماس جدید را وارد کنید ..."
              value={newPhone}
              onChange={(event) => setNewPhone(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[90%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              {/* <AiOutlineDollarCircle /> */}
            </span>
            <input
              className="outline-none border-none bg-inherit text-[8px] sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="text"
              placeholder=" محل زندگی جدید را وارد کنید ..."
              value={newCity}
              onChange={(event) => setNewCity(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[90%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              {/* <AiOutlineDollarCircle /> */}
            </span>
            <input
              className="outline-none border-none bg-inherit text-[8px] sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="text"
              placeholder=" ایمیل جدید را وارد کنید ..."
              value={newEmail}
              onChange={(event) => setNewEmail(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[90%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              {/* <AiOutlineDollarCircle /> */}
            </span>
            <input
              className="outline-none border-none bg-inherit text-[8px] sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="text"
              placeholder="آدرس جدید را وارد کنید ..."
              value={newAddress}
              onChange={(event) => setNewAddress(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[90%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              {/* <AiOutlineDollarCircle /> */}
            </span>
            <input
              className="outline-none border-none bg-inherit text-[8px] sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="text"
              placeholder="میزان خرید جدید را وارد کنید ..."
              value={newBuyCount}
              onChange={(event) => setNewBuyCount(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[90%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              {/* <AiOutlineDollarCircle /> */}
            </span>
            <input
              className="outline-none border-none bg-inherit text-[8px] sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="number"
              placeholder="امتیاز جدید کاربر را وارد کنید ..."
              value={newScore}
              onChange={(event) => setNewScore(event.target.value)}
            />
          </div>
        </EditModal>
      )}
    </div>
  );
}
