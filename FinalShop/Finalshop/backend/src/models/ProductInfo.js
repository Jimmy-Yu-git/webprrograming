import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productInfoSchema = new Schema({
    productName: { type: String, required: true },
    address: { type: String, required: true },
    imageUrl: { type: String,  },
    avatarUrl: { type: String, },
    traderName: { type: String, required: true },
    discription: { type: String, },
    expirationDate: { type: String, required: true },
    onSalePrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    id: {type: String, },
    img:Array,
    lat:Number,
    log:Number,
    // lat:Number,
    // log:Number,
    // img: Array,
// Bonus information

// }, {
//     collection: 'ProductInfo',
//     timestamps: {
//         createdAt: 'created_at',
//         updatedAt: 'update_at',
//     }
}

);

const ProductInfoModel = mongoose.model('ProductInfo', productInfoSchema);

export default ProductInfoModel;