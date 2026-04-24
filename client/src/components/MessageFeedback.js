import React, { useState } from 'react';
import '../styles/MessageFeedback.css';

const MessageFeedback = ({ messageId, onFeedback }) => {
    const [feedback, setFeedback] = useState(null);

    const handleFeedback = (type) => {
        setFeedback(type);
        onFeedback && onFeedback(messageId, type);
        setTimeout(() => setFeedback(null), 2000);
    };

    return (
        <div className="message-feedback">
            <button
                className={`feedback-btn helpful ${feedback === 'helpful' ? 'active' : ''}`}
                onClick={() => handleFeedback('helpful')}
                title="Mark as helpful"
            >
                Yes
            </button>
            <button
                className={`feedback-btn unhelpful ${feedback === 'unhelpful' ? 'active' : ''}`}
                onClick={() => handleFeedback('unhelpful')}
                title="Mark as unhelpful"
            >
                No
            </button>
            {feedback && (
                <span className="feedback-thanks">
                    Thank you
                </span>
            )}
        </div>
    );
};

export default MessageFeedback;
