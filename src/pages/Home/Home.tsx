import VideoList from '../VideoList/VideoList.js';
import './Home.css';
// import lynxLogo from './assets/lynx-logo.png'

export function Home() {
  return (
    <view>
      <view className="Background" />
      <view className="App">
        <VideoList />
      </view>
    </view>
  );
}
