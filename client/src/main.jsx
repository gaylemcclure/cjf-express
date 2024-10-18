import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/landingPage.jsx";
import VolunteerPage from "./pages/volunteerPage.jsx";
import BandApplications from "./pages/bandApplications.jsx";
import SupportPage from "./pages/supportPage.jsx";
import AboutPage from "./pages/aboutPage.jsx";
import HistoryPage from "./pages/historyPage.jsx";

import GeneralPage from "./pages/generalPage.jsx";
import ContactPage from "./pages/contactPage.jsx";
import ErrorPage from "./pages/errorPage.jsx";
import App from "./App.jsx";
import DonatePage from "./pages/donatePage.jsx";
import MembershipPage from "./pages/membershipPage.jsx";
import SponsorPage from "./pages/sponsorPage.jsx";

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
        element: <VolunteerPage />,
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
        element: <AboutPage />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "support",
        element: <SupportPage />,
      },
      {
        path: "membership",
        element: <MembershipPage />,
      },
      {
        path: "donate",
        element: <DonatePage />,
      },
      {
        path: "sponsors",
        element: <SponsorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
