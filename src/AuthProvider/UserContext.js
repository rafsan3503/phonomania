import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
  updateProfile,
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
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google logIn
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // twitter login
  const twitterLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, twitterProvider);
  };

  // updateUser
  const updateUser = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  // log out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  // value wrapper
  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    googleLogin,
    twitterLogin,
    updateUser,
    logOut,
  };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default UserContext;
