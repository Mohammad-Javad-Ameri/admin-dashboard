import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReadProductApi } from "../../Apis/productApis";
import AddProduct from "../../components/AddProduct/AddProduct";
import { AddProductProps } from "../../components/AddProduct/AddProduct.types";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Spinner from "../../components/spinner/Spinner";
import { useDashboard } from "../../context/AppContext";
import { HandleAxiosError } from "../../utils/HandleAxiosErrors";
import { HandleAnimateComponent, HandleOpenComponent } from "../../utils/utils";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { product, authDispatch }: any = useDashboard();
  const [productData, setProductData] = useState<AddProductProps | null>(null);
  const [OpenEditComponent, setOpenEditComponent] = useState<Boolean>(false);
  const [AnimateEditProduct, setAnimateEditProduct] = useState<Boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (product.products.length) {
      let getProduct = product.products.find(
        (pro: AddProductProps) => pro._id === id
      );
      setProductData(getProduct);
    } else {
      (async () => {
        await ReadProductApi(id)
          .then((res) => setProductData(res.data.data))
          .catch((error) => HandleAxiosError(error, authDispatch, navigate));
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OpenEditComponent === false]);
  const HandleAddProductAnimi = () => {
    HandleAnimateComponent(setAnimateEditProduct, setOpenEditComponent);
  };
  return (
    <section className="defaultPage ProductDetails">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        {productData ? (
          <div className="content">
            {OpenEditComponent && (
              <AddProduct
                AnimateAddProduct={AnimateEditProduct}
                HandleAddProductAnimi={HandleAddProductAnimi}
                data={productData}
              />
            )}
            <h2 className="PageTitle">Product Details </h2>
            <div className="flex flex-wrap md:flex-nowrap gap-10">
              <div className="w-full md:w-1/2">
                <img
                  src={productData?.mainImage}
                  alt={productData?.title}
                  width="100%"
                />
              </div>
              <div className="capitalize  text-lg md:text-xl lg:text-2xl font-semibold font-serif">
                <div className="ProductDetails_content_desc_status mb-3">
                  <p className="text-sm text-grey-500 font-semibold">
                    Status:{" "}
                    <span
                      className={`font-bold ${
                        productData?.published
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {productData?.published
                        ? "The product Published"
                        : "The product Not Published"}
                    </span>
                  </p>
                </div>
                <h2 className="ProductDetails_content_desc_title">
                  {productData?.title}
                </h2>
                <p className=" uppercase font-serif font-medium text-gray-500 text-sm">
                  SKU: <span>{productData?.sku}</span>
                </p>
                <p className="font-bold text-2xl mt-6">
                  ${productData?.salePrice}
                </p>
                <div className="flex items-center mt-2">
                  <span
                    className={`py-[2px] px-3 rounded-full font-bold text-xs ${
                      productData && productData.Stock <= 0
                        ? "bg-red-200 text-red-500"
                        : "bg-green-200 text-green-500"
                    }`}
                  >
                    {productData && productData.Stock > 0
                      ? "in Stock"
                      : "out Of Stouk"}
                  </span>
                  <span className="text-sm text-gray-500 font-medium pl-4">
                    Quantity: {productData?.Stock}
                  </span>
                </div>
                <p className="py-4 text-sm leading-6 text-gray-500 dark:text-gray-400 md:leading-7">
                  {productData?.description}
                </p>
                <div className="ProductDetails_content_desc_category">
                  <span className="text-gray-700 font-bold">Category: </span>
                  <span className="font-serif font-semibold py-1 text-gray-500 text-sm">
                    {productData?.category.title}
                  </span>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    HandleOpenComponent(
                      e,
                      setOpenEditComponent,
                      setAnimateEditProduct
                    );
                  }}
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
