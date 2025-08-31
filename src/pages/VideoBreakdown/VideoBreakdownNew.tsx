import { useLocation, useParams } from 'react-router';
import { useVideoBreakdown } from '../../hooks/videos.js';
import type { VideoAnalysisMetric, VideoBreakdown } from '../../types/types.js';
import './VideoBreakdown.css';
import { ErrorAlert } from '../../components/ErrorAlert.js';
import LoadingPage from '../../components/LoadingPage.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchVideoBreakdown } from '../../api/videos.js';
import { useUser } from '../../hooks/auth.js';

const dummyData: VideoBreakdown = {
  id: 1,
  title: 'Very Interesting Video',
  score: 94,
  summary: 'really awesome video here',
  videoUrl: '',
  thumbnailUrl: 'https://picsum.photos/300/400',

  // clarity: {
  //   score: 90,
  //   feedback:
  //     'Concepts are explained clearly with simple examples and visual aids.',
  // },
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

interface QualityScore {
  communityGuidelines: VideoAnalysisMetric;
  education: VideoAnalysisMetric;
  delivery: VideoAnalysisMetric;
  audioVisual: VideoAnalysisMetric;
}

export interface VideoBreakdownPostData {
  creatorId: string;
  title: string;
  type: 'VIDEO';
  url: string;
  education: number;
  delivery: number;
  audioVisual: number;
  communityGuidelines: number;
}

export interface VideoBreakdownGetData {
  id: string;
  creatorId: string;
  title: string;
  type: 'VIDEO';
  url: string;
  education: number;
  delivery: number;
  audioVisual: number;
  communityGuidelines: number;
  createdAt: string;
}

export default function VideoBreakdownNew() {
  const location = useLocation();

  const { videoId } = useParams();
  const [breakdownData, setBreakdownData] = useState<VideoBreakdownGetData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);
  const { user } = useUser();
  //   const { data, isLoading, isError, error } = useVideoBreakdown(videoId ?? 'a');
  //   const breakdownData = data;

  useEffect(() => {
    setIsLoading(true);
    const fetchBreakdown = async () =>
      setBreakdownData(
        await fetchVideoBreakdown(videoId ?? 'a', user.token).finally(() =>
          setIsLoading(false),
        ),
      );
    fetchBreakdown();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error || !breakdownData) {
    return <ErrorAlert message={`Error loading video breakdown: ${error}`} />;
  }

  const metrics: {
    label: string;
    icon: string;
    metric: VideoAnalysisMetric;
  }[] = [
    {
      label: 'Educational Value',
      icon: '🎓',
      metric: { score: breakdownData.education, feedback: '' },
    },
    {
      label: 'Delivery',
      icon: '🎤',
      metric: { score: breakdownData.delivery, feedback: '' },
    },
    {
      label: 'Audio/Visual',
      icon: '🎬',
      metric: { score: breakdownData.audioVisual, feedback: '' },
    },
    {
      label: 'Community Guidelines',
      icon: '⚖️',
      metric: { score: breakdownData.communityGuidelines, feedback: '' },
    },
    // { label: 'Length', icon: '⏱️', metric: newBreakdownData.contentQuality.length },
  ];

  const avgScore = metrics.reduce((a, b) => a + b.metric.score, 0) / 4;

  return (
    <scroll-view
      scroll-orientation="vertical"
      style={{ width: '100%', height: 'calc(100vh - 60px)' }}
    >
      <view className="video-breakdown-container">
        {/* <view className="thumbnail-box">
          <image
            mode="aspectFit"
            src={newBreakdownData.thumbnailUrl}
            className="video-thumbnail"
          />
        </view> */}
        <text>{`Video URL: ${breakdownData.url}`}</text>
        <text>{breakdownData.title}</text>
        <view
          className="score-circle"
          style={{ backgroundColor: scoreToColor(avgScore) }}
        >
          <text className="score-text">{avgScore.toFixed(1)}%</text>
        </view>
        {/* <view className="summary-box">
          <text style={{ fontWeight: 'bold' }}>Analysis:</text>
          <text>{newBreakdownData.summary}</text>
        </view> */}
        <view className="metrics-container">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              metric={metric.metric}
              icon={metric.icon}
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
  icon: string;
  metric: VideoAnalysisMetric;
}

function MetricCard({ label, metric, icon }: MetricCardProps) {
  return (
    <view className="metric-card">
      <text className="metric-label">
        {icon} {label}
      </text>
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
