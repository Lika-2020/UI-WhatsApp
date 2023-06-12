import avatar from '../../../img/avatar.jpg';
import './HeaderMessageChat.css'

function HeaderMessageChat() {

  return (
    <header className='header-messageChat'>
      <div className='header-blocks'>
        <div className='avatar'>
          <img className='img' src={avatar} alt="аватар" />
        </div>
        <div className='title-spans'>
              <span>+7960 000 000</span>
            </div>
      </div>
    </header>
  );
}



export default HeaderMessageChat