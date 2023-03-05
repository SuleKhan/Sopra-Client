import {Redirect, Route, useParams} from "react-router-dom";
import Game from "components/views/Game";
import Profile from "components/views/Profile";
import ProfileUpdate from "components/views/ProfileUpdate";
import {ProfileGuard} from "components/routing/routeProtectors/ProfileGuard";
import PropTypes from 'prop-types';

const GameRouter = props => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Route exact path={`${props.base}/dashboard`}>
        <Game/>
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

 function Child() {
 let {id} = useParams();
 return <Profile id={id} />
 }

 function ProfileChild() {
  let {id} = useParams();
  console.log("HEY");
  return (
  <ProfileGuard id={id}>
    <ProfileUpdate id={id} />
  </ProfileGuard>
  );
  }



export default GameRouter;
