import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Home from './Pages/Main/Home';
import Profile from './Pages/Main/Profile';
import Trip from './Pages/Main/Trip';
import Location from './Pages/Main/Location';
import Accommodation from './Pages/Main/Accomadation';
import MyTrips from './Pages/Main/MyTrips';
import Suggestions from './Pages/Main/Suggestions';
import FriendRequests from './Pages/Main/FriendRequests';
import FriendsList from './Pages/Main/FriendsList';
import ChatBox from './Pages/Main/ChatBox';
import AiChat from './Pages/Main/AiChat';

function App() {
  return (
    <Router>
      <Routes>        
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />                    
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trip" element={<Trip />} />
        <Route path="/mytrip" element={<MyTrips />} />
        <Route path="/locations" element={<Location />} />
        <Route path="/accomadations" element={<Accommodation />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/friendRequests" element={<FriendRequests />} />
        <Route path="/friendsList" element={<FriendsList />} />
        <Route path="/chatBox" element={<ChatBox />} />
        <Route path="/aiChat" element={<AiChat />} />
      </Routes>
    </Router>
  );
}

export default App;
