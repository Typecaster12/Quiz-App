import { useEffect, useRef, useState } from 'react';
import './Quiz.css';
import data from './Quiz.json';

const Quiz = () => {

    //tracks the index of question;
    const [index, setIndex] = useState(0);
    //according to index next questions and its answers will appear;
    const [question, setQuestion] = useState(data[index]);
    //once any one option is clicked, lock the other options;
    const [lockOptions, setLockOptions] = useState(false);
    //state to store marks;
    const [marks, setMarks] = useState(0);
    //the result state; indicates if the game is finished or not;
    const [result, setResult] = useState(false);

    //useRef(); 
    let A = useRef(null);
    let B = useRef(null);
    let C = useRef(null);
    let D = useRef(null);

    let answer_Array = [A, B, C, D];

    //function for the correct answer
    // the e argument is to capture the target Element(e.target.value)
    //answer argument is the answer code of each answer,
    //if the answer === the right answer code then following property will be applied;
    const checkAnswer = (e, answer) => {
        //so this function is enabled only when the lockOptions is false;
        if (lockOptions === false) {
            if (question.answer === answer) {
                e.target.classList.add("right");
                //after any action on the answer the answers get locked;
                setLockOptions(true);
                //increse the marks by one if right;
                setMarks(prev => prev + 1);
                console.log(marks);

            } else {
                e.target.classList.add("wrong");
                //after any action on the answer the answers get locked;
                setLockOptions(true);
            }
        }
    }

    //every time index changes, useEffect will run;
    useEffect(() => {
        setQuestion(data[index]);
    }, [index]);

    //fucntion to handle nextQuestions;
    const handleNextQuestion = () => {

        if (index < data.length - 1) {
            setIndex(index + 1);
        }

        if (lockOptions === true) {

            if (index === data.length - 1) {
                setResult(true);
                return 0; //the remaining statement will not be executable after that;
            }

            setLockOptions(false);
            answer_Array.map((ans) => {
                ans.current.classList.remove("wrong");
                ans.current.classList.remove("right");
                return null;
            })
        }

    }

    //the reset function;
    const reset = () => {
        setIndex(0);
        setQuestion(data[index]);
        setMarks(0);
        setLockOptions(false);
        setResult(false);
    }


    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />

            {/* when result will become true then the quiz screen will disapear */}
            {result ? <><h2>Your Score: {marks} out of {data.length}</h2>

                <button onClick={reset} className="reset next-question">Reset</button></> :

                <>
                    <h2 className="questions">
                        {/* index+1 => represents the question number only  */}
                        {/* data.question => will show the questions according to index  */}
                        {index + 1}. {question.question}
                    </h2>

                    <ul className="answer-container">
                        {/* answers according to the questions  */}
                        <li ref={A} onClick={(e) => checkAnswer(e, "A")} className='answers'>{question.A}</li>
                        <li ref={B} onClick={(e) => checkAnswer(e, "B")} className='answers'>{question.B}</li>
                        <li ref={C} onClick={(e) => checkAnswer(e, "C")} className='answers'>{question.C}</li>
                        <li ref={D} onClick={(e) => checkAnswer(e, "D")} className='answers'>{question.D}</li>
                    </ul>

                    <button onClick={handleNextQuestion} className="next-question">
                        Next
                    </button>

                    {/* container that hold the current index of the question(or how many questions is remaining); */}
                    <div className="index">{index + 1} of {data.length} Questions</div> </>}
        </div>
    )
}

export default Quiz;

// question data;
// [
//     {
//         "question": "A flashing red traffic light signifies that a driver should do what?",
//         "A": "stop",
//         "B": "speed up",
//         "C": "proceed with caution",
//         "D": "honk the horn",
//         "answer": "A"
//     },
//     {
//         "question": "A knish is traditionally stuffed with what filling?",
//         "A": "potato",
//         "B": "creamed corn",
//         "C": "lemon custard",
//         "D": "raspberry jelly",
//         "answer": "A"
//     },
//     {
//         "question": "A pita is a type of what?",
//         "A": "fresh fruit",
//         "B": "flat bread",
//         "C": "French tart",
//         "D": "friend bean dip",
//         "answer": "B"
//     },
//     {
//         "question": "A portrait that comically exaggerates a person's physical traits is called a what?",
//         "A": "landscape",
//         "B": "caricature",
//         "C": "still life",
//         "D": "Impressionism",
//         "answer": "B"
//     },
//     {
//         "question": "A second-year college student is usually called a what?",
//         "A": "sophomore",
//         "B": "senior",
//         "C": "freshman ",
//         "D": "junior ",
//         "answer": "A"
//     },
//     {
//         "question": "A student who earns a J.D. can begin his or her career as a what?",
//         "A": "lawyer",
//         "B": "bricklayer",
//         "C": "doctor",
//         "D": "accountant",
//         "answer": "A"
//     },
//     {
//         "question": "A triptych is a work of art that is painted on how many panels?",
//         "A": "two",
//         "B": "three",
//         "C": "five",
//         "D": "eight",
//         "answer": "B"
//     },
//     {
//         "question": "According to a famous line from the existentialist play 'No Exit' what is hell?",
//         "A": "oneself",
//         "B": "other people",
//         "C": "little made large",
//         "D": "hued in green and blue",
//         "answer": "B"
//     },
//     {
//         "question": "According to a popular slogan, what state should people not 'mess with'?",
//         "A": "New York",
//         "B": "Texas",
//         "C": "Montana",
//         "D": "Rhode Island",
//         "answer": "B"
//     },
//     {
//         "question": "According to a Yale University study, what smell is the most recognizable to American adults?",
//         "A": "tuna",
//         "B": "laundry",
//         "C": "popcorn",
//         "D": "coffee",
//         "answer": "D"
//     },
//     {
//         "question": "According to folklore, the 'jackalope' is an antlered version of what animal?",
//         "A": "chicken",
//         "B": "rabbit",
//         "C": "moose",
//         "D": "snake",
//         "answer": "B"
//     }
// ]
