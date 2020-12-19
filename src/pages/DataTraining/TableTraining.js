import React from 'react'
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button} from "@material-ui/core"
import {Link} from "react-router-dom"
import axios from "axios"
import {confirmAlert} from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"

function TableTraining({dataTraining,refresh}) {

    async function deleteProduk(){
        await axios.delete("http://localhost:4000/v1/dataTraining/dtraining/" + dataTraining._id)
        return refresh()
    }

    function deleteConfirm(){
        confirmAlert({
            title : "Delete Data Training",
            message : "Yakin ingin menghapus data training dengan nama penyakit " + dataTraining.penyakit + " ?",
            buttons : [
                {
                    label : "Delete",
                    onClick : () => deleteProduk()
                },
                {
                    label : " Tidak",
                    onClick : () => {}
                }
            ]
        })
    }

    function gejalaBobotJoin(){
        return (
            dataTraining.gejalabobot.map((gejalabobot,index) =>(
                <div key={index}>
                    <p>- {gejalabobot.gejala}</p>
                </div>
            ))
        )
    }

    function numberGenerate(){
        
    }

    return (
        <TableRow key={dataTraining._id}>
            <TableCell>{dataTraining._id}</TableCell>
            <TableCell>{dataTraining.penyakit}</TableCell>
            <TableCell>{gejalaBobotJoin()}</TableCell>
            <TableCell>
                
                <Link to={"/edit/" + dataTraining._id}>
                    <Button variant="contained" color="primary">Edit</Button>
                </Link>
            </TableCell>
            <TableCell> 
                <Button variant="contained" color="secondary" onClick={deleteConfirm}>Delete</Button>
            </TableCell>
        </TableRow>
    )
}


export default TableTraining

// + dataTraining._id