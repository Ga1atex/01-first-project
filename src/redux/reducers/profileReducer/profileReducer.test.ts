import profileReducer from "./profileReducer";
// import { profileActionCreators } from "./profileActions";

const state = {
  postsData: [
    {
      id: 1,
      message: "Post1",
      likesCount: 431,
      isLiked: false,
      userName: "UserName123",
      userId: 2,
    },
    {
      id: 2,
      message: "Hey",
      likesCount: 431,
      isLiked: false,
      userName: "UserName123",
      userId: 2,
    },
    {
      id: 3,
      message: "Hi",
      likesCount: 431,
      isLiked: false,
      userName: "UserName123",
      userId: 2,
    },
    {
      id: 4,
      message: "How is your day123",
      likesCount: 222,
      isLiked: false,
      userName: "UserName123",
      userId: 2,
    },
  ],
  profile: null,
  profileUpdateStatus: "none",
  status: "",
  isFetching: false,
};

// test("length of posts should be incremented", () => {
//   // 1. test data
//   let action = profileActionCreators.addPost({
//     text: "123",
//     avatar: "",
//     userName: "Username",
//     userId: 2,
//   });

//   // 2. action
//   let newState = profileReducer(state, action);

//   // 3.expectation
//   expect(newState.postsData.length).toBe(5);
// });

// test("message of the new post should be correct", () => {
//   // 1. test data
//   let action = profileActionCreators.addPost({
//     text: "123",
//     avatar: "",
//     userName: "Username",
//     userId: 2,
//   });

//   // 2. action
//   let newState = profileReducer(state, action);

//   // 3.expectation
//   expect(newState.postsData[4].message).toBe("123");
// });

// test("after deleting length of the post should be decremented", () => {
//   // 1. test data
//   let action = profileActionCreators.deletePost(3);

//   // 2. action
//   let newState = profileReducer(state, action);

//   // 3.expectation
//   expect(newState.postsData.length).toBe(3);
// });

// test("after deleting length of the post shouldn' be decremented if id is incorrect", () => {
//   // 1. test data
//   let action = profileActionCreators.deletePost(1000);

//   // 2. action
//   let newState = profileReducer(state, action);

//   // 3.expectation
//   expect(newState.postsData.length).toBe(4);
// });
