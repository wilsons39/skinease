import React , {useState,useEffect} from 'react'
import {useHistory} from "react-router-dom"
import {TextField,IconButton,Button} from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import _ from 'lodash'
import axios from "axios"

const TambahDataForm = () => {

    const [inputGejalaBobots,setInputGejalaBobots] = useState ({})

    const [inputList, setInputList] = useState([{ gejala: "", bobot: 0 }]);
    const history = useHistory()

    useEffect(() => {
     _.assign(inputGejalaBobots,{ gejalabobot : inputList })
     console.log(inputGejalaBobots)
    },[inputList]);

    const handleChangeInput = (event) => {
     setInputGejalaBobots({ penyakit : event.target.value}) 
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
    }
  }

  const handleRemoveClick = index => {
    const list = [...inputList];
    if(list.length > 1){
        list.splice(index, 1);
        setInputList(list);
    }
  }

  const handlerSubmit = async () =>{
    await axios.post("https://skinease.herokuapp.com/v1/dataTraining/ptraining",inputGejalaBobots)
    alert("data berhasil diinput")
    history.push("/datatraining")
  }

    return(
        <div>
            <form onSubmit={() => handlerSubmit()}>
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
                        <TextField 
                        style={{marginLeft:"10px",marginBottom:"20px"}}
                        label="bobot" 
                        variant="filled"
                        name="bobot"
                        value={inputGejalaBobot.gejalabobot}
                        onChange={event => handleInputChange(event,index)}
                        />
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
            <input type="submit" value="Add" className="btn btn-primary" onClick={() => handlerSubmit()}/>
        </div>
    )
}

export default TambahDataForm