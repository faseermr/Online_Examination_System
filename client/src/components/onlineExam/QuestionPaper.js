import React, { useEffect, useState } from "react";
import examServices from "../../service/examServices";
import { useParams, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import "./style.css";
import QuestionNo from "./QuestionNo";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminDataAction,
  getUserDataAction,
} from "../../redux/action/authAction";

const QuestionPaper = (props) => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [question, setQuestion] = useState([]);
  const [indexFirst, setIndexFirst] = useState(0);
  const [lastIndex, setLastIndex] = useState(1);
  const [questionNo, setQuestionNo] = useState(1);
  const [answer, setAnswer] = useState("");
  const [qlength, setQlength] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState([]);

  const answerQuestion = async (questionid) => {
    if (answer) {
      await examServices
        .answerQuestion({
          qid: questionid,
          stuid: user[0].stuid,
          ans: answer,
        })
        .then((res) => {
          setAnswer("");
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
        setQuestion(res.data.data);
        setQlength(res.data.data.length);
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
          student: user[0].stuid,
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

  useEffect(() => {
    getQuestionBySubject(subject);
  }, [subject, admin]);

  useEffect(() => {
    getQuestionBySubjectAndStudent(subject);
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
  }, [indexFirst, lastIndex, user]);

  useEffect(() => {
    dispatch(getUserDataAction());
    dispatch(getAdminDataAction());
  }, [dispatch]);

  useEffect(() => {
    if (userData.userdata) {
      console.log(userData.userdata.student);
      setUser(userData.userdata.student);
    }

    if (userData.adminData) {
      setAdmin(userData.adminData.admin);
    }
  }, [userData]);

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
