import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import Cookies from "js-cookie";

const HOC = (WrappedComponent, type = "required-auth") => {
  const Wrapper = (props) => {
    const authStore = useSelector((state) => state.auth);

    useEffect(() => {
      if ((!authStore.token && type === "required-auth") || !Cookies.get("eu-user")) Router.push("/");
    }, [authStore.token]);

    useEffect(() => {
      if (authStore.token && type === "login-register") Router.push("/dashboard");
    }, [authStore.token]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default HOC;