import { NotificationProps } from "./Notification.types";
import "./Notification.css";
const Notification = ({
  title,
  img,
  body,
  date,
  status,
  status_type,
  actions,
}: NotificationProps) => {
  return (
    <div className="flex w-full items-center mb-4">
      <img
        className="w-[30px] h-[30px]  mr-3 object-cover rounded-full"
        src={img}
        alt="NotificationImage"
      />
      <div className="flex flex-col w-full">
        <h4 className="font-medium text-gray-500 text-[13px]">{title}</h4>
        <div className="flex text-[11px] items-center">
          <p
            className={`px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-800 mr-2-${status_type}`}
          >
            {status}
          </p>
          <p className="flex text-[11px] items-center">
            june 12 2024 - 12:40PM
          </p>
        </div>
      </div>
      {actions && actions}
    </div>
  );
};

export default Notification;
