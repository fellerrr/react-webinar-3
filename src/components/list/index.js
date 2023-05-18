import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onAction, buttonTitle, fromCart}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item
            item={item}
            onAction={onAction}
            buttonTitle={buttonTitle}
            fromCart={fromCart}
          />
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
  onAction: PropTypes.func,
  fromCart:PropTypes.bool

};

List.defaultProps = {
  onAction: () => {},
}

export default React.memo(List);
