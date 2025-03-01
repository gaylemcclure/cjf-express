import styled from "styled-components";
import HeroImageSection from "../components/pageSections/heroImageSection";
import HeroVideoSection from "../components/pageSections/heroVideoSection";
import HeroVideoSectionOverlay from "../components/pageSections/heroVideoSectionOverlay";
import SponsorSection from "../components/pageSections/sponsorSection";
import { useLandingContext } from "../utils/landingContext";
import LandingPageImageSection from "../components/pageSections/landingPageImageSection";
import SingleImageTextSection from "../components/pageSections/singleImageTextSection";
import SingleImageHeadlineSection from "../components/pageSections/singleImageHeadlineSection";

const LandingPage = () => {
  const { allLanding } = useLandingContext();

  const createSection = (section) => {
    const contentType = section.sys.contentType.sys.id;

    //Hero section (no overlay)
    if (contentType === "heroMedia" || contentType === "heroImage") {
      if (section.fields.overlay === true) {
        if (section.fields.media.fields.file.contentType === "video/mp4") {
          const url = section.fields.media.fields.file.url;
          console.log(section);
          return (
            <HeroVideoSectionOverlay
              url={url}
              key={section.sys.id}
              buttonLink={section.fields.buttonLink}
              hasButton={section.fields.hasButton}
              buttonText={section.fields.buttonText}
              text={section.fields.overlayText}
            />
          );
        } else if (section.fields.media.fields.file.contentType === "image/jpeg") {
          const url = section.fields.media.fields.file.url;
          return <HeroImageSection url={url} key={section.sys.id} />;
        }
      } else {
        if (section.fields.media.fields.file.contentType === "video/mp4") {
          const url = section.fields.media.fields.file.url;
          return <HeroVideoSection url={url} key={section.sys.id} />;
        } else if (section.fields.media.fields.file.contentType === "image/jpeg") {
          const url = section.fields.media.fields.file.url;
          return <HeroImageSection url={url} key={section.sys.id} />;
        }
      }
    }

    if (contentType === "landingPageImageSection") {
      const data = section.fields;
      return <LandingPageImageSection data={data} key={section.sys.id} />;
    }
    if (contentType === "singleImageTextSections") {
      return (
        <SingleImageTextSection
          key={section.sys.id}
          url={section.fields.image.fields.file.url}
          filename={section.fields.image.fields.file.filename}
          heading={section.fields.headingText}
          subtext={section.fields.subText}
          textId={section.sys.id}
          buttonText={section.fields.buttonText}
          buttonLink={section.fields.buttonLink}
        />
      );
    }
    if (contentType === "singleImageHeadlineSection") {
      return (
        <SingleImageHeadlineSection
          key={section.sys.id}
          url={section.fields.image.fields.file.url}
          filename={section.fields.image.fields.file.filename}
          heading={section.fields.headingText}
          subtext={section.fields.subText}
          textId={section.sys.id}
          buttonText={section.fields.buttonText}
          buttonLink={section.fields.buttonLink}
          imageside={section.fields.imageside}
          isButton={section.fields.hasButton}
        />
      );
    }
    if (contentType === "landingPageSponsorSection") {
      const data = section.fields;
      return <SponsorSection data={data} key={section.sys.id} />;
    } else {
    }
  };

  return (
    <LandingWrapper>
      {allLanding.length !== 0 && (
        <>
          {allLanding.map((section) => {
            return createSection(section);
          })}
        </>
      )}
    </LandingWrapper>
  );
};

const LandingWrapper = styled.div``;

export default LandingPage;
