import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import NoteList from './NoteList';
import axios from 'axios';

jest.mock('axios');

describe('NoteList Component', () => {
  const mockNotes = [
    {
      id: 1,
      title: 'Note 1',
      content: 'This is the first note.',
    },
    {
      id: 2,
      title: 'Note 2',
      content: 'This is the second note.',
    }
  ];

  beforeEach(() => {
    localStorage.setItem('token', 'test-token');

    axios.request.mockResolvedValueOnce({
      data: mockNotes
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders fetched notes from API', async () => {
    render(<NoteList />);

    // Wait for the notes to be displayed
    await waitFor(() => {
      expect(screen.getByText('Note 1')).toBeInTheDocument();
      expect(screen.getByText('Note 2')).toBeInTheDocument();
    });

    // Optional: Check content
    expect(screen.getByText('This is the first note.')).toBeInTheDocument();
    expect(screen.getByText('This is the second note.')).toBeInTheDocument();
  });

  it('displays Add Note button', () => {
    render(<NoteList />);
    expect(screen.getByText('Add Note')).toBeInTheDocument();
  });
});
