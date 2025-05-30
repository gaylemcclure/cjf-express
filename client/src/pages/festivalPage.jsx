import * as contentful from "contentful";
import { useState, useEffect } from "react";
import BannerHeader from "../components/pageSections/bannerHeader";
import ButtonSection from "../components/pageSections/buttonSection";
import PageHeadingSection from "../components/pageSections/pageHeadingSection";
import PageTextSection from "../components/pageSections/pageTextSection";
import SingleImageHeadlineSection from "../components/pageSections/singleImageHeadlineSection";
import SingleImageTextSection from "../components/pageSections/singleImageTextSection";
import SingleTextSection from "../components/pageSections/singleTextSection";
import HeroImageSection from "../components/pageSections/heroImageSection";
import HeroVideoSection from "../components/pageSections/heroVideoSection";
import styled from "styled-components";

const FestivalPage = () => {
  const [pageData, setPageData] = useState([]);
  const currentPage = window.location.pathname.slice(1);

  const client = contentful.createClient({
    space: "b10z0f9dnsdt",
    accessToken: "bYqdQnmfDAq3pW7IRc34GawRTXvvxSUcRiB6pUSpCTg",
  });
  useEffect(() => {
    try {
      client
        .getEntries({
          content_type: "generalPage",
          "fields.slug[match]": currentPage,
          include: 10,
        })
        .then((entry) => {
          setPageData(entry.items[0].fields.sections);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }, []);

  return (
    <FestivalStyle>
      {pageData && (
        <>
          {pageData.map((section, i) => {
            if (section.sys.contentType.sys.id === "bannerHeading") {
              return (
                <BannerHeader
                  url={section.fields.bannerImage.fields.file.url}
                  filename={section.fields.bannerImage.fields.file.filename}
                  headingText={section.fields.headingText}
                  key={i}
                />
              );
            }

            //Hero section (no overlay)
            if (section.sys.contentType.sys.id === "heroMedia" || section.sys.contentType.sys.id === "heroImage") {
              if (section.fields.media.fields.file.contentType === "video/mp4") {
                const url = section.fields.media.fields.file.url;
                return <HeroVideoSection url={url} key={section.sys.id} />;
              } else if (section.fields.media.fields.file.contentType === "image/jpeg") {
                if (section.fields.title === "Festival Program Image -mobile") {
                  const url = section.fields.media.fields.file.url;
                  return (
                    <div className="mobile">
                      <HeroImageSection url={url} key={section.sys.id} />
                    </div>
                  );
                } else if (section.fields.title === "Festival Program Image") {
                  const url = section.fields.media.fields.file.url;
                  return (
                    <div className="browser">
                      <HeroImageSection url={url} key={section.sys.id} />
                    </div>
                  );
                }
                {
                  /* const url = section.fields.media.fields.file.url;
                return (
                  <div className="xl:m-24">
                    {section.fields.title === "Festival Program Image -mobile" && (<div className="mobile"><HeroImageSection url={url} key={section.sys.id} /></div>)}
                    {section.fields.title === "Festival Program Image" && (<div className="browser"><HeroImageSection url={url} key={section.sys.id} /></div>)}


                  </div>
                ); */
                }
              }
            }
            if (section.sys.contentType.sys.id === "buttonSection") {
              console.log(section.fields);
              return <ButtonSection key={i} text={section.fields.buttonText} link={section.fields.buttonLink} title={section.fields.title} />;
            }
            if (section.sys.contentType.sys.id === "pageHeadingSection") {
              return <PageHeadingSection heading={section.fields.heading} subtitle={section.fields.subtitle} key={i} />;
            }
            if (section.sys.contentType.sys.id === "pageTextSection") {
              return (
                <PageTextSection
                  heading={section.fields.heading}
                  subtitle={section.fields.subtitle}
                  textId={section.sys.id}
                  buttonText={section.fields.buttonText}
                  buttonLink={section.fields.buttonLink}
                  showCtaButton={section.fields.showCtaButton}
                />
              );
            }
            /*Headline image section */
            if (section.sys.contentType.sys.id === "singleImageTextSection") {
              return <SingleImageHeadlineSection key={i} />;
            }
            /*Text image section */
            if (section.sys.contentType.sys.id === "singleImageTextSections") {
              return (
                <SingleImageTextSection
                  key={i}
                  url={section.fields.image.fields.file.url}
                  filename={section.fields.image.fields.file.filename}
                  heading={section.fields.headingText}
                  textId={section.sys.id}
                  buttonText={section.fields.buttonText}
                  buttonLink={section.fields.buttonLink}
                />
              );
            }
            if (section.sys.contentType.sys.id === "singleTextSection") {
              return (
                <div className="ml-auto mr-auto max-w-screenMax">
                  <SingleTextSection textId={section.sys.id} key={i} />
                </div>
              );
            }
          })}
        </>
      )}
    </FestivalStyle>
  );
};

const FestivalStyle = styled.div`
  @media screen and (max-width: 900px) {
    .grid_parent {
      display: flex;
      flex-direction: column;
      margin: 0 2rem 0;
    }
    .browser {
      display: none;
    }
    .mail_label {
      font-size: 21px;
      font-weight: 700;
      padding: 1rem 0;
    }
    .mail_input {
      height: 40px;
    }
    .mail_button {
      height: 40px;
    }
  }

  @media screen and (min-width: 901px) {
    .mobile {
      display: none;
    }
  }
`;

export default FestivalPage;
