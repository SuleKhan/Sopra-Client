import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

/**
 *
 * Another way to export directly your functional component.
 *
 * This guard checks that the user is logged in, otherwise redirected to login page.
 */
export const LoggedInGuard = props => {
  if (localStorage.getItem("token")) {
    return props.children;
  }
  // if user is not logged in, redirects to the /login
  return <Redirect to="/login"/>;
};

LoggedInGuard.propTypes = {
  children: PropTypes.node
}