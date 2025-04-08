// src/utils/mediaUtils.ts

export const isVideo = (url: string): boolean => {
    const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.mkv'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };
  
  export const isImage = (url: string): boolean => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };
  