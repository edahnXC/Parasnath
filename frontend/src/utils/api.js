// Utility functions for API calls
export const fetchTemples = async () => {
    const response = await fetch('/api/temples');
    if (!response.ok) {
      throw new Error('Failed to fetch temples');
    }
    return await response.json();
  };
  
  export const fetchTrekkingRoutes = async () => {
    const response = await fetch('/api/trekking-routes');
    if (!response.ok) {
      throw new Error('Failed to fetch trekking routes');
    }
    return await response.json();
  };
  
  export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
  
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
  
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    return await response.json();
  };