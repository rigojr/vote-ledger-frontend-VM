import React from 'react';

import Aux from '../../hoc/Aux';
import Footer from './Footer/Footer'

const Layout = (props) => (
         
    <Aux>
        <div>
            { props.children }
        </div>
        <Footer />
    </Aux>
);
       
export default Layout;