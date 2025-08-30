import type { CSSProperties } from '@lynx-js/types';
import './Button.css';

interface ButtonProps {
  onTap: () => void;
  label: string;
  disabled?: boolean;
  style?: CSSProperties;
  textStyle?: CSSProperties;
}

export function Button({ onTap, label, disabled, style, textStyle }: ButtonProps) {
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
      <text style={textStyle}>{label}</text>
    </view>
  );
}
