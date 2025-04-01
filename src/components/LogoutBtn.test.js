import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LogoutBtn from './LogoutBtn'; // Adjust the path if needed
import axios from 'axios';

jest.mock('axios');

describe('LogoutBtn Component', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'mocked-token');
    delete window.location;
    window.location = { href: '' }; // mock location
  });

  test('logs out user and clears token + redirects', async () => {
    axios.request.mockResolvedValueOnce({ data: { message: 'Logged out' } });

    render(<LogoutBtn />);

    const button = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'post',
          url: expect.stringContaining('/user/logout'),
          headers: {
            Authorization: `Token mocked-token`,
          },
        })
      );
    });

    expect(localStorage.getItem('token')).toBe(null);
    expect(window.location.href).toBe('/');
  });


});

