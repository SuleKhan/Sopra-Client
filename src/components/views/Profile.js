import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";

// Shows all information on the user
const Player = ({user}) => {

    const history = useHistory();

    return (
  <div>
    <div>
        Id: {user.id}
    </div>
    <div>
         Username: {user.username}
    </div>
    <div>
         Status: {user.status}
    </div>
    <div>
         Birthday: {user.birthday ? user.birthday : "yyyy-MM-dd"}
    </div>
    <div>
         Creation Date: {user.creationDate}
    </div>
    <Button
    disabled={!(localStorage.getItem("token") === user.token)}
    onClick={() => history.push(`${user.id}/information`)} >
        Update Personal Information
        </Button>
  </div>
);
};

Player.propTypes = {
  user: PropTypes.object
};

const Profile = (id) => {


  // use react-router-dom's hook to access the history
  const history = useHistory();

  const [user, setUser] = useState(null);

  const logout = () => {
    history.push('/game');
  }


  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {

        const response = await api.get(`/users/${id.id}`);

        // Get the returned users and update the state.
        setUser(response.data);

        // This is just some data for you to see what is available.
        // Feel free to remove it.
        console.log('request to:', response.request.responseURL);
        console.log('status code:', response.status);
        console.log('status text:', response.statusText);
        console.log('requested data:', response.data);

        // See here to get more data.
        console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while fetching the users! See the console for details.");
      }
    }

    fetchData();
  }, );

  let content = <Spinner/>;

  if (user) {
    content = (
      <div className="game">
        <ul className="game user-list">

            <Player user={user} key={user.id}/>

        </ul>
        <Button
          width="100%"
          onClick={() => logout()}
        >
          Back to Game
        </Button>
      </div>
    );
  }

  return (
    <BaseContainer className="game container" margin-left="100px">
      <h2>Profile Page</h2>
      <p className="game paragraph">
        Click user to view their profile page:
      </p>
      {content}
    </BaseContainer>
  );
}

export default Profile;
