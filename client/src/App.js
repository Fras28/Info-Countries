import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from "./components/Home.jsx";
import LandingPage from './components/Landing';
import Detail from "./components/Detail";
import addActivity from './components/AddActivity';

function App() {
  return (
    <div className="App">
      <div>
        <Switch>
          <Route exact path="/Home/addactivity" component={addActivity} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/Home/" component={Home} />
          <Route exact path="/Home/:id" component={Detail} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
