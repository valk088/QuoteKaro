import DashboardMainn from "../Components/DashboardMainn";
import Layout from "../Layout";
import Footer from "./Footer";

function Dashboard() {
  return (
    <>
      <Layout>
        <DashboardMainn></DashboardMainn>
      </Layout>
      <Footer />
    </>
  );
}

export default Dashboard;
