import {generateCode2} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {...initState, cart: []};
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }


  /**
   * Удаление записи по коду
   * @param title
   */
  deleteItem(title) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(item => item.title !== title)
    })
    console.log('dele', this.state.cart)
  };


  /**
   * Добавление в корзину
   */
  addToCart(title) {
    const item = this.state.list.find(item => item.title === title);
    const cartItem = this.state.cart.find(item => item.title === title);
    if (cartItem) {
      cartItem.count += 1;
      this.setState({
        ...this.state,
        cart: [...this.state.cart]
      });
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {...item, code: generateCode2(), count: 1}]
      });
    }
  }
  getCartTotal() {
    let total = 0;
    this.state.cart.forEach(item => {
      total += item.price * item.count;
    });
    return total;
  }
}

export default Store;
