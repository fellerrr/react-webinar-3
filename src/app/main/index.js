import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import ProfileBar from "../../components/profile-bar";
import useSelector from "../../hooks/use-selector";
import login from "../login";

function Main() {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.user.load();
  }, [], true);
  const select = useSelector(state => ({
    login: state.user.login,
    user: state.user.data,
  }));
  const callbacks = {
    onLogout: useCallback(() => store.actions.user.logout(), [store])
  }
  const {t} = useTranslate();
  console.log(select.login)
  return (
    <PageLayout>
      <ProfileBar user={select.user} login={select.login} onLogout={callbacks.onLogout}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
