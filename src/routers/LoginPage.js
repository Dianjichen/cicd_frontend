import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('LoginPage Register', () => {
    beforeEach(() => {
        localStorage.clear();
        delete window.location;
        window.location = {href: ''};
    });

    test('registers a user and sends correct request', async () => {
        axios.request.mockResolvedValueOnce({data: {message: 'Registered'}});

        render(<LoginPage/>);

        // Switch to register mode
        const signUpButton = screen.getByRole('button', {name: /sign up/i});
        fireEvent.click(signUpButton);

        // Fill the form
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInputs = screen.getAllByLabelText(/password/i);
        const passwordInput = passwordInputs[0];
        const confirmPasswordInput = passwordInputs[1];

        await userEvent.type(usernameInput, 'newuser');
        await userEvent.type(passwordInput, 'password123');
        await userEvent.type(confirmPasswordInput, 'password123');

        const registerButton = screen.getByRole('button', {name: /register/i});
        fireEvent.click(registerButton);

        // Assert axios call
        await waitFor(() => {
            expect(axios.request).toHaveBeenCalledWith(
                expect.objectContaining({
                    method: 'post',
                    url: expect.stringContaining('/user/register/'),
                    data: {
                        username: 'newuser',
                        password: 'password123'
                    }
                })
            );
        });
    });

    test('logins a user and sends correct request', async () => {
        axios.request.mockResolvedValueOnce({data: {token: 'token123'}});

        render(<LoginPage/>);

        // Fill the form
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);

        await userEvent.type(usernameInput, 'existinguser');
        await userEvent.type(passwordInput, 'password123');

        const loginButton = screen.getByRole('button', {name: /login/i});
        fireEvent.click(loginButton);

        // Assert axios call
        await waitFor(() => {
            expect(axios.request).toHaveBeenCalledWith(
                expect.objectContaining({
                    method: 'post',
                    url: expect.stringContaining('/user/login/'),
                    data: {
                        username: 'existinguser',
                        password: 'password123'
                    }
                })
            );

        });

        // Assert token is stored in localStorage
        expect(localStorage.getItem('token')).toBe('token123');
    });
});