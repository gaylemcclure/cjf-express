import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const LandingContext = createContext();

export const useLandingContext = () => useContext(LandingContext);

export const LandingProvider = ({ children }) => {
  const [allLanding, setAllLanding] = useState([]);

  //Calls the homeRoutes api for /header to get the Contenful data

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/landingPage", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = res;
        setAllLanding(data.data.items[0].fields.sections);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return <LandingContext.Provider value={{ allLanding: allLanding }}>{children}</LandingContext.Provider>;
};
