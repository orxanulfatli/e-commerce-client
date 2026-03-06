import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const [isAuthCheckSlow, setIsAuthCheckSlow] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsAuthCheckSlow(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsAuthCheckSlow(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) {
    return (
      <Route
        {...rest}
        render={() => (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            {!isAuthCheckSlow ? (
              <p>Checking your session...</p>
            ) : (
              <>
                <p>Server is taking longer than expected.</p>
                <button onClick={() => window.location.reload()}>Retry</button>
              </>
            )}
          </div>
        )}
      />
    );
  }

  return (
    <Fragment>
      <Route
        {...rest}
        render={(props) => {
          if (!isAuthenticated ) {
            return <Redirect to="/login" />;
          }

          if (isAdmin === true && user.role !== "admin") {
            return <Redirect to="/login" />;
          }

          return <Component {...props} />;
        }}
      />
    </Fragment>
  );
};

export default ProtectedRoute;
