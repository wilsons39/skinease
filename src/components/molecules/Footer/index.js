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
                    <a href="https://twitter.com/wilsonsaputra_">
                        <Icon img={TwitterLogo} />
                    </a>
                    <a href="https://www.instagram.com/wilsonsaputra_/?hl=id">
                        <Icon img={InstagramLogo} />
                    </a>
                    <a href="https://www.youtube.com/watch?v=Jwb04bh3mdk">
                        <Icon img={YoutubeLogo} />
                    </a>
                    <a href="https://www.linkedin.com/in/wilson-saputra-4a7430187/">
                        <Icon img={LinkedinLogo} />
                    </a>
                    <a href="https://www.behance.net/wilsonsaputra_">
                        <Icon img={BehanceLogo} />
                    </a>
                </div>
            </AppBar>
        </div>
    )
}

export default Footer
