

import React from 'react';
import { Header } from './src/components/Header';
import { NavColumn } from './src/components/NavColumn';
import { ListViewColumn } from './src/components/ListViewColumn';
import { ChatWindow } from './src/components/ChatWindow';
import { CountryProfileModal } from './src/components/modals/CountryProfileModal';
import { SettingsModal } from './src/components/modals/SettingsModal';
import { HostSummitModal } from './src/components/modals/HostSummitModal';
import { LeakIntelModal } from './src/components/modals/LeakIntelModal';
import { useAppContext } from './src/context/AppContext';
import { useSimulation } from './src/hooks/useSimulation';

export const App = () => {
    const {
        // State
        countries,
        chats,
        activeChatId,
        messages,
        modalCountry,
        activeView,
        isSettingsOpen,
        isSummitModalOpen,
        isIntelModalOpen,
        theme,
        language,
        aiIntensity,
        useGeminiAI,
        unreadCounts,
        t,
        activeChat,
        simulationSpeed,
        isPaused,
        pausedChatIds,
        closedNewsItems,

        // Actions
        setActiveView,
        setModalCountry,
        setSettingsOpen,
        setSummitModalOpen,
        setIntelModalOpen,
        handleSelectChat,
        handleClosePrivateChat,
        handleReorderChats,
        handleStartPrivateChat,
        handleSendMessage,
        handlePostNewsEvent,
        handleHostSummit,
        handleLeakIntel,
        setTheme,
        setLanguage,
        setAiIntensity,
        setUseGeminiAI,
        setSimulationSpeed,
        togglePause,
        stopAllAiResponses,
        toggleChatPause,
        stopAiResponsesForChat,
        closeNewsItem,
    } = useAppContext();

    // Initialize the autonomous AI action simulation loop
    useSimulation();
    
    const handleAvatarClick = (countryId: string) => {
        if (countries[countryId]) {
            setModalCountry(countries[countryId]);
        }
    }

    return (
        <>
            <Header onSettingsClick={() => setSettingsOpen(true)} />
            <NavColumn activeView={activeView} onSelectView={setActiveView} t={t} />
            <ListViewColumn
                activeView={activeView} chats={chats} countries={countries} activeChatId={activeChatId}
                unreadCounts={unreadCounts} onSelectChat={handleSelectChat}
                onSelectCountry={(countryId) => setModalCountry(countries[countryId])}
                onCloseChat={handleClosePrivateChat} onReorderChats={handleReorderChats}
                pausedChatIds={pausedChatIds} onToggleChatPause={toggleChatPause}
                onStopChatResponses={stopAiResponsesForChat}
            />
            <ChatWindow
                key={activeChatId} chat={activeChat} countries={countries}
                messages={messages}
                onSendMessage={handleSendMessage}
                onPostNewsEvent={handlePostNewsEvent}
                onOpenSummitModal={() => setSummitModalOpen(true)}
                onOpenIntelModal={() => setIntelModalOpen(true)}
                simulationSpeed={simulationSpeed}
                onSimulationSpeedChange={setSimulationSpeed}
                isPaused={isPaused}
                onTogglePause={togglePause}
                onStopSimulation={stopAllAiResponses}
                onAvatarClick={handleAvatarClick}
                closedNewsItems={closedNewsItems}
                onCloseNewsItem={closeNewsItem}
            />
            {modalCountry && <CountryProfileModal country={modalCountry} onClose={() => setModalCountry(null)} onStartChat={() => handleStartPrivateChat(modalCountry.id)} t={t} />}
            {isSettingsOpen && <SettingsModal 
                onClose={() => setSettingsOpen(false)} 
                theme={theme} onThemeChange={setTheme} 
                language={language} onLanguageChange={setLanguage} 
                intensity={aiIntensity} onIntensityChange={setAiIntensity} 
                useGeminiAI={useGeminiAI} onUseGeminiAIChange={setUseGeminiAI}
                t={t} 
            />}
            {isSummitModalOpen && <HostSummitModal countries={countries} onClose={() => setSummitModalOpen(false)} onHost={handleHostSummit} />}
            {isIntelModalOpen && <LeakIntelModal onClose={() => setIntelModalOpen(false)} onLeak={handleLeakIntel} />}
        </>
    );
};