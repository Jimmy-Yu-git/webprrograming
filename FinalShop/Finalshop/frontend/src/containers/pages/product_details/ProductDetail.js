import React from 'react';
import { useState, useEffect } from "react";
import "./detail.css";
import Feature from './feature'
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from '@material-ui/core/styles';
import Ratings from "./rating";
import { Avatar, CardMedia } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import RoomIcon from '@material-ui/icons/Room';
import CallIcon from '@material-ui/icons/Call';
import { useParams } from "react-router";
import axios from '../../../api';
import Item from '../../../components/Item';
import * as Constant from '../../../constants/constant';

const Detail = () => {
    // just for test
    // TODO: need connect to backend
    const [detailInfo, setDetailInfo] = useState({})
    const [recommand, setRecommand] = useState([]);
    let id = useParams();
    useEffect(() => {
        fetchDetailInfos();
    }, []);

    // TODO: can change to Model.findById(_id)
    const fetchDetailInfos = async () => {
        console.log(id);
        try {
            const { data: { message, productInfo } } = await axios.get('/api/get-product-info', { params: id });
            const productInfoObject = JSON.parse(productInfo);
            console.log(message);
            setDetailInfo(productInfoObject);
        } catch (error) {
            throw Error(`When fetching detail information => Error: ${error}`);
        }
    }

    const fetchRecommandInfos = async (address, productName, traderName) => {
        let recommandItems = [];
        console.log(address);
        // XX區.....
        const district = address.slice(0, 3);
        // XX麵包 / XX蛋糕 / 兩個字的
        const productType = productName.slice(-2);
        // 店家名稱 連鎖店名--分店店名
        // e.g. 全聯--大安店
        let trader;
        if (traderName.includes('--')) {
            const re = /\s*--\s*/;
            let traderAndBranch = traderName.split(re);
            trader = traderAndBranch[0];
        } else trader = traderName;
        const recommandType = [productType, trader, district];
        const searchTypeIndex = ['productName', 'traderName', 'address'];
        for (let i=0;i<recommandType.length;i++){
            let searchType = searchTypeIndex[i];
            try {
                const { data: { productInfo } } = await axios.get(
                    '/api/get-product-info',
                    { params: { searchString: recommandType[i], searchType: searchType } }
                );
                const recommandItem = JSON.parse(productInfo)
                recommandItems.push(recommandItem[0]);
            } catch (error) {
                throw new Error('Error at get recommand items' + error);
            }
        }
        setRecommand(recommandItems);
    }


    const { productName, onSalePrice, originalPrice, address, imageUrl, avatarUrl, traderName, discription, expirationDate, quantity,img } = detailInfo;
    var test
    for (var x in img){
        test=img[x]
    }
    var imgarray=[]
    for (var c in test){
        imgarray.push(test[c])
    }

    

    const [quality, setQuality] = useState(0);
    const [cart, setCart] = useState(0);

    const theme = createMuiTheme({
        typography: {
            fontSize: 5,
        },
    });
    const productDiscountPrice = (onsale, origin) => {
        return `-${Math.round(((origin - onsale) * 100) / origin)}% off`;

    }
    const addCart = () => {
        let number = quality;
        number = cart + number
        setCart(number);
    }

    const StyledBadge = withStyles((theme) => ({
        badge: {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }))(Badge);
    const useStyle = makeStyles((thems) => ({
        card: {
            width: 300,
            height: 400,
            marginTop: 60,
            marginLeft: 110

        },
        media: {
            width: '100%',
            height: '100%',
        },
        button: {
            border: '1px solid',
            padding: 2,
            marginLeft: 80,
            marginTop: 40
        },
        button2: {
            border: '1px solid',
            padding: 2,
            marginLeft: 0,
            marginTop: 40
        },
        buttonview: {
            border: '1px solid',
            padding: 5,
            marginLeft: 37,
            color: "black",
            backgroundColor: '#F5FFFA',
            width: 175
        },
        box: {
            textAlign: 'center',
            fontSize: 18,
            width: '50%',
        },
        smallBox: {
            height: '100%',
            textAlign: 'center',
            width: '50%',
        },
        grid:{
            backgroundColor:'#C4E1FF',
            padding:20,

        },
        recommandButton:{
            width:'100%',
            fontSize:25,
            fontWeight:700,
            backgroundColor:'	#5A5AAD',
            '&:hover':{
                backgroundColor: '	#BB3D00'
            },
            color:'white',
            height:'70px'
        }
    }))
    const classes = useStyle();



    return (
        <>
            <div className="product-card bg-white">
                <Grid container direction='column' >
                    <Card className={classes.card}>
                        <CardHeader
                            className={classes.header}
                            avatar={<Avatar src={imgarray[1]} />}
                            action={
                                <IconButton aria-label="settings">
                                </IconButton>
                            }
                            title={productName}
                            subheader={traderName}
                        />
                        
                        <CardMedia className={classes.media} image={imgarray[0]}  />
                    </Card>
                </Grid>
                <div className="product-card-details">
                    <div className="product-title-container" >
                        <ThemeProvider theme={theme}>
                            <Typography variant="h1" component="h2">
                                {productName}
                            </Typography>
                        </ThemeProvider>

                    </div>
                    <div>

                        <span>
                            <span className="text-muted">Sold By : </span>
                            <span className="product-vendor">
                                {traderName}
                            </span>
                        </span>

                    </div>
                    <div>
                        <span>
                            <Ratings
                                ratings={3.5}
                                command={500}
                                containerClassName={"product-rating"}
                                fullStarIcon={"full-star-icon"}
                                halfStarIcon={"half-star-icon"}
                                emptyStarIcon={"empty-star-icon"}
                            />
                        </span>
                    </div>
                    <div className="product-price-container">
                        <span className="product-price">
                            {/* {this.currencyKeys.name}
                                        {productPrice(
                                            this.product.price,
                                            this.currencyKeys.value
                                        )} */}
                            NT $ {onSalePrice}

                        </span>

                        <span className="product-discount-price">
                            {/* {this.currencyKeys.name}
                                            {productPrice(
                                                this.product.discount_price,
                                                this.currencyKeys.value
                                            )} */}
                            $ {originalPrice}
                        </span>


                        <span className="product-percentage-discount">
                            {productDiscountPrice(
                                onSalePrice,
                                originalPrice
                            )}
                        </span>
                    </div>

                    <div className="product-features-container">
                        <div className="product-features">
                            <p className="product-features-title text-muted">
                                Features:
                            </p>
                            <div className="feature-fulfillmemt">
                                <Feature discription={discription} address={address}/>
                            </div>
                        </div>

                        <div className="product-features">
                            <p className="product-features-title text-muted">
                                ExpirationDate:
                            </p>
                            <p
                                className="feature-text feature-color" style={{textAlign:'center'}}
                            >
                                {expirationDate}
                            </p>
                            {/* <span
                                className="feature-text feature-color"
                            >
                                Amount : {quantity}
                            </span> */}
                        </div>

                        <div className="product-features">
                            <p className="product-features-title text-muted">
                                quantity:
                            </p><p className="product-features-title text-muted">{quantity}</p>
                            {/* <div className="product-quantity">

                                <Button
                                    aria-label="reduce"
                                    onClick={() => { (quality > 0) ? (setQuality(quality - 1)) : (setQuality(quality)) }}
                                >
                                    <RemoveIcon fontSize="small" />
                                </Button>
                                <input
                                    name="quantity"
                                    type="text"
                                    className="form-control"
                                    placeholder={quality}
                                ></input>
                                <Button
                                    aria-label="increase"
                                    onClick={() => { setQuality(quality + 1); }}
                                >
                                    <AddIcon fontSize="small" />
                                </Button>

                            </div> */}
                        </div>

                    </div>
                    {/*
                    <Grid container direction='row'>
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={cart} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                    </Grid>
                     <div className="mt-4">
                        <Button
                            variant="contained"
                            color="default"
                            // onClick = {() => { displayStatus({ type: "error", msg: "already add to cart",}) }}
                            // type="button"
                            className="btn btn-primary btn-block btn-lg"
                            onClick={() => { addCart() }}
                        // disabled={this.disableAddToCartButton()}
                        // onClick={this.handleAddToCart}
                        >
                            Add To Cart
                        </Button>
                    </div> */}
                </div>
            </div>
            <Button className={classes.recommandButton} onClick={() =>{ fetchRecommandInfos(address, productName, traderName)}}>點我看推薦</Button>
            <Grid container direction='row' justify='space-evenly' className={classes.grid}>
                      
                {recommand.map((item, index) => (
                    <Box >
                        <Item props={item} key={index} />
                    </Box>
                ))}
            </Grid>
        </>

    )

}
export default Detail;
