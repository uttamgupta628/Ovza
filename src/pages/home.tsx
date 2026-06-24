
import HeroSection from '../sections/home/HeroSection'
import OVZAFiles from '../sections/home/Ovzafiles'
import OurServices from '../sections/home/Ourservices'
import WhyOVZA from '../sections/home/Whyovza'
import ClientsAndPartner from '../sections/home/Clientsandpartner'
import VideoAndNewsletter from '../sections/home/Videoandnewsletter'

import videoFile from '../assets/ovza-guide.mp4'
import newsletterImg from '../assets/newsletter-illustration.png' 

import partnerImg from '../assets/partner-image.png' 

import card1 from '../assets/card1.png'
import card2 from '../assets/card2.png'
import card3 from '../assets/card3.png'
import card4 from '../assets/card4.png'
import card5 from '../assets/card5.png'
import card6 from '../assets/card6.png'

import containerImage from '../assets/Container.png'
import container1Image from '../assets/Container(1).png'
import container2Image from '../assets/Container(2).png'

const Home = () => {
  return (
    <>
      <HeroSection />
      <OVZAFiles />
      <OurServices
        containerImage={containerImage}
        container1Image={container1Image}
        container2Image={container2Image}
      />
      <WhyOVZA
        card1Image={card1}
        card2Image={card2}
        card3Image={card3}
        card4Image={card4}
        card5Image={card5}
        card6Image={card6}
      />
        <ClientsAndPartner partnerImage={partnerImg} />
        <VideoAndNewsletter videoSrc={videoFile} newsletterImage={newsletterImg} />
    </>
  )
}

export default Home