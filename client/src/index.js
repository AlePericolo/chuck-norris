import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import { render } from 'react-dom';

import App from '@/templates/App';

import '@/scss/index.scss'

render(<App />, document.getElementById('root'));