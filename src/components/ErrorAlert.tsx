import './ErrorAlert.css';

interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <view className="error-alert-view">
      <text className="error-alert-text">{message}</text>
    </view>
  );
}
