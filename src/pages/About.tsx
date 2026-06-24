
import AboutHero from '../sections/About/AboutHero';
import AboutEmpowering from '../sections/About/AboutEmpowering';
import ValueProposition from '../sections/About/AboutValueProposition';
import AboutInternationalPresence from '../sections/About/AboutInternationalPresence';
import AboutTestimonials from '../sections/About/AboutTestimonials';


import heroImage from '../assets/heroImage.png'; 
import buildingImage from '../assets/building.png';
import globeImage from '../assets/globe.png';
import newsletterImage from '../assets/newsletterImage.png'


const About = ()=>{
    return (
        <>
            <AboutHero heroImage={heroImage} />
            <AboutEmpowering buildingImage={buildingImage} />
            <ValueProposition />    
        <AboutInternationalPresence globeImage={globeImage} />
        <AboutTestimonials newsletterImage={newsletterImage} />
        </>
    )
}

export default About;