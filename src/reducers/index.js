import { combineReducers } from 'redux';
import portfolio from './portfolio';
import projectsV1 from './projectsV1';
import header from './header';

const portfolioApp = combineReducers({ portfolio, projectsV1, header });

export default portfolioApp;
