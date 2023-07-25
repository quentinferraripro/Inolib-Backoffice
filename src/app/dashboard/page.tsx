import { DashboardModuleList } from "../../ui/Dashboard/DashboardModuleList";

const Dashboard = () => {
  return (
    <>
      <h1 className="text-[#0B3168] text-center text-3xl">Espace principal</h1>
      <div className="flex justify-center items-center w-full text-[#0B3168] mt-10">
        <DashboardModuleList />
      </div>
    </>
  );
};

export default Dashboard;
