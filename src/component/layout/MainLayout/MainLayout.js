import React from "react";
import "./MainLayout.css";
import Header from "../Header/Header";
import Sidebar from '../Sidebar/SIdebar'

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      {children}
    </>
  );
};

export default MainLayout;
