import React, { useState, useRef, useEffect } from 'react';
import '../styles/MessageInput.css';

const MessageInput = ({ onSendMessage, isLoading }) => {
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);

        // Emit typing event
        if (!isTyping && e.target.value.length > 0) {
            setIsTyping(true);
            // Emit to socket here if available
        }

        // Clear existing timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Set timeout to stop typing indicator
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
        }, 1000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input);
            setInput('');
            setIsTyping(false);
            inputRef.current?.focus();
        }
    };

    return (
        <form className="message-input-container" onSubmit={handleSubmit}>
            <input
                ref={inputRef}
                type="text"
                className="message-input"
                placeholder="Type your message here..."
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
                autoFocus
            />
            <button
                type="submit"
                className="send-button"
                disabled={!input.trim() || isLoading}
            >
                {isLoading ? 'Sending...' : 'Send'}
            </button>
        </form>
    );
};

export default MessageInput;
