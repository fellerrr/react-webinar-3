import StoreModule from "../module";

/**
 * Детальная ифнормация о пользователе
 */
class UserState extends StoreModule {

  initState() {
    return {
      data: {},
      login: false,
      waiting: false // признак ожидания загрузки
    }
  }

  /**
   * @return {Promise<void>}
   */
  async load () {
    this.setState({
      data: {},
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/self', {
        headers: { "X-Token": localStorage.getItem('token') }
      });

      if (response.ok) {
        const json = await response.json();
        // Пользователь загружен успешно
        this.setState({
          data: json.result,
          login: true,
          waiting: false
        }, () => {
          console.log('Загружен профиль пользователя из API');
        });
      } else {
        // Обработка ошибки
        throw new Error('Ошибка при загрузке');
      }

    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        data: {},
        waiting: false
      });
    }
  }

  async logout() {
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: { "X-Token": localStorage.getItem('token') }
    });

    localStorage.removeItem('token');

    this.setState({
      ...this.getState(),
      data: {},
      login: false
    }, 'Пользователя не существует.');
  }

}

export default UserState;
