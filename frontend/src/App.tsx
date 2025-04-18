import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import { Container } from '@mui/material';
import WordleGame from './pages/WordleGame';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<WordleGame />} />
          <Route path="/home" element={<WordleGame />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
