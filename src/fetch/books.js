import BASE_URL from "@/lib/baseUrl";

export const createBook = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/books`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllBooks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/books`, {
      method: "GET",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateBook = async (id, params) => {
  try {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
      method: "PUT",
      body: JSON.stringify(params),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getBookById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
      method: "GET",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
