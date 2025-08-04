import { useRef, useState, useEffect } from 'react';
import './Tooltip.scss';

export const Tooltip = ({ text }) => {
  const ref = useRef();
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      setIsOverflowed(el.scrollWidth > el.clientWidth);
    }
  }, [text]);

  const handleMouseEnter = (e) => {
    if (!isOverflowed) return;

    setCoords({ x: e.clientX - 50, y: e.clientY + 20 });
    setVisible(true);
  };

  const handleMouseLeave = () => setVisible(false);


  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span ref={ref} className="tooltip-text">
        {text}
      </span>

      {visible && (
        <span
          className="tooltip-popup"
          style={{ top: coords.y, left: coords.x }}
        >
          {text}
        </span>
      )}
    </div>
  );
};
