import React from 'react';
import '../styles/ChatStats.css';

const ChatStats = ({ messageCount, isConnected }) => {
    return (
        <div className="chat-stats">
            <div className="stat-item">
                <span className="stat-label">Total Messages</span>
                <span className="stat-value">{messageCount}</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Connection Status</span>
                <span className={`stat-value ${isConnected ? 'connected' : 'disconnected'}`}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                </span>
            </div>
            <div className="stat-item">
                <span className="stat-label">AI Engine</span>
                <span className="stat-value">Mock Service</span>
            </div>
        </div>
    );
};

export default ChatStats;
