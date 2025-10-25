import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Country, AiIntensity } from '../types';
import { TRANSLATIONS } from '../../data';

type ActiveView = 'chats' | 'directory' | 'chronicle' | 'command';

interface SettingsContextValue {
    modalCountry: Country | null;
    setModalCountry: React.Dispatch<React.SetStateAction<Country | null>>;
    activeView: ActiveView;
    setActiveView: React.Dispatch<React.SetStateAction<ActiveView>>;
    isSettingsOpen: boolean;
    setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSummitModalOpen: boolean;
    setSummitModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isIntelModalOpen: boolean;
    setIntelModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    theme: 'dark' | 'light';
    setTheme: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
    language: 'en' | 'zh';
    setLanguage: React.Dispatch<React.SetStateAction<'en' | 'zh'>>;
    aiIntensity: AiIntensity;
    setAiIntensity: React.Dispatch<React.SetStateAction<AiIntensity>>;
    useGeminiAI: boolean;
    setUseGeminiAI: React.Dispatch<React.SetStateAction<boolean>>;
    t: Record<string, any>;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [modalCountry, setModalCountry] = useState<Country | null>(null);
    const [activeView, setActiveView] = useState<ActiveView>('command');
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const [isSummitModalOpen, setSummitModalOpen] = useState(false);
    const [isIntelModalOpen, setIntelModalOpen] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('light');
    const [language, setLanguage] = useState<'en' | 'zh'>('zh');
    const [aiIntensity, setAiIntensity] = useState<AiIntensity>('medium');
    const [useGeminiAI, setUseGeminiAI] = useState<boolean>(!!process.env.API_KEY);

    useEffect(() => { document.body.className = `theme-${theme}`; }, [theme]);
    
    const t = TRANSLATIONS[language];

    const value = {
        modalCountry, setModalCountry,
        activeView, setActiveView,
        isSettingsOpen, setSettingsOpen,
        isSummitModalOpen, setSummitModalOpen,
        isIntelModalOpen, setIntelModalOpen,
        theme, setTheme,
        language, setLanguage,
        aiIntensity, setAiIntensity,
        useGeminiAI, setUseGeminiAI,
        t,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettingsContext = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettingsContext must be used within a SettingsProvider');
    }
    return context;
};