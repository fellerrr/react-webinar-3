import PropTypes from "prop-types";
import './style.css';

function Item(props){
  const fromCart = props.fromCart

  const callbacks = {
    onAction: (e) => {
      e.stopPropagation();
      props.onAction(props.item.title);
    }
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
        <button onClick={callbacks.onAction}>
          {props.buttonTitle}
        </button>
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
  buttonTitle: PropTypes.string,
  fromCart: PropTypes.bool
};

Item.defaultProps = {
  onAction: () => {},
}

export default React.memo(Item);
