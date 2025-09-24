import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../features/Login'
import PointagePage from '../features/Pointage'
import ManagementPage from '../features/Management'
import { useAuthStore } from '../features/Login/store/authStore'

const AppRouter = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  const { profile } = useAuthStore()

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {isAuthenticated === 'true' && profile === 'COLLABORATOR' && <Route path="/shift" element={<PointagePage />} />}
      {isAuthenticated === 'true' && profile === 'ADMIN' && <Route path="/management" element={<ManagementPage />} />}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRouter
