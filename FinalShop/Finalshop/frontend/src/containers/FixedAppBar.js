// import clsx from 'clsx';
// import * as Constant from '../constants/constant';
// import Drawer from '@material-ui/core/Drawer';
// import Grid from '@material-ui/core/Grid';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';

// import Typography from '@material-ui/core/Typography';

// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

// import TextField from '@material-ui/core/TextField';
// import Button from "@material-ui/core/Button";
// import { useTheme } from '@material-ui/core/styles';
// import useStyles from '../assests/style/Style.js';
// import { useState } from 'react';
// import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import { Link } from "react-router-dom";

// const FixedAppBar = ({pageComponent}) => {

//     const classes = useStyles();
//     const theme = useTheme();
//     const [open, setOpen] = useState(false);

//     const handleDrawerOpen = () => {
//         setOpen(true);
//     };

//     const handleDrawerClose = () => {
//         setOpen(false);
//     };

//     return (
//         <>
//             <AppBar
//             style={{backgroundColor:'#4F4F4F'}}
//                 position="fixed"
//                 className={clsx(classes.appBar, {
//                     [classes.appBarShift]: open,
//                 })}
//             >
//                 <Toolbar>
//                     <IconButton
//                         color="inherit"
//                         aria-label="open drawer"
//                         onClick={handleDrawerOpen}
//                         edge="start"
//                         className={clsx(classes.menuButton, open && classes.hide)}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography variant="h6" noWrap>
//                         {Constant.appName}
//                     </Typography>

//                     {/* <TextField
//                         variant='outlined'
//                         type='search'
//                         color='secondary'
//                         placeholder='想要吃甚麼呢?'
//                         size='small'
//                         fullWidth
//                         disabled={false}
//                         className={classes.textfield}
//                     ></TextField> */}
//                     <Grid  direction='row' className={classes.appbar} >
//                         {Constant.appBarList.map((text, index) => (
//                             <Link to={Constant.appBarListRoute[index]} key={index} style={{ textDecoration: 'none' }}>
//                                 <Button
//                                     startIcon={Constant.appBarListIcon[index]}
//                                     style={{ color: 'white' }}
//                                 >
//                                     {text}
//                                 </Button>
//                             </Link>
//                         ))}
//                     </Grid>
//                 </Toolbar>
//             </AppBar>
//             <Drawer
//                 className={classes.drawer}
//                 variant="persistent"
//                 anchor="left"
//                 open={open}
//                 classes={{
//                     paper: classes.drawerPaper,
//                 }}
//             >
//                 <div className={classes.drawerHeader}>
//                     <IconButton onClick={handleDrawerClose}>

//                         {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//                     </IconButton>
//                 </div>
//                 <Divider />
//                 <List>
//                     {Constant.menuList.map((text, index) => (
//                         <Link to={Constant.menuListRoute[index]} key={index} style={{ textDecoration: 'none' }}>
//                             <ListItem button key={text}>
//                             <ListItemIcon>{Constant.menuListIcon[index]}</ListItemIcon>
//                             <ListItemText primary={text} />
//                             </ListItem>
//                         </Link>

//                     ))}
//                 </List>
//             </Drawer>
//             <main
//                 style={{ backgroundColor: '#D0D0D0' }}
//                 className={clsx(classes.content, {
//                     [classes.contentShift]: open,
//                 })}
//             >
//             {pageComponent}
//             </main>
//         </>
//     );
// }

// export default FixedAppBar;
import clsx from 'clsx';
import * as Constant from '../constants/constant';
import * as ConstantLogout from '../constants/cosntantLogout'
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { useTheme } from '@material-ui/core/styles';
import useStyles from '../assests/style/Style.js';
import { useRef, useState } from 'react';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Link } from "react-router-dom";

const FixedAppBar = ({ pageComponent, isLogin, loggedin, serachItem, searchType, searchString, setSearch, user }) => {
    console.log(isLogin)
    console.log(user)
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = (e) => {
        console.log(e.currentTarget.value);
        if (e.currentTarget.value === "0") {
            alert("logout")
            loggedin(false, null);
        }
    };

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter' && searchString) {
            console.log(searchType, searchString);
            setSearch(true);
        }
    }
    const handleClickSearch = () => {
        if (searchString) {
            console.log(searchType, searchString);
            setSearch(true);
        }
        if (searchType === "all") {
            serachItem(searchType, "all")
            setSearch(true);
        }
    }
    return (
        <>
            <AppBar
                style={{ backgroundColor: '#4F4F4F' }}
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {Constant.appName}
                    </Typography>

                    <TextField
                        variant='outlined'
                        type='search'
                        color='secondary'
                        placeholder='想要吃甚麼呢?'
                        size='small'
                        fullWidth
                        className={classes.textfield}
                        onChange={(e) => serachItem(searchType, e.target.value)}
                        onKeyDown={handleEnterSearch}
                    ></TextField>
                    {/*                    searching function */}
                    <Select className={classes.select} value={searchType} onChange={(e) => serachItem(e.target.value, searchString)}>
                        <MenuItem value='productName'>商品</MenuItem>
                        <MenuItem value='traderName'>店家</MenuItem>
                        <MenuItem value='address'>地址</MenuItem>
                        <MenuItem value='all'>ALL</MenuItem>
                    </Select>
                    <Button className={classes.searchButton} onClick={handleClickSearch} startIcon={<SearchIcon style={{ color: 'white' }} />}>搜尋</Button>
                    {/*                    searching function */}

                    <Grid direction='row' className={classes.appbar} >
                        {isLogin === true ? (ConstantLogout.appBarList.map((text, index) => (

                            <Link to={ConstantLogout.appBarListRoute[index]} key={index} style={{ textDecoration: 'none' }}>
                                <Button
                                    value={index}
                                    startIcon={ConstantLogout.appBarListIcon[index]}
                                    style={{ color: 'white' }}
                                    onClick={(e) => { handleLogout(e) }}
                                >
                                    {text}
                                </Button>
                            </Link>

                        ))) : (Constant.appBarList.map((text, index) => (
                            <Link to={Constant.appBarListRoute[index]} key={index} style={{ textDecoration: 'none' }}>
                                <Button
                                    value={index}
                                    startIcon={Constant.appBarListIcon[index]}
                                    style={{ color: 'white' }}
                                >
                                    {text}
                                </Button>
                            </Link>
                        )))}
                        <Button
                            startIcon={Constant.appBarListIcon[1]}
                            style={{ color: 'white' }}>
                            {user}
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>

                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {isLogin === true ? (ConstantLogout.menuList.map((text, index) => (
                        <Link to={ConstantLogout.menuListRoute[index]} key={index} style={{ textDecoration: 'none' }}>
                            <ListItem button key={text}>
                                <ListItemIcon>{ConstantLogout.menuListIcon[index]}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>

                    ))) : (Constant.menuList.map((text, index) => (
                        <Link to={Constant.menuListRoute[index]} key={index} style={{ textDecoration: 'none' }}>
                            <ListItem button key={text}>
                                <ListItemIcon>{Constant.menuListIcon[index]}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>)))}
                </List>
            </Drawer>
            <main
                style={{ backgroundColor: '#D0D0D0' }}
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                {pageComponent}
            </main>
        </>
    );
}

export default FixedAppBar;