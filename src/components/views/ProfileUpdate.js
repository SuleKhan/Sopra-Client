import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = props => {
  return (
    <div className="login field">
      <label className="login label">
        {props.label}
      </label>
      <input
        className="login input"
        placeholder="enter here.."
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const FormFieldBirthday = props => {
  return (
    <div className="login field">
      <label className="login label">
        {props.label}
      </label>
      <input
        className="login input"
        placeholder="yyyy-MM-dd"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormFieldBirthday.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const ProfileUpdate = props => {
  const history = useHistory();
  const [birthday, setBirthday] = useState(null);
  const [username, setUsername] = useState(null);

  const doProfileUpdate = async () => {
    try {
      const requestBody = JSON.stringify({username, birthday});
      const response = await api.put(`/users/${props.id}`, requestBody);

      // Get the returned user and update a new object.
      //const user = new User(response.data);

      // Store the token into the local storage.
      //console.log(user.token);
      //localStorage.setItem('token', user.token);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      //localStorage.removeItem("token");
      history.push(`/game/dashboard/profile/${props.id}`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="game container">
        <div className="game">
          <FormField
            label="Change Username"
            value={username}
            onChange={un => setUsername(un)}
          />
          <FormFieldBirthday
            label="Change Birthday"
            value={birthday}
            onChange={p => setBirthday(p)}
          />
          <div>
            <Button
                width="100%"
                onClick={() => history.push(`/game/dashboard/profile/${props.id}`)}
            >
                Back to Profile Page
            </Button>
            <Button
              disabled={!username && !birthday}
              width="100%"
              onClick={() => doProfileUpdate()}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default ProfileUpdate;
