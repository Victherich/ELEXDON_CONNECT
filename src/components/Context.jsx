import React, { use, useEffect, useState } from 'react'
import { createContext } from 'react'
import { useSelector } from 'react-redux';

export const Context = createContext();

const ContextProvider = ({children}) => {
  const userId = useSelector((state)=>state?.userInfo?.id)
const [user, setUser]=useState(null);

const api_url = "https://elexdontech.com/api_connect"

 console.log(user)


const fetchUserProfileById = async () => {
  if (!userId) {
    console.error("Pipeline halt: No valid userId passed to sync routing engine.");
    return null;
  }

  try {
    // Append the ID safely as a URL query parameter string
    const response = await fetch(`${api_url}/get_user_info.php?id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (response.ok&&data.success) {
      // Returns the clean data payload: { id, name, email, phone, balance }
     
     
setUser(data.userInfo)
      
    } else {
      console.warn("Server side profile pull rejection:", data.error || "Unknown Error");
      return null;
    }
  } catch (error) {
    console.error("Network structural error while contacting database stream:", error);
    return null;
  }
};

useEffect(()=>{
  fetchUserProfileById();
},[userId])

// useEffect(()=>{
//   fetchUserProfileById();
// },[])




  return (
    <Context.Provider value={{api_url, user, fetchUserProfileById}}>

        {children}
    </Context.Provider>
      

  )
}

export default ContextProvider



//User “elexdont_user_connect” was added to the database “elexdont_connect”.

//kffT&0JuN2]hl]&H



//my vt pass api keys
//public: PK_dd9d16198f0dbc7cee0bf44a8a0df779
// dd9d16198f0dbc7cee0bf44a8a0df779
//seceret:  SK_307b4bc069d5c7728f6b4652c3127e2ab88e652c48f

// dd9d16198f0dbc7cee0bf44a8a0df779
// PK_9998315837c2b01d69318f3d44cb71680a13be0e056
// SK_780980b685479828e6a82656f76b981933d92ede718
