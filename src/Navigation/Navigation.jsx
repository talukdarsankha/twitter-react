
import React from 'react'
import { navigationmenu } from './NavigationMenu'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Auth/Action';

function Navigation() {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  
    const {auth} = useSelector(store=>store);
    const dispatch = useDispatch();

    const handleLogout=()=>{
      console.log("User Logout...");
      handleClose();
      dispatch(logout());
    }

  

  return (

   // hideScrollbar css present in index.css

    <div className='h-screen sticky top-0 overflow-y-scroll hideScrollbar mr-2'>  
       <div>
          <div className='py-5 cursor-pointer' onClick={()=>navigate("/")}>
             <svg height={40} width={40} viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
          </div>

          <div className='space-y-6'>
             {navigationmenu.map((item,i)=>(
                <div key={i}
                 className='flex cursor-pointer space-x-3 it
                 ems-center'
                 onClick={()=>{item.title==="Profile" ? navigate(`/Profile/${auth.user?.id}`) : navigate(item.path)}}
                 >
                    {item.icon}
                    <p className='text-xl'>{item.title}</p>
                </div>
             ))}
          </div>

          <div className='py-10'>
             <Button sx={{width:"100%",borderRadius:"29px", py:"12px",bgcolor:"rgb(5 79 200 / 94%)",color:"white"}}>
               Tweet
             </Button>
          </div>

         <div className='flex justify-between items-center pb-5'>
            <div className='flex space-x-3 items-center'>
               <Avatar
               alt='username'
               src={auth.user?.image}/>

               <div>
                  <p>{auth.user?.fullname}</p>
                  <span className='opacity-70 text-sm'>@@{auth.user?.fullname.split(" ")[0]}</span>
               </div>
            </div>

               <div>
                  <MoreVert className='cursor-pointer'
                  id="demo-positioned-button"
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  />

                  <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                     vertical: 'top',
                     horizontal: 'left',
                  }}
                  transformOrigin={{
                     vertical: 'top',
                     horizontal: 'left',
                  }}
                  >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
               </div>
          </div>


       </div>
    </div>
  )
}

export default Navigation
