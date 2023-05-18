import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onDeleteFromCart, onAddToCart, fromCart}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onDelete={onDeleteFromCart} addToCart={onAddToCart} fromCart={fromCart}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteFromCart: PropTypes.func,
  onAddToCart: PropTypes.func,
  fromCart:PropTypes.bool
};

List.defaultProps = {
  onDeleteFromCart: () => {},
  onAddToCart: () => {},
}

export default React.memo(List);
