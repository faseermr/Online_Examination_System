import React,{useEffect,useState} from 'react'
import examServices from '../../service/examServices'
import subjectServices from '../../service/subjectServices';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';

const UpdateQuiz = () => {
    const {qid} = useParams();
    const [question,setQuestion] = useState([]);
    const [subjectList,setSubjectList] = useState([]);
    const [questionid,setQuestionid] = useState("");
    const [qfield,setQfield] = useState("");
    const [answer1,setAnswer1] = useState("")
    const [answer2,setAnswer2] = useState("")
    const [answer3,setAnswer3] = useState("")
    const [answer4,setAnswer4] = useState("")
    const [correct_answer,setCorrect_Answer1] = useState("")
    const [subject,setSubject] = useState("")


    const getAllSubject = async () => {
        const res = await subjectServices.getAllSubject()
        setSubjectList(res.data)
    }

    const getQuestionById = async() => {
        const res = await examServices.getQuestionById(qid)
        setQuestion(res.data.data);
        setQuestionid(res.data.data[0].qid)
        setQfield(res.data.data[0].qfield)
        setAnswer1(res.data.data[0].ans1)
        setAnswer2(res.data.data[0].ans2)
        setAnswer3(res.data.data[0].ans3)
        setAnswer4(res.data.data[0].ans4)
        setCorrect_Answer1(res.data.data[0].correct_ans)
        setSubject(res.data.data[0].subid)
    }

useEffect(()=> {
    getQuestionById()
    getAllSubject()
},[])


  return (
    <div className='card container'>
    <Formik 
        initialValues={{
            subject:subject,
            question:qfield,
            answer1:answer1,
            answer2:answer2,
            answer3:answer3,
            answer4:answer4,
            correct_ans:correct_answer
        }}
        enableReinitialize = {true}
        validate={values => {
            const  errors = {};
            if(!values.subject){
                errors.subject = "required"
            }
            if(!values.question){
                errors.question = "required"
            }
            if(!values.answer1){
                errors.answer1 = "required"
            }
            if(!values.answer2){
                errors.answer2 = "required"
            }
            if(!values.answer3){
                errors.answer3 = "required"
            }
            if(!values.answer4){
                errors.answer4 = "required"
            }
            if(!values.correct_ans){
                errors.correct_ans = "required"
            }

            return errors
        }}
        onSubmit={(values) => {
           examServices.updateQuiz(questionid,{
            subject:values.subject,
            qfield : values.question,
            ans1 : values.answer1,
            ans2 : values.answer2,
            ans3 : values.answer3,
            ans4 : values.answer4,
            correct_ans : values.correct_ans
           }).then(res => {
            if(res.data.message){
                alert(res.data.message)
            }
           })
           
        }}
        >
         {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
        }) => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Subject:</label>
                <select className="form-control" name="subject" onChange={handleChange}>
                    <option selected disabled>-- Select One --</option>
                    {subjectList.map((val,idx) => {
                        return(
                            <option key={idx} value={val.subid} selected={val.subid == subject}>{val.grade} {val.name}</option>
                        )
                    })}
                </select>
                <div className='text-danger'> {errors.subject} </div>
            </div>
            <div className="form-group mt-2">
                <label>Question:</label>
                <input name='question' 
                       type="text" 
                       className="form-control"
                       placeholder="Enter Question"
                       defaultValue={qfield}
                       onChange={handleChange}/>
                <div className='text-danger'> {errors.question}</div>   
            </div>
            <div className="form-group mt-2">
                <label>Answer 1:</label>
                <input name='answer1' 
                       type="text" className="form-control"
                       defaultValue={answer1}
                       placeholder="Enter Answer 1"
                       onChange={handleChange}/>
                <div className='text-danger'>  {errors.answer1}</div>
            </div>
            <div className="form-group mt-2">
                <label>Answer 2:</label>
                <input name='answer2' 
                       type="text" 
                       className="form-control"
                       defaultValue={answer2}
                       placeholder="Enter Answer 2"
                       onChange={handleChange}/>
                <div className='text-danger'> {errors.answer2} </div>
            </div>
            <div className="form-group mt-2">
                <label>Answer 3:</label>
                <input name='answer3' 
                       type="text" 
                       className="form-control" 
                       defaultValue={answer3}
                       placeholder="Enter Answer 3"
                       onChange={handleChange}/>
               <div className='text-danger'> {errors.answer3} </div>
            </div>
            <div className="form-group mt-2">
                <label>Answer 4:</label>
                <input name='answer4' 
                       type="text" 
                       className="form-control"
                       defaultValue={answer4}
                       placeholder="Enter Answer 4"
                       onChange={handleChange}/>
                <div className='text-danger'> {errors.answer4} </div>
            </div>
            <div className="form-group mt-2">
                <label>Correct Answer:</label>
                <select className="form-select" name="correct_ans" onChange={handleChange}>
                    <option selected disabled>-- Select One --</option>
                    <option selected={values.answer1 == correct_answer} value={values.answer1}>Answer 1</option>
                    <option selected={values.answer2 == correct_answer} value={values.answer2}>Answer 2</option>
                    <option selected={values.answer3 == correct_answer} value={values.answer3}>Answer 3</option>
                    <option selected={values.answer4 == correct_answer} value={values.answer4}>Answer 4</option>
                </select>
                <div className='text-danger'> {errors.correct_ans} </div>
            </div>
            <button type="submit" class="btn btn-primary mt-2 mb-2">Update</button>
        </form> 
        )}
    </Formik>
    
</div>
  )
}

export default UpdateQuiz