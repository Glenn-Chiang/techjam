import type { IntrinsicElements } from '@lynx-js/types';
import './Link.css';
import type { PropsWithChildren } from 'react';

export default function Link({
  children,
  ...props
}: PropsWithChildren<IntrinsicElements['text']>) {
  return <text className="link" {...props}>{children}</text>;
}
