import React, { Component } from 'react'
import axios from "axios"
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button} from "@material-ui/core"
import {Link} from "react-router-dom"

import TableTraining from './TableTraining'
// import EditTraining from './editTraining'

export class DataTraining extends Component{
    state = {
        dataTraining : [],
    }

    componentDidMount = async ()=>{
        await axios.get("https://skinease.herokuapp.com/v1/dataTraining/training")
        .then(res => this.setState({
            dataTraining : res.data.data,
        }))
        console.log(this.state.dataTraining)
    }

    render() {
        const renderData = this.state.dataTraining.map(dataTraining=>{
            return (
                <TableBody>
                    <TableTraining dataTraining={dataTraining} key={dataTraining._id} refresh={this.componentDidMount} />
                </TableBody>
            )
        })

        return (
            <div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Penyakit</TableCell>
                                <TableCell>Gejala</TableCell>
                                <TableCell align ="center" colSpan={2}>Aksi</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        {renderData}
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default DataTraining