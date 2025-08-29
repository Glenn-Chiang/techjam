import type { VideoBreakdown } from '../types/types.js';
import { apiFetch } from './baseApi.js';

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
  const response = await apiFetch('/content', { method: 'POST', body: formData });
  if (!response.ok) {
    throw new Error('Failed to generate breakdown');
  }
  const data = await response.json();
  return data;
};
