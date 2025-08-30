export const TEXT_LOGO = '(QC)ontent';
import type { IntrinsicElements } from '@lynx-js/types';
import './Logo.css';

export default function Logo(props: IntrinsicElements['view']) {
  return (
    <view style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <text className="logo" {...props}>
        {TEXT_LOGO}
      </text>
      ;
    </view>
  );
}
