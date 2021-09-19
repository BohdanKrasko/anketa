import {
  BrowserRouter as Router,
  Route 
} from 'react-router-dom';
import Native from '../native/App'
import Signin from '../Singin/SignIn'
function App() {
  return (
    <Router>
      <Route exact path="/" component={Native}></Route>
      <Route exact path="/signin" component={Signin}></Route>
    </Router>
  );
}

export default App;
