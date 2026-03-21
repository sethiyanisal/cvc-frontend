import React from 'react'
import { Link } from "react-router-dom";

import NavBar from '../components/NavBar'
import HomePageCard from '../components/HomePageCard'

import Banner1 from '../images/Banner1.jpg'
import Banner2 from '../images/Banner2.jpg'
import Banner3 from '../images/Banner3.jpg'
import Wlogo from '../images/whatsapp-logo.png'

import CocoPith from '../images/Products/Coco_Fibre_Pith.jpg'
import HuskChips from '../images/Products/Husk_Chips.png'
import GrowBlock from '../images/Products/Grow_Block.jpeg'
import GrowBrick from '../images/Products/Grow_Brick.jpeg'
import GrowBag from '../images/Products/Grow_Bag.jpeg'
import AllUserMap from '../components/AllUserMap';



const HomePage = () => {
  return (
    <>
      <NavBar/>

      <div
          className="relative text-center text-white font-popins bg-cover bg-center h-screen brightness-50"
          style={{ backgroundImage: `url(${Banner1})` }}
      ></div>

      <div className="z-50 fixed bottom-0 right-0 m-8">
        <a href="https://wa.me/94761431782">
            <img className='pl-6 w-20' src={Wlogo} alt='Chat with us'></img>
        </a>
        <span className='text-white font-bold'>Chat with us</span>
      </div>
      
      <div>
        <HomePageCard/>
      </div>

      <div className="mx-4 my-8">
        <AllUserMap/>
      </div>

      <hr className="w-3/4 mx-auto bg-gray-900" />

      <div className="container mx-auto p-4 mt-12">
        <div className="flex flex-row flex-wrap -mx-2">
          <div className="w-full md:w-1/3 h-64 md:h-auto mb-4 px-2 relative transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
            <Link
              className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover"
              to="/"
              title="Link"
              style={{
                backgroundImage: `url(${CocoPith})`,
              }}
            ></Link>
          </div>
          <div className="w-full md:w-2/3 mb-4 px-2">
            <div className="flex flex-col sm:flex-row md:flex-col -mx-2">
              <div className=" flex flex-row sm:w-1/2 md:w-full h-fu48 xl:h-64 sm:mb-0 md:mb-4 px-2">
                <div className="w-1/2 sm:w-1/3 h-48 md:h-full mb-4 sm:mb-0 px-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
                  <Link
                    className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover"
                    to="/"
                    title="Link"
                    style={{
                      backgroundImage: `url(${HuskChips})`,
                    }}
                  ></Link>
                </div>
                <div className="w-1/2 sm:w-1/3 h-48 md:h-full mb-4 sm:mb-0 px-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
                  <Link
                    className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover"
                    to="/"
                    title="Link"
                    style={{
                      backgroundImage: `url(${GrowBag})`,
                    }}
                  ></Link>
                </div>
                <div className="w-1/2 sm:w-1/3 h-48 md:h-full px-2">
                  <Link
                    className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"
                    to="/"
                    title="Link"
                    style={{
                      backgroundImage: `url(${GrowBrick})`,
                    }}
                  ></Link>
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-full h-48 xl:h-64 px-4 relative transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
                <Link
                  className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover"
                  to="/"
                  title="Link"
                  style={{
                    backgroundImage: `url(${Banner1})`,
                  }}
                ></Link>
              </div>
            </div>
          </div>
        </div>

        <a href='./Gallery'>
          <button type="button" className="font-bold mt-4 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:outline-none focus:ring-green-300 text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600">
            Go to Gallery
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ml-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </button>
        </a>
      </div>

      <hr className="w-3/4 mx-auto bg-gray-900" />

      <div className="grid grid-cols-1 lg:grid-cols-2 mt-16">
        <div className="flex flex-col">
          <div className="flex-1">
          <img className='h-full' src={Banner2} alt='Coco Peat'></img>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex-1 bg-gray-800 text-start p-16">
              <div className="xl:text-5xl lg:text-5xl text-3xl text-white font-medium">
                Our Products
              </div>
              <p className='md:text-sm lg:text-base font-semibold text-white mt-12'> 
              At 'CHACHA COCO', we pride ourselves on being a leading exporter of high-quality coco peat products. 
              With a commitment to sustainability and superior quality, we offer a range of coco peat solutions that cater to 
              the diverse needs of our global clientele. Our dedication to customer satisfaction, reliable sourcing, and eco-friendly 
              practices sets us apart as a trusted partner in the coco peat industry.
              </p>

            <a className='mt-12' href="./Products">
              <button className=" mt-16 mr-2 mb-2 hover:bg-green-600 text-green-500 hover:text-white font-bold py-3 px-8 border border-green-500 hover:border-green-600">
                READ MORE
              </button>
            </a>
          </div>
        </div>
      </div>
      
      <div className='mt-8'>
      </div>
    </>
  )
}

export default HomePage