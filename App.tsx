import React, { useState } from 'react';
import { Header } from './src/components/Header';
import { NavColumn } from './src/components/NavColumn';
import { ListViewColumn } from './src/components/ListViewColumn';
import { ChatWindow } from './src/components/ChatWindow';
import { ChronicleView } from './src/components/ChronicleView';
import { CommandView } from './src/components/CommandView';
import { CountryProfileModal } from './src/components/modals/CountryProfileModal';
import { SettingsModal } from './src/components/modals/SettingsModal';
import { HostSummitModal } from './src/components/modals/HostSummitModal';
import { LeakIntelModal } from './src/components/modals/LeakIntelModal';
import { ProposePactModal } from './src/components/modals/ProposePactModal';
import { useSimulation } from './src/hooks/useSimulation';
import { useSettingsContext } from './src/context/SettingsContext';
import { useSimulationContext } from './src/context/SimulationContext';
import { useManagers } from './src/hooks/useManagers';
import { Country, Pact } from './src/types';


export const App = () => {
    // State from separated contexts
    const {
        modalCountry, setModalCountry, activeView, setActiveView,
        isSettingsOpen, setSettingsOpen, isSummitModalOpen, setSummitModalOpen,
        isIntelModalOpen, setIntelModalOpen, theme, setTheme,
        language, setLanguage, t, aiIntensity, setAiIntensity,
        useGeminiAI, setUseGeminiAI
    } = useSettingsContext();

    const {
        countries, chats, activeChatId, messages, unreadCounts,
        simulationSpeed, isPaused, pausedChatIds, closedNewsItems,
        turnCounter, worldEvents, worldStateMetrics
    } = useSimulationContext();
    
    const [pactProposalSource, setPactProposalSource] = useState<Country | null>(null);


    // Actions from the manager hook
    const {
        handleSelectChat, handleSendMessage, handlePostNewsEvent,
        handleHostSummit, handleLeakIntel, handleStartPrivateChat,
        handleClosePrivateChat, handleReorderChats,
        setSimulationSpeed, togglePause, stopAllAiResponses,
        toggleChatPause, stopAiResponsesForChat, closeNewsItem,
        handleProposePact, handleIntelOperation
    } = useManagers();

    // Initialize the autonomous AI action simulation loop
    useSimulation();
    
    const handleAvatarClick = (countryId: string) => {
        if (countries[countryId]) {
            setModalCountry(countries[countryId]);
        }
    }
    
    const handleOpenPactProposal = (sourceCountry: Country) => {
        setModalCountry(null);
        setPactProposalSource(sourceCountry);
    };
    
    const handleProposePactAndClose = (sourceId: string, targetId: string, pactType: Pact['type']) => {
        handleProposePact(sourceId, targetId, pactType);
        setPactProposalSource(null);
    }
    
    const activeChat = chats.find(c => c.id === activeChatId);

    const renderMainContent = () => {
        if (activeView === 'command') {
            return (
                <CommandView 
                    metrics={worldStateMetrics}
                    onOpenSummitModal={() => setSummitModalOpen(true)}
                    onOpenIntelModal={() => setIntelModalOpen(true)}
                    onPostNewsEvent={handlePostNewsEvent}
                    countries={countries}
                />
            );
        }
        if (activeView === 'chronicle') {
            return <ChronicleView events={worldEvents} countries={countries} />;
        }
        // Default views: 'chats' or 'directory'
        return (
            <>
                <ListViewColumn
                    activeView={activeView}
                    chats={chats}
                    countries={countries}
                    activeChatId={activeChatId}
                    unreadCounts={unreadCounts}
                    onSelectChat={handleSelectChat}
                    onSelectCountry={(countryId) => setModalCountry(countries[countryId])}
                    onCloseChat={handleClosePrivateChat}
                    onReorderChats={handleReorderChats}
                    pausedChatIds={pausedChatIds}
                    onToggleChatPause={toggleChatPause}
                    onStopChatResponses={stopAiResponsesForChat}
                />
                <ChatWindow
                    key={activeChatId}
                    chat={activeChat}
                    countries={countries}
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
            </>
        );
    };

    return (
        <>
            <Header onSettingsClick={() => setSettingsOpen(true)} />
            <NavColumn activeView={activeView} onSelectView={setActiveView} t={t} />
            
            {renderMainContent()}

            {modalCountry && <CountryProfileModal country={modalCountry} countries={countries} onClose={() => setModalCountry(null)} onStartChat={() => {handleStartPrivateChat(modalCountry.id); setModalCountry(null);}} onProposePact={handleOpenPactProposal} onIntelOperation={handleIntelOperation} t={t} currentTurn={turnCounter.current} />}
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
            {pactProposalSource && <ProposePactModal sourceCountry={pactProposalSource} countries={countries} onClose={() => setPactProposalSource(null)} onPropose={handleProposePactAndClose} />}
        </>
    );
};