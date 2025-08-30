import { useParams } from 'react-router';
import { useVideoBreakdown } from '../../hooks/videos.js';
import type { VideoBreakdown } from '../../types/types.js';

export default function VideoBreakdown() {
  const { videoId } = useParams();
  const { data, isLoading, error } = useVideoBreakdown(Number(videoId));

  return <></>;
}

const dummyData: VideoBreakdown = {
  id: 1,
  title: 'Dummy Vid',
  score: 100,
  summary: 'really awesome video here',
  videoUrl: '', 
};
