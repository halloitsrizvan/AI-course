import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {EmailIcon,UserIcon,LockIcon} from '../Icons'
import axios from 'axios'
import { API_PORT } from '../Constants';
function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [signupErr, setSignupErr] = useState('');
    const [load, setLoad] = useState(false);
   
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
      e.preventDefault()
      setLoad(true)
      setSignupErr('')
      
      try{
        const res = await axios.post(`${API_PORT}/users/signup`,{name, email: email.trim().toLowerCase(), password, role})
        const {token,user} = res.data
        if (token && user) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        } else {
          setSignupErr('No token or user received from server')
        }
        
      }catch(err){
        console.log(err);
        const message = err?.response?.data?.error || 'Signup failed. Please try again.'
        setSignupErr(message)
      }finally{
        setLoad(false)
      }

    }
    // const handleSubmit=async(e)=>{
    //    e.preventDefault()

    //    try{
    //     const response =await fetch('https://jwt-auth-backend-iwd6.onrender.com/users/signup',{
    //       method:"POST",
    //       headers:{
    //         "Content-Type":"application/json"
    //       },
    //       body:JSON.stringify({name,password,email,role})
    //     })
    //     const result = response.json()
    //     console.log(result)
    //    }catch(err){
    //     console.log(err);
        
    //    }finally{
    //     setEmail('')
    //     setName('')
    //     setPassword('')
    //    }
    // }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-sans">
    

    <div className="relative mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800"> Registration</h1>
        <p className="mt-2 text-gray-500">Darul Irfan Studnents Portal</p>
      </div>

    

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {signupErr && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-center text-sm font-medium text-red-700">
            {signupErr}
          </div>
        )}

        <div className="relative">
          <UserIcon />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="relative">
          <EmailIcon />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="relative">
          <LockIcon />
          <input
            type="password"
            
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {load ? 'Signing up...' : 'Sign Up'}
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  </div>
  )
}

export default Signup