import type { CSSProperties } from '@lynx-js/types';
import './Button.css';

interface ButtonProps {
  onTap: () => void;
  label: string;
  disabled?: boolean;
  style?: CSSProperties;
  textStyle?: CSSProperties;
  fullWidth?: boolean;
}

export function Button({
  onTap,
  label,
  disabled,
  style,
  textStyle,
  fullWidth,
}: ButtonProps) {
  const handleTap = () => {
    if (!disabled) {
      onTap();
    }
  };
  return (
    <view
      style={{ ...style, ...(fullWidth ? { width: '100%' } : {}) }}
      className={`button ${disabled && 'button-disabled'}`}
      bindtap={handleTap}
    >
      <text style={textStyle}>{label}</text>
    </view>
  );
}
