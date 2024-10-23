import { Brightness1, Brightness3, LightMode, MoreHoriz } from '@mui/icons-material'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { Button } from '@mui/material'
import React, { useState } from 'react'
import SubscriptionModal from '../Subscription/SubscriptionModal';

function HomeRight() {
    const [darkLight,setDarkLight] = useState(false);

    
  const [openSubscriptionModal, setOpenSubscriptionModal] = React.useState(false);
  const handleSubscriptionModalOpen = () => setOpenSubscriptionModal(true);
  const handleSubscriptionModalClose = () => setOpenSubscriptionModal(false);


  return (

    // hideScrollbar css present in index.css
    <div className='py-5 pl-3 sticky top-0 h-screen overflow-y-scroll hideScrollbar '>
       <div className='relative flex items-center'>
          <input type='text' className='py-3 rounded-full outline text-gray-500 w-full pl-12 pr-3'/>

          <div className='absolute top-0 left-0 pt-3 pl-3'>
            <SearchOutlined/>
          </div>

          <div onClick={()=>setDarkLight(!darkLight)}>
          {darkLight ? <Brightness3 className='cursor-pointer ml-5' /> :
           <LightMode className='cursor-pointer ml-5' /> 
          }
          </div>
       </div>

       <section className='my-5'>
          <h1 className='font-bold text-xl'>
            Get Verified
          </h1>
          <h1 className='font-bold my-2'>
             Subscribe to unlock new features.
          </h1>
          <Button
           onClick={handleSubscriptionModalOpen}
          variant='contained' sx={{ padding:"10px", paddingX:"20px", borderRadius:"25px"}}>
            Get Verified
          </Button>
       </section>

       <section className='mt-7 space-y-5'>
          <h1 className='font-bold text-xl py-1'>
            What's Happening
          </h1>

          <div>
            <p className='text-sm space-x-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing. Lorem ipsum dolor sit.
            </p>
            <p className='font-bold'>
                Lorem ipsum dolor sit amet
            </p>
          </div>

         { [1,1,1,1].map((item,i)=>(
            <div key={i} className='flex justify-between w-full'>
             <div>
                <p>
                    Lorem ipsum dolor 
                </p>
                <p className='font-bold'>
                    #theMarvels
                </p>
                <p>
                30.2k tweets
                </p>
             </div>

             <MoreHoriz className='cursor-pointer'/>
          </div>
          ))}
       </section>

       <section>
         <SubscriptionModal open={openSubscriptionModal} handleClose={handleSubscriptionModalClose} />
       </section>

    </div>
  )
}

export default HomeRight
