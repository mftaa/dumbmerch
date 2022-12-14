import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Logo from "../../assets/images/logo.png";
import mouse from "../../assets/images/mouse.png";
import Image from "next/image";
import { useRouter } from "next/router";
import HOC from "../../components/HOC";
import { logout } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/organism/navbar";
import { GET_PRODUCTS } from "../../utils/gql/products/constant";

const Dashboard = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const { data: getProducts, refetch: refetchProduct } = useQuery(GET_PRODUCTS);
  const rupiah = (value) => {
    let price = value.toString(),
      sisa = price.length % 3,
      rupiah = price.substr(0, sisa),
      ribuan = price.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    return rupiah;
  };

  return (
    <div className=" bg-slate-800 h-[100%]">
      <Navbar />
      <div className="text-red w-full ">
        <p className="text-2xl font-bold text-[#F74D4D] py-2 ml-[86px] mt-[34px]">
          {/* {data.name} */}
        </p>
        <div
          className="px-5 mt-10 flex gap-5 drop-shadow-lg"
        >
          {getProducts?.products?.map((item, index) => (
            <div className="card w-64 bg-slate-100 shadow-xl " key={index}>
              <figure>
                <Image
                  src={item.image}
                  alt="product image"
                  className="object-cover"
                  width={90}
                  height={90}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p>stock :{item.stock}</p>
                <p>{`Rp. ${rupiah(item.price)},00`}</p>
                <div className="card-actions justify-end"></div>
              </div>
            </div>
          ))}
         
        </div>
      </div>
    </div>
  );
};

export default HOC(Dashboard);
