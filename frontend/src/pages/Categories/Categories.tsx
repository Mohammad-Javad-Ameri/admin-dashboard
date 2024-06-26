/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import Select from "../../components/Form/select/Select";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import CategoryTable from "../../components/Tables/CategoryTable/CategoryTable";
import { FiXCircle } from "react-icons/fi";
import "./Categories.css";
import AddCategory from "../../components/AddCategory/AddCategory";
import { HandleAnimateComponent, HandleOpenComponent } from "../../utils/utils";
import {
  CategoriesListApi,
  FilterCategories,
  getCategories,
} from "../../Apis/CategoryApis";
import { HandleAxiosError } from "../../utils/HandleAxiosErrors";
import { useDashboard } from "../../context/AppContext";
import {
  allCategories,
  categoriesListAction,
  isLoadingAction,
} from "../../context/Actions/CategoryActions/CategoryActions";
import Spinner from "../../components/spinner/Spinner";

const Categories = () => {
  const [OpenAddCategory, setOpenAddCategory] = useState<Boolean>(false);
  const [AnimateAddPCategory, setAnimateAddPCategory] =
    useState<Boolean>(false);
  const { authDispatch, categoryDispatch, category }: any = useDashboard();
  const [Search, setSear5ch] = useState<object>({});

  // to handle Add Product component animation
  const HandleAddCategoryAnimi = () => {
    HandleAnimateComponent(setAnimateAddPCategory, setOpenAddCategory);
  };
  useEffect(() => {
    // for animate add product component
    window.addEventListener("click", HandleAddCategoryAnimi);
    setTimeout(() => {
      return window.removeEventListener("click", () =>
        HandleAddCategoryAnimi()
      );
    }, 1000);
  }, []);
  useEffect(() => {
    if (!category.categories.length) {
      (async () => {
        categoryDispatch(isLoadingAction(true));
        await getCategories()
          .then((res) => {
            categoryDispatch(allCategories(res.data));
          })
          .catch((err) => {
            HandleAxiosError(err, authDispatch);
            categoryDispatch(isLoadingAction(false));
          });
      })();
    }
    if (!category.categoriesList.length) {
      (async () => {
        await CategoriesListApi()
          .then((res) => categoryDispatch(categoriesListAction(res.data)))
          .catch((err) => HandleAxiosError(err, authDispatch));
      })();
    }
  }, []);
  const HandleSearch = async ({ ...rest }) => {
    setSear5ch({ ...Search, ...rest });
    categoryDispatch(isLoadingAction(true));
    console.log({ ...Search, ...rest });
    await FilterCategories({ ...Search, ...rest })
      .then((res) => {
        categoryDispatch(allCategories(res.data));
        categoryDispatch(isLoadingAction(false));
      })
      .catch((error) => HandleAxiosError(error, authDispatch));
  };
  return (
    <section className="Categories">
      {OpenAddCategory && (
        <AddCategory
          AnimateAddPCategory={AnimateAddPCategory}
          HandleAddCategoryAnimi={HandleAddCategoryAnimi}
        />
      )}
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div className="content">
          <h2 className="PageTitle">Categories</h2>
          <div className="Categories_filter">
            <input
              type="text"
              className="w-full p-3 outline-none border border-gray-300 rounded-lg"
              placeholder="Search By Category Name"
              onChange={(e) => HandleSearch({ title: e.target.value })}
            />
            <Select
              options={category.categoriesList}
              title="Category"
              onChange={(e) => HandleSearch({ _id: e.target.value })}
              className="w-full"
            />
          </div>
          {category.isLoading ? <Spinner /> : <CategoryTable data={category} />}
        </div>
      </div>
    </section>
  );
};

export default Categories;
