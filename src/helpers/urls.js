const API_ROOT = 'http://127.0.0.1:8000/api/v1';

export const API_URL = {
    //Auth
    signUp:() => `${API_ROOT}/sign-up`,
    signIn:() => `${API_ROOT}/login`,
    fileUploadAPI:() => `${API_ROOT}/upload-imgbb/`,
    //vendor
    loadVendorProfile:(id) => `${API_ROOT}/vendor/${id}/details`,
    loadVendorDetail:(id) => `${API_ROOT}/vendor/${id}/profile`, // For Edit details api/v1/vendor/ <uuid:user_id>/profile
    updateVendorProfile:(id) => `${API_ROOT}/vendor/${id}/profile`,
}


