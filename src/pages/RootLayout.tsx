import { Outlet } from 'react-router';
import { AppBar } from '../components/AppBar.js';
import '../index.css';

export default function RootLayout() {
  return (
    <>
      <view style={{ paddingTop: 24, height: '100%' }}>
        <Outlet />
      </view>
      <AppBar />
    </>
  );
}
