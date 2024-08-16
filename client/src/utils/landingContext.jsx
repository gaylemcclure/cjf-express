import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const LandingContext = createContext();

export const useLandingContext = () => useContext(LandingContext);

export const LandingProvider = ({ children }) => {
  const [allLanding, setAllLanding] = useState([])
  const [logo, setLogo] = useState("");
  const [navLinks, setNavLinks] = useState([]);
  const [hero, setHero] = useState("");
  const [imageSection, setImageSection] = useState({})
  const [sponsors, setSponsors] = useState({})


//Calls the homeRoutes api for /header to get the Contenful data
useEffect(() => {
  const getData = async () => {
    try {
      const res = await axios.get('/api/landingPage');
       const data = res
       console.log(data)
       setAllLanding(data)
       data.map((d) => {
        if (d.sys.contentType.sys.id === "navigationHeader") {
          setLogo(d.fields.logo.fields.file.url)
          setNavLinks(d.fields.navigationElements)
        } else if (d.sys.contentType.sys.id === "heroVideo") {
          setHero(d.fields.video.fields.file.url)
        } else if (d.sys.contentType.sys.id === "landingPageImageSection") {
          setImageSection(d.fields)
        } else if (d.sys.contentType.sys.id === "landingPageSponsorSection") {
          setSponsors(d.fields)
        }
       })
    } catch (error) {
      console.error(error)
    }
  }
  getData()
}, []);



  return <LandingContext.Provider value={{ allLanding: allLanding, logo: logo, links: navLinks, hero: hero, imageSection: imageSection, sponsors: sponsors}}>{children}</LandingContext.Provider>;
};
