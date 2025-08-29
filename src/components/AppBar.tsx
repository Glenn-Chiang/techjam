import { useNavigate } from 'react-router';
import './AppBar.css';
import { useState } from 'react';

export function AppBar() {
  const [activeTab, setActiveTab] = useState(0);
  const navItems = [
    { url: '/', label: 'Upload' },
    { url: '/videos', label: 'My Videos' },
  ];
  return (
    <view className="app-bar">
      {navItems.map((item, index) => (
        <NavItem
          key={index}
          url={item.url}
          label={item.label}
          isActive={activeTab === index}
          setIsActive={() => setActiveTab(index)}
        />
      ))}
    </view>
  );
}

interface NavItemProps {
  url: string;
  label: string;
  isActive: boolean;
  setIsActive: () => void;
}

function NavItem({ url, label, isActive, setIsActive }: NavItemProps) {
  const nav = useNavigate();
  const onTap = () => {
    setIsActive();
    nav(url);
  };
  return (
    <view className={`nav-item ${isActive && 'active'}`} bindtap={onTap}>
      <text>{label}</text>
    </view>
  );
}
