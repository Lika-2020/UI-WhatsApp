import { useDispatch } from 'react-redux';
import avatar from '../../../img/avatar.jpg';
import message from '../../../img/message.png';
import './HeaderListChat.css';
import { toggleBlockVisibility } from '../../../store/slice/uiSlice';

function HeaderListChat() {
  const dispatch = useDispatch();

  const handleToggleBlockVisibility = () => {
    dispatch(toggleBlockVisibility());
  };

  return (
    <header className="header-listChat">
      <div className="header-block">
        <div className="header-avatar">
          <img src={avatar} alt="аватар" />
        </div>
        <div role='presentation' className="header-avatar" onClick={handleToggleBlockVisibility}>
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
