import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { db, ref, set } from "./firebase"; 
import {data1} from './data'

const Dictaphone = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [record, setRecord] = useState(false);
  const [recorddata, setRecordata] = useState("");
  const [content, setContent] = useState(""); // State to store the password
  const [data, setData] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState(null);

  

  useEffect(() => {
    if (transcript || content) {
      try {
        set(ref(db, "transcript"), { transcript, content }); // Save transcript and content to Firebase
      } catch (error) {
        console.error("Error updating transcript:", error);
      }
    }
  }, [transcript, content]);

  const handleRecord = () => {
    setData(recorddata);
  };

  useEffect(() => {
    if (data === "praveen0569") {
      setRecord(true);
    }
  }, [data]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setSearchTerm(searchQuery);

    const matchedQuestion = Object.keys(data1).find((key) =>
      key.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchedQuestion) {
      setResult({ question: matchedQuestion, answer: data1[matchedQuestion] });
      
    } else {
      setResult(null);
    }
  };
const senddata=()=>{
  setContent(result.answer);
}
const resetData= ()=>{
  setContent('')
}
  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data && (
  <div style={{ width: "40%" ,}}>
    <h1>React Questions and Answers</h1>
    <input
      type="text"
      placeholder="Search for a question..."
      value={searchTerm}
      onChange={handleSearch}
      style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
    />
    {/* Auto-dropdown for suggestions */}
    {searchTerm && (
      <ul
        style={{
          listStyle: "none",
          padding: "0",
          margin: "0",
          maxHeight: "500px",
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#fff",
          zIndex: "1000",
          position: "absolute",
          width: "40%",
        }}
      >
        {Object.keys(data1)
          .filter((key) =>
            key.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((key) => (
            <li
              key={key}
              onClick={() => {
                setSearchTerm(key);
                setResult({ question: key, answer: data1[key] });
              }}
              style={{
                padding: "5px",
                borderBottom: "1px solid #ddd",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
              }}
            >
              {key}
            </li>
          ))}
      </ul>
    )}
    {result ? (
      <div style={{marginTop:'60px'}}>
        
        <p>{result.answer}</p>
      </div>
    ) : searchTerm ? (
      <p>No results found.</p>
    ) : (
      <p>Type in the search box to find a question.</p>
    )}
    <button
      onClick={senddata}
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
    <button
            onClick={resetData}
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
)}

      <div style={{ width: "60%" }}>
        <div style={{ marginBottom: "20px", width: "80%",marginTop: '10px',marginLeft:'90px' }}>
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
        <textarea
          rows="10"
          cols="50"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
      </div>
    </div>
  );
};

export default Dictaphone;
