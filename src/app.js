import {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list
  const cartList = store.getState().cart
  const cartSum = store.getState().totalPrice

  const [showCart, setShowCart] = useState(false)

  const callbacks = {
    onDeleteFromCart: useCallback((title) => {
      store.deleteItem(title);
    }, [store]),

    onAddToCart: useCallback((title) => {
      store.addToCart(title)
    }, [store]),
  }
  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls list={cartList} cartSum={cartSum} setShowCart={setShowCart}/>
      <List list={list}
            onAction={callbacks.onAddToCart}
            buttonTitle='Добавить'
            itemComponent={item}
      />
      {showCart &&
        <Cart
          list={cartList}
          onAction={callbacks.onDeleteFromCart}
          setShowCart={setShowCart}
          cartSum={cartSum}
        />
      }
    </PageLayout>
  );
}

export default App;
