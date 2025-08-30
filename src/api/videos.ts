import type { VideoPreviewData } from '../pages/VideoList/VideoPreview.js';
import type { VideoBreakdown } from '../types/types.js';
import { apiFetch } from './baseApi.js';

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
): Promise<VideoBreakdown> => {
  const response = await apiFetch(`/content/${videoId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch video breakdown for video: ${videoId}`);
  }
  const data = await response.json();
  return data;
};

export const generateVideoBreakdown = async (
  video: File,
): Promise<VideoBreakdown> => {
  const formData = new FormData();
  formData.append('video', video);
  const response = await apiFetch('/content', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to generate breakdown');
  }
  const data = await response.json();
  return data;
};

/* Video List API */
export const fetchConsumerVideos = async (
  stub?: boolean,
): Promise<VideoPreviewData[]> => {
  if (stub === true) {
    const response: VideoPreviewData[] = await apiFetch('/content/c'); // should have a route for consumer view?
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
  })

  return Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Sample Video ${i + 1}`,
    viewCount: Math.floor(Math.random() * 100000), // random views
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
