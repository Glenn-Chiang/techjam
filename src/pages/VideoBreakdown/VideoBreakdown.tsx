import { useParams } from 'react-router';
import { useVideoBreakdown } from '../../hooks/videos.js';
import type { VideoAnalysisMetric, VideoBreakdown } from '../../types/types.js';
import './VideoBreakdown.css';

export default function VideoBreakdown() {
  const { videoId } = useParams();
  // const { data, isLoading, error } = useVideoBreakdown(Number(videoId));
  const data = dummyData;

  const metrics: { label: string; metric: VideoAnalysisMetric }[] = [
    { label: 'Clarity', metric: data.clarity },
    { label: 'Educational Value', metric: data.educationalValue },
    { label: 'Delivery', metric: data.delivery },
    { label: 'Audio/Visual', metric: data.audioVisual },
    { label: 'Originality', metric: data.originality },
    { label: 'Length', metric: data.length },
    { label: 'Compliance', metric: data.compliance },
  ];

  return (
    <scroll-view
      scroll-orientation="vertical"
      style={{ width: '100%', height: 'calc(100vh - 60px)' }}
    >
      <view className="video-breakdown-container">
        <view className="thumbnail-box">
          <image
            mode="aspectFit"
            src={data.thumbnailUrl}
            className="video-thumbnail"
          />
        </view>
        <text>{data.title}</text>
        <view
          className="score-circle"
          style={{ backgroundColor: scoreToColor(data.score) }}
        >
          <text className="score-text">{data.score}%</text>
        </view>
        <view className="summary-box">
          <text style={{ fontWeight: 'bold' }}>Analysis:</text>
          <text>{data.summary}</text>
        </view>
        <view className="metrics-container">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              metric={metric.metric}
            />
          ))}
        </view>
      </view>
    </scroll-view>
  );
}

function scoreToColor(score: number) {
  // Determine bar color based on score
  let color = '#4caf50'; // green
  if (score < 50)
    color = '#f44336'; // red
  else if (score < 75) color = '#ff9800'; // orange
  return color;
}

interface MetricCardProps {
  label: string;
  metric: VideoAnalysisMetric;
}

function MetricCard({ label, metric }: MetricCardProps) {
  return (
    <view className="metric-card">
      <text className="metric-label">{label}</text>
      <view
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <view className="score-bar-container">
          <view
            className="score-bar-fill"
            style={{
              width: `${metric.score}%`,
              backgroundColor: scoreToColor(metric.score),
            }}
          />
        </view>
        <text className="score-text-right">{metric.score}%</text>
      </view>

      <text>{metric.feedback}</text>
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

  clarity: {
    score: 90,
    feedback:
      'Concepts are explained clearly with simple examples and visual aids.',
  },
  educationalValue: {
    score: 95,
    feedback:
      'The video provides accurate information and adds value by connecting concepts to real-world examples.',
  },
  delivery: {
    score: 85,
    feedback:
      'The presenter speaks confidently with good pacing, though some sections could be more dynamic.',
  },
  audioVisual: {
    score: 80,
    feedback:
      'Audio is clear and visuals support the content, but lighting and transitions could be improved.',
  },
  originality: {
    score: 88,
    feedback:
      'The content presents familiar topics in a unique and engaging way.',
  },
  length: {
    score: 92,
    feedback: 'The video is concise and appropriately timed for the topic.',
  },
  compliance: {
    score: 100,
    feedback: 'Content adheres to all safety and factual guidelines.',
  },
};
