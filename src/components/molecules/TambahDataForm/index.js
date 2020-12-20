import React , {useState,useEffect} from 'react'
import {useHistory} from "react-router-dom"
import {TextField,IconButton,Button,Select,MenuItem,makeStyles,Grid,Typography} from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import _ from 'lodash'
import axios from "axios"
import {transporting59} from '../../../assets'

const useStyles = makeStyles({
    buttonStyle: {
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        marginTop: "2vh",
        marginBottom: "2vh",
        marginLeft: "2vh"
    },
    body : {
        paddingTop: "2vh",
        marginBottom: "16.6vh"
    },
    gridTableHeadStyle: {  
        marginTop: "5vh",

    },
    gridStyle1: {
        backgroundColor: "#282c34",
        padding: "3vh",
        color: "white"
    },
    typographyTableTitleStyle: {
        padding: "1vh"
    },
    formStyle: {
        marginLeft: "2vh"
    },
    imageStyle: {
        marginLeft: "10vh",
        maxWidth: "200px",
        position: "fixed"
    }
})

const TambahDataForm = () => {

    const [inputGejalaBobots,setInputGejalaBobots] = useState ({})

    const [inputList, setInputList] = useState([{ gejala: "", bobot: 0 }]);
    const history = useHistory()

    const classes = useStyles()

    useEffect(() => {
     _.assign(inputGejalaBobots,{ gejalabobot : inputList })
     console.log("1",inputGejalaBobots)
    },[inputList]);

    const handleChangeInput = (event) => {
     setInputGejalaBobots({ penyakit : event.target.value}) 
     console.log("penyakit",inputGejalaBobots)
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    }

  const handleAddClick = () => {
        if(inputList.length<20){
            setInputList([...inputList, { gejala: "", bobot: 0 }]);
        }else{
            alert("data gejala dan bobot tidak bisa ditambahkan lebih dari 20")
        }
  }

  const handleRemoveClick = index => {
    const list = [...inputList];
    if(list.length > 1){
        list.splice(index, 1);
        setInputList(list);
    }else{
        alert("data gejala dan bobot tidak boleh 0 (kosong) ")
    }
  }

  const handlerSubmit = async () =>{
    for(let i=0; i< inputList.length; i++){
        if(inputList[i].gejala === ""){
            return alert("data penyakit bagian gejala tidak boleh kosong")
        }
        if(inputList[i].bobot === 0){
            return alert("data penyakit bagian bobot tidak boleh kosong")
        }

    }
    await axios.post("https://skinease.herokuapp.com/v1/dataTraining/ptraining",inputGejalaBobots)
    alert("data berhasil diinput")
    history.push("/datatraining")
  }

    return(
        <div className={classes.body}>
            <Grid container className={classes.gridTableHeadStyle}>
                <Grid className={classes.gridStyle1} item xs={6}>
                    <Typography className={classes.typographyTableTitleStyle} variant="h4">Tambah Data Penyakit</Typography>
                </Grid>
                <Grid item xs={6}>
                    <img className={classes.imageStyle} src={transporting59}></img>
                </Grid>
            </Grid>
            <form className={classes.formStyle}>
                <div>
                    <TextField 
                    style={{marginBottom:"20px",marginTop:"20px"}}
                    label="penyakit" 
                    variant="filled"
                    name="penyakit"
                    value={inputGejalaBobots.penyakit}
                    onChange={event => handleChangeInput(event)}
                    />
                </div>
                {inputList.map((inputGejalaBobot,index)=>(
                    <div key={index}>
                        <TextField 
                        style={{marginRight:"10px", width:"900px",marginBottom:"20px"}}
                        label="gejala" 
                        variant="filled"
                        name="gejala"
                        value={inputGejalaBobot.gejalabobot}
                        onChange={event => handleInputChange(event,index)}
                        /> 
                        <Select
                            style={{marginLeft:"10px",marginBottom:"20px",width:"200px"}}
                            label="bobot" 
                            variant="filled"
                            name="bobot"
                            value={inputGejalaBobot.gejalabobot}
                            onChange={event => handleInputChange(event,index)}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>                        
                        <IconButton>
                            <RemoveIcon onClick={() => handleRemoveClick(index)}/>
                        </IconButton>
                        <IconButton>
                            <AddIcon onClick={() => handleAddClick()}/>
                        </IconButton>
                    </div>
                ))}
                {/* <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                onClick={handleSubmit}>Test</Button> */}
            </form>
            <Button className={classes.buttonStyle} variant="contained" color="primary" type="submit" value="Add" onClick={() => handlerSubmit()}>Tambah Data</Button>
        </div>
    )
}

export default TambahDataForm