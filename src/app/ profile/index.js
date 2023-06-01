import React, {useCallback} from 'react';
import ProfileBar from "../../components/profile-bar";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import ProfileInfo from "../../components/profile-info";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import { Navigate } from 'react-router-dom';

const  Profile = () => {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.data,
    login: state.user.login,
    waiting: state.user.waiting,
  }));

  const callbacks = {
    onLogout: useCallback(() => store.actions.user.logout(), [store])
  }

  if (!select.login) {
    return <Navigate to="/login" />;
  }

  return (
    <PageLayout>
      <ProfileBar user={select.user} login={select.login} onLogout={callbacks.onLogout}/>
      {/*<Head title={t('title')}>*/}
      <Head title='Магазин'>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <ProfileInfo user={select.user}/>
    </PageLayout>
  );
};

export default  Profile;