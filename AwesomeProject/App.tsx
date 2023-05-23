import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/reducers/store';
import App from './components/App';

const TodoApp = () => {
  return (
    <Provider store={store}>
        <App />
    </Provider>
  )
}

export default TodoApp