import { MemoryRouter, Route, Routes } from 'react-router';
import { Home } from './pages/Home/Home.js';
import VideoList from './pages/VideoList/VideoList.js';
import VideoBreakdown from './pages/VideoBreakdown/VideoBreakdown.js';
import RootLayout from './pages/RootLayout.js';
import VideoView from './pages/VideoView/VideoView.js';

export default function Router() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/videos" element={<VideoList />} />
          {/* /p indicates producer (creator) view */}
          {/* /c indicates consumer (viewer) view */}
          <Route path="/videos/p/:video_id" element={<VideoBreakdown />} />
          <Route path="/videos/c/:video_id" element={<VideoView />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}
