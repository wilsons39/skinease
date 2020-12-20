import React from 'react'
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"

const Home = () => {
    return (
        <div>
            <Button variant="contained" color="primary">
                udh di deploy
            </Button>
            <p>New User ? <Link to="/testData">Register</Link></p>
            <p>home</p>
        </div>
    )
}

export default Home
