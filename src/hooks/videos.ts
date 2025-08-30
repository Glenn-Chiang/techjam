import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { VideoBreakdown } from '../types/types.js';
import {
  fetchVideoBreakdowns,
  fetchVideoBreakdown,
  generateVideoBreakdown,
} from '../api/videos.js';
import { useUser } from './auth.js';

// Hook to fetch all video breakdowns
export const useVideoBreakdowns = () => {
  return useQuery<VideoBreakdown[], Error>({
    queryKey: ['videoBreakdowns'],
    queryFn: fetchVideoBreakdowns,
  });
};

// Hook to fetch a single video breakdown by ID
export const useVideoBreakdown = (videoId: number) => {
  const { user } = useUser();
  return useQuery<VideoBreakdown, Error>({
    queryKey: ['videoBreakdown', videoId],
    queryFn: () => fetchVideoBreakdown(videoId, user.token),
  });
};

// Hook to generate a video breakdown
export const useGenerateVideoBreakdown = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  return useMutation<VideoBreakdown, Error, string>({
    mutationFn: (videoUrl: string) =>
      generateVideoBreakdown(videoUrl),
    onSuccess: () => {
      // Refetch video breakdowns
      queryClient.invalidateQueries({ queryKey: ['videoBreakdowns'] });
    },
  });
};
