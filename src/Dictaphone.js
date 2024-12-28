import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { db, ref, set } from "./firebase"; // Correct Firebase import

const Dictaphone = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Update Firebase whenever the transcript changes
  useEffect(() => {
    if (transcript) {
      try {
        set(ref(db, "transcript"), transcript); // Save transcript to Firebase
      } catch (error) {
        console.error("Error updating transcript:", error);
      }
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Speech-to-Text Application</h1>
      <textarea
        rows="10"
        cols="50"
        value={transcript}
        readOnly
        style={{
          width: "80%",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          resize: "none",
        }}
      />
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>
          Start Listening
        </button>
        <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
    </div>
  );
};

export default Dictaphone;
