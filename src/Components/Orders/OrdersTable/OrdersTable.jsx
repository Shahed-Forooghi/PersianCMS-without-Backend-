// import React from 'react'
import { GiConfirmed } from "react-icons/gi";
import { BiSolidDetail } from "react-icons/bi";
import { useState } from "react";
import DetailModal from "../../Modals/DetailModal/DetailModal";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import { MdDelete } from "react-icons/md";
import { BsBan } from "react-icons/bs";

export default function OrdersTable({ orders , deleteOrder , acceptOrder , rejectOrder}) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRemoveModal , setShowRemoveModal] = useState(false)
  const [showAcceptModal , setShowAcceptModal] = useState(false)
  const [showRejectOrder , setShowRejectOrder] = useState(false)
  const [isAcceptOrder , setIsAcceptOrder] = useState(0)
  const [orderID , setOrderID] = useState('')
  const [mainOrderInfo , setMainOrderInfo] = useState({})

  const removeBtnOrder = () => {
    deleteOrder(orderID)
    setShowRemoveModal(false)
  }

  const acceptBtnOrder = () => {
    setIsAcceptOrder(1)
    acceptOrder(orderID , isAcceptOrder)
    setShowAcceptModal(false)
  }

  const rejectBtnOrder = () => {
    setIsAcceptOrder(0)
    rejectOrder(orderID , isAcceptOrder)
    setShowRejectOrder(false)
  }
  return (
    <div className="bg-[--white] rounded-[20px] mt-[38px] pt-5">
      <table className="w-full sm:w-[98%] mx-auto">
        <thead>
          <tr className="*:text-[10px] sm:*:text-[16px]">
            <th>نام محصول</th>
            <th>نام مشتری</th>
            <th>قیمت</th>
            <th>تاریخ سفارش</th>
            <th className="sm:hidden">تایید/عدم تایید سفارش</th>
            <th className="sm:hidden">جزئیات</th>
            <th className="sm:hidden">حذف</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="*:text-center *:text-[11px] sm:*:text-sm h-[50px] sm:h-[60px]"
            >
              <td>{order.productID}</td>
              <td>{order.userID}</td>
              <td>{order.price}</td>
              <td>{order.date}</td>
              <td>
                {order.isActive === 1 ? <button onClick={() => {setShowRejectOrder(true) , setIsAcceptOrder(0) , setOrderID(order.id)}} className="bg-[--blue] text-[--white]  sm:py-[10px] p-1 rounded-md sm:px-5 sm:text-lg sm:rounded-[10px]">
                  <span className="hidden sm:inline">عدم تایید سفارش</span>
                  <BsBan className="text-lg sm:hidden" />
                </button> : <button onClick={() => {setShowAcceptModal(true) , setIsAcceptOrder(1) , setOrderID(order.id)}} className="bg-[--blue] text-[--white]  sm:py-[10px] p-1 rounded-md sm:px-5 sm:text-lg sm:rounded-[10px]">
                  <span className="hidden sm:inline">تایید سفارش</span>
                  <GiConfirmed className="text-lg sm:hidden" />
                </button> }
                
              </td>
              <td>
                <button onClick={() => {setMainOrderInfo(order) , setShowDetailModal(true)}} className="bg-[--blue] text-[--white]  sm:py-[10px] p-1 rounded-sm sm:px-5 sm:text-lg sm:rounded-[10px]">
                  <span className="hidden sm:inline">جزئیات</span>
                  <BiSolidDetail className="text-lg sm:hidden" />
                </button>
              </td>
              <td>
                <button onClick={() => {setShowRemoveModal(true) , setOrderID(order.id)}} className="bg-[--blue] text-[--white]  sm:py-[10px] p-1 rounded-md sm:px-5 sm:text-lg sm:rounded-[10px]">
                  <span className="hidden sm:inline">حذف</span>
                  <MdDelete className="text-lg sm:hidden" />
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
                <th>ساعت خرید</th>
                <th>تخفیف</th>
                <th>محبوبیت محصول</th>
                <th>تعداد سفارش</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center *:text-center sm:*:p-7 text-sm sm:*:text-2xl">
                <td>{mainOrderInfo.hour}</td>
                <td>{mainOrderInfo.off}</td>
                <td>{mainOrderInfo.popularity}%</td>
                <td>{mainOrderInfo.sale_count}</td>
              </tr>
            </tbody>
          </table>
        </DetailModal>
      )}
      {showRemoveModal && (
        <DeleteModal
          msg={"آیا از حذف سفارش اطمینان دارید ؟"}
          deleteBtnHandler={removeBtnOrder}
          setShowDeleteModal={setShowRemoveModal}
        ></DeleteModal>
      )}
      {showAcceptModal && (
        <DeleteModal
          msg={"آیا از تایید سفارش اطمینان دارید ؟"}
          deleteBtnHandler={acceptBtnOrder}
          setShowDeleteModal={setShowAcceptModal}
        ></DeleteModal>
      )}
      {showRejectOrder && (
        <DeleteModal
          msg={"آیا از عدم تایید سفارش اطمینان دارید ؟"}
          deleteBtnHandler={rejectBtnOrder}
          setShowDeleteModal={setShowRejectOrder}
        ></DeleteModal>
      )}
    </div>
  );
}
