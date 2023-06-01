import './style.css'
import {Link} from "react-router-dom";

const ProfileBar = ({user, login, onLogout}) => {
  let profile
  if (user) {
    profile = user.profile
  }
  const name =  profile ? profile.name : ''
  const title = login ? 'Выход' : 'Вход'
  return (
    <div className='profile'>
      {login && <>
        <Link to='/profile'><span className='profile-name'>{name}</span></Link>
        <Link to='/'>
          <button onClick={onLogout}>{title}</button>
        </Link>
      </>
        }
      {!login && <Link to='/login'>
                    <button>{title}</button>
                  </Link>
      }
    </div>
  );
};

export default ProfileBar;