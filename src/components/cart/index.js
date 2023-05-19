import PropTypes from 'prop-types';
import './style.css';
import Head from "../head";
import List from "../list";

function Cart({list, onAction, buttonTitle, setShowCart, cartSum}){
  const fromCart=true
  return (
    <div className='Cart'>
      <div className='Cart-container'>
        <button
          className='Cart-close'
          onClick={() => setShowCart(false)}
        >
          Закрыть
        </button>
        <Head title='Корзина'/>
        <List list={list} onAction={onAction} buttonTitle={buttonTitle} fromCart={fromCart}/>
        <div className='Cart-sum'>
          Итого: <span className='Cart-sum-num'>{cartSum.toLocaleString('ru-RU')}</span>
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

export default React.memo(Cart);