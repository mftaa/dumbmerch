import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/images/logo.png";
import {GiShoppingBag} from "react-icons/gi"
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { CgMenu } from "react-icons/cg";
import { useRouter } from "next/router";
import { logout } from "../../redux/features/auth/authSlice";
export default function Navbar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [profile, setprofile] = useState({});
  const AuthStore = useSelector((state) => state.auth);
  useEffect(() => {
    setprofile(AuthStore);
  }, []);
  
  return (
    <div className="w-screen flex justify-between items-center px-5 bg-gray-900 h-16 rounded-b-lg">
      <Image
        //   width={500}
        //   height={500}
        quality={100}
        className=" w-[50px] py-5 ml-10"
        src={Logo}
        alt="logo"
        onClick={() => router.push("/dashboard")}
      />
      <div className="w-full ">
        <div className="text-white ml-[85%]">{profile?.user?.email}</div>
      </div>
      <div
        className="flex row gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="font-semibold">
          <CgMenu color="red" size={30} />
        </p>
      </div>
      {/*  */}
      {isOpen ? (
        <>
          <div className="absolute h-max w-48 right-10 bg-slate-200  z-10 rounded text-center delay-100 p-3 mt-60 shadow-md ease-in-out">
            <div className="">
              <div
                className=" flex row px-5 py-2 gap-2 cursor-pointer hover:bg-slate-300 items-center hover:rounded"
                onClick={() => router.push("/profile")}
              >
                <FaUserCircle
                  size={30}
                  color="black"
                  style={{ cursor: "pointer" }}
                />
                <p className="text-xl w-full"> Profile</p>
              </div>
              <div className=" flex row px-5 py-2 gap-2 cursor-pointer border hover:bg-slate-300 items-center hover:rounded" onClick={()=>router.push("/listproduct")}>
                <GiShoppingBag size={30} />
                <p className="w-full text-xl text-center">Products</p>
              </div>
              <div
                className="flex row px-5 py-2 gap-2 cursor-pointer border hover:bg-slate-300 items-center hover:rounded"
                onClick={handleLogout}
              >
                <FaSignOutAlt size={30} />
                <p className="w-full text-xl">Sign Out</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
