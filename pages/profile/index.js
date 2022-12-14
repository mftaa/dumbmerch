import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/logo.png";
import Gambar from "../../assets/images/gambarmas.png";
import Mouse from "../../assets/images/mouse.png";
import Image from "next/image";
import { useRouter } from "next/router";
import HOC from "../../components/HOC";
import { useSelector } from "react-redux";
import Navbar from "../../components/organism/navbar";

const Profile = () => {
  const router = useRouter();
  const [profile, setprofile] = useState({});
  const AuthStore = useSelector((state) => state.auth);

  useEffect(() => {
    setprofile(AuthStore);
  }, []);
  return (
    <div className="bg-slate-800 h-full">
      <Navbar/>
      {/* <div className="flex justify-between items-center px-5">
        <Image
          className=" w-[70px] mx-5 py-4 ml-10"
          src={Logo}
          alt="logo"
          onClick={() => router.push("/dashboard")}
        />
        <div>
          <ul className=" flex gap-2 font-bold ">
            <li className="text-white">complain</li>
            <li className="text-red-500">profile</li>
            <li className="text-white">logout</li>
          </ul>
        </div>
      </div> */}
      <div className="flex flex-row ml-[86px] mt-[34px] ">
        <div className="">
          <p className="text-2xl font-bold text-[#F74D4D] py-2">My profile</p>
          <Image
            width={376}
            height={612}
            src={profile?.user?.picture}
            alt="profile picture"
            className="rounded"
          />
        </div>
        <div className="flex flex-col ml-5 w-[355px] mt-[47px]">
          <div className="text-lg">
            <div className=" text-red-500">Name</div>
            <div className="text-white">{profile?.user?.firstName}</div>
          </div>
          <div className="text-lg">
            <div className=" text-red-500">Email</div>
            <div className="text-white">{profile?.user?.email}</div>
          </div>
          <div className="text-lg">
            <div className=" text-red-500">Phone</div>
            <div className="text-white">{profile?.user?.phoneNumber}</div>
          </div>
          <div className="text-lg">
            <div className=" text-red-500">Gender</div>
            <div className="text-white">{profile?.user?.gender}</div>
          </div>
          <div className="text-lg">
            <div className=" text-red-500">Address</div>
            <div className="text-white">{profile?.user?.address}</div>
          </div>
        </div>
        <div>
          <div className="font-bold text-2xl text-red-500 flex flex-row">
            My Transaction
          </div>
          <div className=" flex flex-row bg-[#303030] w-[524px] mt-[42px] mr-[80px]">
            <div className="flex w-full">
              <Image
                className=" flex flex-col w-[80px] h-[145px]  items-center"
                src={Mouse}
                alt="mouse"
              />
              <div className="ml-[13px] w-full ">
                <div className="text-sm text-red-500 font-bold mt-[19px]">
                  Mouse
                </div>
                <div className="text-xs text-red-500 mt-[3px] w-full flex">
                  {" "}
                  Saturday, 14 juli 2021
                </div>
                <div className="text-xs text-white w-full">
                  Price : Rp 500.000
                </div>
                <div className="text-xs font-bold text-white mt-[40px] ml-[13px] w-full ">
                  Sub Total: Rp 500.000{" "}
                </div>
              </div>

              <Image
                className=" h-[70px] mt-[28px] mr-3 right-0"
                src={Logo}
                alt="mouse"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HOC(Profile);
