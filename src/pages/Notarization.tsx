import NotarizationHero from '../sections/Notarization/Notarizationhero'
import NotarizationInfo from '../sections/Notarization/Notarizationinfo'
import NotarizationPricing from '../sections/Notarization/Notarizationpricing'
import heroImg from '../assets/normalisationHero.png'
import infoImg from '../assets/normalisation1.png'

const NotarizationPage = () => (
  <>
    <NotarizationHero heroImage={heroImg} />
    <NotarizationInfo infoImage={infoImg} />
    <NotarizationPricing />

  </>
)

export default NotarizationPage