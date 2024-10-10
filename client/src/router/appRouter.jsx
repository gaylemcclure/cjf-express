// import App from "../App";
import ErrorPage from "../pages/errorPage";
import LandingPage from "../pages/landingPage";
import BandApplications from "../pages/bandApplications";
import ContactPage from "../pages/contactPage";
import GeneralPage from "../pages/generalPage";

// Define the accessible routes, and which components respond to which URL
const AppRouter = [
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   index: true,
      //   element: ,
      // },
      {
        path: "volunteer",
        element: <GeneralPage />,
      },
      {
        path: "/band-applications",
        element: <BandApplications />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "about-cjf",
        element: <GeneralPage />,
      },
      {
        path: "history",
        element: <GeneralPage />,
      },
      {
        path: "support",
        element: <GeneralPage />,
      },
      {
        path: "membership",
        element: <GeneralPage />,
      },
    ],
  },
];

export default AppRouter;
