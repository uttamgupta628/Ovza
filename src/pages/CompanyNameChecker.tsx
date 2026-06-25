import CompanyNameCheckHero from "../sections/CompanyNameCheck/CompanyNameCheckHero";
import CompanyNameCheckForm from '../sections/CompanyNameCheck/Companynamecheckform'
import NameSearchProcess from '../sections/CompanyNameCheck/Namesearchprocess'
import NameCheckFAQ from '../sections/CompanyNameCheck/Namecheckfaq'
import BankingInsights from '../sections/Banking/Bankinginsights'
import NewsletterSubscribe from '../sections/CompanyNameCheck/Newslettersubscribe'

const CompanyNameCheckerPage = () => (
  <>
    <CompanyNameCheckHero />
    <CompanyNameCheckForm />
    <NameSearchProcess />
    <NameCheckFAQ />
    <BankingInsights />
    <NewsletterSubscribe />
  </>
);

export default CompanyNameCheckerPage;