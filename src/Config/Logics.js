



export const timeDifference = (timestam)=>{
    // 1 min ago
     // 1 hour ago
     // 1 week ago

     const date = new  Date(timestam);
     const difference = Date.now()-date.getTime();

     const seconds = Math.floor(difference/1000);
     const minutes = Math.floor(seconds/60);
     const hours  = Math.floor(minutes/60);
     const day = Math.floor(hours/24) ;
     const week = Math.floor(day/7);

     if(week>0){
      return week+" week"+(week===1?"":"s")+" ago";
     }else if(day>0){
      return day+" day"+(day===1?"":"s")+" ago";
     }
     else if(hours>0){
      return hours+" hour"+(hours===1?"":"s")+" ago";
     }else if(minutes>0){
      return minutes+" minute"+(minutes===1?"":"s")+" ago";
     }
     else if(seconds>0){
      return seconds+" second"+(seconds===1?"":"s")+" ago";
     }else{
      return "just now";
     }

}



