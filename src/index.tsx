import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "gt-course-surveys-dev.firebaseapp.com",
  databaseURL: "https://gt-course-surveys-dev.firebaseio.com",
  projectId: "gt-course-surveys-dev",
  storageBucket: "gt-course-surveys-dev.appspot.com",
  appId: process.env.REACT_APP_ID
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

ReactDOM.render(<App />, document.getElementById("root"))
