import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Интерфейс для значений, передаваемых в контексте
interface TokenContextProps {
    SPFtoken: string;
    setSPFToken: React.Dispatch<React.SetStateAction<string>>;
}

// Создаем сам контекст с начальным значением undefined
const TokenContext = createContext<TokenContextProps | undefined>(undefined);

interface TokenProviderProps {
    children: ReactNode;
}

const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
    const [SPFtoken, setSPFToken] = useState<string>('');

    const clientId = '587ef39d30644f2496f1b79fc46d86dd';
    const clientSecret = '86a77f2164eb4000a15bd2334c8e5f41';

    const getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Accept-Language': 'en-US',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
            },
            body: 'grant_type=client_credentials',
        });
        const data = await result.json();
        setSPFToken(data.access_token);
    };

    useEffect(() => {
        getToken();
    }, []);

    return (
        <TokenContext.Provider value={{ SPFtoken, setSPFToken }}>
            {children}
        </TokenContext.Provider>
    );
};

// Хук для доступа к значению токена
export const useToken = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error("useToken must be used within a TokenProvider");
    }
    return context;
};

export default TokenProvider;
