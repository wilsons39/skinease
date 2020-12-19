import React from "react"
import {Link} from "react-router-dom"
import './headers.css'
import {useSelector} from "react-redux"
import axios from "axios"

function Headers(){
    const auth = useSelector(state => state.auth)
    console.log(auth)
    
    const {user, isLogged} = auth

    const userLink= () => {
        return <li>
                <Link>
                <img src={user.avatar} alt=""/> {user.name}
                </Link>
            </li>
    }

    return(
        <header>
            <div className="logo">
                <h1><Link to="/">Skinease</Link></h1>
            </div>
            <ul>
                <li><Link to="/"><i>HOME</i></Link></li>
                <li><Link to="/datatraining"><i>DATA TRAINING</i></Link></li>
                <li><Link to="/datatesting"><i>DATA TESTING</i></Link></li>
                <li><Link to="/tambahdata"><i>TAMBAH DATA</i></Link></li>
                {
                    isLogged
                    ? userLink()
                    : <li><Link to="/login">LOGIN</Link></li>
                }
            </ul>
        </header>
    )
}

export default Headers