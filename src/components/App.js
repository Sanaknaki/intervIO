import React from 'react';

import { AUTH_TOKEN } from '../constants';
import ApplicationList from './ApplicationList';
import CreateApplication from './CreateApplication';
import Header from './Header';
import Login from './Login';
import Search from './Search';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';

import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function App() {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    // render={() => <Redirect to='/new/1' />
    console.log(authToken);
    return (
        <div>
            <Header />
                <Container>
                        <Switch>
                            {
                                (!authToken) ? 
                                    <React.Fragment>
                                        <Route render={() => <Redirect to='/login'/>}/>
                                        <Route exact path='/login' component={Login} />
                                    </React.Fragment>
                                :
                                    <Switch>
                                        <Route exact path='/' component={ApplicationList} />
                                        <Route render={() => <Redirect to='/' />} />
                                        {/* <Route exact path='/create' component={CreateApplication} /> */}
                                        {/* <Route exact path="/login" component={Login} /> */}
                                        {/* <Route exact path="/search" component={Search} /> */}
            
                                        {/* <Route exact path='/top' component={ApplicationList} /> */}
                                    </Switch>
                            }
                        </Switch>
                </Container>
        </div>
    );
}

export default App;
