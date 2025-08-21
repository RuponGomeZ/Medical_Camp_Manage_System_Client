import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const PageTitle = ({ title }) => {
    useEffect(() => {
        if (typeof document !== 'undefined' && title) {
            document.title = title;
        }
    }, [title]);

    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

export default PageTitle;