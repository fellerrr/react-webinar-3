import ProfileBar from "../../components/profile-bar";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import useTranslate from "../../hooks/use-translate";
import FormLogin from "../../components/form-login";
import {useCallback, useEffect} from "react";
import useStore from "../../hooks/use-store";
import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";

const Login = () => {
  const store = useStore();
  const {t} = useTranslate();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    success: state.login.success,
    login: state.user.login,
    error: state.login.error
  }));

  const callbacks = {
    onUsernameChange: useCallback(login => store.actions.login.setLogin(login), [store]),
    onPasswordChange: useCallback(password => store.actions.login.setPassword(password), [store]),
    onSubmit: useCallback(() => store.actions.login.login(), [store]),

  }
  useEffect(()=>{
    console.log('select.login',select.login)
    if (select.login) {
      navigate('/profile')
    }
  },[select.login])



  return (
    <PageLayout>
      <ProfileBar/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <FormLogin
        t={t}
        onUsernameChange={callbacks.onUsernameChange}
        onPasswordChange={callbacks.onPasswordChange}
        onSubmit={callbacks.onSubmit}
        error={select.error}
      />
    </PageLayout>

  );
};

export default Login;