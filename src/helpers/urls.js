const API_ROOT = 'http://127.0.0.1:8000/api/v1';

export const API_URL = {
    //Auth
    signUp:() => `${API_ROOT}/sign-up`,
    signIn:() => `${API_ROOT}/login`,
    fileUploadAPI:() => `${API_ROOT}/upload-imgbb/`,
    //vendor
    getAllVendor:() => `${API_ROOT}/vendor/list`,
    loadVendorProfile:(id) => `${API_ROOT}/vendor/${id}/details`,
    loadVendorDetail:(id) => `${API_ROOT}/vendor/${id}/profile`, // For Edit details api/v1/vendor/ <uuid:user_id>/profile
    updateVendorProfile:(id) => `${API_ROOT}/vendor/${id}/profile`,
    //Food and Menu APIS
    getCategoryList:() =>`${API_ROOT}/menu/category/list`,
    getFoodItems:() =>`${API_ROOT}/menu/food/item/list?available=true`,
    addFoodItem:() => `${API_ROOT}/menu/food/item/create`,
    getItemDetails: (id) => `${API_ROOT}/menu/food/item/${id}`,
    updateFoodItem: (id) => `${API_ROOT}/menu/food/item/${id}`,
    // get food items for customers
    getShopMenu: (id) => `${API_ROOT}/menu/food/${id}/items`,
     
}


