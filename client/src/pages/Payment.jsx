import React, { useEffect ,useState} from 'react'
import Header from '../components/home/Header'
import ShoppingCart from '../components/course-on-click-details/ShoppingCart'
import { useParams } from 'react-router-dom'
import axios from 'axios'
function Payment() {
  const {id} = useParams();
  const [course, setCourses] = useState(null); // Start with null instead of {}
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);
    axios.get('http://localhost:4000/courses').then((res) => {
      const filter = res.data.find((course) => course._id === id);
      setCourses(filter || null);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  },[id])
  return (
    <div>
        <Header/>
        {loading ? <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div> :<ShoppingCart course={course} />}
        
    </div>
  )
}

export default Payment