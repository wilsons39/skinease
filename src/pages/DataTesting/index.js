import React, {useEffect, useState} from 'react'
import {Table,TableBody,TableCell,TableContainer,
    TableHead,TableRow,Button,Checkbox,FormControlLabel,
    FormGroup,IconButton,Collapse,TextField,Box,
    Grid,Typography,Card,CardContent,makeStyles} from '@material-ui/core'
import axios from "axios"
import _ from "lodash" 
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import { AssignmentInd} from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment';
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
    searchStyle: {
        paddingTop: "10vh"
    },
    cardStyle: {
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        backgroundColor: "white",
        padding: "2vh"
    },
    tableContainerStyle: {
        marginTop: "5vh"
    },
    gridTableHeadStyle: {
        backgroundColor: "#282c34",
        marginTop: "5vh",
        padding: "3vh",
        color: "white"
    },
    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'white !important',
        color: "white"
    },
    cssFocused: {},
    cssLabel: {
        color : 'white'
    },
    cssOutlinedInput: {
        color: "white"
    },
    buttonStyle: {
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        marginTop: "2vh",
        marginBottom: "2vh",
        marginLeft: "2vh"
    },
    typographyNoteStyle: {
        marginBottom: "2vh"
    },
    imageStyle: {
        maxWidth: "200px"
    },
    typographyTableTitleStyle: {
        padding: "1vh"
    }
})



const DataTesting = () => {
    const [dataTrainings,setDataTraining] = useState([])
    const [dataTestings,setDataTesting] = useState([])
    const [newDataTestings , setNewDataTesting] = useState([])
    const [resultTestings, setResultTesting] = useState([])
    const [tampungHasil, setTampungHasil] = useState([])
    const [open, setOpen] = React.useState(false);
    const [querySearch, setQuerySearch] = useState("")
    const classes = useStyles()

    useEffect(() => {
        getDataTraining()
    }, [dataTrainings]);

    useEffect(()=> {
        
    },[newDataTestings])

    const getDataTraining = async () => {
        await axios.get("https://skinease.herokuapp.com/v1/dataTraining/training")
        .then(res => {
            setDataTraining(res.data.data)
        })
    }

    const showDataTesting = ()=> {
        function gejalaExist(gejala) {
            return dataTestings.some(function(el) {
              return el.gejala === gejala;
            }); 
        }
        let index = 0
        for(let i=0;i<dataTrainings.length;i++){
            for(let j=0;j<dataTrainings[i].gejalabobot.length;j++){
                index++
                var gejala = dataTrainings[i].gejalabobot[j].gejala
                var bobot = dataTrainings[i].gejalabobot[j].bobot
                if(gejalaExist(gejala) == false){
                    dataTestings.push({
                        checked : false,
                        id : index,
                        gejala : gejala,
                        bobot : bobot
                    })
                }
            }
        }
    }

    const handleInputChange = (event) => {
        let id = event.target.id;
        id = parseInt(id)
        let gejala = null
        let bobot = null
        let array = [...dataTestings]
        let array2 = [...newDataTestings]
        for(let i=0;i<array.length;i++){
            if(array[i].id === id){
                gejala = array[i].gejala
                bobot = array[i].bobot
                if(array[i].checked === true){
                    newDataTestings.push({
                        id : id,
                        gejala : gejala,
                        bobot : bobot
                    })
                    console.log("Data Tambah : ",newDataTestings)
                }else{
                    const list = [...array2]
                    console.log(list)
                    list.splice(parseInt(dataTestings.length)-(i+1),1)
                    setNewDataTesting(list);         
                }
            }
        }
    }

    const perhitungan = () => {
        let sama = 1
        let beda = 0
        let tampung = 0
        let tampung2 = 0
        let result = []
        console.log("new",newDataTestings)
        console.log("dataTraining",dataTrainings)
        let salah = 0
        let benar = 0
        setTampungHasil([])
        if(newDataTestings.length === 0){
            return alert("data gejala tidak boleh 0 (kosong)")
        }
        for(let l=0;l<newDataTestings.length;l++){ //inputan user
            for(let i=0;i<dataTrainings.length;i++){  //= 9
                for(let j=0;j<dataTrainings[i].gejalabobot.length;j++){
                    let condition = newDataTestings[l].gejala.split(" ").join("") === dataTrainings[i].gejalabobot[j].gejala.split(" ").join("")
                    console.log("1",condition,newDataTestings[l].gejala,dataTrainings[i].gejalabobot[j].gejala)
                    if(condition === true){
                        let formula = null
                        tampung = 0
                        tampung2 =0
                        benar = benar + 1
                        tampung = tampung + (newDataTestings[l].bobot * sama)
                        tampung2 = tampung2 + newDataTestings[l].bobot
                        formula = tampung / tampung2
                        console.log("formula",` ${tampung} + ${(newDataTestings[l].bobot * sama)}/${tampung2} + ${newDataTestings[l].bobot}`)
                        result.push({
                            formula : formula,
                            penyakit : dataTrainings[i].penyakit,
                            gejala : dataTrainings[i].gejalabobot[j].gejala,
                            bobot : dataTrainings[i].gejalabobot[j].bobot,
                            kondisi : newDataTestings[l].gejala === dataTrainings[i].gejalabobot[j].gejala,
                            total : tampung
                        })
                    }else if(condition === false){
                        let formula = null
                        tampung2 =0
                        salah = salah + 1
                        tampung = 0
                        tampung2 = tampung2 + newDataTestings[l].bobot
                        formula = tampung / tampung2
                        console.log("formula2",` ${tampung} + ${(newDataTestings[l].bobot * sama)}/${tampung2} + ${newDataTestings[l].bobot}`)
                        result.push({
                           
                            formula : formula,
                            penyakit : dataTrainings[i].penyakit,
                            gejala : dataTrainings[i].gejalabobot[j].gejala,
                            bobot : dataTrainings[i].gejalabobot[j].bobot,
                            kondisi : newDataTestings[l].gejala !== dataTrainings[i].gejalabobot[j].gejala,
                            total : tampung
                        })
                    }
                } 
            }
        }
        console.log("benar",benar)
        console.log("salah",salah)
        console.log("result : ",result)
        let finalResult = []
        let gejalaPembilang =[]
        result = _.chain(result)
        .groupBy("penyakit")
        .map((value, key) => ({ 
            penyakit: key,
            value: value
        })) 
        .value()
        console.log("result123 ",result)
        let tampungResult = [...result]
        let penyebut = dataTrainings
        let pembilang = tampungResult

        for(let i=0;i<pembilang.length;i++){
            pembilang[i].value = pembilang[i].value.filter(data => data.formula === 1)
        } 
        console.log("penyebut",penyebut)
        console.log("pembilang",pembilang)
        for(let i=0;i<pembilang.length;i++){
            let finalPenyebut = 0
            let finalPembilang = 0
            let finalDataTesting = [...newDataTestings]

            for(let j=0;j<penyebut[i].gejalabobot.length;j++){
                finalPenyebut = finalPenyebut + penyebut[i].gejalabobot[j].bobot
 
            }
            console.log("finalDataTesting",finalDataTesting)

            for(let l=0;l<pembilang[i].value.length;l++){
                finalPembilang = finalPembilang + pembilang[i].value[l].bobot
            }
            if(penyebut)
                finalResult.push({
                    pembilang : finalPembilang,
                    penyebut : finalPenyebut,
                    total : finalPembilang / finalPenyebut,
                    penyakit : pembilang[i].penyakit,
                    gejalaSama : pembilang[i].value,
                    gejalaPenyakit : penyebut[i].gejalabobot
                })
        }
        finalResult.sort((a,b) => (a.total < b.total) ?1 : -1)
        let dataIndex = []
        dataIndex.push(finalResult[0],finalResult[1],finalResult[2])
        setTampungHasil(dataIndex)
        console.log("gejalaPem",gejalaPembilang)
        console.log("test",finalResult)
        console.log("resultss : ",finalResult)
        console.log("dataTesting : ",dataTestings)
        console.log("dataTraining : ",dataTrainings)
        console.log("newDataTesting : ",newDataTestings)
    }

    function search(rows){
        return rows.filter((row)=> row.gejala.toLowerCase().indexOf(querySearch.toLowerCase())> -1)
    }

    return (
        <div className={classes.body} onLoad={showDataTesting()}>
            <Grid className={classes.containers} container>
                <Grid item xs={2}>
                    <img className={classes.imageStyle} src={reporting46}></img>
                </Grid>
                <Grid item xs={10}>
                    <Card className={classes.cardStyle}>
                        <CardContent>
                            <Typography className={classes.typographyNoteStyle} variant="h5">Note!!!</Typography>
                            <Typography variant="body1">
                                Semua gejala yang tersedia didapat dari gejala-gejala yang ada 
                                pada data penyakit yang telah di filter. 
                                Sehingga tidak ada gejala yang sama muncul lebih dari 1 kali
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container className={classes.gridTableHeadStyle}>
                    <Grid item xs={6}>
                        <Typography className={classes.typographyTableTitleStyle} variant="h4">Data Testing</Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <TextField                              
                        id="outlined-basic"
                        label="Search Gejala" 
                        variant="outlined"
                        name="Search"
                        type="search"
                        value ={querySearch}     
                        onChange = {(e) => setQuerySearch(e.target.value)}
                        InputLabelProps={{
                            classes: {
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                <SearchIcon />
                                </InputAdornment>
                            ),
                            }}
                        />
                    </Grid>
                </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                            {search(dataTestings).map((dataTesting,index)=>(
                                <div key={index}>
                                    <FormGroup>
                                        <FormControlLabel 
                                        control ={
                                            <Checkbox 
                                            color="primary"
                                            id = {dataTesting.id}
                                            checked={dataTesting.checked}
                                            onChange={event => {
                                                let checked  = event.target.checked
                                                let id = event.target.id
                                                id = parseInt(id)
                                                setDataTesting(
                                                    dataTestings.map(data => {
                                                        if(data.id === id){
                                                            data.checked = checked
                                                        }
                                                        return data
                                                    })
                                                )
                                                handleInputChange(event)
                                                }}
                                            />
                                        }
                                        label={dataTesting.gejala}
                                        value={dataTesting.gejala}
                                        // onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                            ))}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                {newDataTestings.map((newDataTesting,index)=>(
                                    <div key={index}>
                                        <p>- {newDataTesting.gejala}</p>
                                    </div>
                                ))}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button className={classes.buttonStyle} variant="contained" color="primary" type="submit" onClick={perhitungan}>Send</Button>
{/* -------------------------------------------------------------------------- */}
            <TableContainer>    
                <Table>     
                    <TableHead style={{backgroundColor:"#282c34"}}>             
                        <TableRow>
                            <TableCell component="th" scope="row" ></TableCell>
                            <TableCell style={{color:"white"}}>Penyakit</TableCell>
                            <TableCell style={{color:"white"}}>Gejala</TableCell>
                            <TableCell style={{color:"white"}}>Bobot Penyebut</TableCell>
                            <TableCell style={{color:"white"}}>Pembilang</TableCell>
                            <TableCell style={{color:"white"}}>Penyebut</TableCell>
                            <TableCell style={{color:"white"}}>Total</TableCell>
                        </TableRow>     
                    </TableHead>
                    {tampungHasil.map(final => (                   
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>
                            <TableCell>{final.penyakit}</TableCell>
                            <TableCell>
                                {final.gejalaPenyakit.map(finals =>(
                                    <div>
                                        -{finals.gejala}
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell>
                            {final.gejalaPenyakit.map(finals =>(
                                    <div>
                                        {finals.bobot}
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell>{final.pembilang}</TableCell>
                            <TableCell>{final.penyebut}</TableCell>
                            <TableCell>{final.total}</TableCell>
                        </TableRow>                    
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Gejala Sama</TableCell>
                                            <TableCell>Bobot Pembilang</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableCell>
                                            {final.gejalaSama.map(finalss => (
                                                <div>
                                                    -{finalss.gejala}
                                                </div>
                                            ))}
                                        </TableCell>
                                        <TableCell>
                                            {final.gejalaSama.map(finalss => (
                                                    <div>
                                                    {finalss.bobot}
                                                    </div>
                                            ))}
                                        </TableCell>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableBody>
                    ))}
                </Table>
            </TableContainer>
                    
                        
  
                        
                                  

            
        </div>
    )
}

export default DataTesting
