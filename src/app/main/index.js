import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import Menu from "../../components/menu";
import Head from "../../components/head";

function Main() {
  const store = useStore();
  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    currentPage: state.catalog.currentPage
  }));
  useEffect(() => {
    try {
      store.actions.catalog.load()
    }
    catch (error){
      console.log(error)
    }
  }, [select.currentPage, select.count]);
  const handlePageChange = (page) => {
    store.actions.catalog.setCurrentPage(page);
  };


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),

  }

  const renders = {
    // item: useCallback((item) => {
    //   return <Item item={item} onAdd={callbacks.addToBasket}/>
    // }, [callbacks.addToBasket]),
    renderItem: useCallback(
      (item) => {
        const detailUrl = `/detail/${item._id}`;
        return <Item item={item} onAdd={callbacks.addToBasket} detailUrl={detailUrl}/>
      },
      [callbacks.addToBasket]
    )
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Menu/>
      <List list={select.list} renderItem={renders.renderItem}/>
      <Pagination currentPage={select.currentPage} totalPages={select.count} onPageChange={handlePageChange} />
    </PageLayout>
  );
}

export default memo(Main);
