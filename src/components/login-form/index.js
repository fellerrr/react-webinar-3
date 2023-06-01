import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const store = useStore();
  const ProfileLoad = useInit(() => {

    store.actions.user.load();
  }, [], true);
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `/api/v1/users/sign`;
    const data = {
      login: username,
      password: password
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
        setError('')
        return response.json();
      })
      .then(responseData => {
        console.log(responseData);
        if (responseData.result.token) {
          // Успешная авторизация
          localStorage.setItem('token', responseData.result.token);
          ProfileLoad
          navigate('/profile');
        }
      })
      .catch(error => {
        setError(error.message)
      });
  };
  return (
    <div className='login-form'>
      <h3>Вход</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Логин</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {error && <p className='login-error'>{error}</p>}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;
