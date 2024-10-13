import * as contentful from "contentful";
import { useState, useEffect } from "react";
import BannerHeader from "../components/pageSections/bannerHeader";
import ButtonSection from "../components/pageSections/buttonSection";
import PageHeadingSection from "../components/pageSections/pageHeadingSection";
import PageTextSection from "../components/pageSections/pageTextSection";
import SingleImageHeadlineSection from "../components/pageSections/singleImageHeadlineSection";
import SingleImageTextSection from "../components/pageSections/singleImageTextSection";
import SingleTextSection from "../components/pageSections/singleTextSection";
import AccordionComponent from "../components/accordion";

const SupportPage = () => {
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
    <>
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
            if (section.sys.contentType.sys.id === "buttonSection") {
              return <ButtonSection key={i} />;
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
    </>
  );
};

export default SupportPage;
