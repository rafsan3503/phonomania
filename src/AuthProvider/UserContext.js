import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";
import app from "../firebase/firebase.config";

// Create Context
export const AuthContext = createContext();

// get auth from firebase
const auth = getAuth(app);

// google and twitter provider
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const UserContext = ({ children }) => {
  // user
  const [user, setUser] = useState("");
  // loader
  const [loading, setLoading] = useState(true);

  // user inspection
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe;
  }, []);

  // create user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google logIn
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // twitter login
  const twitterLogin = () => {
    return signInWithPopup(auth, twitterProvider);
  };
  // value wrapper
  const authInfo = { user, loading };
  return (
    <div>
      <AuthContext.Provider>{children}</AuthContext.Provider>
    </div>
  );
};

export default UserContext;
