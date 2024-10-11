import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/landingPage.jsx";
import VolunteerPage from "./pages/volunteerPage.jsx";
import BandApplications from "./pages/bandApplications.jsx";
import SupportPage from "./pages/supportPage.jsx";
import GeneralPage from "./pages/generalPage.jsx";
import ContactPage from "./pages/contactPage.jsx";
import ErrorPage from "./pages/errorPage.jsx";
import App from "./App.jsx";

// Define the accessible routes, and which components respond to which URL
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "volunteer",
        element: <GeneralPage />,
      },
      {
        path: "band-applications",
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
