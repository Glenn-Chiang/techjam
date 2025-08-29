import './Home.css'

export function Home() {
  return (
    <view>
      <view className='Background' />
      <view className='App'>
        <view className='Banner'>
          <text className='Title'>TikTok TechJam</text>
        </view>
        <view className='Content'>
          <text className='Description'>Upload a Video</text>
          
        </view>
        <view style={{ flex: 1 }} />
      </view>
    </view>
  )
}
