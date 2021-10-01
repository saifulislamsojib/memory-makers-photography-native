import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../configs/firebase.config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth;

export const updateProfile = (displayName?: string, photoURL?: string) => {
  const user = auth().currentUser;
  let profile = { displayName } as firebase.User;
  if (photoURL) {
    profile = { displayName, photoURL } as firebase.User;
  }

  return user
    ?.updateProfile(profile)
    .then(() => true)
    .catch(() => false);
};

export const setUser = (user: firebase.User | null, name?: string) => {
  const { email, displayName, photoURL, emailVerified } = user || {};
  const newUser = {
    email,
    name: displayName || name,
    photo: photoURL,
    emailVerified,
  };
  return newUser;
};

export const createUser = (email: string, password: string, name: string) => {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      updateProfile(name);
      return setUser(res.user, name);
    });
};

export const signingUser = (email: string, password: string) => {
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => setUser(res.user))
    .catch((err) => err.message);
};

export const googleSignIn = () => {
  const provider = new auth.GoogleAuthProvider();

  return auth()
    .signInWithPopup(provider)
    .then((res) => setUser(res.user))
    .catch((err) => err.message);
};

export const fbSignIn = () => {
  const provider = new auth.FacebookAuthProvider();

  return auth()
    .signInWithPopup(provider)
    .then((res) => setUser(res.user))
    .catch((err) => err.message);
};

export const userSignOut = () => {
  return auth()
    .signOut()
    .then(() => true);
};
