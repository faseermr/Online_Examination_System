import React,{createContext, useState,useEffect} from 'react'


export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user,setUser] = useState([]);
    const [userName,setUserName] = useState("")
    const [userId,setUserId] = useState("")
    const [admin,setAdmin] = useState([])
    const [refresh,setRefresh] = useState(false)


    useEffect(()=> {
        const userData = JSON.parse(localStorage.getItem('student'));
        setRefresh(true)
        if(userData){
        console.log(userData.student)
        setUser(userData.student)
        setUserId(userData.student[0].stuid)
        setUserName(userData.student[0].name);
        }
       // console.log(user);
    },[refresh])
    
    
useEffect(()=> {
    const adminData = JSON.parse(localStorage.getItem('admin'));
   // console.log(adminData);
    setRefresh(true)
    if(adminData){
       setAdmin(adminData.admin)
    }
},[refresh])


    const value = {user,userName,userId,admin}
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    
    )
}

export default UserContextProvider;