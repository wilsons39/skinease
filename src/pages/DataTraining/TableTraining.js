import React from 'react'
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button} from "@material-ui/core"
import {Link} from "react-router-dom"
import axios from "axios"
import {confirmAlert} from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"

function TableTraining({dataTraining,refresh}) {

    async function deleteProduk(){
        await axios.delete("https://skinease.herokuapp.com/v1/dataTraining/dtraining/" + dataTraining._id)
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

    function showButton(){
        if(dataTraining.penyakit === "Tinea Versikolor (Panu)" ||
        dataTraining.penyakit === "Tinea Nigra Palmaris" ||
        dataTraining.penyakit === "Tinea Kapitis Gray Patch Ring worm" ||
        dataTraining.penyakit === "Tinea Kapitis Black Dot Ring Worm" ||
        dataTraining.penyakit === "Tinea Kapitis Kerion" ||
        dataTraining.penyakit === "Tinea Kapitis Favosa" ||
        dataTraining.penyakit === "Tinea Barbae & Sikosis Barbae" ||
        dataTraining.penyakit === "Tinea Korporis" ||
        dataTraining.penyakit === "Fikomikosis Subkutis"){
            return (
                <div>

                </div>
            )
        }else{
            return (
                <div>
                    <TableCell>
                        <Link to={"/edit/" + dataTraining._id}>
                            <Button variant="contained" color="primary">Edit</Button>
                        </Link>
                    </TableCell>
                    <TableCell> 
                        <Button variant="contained" color="secondary" onClick={deleteConfirm}>Delete</Button>
                    </TableCell>
                </div>
            )
        }
    }

    return (
        <TableRow key={dataTraining._id}>
            <TableCell>{dataTraining.penyakit}</TableCell>
            <TableCell>{gejalaBobotJoin()}</TableCell>
            {showButton()}
        </TableRow>
    )
}


export default TableTraining

// + dataTraining._id