import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const Layout: React.FC<{ children: React.ReactNode }> = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow mt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
