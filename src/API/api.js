// === Base API URL for all requests ===
const BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

/**
 * === Universal API Request Helper ===
 * Safely handles fetch requests and JSON parsing.
 * Prevents crashes when responses have no body (e.g., DELETE).
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    // Safely parse JSON only if response has content
    let data = {};
    try {
      const text = await response.text();
      data = text && text.trim() !== "" ? JSON.parse(text) : {};
    } catch {
      data = {};
    }

    // Throw an error if response is not OK (4xx or 5xx)
    if (!response.ok) {
      throw new Error(data.message || `API error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    return { error: error.message };
  }
}

/* ===============================
   AUTHENTICATION ENDPOINTS
   =============================== */

// Register a new user
export async function registerUser(firstname, lastname, email, password) {
  return apiRequest("/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstname, lastname, email, password }),
  });
}

// Log in an existing user (returns token)
export async function loginUser(email, password) {
  return apiRequest("/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

// Verify token and get user info
export async function authenticate(token) {
  return apiRequest("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/* ===============================
   BOOK ENDPOINTS
   =============================== */

// Fetch all books in the catalog
export async function fetchBooks() {
  return apiRequest("/books");
}

// Fetch details for a specific book
export async function fetchBookById(id) {
  return apiRequest(`/books/${id}`);
}

/* ===============================
   RESERVATION ENDPOINTS
   =============================== */

// Reserve a book (requires login)
export async function reserveBook(bookId, token) {
  return apiRequest("/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookId }),
  });
}

// Return a reserved book (requires login)
export async function returnBook(reservationId, token) {
  return apiRequest(`/reservations/${reservationId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

/* ===============================
   USER PROFILE ENDPOINT
   =============================== */

// Fetch the logged-in user's info and reservations
export async function fetchUserProfile(token) {
  return apiRequest("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
