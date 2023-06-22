import { useDispatch } from 'react-redux';
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
        
        <div role='presentation' className="header-avatar" onClick={handleToggleBlockVisibility}>
          <img src={message} alt="написать сообщение" />
          <span className='create-chat'>Создать чат</span>
        </div>
      
      </div>
    </header>
  );
}

export default HeaderListChat;
