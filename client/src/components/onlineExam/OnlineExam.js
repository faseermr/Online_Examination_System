import React,{useEffect, useState} from 'react'
import { Formik } from 'formik';
import examServices from '../../service/examServices';
import subjectServices from '../../service/subjectServices';

const OnlineExam = () => {
    const [subjectList,setSubjectList] = useState([]);

    const getAllSubject = async () => {
        const res = await subjectServices.getAllSubject()
        setSubjectList(res.data)
    }



useEffect(() => {
  getAllSubject()
},[])

  return (
    <div className='container' >
        <div className='card m-2 p-4 '>
        <Formik 
            initialValues={{
                subject:"",
                question:"",
                answer1:"",
                answer2:"",
                answer3:"",
                answer4:"",
                correct_ans:""
            }}
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
                examServices.createQuestion({
                    subject:values.subject,
                    qfield : values.question,
                    ans1 : values.answer1,
                    ans2 : values.answer2,
                    ans3 : values.answer3,
                    ans4 : values.answer4,
                    correct_ans : values.correct_ans
                }).then (res => {
                    if(res.data.error){
                        alert(res.data.error)
                    }else{
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
                    <select className="form-select" name="subject" onChange={handleChange}>
                        <option selected disabled>-- Select One --</option>
                        {subjectList.map((val,idx) => {
                            return(
                                <option key={idx} value={val.subid}>{val.grade} {val.name}</option>
                            )
                        })}
                    </select>
                    <div className='text-danger'> {errors.subject} </div>
                </div>
                <div className="form-group mt-4">
                    <label>Question:</label>
                    <input name='question' 
                           type="text" 
                           className="form-control"
                           placeholder="Enter Question"
                           onChange={handleChange}/>
                    <div className='text-danger'> {errors.question}</div>   
                </div>
                <div className="form-group mt-4">
                    <label>Answer 1:</label>
                    <input name='answer1' 
                           type="text" className="form-control"
                           placeholder="Enter Answer 1"
                           onChange={handleChange}/>
                    <div className='text-danger'>  {errors.answer1}</div>
                </div>
                <div className="form-group mt-4">
                    <label>Answer 2:</label>
                    <input name='answer2' 
                           type="text" 
                           className="form-control"
                           placeholder="Enter Answer 2"
                           onChange={handleChange}/>
                    <div className='text-danger'> {errors.answer2} </div>
                </div>
                <div className="form-group mt-4">
                    <label>Answer 3:</label>
                    <input name='answer3' 
                           type="text" 
                           className="form-control" 
                           placeholder="Enter Answer 3"
                           onChange={handleChange}/>
                   <div className='text-danger'> {errors.answer3} </div>
                </div>
                <div className="form-group mt-4">
                    <label>Answer 4:</label>
                    <input name='answer4' 
                           type="text" 
                           className="form-control"
                           placeholder="Enter Answer 4"
                           onChange={handleChange}/>
                    <div className='text-danger'> {errors.answer4} </div>
                </div>
                <div className="form-group mt-4">
                    <label>Correct Answer:</label>
                    <select className="form-select" name="correct_ans" onChange={handleChange}>
                        <option selected disabled>-- Select One --</option>
                        <option value={values.answer1}>Answer 1</option>
                        <option value={values.answer2}>Answer 2</option>
                        <option value={values.answer3}>Answer 3</option>
                        <option value={values.answer4}>Answer 4</option>
                    </select>
                    <div className='text-danger'> {errors.correct_ans} </div>
                </div>
                <button type="submit" class="btn btn-primary mt-4 mb-2">Submit</button>
            </form> 
            )}
        </Formik>
        
    </div>
</div>

  )
}

export default OnlineExam