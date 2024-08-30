import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const HeaderContext = createContext();

export const useHeaderContext = () => useContext(HeaderContext);

export const HeaderProvider = ({ children }) => {
  const [logo, setLogo] = useState("");
  const [navLinks, setNavLinks] = useState([]);
  const [footer, setFooter] = useState({});

  //Calls the homeRoutes api for /header to get the Contenful data
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/header");
        const data = res.data.items[0].fields;
        setLogo(data.logo.fields.file.url);
        setNavLinks(data.navigationElements);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  //Calls the homeRoutes api for header/footer to get Contentful data
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/header/footer");
        const data = res.data.items[0].fields;
        setFooter(data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <HeaderContext.Provider
      value={{ logo: logo, links: navLinks, footer: footer }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
