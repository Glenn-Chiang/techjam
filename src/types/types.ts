export interface VideoBreakdown {
  id: number;
  title: string;
  score: number;
  summary: string;
  thumbnailUrl: string;
  videoUrl: string;

  clarity: VideoAnalysisMetric;
  educationalValue: VideoAnalysisMetric;
  delivery: VideoAnalysisMetric;
  audioVisual: VideoAnalysisMetric;
  originality: VideoAnalysisMetric;
  length: VideoAnalysisMetric;
  compliance: VideoAnalysisMetric
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