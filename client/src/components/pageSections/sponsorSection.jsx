import styled from "styled-components";

const SponsorSection = ({ data }) => {
  const SponsorComponent = ({ source, alt, cName }) => {
    return <ImageContainer src={source} alt={alt} className={cName} />;
  };

  return (
    <>
      <SponsorWrapperBrowser className="bg-gray pt-12 browser">
        {/*Browser view */}
        <div className="justify-center">
          <h1 className="title text-5xl font-extrabold leading-none tracking-tight text-black flex uppercase ">{data.headingText}</h1>

          {/*Major Sponsor section */}
          <h2 className="subtitle text-black font-bold text-4xl pt-4">{data.majorSponsorText}</h2>
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
          {/* Sponsor section */}
          <div className="separator justify-center flex m-auto mb-4"></div>
          <h2 className="subtitle text-black font-bold text-4xl pt-8 pb-12">{data.sponsorHeading}</h2>
          <div className="sponsor-wrapper logo-grid grid gap-8 justify-center place-center items-center md:grid-cols-3 tablet:grid-cols-4 xl:grid-cols-5 pb-12">
            {data &&
              data.sponsors.map((sponsor, i) => {
                const sponsorData = sponsor.fields.sponsorImage.fields.file;
                return <SponsorComponent key={i} source={sponsorData.url} alt={sponsorData.filename} />;
              })}
          </div>
        </div>
      </SponsorWrapperBrowser>

      {/* Mobile view */}
      <SponsorWrapperMobile className="mobile">
        <div className="justify-center relative bottom-20 pt-4 pl-4 pr-4">
          <h1 className="text-4xl uppercase font-bold mt-8 text-center ">{data.headingText}</h1>

          {/*Major Sponsor section */}
          <h2 className="subtitle text-black font-bold text-3xl tablet:pt-4">{data.majorSponsorText}</h2>
          <div className="major-wrapper p-4">
            {data.majorSponsors.map((ms) => {
              const msData = ms.fields.sponsorImage.fields.file;
              return (
                <SponsorComponent
                  key={ms.sys.id}
                  source={msData.url}
                  alt={msData.filename}
                  width={500}
                  height={500}
                  cName="justify-center flex m-auto tablet:p-12"
                />
              );
            })}
          </div>
          {/* Sponsor section */}
          <div className="separator justify-center flex m-auto mb-4"></div>
          <h2 className="subtitle text-black font-bold text-4xl">{data.sponsorHeading}</h2>
          <div className="sponsor-wrapper logo-grid grid gap-8 justify-center place-center items-center md:grid-cols-3 tablet:grid-cols-4 xl:grid-cols-5">
            {data &&
              data.sponsors.map((sponsor, i) => {
                const sponsorData = sponsor.fields.sponsorImage.fields.file;
                return <SponsorComponent key={i} source={sponsorData.url} alt={sponsorData.filename} />;
              })}
          </div>
        </div>
      </SponsorWrapperMobile>
    </>
  );
};

const ImageContainer = styled.img``;

const SponsorWrapperBrowser = styled.div`
  .major-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 0px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .sponsor-wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    ${"" /* grid-template-rows: repeat(4, 1fr); */}
    grid-column-gap: 40px;
    grid-row-gap: 0px;
    max-width: 1090px;
    margin: 0 auto;
  }

  .separator {
    max-width: 1200px;
    width: 100%;
    height: 1px;
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
    display: flex;
    justify-content: center;
  }

  .subtitle {
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

const SponsorWrapperMobile = styled.div`
  .major-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 0px;
    max-width: 800px;
    margin: 0 auto;
  }

  .sponsor-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    ${"" /* grid-template-rows: repeat(4, 1fr); */}
    grid-column-gap: 20px;
    grid-row-gap: 0px;
    max-width: 800px;
    margin: 0 auto;
  }

  .separator {
    max-width: 800px;
    width: 100%;
    height: 1px;
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
    display: flex;
    justify-content: center;
  }

  .subtitle {
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
