
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { Avatar, CardMedia } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import MoreIcon from '@material-ui/icons/More';
import { Link } from 'react-router-dom';

// -----------------------------------------------------------------
// --------------------這頁直接全部複製就好---------------------------
// -----------------------------------------------------------------

const useStyle = makeStyles((thems) => ({
    card: {
        width: 250,
        height: 450,

    },
    media: {
        width: '100%',
        height: '50%',
        border :'double black'
    },
    button: {
        border: '1px solid',
        padding: 2,
        marginLeft: 10
    },
    header: {
        backgroundColor: '#EFFFD7',

    },
    box: {
        textAlign: 'center',
        fontSize: 15,
        width: '50%',
        height:'40px',
        lineHeight:'40px',
        fontWeight:600,
        fontFamily: 'Arial Black'
        },
    smallBox: {
        height: '30px',
        textAlign: 'center',
        width: '50%',
        fontSize:18,
        lineHeight:'30px'
    },
    info:{
        backgroundColor:'#EFFFD7'
    }
}))

const Item = ({ props }) => {
    const { id,productName, onSalePrice, address, imageUrl, avatarUrl, traderName, discription, expirationDate, quantity, } = props;
    const classes = useStyle();


    return (
        <>
            <Link></Link>
            <Card className={classes.card} >
                <CardHeader
                    className={classes.header}
                    avatar={<Avatar src={props.img[0]['1']} />}
                    action={
                        <Link to={`/product-details/${id}`} style={{ textDecoration: 'none' }} >
                            <IconButton >
                                <MoreIcon />
                            </IconButton>
                            
                        </Link>
                    }
                    title={productName}
                    subheader={traderName}
                    
                />
                <Grid  container direction='row' alignItems='center' justify='center' >
                    <Box className={classes.smallBox} style={{ backgroundColor: '#BBFFFF'}}>到期日</Box>
                    <Box className={classes.smallBox} style={{ backgroundColor: '#B9B9FF'}}>價格</Box>
                </Grid>
                <Grid container direction='row' alignItems='center' justify='center'>
                    <Box className={classes.box} style={{ backgroundColor: '#D9FFFF' }}>{expirationDate}</Box>
                    <Box className={classes.box} style={{ backgroundColor: '#DDDDFF' }}>{onSalePrice}</Box>
                </Grid>
                {/* <CardMedia className={classes.media} image={imageUrl} /> */}
                <CardMedia className={classes.media} ><img src={props.img[0]['0']} width="245" height="220"></img></CardMedia>
                <CardContent className={classes.info}>
                    <Typography variant="body2" component="p">
                        {address}
                    </Typography>
                </CardContent>
                <Grid className={classes.info} direction='row' spacing={2}>
                    <Button size="small" disabled={true} style={{ color: 'gray', fontSize: 8, marginLeft:15 }}>剩餘數量：{quantity}</Button>
                </Grid>


            </Card>
        </>
    );
}

export default Item;