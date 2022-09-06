import { Formik } from "formik";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import examServices from "../../service/examServices";
import { useParams, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import "./style.css";
import QuestionNo from "./QuestionNo";

const QuestionPaper = (props) => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { userId, user, admin } = useContext(UserContext);
  const [question, setQuestion] = useState([]);
  const [indexFirst, setIndexFirst] = useState(0);
  const [lastIndex, setLastIndex] = useState(1);
  const [questionNo, setQuestionNo] = useState(1);
  const [answer, setAnswer] = useState("");
  const [qlength, setQlength] = useState("");
  const [refresh, setRefresh] = useState(false);
  // const getAllQuestion = async () => {
  //     const res =await examServices.getAllQuestion()
  //     if(res.data){
  //         console.log(res.data.data)
  //         setQuestion(res.data.data);
  //     }
  // }

  const answerQuestion = async (questionid) => {
    if (answer) {
      // console.log("Answer :", answer);
      await examServices
        .answerQuestion({
          qid: questionid,
          stuid: userId,
          ans: answer,
        })
        .then((res) => {
          setAnswer("");
          //nextQuestion();
        });
    }
  };

  const getQuestionBySubjectAndStudent = async (subject) => {
    setRefresh(true);
    if (user.length > 0) {
      const res = await examServices.getQuestionBySubjectAndStudent(
        subject,
        user[0].stuid
      );
      if (res.data.data.length > 0) {
        //   console.log(res.data.data);
        setQuestion(res.data.data);
        setQlength(res.data.data.length);
        //question.push({qid:res.data.data.length,qfield :"Press submit button"})
        //   console.log(question);
      }
    }
  };

  const getQuestionBySubject = async () => {
    if (admin.length > 0) {
      const res = await examServices.getQuestionBySubject(subject);
      if (res.data.data.length > 0) {
        setQuestion(res.data.data);
      }
    }
  };

  const prevQuestion = () => {
    setIndexFirst((prev) => prev - 1);
    setLastIndex((prev) => prev - 1);
    setQuestionNo((prev) => prev - 1);
  };

  const prevBtn = (questionid) => {
    answerQuestion(questionid);
    prevQuestion();
  };

  const nextQuestion = () => {
    setIndexFirst((prev) => prev + 1);
    setLastIndex((prev) => prev + 1);
    setQuestionNo((prev) => prev + 1);
  };

  const nextBtn = (questionid) => {
    answerQuestion(questionid);
    nextQuestion();
  };

  const submitAnswer = async (subject) => {
    let option = window.confirm("Are you sure");
    if (option) {
      await examServices
        .submitAnswer({
          student: userId,
          subject: subject,
        })
        .then((res) => {
          alert("Successfully submitted");
          navigate(`/examtable`);
        });
    }
  };

  const deleteQuiz = (qid) => {
    let option = window.confirm("Are you want to delete");
    if (option) {
      examServices.deleteQuiz(qid).then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        }
      });
    }
  };

  // const answerByStudent = async (stuid) => {
  //      const res = awa(it examServices.answerByStudent(stuid)
  //      if(res.data.length > 0){
  //         console.log(res.data);
  //         setQuestion(res.data);
  //     }else{
  //         getAllQuestion()
  //     }
  // }

  useEffect(() => {
    getQuestionBySubject(subject);
  }, [subject, admin]);

  useEffect(() => {
    // getAllQuestion()

    getQuestionBySubjectAndStudent(subject);

    // console.log(user);
  }, [subject, user]);

  useEffect(() => {
    let radioBtn = document.querySelectorAll('input[type="radio"]');
    radioBtn.forEach((val, idx) => {
      if (val.defaultChecked) {
        val.checked = true;
      } else {
        val.checked = false;
      }
    });
    //   console.log(lastIndex);
  }, [indexFirst, lastIndex, user]);

  useEffect(() => {
    //  console.log(subject);
  }, []);

  return (
    <React.Fragment>
      <div className="mcontainer">
        <div className="heading">QuestionPaper</div>
        {question.slice(indexFirst, lastIndex).map((val, idx, arr) => {
          return (
            <div className="mcard" key={idx}>
              <div>
                <p className="quiz">
                  Q{questionNo}) {val.qfield}
                </p>
                <span>
                  <input
                    type="radio"
                    name={idx}
                    value={val.ans1}
                    defaultChecked={val.ans1 == val.ans}
                    onChange={() => setAnswer(val.ans1)}
                  />
                  <label className="labelMargin">{val.ans1}</label>
                  <br />
                  <input
                    type="radio"
                    name={idx}
                    value={val.ans2}
                    defaultChecked={val.ans2 == val.ans}
                    onChange={() => setAnswer(val.ans2)}
                  />
                  <label className="labelMargin">{val.ans2}</label>
                  <br />
                  <input
                    type="radio"
                    name={idx}
                    value={val.ans3}
                    defaultChecked={val.ans3 == val.ans}
                    onChange={() => setAnswer(val.ans3)}
                  />
                  <label className="labelMargin">{val.ans3}</label>
                  <br />
                  <input
                    type="radio"
                    name={idx}
                    value={val.ans4}
                    defaultChecked={val.ans4 == val.ans}
                    onChange={() => setAnswer(val.ans4)}
                  />
                  <label className="labelMargin">{val.ans4}</label>
                </span>
              </div>
              <button
                className="btn btn-dark"
                onClick={() => prevBtn(val.qid)}
                disabled={indexFirst == 0}
              >
                Previous
              </button>

              <button
                className="btn btn-dark"
                onClick={() => nextBtn(val.qid)}
                disabled={
                  lastIndex == question.length + 1 ||
                  (admin.length > 0 && lastIndex == question.length)
                }
              >
                Next
              </button>

              {admin.length > 0 ? (
                <>
                  <button
                    className="btn btn-danger delete"
                    onClick={() => deleteQuiz(val.qid)}
                  >
                    <RiDeleteBinLine size={25} />
                  </button>

                  <button
                    className="btn btn-success edit"
                    onClick={() => navigate(`/question/update/${val.qid}`)}
                  >
                    <BiEdit size={25} />
                  </button>
                </>
              ) : null}
            </div>
          );
        })}
        {lastIndex == question.length + 1 ? (
          <button
            className="btn btn-primary submitBtn"
            // style={{margin:"auto"}}
            onClick={() => submitAnswer(subject)}
          >
            Submit
          </button>
        ) : null}
      </div>

      <div>
        <QuestionNo
          qNo={question.length}
          setIndexFirst={setIndexFirst}
          setLastIndex={setLastIndex}
          setQuestionNo={setQuestionNo}
          questionNo={questionNo}
        />
      </div>
    </React.Fragment>
  );
};

export default QuestionPaper;
