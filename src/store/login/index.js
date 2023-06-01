import StoreModule from "../module";

class LoginState extends StoreModule {

  initState() {
    return {
      login: '',
      password: '',
      error: '',
      // success: false
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
  // setSuccess(success) {
  //   this.setState({
  //     ...this.getState(),
  //     success
  //   });
  // }

  async login() {
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
      .then(response => {
        if (!response.ok) {
          throw new Error('Неверное имя пользователя или пароль');
        }
        this.setError('')
        return response.json();
      })
      .then(responseData => {
        if (responseData.result.token) {
          // Успешная авторизация
          // this.setSuccess(true)
          localStorage.setItem('token', responseData.result.token);
          this.store.actions.user.load()

        }
      })
      .catch(error => {
        this.setError(error.message)
      });
  }
}

export default LoginState;