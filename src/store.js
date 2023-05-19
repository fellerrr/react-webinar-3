import {generateCode2} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = { ...initState, cart: [], totalQuantity: 0, totalPrice: 0 };
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
   * Удаление записи из корзины по названию
   * @param title {string}
   */
  deleteItem(title) {
    const updatedCart = this.state.cart.filter(item => item.title !== title);
    const { totalQuantity, totalPrice } = this.calculateTotal(updatedCart);
    this.setState({...this.state, cart: updatedCart, totalQuantity, totalPrice})
  }


  /**
   * Добавление в корзину
   * @param title {string}
   */
  addToCart(title) {
    // находим товар по названию в списке
    const item = this.state.list.find(item => item.title === title)
    // находим индес массива в списке корзины, если есть
    const cartItemIndex = this.state.cart.findIndex(item => item.title === title)
    // если индекс найден найден
    if (cartItemIndex !== -1) {
      // создаем новый список на основе текущей корзины
      const updatedCart = [...this.state.cart];
      // берем товар из этого списка по индексу
      updatedCart[cartItemIndex] = {
        // записываем в него все что было
        ...updatedCart[cartItemIndex],
        // меняем только количество (+1)
        count: updatedCart[cartItemIndex].count + 1
      }
      // вычисляем количество и общую сумму
      const { totalQuantity, totalPrice } = this.calculateTotal(updatedCart)
      // обновляем State
      this.setState({...this.state, cart: updatedCart, totalQuantity, totalPrice})
    } else {
      const newCartItem = { ...item, code: generateCode2(), count: 1 }
      const updatedCart = [...this.state.cart, newCartItem]
      const { totalQuantity, totalPrice } = this.calculateTotal(updatedCart)
      this.setState({...this.state, cart: updatedCart, totalQuantity, totalPrice})
    }
  }

  /**
   * Функция подсчета количества и общей суммы
   * @param cart
   */
  calculateTotal(cart) {
    let totalQuantity = 0;
    let totalPrice = 0;

    for (const item of cart) {
      totalQuantity += item.count;
      totalPrice += item.price * item.count;
    }
    return { totalQuantity, totalPrice };
  }
}

export default Store;
