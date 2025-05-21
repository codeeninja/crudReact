/**
 * Main App Component
 * 
 * This is the root component of our React application.
 * It sets up routing and the main layout structure.
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import MemberList from './components/MemberList';
import AddMember from './components/AddMember';
import EditMember from './components/EditMember';
import MemberDetails from './components/MemberDetails';
import Home from './components/Home';

function App() {
  return (
    <Router>
      {/* Navbar is rendered on all pages */}
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />
          
          {/* Member routes - CRUD operations */}
          <Route path="/members" element={<MemberList />} />
          <Route path="/members/add" element={<AddMember />} />
          <Route path="/members/edit/:id" element={<EditMember />} />
          <Route path="/members/:id" element={<MemberDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
