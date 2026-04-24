import React, { useState } from 'react';
import MessageFeedback from './MessageFeedback';
import '../styles/ChatMessage.css';

const ChatMessage = ({ message, isBot }) => {
    const [showFeedback, setShowFeedback] = useState(false);

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleFeedback = (messageId, type) => {
        console.log(`Feedback for message ${messageId}: ${type}`);
    };

    return (
        <div className={`chat-message ${isBot ? 'bot-message' : 'user-message'}`}>
            {isBot && (
                <div className="message-avatar bot-avatar">
                    AI
                </div>
            )}
            <div className="message-content" onMouseEnter={() => isBot && setShowFeedback(true)} onMouseLeave={() => setShowFeedback(false)}>
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
                {isBot && showFeedback && (
                    <MessageFeedback messageId={message.text} onFeedback={handleFeedback} />
                )}
            </div>
            {!isBot && (
                <div className="message-avatar user-avatar">
                    You
                </div>
            )}
        </div>
    );
};

export default ChatMessage;
