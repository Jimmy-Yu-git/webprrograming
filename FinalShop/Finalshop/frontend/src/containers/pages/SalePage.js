import React, { useState, useEffect } from 'react';
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { Avatar, CardMedia } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { spacing } from '@material-ui/system';
import * as Constant from '../../constants/constant';
import MultiImageInput from 'react-multiple-image-input';
import useStyles from '../../assests/style/Style_sale';
import axios from '../../api';
import {v4} from 'uuid';




export default function NewSalePage({ userName, selectedRow, setItemEdit }) {
	console.log("sale")
	const id = v4();
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [item, setItem] = useState(selectedRow.productName || "");
	const [onSalePrice, setonSalePrice] = useState(selectedRow.onSalePrice || 0);
	const [originalPrice, setOriginalPrice] = useState(selectedRow.originalPrice || 0);
	const [address, setAddress] = useState(selectedRow.address || "");
	const [traderName, settradeName] = useState(selectedRow.traderName || userName);
	const [discription, setDiscription] = useState(selectedRow.discription || "");
	const [messages, setMessages] = useState('');

	var initdate;
	var initimages;
    if (selectedRow.img){
      initimages=selectedRow.img[0]
    }
    else{initimages={}}

	// var initimages;
	// if (selectedRow.imageUrl) {
	// 	initimages = selectedRow.imageUrl
	// }
	// else { initimages = {} }


	const dateNow = new Date(); // Creating a new date object with the current date and time
	const year = dateNow.getFullYear(); // Getting current year from the created Date object
	const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
	const month = // Setting current Month number from current Date object
		monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
			? `0${monthWithOffset}`
			: monthWithOffset;
	const date =
		dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
			? `0${dateNow.getUTCDate()}`
			: dateNow.getUTCDate();

	const materialDateInput = `${year}-${month}-${date}`; // combining to format for defaultValue or value attribute of material <TextField>


	if (selectedRow.expiredate) { initdate = selectedRow.expirationDate.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) }
	else { initdate = materialDateInput }
	const [expirationDate, setexpirationDate] = useState(initdate);
	const [quantity, setQuantity] = useState(selectedRow.quantity);
	const crop = {
		unit: '%',
		aspect: 4 / 4,
		width: '100'
	};





	const handleAdd = async () => {
		alert('商品上傳中，請稍等')
		const {
			data: { message, sellitem },
		} = await axios.post('/api/create-item', {
			item,
			onSalePrice,
			originalPrice,
			address,
			traderName,
			discription,
			expirationDate,
			quantity,
			images,
			userName,
			id
		});
		if (!sellitem) { setMessages(message); alert('新增錯誤：' + message) }
		else { setMessages(message); alert('新增商品: ' + message); setItemEdit(false) }

	};
	//const [images, setImages] = useState(selectedRow.imageUrl || "");
	const [images, setImages] = useState(initimages);
	const handleHookChange = (func) => (event) => {
		func(event.target.value);
	};
	const handleReg = (event) => {
		event.preventDefault();
		setItem("");
		setImages({});
		setQuantity(0);
		setAddress("");
		settradeName("");
		setonSalePrice(0);
		setOriginalPrice(0);
		setDiscription('');
		setexpirationDate(materialDateInput);

	};
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<>
	<Container component="main" maxWidth="xs">
			<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<FastfoodIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						上架商品
					</Typography>
					<form className={classes.form} onSubmit={handleReg}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="off"
									name="item"
									variant="outlined"
									required
									fullWidth
									id="item"
									label="商品名稱"
									autoFocus
									value={item}
									onChange={handleHookChange(setItem)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="quantity"
									label="數量"
									name="quantity"
									type="number"
									autoComplete="off"
									value={quantity}
									onChange={handleHookChange(setQuantity)}
								/>
							</Grid>
							{/* <Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="tradername"
									label="商家名稱"
									name="tradername"
									autoComplete="off"
									value={traderName}
									onChange={handleHookChange(settradeName)}
								/>
							</Grid> */}
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="off"
									name="originalprice"
									variant="outlined"
									required
									fullWidth
									id="originalprice"
									label="原價"
									autoFocus
									value={originalPrice}
									type='number'
									inputProps={{ min: 0 }}
									onChange={handleHookChange(setOriginalPrice)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="onsaleprice"
									label="特價"
									name="onsaleprice"
									autoComplete="off"
									type="number"
									inputProps={{ min: 0 }}
									value={onSalePrice}
									onChange={handleHookChange(setonSalePrice)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="address"
									label="商家地址"
									name="address"
									autoComplete="off"
									value={address}
									onChange={handleHookChange(setAddress)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="expiredate"
									label="賞味期限"
									type="expiredate"
									id="expiredate"
									autoComplete="off"
									type="date"
									value={expirationDate}
									onChange={handleHookChange(setexpirationDate)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="discription"
									label="商品描述"
									type="discription"
									id="discription"
									autoComplete="off"
									value={discription}
									onChange={handleHookChange(setDiscription)}
								/>
							</Grid>
						

						<Grid container>
							<Grid item>
								<Typography variant="h6">
									照片
								</Typography>
								<Typography variant="h7">
									第一張請放入商品照，第二張請放入商家照
								</Typography>
								<MultiImageInput
									max={2}
									images={images}
									setImages={setImages}
									cropConfig={{ crop, ruleOfThirds: true }}
								/>
								{/* <img src = {images}></img> */}
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="secondary"
							className={classes.submit}
							onClick={handleAdd}
						>
							送出
						</Button>
						</Grid>
					</form>

				</div>

				</Container>
		</>
	);
}