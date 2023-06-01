import './style.css';

const ProfileInfo = ({user}) => {
  const profile = user.profile
  console.log(profile)
  const name =  profile ? profile.name : ''
  const phone =  profile ? profile.phone : ''
  const email =  user.email


  return (
    <div className='profile-info'>
      <h3>Профиль</h3>
      <p>Имя: <span className='profile-info-item'>{name}</span></p>
      <p>Телефон: <span className='profile-info-item'>{phone}</span></p>
      <p>email: <span className='profile-info-item'>{email}</span></p>
    </div>
  );
};

export default ProfileInfo;