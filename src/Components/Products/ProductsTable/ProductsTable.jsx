import "./ProductsTable.css";
import { useState } from "react";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import DetailModal from "../../Modals/DetailModal/DetailModal";
import EditModal from "../../Modals/EditModal/EditModal";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";

export default function ProductsTable({
  products,
  deleteProduct,
  editProduct,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productID, setProductID] = useState("");
  const [mainProductInfos, setMainProductInfos] = useState({});
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCount, setNewCount] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newPopularity, setNewPopularity] = useState("");
  const [newSale, setNewSale] = useState("");
  const [newColor, setNewColor] = useState("");


  const deleteBtnHandler = () => {
    deleteProduct(productID)
    setShowDeleteModal(false)
  }

  const closeEditModalHandler = () => {
    setShowEditModal(false);
  };

  const submitEditModalHandler = (event) => {
    event.preventDefault();
    let updateProduct = {
      title: newTitle,
      price: newPrice,
      count: newCount,
      img: newImg,
      popularity: newPopularity,
      sale: newSale,
      colors: newColor,
    };
    setShowEditModal(false);
    console.log("فرم ارسال شد");
    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    }).then((res) => {
      res.json();
      console.log(res);
      editProduct(res);
    });
  };

  const editBtnHandler = () => {
    setShowEditModal(true);
  };
  return (
    <>
      <div className="bg-[--white] rounded-[20px] mt-[38px] pt-5">
        <table className="w-full sm:w-[98%] mx-auto">
          <thead>
            <tr className="*:text-[10px] sm:*:text-[16px] ">
              <th>عکس</th>
              <th>اسم</th>
              <th>قیمت</th>
              <th>موجودی</th>
              <th className="sm:hidden">جزئیات</th>
              <th className="sm:hidden">حذف</th>
              <th className="sm:hidden">ویرایش</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="*:text-center *:text-[11px] sm:*:text-sm h-[100px] sm:h-[200px]"
              >
                <td className="w-[65px] sm:w-[150px]">
                  <img className="w-full" src={product.img} alt="productImg" />
                </td>
                <td>{product.title}</td>
                <td>{product.price} تومان</td>
                <td>{product.count}</td>

                <td className="sm:w-28">
                  <button
                    onClick={() => {
                      setShowDetailModal(true);
                      setMainProductInfos(product);
                    }}
                    className="bg-[--blue] text-[--white]  sm:py-[10px] p-1 rounded-md sm:px-5 sm:text-lg sm:rounded-[10px]"
                  >
                    <span className="hidden sm:inline">جزئیات</span>
                    <BiSolidDetail className="text-lg sm:hidden" />
                  </button>
                </td>
                <td className="sm:w-28">
                  <button
                    onClick={() => (
                      setShowDeleteModal(true), setProductID(product.id)
                    )}
                    className="bg-[--blue] text-[--white]  sm:py-[10px] p-1 rounded-md sm:px-5 sm:text-lg sm:rounded-[10px]"
                  >
                    <span className="hidden sm:inline">حذف</span>
                    <MdDelete className="text-lg sm:hidden" />
                  </button>
                </td>
                <td className="sm:w-28 ">
                  <button
                    onClick={() => (
                      editBtnHandler(product), setProductID(product.id)
                    )}
                    className="bg-[--blue] text-[--white]  sm:py-[10px] p-1 rounded-md sm:px-5 sm:text-lg sm:rounded-[10px]"
                  >
                    <span className="hidden sm:inline">ویرایش</span>
                    <FaEdit className="text-lg sm:hidden" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          deleteBtnHandler={deleteBtnHandler}
          productID={productID}
          msg={"آیا از حذف محصول اطمینان دارید ؟ "}
        />
      )}
      {showDetailModal && (
        <DetailModal setShowDetailModal={setShowDetailModal}>
          <table>
            <thead>
              <tr className="text-center *:p-3 sm:*:p-7 text-sm sm*:text-2xl">
                <th>محبوبیت</th>
                <th>فروش</th>
                <th>رنگ بندی</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center *:text-center sm:*:p-7 text-sm sm:*:text-2xl">
                <td>{mainProductInfos.popularity}%</td>
                <td>{mainProductInfos.sale}</td>
                <td>{mainProductInfos.colors}</td>
              </tr>
            </tbody>
          </table>
        </DetailModal>
      )}
      {showEditModal && (
        <EditModal
          onClose={closeEditModalHandler}
          onSubmit={submitEditModalHandler}
        >
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[70%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              className="outline-none border-none bg-inherit text-sm sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="text"
              placeholder="عنوان جدید را وارد کنید ..."
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[70%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              className="outline-none border-none bg-inherit text-sm sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="number"
              placeholder="قیمت جدید را وارد کنید ..."
              value={newPrice}
              onChange={(event) => setNewPrice(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[70%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              className="outline-none border-none bg-inherit text-sm sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="number"
              placeholder="موجودی جدید را وارد کنید ..."
              value={newCount}
              onChange={(event) => setNewCount(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[70%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              className="outline-none border-none bg-inherit text-sm sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="text"
              placeholder="آدرس عکس جدید را وارد کنید ..."
              value={newImg}
              onChange={(event) => setNewImg(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[70%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              className="outline-none border-none bg-inherit text-sm sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="number"
              placeholder="میزان محبوبیت جدید را وارد کنید ..."
              value={newPopularity}
              onChange={(event) => setNewPopularity(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[70%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              className="outline-none border-none bg-inherit text-sm sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="number"
              placeholder="میزان فروش جدید را وارد کنید ..."
              value={newSale}
              onChange={(event) => setNewSale(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-[70%] sm:w-full mx-auto border overflow-hidden bg-[#f4f4f4] px-2 py-1 sm:py-2 sm:px-5 rounded-md sm:rounded-[10px]">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              className="outline-none border-none bg-inherit text-sm sm:text-lg w-full sm:w-full px-[5px] sm:px-[10px]"
              type="number"
              placeholder="تعداد رنگ های جدید را وارد کنید ..."
              value={newColor}
              onChange={(event) => setNewColor(event.target.value)}
            />
          </div>
        </EditModal>
      )}
    </>
  );
}
