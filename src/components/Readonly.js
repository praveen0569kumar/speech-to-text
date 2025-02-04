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
      <div style={{ padding: "20px", width: '30%', textAlign: "center", display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        <b>Name of company:<input type="text" style={{padding:'10px'}}/></b>
        <b>Name of payrollcompany:<input type="text" style={{padding:'10px'}}/></b>
        <b>Current CTC:<input type="text" style={{padding:'10px'}}/></b>
        <b>expected CTC:<input type="text" style={{padding:'10px'}}/></b>
        <b>Years of  experience:<input type="text" style={{padding:'10px'}}/></b>
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
