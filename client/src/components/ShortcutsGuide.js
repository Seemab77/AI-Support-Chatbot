import React from 'react';
import '../styles/ShortcutsGuide.css';

const ShortcutsGuide = () => {
    const shortcuts = [
        { key: 'Enter', action: 'Send message' },
        { key: 'Shift + Enter', action: 'New line' },
        { key: 'Ctrl + K', action: 'Clear chat' },
        { key: 'Ctrl + E', action: 'Export chat' }
    ];

    return (
        <div className="shortcuts-guide">
            <div className="shortcuts-title">Keyboard Shortcuts</div>
            <div className="shortcuts-list">
                {shortcuts.map((shortcut, idx) => (
                    <div key={idx} className="shortcut-item">
                        <code className="shortcut-key">{shortcut.key}</code>
                        <span className="shortcut-action">{shortcut.action}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShortcutsGuide;
