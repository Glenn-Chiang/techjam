import './VideoPreview.css';
import { useNavigate } from 'react-router';
import type React from 'react';
import type { PropsWithChildren } from 'react';
import VideoListApi from './VideoListApi.js';

export interface VideoPreviewData {
  id: string;
  title: string;
  qualityScore: number;
  createdDate: Date;
  width?: number;

  clarity: VideoAnalysisMetric;
  educationalValue: VideoAnalysisMetric;
  delivery: VideoAnalysisMetric;
  audioVisual: VideoAnalysisMetric;
  originality: VideoAnalysisMetric;
  length: VideoAnalysisMetric;
  compliance: VideoAnalysisMetric;
}

interface VideoAnalysisMetric {
  score: number;
  feedback: string;
}

interface VideoPreviewProps {
  video: VideoPreviewData,
  width?: number;
}

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

const VideoPreviewText: React.FC<{ text: string }> = ({ text }) => (
  <text style={{ color: 'white', fontSize: '0.9em' }}>
    {text}
    <inline-truncation>
      <text>...</text>
    </inline-truncation>
  </text>
);

const VideoPreviewOverlayTop: React.FC<PropsWithChildren> = ({ children }) => (
  <view
    style={{
      position: 'absolute',
      top: '4px',
      left: '4px',
    }}
  >
    {children}
  </view>
);

const VideoPreviewOverlayBottom: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <view
    style={{
      position: 'absolute',
      bottom: '4px',
      left: '4px',
    }}
  >
    {children}
  </view>
);

const VideoPreviewGradientTop: React.FC = () => (
  <view
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '50px',
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))',
      borderRadius: '4px',
    }}
  />
);

const VideoPreviewGradientBottom: React.FC = () => (
  <view
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '50px',
      background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))',
      borderRadius: '4px',
    }}
  />
);

export default function VideoPreview({
  video,
  width
}: VideoPreviewProps) {
  const routeTo = useNavigate();
  const { id, title, createdDate: uploadDate, qualityScore } = video;
  
  return (
    <view
      bindtap={() => routeTo(`/videos/p/:${id}`)}
      style={{
        position: 'relative',
        width: width ? `${width}px` : '150px',
      }}
    >
      {/* Thumbnail */}
      <image
        src={VideoListApi.getVideoThumbnail(id)}
        style={{
          borderRadius: '4px',
          width: width ? `${width}px` : '150px',
          height: width ? `${(4 / 3) * width}px` : '200px',
        }}
      />

      {/* Overlays and play icon */}
      <VideoPreviewGradientTop />
      <VideoPreviewGradientBottom />

      {/* Top information */}
      <VideoPreviewOverlayTop>
        <VideoPreviewText text={title} />
        <VideoPreviewText text={processRelativeUploadDate(uploadDate)} />
      </VideoPreviewOverlayTop>

      {/* Bottom information */}
      <VideoPreviewOverlayBottom>
        <VideoPreviewText text={`★ ${qualityScore.toFixed(1)}`} />
      </VideoPreviewOverlayBottom>
    </view>
  );
}
