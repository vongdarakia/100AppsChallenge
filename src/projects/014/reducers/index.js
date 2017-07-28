import { combineReducers } from 'redux';
import projects from './projects';

const portfolioApp = combineReducers({ projects });

export default portfolioApp;
