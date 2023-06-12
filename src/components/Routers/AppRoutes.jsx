import { Route, Routes } from 'react-router-dom';
import Login from '../../Pages/Login/Login';
import Chat from '../../Pages/Chat';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default AppRoutes;
