import React, { Component } from 'react';
import SearchScreen from './SearchScreen.js';
import { StackNavigator } from 'react-navigation';

const Nav = StackNavigator({
  Search:{ screen: SearchScreen}
});

