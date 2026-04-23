import React from 'react';
import '../styles/ChatMessage.css';

const ChatMessage = ({ message, isBot }) => {
    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={`chat-message ${isBot ? 'bot-message' : 'user-message'}`}>
            {isBot && (
                <div className="message-avatar bot-avatar">
                    🤖
                </div>
            )}
            <div className="message-content">
                <p className="message-text">{message.text}</p>
                <div className="message-footer">
                    <span className="message-time">
                        {formatTime(message.timestamp || new Date())}
                    </span>
                    {isBot && message.intent && (
                        <span className="message-intent">
                            {message.intent}
                        </span>
                    )}
                </div>
            </div>
            {!isBot && (
                <div className="message-avatar user-avatar">
                    👤
                </div>
            )}
        </div>
    );
};

export default ChatMessage;
