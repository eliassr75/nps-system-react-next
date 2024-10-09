import React, { createContext, useContext, useState } from 'react';

const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
    const [survey, setSurvey] = useState(null);
    
    return (
        <SurveyContext.Provider value={{ survey, setSurvey }}>
            {children}
        </SurveyContext.Provider>
    );
};

export const useSurvey = () => {
    return useContext(SurveyContext);
};