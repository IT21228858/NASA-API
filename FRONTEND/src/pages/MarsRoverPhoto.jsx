import React, { useState, useEffect } from "react";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Card, Spinner } from "flowbite-react";
import { motion } from "framer-motion";

export default function MarsRoverPhoto() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [camera, setCamera] = useState(""); 
  const [error, setError] = useState(false);

  // Available cameras for Mars Rover
  const cameras = ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM", "PANCAM", "MINITES"];

  const fetchAPIDataOFMars = async () => {
    setLoading(true);
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_KEY}` +
      `${camera ? `&camera=${camera}` : ""}`; // Check if camera is not empty
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("No photos available for the selected camera.");
      }
      const Marsdata = await res.json();
      setData(Marsdata.photos);
      setLoading(false);
      setError(false); // Reset error state if data is successfully loaded
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setError(true); // Set error state if there's an error fetching data
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchAPIDataOFMars();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch data with updated camera value
    fetchAPIDataOFMars();
  };

  return (
    <div className="flex flex-col space-y-4 px-10 py-8">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item>Mars-Rover-Photos</Breadcrumb.Item>
      </Breadcrumb>

      {/* Camera Selection Form */}
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <select
          value={camera}
          onChange={(e) => setCamera(e.target.value)}
          className="border rounded-md p-2"
        >
          <option value="">Select Camera</option>
          {cameras.map((cam) => (
            <option key={cam} value={cam}>{cam}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Get Photos
        </button>
      </form>

      {/* Display error message if there's an error */}
      {error && (
        <div className="text-center text-red-500">No photos available for the selected camera.</div>
      )}

      {/* Loading spinner */}
      {loading ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example " size="xl" />
        </div>
      ) : (
        <motion.div
          className="grid gap-8 laptop:grid-cols-4 tablet:grid-cols-1 grid-flow-col-2 justify-stretch"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Display photos if data is available */}
          {data?.map((photo) => (
            <div key={photo.id} className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="max-w-sm"
              >
                <Card renderImage={() => (
                  <img width={500} height={500} src={photo.img_src} alt="Mars Rover photo" />
                )}>
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {photo.camera.full_name}
                  </h5>
                </Card>
              </motion.div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
