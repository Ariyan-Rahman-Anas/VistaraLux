function Loader() {
  return (
    // <section className="loader h-[100vh] w-full flex items-center justify-center ">
    //   <div className="animate-[loading-animation_0.5s_linear_infinite] h-[4rem] w-[4rem] rounded-full border-t-8 border-l-8 border-myBlue ">
    //   </div>
    // </section>

    <section>
      <div className="min-h-screen flex flex-col items-center justify-center" >
        <div className="animate-spin h-8 w-8 border-4 border-dotted border-myBlue border-t-transparent rounded-full mr-2"></div>
       <p>Checking authentication</p>
      </div>
    </section>
  )
}

export default Loader