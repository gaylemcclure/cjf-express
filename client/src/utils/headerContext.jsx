import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const fetchDog = async () => {
  const resp = await fetch(`/api/header`);
  console.log(resp);

  return resp.json();
};

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
        // const something = await fetchDog();
        // console.log(something);
        const res = await axios.get("/api/header", {
          headers: "application/json",
        });
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

  return <HeaderContext.Provider value={{ logo: logo, links: navLinks, footer: footer }}>{children}</HeaderContext.Provider>;
};

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { QUERY_ME, QUERY_PROJECT } from "./queries";
// import { useQuery } from "@apollo/client";

// const UserContext = createContext();

// export const useUserContext = () => useContext(UserContext);

// export const UserProvider = ({ children }) => {
//   const [userData, setUserData] = useState({});
//   const { data } = useQuery(QUERY_ME);
//   const user = data?.me;

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         if (user) {
//           setUserData(user);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     getUserData();
//   }, [user]);

//   return <UserContext.Provider value={{ userData: userData, setUserData: setUserData }}>{children}</UserContext.Provider>;
// };
