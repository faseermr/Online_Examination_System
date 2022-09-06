import React, { useEffect, useState } from "react";
import "./style.css";

const QuestionNo = ({
  qNo,
  setIndexFirst,
  setLastIndex,
  setQuestionNo,
  questionNo,
}) => {
  let num = [];

  for (let i = 1; i <= qNo; i++) {
    num.push(i);
  }

  const changeQuestion = (no) => {
    setIndexFirst(no - 1);
    setLastIndex(no);
    setQuestionNo(no);
    //console.log(no);
  };

  return (
    <div className="questionNo">
      {num.map((val, idx) => {
        return (
          <div
            className={questionNo == val ? "singleNo_active" : "singleNo"}
            key={idx}
            onClick={() => changeQuestion(val)}
          >
            {val}
          </div>
        );
      })}
    </div>
  );
};

export default QuestionNo;
