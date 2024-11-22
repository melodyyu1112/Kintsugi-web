import {useEffect, useRef} from "react";

const Home = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-blue-500 p-4 shadow-lg text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Kintsugi Pilates</h1>
        </div>
      </nav>

      {/* Content Section */}
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* Centered Pilates Video */}
        <section id="video" className="mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Pilates Tutorial</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="rounded-lg shadow-md"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/MuqMvpYo6n0"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
        <section id="camera" className="mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-4"></h2>
          <div className="w-full h-64 bg-gray-300 rounded-lg shadow-md flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-lg"
            ></video>
          </div>
        </section>

        {/* Feedback Section */}
        {/* <section id="feedback" className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
          <div className="w-full h-48 bg-white rounded-lg shadow-md p-4">
            <textarea
              className="w-full h-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your feedback here..."
            ></textarea>
          </div>
        </section> */}
      </main>
    </div>
  );
};

export default Home;
