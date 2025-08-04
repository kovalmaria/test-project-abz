import './Header.scss';
import logo from '../../assets/logo.svg';
import name from '../../assets/name.svg';

import { Button } from '../Button/Button';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <img src={logo} alt="Logo" className="header__logo-img" />
          <img src={name} alt="Logo" className="header__logo-img" />
        </div>
        <nav className="header__nav">
          <a href="#users" className="header__link">
            <Button>Users</Button>
          </a>
          <a href="#signup" className="header__link">
            <Button>Sign up</Button>
          </a>
        </nav>
      </div>
    </header>
  )
}
