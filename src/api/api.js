import axios from "axios";


const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "e017ae69-e966-4945-ad4f-10686b5f9804"
  }
});

const sendResponseData = response => {
  if (response.status === 200) {
    return response.data;
  }
};

export const usersAPI = {
  async getUsers(pageNumber = 1, pageSize = 10) {
    const response = await instance.get(`users?page=${pageNumber}&count=${pageSize}`);
    return sendResponseData(response);
  },
  async follow(id) {
    const response = await instance.post(`follow/${id}`);
    return sendResponseData(response);
  },
  async unfollow(id) {
    const response = await instance.delete(`follow/${id}`);
    return sendResponseData(response);
  },
};

export const profileAPI = {
  async getProfile(userId) {
    const response = await instance.get(`profile/${userId}`);
    return sendResponseData(response);
  },
  async getProfileStatus(userId) {
    const response = await instance.get(`profile/status/${userId}`);
    return sendResponseData(response);
  },
  async updateProfileStatus(statusText) {
    const response = await instance.put(`profile/status/`, {
      status: statusText
    });
    return sendResponseData(response);
  },
  async savePhoto(photoFile) {
    const formData = new FormData();
    formData.append('image', photoFile)
    const response = await instance.put(`profile/photo/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return sendResponseData(response);
  },
  async saveProfile(profile) {
    const response = await instance.put(`profile/`, profile);
    return sendResponseData(response);
  }
};

export const authAPI = {
  async getAuthData() {
    const response = await instance.get(`auth/me`);
    return sendResponseData(response);
  },
  async login(email, password, rememberMe = false, captcha = null) {
    const response = await instance.post(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha
    });
    return sendResponseData(response);
  },
  async logout() {
    const response = await instance.delete(`auth/login`);
    return sendResponseData(response);
  }
};

export const securityAPI = {
  async getCaptcha() {
    const response = await instance.get(`security/get-captcha-url`);
    return sendResponseData(response);
  },
};
