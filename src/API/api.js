const BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  return response.json();
}

// REGISTER (no token returned)
export async function register(firstname, lastname, email, password) {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(
        errorResult.message || `Registration failed: ${response.status}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

// LOGIN (returns token)
export async function login(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(
        errorResult.message || `Login failed: ${response.status}`
      );
    }

    const result = await response.json();
    return result; // should include { token }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

// AUTHENTICATE (verify token)
export async function authenticate(token) {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
}

// Get logged-in user's profile (requires token)
export async function fetchUserProfile(token) {
  return await apiRequest("/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
// Reserve a book (requires token)
export async function reserveBook(bookId, token) {
  return await apiRequest("/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookId }),
  });
}
// Return a reserved book (requires token)
export async function returnBook(reservationId, token) {
  return await apiRequest(`/reservations/${reservationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
