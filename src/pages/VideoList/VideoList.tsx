import { useEffect, useState } from 'react';
import VideoPreview, { type VideoPreviewData } from './VideoPreview.js';
import { fetchConsumerVideos } from '../../api/videos.js';
import { Button } from '../../components/Button.js';

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

export default function VideoList() {
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

  return (
    <scroll-view
      scroll-orientation="vertical"
      style={{ flex: 1, width: '100%', height: 'calc(100% - 60px)' }}
      bindlayoutchange={(e) => setScreenWidth(e.detail.width)}
    >
      {/* <scroll-view
        scroll-orientation="horizontal"
        flatten={true} // Android requirement
        style={{
          display: 'flex',
          padding: '2px',
          gap: '2px',
          position: 'sticky',
          top: '0px',
        }}
      >
        <Button
          style={{
            position: 'sticky',
            left: '0px',
          }}
          onTap={() =>
            setSortConfig((conf) => ({
              ...conf,
              order:
                conf.order === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc,
            }))
          }
          label={'↕'}
        />
        <Button
          onTap={makeFilter(VideoSortParameter.Clarity)}
          label="Clarity"
        />
        <Button
          onTap={makeFilter(VideoSortParameter.EduValue)}
          label="Edu Value"
        />
        <Button
          onTap={makeFilter(VideoSortParameter.Delivery)}
          label="Delivery"
        />
        <Button
          onTap={makeFilter(VideoSortParameter.AudioVisual)}
          label="Audio Visual"
        />
        <Button
          onTap={makeFilter(VideoSortParameter.Originality)}
          label="Originality"
        />
        <Button onTap={makeFilter(VideoSortParameter.Length)} label="Length" />
        <Button
          onTap={makeFilter(VideoSortParameter.Compliance)}
          label="Compliance"
        />
      </scroll-view> */}
      <view
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          rowGap: '2px',
          columnGap: '2px',
          width: '100%',
          height: '100%',
          padding: '2px',
        }}
      >
        {videos.map((v, i) => (
          <VideoPreview
            key={i}
            video={v}
            width={(1 / 3) * screenWidth - 8 / 3}
          />
        ))}
      </view>
    </scroll-view>
  );
}
