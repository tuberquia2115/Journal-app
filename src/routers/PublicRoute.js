import React from 'react'
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({
    isLoggedIn,
    component: Component,
    ...props
}
) => {
    return (
        <Route {...props}
            component={(props) => (
                !isLoggedIn ?
                    (<Component {...props} />) :
                    (<Redirect to="/" />)
            )} />
    )
}
