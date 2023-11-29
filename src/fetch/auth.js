import BASE_URL from "@/lib/baseUrl";

export const register = async (params) => {
  try {
    // rename the "username" property to "name"
    const requestBody = {
      ...params,
      name: params.username,
    };
    delete requestBody.username;

    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (params) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(params),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
