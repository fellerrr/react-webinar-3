import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";


function Main() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const store = useStore();

  useEffect(() => {
    const limit = 10;
    const skip = (currentPage - 1) * limit;
    store.actions.catalog.load(limit, skip)
      .then((totalCount) => {
        const totalPages = Math.ceil(totalCount / limit);
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.log(error)
      });
  }, [currentPage]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const select = useSelector(state => ({
    list: state.catalog.list,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),

  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </PageLayout>
  );
}

export default memo(Main);
