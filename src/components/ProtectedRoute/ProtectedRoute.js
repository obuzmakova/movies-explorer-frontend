import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, ...components }) => {
    return (
        <Route>
            {() =>
                loggedIn ? <Route {...components} /> : <Redirect to="./" />
            }
        </Route>
    );
};

export default ProtectedRoute;
