"use client";

import { ToastContainer } from "react-toastify";

const ToastProvider = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={1500}
      theme="light"
    />
  );
};

export default ToastProvider;
