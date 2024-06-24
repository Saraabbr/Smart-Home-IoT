import React from 'react';
import DashboardPage from './pages/DashboardPage';
import { Container } from 'react-bootstrap';
import './styles/App.css'


const App = () => {
    return (
        <Container className="App">
            <DashboardPage />
        </Container>
    );
};

export default App;
