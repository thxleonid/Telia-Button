/**
 * @jest-environment jsdom
 */

import { cleanup, fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import App from '../src/App';

window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));

afterEach(cleanup);

it('checks that dropdown under disabled button does not appear', () => {

    const {container} = render(<App />);

    fireEvent.click(container.getElementsByClassName('btn--disabled')[0]);
    expect(container.getElementsByClassName('dropdown')[0]).toBeUndefined();
})

it('checks that dropdown under enabled button opens and then closes when clicking same button', () => {

    const {container} = render(<App />);
    
    fireEvent.click(container.getElementsByClassName('btn--enabled')[0]);
    expect(container.getElementsByClassName('dropdown')[0]).toBeInTheDocument();

    fireEvent.click(container.getElementsByClassName('btn--enabled')[0]);
    expect(container.getElementsByClassName('dropdown')[0]).toBeUndefined();
})

it('checks that dropdown closes when clicking outside the list/button', () => {

    const {container} = render(<App />);
    
    fireEvent.click(container.getElementsByClassName('btn--enabled')[0]);
    fireEvent.blur(container.getElementsByClassName('btn--enabled')[0]);
    
    expect(container.getElementsByClassName('dropdown')[0]).toBeUndefined();
})

it('checks that dropdown passes correct value', () => {

    const {container} = render(<App />);
    
    fireEvent.click(container.getElementsByClassName('btn--enabled')[0]);
    
    const option = container.getElementsByClassName('option--active')[0];
    const value = option.textContent;
    fireEvent.click(option);

    expect(container.getElementsByClassName('output')[0].innerHTML).toContain(value)
})