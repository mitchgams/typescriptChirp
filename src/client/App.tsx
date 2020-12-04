import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Edit from './components/view/Edit/';
import Add from  './components/view/Add';

const App: React.FC<IAppProps> = props => {

	return (
		<BrowserRouter>
			<Header />
			<main className="container">
				<Switch>
					<Route exact path="/:id/admin" component={Edit} />
					<Route exact path="/chirp/add" component={Add} />
					<Route path="/" component={Home} />
				</Switch>
			</main>
		</BrowserRouter>
	);
}


export interface IAppProps {}

export default App;