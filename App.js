import React, { Component } from 'react';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import { Router, Stack, Scene } from 'react-native-router-flux';

const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="search" component={Search} title="BUSCAR FILMES" />
      <Scene key="searchResults" component={SearchResults} title="FILMES ENCONTRADOS" />
    </Stack>
  </Router>
);

export default App;
