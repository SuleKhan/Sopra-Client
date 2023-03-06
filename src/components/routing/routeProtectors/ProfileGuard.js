import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

/**
 *
 * Another way to export directly your functional component.
 */
export const ProfileGuard = props => {

  if (localStorage.getItem("id") == props.id) {
    return props.children;
  }
  return <Redirect to="/game"/>;
}

ProfileGuard.propTypes = {
  children: PropTypes.node
}