import React from 'react';
import ReactDOM from 'react-dom';
import CalendarForm from './CalendarForm';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CalendarForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });