import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../Authontications/firebase.init';
import { toast } from 'react-toastify';
import axios from 'axios';

export const AuthContext = createContext(null)

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false);

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const emailLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const emailSignUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                console.log(res)

            }).catch((error) => {
                toast.error(error)
            })
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    const signOutUser = () => {
        return signOut(auth)
    }



    const authInfo = {
        loading,
        googleLogin,
        emailLogin,
        emailSignUp,
        setLoading,
        user,
        signOutUser,
        updateUserProfile
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            if (currentUser?.email) {
                setUser(currentUser)
                console.log(currentUser);
                await axios.post('http://localhost:5000/jwt',
                    { email: currentUser?.email },
                    { withCredentials: true }
                )
            } else {
                setUser(currentUser)
                await axios.get('http://localhost:5000/logout', {
                    withCredentials: true
                })
            }

        })
        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;