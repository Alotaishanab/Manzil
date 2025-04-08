// src/mutations/useProfilePicture.ts
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import api from '../../api/api'; // <-- Use your custom Axios instance
import { apiUrls } from '../../utils/urls';

// ------------------------------------------------
// Define response interfaces based on your backend
// ------------------------------------------------
export interface UpdateProfilePictureResponse {
  profile_picture_url?: string;  // or 'profile_picture' if that’s what your backend returns
  // Add other fields as per your actual response
}

export interface RemoveProfilePictureResponse {
  message?: string;
  // Add other fields as per your actual response
}

// ------------------------------------------------
// Define input types for the mutations
// ------------------------------------------------
export type UpdateProfilePictureForm = {
  uri: string;
};

export type RemoveProfilePictureForm = {}; // No input needed for removal

// ------------------------------------------------
// Mutation function to upload/update profile picture
// ------------------------------------------------
const updateProfilePicture = async (
  formData: UpdateProfilePictureForm
): Promise<UpdateProfilePictureResponse> => {
  const { uri } = formData;

  const data = new FormData();
  const fileName = uri.split('/').pop() || 'profile.jpg';
  const fileType = `image/${fileName.split('.').pop()}`;

  data.append('profile_picture', {
    uri,
    name: fileName,
    type: fileType,
  });

  // Because api.ts request interceptor attaches your token,
  // you only need to set Content-Type for multipart form data:
  const response = await api.put<UpdateProfilePictureResponse>(
    apiUrls.updateProfilePicture, 
    data,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  // Note: your response interceptor returns response.data,
  // so `response` is already the JSON body. Just return it:
  return response;
};

// ------------------------------------------------
// Mutation function to remove profile picture
// ------------------------------------------------
const removeProfilePicture = async (
  _: RemoveProfilePictureForm
): Promise<RemoveProfilePictureResponse> => {
  const response = await api.delete<RemoveProfilePictureResponse>(
    apiUrls.updateProfilePicture
    // token header is auto-handled by interceptors
  );
  return response;
};

// ------------------------------------------------
// Hooks to expose these mutations
// ------------------------------------------------
export const useUpdateProfilePicture = () => {
  return useMutation<UpdateProfilePictureResponse, Error, UpdateProfilePictureForm>({
    mutationFn: updateProfilePicture,
    onSuccess: () => {
      Alert.alert('Success', 'Profile picture updated.');
    },
    onError: (error: Error) => {
      console.error('Update Profile Picture Error:', error);
      Alert.alert('Error', 'Failed to upload profile picture.');
    },
  });
};

export const useRemoveProfilePicture = () => {
  return useMutation<RemoveProfilePictureResponse, Error, RemoveProfilePictureForm>({
    mutationFn: removeProfilePicture,
    onSuccess: () => {
      Alert.alert('Success', 'Profile picture removed.');
    },
    onError: (error: Error) => {
      console.error('Remove Profile Picture Error:', error);
      Alert.alert('Error', 'Failed to remove profile picture.');
    },
  });
};
