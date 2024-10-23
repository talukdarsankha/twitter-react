

 export const UploadToCloudinary = async (file, fileType) => {
  if (file) {
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "twitter-clone");
    uploadData.append("cloud_name", "doa7jctor");
    uploadData.append("resource_type", fileType); 

    const res = await fetch(`https://api.cloudinary.com/v1_1/doa7jctor/${fileType}/upload`, {
      method: "POST",
      body: uploadData
    });

    const data = await res.json();
    console.log("Cloudinary upload object is: ");
    console.log(data);
    return data.url?.toString();  // if any reason file can't upload then we will not found data
  }
};

 

 
