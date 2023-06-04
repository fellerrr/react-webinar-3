import StoreModule from "../module";

class LoginState extends StoreModule {

  initState() {
    return {
      login: '',
      password: '',
      error: '',
    };
  }

  setLogin(login) {
    this.setState({
      ...this.getState(),
      login: login
    });
  }

  setPassword(password) {
    this.setState({
      ...this.getState(),
      password: password
    });
  }

  setError(error) {
    this.setState({
      ...this.getState(),
      error
    });
  }

  clearForm() {
    this.setState({
      ...this.getState(),
      login: '',
      password: '',
      error:''
    });
  }
  async login(e) {
    e.preventDefault()
    console.log('z pfitk')
    const url = `/api/v1/users/sign`;
    const data = {
      login: this.getState().login,
      password: this.getState().password
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      // .then(async response => {
      //   if (!response.ok) {
      //     throw new Error('Неверное имя пользователя или пароль');
      //   }
      //   this.setError('')
      //   return response.json();
      // })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.result.token) {
          // Успешная авторизация
          localStorage.setItem('token', responseData.result.token);
          this.store.actions.user.setAuthorized(true);
        }
      })
      .catch(error => {
        this.setError(error.message)
        //Там еще есть поле  error.data но она пустая, если там планировалось выводить разные ошибки по факту
        //то можно их будет перебрать в будущем , а так не допонял.
      });
  }

  async logout() {
    console.log('z pfitk fwefwqegqwergqeg gqgerg')
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: { "X-Token": localStorage.getItem('token') }
    });

    localStorage.removeItem('token');
    this.store.actions.user.setAuthorized(false);
    this.store.actions.profile.deleteProfile()
  }
}

export default LoginState;