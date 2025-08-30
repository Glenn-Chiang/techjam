import { useState } from 'react';
import './Home.css';
import { Button } from '../../components/Button.js';
import { useNavigate } from 'react-router';
import { Spinner } from '../../components/Spinner.js';

type AppState = 'default' | 'uploaded' | 'analysing';

export function Home() {
  const [appState, setAppState] = useState<AppState>('default');

  const onTapUpload = () => {
    // TODO: Actually upload
    setAppState('uploaded');
  };

  const navigate = useNavigate();

  const onTapAnalyse = () => {
    setAppState('analysing');
    // TODO: Call endpoint to analyse
    const videoId = 1; // Endpoint should return data containing id of newly analysed video
    setTimeout(() => {
      navigate(`/videos/p/${videoId}`);
    }, 1000);
  };

  return (
    <view className="home-page">
      <text className="home-page-text">Analyse Your Video</text>
      <view
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 8,
        }}
      >
        {appState !== 'analysing' && (
          <Button
            label={appState === 'uploaded' ? 'Change Video' : 'Choose Video'}
            onTap={onTapUpload}
          />
        )}
        {appState !== 'default' && <VideoView />}
        {appState === 'uploaded' && (
          <Button label="Analyse" onTap={onTapAnalyse} />
        )}
        {appState === 'analysing' && (
          <view
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 8,
            }}
          >
            <text style={{textAlign: 'center'}}>Analysing...</text>
            <Spinner />
          </view>
        )}
      </view>
    </view>
  );
}

function VideoView() {
  return (
    <view>
      <text>{'(Video here)'}</text>
    </view>
  );
}
