// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import React from 'react';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/landingPage.jsx';
import VolunteerPage from './pages/volunteerPage.jsx';
import ErrorPage from './pages/errorPage.jsx'



// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// Define the accessible routes, and which components respond to which URL
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'volunteer',
        element: <VolunteerPage />,
      },
      // {
      //   path: 'solutions',
      //   element: <SolutionsPage />,
      // },
      // {
      //   path: 'pricing',
      //   element: <PricingPage />,
      // },
      // {
      //   path: 'login',
      //   element: <LoginPage />,
      // },
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


    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

