import { useState } from 'react';
import { Button } from '../../components/Button.js';
import TextField from '../../components/TextField.js';
import { useLogin } from '../../hooks/auth.js';
import './Login.css';
import { useNavigate } from 'react-router';
import Link from '../../components/Link.js';
import Logo from '../../components/Logo.js';
import { verifyEmail } from '../../utils/input.js';
import { ErrorAlert } from '../../components/ErrorAlert.js';

export default function Login() {
  const route = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending, isError, error } = useLogin();

  const onTapLogin = () => {
    mutate(
      { email, password },
      { onSuccess: () => route('/') },
    );
  };

  return (
    <view className="login-page">
      <Logo style={{ height: '100px' }} />
      <view>
        <TextField
          placeholder="Email"
          bindinput={(e) => setEmail(e.detail.value)}
        />
      </view>
      <view>
        <TextField
          placeholder="Password"
          type="password"
          bindinput={(e) => setPassword(e.detail.value)}
        />
      </view>
      <Button
        label="Login"
        onTap={onTapLogin
        }
        disabled={!verifyEmail(email) || password.length < 8 || isPending}
        fullWidth
      />
      {isError && <ErrorAlert message={`Error logging in: ${error}`} />}
      <view style={{ marginTop: '24px' }}>
        <text>Don't have an account?</text>
        <Link bindtap={() => route('/signup')}>Sign Up</Link>
      </view>
    </view>
  );
}
