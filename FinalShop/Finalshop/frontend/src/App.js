import './App.css';
import Homepage from './containers/pages/Homepage';
import FixedAppBar from './containers/FixedAppBar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from './containers/pages/Register';
import Login from './containers/pages/Login';
import { CssBaseline } from '@material-ui/core';
import useStyles from './assests/style/Style';
import GoogleMap from './containers/pages/GoogleMap';
import Item from './components/Item';
import myShop from './myShop';
import ProductDetail from './containers/pages/product_details/ProductDetail';
import * as Constant from './constants/constant'
import SalePage from './containers/pages/SalePage';
import MapContainer from './containers/pages/GoogleMap';
import IntroductionPage from './containers/pages/IntroductionPage';
import { useState } from "react";

function App() {
	const classes = useStyles();
	const [isLogin, setIsLogin] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [searchType, setSearchType] = useState(null);
	const [searchString, setSearchString] = useState('');
	const [user, setUser] = useState("");
	const [isManage, setManage] = useState(false);
	const [isSearch, setSearch] = useState(false);
	const loggedin = (e, user) => {
		setIsLogin(e)
		setUser(user)
		localStorage.setItem("username", user)
	}
	const setEdit = (e) => {
		setIsEdit(e)
	}
	const serachItem = (searchType, searchString) => {
		setSearchType(searchType);
		setSearchString(searchString);
	}
	const User = localStorage.getItem("username");
	//console.log(User);
	console.log(isEdit);

	return (
		<div className={classes.root}>
			<Router>
				<CssBaseline />
				<Switch>
					<Route exact path='/'><IntroductionPage /></Route>
					<Route exact path='/homepage'><FixedAppBar pageComponent={Homepage({isSearch,searchType,searchString,setSearch})} isLogin={isLogin} loggedin = {loggedin} searchType={searchType} searchString={searchString} serachItem={serachItem} setSearch={setSearch} user={user}></FixedAppBar></Route>
					<Route exact path='/register'><FixedAppBar pageComponent={<Register />}></FixedAppBar></Route>
					<Route exact path='/login'><FixedAppBar pageComponent={Login({loggedin,isLogin})} ></FixedAppBar></Route>
					<Route exact path='/my-shop'><FixedAppBar pageComponent={myShop({user,isSearch,searchType,searchString,setSearch})} isLogin={isLogin} loggedin = {loggedin} searchType={searchType} searchString={searchString} serachItem={serachItem} setSearch={setSearch} user={user}></FixedAppBar></Route>
					<Route exact path='/product-details/:id'><FixedAppBar pageComponent={<ProductDetail/>} isLogin={isLogin} loggedin = {loggedin} searchType={searchType} searchString={searchString} serachItem={serachItem} setSearch={setSearch} user={user}></FixedAppBar></Route>
					<Route exact path='/google-map'><FixedAppBar pageComponent={<MapContainer />} isLogin={isLogin} loggedin = {loggedin} searchType={searchType} searchString={searchString} serachItem={serachItem} setSearch={setSearch} user={user} /></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;

