import React, { useState } from 'react';
import '../styles/ExportChat.css';

const ExportChat = ({ messages, sessionId }) => {
    const [showMenu, setShowMenu] = useState(false);

    const exportAsJSON = () => {
        const data = {
            sessionId,
            exportDate: new Date().toISOString(),
            messageCount: messages.length,
            messages: messages.map(msg => ({
                sender: msg.sender,
                text: msg.text,
                intent: msg.intent,
                timestamp: msg.timestamp
            }))
        };

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2)));
        element.setAttribute('download', `chat-${sessionId}-${Date.now()}.json`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        setShowMenu(false);
    };

    const exportAsText = () => {
        let text = `AI Support Chatbot Conversation\n`;
        text += `Session ID: ${sessionId}\n`;
        text += `Date: ${new Date().toLocaleString()}\n`;
        text += `Messages: ${messages.length}\n`;
        text += `\n${'='.repeat(60)}\n\n`;

        messages.forEach(msg => {
            const sender = msg.sender === 'bot' ? 'Assistant' : 'You';
            text += `${sender} (${new Date(msg.timestamp).toLocaleTimeString()}):\n`;
            text += `${msg.text}\n`;
            if (msg.intent) {
                text += `[Intent: ${msg.intent}]\n`;
            }
            text += '\n';
        });

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', `chat-${sessionId}-${Date.now()}.txt`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        setShowMenu(false);
    };

    if (messages.length === 0) return null;

    return (
        <div className="export-chat">
            <button
                className="export-btn"
                onClick={() => setShowMenu(!showMenu)}
                title="Export conversation"
            >
                Export
            </button>

            {showMenu && (
                <div className="export-menu">
                    <button onClick={exportAsJSON} className="export-option">
                        <span>Export as JSON</span>
                    </button>
                    <button onClick={exportAsText} className="export-option">
                        <span>Export as TXT</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExportChat;
