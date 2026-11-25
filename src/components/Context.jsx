import React, { use, useEffect, useState } from 'react'
import { createContext } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export const Context = createContext();

const ContextProvider = ({children}) => {
  const userId = useSelector((state)=>state?.userInfo?.id)
const [user, setUser]=useState(null);
const [prices, setPrices] = useState([]);


const api_url = "https://www.elexdonpay.com/api_connect"

// const api_url = "http://elexdonpay.com/api_connect"


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





  const fetchPrices = async () => {
    // setLoading(true);
    try {
      const response = await fetch(`${api_url}/get_prices.php`);
      const data = await response.json();
      if (response.ok && data.success) {
        setPrices(data.prices);
      } else {
        Swal.fire({ icon: 'error', title: 'Fetch Error', text: data.error || 'Could not retrieve price table.', confirmButtonColor: '#2563eb' });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Connection Error', text: 'Unable to communicate with the server.', confirmButtonColor: '#dc2626' });
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);



 const retrieval_fullPriceItem = prices.find(p => p.id === "29");
  const retrieval_certPriceItem = prices.find(p => p.id === "30");
   const retrieval_statusPriceItem = prices.find(p => p.id === "31");
    const retrieval_memartPriceItem = prices.find(p => p.id === "32");

    const change_secPriceItem = prices.find(p => p.id === "33");
  const change_dirPriceItem = prices.find(p => p.id === "34");
   const edit_dir_sharePriceItem = prices.find(p => p.id === "35");
    const change_addressPriceItem = prices.find(p => p.id === "36");
        const shareholderPriceItem = prices.find(p => p.id === "37");


        //CAC MODIFICATION SERVICES
  const services = [
    {
      id: 'retrieval_full',
      title: 'Retrieval - Certificate, Status Report & MEMART',
      price: retrieval_fullPriceItem?.price
    },
    {
      id: 'retrieval_cert',
      title: 'Retrieval - Certificate Only',
      price: retrieval_certPriceItem?.price
    },
    {
      id: 'retrieval_status',
      title: 'Retrieval - Status Report Only',
      price: retrieval_statusPriceItem?.price
    },
    {
      id: 'retrieval_memart',
      title: 'Retrieval - MEMART Only',
      price: retrieval_memartPriceItem?.price   
    },
    {
      id: 'change_sec',
      title: 'Addition / Change of Company Secretary',
      price: change_secPriceItem?.price
    },
    {
      id: 'change_dir',
      title: 'Addition / Change of Company Director',
      price: change_dirPriceItem?.price
    },
    {
      id: 'edit_dir_share',
      title: "Edit / Change of Director's or Shareholder's Details",
      price: edit_dir_sharePriceItem?.price
    },
    {
      id: 'change_address',
      title: 'Change of Company Address',
      price: change_addressPriceItem?.price
    },
    {
      id: 'shareholder',
      title: 'Addition or Removal of Shareholder',
      price: shareholderPriceItem?.price
    }
  ];

// //CAC MODIFICATION SERVICES
//   const services = [
//     {
//       id: 'retrieval_full',
//       title: 'Retrieval - Certificate, Status Report & MEMART',
//       price: 37000
//     },
//     {
//       id: 'retrieval_cert',
//       title: 'Retrieval - Certificate Only',
//       price: 18000
//     },
//     {
//       id: 'retrieval_status',
//       title: 'Retrieval - Status Report Only',
//       price: 11000
//     },
//     {
//       id: 'retrieval_memart',
//       title: 'Retrieval - MEMART Only',
//       price: 18000
//     },
//     {
//       id: 'change_sec',
//       title: 'Addition / Change of Company Secretary',
//       price: 19000
//     },
//     {
//       id: 'change_dir',
//       title: 'Addition / Change of Company Director',
//       price: 19000
//     },
//     {
//       id: 'edit_dir_share',
//       title: "Edit / Change of Director's or Shareholder's Details",
//       price: 19000
//     },
//     {
//       id: 'change_address',
//       title: 'Change of Company Address',
//       price: 19000
//     },
//     {
//       id: 'shareholder',
//       title: 'Addition or Removal of Shareholder',
//       price: 19000
//     }
//   ];









  return (
    <Context.Provider value={{api_url, user, fetchUserProfileById, services, prices, fetchPrices}}>

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
