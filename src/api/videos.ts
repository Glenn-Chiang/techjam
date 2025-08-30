import type { VideoPreviewData } from '../pages/VideoList/VideoPreview.js';
import type { VideoBreakdown } from '../types/types.js';
import { apiFetch, apiFetchML } from './baseApi.js';

/* Video Breakdown API */
export const fetchVideoBreakdowns = async (): Promise<VideoBreakdown[]> => {
  const response = await apiFetch('/content');
  if (!response.ok) {
    throw new Error('Failed to fetch video breakdowns');
  }
  const data = await response.json();
  return data;
};

export const fetchVideoBreakdown = async (
  videoId: number,
  token: string,
): Promise<VideoBreakdown> => {
  const response = await apiFetch(`/content/${videoId}`, {}, token);
  if (!response.ok) {
    throw new Error(`Failed to fetch video breakdown for video: ${videoId}`);
  }
  const data = await response.json();
  return data;
};

export const generateVideoBreakdown = async (
  videoUrl: string,
): Promise<VideoBreakdown> => {
  const response = await apiFetchML('/content/quality-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: videoUrl }),
  });

  // if (!response.ok) {
  //   throw new Error('Failed to generate breakdown');
  // }

  return response;
};

/* Video List API */
export const fetchConsumerVideos = async (
  stub?: boolean,
): Promise<VideoPreviewData[]> => {
  if (stub === true) {
    const response: VideoPreviewData[] = await apiFetch('/content/c');
    return response;
  }

  function randomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  }

  const stubMetric = () => ({
    score: Math.random() * 100,
    feedback: 'feedback',
  });

  return Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Sample Video ${i + 1}`,
    qualityScore: Math.random() * 100,
    createdDate: randomDate(new Date('2025-01-01'), new Date()), // random date between Jan 1 2025 and now
    clarity: stubMetric(),
    educationalValue: stubMetric(),
    delivery: stubMetric(),
    audioVisual: stubMetric(),
    originality: stubMetric(),
    length: stubMetric(),
    compliance: stubMetric(),
  }));
};
