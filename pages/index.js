import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Logo from "../assets/images/logo.png";
import DetailProduct from "./detailproduct";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import { POST_LOGIN } from "../utils/gql/auth/constant";
import { POST_REGISTER } from "../utils/gql/auth/constant";
import { setUser } from "../redux/features/auth/authSlice";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import HOC from "../components/HOC";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const router = useRouter();
  const [mutationLogin, { data, error, loading }] = useMutation(POST_LOGIN);
  const [mutationRegister] = useMutation(POST_REGISTER);
  const [showOldPassword, setshowOldPassword] = useState(false);
  const dispatch = useDispatch();
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required !"),
    password: Yup.string().required("Password is required !"),
  });
  function closeLogin() {
    setIsOpen(false);
    setIsOpen1(true);
  }

  function openLogin() {
    setIsOpen(true);
    setIsOpen1(false);
  }

  return (
    <div className=" text-white bg-black ">
      <div className=" flex gap-11 mx-56 py-16">
        <div className="w-2/3">
          <Image src={Logo} className="mb-6" alt="logo" />
          <h1 className="text-5xl font-semibold">Easy, fast and reliable</h1>
          <div className="my-7">
            <p>
              Go shopping for merchandise, just go to dumb merch shopping. the
              biggest merchandise in Indonesia
            </p>
            <div className="flex gap-5 w-96">
              <button
                color="#ffffff"
                className=" border-4 border-black border rounded
          bg-red-500 w-48 my-32 "
                onClick={() => openLogin()}
              >
                Login
              </button>
              
              <button
                color="#ffffff"
                className=" w-48 my-32 border-2 border-red-500 rounded"
                onClick={() => closeLogin()}
              >
                Register
              </button>
            </div>
          </div>
        </div>
        {isOpen ? (
          <div className="w-96">
            <div className=" bg-zinc-800 w-full p-9 rounded">
              <p className="font-bold text-4xl  my-8">Login</p>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={SignInSchema}
                onSubmit={async (values) => {
                  // same shape as initial values
                  const { data } = await mutationLogin({
                    variables: {
                      input: {
                        email: values.email,
                        password: values.password,
                      },
                    },
                  });
                  console.log(data);
                  dispatch(
                    setUser({
                      login: data.login,
                      password: values.password,
                    })
                  );

                  return true;
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <p className="my-2">Email</p>
                    {error && (
                      <div className="alert alert-error bg-red-500 shadow-lg p-3 rounded-none">
                        <div>
                          <div className=" text-2xl">
                            {/* <FiAlertCircle className="mr-2 " /> */}
                          </div>
                          <span>
                            {error.message}. Please check your Email or Password
                            !
                          </span>
                        </div>
                      </div>
                    )}
                    <Field
                      name="email"
                      type="email"
                      className="w-full h-10 text-xl rounded bg-white px-3 text-black"
                    />
                    {errors.email && touched.email ? (
                      <div className="text-red-400 mt-1">{errors.email}</div>
                    ) : null}
                    <p className="my-1">Password</p>
                    <Field
                      name="password"
                      type={!showOldPassword ? "password" : "text"}
                      className="w-full h-10 text-xl rounded bg-white px-3 text-black"
                    />
                    {errors.password && touched.password ? (
                      <div className="text-red-400 mt-1">{errors.password}</div>
                    ) : null}

                    <button
                      type="submit"
                      className="btn  px-3 mt-8 h-10 text-xl  hover:bg-[#504C4C] hover:text-white hover:border-[#D9D9D9] duration-200 border-4 border-red-500 border-solid rounded
                      bg-red-500 w-full my-9"
                      // onClick={()=>router.push("/dashboard")}
                    >
                      Login
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        ) : (
          <></>
        )}
        {isOpen1 ? (
          <div className="w-96">
            <div className=" bg-zinc-800 w-full p-9 rounded">
              <p className="text-white text-3xl font-semibold px-3 my-4 ">
                Register
              </p>

              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  firstName: "",
                }}
                validationSchema={SignInSchema}
                onSubmit={async (values) => {
                  console.log(values);
                  // same shape as initial values
                  const { data } = await mutationRegister({
                    variables: {
                      input: {
                        email: values.email,
                        password: values.password,
                        firstName: values.firstName,
                      },
                    },
                  });
                  console.log(data);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <p className="my-2">Email</p>
                    <Field
                      name="email"
                      type="email"
                      className="w-full h-10 text-xl rounded bg-white px-3 text-black"
                    />
                    {errors.email && touched.email ? (
                      <div className="text-red-400 mt-1">{errors.email}</div>
                    ) : null}
                    <p className="my-1">Password</p>
                    <Field
                      name="password"
                      type="password"
                      className="w-full h-10 text-xl rounded bg-white px-3 text-black"
                    />
                    {errors.password && touched.password ? (
                      <div className="text-red-400 mt-1">{errors.password}</div>
                    ) : null}
                    <p className="my-1">Full Name</p>
                    <Field
                      name="firstName"
                      type="text"
                      className="w-full h-10 text-xl rounded bg-white px-3 text-black"
                    />
                    {errors.firstName && touched.firstName ? (
                      <div className="text-red-400 mt-1">
                        {errors.firstName}
                      </div>
                    ) : null}
                    <button
                      type="submit"
                      className="btn border-2 border-black px-3 mt-8 w-full h-10 text-xl rounded bg-red-500 hover:bg-red-700 hover:text-white hover:border-[#D9D9D9] duration-200"
                    >
                      Register
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default HOC(Home, "login-register");
