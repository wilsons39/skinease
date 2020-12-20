import React from 'react'
import {happy29} from '../../assets'
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"
import {makeStyles,Grid,Paper,Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      halooo : {
          color: "#1ACEBD",
          textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          marginTop: "40px",
          marginLeft: "100px",
          zIndex: 1,
          position: "absolute"
      },
      flatIllustration: {
          marginTop:"40px",
          marginLeft:"30px"
      },
      selamatDatang: {
        color: "#FBC02D",
        textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        marginTop: "15vh",
        marginLeft: "5vh"
      },
      bodySelamatStyle: {
          borderRadius: "20px",
          boxShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          padding: "50px",
          marginTop: "8vh",
          marginLeft: "5vh",
          color: "white",
          textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          backgroundColor: "#282c34"
      }
}));

const Home = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <Grid className={classes.selamatDatang} item xs={12}>
                        <Typography variant="h2">Selamat Datang di Skinease</Typography>
                    </Grid>
                    <Grid className={classes.bodySelamatStyle} item xs={12}>
                        <Typography variant="h5">
                            Skinease adalah website<br />
                            yang dapat digunakan untuk <br />
                            mendeteksi penyakit kulit melaui gejala <br />
                            yang diinputkan oleh user pada tab DataTesting 
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.halooo} variant="h2" gutterBottom>
                        Halooo
                    </Typography>
                    <img className={classes.flatIllustration} src={happy29}></img>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home
