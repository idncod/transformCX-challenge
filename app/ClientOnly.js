'use client';

import React, { useState, useEffect } from 'react';

const ClientOnly = ({ children }) => {
    const [clientReady, setClientReady] = useState(false);

    useEffect(() => {
        setClientReady(true);
    }, []);

    return clientReady ? <>{children}</> : null;
};

export default ClientOnly;
