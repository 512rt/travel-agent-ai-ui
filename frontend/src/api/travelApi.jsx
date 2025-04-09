const API_BASE_URL = 'https://travelagent1.azurewebsites.net/api';

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const searchCity = async (city, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/TravelAi/plan/${city}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      throw new Error('Token expired');
    }

    if (!response.ok) {
      throw new Error('Search failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}; 