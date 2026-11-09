import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from '../services/api'
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user,setUser]=useState(null),[loading,setLoading]=useState(true)
  useEffect(()=>{let active=true;api.get('/auth/me').then(({data})=>{if(active)setUser(data.data.user)}).catch(()=>{if(active)setUser(null)}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[])
  const value=useMemo(()=>({user,loading,async login(credentials){const {data}=await api.post('/auth/login',credentials);setUser(data.data.user);return data.data.user},async register(payload){const {data}=await api.post('/auth/register',payload);setUser(data.data.user);return data.data.user},async logout(){try{await api.post('/auth/logout')}finally{setUser(null)}}}),[user,loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth=()=>useContext(AuthContext)
