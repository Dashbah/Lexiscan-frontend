import {Link} from 'react-router-dom';

const SorryNotAuth = () => {
    return (
        <div className='sorry-not-auth'>
            <p>Sorry, you are not authorized...</p>
            <Link to='/login'>Please, go to a login page</Link>
        </div>
    );
};

export default SorryNotAuth;