import Navbar from "./Navbar";

const Layout = ({ children, showNavbar = true }) => (
    // <div className="">
    //     {showNavbar && <Navbar />}
    //     {children}
    // </div>

    <div className="flex flex-col min-h-screen">
        {showNavbar && <Navbar />}
        <div className="flex-1 flex flex-col">
            {children}
        </div>
    </div>
);

export default Layout;
