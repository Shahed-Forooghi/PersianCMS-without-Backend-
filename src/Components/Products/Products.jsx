import ErrorBox from "../ErrorBox/ErrorBox";
import AddNewProduct from "./AddNewProduct/AddNewProduct";
import ProductsTable from "./ProductsTable/ProductsTable";
import { useEffect, useState } from "react";
// import DeleteModal from '../Modals/DeleteModal/DeleteModal'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (msg) =>
  toast.success(msg, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    // transition: Bounce,
  });

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllData();
    // .then(console.log(products))
  }, []);

  const getAllData = () => {
    fetch("http://localhost:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  const deleteProduct = async (productID) => {
    await fetch(`http://localhost:8000/api/products/${+productID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        getAllData();
        notify("محصول مورد نظر با موفقیت حذف شد  !");
      });
  };

  const editProduct = (res) => {
    if (res.status === 200) {
      getAllData();
      notify("محصول مورد نظر با موفقیت ویرایش شد.");
    }
  };

  return (
    <div className="mt-14">
      <AddNewProduct
        notify={notify}
        getAllData={getAllData}
        productsLength={products.length}
      />
      {products.length ? (
        <ProductsTable
          products={products}
          deleteProduct={deleteProduct}
          editProduct={editProduct}
        />
      ) : (
        <ErrorBox msg={"هیج محصولی یافت نشد ."} />
      )}
      <div>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
}
