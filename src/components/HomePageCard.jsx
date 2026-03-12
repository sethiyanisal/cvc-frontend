const HomePageCard = () => {
  return (
    <>
        <div className=" px-4 -translate-x-1/2 -translate-y-1/2 absolute text-center text-white left-1/2 top-3/4 md:top-2/3">
          <h1>
            <span className="text-5xl pb-4 font-medium tracking-wide">
            Coconut Value Chain
            </span>
          </h1>
          <h3 className=" text-3xl pt-4 font-medium">Weerasinghe ASSOCIATES (PVT) LTD</h3>

          <a href="./Contact">
            <button className=" mt-8 mr-2 mb-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 border border-green-500 hover:border-green-600">
              Contact Us
            </button>
          </a>
        </div>
    </>
  )
}

export default HomePageCard