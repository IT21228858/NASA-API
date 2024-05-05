import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('https://nasa-api-dulhan.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center' style={{ backgroundColor: 'white' }}>
      <div className='max-w-md w-full p-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-lg shadow-md' style={{ border: '1px solid transparent', borderImage: 'linear-gradient(to right, #05012C, #0D0652) 1' }}>
        <h2 className='text-3xl font-semibold text-center text-gray-800 mb-4'>Sign Up</h2>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label value='Username' />
            <TextInput
              type='text'
              placeholder='Username'
              id='username'
              onChange={handleChange}
              className='rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500'
            />
          </div>
          <div>
            <Label value='Email' />
            <TextInput
              type='email'
              placeholder='name@company.com'
              id='email'
              onChange={handleChange}
              className='rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500'
            />
          </div>
          <div>
            <Label value='Password' />
            <TextInput
              type='password'
              placeholder='Password'
              id='password'
              onChange={handleChange}
              className='rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500'
            />
          </div>
          <Button
             className='rounded-md bg-gradient-to-r from-gray-800 to-black text-white hover:from-gray-700 hover:to-gray-900 hover:text-white'
            type='submit'
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size='sm' />
                <span className='pl-3'>Loading...</span>
              </>
            ) : (
              'Sign Up'
            )}
          </Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span className='text-gray-600'>Have an account?</span>
          <Link to='/sign-in' className='text-black hover:text-white'>
            Sign In
          </Link>
        </div>
        {errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
