import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen';
import { fb } from '../firebase';
import { login } from '../redux/actions/auth';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute'



export const AppRouter = () => {
    const [cheking, setCheking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    console.log("HOLA MUNGO DE GIT");
    useEffect(() => {
        fb.auth.onAuthStateChanged((user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false);
            }
            setCheking(false);
        });

    }, [dispatch, setCheking, setIsLoggedIn])

    if (cheking) {
        return (
            <h2>Espere...</h2>
        )
    }
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        isLoggedIn={isLoggedIn}
                        component={AuthRouter}
                    />
                    <PrivateRoute
                        path="/"
                        exact
                        isLoggedIn={isLoggedIn}
                        component={JournalScreen}
                    />

                    <Redirect to="auth/login" />
                </Switch>
            </div>
        </Router>


    )
}
