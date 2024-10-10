// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import App from "./App.jsx";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/landingPage.jsx";
import VolunteerPage from "./pages/volunteerPage.jsx";
import BandApplications from "./pages/bandApplications.jsx";
import SupportPage from "./pages/supportPage.jsx";
import GeneralPage from "./pages/generalPage.jsx";
import ContactPage from "./pages/contactPage.jsx";
import ErrorPage from "./pages/errorPage.jsx";

// // Define the accessible routes, and which components respond to which URL
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <LandingPage />,
//       },
//       {
//         path: "volunteer",
//         element: <GeneralPage />,
//       },
//       {
//         path: "/band-applications",
//         element: <BandApplications />,
//       },
//       {
//         path: "contact",
//         element: <ContactPage />,
//       },
//       {
//         path: "about-cjf",
//         element: <GeneralPage />,
//       },
//       {
//         path: "history",
//         element: <GeneralPage />,
//       },
//       {
//         path: "support",
//         element: <GeneralPage />,
//       },
//       {
//         path: "membership",
//         element: <GeneralPage />,
//       },

// {
//   path: 'signup',
//   element: <SignupPage />,
// },
// {
//   path: 'home',
//   element: <HomePage />,
// },
// {
//   path: 'project/:id',
//   element: <ProjectPage />,
// },
// {
//   path: 'checkout',
//   element: <Checkout />,
// },
// {
//   path: 'create-checkout-session',
//   element: <Checkout />,
// },
// {
//   path: 'cancelled',
//   element: <Cancelled />,
// },
// {
//   path: 'success=?*',
//   element: <Success />,
// },
// {
//   path: 'home/account',
//   element: <AccountPage />
// },
// {
//   path: 'home/settings',
//   element: <SettingsPage />
// },
// {
//   path: 'home/manage-users',
//   element: <ManageUsers />
// },
// {
//   path: 'home/theme',
//   element: <ThemePage />
// },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
