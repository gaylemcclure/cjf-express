import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
        {/* <h1>{band}</h1> */}
        <BandImg className="band-imgs" src={image} />
        <div class="band-name-container">
          <p className="text-white text-center mb-0">{band}</p>
        </div>
      </div>
    );
  };

  return (
    <BandPageWrapper>
      <BandWrapper>
        {bands?.map((b, i) => {
          console.log(b);
          return bandTemplate(b.fields["Band Name"], b.fields.Image_Link, i);
        })}
      </BandWrapper>
    </BandPageWrapper>
  );
};

const BandPageWrapper = styled.div`
  margin: 6rem 4rem;

  .band-name-container {
    background-color: black;
    max-width: 300px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 0 8px 8px;
  }
`;

const BandWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const BandImg = styled.img`
  height: 300px;
  width: 300px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

export default BandPage;
