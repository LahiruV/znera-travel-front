import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Chat from './Pages/Main/Chat';
import Home from './Pages/Main/Home';
import Profile from './Pages/Main/Profile';
import FriendReq from './Pages/Main/FreindReq';
import AddFriends from './Pages/Main/AddFriends';

function App() {
  return (
    <Router>
      <Routes>        
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/cookHelper" element={<Chat />} />
        <Route path="/freindZone" element={<FriendReq />} />
        <Route path="/addfreinds" element={<AddFriends />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
