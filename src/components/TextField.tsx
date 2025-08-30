import type { IntrinsicElements } from '@lynx-js/types';
import './TextField.css';

export default function TextField(props: IntrinsicElements['input']) {
    return (<input className="text-field" {...props} />)
}