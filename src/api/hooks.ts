import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { VideoBreakdown } from '../types/types.js';
import {
  fetchVideoBreakdowns,
  fetchVideoBreakdown,
  generateVideoBreakdown,
} from './api.js';

// Hook to fetch all video breakdowns
export const useVideoBreakdowns = () => {
  return useQuery<VideoBreakdown[], Error>({
    queryKey: ['videoBreakdowns'],
    queryFn: fetchVideoBreakdowns,
  });
};

// Hook to fetch a single video breakdown by ID
export const useVideoBreakdown = (videoId: number) => {
  return useQuery<VideoBreakdown, Error>({
    queryKey: ['videoBreakdown', videoId],
    queryFn: () => fetchVideoBreakdown(videoId),
  });
};

// Hook to generate a video breakdown
export const useGenerateVideoBreakdown = () => {
  const queryClient = useQueryClient();

  return useMutation<VideoBreakdown, Error, File>({
    mutationFn: (video: File) => generateVideoBreakdown(video),
    onSuccess: () => {
      // Invalidate the list of video breakdowns to refetch
      queryClient.invalidateQueries({ queryKey: ['videoBreakdowns'] });
    },
  });
};
