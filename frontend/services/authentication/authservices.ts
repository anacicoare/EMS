import axiosInstance from "../axiosInstance";

export const AuthServices = {
    //Get project members
    callApiLogin: (data: any) => {
        return axiosInstance.post("/login/", data);
    },

    callApiRegister: (data: any) => {
        return axiosInstance.post("/register/", data)
    },

    setAxiosHeader: (token: string) => {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        console.log("axiosInstance.defaults.headers", axiosInstance.defaults.headers);
    }
};
