import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';

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