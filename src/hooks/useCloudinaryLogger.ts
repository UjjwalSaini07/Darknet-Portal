export const useCloudinaryLogger = () => {
  const logImageUpload = (url: string | null) => {
    if (import.meta.env.MODE !== "production" && url) {
      console.log(
        "%c[Cloudinary Upload]",
        "color: #00FF41; font-weight: bold; font-family: monospace;",
        "\n✅ Image uploaded successfully:",
        url
      );

      if (Notification.permission === "granted") {
        new Notification("Cloudinary Upload", {
          body: "Image uploaded successfully.",
          icon: url,
        });
      }
    }
  };

  return { logImageUpload };
};
