import { useState, type SetStateAction } from 'react';
import './Home.css';
import { Button } from '../../components/Button.js';
import { useNavigate } from 'react-router';
import { Spinner } from '../../components/Spinner.js';
import { useGenerateVideoBreakdown } from '../../hooks/videos.js';
import { ErrorAlert } from '../../components/ErrorAlert.js';
import { useUser } from '../../hooks/auth.js';
import Login from '../Login/Login.js';

export function Home() {
  const [inputContent, setInputContent] = useState('');
  const { user } = useUser();
  const handleInput = (e: { detail: { value: SetStateAction<string> } }) => {
    setInputContent(e.detail.value);
  };

  const navigate = useNavigate();
  const { mutate, isPending, isError } = useGenerateVideoBreakdown();
  // const apiFetch = useApiFetch();

  const onTapAnalyse = () => {
    mutate(inputContent, {
      // Redirect to video breakdown page
      onSuccess: (res) => {
        navigate(`/videos/p/${res.id}`);
      },
    });
  };

  if (user.id === '') {
    navigate('/login');
    return <Login />;
  }

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
        {/* <Button
          label="Auth"
          onTap={() =>
            apiFetch(`/content`)
              .then((res) => setTokenOk(true))
              .catch(() => setTokenOk(false))
          }
        />
        {tokenOk && <text>Token OK</text>}
        {!tokenOk && <text>Token FAIL</text>}
        {<text>{`Token: ${user.token}`}</text>} */}
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
