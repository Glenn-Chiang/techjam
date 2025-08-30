import { useState } from 'react';
import { Button } from '../../components/Button.js';
import TextField from '../../components/TextField.js';
import { useSignup } from '../../hooks/auth.js';
import './Signup.css';
import { useNavigate } from 'react-router';
import Link from '../../components/Link.js';
import Logo from '../../components/Logo.js';
import { verifyEmail } from '../../utils/input.js';

export default function Signup() {
  const route = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { mutate } = useSignup();

  return (
    <view className="signup-page">
      <Logo style={{ height: '100px' }} />
      <view>
        <TextField
          placeholder="Name"
          bindinput={(e) => setName(e.detail.value)}
        />
      </view>
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
        disabled={!verifyEmail(email) || password.length < 8 || name === ''}
        label="Sign Up"
        onTap={() =>
          mutate({ name, email, password }, { onSuccess: () => route('/') })
        }
        fullWidth
      />
      <view style={{ marginTop: '24px' }}>
        <text>Already have an account?</text>
        <Link bindtap={() => route('/login')}>Login</Link>
      </view>
    </view>
  );
}
