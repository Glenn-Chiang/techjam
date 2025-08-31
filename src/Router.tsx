import { MemoryRouter, Route, Routes } from 'react-router';
import VideoList from './pages/VideoList/VideoList.js';
import VideoBreakdown from './pages/VideoBreakdown/VideoBreakdown.js';
import RootLayout from './pages/RootLayout.js';
import VideoView from './pages/VideoView/VideoView.js';
import Login from './pages/Login/Login.js';
import { Home } from './pages/Home/Home.js';
import Signup from './pages/Signup/Signup.js';
import VideoBreakdownNew from './pages/VideoBreakdown/VideoBreakdownNew.js';

export default function Router() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/videos" element={<VideoList />} />
          {/* /p indicates producer (creator) view */}
          {/* /c indicates consumer (viewer) view */}
          <Route path="/videos/p/result" element={<VideoBreakdown />} />
          <Route path="/videos/p/:videoId" element={<VideoBreakdownNew />} />
          <Route path="/videos/c/:video_id" element={<VideoView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}
