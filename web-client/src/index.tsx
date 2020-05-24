import React from 'react';
import { render } from 'react-dom';
import Home from './scenes/Home';
// import './generated/tailwind.output.css';
import 'semantic-ui-css/semantic.min.css';

const target = document.getElementById('root');
render(<Home />, target);
