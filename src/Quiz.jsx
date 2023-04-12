import { useState } from "react"

export default function Quiz({quizQuestions, resetQuiz}){

    const [correctAnswers, setCorrectAnswers] = useState(0)

    const [gameCompleted, setGameCompleted] = useState(false)

    
    //Use the object returned by an api call to create the initial state value

    const [quizStateVal, setQuizStateVal] = useState(()=>{
        return [...quizQuestions].map((q)=>{
            const question = {...q}

            question.answers = [q.correct_answer, ...q.incorrect_answers].map((answer)=>{
                let a = {}
                a.answer = answer
                a.isCorrect = answer === question.correct_answer ? true : false
                a.selected = false
                a.id = crypto.randomUUID()
                return a
            })
            question.answered = false
            question.id = crypto.randomUUID()
            return question
        }) 
    })

    function answerQuestion(questionId, answerId){
        setQuizStateVal((prevQuizObj) =>{
            const currentQuizObj = [...prevQuizObj]
            const selectedQuestion = currentQuizObj.find((question)=> {
                return question.id === questionId
            })

            if(selectedQuestion.answered){
                return prevQuizObj
            }

            const selectedAnswer = selectedQuestion.answers.find((ans)=>{
                return ans.id === answerId
            })

            if(selectedAnswer.isCorrect){
                setCorrectAnswers((prev) =>{
                    return prev + 1
                })
            }
            
            selectedAnswer.selected = !selectedAnswer.selected
            selectedQuestion.answered = true
            
            return currentQuizObj
        })
        
    }

    function checkAnswers(){
        if(!gameCompleted){
                let allAnswered = quizStateVal.every((question) => {
                return question.answered
            })

            if(allAnswered){
                setGameCompleted(true)
            }
        } else{
            resetQuiz()
        }
        
    }

    //This function is to account for some of the text that have html entities in them

    function cleanUp(text) {
        const patternObj = [{
                pattern: '&quot;',
                replacer: '\"'
            },
            {
                pattern: '&#039;',
                replacer: '\''
            }]
        
        for (let pattern of patternObj) {
            text = text.replace(new RegExp(pattern.pattern, 'g'), pattern.replacer)
        }
        return text
    }


    const quiz = quizStateVal.map((questionObj) =>{
        const answerList = questionObj.answers.map((answerObj) => {
            
            

            const selectedClass = answerObj.selected ? 'selected' : ''
            const checkAnswer = (gameCompleted &&((answerObj.selected && answerObj.isCorrect))) ||              (gameCompleted && answerObj.isCorrect) ? 'correct' : 
                                gameCompleted &&((answerObj.selected && !answerObj.isCorrect)) ? 'incorrect' : ''
            
            

            return (
                <li key={answerObj.id}>
                    <button 

                    className={`btn btn-sm ${selectedClass} ${checkAnswer}`} 

                    onClick={()=>{answerQuestion(questionObj.id, answerObj.id)}}

                    >{cleanUp(answerObj.answer)}</button></li>
            )
        })

        return (<li key={questionObj.id}>
            {cleanUp(questionObj.question)}
            <ul className="answer-list">
                {answerList}
            </ul>
        </li>)
    })


    return(
        <section className="quiz-section">
            <div className="container">
                <ul className="quiz-list">
                    {quiz}
                </ul>
                
                <div className="submit">
                    {gameCompleted &&<p>You scored {correctAnswers}/{quizQuestions.length} correct answers</p>}
                    <button className="btn btn-lrg" onClick={checkAnswers}>{!gameCompleted ? 'Check Answers' : 'Play Again'}</button>
                </div>
            </div>
            
        </section>
    )
}