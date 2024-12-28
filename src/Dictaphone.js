import React, { useEffect,useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { db, ref, set } from "./firebase"; // Correct Firebase import

const Dictaphone = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [record,setRecord]=useState(false)
  const [recorddata,setRecordata]=useState(false)
  const [data,setData]=useState(false)
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
  const handleRecord=(e)=>{
    setData(recorddata)
  }
  console.log(recorddata)
  useEffect(()=>{
    if(data === 'praveen0569'){
      setRecord(true)
    }
  },[data])
    
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div
  style={{
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <h1 style={{ fontSize: "2rem", marginBottom: "20px", color: "#333" }}>
    Speech-to-Text Application
  </h1>
  <div style={{ marginBottom: "20px", width: "80%" }}>
    <input
      type="password"
      placeholder="Enter password to start speak..."
      onChange={(e) => {
        setRecordata(e.target.value);
      }}
      style={{
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        outline: "none",
        marginBottom: "10px",
      }}
    />
    <button
      onClick={handleRecord}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        color: "#fff",
        backgroundColor: "#007bff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginRight: "10px",
      }}
    >
      Submit
    </button>
  </div>
  <textarea
    rows="10"
    cols="50"
    value={transcript}
    readOnly
    style={{
      width: "80%",
      padding: "15px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      resize: "none",
      backgroundColor: "#fdfdfd",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    }}
  />
  <div style={{ marginTop: "20px" }}>
    {record && (
      <button
        onClick={() => SpeechRecognition.startListening({ continuous: true })}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          color: "#fff",
          backgroundColor: "#28a745",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Start Listening
      </button>
    )}
    <button
      onClick={SpeechRecognition.stopListening}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        color: "#fff",
        backgroundColor: "#dc3545",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginRight: "10px",
      }}
    >
      Stop Listening
    </button>
    <button
      onClick={resetTranscript}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        color: "#fff",
        backgroundColor: "#6c757d",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Reset
    </button>
  </div>
</div>

  );
};

export default Dictaphone;
