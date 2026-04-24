import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import QuickReplies from './QuickReplies';
import ChatStats from './ChatStats';
import ExportChat from './ExportChat';
import { chatAPI, createSocketConnection, socketEvents } from '../services/api';
import '../styles/ChatBox.css';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [remoteTyping, setRemoteTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const socketRef = useRef(null);

    // Initialize conversation and Socket.IO connection
    useEffect(() => {
        const initializeChat = async () => {
            try {
                // Start REST conversation
                const response = await chatAPI.startConversation();
                if (response.success) {
                    setSessionId(response.sessionId);

                    // Initialize Socket.IO connection
                    const socket = createSocketConnection();

                    socket.on(socketEvents.CONNECT, () => {
                        console.log('Socket connected');
                        setIsConnected(true);
                        socket.emit(socketEvents.JOIN_CONVERSATION, {
                            sessionId: response.sessionId
                        });
                    });

                    socket.on(socketEvents.RECEIVE_MESSAGE, (data) => {
                        addMessage({
                            sender: 'bot',
                            text: data.botResponse,
                            intent: data.intent,
                            timestamp: data.timestamp
                        });
                        setIsLoading(false);
                    });

                    socket.on(socketEvents.ERROR_MESSAGE, (data) => {
                        setError(data.error);
                        setIsLoading(false);
                    });

                    socket.on(socketEvents.USER_TYPING, (data) => {
                        setRemoteTyping(true);
                    });

                    socket.on(socketEvents.USER_STOPPED_TYPING, () => {
                        setRemoteTyping(false);
                    });

                    socket.on(socketEvents.DISCONNECT, () => {
                        setIsConnected(false);
                    });

                    socketRef.current = socket;
                }
            } catch (err) {
                console.error('Error initializing chat:', err);
                setError('Failed to start chat. Please refresh the page.');
            }
        };

        initializeChat();

        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, remoteTyping]);

    const addMessage = (message) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                ...message,
                timestamp: message.timestamp || new Date()
            }
        ]);
    };

    const handleSendMessage = async (messageText) => {
        if (!messageText.trim() || !sessionId) return;

        // Add user message to UI
        addMessage({
            sender: 'user',
            text: messageText,
            timestamp: new Date()
        });

        setIsLoading(true);
        setError(null);

        try {
            if (isConnected && socketRef.current) {
                // Use Socket.IO if connected
                socketRef.current.emit(socketEvents.SEND_MESSAGE, {
                    message: messageText,
                    sessionId
                });
            } else {
                // Fallback to REST API
                const response = await chatAPI.sendMessage(messageText, sessionId);
                if (response.success) {
                    addMessage({
                        sender: 'bot',
                        text: response.botResponse,
                        intent: response.intent,
                        timestamp: new Date()
                    });
                }
                setIsLoading(false);
            }
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message. Please try again.');
            setIsLoading(false);
        }
    };

    const handleClearChat = () => {
        setMessages([]);
        setError(null);
    };

    const handleEndConversation = async () => {
        if (!sessionId) return;

        try {
            await chatAPI.closeConversation(sessionId);
            setMessages([]);
            setSessionId(null);
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        } catch (err) {
            console.error('Error ending conversation:', err);
            setError('Failed to end conversation.');
        }
    };

    return (
        <div className="chatbox-container">
            <div className="chatbox-header">
                <h1>AI Support Chatbot</h1>
                <div className="header-actions">
                    {messages.length > 0 && <ExportChat messages={messages} sessionId={sessionId} />}
                    <div className="connection-status">
                        <span
                            className={`status-indicator ${isConnected ? 'connected' : 'disconnected'
                                }`}
                        ></span>
                        <span className="status-text">
                            {isConnected ? 'Connected' : 'Disconnected'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="chatbox-messages">
                {messages.length === 0 && (
                    <div className="welcome-section">
                        <div className="welcome-message">
                            <h2>Welcome to our AI Support Chat</h2>
                            <p>How can I help you today? Feel free to ask any questions!</p>
                        </div>
                        <ChatStats messageCount={messages.length} isConnected={isConnected} />
                        <QuickReplies onSelect={handleSendMessage} />
                    </div>
                )}

                {messages.map((message, index) => (
                    <ChatMessage
                        key={index}
                        message={message}
                        isBot={message.sender === 'bot'}
                    />
                ))}

                {remoteTyping && (
                    <div className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={() => setError(null)}>×</button>
                </div>
            )}

            <div className="chatbox-footer">
                <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                <div className="action-buttons">
                    <button
                        className="action-button clear-btn"
                        onClick={handleClearChat}
                        title="Clear chat history"
                    >
                        Clear Chat
                    </button>
                    <button
                        className="action-button end-btn"
                        onClick={handleEndConversation}
                        title="End conversation"
                    >
                        End Conversation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
