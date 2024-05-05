import { Carousel, Card } from "flowbite-react";

export default function CarouselSection() {
  return (
    <div className="bg-white py-14 sm:py-32">
      <div className="mx-auto max-w-9xl px-6 lg:px-8">
        <div className="mx-auto mt-8 max-h-xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid grid-cols-1 gap-7 laptop:grid-cols-2">
            <div className="animate-flip-down grid h-80 grid-cols-1 sm:h-64 xl:h-80 2xl:h-96">
              <Carousel>
                <div className="flex h-full items-center justify-center bg-hero-pattern bg-fixed bg-clip-border bg-origin-padding bg-no-repeat bg-center bg-cover dark:text-white"></div>
                <div className="flex h-full items-center justify-center bg-hero-pattern1 bg-fixed bg-clip-border bg-origin-padding bg-no-repeat bg-center bg-cover dark:text-white"></div>
                <div className="flex h-full items-center justify-center bg-hero-pattern2 bg-fixed bg-clip-border bg-origin-padding bg-no-repeat bg-center bg-cover dark:text-white"></div>
              </Carousel>
            </div>
            <div className="animate-flip-down grid h-80 grid-cols-1 sm:h-64 xl:h-80 2xl:h-96">
              <Card className="max-w-full bg-gray-200">
                <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                Discover More Topics From NASA
                </h5>
                <p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
                Stay up-to-date on the latest news from NASA–from 
                Earth to the Moon, the Solar System and beyond..
                </p>
                <div className="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0 ">
                  <a
                    href="https://www.nasa.gov/news/all-news/"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-3.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto"
                  >
                    
                     
                    <div className="text-left ">
                      {/* <div className="mb-1 text-xs">Visit on the</div> */}
                      <div className="-mt-1 font-sans text-sm font-semibold">
                        Read more
                      </div>
                    </div>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
