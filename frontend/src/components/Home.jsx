import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAllProductsQuery } from '../features/productsApi';

const Home = () => {
    const {data, error, isLoading} = useGetAllProductsQuery()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        dispatch({type: 'cart/addToCart', payload: product});
        navigate('/cart');
    };
    
    return (
        <div className="home-container">
            {isLoading && <h1>Loading...</h1>}
            {error && <h1>Error</h1>}
            {data && 
                <>
                    <h2>New Arrivals</h2>
                    <div className="products">
                        {data?.map(product =>
                        <div key={product.id} className="product">
                            <h3>{product.name}</h3>
                            <img src={product.image} alt={product.name} />
                            <div className="details">
                                <span>{product.desc}</span>
                                <span>${product.price}</span>
                            </div>
                            <button onClick={() => handleAddToCart(product)}>
                                Add to Cart
                            </button>
                        </div>
                        )}
                    </div>
                </>
            }
        </div>
    );
}
 
export default Home;