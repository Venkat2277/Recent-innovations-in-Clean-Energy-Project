export const apiBaseUrl = "https://king-prawn-app-d33p4.ondigitalocean.app/";

export const getToken = () => {
    return localStorage.getItem("auth-token") ? true : false;
}

export const getAuthToken = () => {
    return localStorage.getItem("auth-token");
}

export const getUserName = () => {
    return localStorage.getItem("username")
}