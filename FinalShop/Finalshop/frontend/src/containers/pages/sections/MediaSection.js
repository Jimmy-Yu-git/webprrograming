import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './MediaSection.css';
import Grid from "@material-ui/core/Grid";
import Video from '../../../assests/video/appreciate.mp4';

const useStyle = makeStyles((theme)=>({
    link:{
        color: 'white',
        textDecoration: 'none',
        fontSize: 25,
        fontWeight: 600,
    },
    button:{
        backgroundColor: 'gray',
        marginTop: 10,
        marginLeft: 25,
        width: 150,
        fontSize: 15,
        borderRadius: 20,
        border: 'solid #4F4F4F',
        '&:hover':{
            backgroundColor: '#FF5809'
        }
    }
}));


function MediaSection() {
    const classes = useStyle();
    return (
        <div className='media-container'>
            <video src={Video} autoPlay loop muted />
            <h1>即期商品</h1>
            <p>東西快過期了怎麼辦？</p>
            <p>你找對地方了</p>
            <div>
                <Button className={classes.button}><Link className={classes.link} to='/homepage'>首頁</Link></Button>
                <Button className={classes.button}><Link className={classes.link} to='/register'>註冊</Link></Button>
                <Button className={classes.button}><Link className={classes.link} to='/login'>登入</Link></Button>
            </div>
        </div>
    );
}

export default MediaSection;