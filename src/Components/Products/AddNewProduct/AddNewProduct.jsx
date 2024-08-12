import "./AddNewProduct.css";
import { useState } from "react";

export default function AddNewProduct({ getAllData , notify }) {


  const [productTitle, setProductTitle] = useState("");
  const [productCount, setProductCount] = useState("");
  const [productPopularity, setProductPopularity] = useState("");
  const [productColors, setProductColors] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImg, setProductImg] = useState("");
  const [productSale, setProductSale] = useState("");
  
  const submitFormHandler = async (event) => {
    event.preventDefault();
    let newProduct = {
      title: productTitle,
      price: productPrice,
      count: productCount,
      img: productImg,
      popularity: productPopularity,
      sale: productSale,
      colors: productColors, 
    };
    await fetch("http://localhost:8000/api/products/", {
      method: "POST",
      headers : { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        res.json()
        console.log(res);
      })
      .then(() => {
        getAllData();
        setProductTitle('')
        setProductCount('')
        setProductImg('')
        setProductColors('')
        setProductPopularity('')
        setProductSale('')
        setProductPrice('')
        notify('محصول مورد نظر با موفقیت اضافه شد')

      });
    // addNewProduct(newProduct);
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl mb-3 sm:mb-8">افزودن محصول جدید</h1>
      <form
        onSubmit={submitFormHandler}
        className="flex items-end justify-evenly flex-col p-2 sm:p-5 rounded-[20px] bg-[--white]"
      >
        <div className="add-product-form-wrap grid w-full sm:grid-cols-2 gap-2 sm:gap-4 *:flex sm:*:items-center sm:*:gap-x-3 *:bg-[#f4f4f4] *:px-1 sm:*:px-5 *:rounded-md sm:*:rounded-xl">
          <div>
            <input
              onChange={(event) =>
                setProductTitle(event.nativeEvent.target.value)
              }
              value={productTitle}
              type="text"
              placeholder="اسم محصول را وارد کنید ... "
            />
          </div>
          <div>
            <input
              onChange={(event) =>
                setProductPrice(event.nativeEvent.target.value)
              }
              value={productPrice}
              type="number"
              placeholder="قیمت محصول را وارد کنید ... "
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="تعداد موجودی محصول را وارد کنید ..."
              onChange={(event) =>
                setProductCount(event.nativeEvent.target.value)
              }
              value={productCount}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="عکس محصول را وارد کنید ..."
              onChange={(event) =>
                setProductImg(event.nativeEvent.target.value)
              }
              value={productImg}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="میزان محبوبیت محصول را وارد کنید ..."
              onChange={(event) =>
                setProductPopularity(event.nativeEvent.target.value)
              }
              value={productPopularity}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="میزان فروش محصول را وارد کنید ..."
              onChange={(event) =>
                setProductSale(event.nativeEvent.target.value)
              }
              value={productSale}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="تعداد رنگ بندی محصول را وارد کنید ..."
              onChange={(event) =>
                setProductColors(event.nativeEvent.target.value)
              }
              value={productColors}
            />
          </div>
        </div>
        <input
          className="bg-[--blue] text-[--white] mt-[10px] text-sm py-[5px] sm:py-[10px] px-2 sm:px-5 sm:text-lg rounded-[5px] sm:rounded-[10px] cursor-pointer"
          type="submit"
          value="ثبت محصول"
        />
      </form>
    </div>
  );
}
