import { Spinner } from './Spinner.js';

export default function LoadingPage() {
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
      <Spinner />
    </view>
  );
}
