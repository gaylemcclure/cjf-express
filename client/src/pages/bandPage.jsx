import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BandPage = () => {
  const [bands, setBands] = useState();
  // const history = useHistory();

  //Get band data from Airtable
  const handleAirtable = async (e) => {
    try {
      const response = await axios.get("/api/airtable/get-bands");
      if (response.status === 200) {
        console.log(response.data);
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

  const handleIndividualPage = (data, page) => {
    <Link to={`/band/${page}`} state={{ data }} />;
  };

  //Set up each band template
  const bandTemplate = (band, image, i, lcBand, bandData) => {
    const bandUrl = lcBand.toLowerCase();
    return (
      <div className="band-template" key={i}>
        {/* <h1>{band}</h1> */}
        <BandImg className="band-imgs" src={image} />
        <div className="middle">
          {/* <button
            className="rounded bg-yellowAlt hover:bg-black border-none hover:text-white"
            // onClick={() => handleIndividualPage(bandData, bandUrl)}
          >
            jkj */}
          <Link
            to={`/bands/${bandUrl}`}
            state={{ bandData }}
            className="bg-yellowAlt rounded pt-2 pb-2 pl-4 pr-4 text-black no-underline hover:bg-white hover:text-white"
          >
            MORE INFO
          </Link>
        </div>
        <div className="band-name-container">
          <p className="text-white text-center mb-0">{band}</p>
        </div>
      </div>
    );
  };

  return (
    <BandPageWrapper>
      <h1 className="flex justify-center align-center mb-12 text-5xl">BANDS</h1>
      <BandWrapper>
        {bands?.map((b, i) => {
          if (b.fields.Image_Link) {
            return bandTemplate(b.fields["Band Name"], b.fields.Image_Link, i, b.fields.NameNoSpace, b.fields);
          }
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

  .band-template:hover .band-imgs {
    opacity: 0.3;
  }

  .band-template:hover .middle {
    opacity: 1;
  }

  .middle {
    height: 300px;
    width: 300px;
    transition: 0.1s ease;
    opacity: 0;
    position: absolute;
    transform: translate(0%, -100%);
    -ms-transform: translate(0%, -100%);
    display: flex;
    justify-content: center;
    align-items: center;
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
