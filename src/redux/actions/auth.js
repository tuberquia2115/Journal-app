import Swal from 'sweetalert2'
import { types } from "../../types/types";
import { firebase, fb } from '../../firebase'
import { finishLoading, startLoading } from "./ui";


export const startGoogleLogin = () => {
    return (dispatch) => {
        const authLoginProvider = new firebase.auth.GoogleAuthProvider();
        fb.auth.signInWithPopup(authLoginProvider).then((result) => {
            const { user } = result;
            dispatch(login(user.uid, user.displayName))
        }).catch(error => {
            console.log(error)
        })


    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        dispatch(startLoading())
        fb.auth.createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });
                dispatch(login(user.uid, user.displayName))
                dispatch(registerUserFirestore(user.email, user.displayName, user.uid))
                dispatch(finishLoading())

            })
            .catch(error => {
                console.log(error)
                Swal.fire('Error', error.message, 'error');
            });
    }
}

const registerUserFirestore = async (email, name, uid) => {
    const obj = {
        email,
        name,
        uid
    }
    await fb.db
        .collection("users")
        .add(obj)
        .then((resul) => {
            console.log(resul)
        })
        .catch(error => {
            console.log(error)
        });
}

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());

        fb.auth.signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
                dispatch(finishLoading())
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
                dispatch(finishLoading())
                Swal.fire('Error', error.message, 'error');
            });

    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid, displayName
    }
})

export const startLogout = () => {
    return async (dispatch) => {
        await fb.auth.signOut()
        dispatch(logout())
    }
}

export const logout = () => ({
    type: types.logout,
})

