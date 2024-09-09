import React, { useEffect } from 'react'
import { useState,useRef } from 'react'
import axios from 'axios';


const App = () => {

const[question,setQuestion]=useState([]);
const [ questionState,setQuestionstate]=useState(0);

  const checkinput=useRef([]);

  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions")
    .then ((res) => {
      console.log(res.data)
      setQuestion(res.data);
    }).catch((error) => {
      console.log(error)
    })
  },[])


  function shuffleArray (array) {
    for(let i= array.length -1;i > 0;i--){
      const j = Math.floor(Math.random() * (i + 1));
     [array[i],array[j]=array[j],array[i]]; 
    }
  return array;}


   function nextQuestion (index){
    const checkedButton = checkedInput.current.find(input => input.checked);
    if(checkedButton){
      const selectValue =checkedButton.value;
      console.log("selectedanswer",selectValue);
     }

    question < question.length -1 ? setQuestionstate(question +1): alert("The question has ended now");
   }




 

  return (
  <>

  <h1>Quiz App</h1>
      {question.length > 0 ? <div>
        <h1>Q{questionState + 1}: {question[questionState].question.text}</h1>
        <ul>
          {shuffleArray([...question[questionState].incorrectAnswers , question[questionState].correctAnswer]).map((item , index)=>{
            return <li key={index}>
            <input type="radio" name='choice' id={item} value={item} ref={el => (checkedInput.current[index] = el)}/>
            <label htmlFor={item}>{item}</label>
          </li>
          
          })}
        </ul>
        <button onClick={()=> nextQuestion()}>Next {question.length}</button>
      </div> : <h1>Loading...</h1>}
    
  </>
  )
}

export default App
