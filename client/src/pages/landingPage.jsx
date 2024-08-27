import styled from 'styled-components';
import { useState, useEffect } from 'react';
import HeroImageSection from '../components/pageSections/heroImageSection';
import HeroVideoSection from '../components/pageSections/heroVideoSection';
import SponsorSection from '../components/pageSections/sponsorSection';
import { useLandingContext } from '../utils/landingContext'
import LandingPageImageSection from '../components/pageSections/landingPageImageSection';
import SingleImageTextSection from '../components/pageSections/singleImageTextSection';

const LandingPage = () => {
  const { allLanding } = useLandingContext();
  console.log(allLanding)

  const createSection = (section) => {
    const contentType = section.sys.contentType.sys.id
    if (contentType === "heroVideo") {
     const url = section.fields.video.fields.file.url;
     return <HeroVideoSection url={url} key={section.sys.id} />
    }
    if (contentType === "heroImage") {
      const url = section.fields.image.fields.file.url;
      return <HeroImageSection url={url} key={section.sys.id} />
    }
    if (contentType === "landingPageImageSection") {
      const data = section.fields
      return <LandingPageImageSection data={data} key={section.sys.id} />
    }
    if (contentType === "singleImageTextSection") {
      const data = section.fields
      return <SingleImageTextSection data={data} key={section.sys.id} />
    }
    if (contentType === "landingPageSponsorSection") {
      const data = section.fields
      return <SponsorSection data={data} key={section.sys.id} />
    }

    else {

    }
  }

  return (
    <LandingWrapper>
    {allLanding.length !== 0 && (
    <>
    {allLanding.map((section) => {
     return createSection(section)
    })}
    </>
  )}
    </LandingWrapper>
    
  )
}

const LandingWrapper = styled.div`

`

export default LandingPage;