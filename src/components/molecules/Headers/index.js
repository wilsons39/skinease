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
                <h1><Link style={{textDecoration:"none"}} to="/">Skinease</Link></h1>
            </div>
            <ul>
                <li><Link style={{textDecoration:"none"}} to="/"><i>HOME</i></Link></li>
                <li><Link style={{textDecoration:"none"}} to="/datatraining"><i>DATA PENYAKIT & GEJALA</i></Link></li>
                <li><Link style={{textDecoration:"none"}} to="/datatesting"><i>DATA TESTING</i></Link></li>
                <li><Link style={{textDecoration:"none"}} to="/tambahdata"><i>TAMBAH DATA</i></Link></li>
                {
                    isLogged
                    ? userLink()
                    : <li><Link style={{textDecoration:"none"}} to="/login"><i>LOGIN</i></Link></li>
                }
            </ul>
        </header>
    )
}

export default Headers