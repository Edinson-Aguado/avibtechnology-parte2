
import UserInfo from './userInfo/UserInfo';
import './UserProfile.css';
import UserSidebar from './userSideBar/UserSideBar';

const UserProfile = () => {
    return (
        <div className="user-profile-page">
            <UserSidebar/>
            <div className="user-profile-content">
                <h2>Mi Perfil</h2>
                <UserInfo/>
            </div>
        </div>
    );
};

export default UserProfile;
