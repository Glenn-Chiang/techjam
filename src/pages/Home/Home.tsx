import './Home.css'

export function Home() {
  const onClickUpload = () => {

  }

  return (
    <view className="home-page" style={{ paddingBottom: 'var(--nav-height)' }}>
      <text className="home-page-text">Rate Your Video</text>

      <view className="upload-button" bindtap={onClickUpload}>
        <text>Upload</text>
      </view>
    </view>
  )
}
