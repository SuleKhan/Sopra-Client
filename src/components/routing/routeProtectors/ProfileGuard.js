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

  return props.children;
  console.log(props.id);
  const [user, setUser] = useState(null);
  let userToken = null;


  async function fetchData() {
    try {
      console.log(props);
      const response = await api.get('/users/'+props.id);
      console.log(response.data);

      userToken = response.data.token;
      //console.log(userToken);

      setUser(response.data);
      console.log(user);
      console.log('request to:', response.request.responseURL);
      console.log('status code:', response.status);
      console.log('status text:', response.statusText);
      console.log('requested data:', response.data);
      return response.data;

    } catch (error) {
      console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
      console.error("Details:", error);
      alert("Something went wrong while fetching the users! See the console for details.");
    }
  }

  setUser(fetchData());

  console.log(localStorage.getItem("token"));
  console.log(user);
  console.log("a");

  if (localStorage.getItem("token") == user.token) {
    return props.children;
  }
  // if user is already logged in, redirects to the main /app
  return <Redirect to="/game"/>;
}

ProfileGuard.propTypes = {
  children: PropTypes.node
}