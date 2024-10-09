import React, { createContext, useContext, useState } from 'react';

const EntityContext = createContext();

export const EntityProvider = ({ children }) => {
    const [entity, setEntity] = useState(null);

    return (
        <EntityContext.Provider value={{ entity, setEntity }}>
            {children}
        </EntityContext.Provider>
    );
};

export const useEntity = () => {
    return useContext(EntityContext);
};
