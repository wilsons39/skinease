import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import '../../components/molecules/Header/header.scss'
import {useHistory} from 'react-router-dom'
import axios from "axios"
import { Header,Footer,Navbar,Headers,Body } from '../../components'

import './mainApp.scss'

const MainApp = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.token)
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
          const getToken = async () => {
            const res = await axios.post('http://localhost:4000/v1/user/refresh_token' )
            console.log(res)
          }
          getToken()
        }
      },[auth.isLogged])

    return (
        <div className="main-app-wrapper">
            <Headers />
            <div>
                <Body />
            </div>
            <div className="footer-wrapper">
              <Footer />
            </div>
        </div>
    )
}

export default MainApp
