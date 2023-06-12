import './Header.css';
import Logo from '../../../img/Logo.png';

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={Logo} alt="whatsApp" />
        <div className="header-logo name-block">
          <span className="logo-title">WHATSAPP</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
