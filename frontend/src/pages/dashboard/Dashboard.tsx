import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
const Dashboard = () => {
  return (
    <section className="flex bg-gray-50 h-full">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        {/* <div className="content">
          <h2 className="PageTitle">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              icon={<FiLayers size={30} />}
              title="Today Order"
              price={OrderReport ? OrderReport.TodayOrders : 0}
              currency="EG"
              bg_color="#0694A2"
            />
            <Card
              icon={<FiShoppingCart size={30} />}
              title="This Month"
              price={OrderReport ? OrderReport.MonthOrders : 0}
              currency="EG"
              bg_color="#3F83F8"
            />
            <Card
              icon={<FiDollarSign size={30} />}
              title="Total Order"
              price={OrderReport ? OrderReport.TotalOrders : 0}
              currency="EG"
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
        </div> */}
      </div>
    </section>
  );
};

export default Dashboard;
