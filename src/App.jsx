import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import SignInPage from './pages/SignInPage';
import QualifyingPage from './pages/QualifyingPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/"           element={<HomePage />}      />
            <Route path="/register"   element={<RegisterPage />}  />
            <Route path="/signin"     element={<SignInPage />}     />
            <Route path="/qualifying" element={<QualifyingPage />} />
            <Route path="/admin"      element={<AdminPage />}      />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
