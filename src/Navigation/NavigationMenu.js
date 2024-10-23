import { AccountCircle, Explore, ListAlt, Message, MoreHoriz, NotificationAdd, Verified } from '@mui/icons-material';
import CottageIcon from '@mui/icons-material/Cottage';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedIcon from '@mui/icons-material/Verified';

export const navigationmenu =[
    {
        title:"Home",
        icon:<CottageIcon/>,
        path:"/"
    },
    {
        title:"Explore",
        icon:<Explore/>,
        path:"/explore"
    },
    {
        title:"Notifications",
        icon:<NotificationAdd/>,
        path:"/notifications"
    },
    {
        title:"Messages",
        icon:<Message/>,
        path:"/messages"
    },
    {
        title:"List",
        icon:<ListAlt/>,
        path:"/list"
    },
    {
        title:"Communities",
        icon:<GroupsIcon/>,
        path:"/communities"
    },
    {
        title:"Verified",
        icon:<VerifiedIcon/>,
        path:"/verified"
    },
    {
        title:"Profile",
        icon:<AccountCircle/>,
        path:"/profile"
    },
    {
        title:"More",
        icon:<MoreHoriz/>,
        path:"/more"
    }
]

