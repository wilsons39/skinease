import React , {useState,useEffect} from 'react'
import {useHistory} from "react-router-dom"
import {Button,TextField,IconButton,Grid,Card,CardContent,Typography,makeStyles,Select,MenuItem} from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import _ from 'lodash'
import axios from "axios"
import {reporting46} from '../../assets'

const useStyles = makeStyles({
    body : {
        paddingTop: "5vh",
        paddingBottom: "5vh"
    },
    containers: {
        paddingLeft: "5vh",
        paddingRight: "5vh"
    },
    imageStyle: {
        maxWidth: "200px"
    },
    cardStyle: {
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        backgroundColor: "white",
        padding: "2vh"
    },
    typographyNoteStyle: {
        marginBottom: "2vh"
    },
    gridTableHeadStyle: {
        backgroundColor: "#282c34",
        marginTop: "5vh",
        padding: "3vh",
        color: "white"
    },
    typographyTableTitleStyle: {
        padding: "1vh"
    },
    buttonStyle: {
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        marginTop: "2vh",
        marginBottom: "2vh",
        marginLeft: "2vh"
    },
    formStyle: {
        marginLeft: "2vh"
    }
})

const EditDataTraining = () => {
    const [dataTrainingsById,setDataTrainingById] = useState([])
    const [inputList, setInputList] = useState([])
    const [tampungEditPenyakit, setTampungEditPenyakit] = useState([])
    const [tampungEditGejalaBobot, setTampungEditGejalaBobot] = useState([{
        gejala : "",
        bobot : 0
    }])
    const history = useHistory()
    const classes = useStyles()

    useEffect(()=>{
        getDataTrainingById()
    },[])

    useEffect(()=>{
        // getDataTrainingById()
    },[])

    useEffect(() => {
        _.assign(tampungEditPenyakit,{ gejalabobot : tampungEditGejalaBobot })
       },[tampungEditGejalaBobot]);

    const getDataTrainingById = async () => {
        const path = window.location.pathname.split('/')
        const id = path[path.length - 1]
        await axios.get("https://skinease.herokuapp.com/v1/dataTraining/training/" + id)
        .then(res => {
            setDataTrainingById(res.data.data)
            setInputList(res.data.data.gejalabobot)
            setTampungEditPenyakit(res.data.data)
        })
    }
    
    const handlePenyakit = (event) => {
        // tampungEditPenyakit.penyakit = event.target.value
        // setTampungEditPenyakit({ penyakit : event.target.value}) 
        setTampungEditPenyakit({ gejalabobot: inputList, penyakit : event.target.value}) 
    }

    const handleGejalaBobot = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setTampungEditGejalaBobot(list);
    }

    const contoh = ()=>{
        console.log("dataTrainignsById : ",dataTrainingsById)
        console.log("inputList : ",inputList)
        console.log("tampungPenyakit : ",tampungEditPenyakit)
    }

    const handleAddClick = () => {
        setInputList([...inputList, { gejala: "", bobot: 0 }]);
      };
    
      const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        setTampungEditPenyakit({ gejalabobot: list, penyakit : tampungEditPenyakit.penyakit}) 
      };

      const handlerSubmit = async()=>{
        const path = window.location.pathname.split('/')
        const id = path[path.length - 1]
        console.log(tampungEditPenyakit)
        let req = {
            url : "https://skinease.herokuapp.com/v1/dataTraining/utraining/" + id,
            method: 'PUT',
            data: tampungEditPenyakit
          }
          axios(req).then(response => {
              console.log(response)
            // resolve(response.data.content)
          }, response => {
            
          })
        alert("data berhasil diedit")
        history.push("/datatraining")
      }

    return(
        <div className={classes.body}>
            <Grid className={classes.containers} container>
                <Grid item xs={2}>
                    <img className={classes.imageStyle} src={reporting46}></img>
                </Grid>
                <Grid item xs={10}>
                    <Card className={classes.cardStyle}>
                        <CardContent>
                            <Typography className={classes.typographyNoteStyle} variant="h5">Note!!!</Typography>
                            <Typography variant="body1">
                                Dilarang untuk mengubah penyakit, gejala, dan bobot dari data yang sudah valid.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container className={classes.gridTableHeadStyle}>
                <Grid item xs={6}>
                    <Typography className={classes.typographyTableTitleStyle} variant="h4">Edit Data Penyakit & Gejala</Typography>
                </Grid>
            </Grid>
            <form className={classes.formStyle}>
                <div>
                <TextField 
                    style={{marginBottom:"20px",marginTop:"20px"}}
                    label="penyakit" 
                    variant="filled"
                    name="penyakit"
                    value={tampungEditPenyakit.penyakit}
                    onChange={event => handlePenyakit(event)}
                    />
                </div>
                {inputList.map((dataGejalaBobot,index)=>(
                    <div key={index}>
                        <TextField 
                            style={{marginRight:"10px", width:"900px",marginBottom:"20px"}}
                            label="gejala" 
                            variant="filled"
                            name="gejala"
                            value={dataGejalaBobot.gejala}
                            onChange={event => handleGejalaBobot(event,index)}
                        />
                        <Select
                            style={{marginLeft:"10px",marginBottom:"20px",width:"200px"}}
                            label="bobot" 
                            variant="filled"
                            name="bobot"
                            value={dataGejalaBobot.bobot}
                            onChange={event => handleGejalaBobot(event,index)}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                        {/* <TextField 
                        style={{marginLeft:"10px",marginBottom:"20px"}}
                        label="bobot" 
                        variant="filled"
                        name="bobot"
                        value={dataGejalaBobot.bobot}
                        onChange={event => handleGejalaBobot(event,index)}
                        /> */}
                        <IconButton>
                            <RemoveIcon onClick={() => handleRemoveClick(index)}/>
                        </IconButton>
                        <IconButton>
                            <AddIcon onClick={() => handleAddClick()}/>
                        </IconButton>
                    </div>
                ))}
            </form>
            <Button className={classes.buttonStyle} variant="contained" color="primary" type="submit" value="Edit" onClick={()=> handlerSubmit()}>Edit</Button>
        </div>
    )
}

export default EditDataTraining