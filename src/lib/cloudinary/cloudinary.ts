export const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "employee_upload"); // your preset
    formData.append("folder", "employees"); // optional
  
    const res = await fetch("https://api.cloudinary.com/v1_1/dbjueuler/image/upload", {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) throw new Error("Image upload failed");
  
    const data = await res.json();
    return data.secure_url;
  };
  