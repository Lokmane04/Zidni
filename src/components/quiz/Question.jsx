import React from "react";
import Options from "./Options";

export default function Question({ question, dispatch, answer }) {
  return (
    <div className="sm:text-lg md:text-xl lg:text-2xl">
      <h4 className="sm:text-lg md:text-xl lg:text-2xl font-semibold mb-6">
        {question.question}
      </h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
