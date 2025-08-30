import { useState } from 'react';
import './Home.css';
import { Button } from '../../components/Button.js';
import { useNavigate } from 'react-router';
import { Spinner } from '../../components/Spinner.js';
import { useGenerateVideoBreakdown } from '../../hooks/videos.js';
import { ErrorAlert } from '../../components/ErrorAlert.js';

export function Home() {
  const [inputContent, setInputContent] = useState('');

  const handleInput = (e: any) => {
    setInputContent(e.detail.value);
  };

  const navigate = useNavigate();
  const { mutate, isPending, isError } = useGenerateVideoBreakdown();

  const onTapAnalyse = () => {
    mutate(inputContent, {
      // Redirect to video breakdown page
      onSuccess: (res) => {
        navigate(`/videos/p/${res.id}`);
      },
    });
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
        {!isPending && (
          <>
            <input
              className="url-input"
              placeholder="Enter video url"
              bindinput={handleInput}
            />
            <Button
              label="Analyse"
              onTap={onTapAnalyse}
              disabled={!inputContent}
            />
          </>
        )}
        {isPending && (
          <view
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 8,
            }}
          >
            <text style={{ textAlign: 'center' }}>Analysing...</text>
            <Spinner />
          </view>
        )}
        {isError && <ErrorAlert message="Error analysing video" />}
      </view>
    </view>
  );
}
