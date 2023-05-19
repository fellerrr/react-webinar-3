import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";
import {memo} from "react";

function Controls({list, cartSum, setShowCart}){
  const len = list.length
  const status = len + " " +
    plural(len, {one: 'товар', few: 'товара', many: 'товаров'}) + " / " +
    cartSum.toLocaleString('ru-RU') + " ₽"
  return (
    <div className='Controls'>
      <span>
        В корзине:<span className='Controls-status'>{len > 0 ? status : 'пусто'}</span>
      </span>
      <button onClick={() => setShowCart(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  cartSum:PropTypes.number,
  setShowCart:PropTypes.func
};

export default memo(Controls);
