import { MemoryRouter, Route, Routes } from 'react-router';
import { Home } from './pages/Home/Home.js';
import VideoList from './pages/VideoList/VideoList.js';
import VideoBreakdown from './pages/VideoBreakdown/VideoBreakdown.js';
import RootLayout from './pages/RootLayout.js';

export default function Router() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/videos" element={<VideoList />} />
          <Route path="/videos/:videoId" element={<VideoBreakdown />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}
