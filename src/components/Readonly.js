import React, { useState, useEffect } from "react";
import { db, ref, onValue, off } from "../firebase"; // Correct Firebase import

const Readonly = () => {
  const [transcript, setTranscript] = useState("");
  const [content, setContent] = useState("");
  // Listen for changes in Firebase
  useEffect(() => {
    const transcriptRef = ref(db, "transcript");

    // Set up a listener for Firebase data
    const unsubscribe = onValue(transcriptRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTranscript(data.transcript);
        setContent(data.content)
      }
    });
    console.log(transcript)
    return () => {
      off(transcriptRef); // Cleanup the listener on unmount
    };
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div
  style={{
    padding: "20px",
    width: "40%",
    margin: "0 auto",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  }}
>
  <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
    Candidate Details
  </h2>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    }}
  >
    <label style={{ display: "flex", flexDirection: "column", fontSize: "16px", fontWeight: "bold", color: "#555" }}>
      Name of Company:
      <input
        type="text"
        style={{
          textAlign:'center',
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "24px",
        }}
      />
    </label>
    <label style={{ display: "flex", flexDirection: "column", fontSize: "16px", fontWeight: "bold", color: "#555" }}>
      Name of Payroll Company:
      <input
        type="text"
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "24px",
          textAlign:'center',
        }}
      />
    </label>
    <label style={{ display: "flex", flexDirection: "column", fontSize: "16px", fontWeight: "bold", color: "#555" }}>
      Current CTC:
      <input
        type="text"
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "24px",
          textAlign:'center',
        }}
      />
    </label>
    <label style={{ display: "flex", flexDirection: "column", fontSize: "16px", fontWeight: "bold", color: "#555" }}>
      Expected CTC:
      <input
        type="text"
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "24px",
          textAlign:'center',
        }}
      />
    </label>
    <label style={{ display: "flex", flexDirection: "column", fontSize: "16px", fontWeight: "bold", color: "#555" }}>
      Years of Experience:
      <input
        type="text"
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "24px",
          textAlign:'center',
        }}
      />
    </label>
  </div>
  
</div>

      <div style={{ padding: "20px", width: '70%', textAlign: "center" }}>

        <textarea
          rows="10"
          cols="50"
          value={transcript}
          readOnly
          style={{
            width: "90%",
            padding: "10px",
            fontSize: "16px",
            border: "2px solid green",
            borderRadius: "5px",
            resize: "none",
          }}
        />
        <div style={{
          border: "2px solid green", width: '90%', minHeight: '200px', marginLeft: '38px',

          padding: "10px",
          fontSize: "16px",

          borderRadius: "5px",
        }}>
          <p style={{
            textAlign: 'center',
            width: "90%",

            resize: "none",
          }}>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Readonly;
