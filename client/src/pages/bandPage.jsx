import axios from "axios";
import { useEffect } from "react";

const BandPage = () => {
  const handleAirtable = async (e) => {
    try {
      const response = await axios.get("/api/airtable/get-bands");
      console.log(response);
      if (response.status === 200) {
        console.log(response);
      } else {
        console.log("nope");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleAirtable();
  }, []);

  return <>Band Page</>;
};

export default BandPage;
