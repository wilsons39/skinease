import React from 'react'
import { AppBar } from '@material-ui/core'
import { FacebookLogo,TwitterLogo,InstagramLogo,YoutubeLogo,LinkedinLogo,BehanceLogo } from '../../../assets'
import './footer.scss'

const Icon = ({img}) => {
    return(
        <div className="icon-wrapper">
            <img className="icon-medsos" src={img} alt="icon" />
        </div>
    )
}

const Footer = () => {
    return (
        <div>
            <AppBar position="static" color="transparent" style={{background: "black"}}>
                <div className="social-wrapper">
                    <a href="https://www.facebook.com/wilsonsaputras38/">
                    <Icon img={FacebookLogo} />
                    </a>
                    <Icon img={TwitterLogo} />
                    <Icon img={InstagramLogo} />
                    <Icon img={YoutubeLogo} />
                    <Icon img={LinkedinLogo} />
                    <Icon img={BehanceLogo} />
                </div>
            </AppBar>
        </div>
    )
}

export default Footer
