import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields.'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('https://nasa-api-dulhan.onrender.com/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center' style={{ backgroundColor: 'white' }}>
      <div className='max-w-md w-full p-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-lg shadow-md' style={{ border: '1px solid transparent', borderImage: 'linear-gradient(to right, #05012C, #0D0652) 1' }}>
        <h2 className='text-3xl font-semibold text-center text-gray-800 mb-4'>Sign In</h2>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
              placeholder='**********'
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
              'Sign In'
            )}
          </Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span className='text-gray-600'>Don't have an account?</span>
          <Link to='/sign-in' className='text-black hover:text-white'>
            Sign Up
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
