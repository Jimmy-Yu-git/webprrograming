import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
import ProductInfoModel from './models/ProductInfo.js';
import testData from './constants.js';


const createTestModel = async (testData) => {
    if (!testData.length) throw new Error('Data not Exist');
    try {
        await testData.map((product) => {
            const newProduct = new ProductInfoModel({ ...product });
            return newProduct.save();
        });
    } catch (error) {
        throw new Error('Test Model Creation Error:' + e);
    }
}

const deleteTestModel = async () => {
    try {
        await ProductInfoModel.deleteMany({});
        console.log('Deleted successed');
    } catch (error) {
        throw Error(`When deleting test data: Error => ${error}`)
    }
}

function connectMongo() {

    dotenv.config();
    if (!process.env.MONGO_URL) {
        console.error('Missing Mongo url');
        process.exit(1);
    }



    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const db = mongoose.connection;

    db.on('error', () => console.error('Connect Error!'));
    db.once('open', () => {
        //deleteTestModel();
        //createTestModel(testData);
        console.log('Mongo Connected!')
    });

}

const mongo = {
    connect: connectMongo,
}

export default mongo;