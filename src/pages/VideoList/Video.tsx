import VideoListApi from './VideoListApi.js';
import './Video.css';
import { useNavigate } from 'react-router';

export interface VideoProps {
  id: number;
  title: string;
  viewCount: number;
  uploadDate: Date;
  width?: number;
}

const processViewCount = (c: number) =>
  c < 1000
    ? `${c}`
    : c < 1_000_000
      ? `${(c / 1_000).toFixed(1)}K`
      : c < 1_000_000_000
        ? `${(c / 1_000_000).toFixed(1)}M`
        : c < 1_000_000_000_000
          ? `${(c / 1_000_000_000).toFixed(1)}B`
          : c < 1_000_000_000_000_000
            ? `${(c / 1_000_000_000_000).toFixed(1)}T`
            : 'Infinity';

const processRelativeUploadDate = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime(); // ms difference

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years}y ago`;
  if (months > 0) return `${months}m ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}min ago`;
  return `${seconds}sec ago`;
};

export default function Video({
  id,
  title,
  viewCount,
  uploadDate,
  width
}: VideoProps) {
  const routeTo = useNavigate();

  return (
    <view
      className="VideoThumbnail--View"
      bindtap={() => routeTo(`/videos/:${id}`)}
      style={{
        position: 'relative',
      }}
    >
      <image
        className="VideoThumbnail--Thumbnail"
        src={VideoListApi.getVideoThumbnail(id)}
        mode="aspectFill"
        style={{
          width: width ? `${width}px` : '150px',
          height: width ? `${(4 / 3) * width}px` : '200px',
        }}
      />

      {/* Play button overlay */}
      <view
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <text style={{ fontSize: '2.5rem'}}>▶</text>
      </view>

      {/* Top gradient overlay */}
      <view
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '50px',
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))',
        }}
      />

      {/* Bottom gradient overlay */}
      <view
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50px',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))',
        }}
      />

      {/* Top information */}
      <view
        style={{
          position: 'absolute',
          top: '4px',
          left: '4px',
        }}
      >
        <text>
          {title}
          <inline-truncation>
            <text>...</text>
          </inline-truncation>
        </text>
        <text>{processRelativeUploadDate(uploadDate)}</text>
      </view>

      {/* Bottom information */}
      <view
        style={{
          position: 'absolute',
          bottom: '4px',
          left: '4px',
        }}
      >
        <text>{`★ ${(Math.random() * 5).toFixed(1)}`}</text>
        <text>{`▶ ${processViewCount(viewCount)}`}</text>
      </view>
    </view>
  );
}
