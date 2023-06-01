import ProfileBar from "../../components/profile-bar";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import useTranslate from "../../hooks/use-translate";
import LoginForm from "../../components/login-form";

const Login = () => {
  const {t} = useTranslate();
  return (
    <PageLayout>
      <ProfileBar/>
      {/*<Head title={t('title')}>*/}
      <Head title='Магазин'>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <LoginForm/>
    </PageLayout>

  );
};

export default Login;