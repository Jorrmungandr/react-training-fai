import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { checkToken } from '../global/func';

function PrivateRoute({
  component: Comp,
  path,
  exact,
  location,
}) {
  const [logged, setLogged] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Checks token and returns a bool
        const res = await checkToken();
        setLogged(res);
      } catch (err) {
        setLogged(false);
      }
    })();
  }, []);

  if (logged !== null) {
    if (logged) {
      return (
        <Route path={path} exact={exact}>
          <Comp />
        </Route>
      );
    }
    return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
  }
  return null;
}

PrivateRoute.propTypes = {
  component: PropTypes.instanceOf(React.Component),
  path: PropTypes.string,
  exact: PropTypes.bool,
  location: PropTypes.objectOf(),
};

PrivateRoute.defaultProps = {
  component: React.Component,
  path: '/',
  exact: false,
  location: {},
};

export default PrivateRoute;
