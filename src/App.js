import './App.css';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/Home/HomePage';
import SectionList from './pages/SectionList/SectionList';
import SectionAdd from './pages/SectionAdd/SectionAdd';
import SectionPage from './pages/SectionPage/SectionPage';
import SectionEdit from './pages/SectionEdit/SectionEdit';
import { PrivateRoute, EditRoute } from './utils/PrivateRoute';
import Footer from './Components/Footer/Footer';
import TopicAdd from './pages/TopicAdd/TopicAdd';
import TopicEdit from './pages/TopicEdit/TopicEdit';
import TopicPage from './pages/TopicPage/TopicPage';
import SubtopicPage from './pages/SubtopicPage/SubtopicPage';
import SubtopicAdd from './pages/SubtopicAdd/SubtopicAdd';
import SubtopicEdit from './pages/SubtopicEdit/SubtopicEdit';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Unauthorized from './pages/Unauthorized/Unauthorized';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:user" element={<ProfilePage />} />

            {/* Sections */}
            <Route path="/learning" element={<PrivateRoute />}>
              <Route index element={<SectionList />} />
              <Route path="add" element={<SectionAdd />} />
              <Route path=":id" element={<SectionPage />} />
            </Route>

            <Route path="/learning/:id/edit" element={<EditRoute />}>
              <Route index element={<SectionEdit />} />
            </Route>

            {/* Topics */}
            <Route path="/learning/:id/topic/:topicId" element={<PrivateRoute />}>
              <Route index element={<TopicPage />} />
            </Route>

            <Route path="/learning/:id/topic/:topicId/edit" element={<EditRoute />}>
              <Route index element={<TopicEdit />} />
            </Route>

            <Route path="/learning/:id/add" element={<PrivateRoute />}>
              <Route index element={<TopicAdd />} />
            </Route>

            {/* Subtopics */}
            <Route path="/learning/:id/topic/:topicId/material/:matId" element={<PrivateRoute />}>
              <Route index element={<SubtopicPage />} />
            </Route>

            <Route path="/learning/:id/topic/:topicId/material/:matId/edit" element={<EditRoute />}>
              <Route index element={<SubtopicEdit />} />
            </Route>

            <Route path="/learning/:id/topic/:topicId/add" element={<PrivateRoute />}>
              <Route index element={<SubtopicAdd />} />
            </Route>

            {/* Authentication */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
