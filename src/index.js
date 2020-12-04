import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

/* Apollo imports */
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

/* Extra imports */
import { BrowserRouter } from 'react-router-dom';
import { setContext } from 'apollo-link-context';
import { AUTH_TOKEN } from './constants';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

/* This will link the ApolloClient with the GraphQL API, GraphQL running on 4000 */
const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

/* Get auth token */
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000`,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem(AUTH_TOKEN)
        }
    }
});

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind == 'OperationDefinition' && operation == 'subscription';
    },
    wsLink,
    authLink.concat(httpLink)
)

/* Apollo client */
const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});



ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
