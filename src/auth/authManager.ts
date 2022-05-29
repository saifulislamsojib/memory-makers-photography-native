import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
  User,
} from "firebase/auth";
import firebaseConfig from "../configs/firebase.config";
import { IUser } from "../reducers/userReducer";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface IProfile {
  displayName: string;
  photoURL?: string;
}

const profileUpdate = async (name: string, photo?: string) => {
  let profile: IProfile = { displayName: name };

  if (photo) {
    profile = { displayName: name, photoURL: photo };
  }

  await updateProfile(auth.currentUser!, profile);
};

const setUser = (user: User, name?: string) => {
  const { displayName, email, emailVerified, photoURL } = user;
  if (name) {
    profileUpdate(name);
  }
  return {
    name: displayName || name,
    email,
    emailVerified,
    photo: photoURL,
  } as IUser;
};

export const getUser = (handleUser: (user: IUser | null) => void) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      handleUser(setUser(user));
    } else {
      handleUser(null);
    }
  });
  return unsubscribe;
};

export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  return setUser(res.user, name);
};

export const signInUser = async (email: string, password: string) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return setUser(res.user);
};

// export const googleLogin = async () => {
//   const provider = new GoogleAuthProvider();
//   const res = await signInWithPopup(auth, provider);
//   return setUser(res.user);
// };

// export const githubLogin = async () => {
//   const provider = new GithubAuthProvider();
//   const res = await signInWithPopup(auth, provider);
//   return setUser(res.user);
// };

export const logout = async () => {
  await signOut(auth);
};

export const passwordUpdate = async (newPassword: string) => {
  await updatePassword(auth.currentUser!, newPassword);
};
