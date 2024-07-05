import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Chat from './Pages/Main/Chat';
import Home from './Pages/Main/Home';
import Profile from './Pages/Main/Profile';
import Trip from './Pages/Main/Trip';
import Location from './Pages/Main/Location';
import Accommodation from './Pages/Main/Accomadation';
import Transport from './Pages/Main/Transport';
import FoodPackages from './Pages/Main/FoodPackages';
import MyTrips from './Pages/Main/MyTrips';
import Suggestions from './Pages/Main/Suggestions';
import FriendRequests from './Pages/Main/FriendRequests';
import FriendsList from './Pages/Main/FriendsList';

function App() {
  return (
    <Router>
      <Routes>        
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/cookHelper" element={<Chat />} />               
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trip" element={<Trip />} />
        <Route path="/mytrip" element={<MyTrips />} />
        <Route path="/locations" element={<Location />} />
        <Route path="/accomadations" element={<Accommodation />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/foodPackages" element={<FoodPackages />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/friendRequests" element={<FriendRequests />} />
        <Route path="/friendsList" element={<FriendsList />} />
      </Routes>
    </Router>
  );
}

export default App;
