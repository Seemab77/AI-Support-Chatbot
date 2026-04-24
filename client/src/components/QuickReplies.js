import React from 'react';
import '../styles/QuickReplies.css';

const QuickReplies = ({ onSelect }) => {
    const suggestions = [
        { text: 'Hello', icon: '→' },
        { text: 'Tell me about your services', icon: '→' },
        { text: 'What is your pricing?', icon: '→' },
        { text: 'How can I contact support?', icon: '→' },
        { text: 'Do you have a demo?', icon: '→' },
        { text: 'Help me get started', icon: '→' }
    ];

    return (
        <div className="quick-replies-container">
            <p className="quick-replies-label">Suggested Questions</p>
            <div className="quick-replies-grid">
                {suggestions.map((suggestion, index) => (
                    <button
                        key={index}
                        className="quick-reply-btn"
                        onClick={() => onSelect(suggestion.text)}
                        title={suggestion.text}
                    >
                        <span className="quick-reply-text">{suggestion.text}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickReplies;
