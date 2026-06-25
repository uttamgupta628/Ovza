import NotarizationHero from '../sections/Notarization/Notarizationhero'
import NotarizationInfo from '../sections/Notarization/Notarizationinfo'
import NotarizationPricing from '../sections/Notarization/Notarizationpricing'
import NotarizationSteps from '../sections/Notarization/Notarizationsteps'
import NotarizationPreview  from '../sections/Notarization/Notarizationpreview'
import WhyChooseNotary from '../sections/Notarization/Whychoosenotary'
import FAQAndSubscribe from '../sections/Notarization/Faqandsubscribe'
import heroImg from '../assets/normalisationHero.png'
import infoImg from '../assets/normalisation1.png'
import reqImg from '../assets/notarization-requirements.png'

const NotarizationPage = () => (
  <>
    <NotarizationHero heroImage={heroImg} />
    <NotarizationInfo infoImage={infoImg} />
    <NotarizationPricing />
    <NotarizationSteps requirementsImage={reqImg} />
    <NotarizationPreview />
    <WhyChooseNotary />
    <FAQAndSubscribe />

  </>
)

export default NotarizationPage