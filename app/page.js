import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 h-[44vh] text-white px-5 md:px-0 text-xs md:text-base">
        <div className="flex items-center justify-center">
          <h1 className="font-bold md:text-5xl text-3xl text-center md:text-left">Fund-Raise</h1>
          <img className="" width={85} src="/mon-e.gif" alt="" />
        </div>
        <p className="text-center md:text-left">A crowd funding platform for creators. Get funded by your fans and followers. start now!</p>
        <div>
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start here</button>
          </Link>
          <Link href={"/about"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read more..</button>
          </Link>
        </div>
      </div>

      <div className="h-1 opacity-10 bg-white"></div>

      <div className="text-white container mx-auto pb-32 pt-14 px-10">
        <h2 className="text-3xl font-bold text-center mb-14">Your fans can support you through funds</h2>
        <div className="flex gap-5 justify-around">
          <div className="item flex flex-col items-center justify-center space-y-3">
            <img className="bg-slate-400 rounded-full p-2" width={88} src="/man.gif" alt="" />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">your fans are available to support you</p>
          </div>
          <div className="item flex flex-col items-center justify-center space-y-3">
            <img className="bg-slate-400 rounded-full p-2" width={88} src="/coin.gif" alt="" />
            <p className="font-bold text-center">Fans want to contribute</p>
            <p className="text-center">your fans are willing to contribute financially</p>
          </div>
          <div className="item flex flex-col items-center justify-center space-y-3">
            <img className="bg-slate-400 rounded-full p-2" width={88} src="/group.gif" alt="" />
            <p className="font-bold text-center">Fans want to collaborate</p>
            <p className="text-center">your fans are ready to collaborate with you</p>
          </div>
        </div>
      </div>

      <div className="h-1 opacity-10 bg-white"></div>

      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn more about us</h2>
        <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
          {/* <iframe className="w-full h-full" src="https://www.youtube.com/embed/ojuUnfqnUI0?si=wMUv4DG3ia6Wt4zn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
          <video src="/getMeAChai-localhost.mkv" controls autoPlay muted></video>
        </div>
      </div>
    </>
  );
}
