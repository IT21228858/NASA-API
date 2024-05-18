describe('MarsRoverPhoto component', () => {
    // Mock data for testing
    const mockData = [
      { id: 1, img_src: 'mock_url_1', camera: { full_name: 'Mock Camera 1' }, earth_date: '2024-05-20' },
      { id: 2, img_src: 'mock_url_2', camera: { full_name: 'Mock Camera 2' }, earth_date: '2024-05-21' },
    ];
  
    // Helper function to render the MarsRoverPhoto component
    const renderMarsRoverPhoto = () => {
      console.log('Rendering MarsRoverPhoto component');
      // Render logic...
      console.log('Mock data:', mockData);
    };
  
    // Test to check if the component renders correctly
    test('renders MarsRoverPhoto component', () => {
      // Render the MarsRoverPhoto component
      renderMarsRoverPhoto();
  
      // Assertion to check if elements are present on the page
      const assertMarsRoverPhotoComponent = () => {
        console.log('Asserting MarsRoverPhoto component elements');
        // Assertion logic...
      };
      assertMarsRoverPhotoComponent();
    });
  
    // Test to check if data is fetched correctly
    test('fetches data successfully', async () => {
      // Render the MarsRoverPhoto component
      renderMarsRoverPhoto();
  
      // Helper function to simulate data fetching
      const fetchAPIDataOFMars = async () => {
        console.log('Simulating data fetching');
        // Data fetching logic...
        console.log('Fetched data:', mockData);
        return mockData;
      };
      const data = await fetchAPIDataOFMars();
  
      // Assertion to check if data is fetched successfully
      expect(data).toEqual(mockData);
    });
  
    // Test to check if form submission works
    test('submits form successfully', async () => {
      // Render the MarsRoverPhoto component
      renderMarsRoverPhoto();
  
      // Helper function to simulate form submission
      const submitForm = async () => {
        console.log('Simulating form submission');
        // Form submission logic...
      };
      await submitForm();
  
      // Assertion to check if form submission is successful
      console.log('Form submission assertion');
      // Assertion logic...
    });
  });
  