import React from 'react';
import Hero from '../components/Hero';
import VideoFeature from '../components/VideoFeature';
import FeaturedApp from '../components/FeaturedApp';
import PopularBrands from '../components/PopularBrands';
import PopularApps from '../components/PopularApps';
import CategoryExplorer from '../components/CategoryExplorer';
import SuccessStories from '../components/SuccessStories';

export default function Home() {
  return (
    <>
      <Hero />
      <VideoFeature />
      <FeaturedApp />
      <PopularBrands />
      <PopularApps />
      <CategoryExplorer />
      <SuccessStories />
    </>
  );
}