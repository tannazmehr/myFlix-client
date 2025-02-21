import React from 'react';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/MainView/MainView';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.scss';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const MyFlixApplication = () => {
    return(
        <Provider store={store}>
            <Container>
                <MainView />  
            </Container>
        </Provider>
    );
};

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<MyFlixApplication />);