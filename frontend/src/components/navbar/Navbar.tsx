import React, { useState, useEffect, MouseEvent } from "react";
import { FiBell, FiMenu } from "react-icons/fi";
import Profile from "../../Assets/Img/Profile.png";
import Notifications from "../Notification/Notifications";
import { OpenMenuAction } from "../../context/Actions/AuthActions/AuthActions";
import { useDashboard } from "../../context/AppContext";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState<Boolean>(false);
  const [showNotifications, setShowNotifications] = useState<Boolean>(false);
  const { authDispatch }: any = useDashboard();

  useEffect(() => {
    // to close notifications menu when click on anywhere in window
    const HandleNotifications: EventListener = (e: Event) => {
      setShowNotifications(false);
    };
    window.addEventListener("click", HandleNotifications);
  }, [showNotifications]);

  //check if website opened on mobile or desktop to show the menu
  useEffect(() => {
    if (/Android|iPhone/i.test(navigator.userAgent)) {
      setIsMobile(true);
    }
  }, [isMobile]);

  const HandleOpenMenu = (e: any) => {
    e.stopPropagation();
    authDispatch(OpenMenuAction(true));
  };

  const notifcations = [
    {
      id: 1,
      title: "new notifications ",
      date: new Date(),
      img: "https://cdn.pixabay.com/photo/2020/05/26/09/32/product-5222398_960_720.jpg",
      status: "stock Out",
    },
    {
      id: 2,
      title: "new notifications ",
      date: new Date(),
      img: "https://cdn.pixabay.com/photo/2020/05/26/09/32/product-5222398_960_720.jpg",
      status: "stock Out",
    },
    {
      id: 1,
      title: "new notifications ",
      date: new Date(),
      img: "https://cdn.pixabay.com/photo/2020/05/26/09/32/product-5222398_960_720.jpg",
      status: "stock Out",
    },
    {
      id: 2,
      title: "new notifications ",
      date: new Date(),
      img: "https://cdn.pixabay.com/photo/2020/05/26/09/32/product-5222398_960_720.jpg",
      status: "stock Out",
    },
  ];
  const HandleNotificationMenu = (e: MouseEvent): void => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className="px-6 py-4 w-full bg-white sticky top-0">
      {showNotifications && <Notifications data={notifcations} />}
      <div className="flex items-center justify-between">
        {<FiMenu className="md:hidden" onClick={HandleOpenMenu} />}
        <div className="flex items-center justify-end w-full">
          <div
            className="relative cursor-pointer"
            onClick={HandleNotificationMenu}
          >
            <FiBell size={22} color="#0E9F6E" />
            <span className="bg-secondary text-white p-1 h-5 w-5 text-xs font-medium rounded-full absolute flex justify-center items-center top-0 right-0 -translate-x-1/2 -translate-y-1/2">
              5
            </span>
          </div>
          <img
            src={Profile}
            alt="profile"
            className="w-8 h-8 rounded-full ml-4"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
