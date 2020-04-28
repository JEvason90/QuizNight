import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import {Eyes} from './components/EyesOnThePrize';
import {Misfortunes} from './components/FamilyMisfortunes';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/eyes-on-the-prize' component={Eyes} />
        <Route path='/family-misfortunes' component={Misfortunes} />
      </Layout>
    );
  }
}
