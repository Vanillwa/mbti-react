import { useEffect } from 'react';


// 커스텀 훅: 외부 클릭을 감지
function TouchDetected(ref, callback) {
  useEffect(() => {
    
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
     
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, callback]); 
}

export default TouchDetected;