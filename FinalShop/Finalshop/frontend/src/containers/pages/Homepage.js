import React, { useEffect, useState } from 'react';

import * as Constant from '../../constants/constant';
import Item from '../../components/Item';
import Box from '@material-ui/core/Box';

import Grid from "@material-ui/core/Grid";
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from '../../api';
import { useLocation } from "react-router";



export default function HomePage({ isSearch, searchType, searchString ,setSearch}) {
    const [productInfos, setProductInfos] = useState([]);
    // let location = useLocation();
    // console.log(location);
    useEffect(() => {
        fetchProductInfos();
        
    }, [])

    const fetchProductInfos = async (searchType, searchString) => {
        try {
            let queryParams = {};
            if (searchType && searchString) queryParams = { searchString: searchString, searchType: searchType };
            console.log(queryParams);
            const { data: { message, productInfo } } = await axios.get('/api/get-product-info', { params: queryParams });
            let productInfoObject = JSON.parse(productInfo);
            console.log(message);
            //console.log(productInfoObject);
            setProductInfos(productInfoObject);
        } catch (error) {
            throw Error('When fetching product info => Error ' + error);
        }
    };
    //handle searching
    useEffect(() => {
        fetchProductInfos(searchType, searchString);
        console.log("searching");
        setSearch(false)
    }, [searchType])
    // if (isSearch) {
    //     fetchProductInfos(searchType, searchString);
    //     console.log("searching");
    //     setSearch(false)

    // }
    //handle searching


    return (
        <Grid container direction='row'>

            {productInfos.map((item, index) => (

                <Box mt={8} mx={2} >
                    <Item props={item} key={index} />
                </Box>

            ))}

        </Grid>
    );
}