import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { Close, FiberManualRecord } from "@mui/icons-material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: 400, // width for small screens (xs)
    md: 600, // width for screens larger than small (sm and up)
  },
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

export default function SubscriptionModal({ open, handleClose }) {

    const [plan, setPlan] = useState("Annually");

    const features = [
      "Prioritized rankings in conversations and search",
      "See approximately twice Tweets between ads in your for you and following timelines",
      "Add bold and italic text in your tweets",
      "Post longer videos and 1080p video upload",
      "All time existing Blue features, including Edit Tweet, Bookmark Folders and early access to new features"
    ];

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center space-x-3">
            <IconButton onClick={handleClose} aria-label="delete">
              <Close />
            </IconButton>
          </div>

          <div className="flex justify-center">
          <div className=" md:w-[90%] flex justify-center py-4 h-[70vh] overflow-y-auto hideScrollbar">
            <div className="space-y-10">
                <div className="p-5 rounded-md flex items-center justify-between shadow-lg">
                   <h1>Blue Subscribers with a verified phone number will get a blue checkmark once approved </h1>
                   <img
                    className=" w-24 h-24"
                    src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                    alt="verified"
                    />
                </div>

                <div className="flex justify-between border-2 rounded-full px-5 py-3">
                     <div>
                        <span
                        onClick={()=>setPlan("Annually")}
                        className={`${plan==="Annually" ? "text-black font-bold" : "text-gray-400"} cursor-pointer`}>Annually</span>
                        <span className={`${plan==="monthly" ? "hidden": "text-green-500 ml-5"}`}>SAVE 12%</span>
                     </div>
                     <p 
                       onClick={()=>setPlan("monthly")}
                     className={`${plan==="monthly" ? "text-black font-bold" : "text-gray-400"} cursor-pointer`}>Monthly</p>
                </div>

                <div className="space-y-3">
                    { features.map((item,i)=>(<div key={i} className="space-x-5 flex items-center">
                        <FiberManualRecord sx={{width:"10px", height:"10px"}} />
                        <p className="text-sm">{item}</p>
                    </div>)) }
                </div>


                <div className="flex justify-center cursor-pointer bg-gray-800 text-white rounded-full py-3 px-5"> 
                  <spn className="line-through italic">{plan==="Annually"?"₹ 9400" : "₹ 780"}</spn>
                  <spn className="px-5">{plan==="Annually"?"₹ 7400 per year" : "₹ 650 per month"}</spn>

                </div>

            </div>
          </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
