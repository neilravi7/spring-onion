// Retrieve user access token
export function getAccessToken() {
  return window.localStorage.getItem("access");
}

// is user authenticated
export function isUserAuthenticated() {
  return window.localStorage.getItem("access") ? true : false;
}

// is user info available
export function hasUser() {
  return window.localStorage.getItem("userInfo") ? true : false;
}

// Retrieve user refresh token
export function getRefreshToken() {
  return window.localStorage.getItem("refresh");
}

// Decode User Token
export function getUser() {
  const userInfo = window.localStorage.getItem("access");
  if (userInfo) {
    const [, payload] = userInfo.split(".");
    const decoded = window.atob(payload);
    return JSON.parse(decoded);
  }
  return undefined;
}

// retrieve usr information
export function getUserDetails() {
  const user = hasUser();
  if (user) {
    return JSON.parse(window.localStorage.getItem("userInfo"));
  } else {
    return {};
  }
}

export function isObjectEmpty(objName) {
  return Object.keys(objName).length === 0 && objName.constructor === Object;
}

// retrieve user role's
export function isUserVendor() {
  const userObj = getUserDetails();
  if (!isObjectEmpty(userObj)) {
    return userObj.role.isVendor;
  } else {
    return false;
  }
}

export function isUserCustomer() {
  const userObj = getUserDetails();
  if (!isObjectEmpty(userObj)) {
    return userObj.role.isCustomer;
  } else {
    return false;
  }
}

export function getUserID() {
  const userObj = getUserDetails();
  if (!isObjectEmpty(userObj)) {
    return userObj.id;
  } else {
    return null;
  }
}

// logout user
export function logoutUser() {
  window.localStorage.removeItem("access");
  window.localStorage.removeItem("refresh");
  window.localStorage.removeItem("userInfo");
}

// Format date time.
export function formatDate(string) {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
}

// Truncate string
export function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}

// Slugify String

export const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove multiple hyphens
};

// Example Usage
//console.log(slugify("Hello World! This is a test.")); // Output: "hello-world-this-is-a-test"

// SHop open an close timing
export const isOpenNow = (openTime, closeTime) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
  
    // Convert time string (e.g., "10:00 AM") to 24-hour format
    const convertTo24Hour = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
  
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
  
      return { hours, minutes };
    };
  
    const open = convertTo24Hour(openTime);
    const close = convertTo24Hour(closeTime);
  
    const isOpen =
      (currentHour > open.hours || (currentHour === open.hours && currentMinutes >= open.minutes)) &&
      (currentHour < close.hours || (currentHour === close.hours && currentMinutes < close.minutes));
  
    return isOpen;
  };
  
  // Example Usage
  //const openTime = "10:00 AM";
  //const closeTime = "11:00 PM";
  //console.log(isOpenNow(openTime, closeTime) ? "Open Now" : "Closed Now"); // ✅ Will return "Open Now" or "Closed Now"
  

export const capitalizeText = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};