import type { VideoBreakdown } from '../types/types.js';

const BASE_URL = 'https://api.example.com';

export const fetchVideoBreakdowns = async (): Promise<VideoBreakdown[]> => {
  const response = await fetch('/content');
  if (!response.ok) {
    throw new Error('Failed to fetch video breakdowns');
  }
  const data = await response.json();
  return data;
};

export const fetchVideoBreakdown = async (
  videoId: number,
): Promise<VideoBreakdown> => {
  const response = await fetch(`/content/${videoId}`);
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
  const response = await fetch('/content', { method: 'POST', body: formData });
  if (!response.ok) {
    throw new Error('Failed to generate breakdown');
  }
  const data = await response.json();
  return data;
};
