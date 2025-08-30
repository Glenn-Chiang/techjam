import { useEffect, useState } from 'react';
import VideoPreview, { type VideoPreviewData } from './VideoPreview.js';
import { fetchConsumerVideos } from '../../api/videos.js';

export default function VideoList() {
  const [videos, setVideos] = useState<VideoPreviewData[]>([]);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const fetchVideos = async () => setVideos(await fetchConsumerVideos(false));
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
          rowGap: '2px',
          columnGap: '2px',
          width: '100%',
          padding: '2px',
        }}
      >
        {videos.map((v, i) => (
          <VideoPreview
            key={i}
            video={v}
            width={(1 / 3) * screenWidth - 8 / 3}
          />
        ))}
      </view>
    </scroll-view>
  );
}
