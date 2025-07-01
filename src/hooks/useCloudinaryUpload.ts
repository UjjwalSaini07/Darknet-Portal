export const useCloudinaryUpload = () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const folder = import.meta.env.VITE_CLOUDINARY_UPLOAD_FOLDER || "";

  const uploadImage = async (base64Image: string): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", base64Image);
      formData.append("upload_preset", uploadPreset);
      if (folder) formData.append("folder", folder);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        return data.secure_url;
      }

      console.error("Cloudinary upload failed:", data);
      return null;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  return { uploadImage };
};
