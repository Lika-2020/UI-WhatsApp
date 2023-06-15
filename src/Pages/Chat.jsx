import HeaderListChat from '../components/ListChats/HeaderListChat/HeaderListChat';
import BodyListChat from '../components/ListChats/BodyListChat/BodyListChat';
import HeaderMessageChat from '../components/MessageChat/HeaderMessageChat/HeaderMessageChat';
import BodyMessageChat from '../components/MessageChat/BodyMessageChat/BodyMessageChat';
import MessageInputChat from '../components/MessageChat/MessageInputChat/MessageInputChat';
import './Chat.css'


function Chat() {
  return (
    <div className='chat'>
      <div className='chat-container'>
        <HeaderMessageChat />
        <BodyMessageChat />
        <MessageInputChat />
      </div>
      <div className='list-chat'>
        <HeaderListChat />
        <BodyListChat />
      </div>
    </div>
  );
}

export default Chat;
