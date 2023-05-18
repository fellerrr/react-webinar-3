import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const cartList = store.getState().cart;
  const cartSum = store.getCartTotal()

  const [showCart, setShowCart] = useState(false)

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
      <Controls list={cartList} cartSum={cartSum} setShowCart={setShowCart}/>
      <List list={list}
            onAction={callbacks.onAddToCart}
            buttonTitle='Добавить'
      />
      {showCart &&
        <Cart
          list={cartList}
          onAction={callbacks.onDeleteFromCart}
          buttonTitle='Удалить'
          setShowCart={setShowCart}
          cartSum={cartSum}
        />
      }
    </PageLayout>
  );
}

export default App;
