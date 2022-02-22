// import {createMemoryHistory} from 'history'
// import { render, screen } from '@testing-library/react';
// import {Router} from 'react-router-dom'

// test('renders country info', () => {
//     const navigate = createMemoryHistory();

// })
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from "history";
import { MemoryRouter, Router } from 'react-router-dom';
import CountryInfo from '../components/CountryInfo';

test('renders country info', () => {

    // <MemoryRouter initialEntries={['/country/name']}>
    //     <CountryInfo />
    // </MemoryRouter>
    const history = createMemoryHistory();
    history.push("/country/name");

    render(
        <Router location={history.location} navigator={history}>
            <CountryInfo />
        </Router>
    );
    let countryElement = screen.getByTestId("country")

    expect(countryElement).toBeInTheDocument()
});
