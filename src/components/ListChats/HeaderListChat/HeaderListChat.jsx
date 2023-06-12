import avatar from '../../../img/avatar.jpg';
import message from '../../../img/message.png';
import './HeaderListChat.css';

function HeaderListChat() {
  return (
    <header className='header-listChat'>
      <div className='header-block'>
        <div className='header-avatar'>
          <img src={avatar} alt="аватар" />
        </div>
        <div className='header-avatar'>
          <img src={message} alt="написать сообщение" />
        </div>
        <div className=" menu-container">
          <div className="menu-dots" />
        </div>
      </div>
    </header>
  );
}

export default HeaderListChat;
