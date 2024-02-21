import { useState, useEffect } from "react";

import RadioComp from "./RadioComp";

export default function QuizOptionsForm({
    changeHandler,
    formData,
    submitHandler,
    categories,
}) {
    const difficulty = ["Easy", "Medium", "Hard"];

    const categoryOptions = categories?.trivia_categories.map((cat) => {
        return (
            <option key={cat.id} value={cat.name}>
                {cat.name}
            </option>
        );
    });

    const difficultyOptions = difficulty.map((diff) => {
        return (
            <RadioComp
                name="difficulty"
                key={diff}
                value={diff}
                label={diff}
                checkedCondition={formData.difficulty === diff}
                changeHandler={changeHandler}
            />
        );
    });

    return (
        <form className="options-form" action="" onSubmit={submitHandler}>
            <label>
                Select a category
                <select
                    name="category"
                    value={formData.category}
                    onChange={changeHandler}
                    required
                >
                    {categoryOptions}
                </select>
            </label>
            <fieldset>
                <legend>Choose Difficulty: </legend>
                {difficultyOptions}
            </fieldset>
            <p className="instructions">
                Once you start, you will be presented with 5 multiple choice
                questions. Do your best answering them and have fun all the way.
                Goodluck!!!
            </p>
            <button className="btn btn-lrg">Start Quiz</button>
        </form>
    );
}
