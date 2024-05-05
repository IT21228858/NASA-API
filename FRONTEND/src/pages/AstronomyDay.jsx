import React, { useEffect, useState } from "react";
import { Breadcrumb } from "flowbite-react";
import { Spinner } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { motion } from "framer-motion";

export default function AstronomyDay() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [count, setCount] = useState("");
  const [showForms, setShowForms] = useState(false);

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const apidata = await res.json();
      setData(apidata);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCurrentDateData = async () => {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${date}`;
      await fetchData(url);
    };
    fetchCurrentDateData();
  }, []);

  const handleDateSubmit = async (e) => {
    e.preventDefault();
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${date}`;
    fetchData(url);
  };

  const handleDateRangeSubmit = async (e) => {
    e.preventDefault();
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&start_date=${startDate}&end_date=${endDate}`;
    fetchData(url);
  };

  const handleCountSubmit = async (e) => {
    e.preventDefault();
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&count=${count}`;
    fetchData(url);
  };

  return (
    <motion.div
      className="flex flex-col space-y-4 px-5 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item>APOD</Breadcrumb.Item>
      </Breadcrumb>

      {/* Button to toggle forms */}
      <div className="flex justify-center">
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={() => setShowForms(!showForms)}
        >
          {showForms ? "Hide Forms" : "Show Forms"}
        </button>
      </div>

      {/* Forms Section */}
{showForms && (
  <div className="flex flex-wrap justify-center space-x-8">
    {/* Date Section */}
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Date Section</h2>
      <form onSubmit={handleDateSubmit}>
        <div className="flex flex-col items-center space-y-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-md p-2"
            placeholder="Date"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">
            Get Image
          </button>
        </div>
      </form>
    </div>

    {/* Date Range Section */}
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Date Range Section</h2>
      <form onSubmit={handleDateRangeSubmit}>
        <div className="flex flex-col items-center space-y-4">
          <label htmlFor="startDate" className="text-gray-500 dark:text-gray-400">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-md p-2"
          />

          <label htmlFor="endDate" className="text-gray-500 dark:text-gray-400">End Date</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-md p-2"
          />

          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">
            Get Images
          </button>
        </div>
      </form>
    </div>

    {/* Count Section */}
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Count Section</h2>
      <form onSubmit={handleCountSubmit}>
        <div className="flex flex-col items-center space-y-4">
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="border rounded-md p-2"
            placeholder="Count"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">
            Get Images
          </button>
        </div>
      </form>
    </div>
  </div>
)}



     {/* Display Section */}
      {data && (
        <motion.div
          className="flex flex-col space-y-4 px-5 py-8"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Conditional rendering based on data length */}
          {Array.isArray(data) && data.length > 1 ? (
            <div className="grid laptop:grid-cols-3 gap-2 tablet:grid-cols-1 grid-flow-col-2 justify-stretch">
              {data.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  {/* Image */}
                  <div className="flex justify-center bg-black bg-no-repeat bg-cover bg-fixed bg-clip-border bg-origin-padding">
                    <img src={item.url} alt={`Astronomy picture of the day ${index}`} className="object-contain h-full" />
                  </div>

                  {/* Details */}
                  <div className="flex align-top">
                    <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col align-top">
                      <div className="flex h-full flex-col justify-start gap-4 p-6">
                        <h5 className="align-top text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {item.title}
                        </h5>
                        <h5 className="text-sm font-semibold tracking-tight text-blue-800 dark:text-white">
                          {item.date}
                        </h5>
                        <p className="max-w-xl font-normal text-gray-700 dark:text-gray-400">
                          {item.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid laptop:grid-cols-2 gap-2 tablet:grid-cols-1 grid-flow-col-2 justify-stretch">
              {/* Image */}
              <div className="flex justify-center bg-black bg-no-repeat bg-cover bg-fixed bg-clip-border bg-origin-padding">
                <img src={data.url} alt={`Astronomy picture of the day`} className="object-contain h-full" />
              </div>

              {/* Details */}
              <div className="flex align-top">
                <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col align-top">
                  <div className="flex h-full flex-col justify-start gap-4 p-6">
                    <h5 className="align-top text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {data.title}
                    </h5>
                    <h5 className="text-sm font-semibold tracking-tight text-blue-800 dark:text-white">
                      {data.date}
                    </h5>
                    <p className="max-w-xl font-normal text-gray-700 dark:text-gray-400">
                      {data.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}



      {/* Loading Spinner */}
      {loading && (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" size="xl" />
        </div>
      )}
    </motion.div>
  );
}
