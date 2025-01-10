import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { db, ref, set } from "./firebase"; 
import {data1} from './data';
import axios from "axios";
import './Dictaphone.css'

const Dictaphone = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [record, setRecord] = useState(false);
  const [recorddata, setRecordata] = useState("");
  const [content, setContent] = useState(""); // State to store the password
  const [data, setData] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState(null);
  const [question,setquestion]=useState('')
  const [answer,setAnswer]=useState('')
  const gemini=async()=>{
    const response=await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAicG3US3okF_VpzKlpm2MiLVhyXHjplNM",
        method:"post",
        data:{
          contents: [{
            parts:[{text: question}]
            }]
           }
    })
    setContent('')
    setAnswer(response.data.candidates[0].content.parts[0].text)
  }

  useEffect(() => {
    if (transcript || content || answer) {
      try {
        set(ref(db, "transcript"), { transcript, content,answer }); // Save transcript and content to Firebase
      } catch (error) {
        console.error("Error updating transcript:", error);
      }
    }
  }, [transcript, content ,answer]);

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
  setAnswer('')
  setContent(result.answer);
}
const resetData= ()=>{
  setContent('')
}
return (
  <div className="app-container">
    {data && (
      <div className="question-section">
        <h1>React Questions and Answers</h1>
        <input
          type="text"
          placeholder="Search for a question..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />

        {searchTerm && (
          <ul className="search-results">
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
                  className="result-item"
                >
                  {key}
                </li>
              ))}
          </ul>
        )}
        {result ? (
          <div className="result-display">
            <p>{result.answer}</p>
          </div>
        ) : searchTerm ? (
          <p>No results found.</p>
        ) : (
          <p>Type in the search box to find a question.</p>
        )}
        <button onClick={senddata} className="btn btn-primary">
          Submit
        </button>
        <button onClick={resetData} className="btn btn-secondary">
          Reset
        </button>
        <div className="gemini-section">
          <input
            type="text"
            placeholder="Search for a question..."
            value={question}
            onChange={(e) => setquestion(e.target.value)}
            className="search-input"
          />
          <button onClick={gemini} className="btn btn-primary">
            Gemini
          </button>
        </div>
      </div>
    )}

    <div className="voice-section">
      <div className="password-input-container">
        <input
          type="password"
          placeholder="Enter password to start speak..."
          onChange={(e) => setRecordata(e.target.value)}
          className="password-input"
        />
        <button onClick={handleRecord} className="btn btn-primary">
          Submit
        </button>
      </div>
      <textarea
        rows="10"
        cols="50"
        value={transcript}
        readOnly
        className="transcript-box"
      />
      <div className="voice-controls">
        {record && (
          <button
            onClick={() =>
              SpeechRecognition.startListening({ continuous: true })
            }
            className="btn btn-success"
          >
            Start Listening
          </button>
        )}
        <button
          onClick={SpeechRecognition.stopListening}
          className="btn btn-danger"
        >
          Stop Listening
        </button>
        <button onClick={resetTranscript} className="btn btn-secondary">
          Reset
        </button>
      </div>
      <textarea
        rows="10"
        cols="50"
        value={content.length > 0 ? content : answer}
        onChange={(e) => setContent(e.target.value)}
        className="content-box"
      />
    </div>
  </div>
);
};

export default Dictaphone;
