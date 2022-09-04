import OnlineExam from './components/onlineExam/OnlineExam'
import QuestionPaper from './components/onlineExam/QuestionPaper'
import Signin from './components/Signin/Signin'
import Signup from './components/signup/Signup'
import Dashboard from './container/Dashboard'
import Navbar from './container/Navbar'
import ExamTable from './components/examTable/examTable'
import AdminLogin from './components/Signin/Adminlogin'
import ReviewPaper from './components/onlineExam/ReviewPaper'
import UpdateQuiz from './components/onlineExam/UpdateQuiz'
import Classroom from './components/class/Classroom'
import Subject from './components/subject/Subject'


const routes = [
    {
    path:"/dashboard", element: Dashboard, exact:true
    },
    {
    path:"/examtable", element: ExamTable, exact:true
    },
    {
    path:"/post_question", element: OnlineExam, exact:true
    },
    {
    path:"/question", element: QuestionPaper, exact:true
    },
    {
    path:"/question/update/:qid", element: UpdateQuiz, exact:true
    },
    {
    path:"/question/student/:subject", element: QuestionPaper, exact:true
    },
    {
    path:"/question/subject/:subject", element: QuestionPaper, exact:true
    },
    {
    path:"/question/review/:student", element: ReviewPaper, exact:true
    },
    {
    path:"/classroom", element: Classroom, exact:true
    },
    {
    path:"/subject", element: Subject, exact:true
    }
        
    
]

export default routes;