
import {v4} from 'uuid';

const testData = [
    {
        productName: '麵包',
        onSalePrice: 15,
        originalPrice: 25,
        address: '中正區林森南路53號',
        imageUrl: 'https://cf.shopee.tw/file/61131e2b2a6e041f0ef9e079f75ca669',
        avatarUrl: 'https://www.brandinlabs.com/wp-content/uploads/2021/04/%E6%96%B0LOGO%E7%B4%B0%E7%AF%80-2.png',
        traderName: '7-11台大門市',
        discription: '暫無',
        expirationDate:'05/27',
        quantity:9,
        img:[{0:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgI..."
            ,1:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgI..."}],
        id:v4()
    },
    {
        productName: '蛋糕',
        onSalePrice: 40,
        originalPrice: 80,
        address: '大安區基隆路三段85號',
        imageUrl: 'https://www.starbucks.com.tw/common/objects/images/cake/20160811172659402.jpg',
        avatarUrl: 'http://pic.pimg.tw/ste06192003/48d4b0919c0d4.jpg',
        traderName: '星巴克長興門市',
        discription: '暫無',
        expirationDate:'05/26',
        quantity:2,
        img:[{0:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgI..."
            ,1:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgI..."}],
        id:v4()
    },
    {
        productName: '土鳳梨酥',
        onSalePrice: 10,
        originalPrice: 25,
        address: '松山區民生東路五段36巷4弄1號',
        imageUrl: 'https://www.sunnyhills.com.tw/Upload/zh-tw/images/index190524103905923.jpg',
        avatarUrl: 'https://cdn.shopify.com/s/files/1/0325/4825/7931/collections/938e7328fe22d0cb01b6ca012a20777d_1024x.png?v=1601951201',
        traderName: '台北民生公園門市',
        discription: '暫無',
        expirationDate:'05/25',
        quantity:25,
        img:[{0:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgI..."
            ,1:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgI..."}],
        id:v4()
    },
    {
        productName: '鮮乳',
        onSalePrice: 43,
        originalPrice: 86,
        address: '大安區復興南路二段237號',
        imageUrl: 'https://www.happy-shopping.tw/img/product/7/1806110001_Pic.jpg',
        avatarUrl: 'https://img.apksum.com/31/com.pxmart.android/6.1.4/icon.png',
        traderName: '全聯大安店',
        discription: '暫無',
        expirationDate:'05/25',
        quantity:6,
        img:[{0:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgI..."}],
        id:v4()
    },
    {
        productName: '麵包',
        onSalePrice: 25,
        originalPrice: 50,
        address: '中正區衡陽路36號',
        imageUrl: 'http://ibw.bwnet.com.tw/image/pool/2015/05/cefaa775c9c828631931e3e608dcc7d7.jpg',
        avatarUrl: 'https://png.pngtree.com/png-clipart/20200722/original/pngtree-fruit-store-logo-design-vector-fruit-and-pinned-symbol-icon-png-image_4968572.jpg',
        traderName: '農林水果行',
        discription: '暫無',
        expirationDate:'05/25',
        quantity:2,
        img:[{0:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgI..."}],
        id:v4()
    }
];

export default testData;