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
}

export const usersAPI = {
  getUsers(pageNumber = 1, pageSize = 10) {
    return instance.get(`users?page=${pageNumber}&count=${pageSize}`)
      .then(sendResponseData);
  },
  follow(id) {
    return instance.post(`follow/${id}`)
      .then(sendResponseData);
  },
  unfollow(id) {
    return instance.delete(`follow/${id}`)
      .then(sendResponseData);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`)
      .then(sendResponseData);
  },
  getProfileStatus(userId) {
    return instance.get(`profile/status/${userId}`)
      .then(sendResponseData);
  },
  updateProfileStatus(statusText) {
    return instance.put(`profile/status/`, {
      status: statusText
    })
      .then(sendResponseData);
  }
};

export const authAPI = {
  getAuthData() {
    return instance.get(`auth/me`)
      .then(sendResponseData);
  },
  login(email, password, rememberMe = false) {
    return instance.post(`auth/login`, {
      email,
      password,
      rememberMe
    })
      .then(sendResponseData);
  },
  logout() {
    return instance.delete(`auth/login`)
      .then(sendResponseData);
  }
};
