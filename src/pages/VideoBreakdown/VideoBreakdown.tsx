import { useLocation, useNavigate, useParams } from 'react-router';
import {
  useSaveVideoBreakdown,
  useVideoBreakdown,
} from '../../hooks/videos.js';
import type { VideoAnalysisMetric, VideoBreakdown } from '../../types/types.js';
import './VideoBreakdown.css';
import { ErrorAlert } from '../../components/ErrorAlert.js';
import LoadingPage from '../../components/LoadingPage.js';
import TextField from '../../components/TextField.js';
import { useState } from 'react';
import { Button } from '../../components/Button.js';
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

export default function VideoBreakdown() {
  const { videoId } = useParams();
  const location = useLocation();
  const route = useNavigate();
  const [title, setTitle] = useState('');
  const { data, isLoading, isError, error } = useVideoBreakdown(
    Number(videoId),
  );

  const newBreakdownData: QualityScore = location.state.result;
  const { mutate } = useSaveVideoBreakdown();
  const { user } = useUser();

  const onTapSaveBreakdown = () => {
    mutate(
      {
        creatorId: user.id,
        title,
        type: 'VIDEO',
        url: location.state.url,
        education: newBreakdownData.education.score,
        delivery: newBreakdownData.delivery.score,
        audioVisual: newBreakdownData.audioVisual.score,
        communityGuidelines: newBreakdownData.communityGuidelines.score,
      },
      { onSuccess: (res) => route(`/videos/p/${res.id}`) },
    );
  };

  if (isError && newBreakdownData === undefined) {
    return <ErrorAlert message={`Error loading video breakdown: ${error}`} />;
  }

  if (isLoading || (!data && newBreakdownData === undefined)) {
    return <LoadingPage />;
  }

  const metrics: {
    label: string;
    icon: string;
    metric: VideoAnalysisMetric;
  }[] = [
    {
      label: 'Educational Value',
      icon: '🎓',
      metric: newBreakdownData.education,
    },
    { label: 'Delivery', icon: '🎤', metric: newBreakdownData.delivery },
    {
      label: 'Audio/Visual',
      icon: '🎬',
      metric: newBreakdownData.audioVisual,
    },
    {
      label: 'Community Guidelines',
      icon: '⚖️',
      metric: newBreakdownData.communityGuidelines,
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
        <text>{`Video URL: ${location.state.url}`}</text>
        <TextField
          placeholder="Video Title"
          bindinput={(e) => setTitle(e.detail.value)}
        />
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
        <Button
          label="Save"
          onTap={onTapSaveBreakdown}
          fullWidth
          disabled={title === ''}
        />
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
