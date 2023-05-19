import PropTypes from 'prop-types';
import './style.css';
import Head from "../head";
import List from "../list";
import {memo} from "react";
import ItemCart from "../item-cart";

function Cart({list, onAction, buttonTitle, setShowCart, cartSum}){
  const fromCart=true
  return (
    <div className='Cart'>
      <div className='Cart-container'>
        <div className='Cart-head'>
          <Head title='Корзина'/>
          <button
            className='Cart-close'
            onClick={() => setShowCart(false)}
          >
            Закрыть
          </button>
        </div>
        <List
          list={list}
          onAction={onAction}
          buttonTitle={buttonTitle}
          itemComponent={ItemCart}
        />
        <div className='Cart-sum'>
          Итого: <div className='Cart-sum-num'>{cartSum.toLocaleString('ru-RU')} <span> ₽</span></div>
        </div>
      </div>
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  setShowCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
  cartSum: PropTypes.number,
  buttonTitle: PropTypes.string
};

List.defaultProps = {
  onDeleteFromCart: () => {},
}

export default memo(Cart);