import type { CSSProperties } from '@lynx-js/types';
import './Button.css';

interface ButtonProps {
  onTap: () => void;
  label: string;
  disabled?: boolean;
  style?: CSSProperties;
}

export function Button({ onTap, label, disabled, style }: ButtonProps) {
  const handleTap = () => {
    if (!disabled) {
      onTap();
    }
  };
  return (
    <view
      style={style}
      className={`button ${disabled && 'button-disabled'}`}
      bindtap={handleTap}
    >
      <text>{label}</text>
    </view>
  );
}
