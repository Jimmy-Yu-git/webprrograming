import {
    LocalShipping,
    International,
    Warehouse,
    DukaApproved,
} from "./icons";
const feature = ({discription,address}) => {
    return (
        <>
            <span className="shop-card-product-features" title="Duka Aproved">
                <DukaApproved />
                <span className="feature-text">{discription}</span>
            </span>

            <span className="shop-card-product-features" title="Fullfiled By Duka">
                <Warehouse />
                <span className="feature-text">{address}</span>
            </span>

            <span className="shop-card-product-features" title="International Shipping">
                <International />
                <span className="feature-text">Shipped in 24 hours</span>

            </span>

            <span className="shop-card-product-features" title="Local Shipping">
                <LocalShipping />               
                   <span className="feature-text">Local Shippping</span>
            </span>

        </>
    )
}
export default feature;