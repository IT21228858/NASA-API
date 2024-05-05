// MarsRoverPhoto.test.js
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import MarsRoverPhoto from './MarsRoverPhoto';

describe('MarsRoverPhoto component', () => {
  // Mock fetch API response
  beforeAll(() => {
    global.fetch = jest.fn();
    global.fetch.mockResolvedValue({
      json: () => Promise.resolve({ 
        photos: [
          { img_src: 'mock-url-1', camera: { full_name: 'mock-camera-1' } },
          { img_src: 'mock-url-2', camera: { full_name: 'mock-camera-2' } },
          // Add more mock data as needed
        ],
      }),
    });
  });

  // Reset fetch mock after each test
  afterEach(() => {
    global.fetch.mockClear();
  });

  it('should render loading spinner initially', () => {
    const { getByLabelText } = render(<MarsRoverPhoto />);
    expect(getByLabelText('Center-aligned spinner example')).toBeInTheDocument();
  });

  it('should fetch data and render correctly', async () => {
    const { getByText, getByAltText } = render(<MarsRoverPhoto />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(getByAltText('image 1')).toBeInTheDocument();
      expect(getByText('mock-camera-1')).toBeInTheDocument();
      expect(getByText('mock-camera-2')).toBeInTheDocument();
      // Add more assertions for other rendered data as needed
    });
  });

  // Add more test cases to cover other scenarios, such as error handling
});
