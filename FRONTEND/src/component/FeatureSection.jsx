import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  GlobeAsiaAustraliaIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Astronomy Picture of the Day",
    icon: CameraIcon,
    link: "/apod",
  },
  {
    name: "Mars Rover Photos",
    icon: GlobeAsiaAustraliaIcon,
    link: "/mars",
  },
];

export default function Example() {
  // Set isLoggedIn based on whether currentUser exists or not
  const { currentUser } = useSelector((state) => state.user);
  const isLoggedIn = !!currentUser;

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="animate-fade-right mx-auto max-w-2xl lg:text-center">
        <p className="mt-20 text-3xl font-bold tracking-tight sm:text-4xl text-center">
          Embark on a Journey Through the Cosmos
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-900 text-center">
          Discover the wonders of space with NASA as we explore the universe,
          push the boundaries of science, and inspire the next generation of
          explorers.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-4xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid grid-cols-1 gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="animate-fade-up">
              <Link to={isLoggedIn ? feature.link : "/sign-in"}>
                <div className="flex items-center space-x-4 bg-gradient-to-br from-green-400 to-blue-400 py-8 px-6 rounded-lg cursor-pointer">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white">
                    <feature.icon
                      className="h-6 w-6 text-green-500"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {feature.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
