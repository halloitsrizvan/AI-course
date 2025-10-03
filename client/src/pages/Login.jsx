import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { EmailIcon } from '../Icons';
import axios from 'axios'
import { API_PORT } from '../Constants';
  const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
  
function Login() {
    const [loginErr,setLoginerr] = useState(null)
    const [load,setLoad]= useState(false)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    
    const handleLogin = async (e) => {
      e.preventDefault()
      setLoad(true)
      setLoginerr(null)
      try {
        const res = await axios.post(`${API_PORT}/users/login`, {
          email: email.trim().toLowerCase(),
          password
        })
        const { token, user } = res.data || {}
        if (token && user) {
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          navigate('/')
        } else {
          setLoginerr('No token or user received from server')
        }
      } catch (err) {
        const message = err?.response?.data?.error || 'Invalid email or password'
        setLoginerr(message)
      } finally {
        setLoad(false)
      }
    }

    
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-sans">
       

      <div className="relative mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="mt-2 text-gray-500">Login to access your account</p>
        </div>

        <form  className="mt-8 space-y-5" onSubmit={handleLogin}>
          {loginErr && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-center text-sm font-medium text-red-700">
              {loginErr}
            </div>
          )}

          <div className="relative">
            <EmailIcon />
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <LockIcon />
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          

          <div>
            <button
              type="submit"
              disabled={load}
              className="w-full rounded-lg bg-blue-600 py-3 text-center font-semibold text-white transition-transform duration-200 hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {load ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login