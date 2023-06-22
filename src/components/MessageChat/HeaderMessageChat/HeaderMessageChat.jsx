 import { useSelector } from 'react-redux';
import avatar from '../../../img/avatar.jpg';
import './HeaderMessageChat.css';


function HeaderMessageChat() {
  
 const phoneNumber = useSelector((state) => state.message.phoneNumber);

  return (
    <header className="header-messageChat">
      <div className="header-blocks">
        <div className="avatar">
          <img className="img" src={avatar} alt="аватар" />
        </div>
        <div className="title-spans">
          <span>{phoneNumber.phoneNumber}</span>
        </div>
      </div>
    </header>
  );
}

export default HeaderMessageChat;
