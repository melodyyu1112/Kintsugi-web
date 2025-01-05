import {useState, useEffect, useRef} from "react";
import {database} from "../firebase";
import {ref, set, onValue} from "firebase/database";
import Confetti from "react-confetti";

const Home = () => {
  const videoRef = useRef(null);
  const [role, setRole] = useState("student"); // Default
  const [feedback, setFeedback] = useState("");
  const [celebration, setCelebration] = useState(false);

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

  useEffect(() => {
    const feedbackRef = ref(database, "feedback");
    onValue(feedbackRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFeedback(data);
        if (data.toLowerCase().includes("good job")) {
          setCelebration(true);
          setTimeout(() => setCelebration(false), 2000);
        }
      }
    });
  }, []);

  const speak = (message) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = "en-US";
      utterance.pitch = 1.5;
      (utterance.rate = 1), 5;
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Text-to-Speech not supported in this browser.");
    }
  };

  useEffect(() => {
    if (feedback.toLowerCase().includes("good job")) {
      speak("Good job!");
    }
    if (feedback.toLowerCase().includes("focus")) {
      speak("Focus!");
    }
  }, [feedback]);

  const handleFeedbackChange = (e) => {
    const newFeedback = e.target.value;
    setFeedback(newFeedback);

    const feedbackRef = ref(database, "feedback");
    set(feedbackRef, newFeedback);
  };

  return (
    <div style={{fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4"}}>
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "0.5px solid #ddd",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "0.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{color: "#87CEEB", fontSize: "1.5rem", fontWeight: "bold"}}>
          Kintsugi Pilates
        </h1>
        {celebration && <Confetti />}
        <button
          style={{
            backgroundColor: "#87CEEB",
            color: "#fff",
            border: "none",
            padding: "0.75rem",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#6caed9")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#87CEEB")}
        >
          Sign Out
        </button>
      </nav>
      <section
        style={{
          textAlign: "center",
          margin: "1rem 0",
        }}
      >
        <label
          style={{marginRight: "1rem", fontSize: "1rem", fontWeight: "bold"}}
        >
          <input
            type="radio"
            name="role"
            value="student"
            checked={role === "student"}
            onChange={(e) => setRole(e.target.value)}
            style={{marginRight: "0.5rem"}}
          />
          Student
        </label>
        <label style={{fontSize: "1rem", fontWeight: "bold"}}>
          <input
            type="radio"
            name="role"
            value="staff"
            checked={role === "staff"}
            onChange={(e) => setRole(e.target.value)}
            style={{marginRight: "0.5rem"}}
          />
          Staff
        </label>
      </section>

      {/* Content Section */}
      <main style={{margin: "1rem"}}>
        {/* Pilates Tutorial */}
        {/* Side-by-Side Video and Camera Section */}
        <section
          id="video-camera"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "2rem",
          }}
        >
          {/* Pilates Tutorial */}
          <div
            style={{
              flex: "1",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                backgroundColor: "#000",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              <iframe
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
                src="https://www.youtube.com/embed/MuqMvpYo6n0"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Live Camera Feed */}
          <div
            style={{
              flex: "1",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                backgroundColor: "#ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              ></video>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section id="feedback" style={{textAlign: "center", marginTop: "2rem"}}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#333",
            }}
          >
            Feedback
          </h2>
          {role === "student" ? (
            <div
              style={{
                width: "97%",
                height: "150px",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #ddd",
                padding: "1rem",
                fontSize: "1.2rem",
                color: "#333",
                overflow: "auto",
              }}
            >
              {feedback || ":)"}
            </div>
          ) : (
            <textarea
              placeholder="Instructor... enter your feedback here..."
              value={feedback}
              onChange={handleFeedbackChange}
              style={{
                width: "970%",
                height: "150px",
                padding: "0.5rem",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "1rem",
                outline: "none",
                resize: "none",
              }}
            ></textarea>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
