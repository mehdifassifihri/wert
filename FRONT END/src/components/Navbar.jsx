import React from "react";
import Logo from "../assets/logo.png";
import Logout from "../assets/logout.png";
import User from "../assets/user.png";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-10 py-6">
      <img src={Logo} alt="" className="w-32" />
      <div className="flex items-center gap-3">
        <img src={Logout} alt="" className="w-5 cursor-pointer" />
        <img src={User} alt="" className="w-5 cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
