import { useParams } from 'react-router';
import { useVideoBreakdown } from '../../hooks/videos.js';
import type { VideoBreakdown } from '../../types/types.js';
import './VideoBreakdown.css';

export default function VideoBreakdown() {
  const { videoId } = useParams();
  // const { data, isLoading, error } = useVideoBreakdown(Number(videoId));
  const data = dummyData;

  return (
    <view className="video-breakdown-container">
      <view className='thumbnail-box'>
      <image
        mode="aspectFit"
        src={data.thumbnailUrl}
        className="video-thumbnail"
      />
      </view>
      <text className="video-title">{data.title}</text>
      <view className="score-circle">
        <text className="score-text">{data.score}%</text>
      </view>
      <view className="summary-box">
        <text style={{ fontWeight: 'bold' }}>Breakdown:</text>
        <text className="video-summary">{data.summary}</text>
      </view>
    </view>
  );
}

const dummyData: VideoBreakdown = {
  id: 1,
  title: 'Very Interesting Video',
  score: 94,
  summary: 'really awesome video here',
  videoUrl: '',
  thumbnailUrl: 'https://picsum.photos/300/400',
};
