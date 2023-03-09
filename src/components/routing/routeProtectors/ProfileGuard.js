import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

/**
 *
 * Another way to export directly your functional component.
 *
 * This guard ensures that the user logged in is accessing there own profile
 */
export const ProfileGuard = props => {

  if (localStorage.getItem("id") === props.id) {
    return props.children;
  }
  return <Redirect to="/game"/>;
}

ProfileGuard.propTypes = {
  children: PropTypes.node
}