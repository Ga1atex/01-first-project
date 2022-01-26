import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";

const store = {
  _state: {
    profilePage: {
      postsData: [
        { id: 1, message: 'Post1', likesCount: "431" },
        { id: 2, message: 'Hey', likesCount: "431" },
        { id: 3, message: 'Hi', likesCount: "431" },
        { id: 4, message: 'How is your day123', likesCount: "222" },
      ],
      textAreaText: ''
    },
    dialogsPage: {
      dialogsData: [
        { id: 1, name: 'Igor' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Ruslan' },
        { id: 4, name: 'Valeriy' },
      ],
      messagesData: [
        { id: 1, text: 'How is your day' },
        { id: 2, text: 'Hey' },
        { id: 3, text: 'Hi' },
        { id: 4, text: 'How is your day123' },
      ],
      textAreaText: ''
    },
    sidebar: {
      friendsData: [
        { id: 1, firstName: 'Andrew' },
        { id: 2, firstName: 'Sasha' },
        { id: 3, firstName: 'Sveta' },
      ]
    }
  },
  _callSubscriber() { },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  }
};

export default store;
