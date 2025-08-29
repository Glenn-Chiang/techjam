import { useEffect, useState } from 'react';
import VideoListApi from './VideoListApi.js';
import Video, { type VideoProps } from './Video.js';

export default function VideoList() {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const fetchVideos = async () => setVideos(await VideoListApi.getVideos());
    fetchVideos();
  }, []);

  return (
    <scroll-view
      scroll-orientation="vertical"
      style={{ flex: 1, width: '100%', height: 'calc(100% - 60px)' }}
      bindlayoutchange={(e) => setScreenWidth(e.detail.width)}
    >
      <view
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          // rowGap: '2px',
          // columnGap: '2px',
          width: 'fit-content',
        }}
      >
        {videos.map((v, i) => (
          <Video
            key={i}
            id={v.id}
            title={v.title}
            viewCount={v.viewCount}
            uploadDate={v.uploadDate}
            width={(1 / 3) * screenWidth}
          />
        ))}
      </view>
    </scroll-view>
  );
}
