import React, { useState, useEffect } from "react";
import { db, ref, onValue, off } from "../firebase"; // Correct Firebase import
import style from '../components/style.css';
const Readonly = () => {
  const [transcript, setTranscript] = useState("");
  const [content, setContent] = useState("");
  const [answer,setAnswer]=useState('')
  // Listen for changes in Firebase
  useEffect(() => {
    const transcriptRef = ref(db, "transcript");

    // Set up a listener for Firebase data
    const unsubscribe = onValue(transcriptRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTranscript(data.transcript);
        setContent(data.content)
        setAnswer(data.answer)
      }
      
    });
    
    return () => {
      off(transcriptRef); // Cleanup the listener on unmount
    };
  }, []);
console.log(answer.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'),'12')
  return (
    <div className="container">
      <div className="candidate-details">
        <h2>Candidate Details</h2>
        <div>
          <label>
            Name of Company:
            <input type="text" />
          </label>
          <label>
            Name of Payroll Company:
            <input type="text" />
          </label>
          <label>
            Current CTC:
            <input type="text" />
          </label>
          <label>
            Expected CTC:
            <input type="text" />
          </label>
          <label>
            Years of Experience:
            <input type="text" />
          </label>
        </div>
      </div>
  
      <div className="transcript-content">
        <textarea rows="10" cols="50" value={transcript} readOnly />
        <div className="content-box">
          <p>{content}</p>
          
          <p dangerouslySetInnerHTML={{ __html: answer.replace(/\*\*(.*?)\*\*/g, '<br>$1<br>') }} />
        </div>
      </div>
    </div>
  );
  
};

export default Readonly;
