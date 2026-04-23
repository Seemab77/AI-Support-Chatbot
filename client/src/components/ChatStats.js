import React from 'react';
import '../styles/ChatStats.css';

const ChatStats = ({ messageCount, isConnected }) => {
    return (
        <div className="chat-stats">
            <div className="stat-item">
                <span className="stat-icon">💬</span>
                <span className="stat-label">Messages</span>
                <span className="stat-value">{messageCount}</span>
            </div>
            <div className="stat-item">
                <span className="stat-icon">⏱️</span>
                <span className="stat-label">Status</span>
                <span className={`stat-value ${isConnected ? 'connected' : 'disconnected'}`}>
                    {isConnected ? 'Live' : 'Offline'}
                </span>
            </div>
            <div className="stat-item">
                <span className="stat-icon">✨</span>
                <span className="stat-label">AI</span>
                <span className="stat-value">Mock</span>
            </div>
        </div>
    );
};

export default ChatStats;
