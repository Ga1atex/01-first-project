const initialState = {
  friendsData: [
    { id: 1, firstName: 'Andrew' },
    { id: 2, firstName: 'Sasha' },
    { id: 3, firstName: 'Sveta' },
  ]
}

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SEND_MESSAGE:
    //   sendMessage(action.text);
    //   return state;
    // case UPDATE_TEXT_VALUE:
    //   updateTextValue(action.text, action.page);
    //   return state;
    default:
      return state;
  }

}

export default sidebarReducer;
