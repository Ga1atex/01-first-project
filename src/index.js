import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Profile
const postsData = [
  { id: 1, message: 'Post1', likesCount: "431" },
  { id: 2, message: 'Hey', likesCount: "431" },
  { id: 3, message: 'Hi', likesCount: "431" },
  { id: 4, message: 'How is your day123', likesCount: "222" },
]
// Dialogs
const dialogsData = [
  { id: 1, name: 'Igor' },
  { id: 2, name: 'Andrey' },
  { id: 3, name: 'Ruslan' },
  { id: 4, name: 'Valeriy' },
];
const messagesData = [
  { id: 1, text: 'How is your day' },
  { id: 2, text: 'Hey' },
  { id: 3, text: 'Hi' },
  { id: 4, text: 'How is your day123' },
]

ReactDOM.render(

  <React.StrictMode>
    <App postsData={postsData} messagesData={messagesData} dialogsData={dialogsData}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
