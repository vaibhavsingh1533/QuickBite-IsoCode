import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LoadingState } from './UI'
export default function ProtectedRoute({ role, children }) {
  const {user,loading}=useAuth(), location=useLocation()
  if(loading)return <main className="content-page"><LoadingState/></main>
  if(!user)return <Navigate to="/login" replace state={{from:location}}/>
  if(role&&user.role!==role)return <Navigate to={user.role==='kitchen_staff'?'/kitchen':'/'} replace/>
  return children
}
