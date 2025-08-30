import { Outlet } from 'react-router';
import { AppBar } from '../components/AppBar.js';
import '../index.css';

export default function RootLayout() {
  return (
    <>
      <view style={{ paddingTop: 24 }}>
        <Outlet />
      </view>
      <AppBar />
    </>
  );
}
