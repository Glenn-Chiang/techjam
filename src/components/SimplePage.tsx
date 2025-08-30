import type { PropsWithChildren } from 'react';

export default function SimplePage({ children }: PropsWithChildren) {
  return (
    <view
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'calc(100% - 60px)',
      }}
    >
      {children}
    </view>
  );
}
