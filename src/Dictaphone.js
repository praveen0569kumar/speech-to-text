import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Dictaphone = () => {
  const {
    transcript, // Captures the spoken words
    listening, // Indicates if the microphone is active
    resetTranscript, // Clears the captured transcript
    browserSupportsSpeechRecognition, // Checks browser compatibility
  } = useSpeechRecognition();

  // Debugging: Log the transcript to verify updates
  console.log("Transcript:", transcript);

  // Check if the browser supports speech recognition
  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support Speech Recognition.</p>;
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Speech-to-Text Application</h1>
      <p>Microphone: {listening ? "On" : "Off"}</p>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => SpeechRecognition.startListening({ continuous: true, interimResults: true })}
          style={{
            padding: "10px 20px",
            margin: "5px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Start Listening
        </button>
        <button
          onClick={SpeechRecognition.stopListening}
          style={{
            padding: "10px 20px",
            margin: "5px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Stop Listening
        </button>
        <button
          onClick={resetTranscript}
          style={{
            padding: "10px 20px",
            margin: "5px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      <div>
        <textarea
          rows="10"
          cols="50"
          value={transcript} // Dynamically displays the spoken words
          readOnly // Prevents editing the text manually
          style={{
            width: "80%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            resize: "none",
          }}
        />
      </div>
      <p>praveen</p>
    </div>
  );
};

export default Dictaphone;
