import { MemoryRouter, Route, Routes } from "react-router";
import { Home } from "./pages/Home/Home.js";
import VideoList from "./pages/VideoList/VideoList.js";
import VideoScore from "./pages/VideoScore/VideoScore.js";

export default function Router() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/videos" element={<VideoList/>}/>
        <Route path="/videos/:video_id" element={<VideoScore/>}/>
      </Routes>
    </MemoryRouter>
  )
}
