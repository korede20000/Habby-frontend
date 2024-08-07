import { useState } from "react"


function useAlert() {
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', type: '' });

    const showAndHide = (type, message) => {
        setAlertInfo({ show: true, message, type });
        setTimeout(() => {
            setAlertInfo({ show: false, message: '', type: '' });
        }, 3000); 
    };
    

  return {alertInfo, showAndHide}
}

export default useAlert