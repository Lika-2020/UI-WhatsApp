import './BodyMessageChat.css';

function BodyMessageChat() {
  return (
    <div>
      <div className="body-message" />

      <div className="input-block">
        <input className='input' type="text" placeholder="Введите сообщение" />
        <div className='button'/>
      </div>

    </div>
  );
}

export default BodyMessageChat;
