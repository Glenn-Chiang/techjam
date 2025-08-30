import '@lynx-js/preact-devtools';
import { root } from '@lynx-js/react';
import '@lynx-js/react/debug';
import Router from './Router.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './components/UserProvider.js';

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <Router />
    </UserProvider>
  </QueryClientProvider>,
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
