import React, {useState} from "react";
import PropTypes from 'prop-types';
import './style.css';
import Cart from "../cart";
import {plural} from "../../utils";

function Controls({list, onDeleteFromCart, cartSum}){
  const [showCart, setShowCart] = useState(false)

  return (
    <div className='Controls'>
      <span>
        В корзине:
        {!!list.length &&
          <span className='Controls-status'>
            {list.length}{' '}
            {plural(list.length, {one: 'товар', few: 'товара', many: 'товаров'})}{' '}
            / {cartSum.toLocaleString('ru-RU')} ₽
          </span>}
        {!list.length && <span className='Controls-status'>пусто</span>}
      </span>
      <button onClick={() => setShowCart(true)}>Перейти</button>
      {showCart &&
        <Cart
          list={list}
          onDeleteFromCart={onDeleteFromCart}
          setShowCart={setShowCart}
          cartSum={cartSum}
        />
      }
    </div>
  )
}

Controls.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteFromCart: PropTypes.func,
  cartSum:PropTypes.number
};

export default React.memo(Controls);
