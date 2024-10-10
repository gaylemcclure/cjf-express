import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { HeaderProvider } from "./utils/headerContext";
import { LandingProvider } from "./utils/landingContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRouter from "./router/appRouter";
import Header from "./components/header";
import Footer from "./components/footer";
import "./App.css";
// import "./input.css";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter(AppRouter);

const App = () => {
  return (
    <HeaderProvider>
      <LandingProvider>
        <Header />
        {/* <Outlet /> */}
        <RouterProvider router={router} />
        <Footer />
      </LandingProvider>
    </HeaderProvider>
  );
};

export default App;
