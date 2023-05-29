import React, {useCallback} from 'react';
import Head from "../head";
import BasketTool from "../basket-tool";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import {Link} from "react-router-dom";
import './style.css'

const Menu = () => {
  const store = useStore();
  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));
  return (
    <div>
      <div className='menu'>
        <Link to="/" className='linkToMain'>Главная</Link>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
      </div>
    </div>
  );
};

export default Menu;