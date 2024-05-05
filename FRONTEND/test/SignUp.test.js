// SignUp.test.js


const React = require('react');
const render = require('@testing-library/react');
const fireEvent = require('@testing-library/react');
const waitFor = require('@testing-library/react');
const SignUp = require('../src/pages/SignUp');


describe('SignUp component', () => {
  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(<SignUp />);
    
    // Ensure important elements are rendered
    expect(getByText('NASA API Reader')).toBeInTheDocument();
    expect(getByText('This is a demo project. You can sign up with your email and password or with Google.')).toBeInTheDocument();
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('name@company.com')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
    expect(getByText('Have an account?')).toBeInTheDocument();
    expect(getByText('Sign In')).toBeInTheDocument();
  });

  it('should display error message when form is submitted with missing fields', async () => {
    const { getByText } = render(<SignUp />);
    fireEvent.submit(getByText('Sign Up'));

    await waitFor(() => {
      expect(getByText('Please fill out all fields.')).toBeInTheDocument();
    });
  });

  // Add more test cases to cover other scenarios, such as successful form submission and error handling
});
