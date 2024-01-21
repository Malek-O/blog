import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center ">
      <h5 className="bg-[#FAFAFA] dark:bg-[#202020] p-2 rounded-md shadow-md w-48 mx-auto text-center mt-5">nuntium. is online !</h5>
      <div className="max-w-[900px] text-center mt-5">
        <h1 className="dark:text-white md:text-6xl sm:text-4xl text-3xl  text-black"><span className="font-bold">nuntium!</span>,Explore Limitless Insights and Inspiration</h1>
        <p className="text-[#8D8D8D] text-lg mt-5 px-3 md:px-0">Your Gateway to Thoughtful Content and Engaging Stories</p>
      </div>

    </main>
  );
}
