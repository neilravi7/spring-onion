import { getAccessToken, logoutUser } from "./utils";

// Create request options based on requirement 
export function requestOptionCreator(
  requestMethod,
  requestBody = {},
  needAuth = false
) {
  const requestHeader = new Headers();
  requestHeader.append("Content-Type", "application/json");

  //! add token if needs authentication

  if (needAuth) {
    const token = getAccessToken();
    requestHeader.append("Authorization", `Bearer ${token}`);
  }

  const requestOptions = {
    method: requestMethod, // GET, POST, PUT, DELETE
    headers: requestHeader,
    redirect: "follow",
  };

  if (requestMethod !== "GET" && requestMethod !== "DELETE") {
    requestOptions["body"] = JSON.stringify(requestBody);
  }

  return requestOptions;
}

export async function requestMaker(endpoint, requestOptions) {
  try {
    const response = await fetch(endpoint, requestOptions);

    // Handle 401 Unauthorized
    if (response.status === 401) {
      console.log("User Session Expired");
      logoutUser();
      return { isError: true, message: "Session expired. Please log in again." };
    }

    // Parse the response JSON data
    const data = await response.json();

    // Handle other status codes
    if (response.status === 400) {
      return { isError: true, data };
    } else if (response.status === 200 || response.status === 201) {
      return { isError: false, data };
    }

    // Default case for unexpected status codes
    return { isError: true, message: "Unexpected response from server." };

  } catch (error) {
    // Catch network errors or JSON parsing errors
    console.error("Request failed:", error);
    return { isError: true, message: "Network error or invalid JSON response." };
  }
}