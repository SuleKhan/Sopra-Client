import {Redirect, Route, useParams} from "react-router-dom";
import Game from "components/views/Game";
import Profile from "components/views/Profile";
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
      <Route exact path={`${props.base}/dashboard/profile/:username`} children ={<Child />}/>
    </div>
  );
};
/*
* Don't forget to export your component!
 */
 function Child() {
 let {username} = useParams();
 return <Profile key={username} />
 }

GameRouter.propTypes = {
  base: PropTypes.string
}

export default GameRouter;
