import styled from 'styled-components';
import { useHeaderContext } from '../utils/headerContext';
import { useState } from 'react';
import ImageSection from '../components/imageSection';
import HeroSection from '../components/heroSection';
import SponsorSection from '../components/sponsorSection';

const LandingPage = () => {
  const { hero, imageSection, sponsors, allLanding } = useHeaderContext();



  return (
    <LandingWrapper>
    {/* <HeroSection url={hero} /> */}
    <ImageSection />
    <SponsorSection />
    </LandingWrapper>
    
  )
}

const LandingWrapper = styled.div`

`

export default LandingPage;