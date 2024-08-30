import styled from "styled-components";

const SponsorSection = ({ data }) => {
  const SponsorComponent = ({ source, alt, cName }) => {
    return <ImageContainer src={source} alt={alt} className={cName} />;
  };

  return (
    <SponsorWrapper className="bg-gray">
      <div className="justify-center">
        <h1 className="title">{data.headingText}</h1>

        {/*Major Sponsor section */}
        <h2 className="subtitle">{data.majorSponsorText}</h2>
        <div className="major-wrapper">
          {data.majorSponsors.map((ms) => {
            const msData = ms.fields.sponsorImage.fields.file;
            return (
              <SponsorComponent
                key={ms.sys.id}
                source={msData.url}
                alt={msData.filename}
                width={500}
                height={500}
                cName="justify-center flex m-auto p-12"
              />
            );
          })}
        </div>

        <div className="separator justify-center flex m-auto"></div>
        <h2 className="subtitle">{data.sponsorHeading}</h2>
        <div className="sponsor-wrapper logo-grid grid grid-cols-2 gap-4 justify-center place-center items-center md:grid-cols-3 tablet:grid-cols-4 xl:grid-cols-5">
          {data &&
            data.sponsors.map((sponsor, i) => {
              const sponsorData = sponsor.fields.sponsorImage.fields.file;
              return (
                <SponsorComponent
                  key={i}
                  source={sponsorData.url}
                  alt={sponsorData.filename}
                />
              );
            })}
        </div>
      </div>
    </SponsorWrapper>
  );
};

const ImageContainer = styled.img``;

const SponsorWrapper = styled.div`
  .major-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 0px;
    max-width: 1090px;
    margin: 0 auto;
  }

  .sponsor-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 40px;
    grid-row-gap: 0px;
    max-width: 1090px;
    margin: 0 auto;
  }

  .separator {
    max-width: 1090px;
    width: 100%;
    height: 3px;
    background: black;
    border-radius: 4px;
    margin-bottom: 2rem;
  }

  .logo_block {
    border: 3px solid slategray;
    border-radius: 16px;
    padding: 16px;
    justify-self: center;
  }
  ${
    "" /* 
.white_bg {
    background-color: white;
} */
  }

  .black_bg {
    background-color: black;
  }

  .title {
    font-weight: 800;
    font-size: 4em;
    color: black;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    padding-top: 2rem;
  }

  .subtitle {
    color: black;
    font-size: 3em;
    font-weight: 700;
    display: flex;
    justify-content: center;
  }

  @media screen and (max-width: 700px) {
    .title {
      font-size: 2.5em;
    }
    .subtitle {
      font-size: 1.5em;
    }
    .logo_block {
      max-height: 150px;
      max-width: 150px;
    }
  }

  @media screen and (min-width: 901px) {
    .sponsor_wrapper {
      padding: 0 4rem 2rem;
    }
  }

  @media screen and (min-width: 1280px) {
    .sponsor_wrapper {
      padding: 0 7rem 2rem;
    }
  }
`;

export default SponsorSection;
