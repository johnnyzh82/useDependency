import axios from 'axios';

// Resolver function to retrieve user from API
export const getDataFromApi = async () => {
  try {
    const response = await axios.get(
      'https://json.versant.digital/.netlify/functions/fake-api/user'
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
