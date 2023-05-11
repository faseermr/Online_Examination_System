import React, { useState, useEffect } from "react";
import examServices from "../../service/examServices";
import { Checkmark } from "react-checkmark";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminDataAction,
  getUserDataAction,
} from "../../redux/action/authAction";
import "./style.css";
import { useParams } from "react-router-dom";

const ReviewPaper = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [question, setQuestion] = useState([]);
  const [questionNo, setQuestionNo] = useState(1);
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState([]);

  const getStudentAnswer = async () => {
    const res = await examServices.answerByStudent(user[0].stuid);

    setQuestion(res.data);
  };

  useEffect(() => {
    dispatch(getUserDataAction());
    dispatch(getAdminDataAction());
  }, [dispatch]);

  useEffect(() => {
    if (userData.userdata) {
      setUser(userData.userdata.student);
    }
  }, [userData]);

  useEffect(() => {
    getStudentAnswer();
  }, [user]);

  return (
    <React.Fragment>
      <div className="reviewcontainer">
        <div className="p-2">
          <h2>QuestionPaper</h2>
        </div>

        {question.map((val, idx) => {
          return (
            <div className="reviewcard" key={idx}>
              <>
                <p className="quiz">
                  Q{idx + 1}) {val.qfield}
                </p>
                <span>
                  <input
                    type="radio"
                    name={val.qfield}
                    value={val.ans1}
                    checked={val.ans1 == val.ans}
                  />
                  <label className="labelMargin">{val.ans1}</label>
                  <br />
                  <input
                    type="radio"
                    name={val.qfield}
                    value={val.ans2}
                    checked={val.ans2 == val.ans}
                  />
                  <label className="labelMargin">{val.ans2}</label>
                  <br />
                  <input
                    type="radio"
                    name={val.qfield}
                    value={val.ans3}
                    checked={val.ans3 == val.ans}
                  />
                  <label className="labelMargin">{val.ans3}</label>
                  <br />
                  <input
                    type="radio"
                    name={val.qfield}
                    value={val.ans4}
                    checked={val.ans4 == val.ans}
                  />
                  <label className="labelMargin">{val.ans4}</label>
                </span>
                <span className="check">
                  {val.ans == val.correct_ans ? (
                    <Checkmark size={"96"} />
                  ) : (
                    <AiFillCloseCircle size={"106"} color={"red"} />
                  )}
                </span>
              </>
              {/* <button className='' onClick={()=>prevBtn(val.qid)} disabled={indexFirst == 0}>Previous</button>
                        <button className='' onClick={()=>nextBtn(val.qid)} disabled={lastIndex == question.length + 1}>Next</button> */}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default ReviewPaper;
