import React , {useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {useHistory} from "react-router-dom"
import {TextField,IconButton,Button} from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import _ from 'lodash'
import axios from "axios"

const EditDataTraining = () => {

    const [dataTrainingsById,setDataTrainingById] = useState([])
    const [inputList, setInputList] = useState([])
    const [tampungEditPenyakit, setTampungEditPenyakit] = useState([])
    const [tampungEditGejalaBobot, setTampungEditGejalaBobot] = useState([{
        gejala : "",
        bobot : 0
    }])
    const history = useHistory()

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
        <div>
            <form>
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
                        <TextField 
                        style={{marginLeft:"10px",marginBottom:"20px"}}
                        label="bobot" 
                        variant="filled"
                        name="bobot"
                        value={dataGejalaBobot.bobot}
                        onChange={event => handleGejalaBobot(event,index)}
                        />
                        <IconButton>
                            <RemoveIcon onClick={() => handleRemoveClick(index)}/>
                        </IconButton>
                        <IconButton>
                            <AddIcon onClick={() => handleAddClick()}/>
                        </IconButton>
                    </div>
                ))}
            </form>
            <input value="Edit" onClick={()=> handlerSubmit()}/> 
        </div>
    )
}

export default EditDataTraining