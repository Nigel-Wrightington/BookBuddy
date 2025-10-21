// === Base API URL ===
const BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

/**
 * Generic API helper function
 * Handles fetch requests, safely parses JSON, and manages errors.
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    // Safely parse JSON (even for empty responses)
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      throw new Error(data.message || `API Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    return { error: error.message };
  }
}

/*  AUTHENTICATION ENDPOINTS */

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

// Verify user token and return profile
export async function authenticate(token) {
  return apiRequest("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/*    BOOK ENDPOINTS    */

// Get all books in the library
export async function fetchBooks() {
  return apiRequest("/books");
}

// Get details of a specific book
export async function fetchBookById(id) {
  if (!id) {
    console.error("fetchBookById called without ID!");
    return { error: "Invalid book ID" };
  }
  return apiRequest(`/books/${id}`);
}

/*    RESERVATION ENDPOINTS    */

// Reserve a book (requires login)
export async function reserveBook(bookId, token) {
  if (!bookId) {
    console.error("reserveBook called without valid bookId!");
    return { error: "Invalid book ID" };
  }

  try {
    const response = await fetch(`${BASE_URL}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // ✅ The backend expects `bookId`
      body: JSON.stringify({ bookId: Number(bookId) }),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      throw new Error(
        data.message || `Reservation failed (${response.status})`
      );
    }

    return data;
  } catch (error) {
    console.error("Error reserving book:", error);
    return { error: error.message };
  }
}

// Return a reserved book (requires login)
export async function returnBook(reservationId, token) {
  if (!reservationId) {
    console.error("returnBook called without valid reservationId!");
    return { error: "Invalid reservation ID" };
  }

  try {
    const response = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      throw new Error(data.message || `Return failed (${response.status})`);
    }

    return data;
  } catch (error) {
    console.error("Error returning book:", error);
    return { error: error.message };
  }
}

/*    USER PROFILE    */

// Fetch current user’s profile and reservations
export async function fetchUserProfile(token) {
  return apiRequest("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
