import * as Button from "../components/buttons";
import { useState, useEffect } from "react";
import axios from "axios";
import * as contentful from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import AccordionComponent from "../components/accordion";
import BannerHeader from "../components/pageSections/bannerHeader";
import PageTextSection from "../components/pageSections/pageTextSection";
import BandApplicationModal from "../components/applications/bandApplicationModal";

const BandApplications = () => {
  const [bandData, setBandData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/page/band-applications");
        const data = res;
        setBandData(data.data.items[0].fields.sections);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      {/* Browser view */}
      <div className="hidden place-content-center flex-col tablet:flex bg-gray">
        {bandData !== 0 && (
          <>
            {/*Page banner heading */}
            {bandData.map((data, i) => {
              if (data.sys.contentType.sys.id === "bannerHeading") {
                return (
                  <BannerHeader
                    url={data.fields.bannerImage.fields.file.url}
                    filename={data.fields.bannerImage.fields.file.filename}
                    headingText={data.fields.headingText}
                    key={i}
                  />
                );
              }

              if (data.sys.contentType.sys.id === "pageTextSection") {
                return (
                  <PageTextSection
                    key={i}
                    heading={data.fields.heading}
                    subtitle={data.fields.subtitle}
                    textId={data.sys.id}
                    buttonText={data.fields.buttonText}
                    buttonLink={data.fields.buttonLink}
                    showCtaButton={data.fields.showCtaButton}
                  />
                );
              }

              if (data.sys.contentType.sys.id === "buttonSection") {
                return <BandApplicationModal key={i} />;
              }

              if (data.sys.contentType.sys.id === "referenceSection") {
                return (
                  <div
                    className="max-w-screenMax mr-auto ml-auto w-full"
                    key={i}
                  >
                    <AccordionComponent
                      heading={data.fields.heading}
                      items={data.fields.referenceItems}
                    />
                  </div>
                );
              }
            })}
          </>
        )}
      </div>

      {/* Mobile view */}
      {/* 
      <div className="pt-8 flex relative tablet:hidden">
        <div className="main_bg flex flex-col justify-center content-center"></div>
          <h1 className="m-8 mt-16 text-6xl font-extrabold leading-none tracking-tight text-white-900 flex justify-center uppercase absolute z-5 text-center">
            Want to perform at the CJF?{" "}
          </h1>
          <h3 className="justify-center text-center w-full flex text-4xl absolute z-5 top-[24rem] m-8">Band applications are now open</h3>
          <div className="button-container mb-16 absolute z-5 bottom-[-2rem]">
            <Button.LinkButton
              text="Apply Now"
              link="../applications"
              classNme="std-button m-4 justify-center content-center"
            />
          </div>
        </div> */}
    </>
  );
};

export default BandApplications;
