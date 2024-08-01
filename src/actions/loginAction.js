import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { setLogin, setLogOut } from '../redux/slices/loginSlice.jsx'
//import { setGoogleLogin } from "../redux/slices/loginGoogleSlice.jsx"
import { setError } from "../redux/slices/errorSlice.jsx";
import { auth } from "../firebase/config-firebase.js";

export const loginGoogle = () => (dispatch) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        //const data = JSON.parse(JSON.stringify({credential, token, user}))
        //dispatch( setGoogleLogin(data))
        dispatch(setLogin({uid: user.uid, name: user.displayName, token}))
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        const errorObject = {errorCode, errorMessage, detalle: { email, credential}}
        
        dispatch(setError(errorObject))
    });
}

export const login = (email, password) => async (dispatch) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(data => 
        dispatch(setLogin({uid: data.user.uid, name: data.user.displayName, token: data.user.accessToken}))
    ).catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.code === 'auth/too-many-requests' ? 'Haz excedido la cantidad de intentos. Reintenta más tarde' : error.message;
        // The email of the user's account used.
        const email = error.customData.email ?? 'Sin información de email'
        const errorObject = {errorCode, errorMessage, detalle: email}
        dispatch(setError(errorObject))
    }) 
}

export const logOut = () => async (dispatch) => {
    signOut(auth).then(res => 
        dispatch(setLogOut())
    ).catch(error => {
         // Handle Errors here.
         const errorCode = error.code;
         const errorMessage = error.code;
         // The email of the user's account used.
         const email = error.customData.email ?? 'Sin información de email'
         const errorObject = {errorCode, errorMessage, detalle: email}
         dispatch(setError(errorObject))
    })
    dispatch(setLogOut())
}

export const register = (email, password, userName) => (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((createdUser) =>
            updateProfile(createdUser.user,{displayName: userName})
    ).then(() => 
        signInWithEmailAndPassword(auth, email, password)
    ).then(data => 
        dispatch(setLogin({uid: data.user.uid, name: data.user.displayName, token: data.user.accessToken}))
    ).catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email ?? 'Sin información de email';
        const errorObject = {errorCode, errorMessage, detalle: email}
        dispatch(setError(errorObject))
    })  
}
