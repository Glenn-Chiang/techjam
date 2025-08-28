import './Home.css'
import lynxLogo from './assets/lynx-logo.png'

export function Home() {
  return (
    <view>
      <view className='Background' />
      <view className='App'>
        <view className='Banner'>
          <view className='Logo'>
             <image src={lynxLogo} className='Logo--lynx' />
          </view>
          <text className='Title'>React</text>
        </view>
        <view className='Content'>
          <text className='Description'>Upload a Video</text>
          
        </view>
        <view style={{ flex: 1 }} />
      </view>
    </view>
  )
}
