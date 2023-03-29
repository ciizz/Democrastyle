import { useState, createContext, useContext, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import auth from "../config/FirebaseAuth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
  }
  
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    async function register(email, password, displayName) {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, { displayName: displayName });
        return auth.currentUser;
    }

    async function login(email, password) {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    async function logout() {
        return await signOut(auth);
    }

    async function updateDisplayName(displayName) {
        await updateProfile(auth.currentUser, { displayName: displayName });
        return auth.currentUser.displayName;
    }

    async function updateProfilePicture(photoURL) {
        await updateProfile(auth.currentUser, { photoURL: photoURL });
        return auth.currentUser.photoURL;
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        register,
        logout,
        updateDisplayName,
        updateProfilePicture
    };

    return (
        <AuthContext.Provider value={value}>
        {!loading && children}
        </AuthContext.Provider>
    );
}