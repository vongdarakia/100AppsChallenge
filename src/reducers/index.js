import { combineReducers } from 'redux';
import projects from './projects';
import header from './header';

const portfolioApp = combineReducers({ projects, header });

export default portfolioApp;
