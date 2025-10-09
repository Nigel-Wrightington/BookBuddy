const BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

//register function does not provide a token on registration.
//User must log in after registering to receive a token.

export async function register(firstName, lastName, email, password) {
  try {
    const response = await fetch(`${BASE_URL}/users.register`, {
      method: "POST",
      headers: {
        "Content-Type": "application.json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.message}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

//need to build login function to get token after registering

// export async function login(email, password) {}

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
