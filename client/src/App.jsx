// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout.jsx'
import HomePage from './pages/Home/HomePage.jsx';
import ProjectsPage from './pages/Projects/ProjectsPage.jsx';
import ProjectPage from './pages/Projects/ProjectPage.jsx';
import PhotosPage from './pages/Photos/PhotosPage.jsx';
import VideoPage from './pages/Video/VideoPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/home' element={<HomePage />}/>
        <Route index element={<HomePage />}/>
        <Route path="*" element={<NotFoundPage />} />
        {/* These are the values passed where it says <Outlet /> in Layout.jsx component *basically like children for router-dom*/}
        <Route path="/" element={<Layout />}>
          <Route path='projects' element={<ProjectsPage />} />
          <Route path='projects/:projectId' element={<ProjectPage />} />
          <Route path='/photos' element={<PhotosPage />}/>
          <Route path='/photos/:publicId' element={<PhotosPage />} />
          <Route path='/video' element={<VideoPage />} />
          
        </Route>
      </Routes>
    </Router>
  );
}
