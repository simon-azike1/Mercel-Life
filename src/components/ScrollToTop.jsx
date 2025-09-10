import {useState,useEffect} from 'react'
import {ArrowUp} from 'lucide-react'
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  //Show button after scrolling down
  useEffect(()=>{
    const toggleVisibility=() => {
        if(window.scrollY > 300){
            setIsVisible(true)
        }else{
            setIsVisible(false)
        }
    };

    window.addEventListener("scroll",toggleVisibility);
    return()=> window.removeEventListener("scroll",toggleVisibility);
  },[]);

  //Scroll to top smoothly
  const ScrollToTop = ()=>{
    window.scrollTo(
        {
            top:0,
            behavior: "smooth",
        }
    );
  }
    return (
    <>
    {
        isVisible &&(
            <button onClick={ScrollToTop}
            className='fixed bottom-8 right-8 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 hover:scale-110 transition-all duration-300 z-50 hover:cursor-pointer'>

            <ArrowUp className='h-6 w-6'/>
            </button>
        )
    }
    
    </>
  )
}

export default ScrollToTop;
