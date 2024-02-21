import { useState, useEffect } from "react";

import QuizOptionsForm from "./QuizOptionsForm";

import Quiz from "./Quiz";

function App() {
    const [quizQuestions, setQuizQuestions] = useState(null);

    const [categories, setAllCategories] = useState(null);

    useEffect(() => {
        async function getCategoryId() {
            const response = await fetch(
                "https://opentdb.com/api_category.php"
            );
            const data = await response.json();

            setAllCategories(data);
        }
        getCategoryId();
    }, []);

    const [formData, setFormData] = useState({
        category: "",
        difficulty: "",
    });

    function handleOptionsChange(e) {
        const { name, value } = e.target;
        setFormData((prevOptions) => {
            const currOptions = { ...prevOptions };
            currOptions[name] = value;
            return currOptions;
        });
    }

    function resetQuiz() {
        setQuizQuestions(null);
    }

    async function loadQuestions(e) {
        e.preventDefault();

        const categoryObj = categories?.trivia_categories.find((cat) => {
            return cat.name === formData.category;
        });
        const id = categoryObj.id;

        const url = `https://opentdb.com/api.php?amount=5&category=${id}&difficulty=${formData.difficulty.toLowerCase()}&type=multiple`;

        const response = await fetch(url);
        const data = await response.json();
        setQuizQuestions(data.results);
    }

    return (
        <div className="App">
            {quizQuestions ? (
                <Quiz quizQuestions={quizQuestions} resetQuiz={resetQuiz} />
            ) : (
                <section className="intro">
                    <div className="introText">
                        <h1 className="title">Quizzical</h1>

                        <QuizOptionsForm
                            changeHandler={handleOptionsChange}
                            formData={formData}
                            submitHandler={loadQuestions}
                            categories={categories}
                        />
                    </div>
                </section>
            )}
        </div>
    );
}

export default App;
