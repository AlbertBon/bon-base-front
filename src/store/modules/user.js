import { getToken, setToken, removeToken ,getUser,setUser,removeUser} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    userInfo: getUser()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      setToken(token);
    },
    REMOVE_TOKEN:(state) => {
      removeToken();
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
      setUser(userInfo);
    },
    REMOVE_USER_INFO:(state) => {
      removeUser();
    },
  },

  actions: {

  }
}

export default user
