import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

/**
 *
 * Another way to export directly your functional component.
 *
 * This guard check that the user is logged in and redirects to game if not.
 */
export const LoginGuard = props => {
  if (!localStorage.getItem("token")) {
    return props.children;
  }
  // if user is already logged in, redirects to the /game
  return <Redirect to="/game"/>;
};

LoginGuard.propTypes = {
  children: PropTypes.node
}