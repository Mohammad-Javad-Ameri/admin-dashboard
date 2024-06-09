import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Card from "../../components/Cards/Card";
import MiniCard from "../../components/Cards/MiniCard";
import {
  FiLayers,
  FiDollarSign,
  FiShoppingCart,
  FiRefreshCw,
  FiTruck,
  FiCheck,
} from "react-icons/fi";
import RecentOrderTable from "../../components/Tables/RecentOrderTable/RecentOrderTable";
import OrdersChart from "../../components/Charts/Orders/OrdersChart";
import TopProductsChart from "../../components/Charts/Products/TopProductsChart";
import { OrderReports, RecentOrderApi } from "../../Apis/OrderApis";
import { useDashboard } from "../../context/AppContext";
import { HandleAxiosError } from "../../utils/HandleAxiosErrors";
import "./Dashboard.css";
type OrderReportType = {
  TodayOrders: number;
  MonthOrders: number;
  TotalOrders: number;
};

const Dashboard = () => {
  const { authDispatch }: any = useDashboard();
  const [OrderReport, setOrderReport] = useState<OrderReportType | null>(null);
  const [RecentOrders, setRecentOrders] = useState<any>([]);
  useEffect(() => {
    // Orders Report api
    (async () => {
      await OrderReports()
        .then((res) => {
          setOrderReport(res.data.data);
        })
        .catch((error) => HandleAxiosError(error, authDispatch));
      await RecentOrderApi()
        .then((res) => {
          setRecentOrders(res.data.data);
        })
        .catch((error) => HandleAxiosError(error, authDispatch));
    })();
    // eslint-disable-next-line
  }, []);
  const chartOpt = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: " Orders ",
      },
    },
  };
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Delivered Orders",
        data: [220, 330, 430, 110, 312, 345, 880, 992, 111, 312, 667, 878],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Refunds Orders",
        data: [220, 330, 430, 220, 312, 345, 880, 992, 111, 312, 667, 878],
        backgroundColor: "grey",
      },
      {
        label: "Cancled Orders",
        data: [220, 330, 430, 220, 312, 345, 880, 992, 111, 312, 667, 878],
        backgroundColor: "red",
      },
    ],
  };
  const TopPropduct = {
    labels: ["Iphone", "g3", "Ipad", "smart watch", "band"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2],
        backgroundColor: ["#00B579", "#0EA5E9", "#F97316", "#000", "#0694A2"],
      },
    ],
  };
  return (
    <section className="Dasboard">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div className="content">
          <h2 className="PageTitle">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              icon={<FiLayers size={30} />}
              title="Today Order"
              price={OrderReport ? OrderReport.TodayOrders : 0}
              currency="$"
              bg_color="#0694A2"
            />
            <Card
              icon={<FiShoppingCart size={30} />}
              title="This Month"
              price={OrderReport ? OrderReport.MonthOrders : 0}
              currency="$"
              bg_color="#3F83F8"
            />
            <Card
              icon={<FiDollarSign size={30} />}
              title="Total Order"
              price={OrderReport ? OrderReport.TotalOrders : 0}
              currency="$"
              bg_color="#0E9F6E"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
            <MiniCard
              icon={<FiShoppingCart color="#F05252" size={18} />}
              title="Total Order"
              count={33}
              bg_color="#FCD9BD"
            />
            <MiniCard
              icon={<FiRefreshCw color="#1C64F2" size={18} />}
              title="Order Pending"
              count={33}
              bg_color="#C3DDFD"
            />
            <MiniCard
              icon={<FiTruck color="#047481" size={18} />}
              title="Order Processing"
              count={33}
              bg_color="#AFECEF"
            />
            <MiniCard
              icon={<FiCheck color="#10815D" size={18} />}
              title="Order Delivered"
              count={33}
              bg_color="#BCF0DA"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-wrap md:flex-no-wrap">
            <div className="OrdersChart">
              <OrdersChart options={chartOpt} data={data} />
            </div>
            <div className="TopProductsChart">
              <TopProductsChart data={TopPropduct} />
            </div>
          </div>
          <div>
            <h2 className="PageTitle">Recent Order</h2>
            <RecentOrderTable data={RecentOrders} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
