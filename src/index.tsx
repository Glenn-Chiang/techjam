import '@lynx-js/preact-devtools';
import { root } from '@lynx-js/react';
import '@lynx-js/react/debug';
import Router from './Router.js';

root.render(<Router />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
