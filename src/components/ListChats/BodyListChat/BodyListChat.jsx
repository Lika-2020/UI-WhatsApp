import avatar from '../../../img/avatar.jpg';
import './BodyListChat.css';


function BodyListChat() {
  return (
    <div>
      <div className="list-chats">
        <div className="list-item">
         <div className="container-listItem"> 
            <div className="container-img">
              <img src={avatar} alt="аватар" />
            </div>
            <div className='title-span'>
              <span>+7960 000 000</span>
            </div>
            <div className="arrow-down" />
          </div>
        
          <div className="container-listItem"> 
            <div className="container-img">
              <img src={avatar} alt="аватар" />
            </div>
            <div className='title-span'>
              <span>+7960 000 000</span>
            </div>
            <div className="arrow-down" />
          </div>
        </div>
      </div>
  
    </div>
  );
}

export default BodyListChat;
