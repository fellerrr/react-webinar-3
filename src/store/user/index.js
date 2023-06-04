import StoreModule from "../module";

/**
 * Детальная ифнормация о пользователе
 */
class UserState extends StoreModule {
  initState() {
    return {
      authorized: false
    };
  }
  setAuthorized(value) {
    this.setState({
      ...this.getState(),
      authorized: value
    });
  }
  checkAuth() {
    let token = localStorage.getItem('token');
    if (token){
      this.setAuthorized(true)
    }
    else {
      this.setAuthorized(false)
    }
  }
}
export default UserState;
