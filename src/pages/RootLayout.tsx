import { Outlet } from 'react-router';
import { AppBar } from '../components/AppBar.js';
import '../index.css'

export default function RootLayout() {
  return (
    <>
      <Outlet />
      <AppBar />
    </>
  );
}
