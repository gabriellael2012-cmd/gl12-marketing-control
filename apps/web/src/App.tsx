import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import { isFirebaseConfigured } from './lib/firebase'
import FirebaseNotConfigured from './pages/FirebaseNotConfigured'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  if (!isFirebaseConfigured) {
    return <FirebaseNotConfigured />
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
