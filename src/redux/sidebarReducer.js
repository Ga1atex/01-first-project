const initialState = {
  friendsData: [
    { id: 1, firstName: 'Andrew' },
    { id: 2, firstName: 'Sasha' },
    { id: 3, firstName: 'Sveta' },
  ]
}

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default sidebarReducer;
