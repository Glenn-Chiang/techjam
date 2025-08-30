export interface VideoBreakdown {
  id: number;
  title: string;
  score: number;
  summary: string;
  thumbnailUrl: string;
  videoUrl: string;

  contentQuality: {
    educationalValue: VideoAnalysisMetric;
    delivery: VideoAnalysisMetric;
    audioVisual: VideoAnalysisMetric;
    compliance: VideoAnalysisMetric
    length: VideoAnalysisMetric;
  }
}

export interface VideoAnalysisMetric {
  score: number;
  feedback: string;
}

export interface UserData {
  id: string;
  name: string,
  email: string,
  walletBalance: number,
  averageContentQuality: number,
  token: string,
}