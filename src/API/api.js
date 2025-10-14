const BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

/**
 * === Helper function ===
 * Handles fetch requests and common error handling.
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "API request failed");
    return data;
  } catch (error) {
    console.error("API error:", error);
    return { error: error.message };
  }
}

/**
 * === Books ===
 */

// Fetch all books
export async function fetchBooks() {
  return await apiRequest("/books");
}

// Fetch single book by ID
export async function fetchBookById(id) {
  return await apiRequest(`/books/${id}`);
}

/**
 * === Authentication ===
 */

// Register new user
export async function registerUser(firstname, lastname, email, password) {
  return await apiRequest("/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstname, lastname, email, password }),
  });
}

// Log in existing user
export async function loginUser(email, password) {
  return await apiRequest("/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

/**
 * === Account / Reservations ===
 */

// Get the logged-in user's profile (requires token)
export async function fetchUserProfile(token) {
  return await apiRequest("/users/me", {
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
