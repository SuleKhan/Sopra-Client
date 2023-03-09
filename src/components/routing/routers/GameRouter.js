import {Redirect, Route, useParams} from "react-router-dom";
import Game from "components/views/Game";
import Profile from "components/views/Profile";
import ProfileUpdate from "components/views/ProfileUpdate";
import {ProfileGuard} from "components/routing/routeProtectors/ProfileGuard";
import {LoggedInGuard} from "components/routing/routeProtectors/LoggedInGuard";
import PropTypes from 'prop-types';

const GameRouter = props => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Route exact path={`${props.base}/dashboard`}>
        <LoggedInGuard>
            <Game/>
        </LoggedInGuard>
      </Route>
      <Route exact path={`${props.base}`}>
        <Redirect to={`${props.base}/dashboard`}/>
      </Route>
      <Route exact path={`${props.base}/dashboard/profile/:id`} children ={<Child />}/>
      <Route exact path={`${props.base}/dashboard/profile/:id/information`} children ={<ProfileChild />}/>
    </div>
  );
};
/*
* Don't forget to export your component!
 */
 GameRouter.propTypes = {
   base: PropTypes.string
 }

// Takes id from the URL and redirects to the respective profile page
 function Child() {
 let {id} = useParams();
 return (
 <LoggedInGuard>
    <Profile id={id} />
 </LoggedInGuard>
 )
 }

// Takes id from the URL and redirects to update profile page after a user check
 function ProfileChild() {
  let {id} = useParams();
  return (
  <ProfileGuard id={id}>
    <ProfileUpdate id={id} />
  </ProfileGuard>
  );
  }



export default GameRouter;
