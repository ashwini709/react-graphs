import ReactDOM from 'react-dom';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';

import App from './components/app.jsx';

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={App} />
    </Route>
  </Router>
);

const container = document.getElementById('container');

ReactDOM.render(routes, container);
