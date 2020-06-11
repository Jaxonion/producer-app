import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './App';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import GenrePage from './GenrePage';
import LyricPage from './LyricPage';
import appContext from './appContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  
  ReactDOM.render(<BrowserRouter><MainPage /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  
  ReactDOM.render(<BrowserRouter><LoginPage /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  
  ReactDOM.render(<BrowserRouter><SignUpPage /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  
  ReactDOM.render(<BrowserRouter><LyricPage /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  
  ReactDOM.render(<BrowserRouter><GenrePage /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})
/*
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/
