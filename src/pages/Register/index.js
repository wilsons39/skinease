import React, {useState} from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import {showErrMsg,showSuccessMsg} from '../../components'
import {isEmpty,isEmail,isLength,isMatch} from '../../components'

const initialState = {
    name : "",
    email : "",
    password : "",
    cf_password: "",
    err: "",
    success : ""
}

function Register(){
    const [user,setUser] = useState(initialState)

    const {name,email,password,cf_password,err,success} = user
 
    const handleChangeInput = e => {
        const {name,value} = e.target
        setUser({...user, [name]: value, err: "",success : ""})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password)){
            return setUser({...user, err: "Please fill in all fields.", success: ""})
        }
        if(!isEmail(email)){
            return setUser({...user, err: "Invalid emails", success: ""})
        }
        if(isLength(password)){
            return setUser({...user, err: "Password must be at least 6 character.", success: ""})
        }
        if(!isMatch(password, cf_password)){
            return setUser({...user, err: "Password didn't match.", success: ""})
        }
        try{
            const res = await axios.post("http://localhost:4000/v1/user/register",{
                name,email,password
            })

            setUser({...user, err: "",success: res.data.msg})
        }catch(err){
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ""})
        }
    }

    return(
        <div className="login_page">
            <h2>Register</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter name" id="name" value={name} name="name" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" placeholder="Enter email address" id="email" value={email} name="email" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter email password" id="password" value={password} name="password" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="cf_password">Confirm Password</label>
                    <input type="password" placeholder="Enter email password" id="cf_password" value={cf_password} name="cf_password" onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <button type="submit">Register</button>
                </div>
            </form>

            <p>Already an account ? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register
