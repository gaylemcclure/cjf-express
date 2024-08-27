import styled from "styled-components";

const SponsorSection = ({ data }) => {

  const SponsorComponent = ({ source, alt, width,  height,  cName }) => {
    return <Image src={source} alt={alt} width={width} height={height}  className={cName}/>;
  };
console.log(data)
  return (
    <>
    <div className="sponsor_wrapper justify-center">
      <h1 className="title">{data.headingText}</h1>
      <h2 className="subtitle">{data.majorSponsorText}</h2>
      {data.majorSponsors.map((ms) => {

      {/* return <SponsorComponent
        key={majorSponsor[0].Name}
        source={majorSponsor[0].URL[0]}
        alt={`${majorSponsor[0].Name} logo`}
        width={500}
        height={500}
        cName="justify-center flex m-auto p-12"
      />  */}
      })}

      <div className="separator justify-center flex m-auto"></div>
      <h2 className="subtitle">{data.sponsorHeading}</h2>
      <div className="logo-grid grid grid-cols-2 gap-4 justify-center place-center m-4 items-center md:grid-cols-3 tablet:grid-cols-4 xl:grid-cols-5">

      {data &&
        data.sponsors.map((sponsor, i) => {
          {/* return <SponsorComponent key={i} source={sponsor.URL[0]} alt={"alt"} width={sponsor.Shape === "Square" ? 200 : 200} height={200} cName={sponsor.Background === "White" ? `${styles.logo_block} ${styles.white_bg}` : `${styles.logo_block} ${styles.black_bg}`}/>; */}
        })}
        </div>
      
    </div>

    </>
  )
}

const SponsorWrapper = styled.div`
.sponsor_wrapper {
    background-color: #f2f2f2;

}

.separator {
    width: 70%;
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

.white_bg {
    background-color: white;
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

`

export default SponsorSection;