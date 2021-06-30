import { Router } from 'express';
import ProductInfoModel from '../../models/ProductInfo.js';
import Register from '../../models/Register.js';
const router = Router();
import {exec} from 'child_process'
//const exec = require('child_process').exec;

router.get('/get-product-info', async (req, res) => {
    try {
        console.log(req.query);
        const { id } = req.query;
        const { searchString, searchType } = req.query;
        // const searchString = '蛋';
        // const searchType = 'productName';
        const regexpString = new RegExp(searchString, "i");
        const successMessage = `Get Data Success`;
        let productInfo;
        // specific product info
        if (id) {
            productInfo = await ProductInfoModel.findOne({ id: id });
        }
        // search product info
        else if (searchString && searchType) {
            switch (searchType) {
                case 'productName':
                    productInfo = await ProductInfoModel.find({ productName: { $regex: regexpString } });
                    break;
                case 'traderName':
                    productInfo = await ProductInfoModel.find({ traderName: { $regex: regexpString } });
                    break;
                case 'address':
                    productInfo = await ProductInfoModel.find({ address: { $regex: regexpString } });
                case 'all':
                    productInfo = await ProductInfoModel.find({});
                default:

                    break;
            }
        }
        // all product info
        else {
            productInfo = await ProductInfoModel.find({});
        }

        res.status(200).send({ message: successMessage, productInfo: JSON.stringify(productInfo) })
    } catch (error) {
        console.error(`When Getting product information: Error => ${error}`)
        const failMessage = 'Get Data Failed';
        res.status(500).send({ message: failMessage })
    }
});
//*****************registered********************************** */
router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, username, email, password1, password2 } = req.body
        const Registers = new Register({ firstname, lastname, username, email, password1, password2 })
        const flagusername = await Register.find({ username: username });
        const flagemail = await Register.find({ email: email });
        let correct = 1;
        console.log(flagusername);
        console.log(flagemail);
        if (flagusername.length !== 0) res.send({ message: "Username have already being used" });
        if (flagemail.length !== 0) res.send({ message: "Email have already being used" });
        if (password1 !== password2) {
            res.send({ message: "Please check the comfirm Password" });
            correct = 0;
        }
        if (flagusername.length === 0 && flagemail.length === 0 && correct === 1) {
            await Registers.save();
            res.send({ message: "registration success" });
        }
    } catch (error) {
        console.error(`When Getting registration: Error => ${error}`)
        const failMessage = 'regist Failed';
        res.status(500).send({ message: failMessage })
    }
});

//****************logged in********************************** */
router.post('/login', async function (req, res) {
    try {
        const login = req.body;
        console.log(login)
        const account = login.data.username;
        const password = login.data.password;
        //const Login = new Register({firstname,lastname, username ,email,password1,password2});
        const flagAccount = await Register.find({ username: account });
        const flagPassword = await Register.find({ password1: password });
        const flag = await Register.find({ password1: password }, { username: account });
        console.log("11");
        console.log(flag);
        if (!flagAccount.length) await res.send({ message: 'account isnt exist' });
        if (flag.length) res.send({ message: 'welcome' });
        //await res.send({message:account});
        else res.send({ message: 'wrong password' })
    } catch (e) {
        res.send({ message: "something wrong in login ..." });
    }
})//*************************search-item-by-user********************************** */
router.post('/search-item-by-user', async function (req, res) {
    console.log(req.body);
    const { userName,searchString, searchType } = req.body;
    console.log("111")
    console.log(userName)
    console.log(searchString)
    const regexpString = new RegExp(searchString, "i");
    const successMessage = `Get Data Success`;
    let productInfo;
    // specific product info
    let existing = await ProductInfoModel.find({ traderName: userName });
    console.log(existing)
    if (existing.length) {
        try {
            if (searchString && searchType) {
                switch (searchType) {
                    case 'productName':
                        productInfo = await ProductInfoModel.find({ productName: { $regex: regexpString }, traderName: userName });
                        console.log("producname")
                        console.log(productInfo)
                        break;
                    case 'traderName':
                        productInfo = await ProductInfoModel.find({ traderName: { $regex: regexpString }, traderName: userName });
                        break;
                    case 'address':
                        productInfo = await ProductInfoModel.find({ address: { $regex: regexpString }, traderName: userName });
                    case 'all':
                        productInfo = await ProductInfoModel.find({ traderName: userName });
                    default:

                        break;
                }
                return res.send({ message: "searching", messages: productInfo });
            }
            console.log("exist")
            let response = '找到現有上架商品'
            res.send({ message: response, messages: existing })
            return existing;

        } catch (e) { throw new Error('can not search mongodb' + e); }
    };
    if (!existing.length) {
        try {
            //res.send({message:'新增物件中，請稍等，請勿關閉視窗'})
            let response = '現在無上架商品'
            res.send({ message: response })
            return response;
        } catch (e) { throw new Error('creation err' + e); }
    }
})
//***********************creste item************************* */
router.post('/create-item', async function (req, res) {
    try {

        const item1 = req.body['item'];
        const quantity1 = req.body['quantity'];
        const tradername1 = req.body['traderName'];
        const originalprice1 = req.body['originalPrice'];
        const onsaleprice1 = req.body['onSalePrice'];
        const address1 = req.body['address'];
        const expiredate1 = req.body['expirationDate'];
        const discription1 = req.body['discription'];
        const img1 = req.body['images']
        const username1 = req.body['userName']
        const id = req.body['id']
        var lat1;
        var log1;


        // ************Todo get map**********************
        function execCmd() {
            console.log('start')
           return new Promise(resolve=>{
           exec('python /碩一下/WPfinal-final/WPfinal-final/Finalshop/backend/src/routes/api/getGeocode.py '+ String(address1), function (error, stdout, stderr) {
               if(error){
                   console.log(error)
                   console.error('error: ' + error);
                   return;
               }
               [lat1,log1] = stdout.split(' ');
               resolve(lat1);

           })})
         }
        const existing = await ProductInfoModel.findOne({ productName: item1, address: address1 })
        if (existing) {
            try {



                // ************Todo get map**********************
                var x =await execCmd();
                console.log('finish execCmd')
                await ProductInfoModel.deleteOne(
                    { _id: existing._id }
                );
                console.log('finish await')
                console.log(expiredate1)
                const newItem = new ProductInfoModel({ productName: item1, quantity: quantity1, traderName: tradername1, originalPrice: originalprice1, onSalePrice: onsaleprice1, address: address1, expirationDate: expiredate1, discription: discription1,img:img1, lat: lat1, log: log1,id:id});
                console.log('replace', newItem)
                let response = '商品更新 (品項：' + item1 + ',數量：' + quantity1 + ',商家名稱：' + tradername1 + ')'
                res.send({ message: response, sellitem: newItem })
                return newItem.save();



            } catch (e) { 
                console.log(e)
                throw new Error('replace err' + e); }
        };
        if (!existing) {
            try {

                // ************Todo get map**********************
                var x =await execCmd();

                console.log(expiredate1)
                const newItem = new ProductInfoModel({
                    productName: item1, quantity: quantity1, traderName: tradername1,
                    originalPrice: originalprice1, onSalePrice: onsaleprice1, address: address1, expirationDate: expiredate1, discription: discription1, img:img1,lat: lat1, log: log1,id:id 
                });
                console.log('created item', newItem);
                let response = '已新增 (品項：' + item1 + ',數量：' + quantity1 + ',商家名稱：' + tradername1 + ')'
                res.send({ message: response, sellitem: newItem })
                return newItem.save();
            } catch (e) { 
                console.log(e)
                throw new Error('creation err' + e); }
        }
      
    } catch (e) {
        res.json({ message: 'Something went wrong...' });
    }
});
//***************************deleted item***************************************** */
router.post('/delete-item', async function (req, res) {
    try {
        console.log(req.body);
        const tradername1 = req.body['tradername'];
        const item1 = req.body['item'];
        console.log(tradername1)
        console.log(item1)
        await ProductInfoModel.deleteOne({ traderName: tradername1, productName: item1 });
        res.send({ message: '刪除商品' })

    } catch (e) {
        res.json({ message: 'Something went wrong in create item.....' });
    }

});

router.post('/get-item',async function (req, res){

    try{
      
      const existing =await ProductInfoModel.find();
      if(existing.length!=0){
        console.log(existing)
        res.send({messages:existing,message:'找到商品'})
      }
      if(existing.length===0){
        console.log('no')
        res.send({message:'現在沒有即期商品'})
      }
  
    }catch(e){
      res.json({message:'Something went wrong.....'});
    }
  })

export default router;

