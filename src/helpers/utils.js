// Retrieve user access token
export function getAccessToken(){
    return window.localStorage.getItem('access');
};

// is user authenticated
export function isUserAuthenticated(){
    return window.localStorage.getItem('access') ? true : false;
};

// is user info available
export function hasUser(){
    return window.localStorage.getItem('userInfo') ? true : false;
};

// Retrieve user refresh token
export function getRefreshToken() {
    return window.localStorage.getItem('refresh');
};

// Decode User Token
export function getUser() {
    const userInfo = window.localStorage.getItem('access');
    if (userInfo) {
        const [, payload,] = userInfo.split('.');
        const decoded = window.atob(payload);
        return JSON.parse(decoded);
        
    }
    return undefined;
};

// retrieve usr information
export function getUserDetails(){
    const user = hasUser();
    if(user){
        return JSON.parse(window.localStorage.getItem('userInfo'));
    }else{
        return {}
    }
}

export function logoutUser(){
    window.localStorage.removeItem("access");
    window.localStorage.removeItem("refresh");
    window.localStorage.removeItem("userDetails");
}

// Format date time.
export function formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
}