import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Login from './Login';
import Register from './Register';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Forgot from './Forgot';
import Table from './Table';
import Add from './Add'
import Edit from './Edit';
import Menu from './Menu';
import User from './User'
import Profile from './Profile';
function App() {
  return (
    <div className="App">
      <Router>
        {/* <Menu/> */}
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact  path='/Register' component={Register}/>
          <Route exact  path='/Forgot' component={Forgot}/>
          <Route exact  path='/Table' component={Table}/>
          <Route exact  path='/add' component={Add}/>
          <Route exact  path='/e/:id' component={Edit}/>
          <Route exact  path='/User' component={User}/>
          <Route exact  path='/Profile' component={Profile}/>


        </Switch>
      </Router>
    </div>
  );
}

export default App;
