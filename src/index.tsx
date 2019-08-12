import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'gt-course-surveys-dev.firebaseapp.com',
  databaseURL: 'https://gt-course-surveys-dev.firebaseio.com',
  projectId: 'gt-course-surveys-dev',
  storageBucket: 'gt-course-surveys-dev.appspot.com',
  appId: process.env.REACT_APP_ID,
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

function AuthApp() {
  const [user, setUser] = React.useState<firebase.User | null>(null)
  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      console.log({ user })
      setUser(user)
    })
  })

  // Configure FirebaseUI. https://github.com/firebase/firebaseui-web-react
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  }

  if (!user) {
    return (
      <div>
        <h1>Welcome to the new OMSCentral</h1>
        <p>In this new version, you need to sign in to view and add new reviews.</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    )
  } else {
    return <App user={user} />
  }
}

ReactDOM.render(<AuthApp />, document.getElementById('root'))
