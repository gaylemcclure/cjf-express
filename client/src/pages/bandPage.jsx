import axios from "axios";
import { useEffect, useState } from "react";

const BandPage = () => {
  const [bands, setBands] = useState();

  //Get band data from Airtable
  const handleAirtable = async (e) => {
    try {
      const response = await axios.get("/api/airtable/get-bands");
      if (response.status === 200) {
        setBands(response.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleAirtable();
  }, []);

  console.log(bands);

  //Set up each band template
  const bandTemplate = (band, image, i) => {
    return (
      <div className="band-template" key={i}>
        <h1>{band}</h1>
        <img href={image} />
      </div>
    );
  };

  return (
    <>
      {bands?.map((b, i) => {
        console.log(b);
        return bandTemplate(b.fields["Band Name"], b.fields.Image_Link, i);
      })}
    </>
  );
};

export default BandPage;
