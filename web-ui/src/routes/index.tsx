import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Pages from '../pages';
import { Layout } from '../components';


type PropTypes = {
    children?: React.ReactNode;
}

const Routing = ({ children }: PropTypes) => {
    return (

        <Routes>
            <Route element={<Layout />}>
                <Route path={Pages.HomePage.route} element={<Pages.HomePage.Component />} />
            </Route>
            {children}
        </Routes>

    );
}

export default Routing;





