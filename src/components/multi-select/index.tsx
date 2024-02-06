import React from 'react';
import MultiSelectComponent from './MultiSelect.component';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {MultiSelectProvider} from "./contex";
import {GET_CHARACTERS} from "./queries";
import './style.scss'

// Initialize Apollo Client
const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql', // Replace with your GraphQL endpoint
    cache: new InMemoryCache()
});

function MultiSelect() {
    return (
        <ApolloProvider client={client}>
            <MultiSelectProvider query={GET_CHARACTERS}>
                <MultiSelectComponent/>
            </MultiSelectProvider>
        </ApolloProvider>
    );
}

export default MultiSelect;