import { Outlet } from 'react-router';
import { AppBar } from '../components/AppBar.js';
import '../index.css';
import { useUser } from '../hooks/auth.js';

export default function RootLayout() {
  const { user } = useUser();

  return (
    <>
      <view style={{ paddingTop: 24, height: '100%' }}>
        <Outlet />
      </view>
      {user.id !== '' && <AppBar />}
    </>
  );
}
