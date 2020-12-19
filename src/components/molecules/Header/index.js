import React from 'react'
import {AppBar,Tabs,Tab,Button,Dialog,DialogTitle, TextField,DialogContent,DialogActions} from '@material-ui/core'
import { SkineaseLogo } from '../../../assets'
import './header.scss'
import {Home,DataTraining,DataTesting,TambahData,Login,Register} from '../../../pages'

import {useHistory} from 'react-router-dom'

const Header = () => {
    const history = useHistory();
    const [value, setValue] = React.useState(1);
    const [open, setOpen] = React.useState(false);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
    <div>
        <div className="header-wrapper">
            <div>
                <AppBar position="static" color="transparent" style={{backgroundColor: "black"}}>
                    <Tabs style={{color:"white"}} value={value} onChange={handleChange}>
                        <img className="skineaseLogo" src={SkineaseLogo} />
                        <Tab label="Home" onClick={() => history.push("/home")}/>
                        <Tab label="Data Training" onClick={() => history.push("/datatraining")}/>
                        <Tab label="Data Testing" onClick={() => history.push("/datatesting")}/>
                        <Tab label="Tambah Data" onClick={() => history.push("/tambahdata")}/>
                        <Tab label="Login" onClick={()=> history.push("/login")} />
                    </Tabs>
                </AppBar>
            </div>
        </div>
        <div className="content-wrapper">
        <div className="bodys" style={{style:"width:100%",display:"flex" ,minHeight:"100vh",boxSizing:"border-box" }}>
            {value === 1 && <Home />}
            {value === 2 && <DataTraining />} 
            {value === 3 && <DataTesting />}
            {value === 4 && <TambahData />}
            {value === 5 && <Login />}
            {value === 5 && <Register />}
        </div>
        </div>
    </div>

    )
}

export default Header
