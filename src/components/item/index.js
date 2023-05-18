import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){
  const fromCart = props.fromCart

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.title);
    },
    addToCart: (e) => {
      e.stopPropagation();
      props.addToCart(props.item.title);
    },
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        <span>{props.item.price.toLocaleString('ru-RU')}</span>
        <span> ₽</span>
      </div>
      {fromCart && <div className='Item-count'>
        <span>{props.item.count}</span>
        <span> шт</span>
      </div>}
      <div className='Item-actions'>
        {fromCart && <button onClick={callbacks.onDelete}>
          Удалить
        </button>}

        {!fromCart && <button onClick={callbacks.addToCart}>
          Добавить
        </button>}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  addToCart: PropTypes.func,
  fromCart: PropTypes.bool
};

Item.defaultProps = {
  onDelete: () => {},
  addToCart: () => {},
}

export default React.memo(Item);
