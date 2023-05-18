import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const cartList = store.getState().cart;
  const cartSum = store.getCartTotal()
  const callbacks = {
    onDeleteFromCart: useCallback((title) => {
      store.deleteItem(title);
      store.getCartTotal()
    }, [store]),

    onAddToCart: useCallback((title) => {
      store.addToCart(title)
      store.getCartTotal()
    }, [store]),
  }
  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls list={cartList} onDeleteFromCart={callbacks.onDeleteFromCart} cartSum={cartSum}/>
      <List list={list}
            onAddToCart={callbacks.onAddToCart}
      />
    </PageLayout>
  );
}

export default App;
