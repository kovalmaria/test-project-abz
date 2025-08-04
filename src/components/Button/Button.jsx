import './Button.scss';

export const Button = ({ children, disabled = false, onClick }) => (
  <button 
    className={`button ${disabled ? 'button--disabled' : ''}`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
)
