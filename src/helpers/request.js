import { getAccessToken, logoutUser } from "./utils";
import { logoutUser as userAuthLogout } from "../redux/actions/auth";

// Create request options based on requirement 
export function requestOptionCreator(
  requestMethod,
  requestBody = {},
  needAuth = false,
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

export async function requestMaker(endpoint, requestOptions, dispatch=null) {
  try {
    const response = await fetch(endpoint, requestOptions);

    // Handle 401 Unauthorized
    if (response.status === 401) {
      // if(dispatch){
      //   dispatch(userAuthLogout());  
      // }
      console.log("User Session Expired");
      // logoutUser();
      return { isError: true, message: "Session expired. Please log in again." };
    }

    // Parse the response JSON data
    const data = await response.json();

    // Handle other status codes
    if (response.status === 400) {
      return { isError: true, message:"Oops some error occurred.", data};
    }else if (response.status === 500) {
      console.log("Error 500");
      return { isError: true, message:"Server response with 500.", data };
    } 
    else if (response.status === 200 || response.status === 201) {
      return { isError: false, message:"Success.", data };
    }

    // Default case for unexpected status codes
    return { isError: true, message: "Unexpected response from server." };

  } catch (error) {
    // Catch network errors or JSON parsing errors
    console.error("Request failed:", error);
    return { isError: true, message: "Network error or invalid JSON response." };
  }
}