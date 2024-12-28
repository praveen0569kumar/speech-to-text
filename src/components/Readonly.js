import React, { useState, useEffect } from "react";
import { db, ref, onValue, off } from "../firebase"; // Correct Firebase import

const Readonly = () => {
  const [transcript, setTranscript] = useState("");

  // Listen for changes in Firebase
  useEffect(() => {
    const transcriptRef = ref(db, "transcript");

    // Set up a listener for Firebase data
    const unsubscribe = onValue(transcriptRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTranscript(data);
      }
    });

    return () => {
      off(transcriptRef); // Cleanup the listener on unmount
    };
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Readonly Component</h1>
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
    </div>
  );
};

export default Readonly;
