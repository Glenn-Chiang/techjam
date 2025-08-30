import { useEffect, useState } from 'react';
import VideoPreview, { type VideoPreviewData } from './VideoPreview.js';
import { fetchConsumerVideos } from '../../api/videos.js';
import { Button } from '../../components/Button.js';
import './VideoList.css';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useUser } from '../../hooks/auth.js';
import SimplePage from '../../components/SimplePage.js';

enum VideoSortParameter {
  QualityScore,
  ViewCount,
  CreatedDate,
  Clarity,
  EduValue,
  Delivery,
  AudioVisual,
  Originality,
  Length,
  Compliance,
}

enum SortOrder {
  Asc,
  Desc,
}

type VideoSortConfig = {
  param: VideoSortParameter;
  order: SortOrder;
};

function FilterButton({ onTap, label, disabled }: { onTap: () => void; label: string; disabled?: boolean }) {
  return (
    <Button
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '2px',
        flexShrink: 0,
        padding: '12px 16px !important',
      }}
      textStyle={{
        fontSize: '1em',
      }}
      onTap={onTap}
      label={label}
      disabled={disabled}
    />
  );
}

export default function VideoList() {
  const { user } = useUser();
  const [videos, setVideos] = useState<VideoPreviewData[]>([]);
  const [screenWidth, setScreenWidth] = useState(0);
  const [sortConfig, setSortConfig] = useState<VideoSortConfig>({
    param: VideoSortParameter.QualityScore,
    order: SortOrder.Desc,
  });

  useEffect(() => {
    const fetchVideos = async () => setVideos(await fetchConsumerVideos(false));
    fetchVideos();
  }, []);

  const makeFilter = (param: VideoSortParameter) => () =>
    setSortConfig((conf) => ({
      ...conf,
      param,
    }));

  const compareVideo = (a: number, b: number, order: SortOrder) =>
    order === SortOrder.Asc ? a - b : b - a;

  const videoSorter =
    useCallback((s: VideoSortConfig) => (a: VideoPreviewData, b: VideoPreviewData) => {
      switch (s.param) {
        case VideoSortParameter.QualityScore:
          return compareVideo(a.qualityScore, b.qualityScore, s.order);

        case VideoSortParameter.ViewCount:
          return compareVideo(a.viewCount, b.viewCount, s.order);

        case VideoSortParameter.CreatedDate:
          return compareVideo(
            new Date(a.createdDate).getTime(),
            new Date(b.createdDate).getTime(),
            s.order,
          );

        case VideoSortParameter.Clarity:
          return compareVideo(a.clarity.score, b.clarity.score, s.order);

        case VideoSortParameter.EduValue:
          return compareVideo(
            a.educationalValue.score,
            b.educationalValue.score,
            s.order,
          );

        case VideoSortParameter.Delivery:
          return compareVideo(a.delivery.score, b.delivery.score, s.order);

        case VideoSortParameter.AudioVisual:
          return compareVideo(
            a.audioVisual.score,
            b.audioVisual.score,
            s.order,
          );

        case VideoSortParameter.Originality:
          return compareVideo(
            a.originality.score,
            b.originality.score,
            s.order,
          );

        case VideoSortParameter.Length:
          return compareVideo(a.length.score, b.length.score, s.order);

        case VideoSortParameter.Compliance:
          return compareVideo(a.compliance.score, b.compliance.score, s.order);

        default:
          return 0;
      }
    }, []);

  const sortedVideos = useMemo(() => {
    const arr = [...videos];
    arr.sort(videoSorter(sortConfig));
    return arr;
  }, [videos, videoSorter, sortConfig]);

  if (user.id === '') {
    return <SimplePage><text>Please login to view your analysed videos.</text></SimplePage>
  }

  return (
    <scroll-view
      scroll-orientation="vertical"
      style={{
        flex: 1,
        width: '100%',
        height: 'calc(100% - 84px)',
        marginTop: '24px',
        padding: '2px',
      }}
      bindlayoutchange={(e) => setScreenWidth(e.detail.width)}
    >
      <text className="sort-section-label" style={{ fontSize: '0.95em' }}>
        Sort Videos
      </text>
      <view
        style={{
          display: 'flex',
          width: '100%',
          borderRadius: '4px',
          backgroundColor: 'white',
          position: 'sticky',
          top: '0px',
          marginBottom: '8px',
        }}
      >
        <FilterButton
          onTap={() =>
            setSortConfig((conf) => ({
              ...conf,
              order:
                conf.order === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc,
            }))
          }
          label={sortConfig.order === SortOrder.Asc ? 'Asc' : 'Desc'}
        />
        <scroll-view
          scroll-orientation="horizontal"
          flatten={true} // Android requirement
          style={{
            backgroundColor: 'white',
            display: 'flex',
            gap: '20px',
            height: '100%',
          }}
        >
          <FilterButton
            onTap={makeFilter(VideoSortParameter.Clarity)}
            label="Clarity"
            disabled={sortConfig.param === VideoSortParameter.Clarity}
          />
          <FilterButton
            onTap={makeFilter(VideoSortParameter.EduValue)}
            label="Edu Value"
            disabled={sortConfig.param === VideoSortParameter.EduValue}
          />
          <FilterButton
            onTap={makeFilter(VideoSortParameter.Delivery)}
            label="Delivery"
            disabled={sortConfig.param === VideoSortParameter.Delivery}
          />
          <FilterButton
            onTap={makeFilter(VideoSortParameter.AudioVisual)}
            label="Audio Visual"
            disabled={sortConfig.param === VideoSortParameter.AudioVisual}
          />
          <FilterButton
            onTap={makeFilter(VideoSortParameter.Originality)}
            label="Originality"
            disabled={sortConfig.param === VideoSortParameter.Originality}
          />
          <FilterButton
            onTap={makeFilter(VideoSortParameter.Length)}
            label="Length"
            disabled={sortConfig.param === VideoSortParameter.Length}
          />
          <FilterButton
            onTap={makeFilter(VideoSortParameter.Compliance)}
            label="Compliance"
            disabled={sortConfig.param === VideoSortParameter.Compliance}
          />
        </scroll-view>
      </view>
      <view
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          rowGap: '2px',
          columnGap: '2px',
          width: '100%',
          borderRadius: '4px',
        }}
      >
        {sortedVideos.map((v) => (
          <VideoPreview
            key={v.id}
            video={v}
            width={(1 / 3) * screenWidth - 8 / 3}
          />
        ))}
      </view>
    </scroll-view>
  );
}
