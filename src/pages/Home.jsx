
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import AppBar from '../components/AppBar.jsx';
import Background from '../components/Background.jsx';

const CHAT_API_KEY = 'secret';
const ai = new GoogleGenAI({ apiKey: CHAT_API_KEY });


export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi, I can help you find exercises, courses, or upload your form video.' },
  ]);
  const [isSending, setIsSending] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    document.title = 'GYMPT';
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatOpen]);

  const quickReplies = useMemo(
    () => [
      'Show exercises',
      'Show courses',
      'Check my form',
    ],
    [],
  );

  function buildReply(text) {
    const normalized = text.toLowerCase();
    if (normalized.includes('exercise')) {
      return 'Go to Exercises to browse movements by category and muscle group.';
    }
    if (normalized.includes('course')) {
      return 'Go to Courses to browse training programs and learning paths.';
    }
    if (normalized.includes('form') || normalized.includes('video')) {
      return 'Use Check My Form to upload a video for AI feedback.';
    }
    return 'I can help with exercises, courses, and form checking.';
  }

  async function sendToApi(userText) {
    if (!CHAT_API_KEY || CHAT_API_KEY === 'PASTE_YOUR_FREE_TIER_API_KEY_HERE') {
      return buildReply(userText);
    }

    try {
      console.log('📤 Calling Gemini API with:', userText);
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userText,
      });

      console.log('📥 Full response object:', response);
      console.log('📥 Response type:', typeof response);
      console.log('📥 Response keys:', Object.keys(response));
      console.log('📥 response.text:', response.text);
      
      if (response && response.text) {
        const reply = response.text.trim();
        console.log('✅ Successfully got reply:', reply);
        return reply;
      } else {
        console.warn('⚠️ No text in response, falling back');
        console.log('📥 Response content:', JSON.stringify(response));
        return buildReply(userText);
      }
    } catch (error) {
      console.error('❌ Gemini API error:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      return buildReply(userText);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    setIsSending(true);
    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', text: trimmed },
    ]);
    setChatInput('');
    setIsChatOpen(true);

    try {
      const reply = await sendToApi(trimmed);
      setMessages((currentMessages) => [
        ...currentMessages,
        { role: 'assistant', text: reply },
      ]);
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        { role: 'assistant', text: buildReply(trimmed) },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="page-fade">
      <Background />
      <AppBar />
      <main />
      <div className="top-text-column">
        <div className="top-text">TRAIN SMARTER MOVE BETTER</div>
        <div className="Sizedbox" aria-hidden="true" />
        <div className="subtitle">
          Browse exercises, upload your videos, and get AI-powered form feedback
          to prevent injuries and maximize gains.
        </div>
        <div className="Sizedbox30" aria-hidden="true" />
        <div className="row">
          <Link to="/exercises">
            <button className="Homebutton">Browse Exercises</button>
          </Link>
          <div className="width-sizedbox30" />
          <Link to="/upload-video">
            <button className="Homebutton2">Check My Form</button>
          </Link>
        </div>
        <div className="Sizedbox30" aria-hidden="true" />

      </div>

      <div className="chat-widget">
        {isChatOpen && (
          <div className="chat-panel" role="dialog" aria-label="Chatbot message box">
            <div className="chat-panel-header">
              <div>
                <div className="chat-panel-title">GYMPT Assistant</div>
                <div className="chat-panel-subtitle">Quick help for the app</div>
              </div>
              <button
                type="button"
                className="chat-close-btn"
                onClick={() => setIsChatOpen(false)}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            <div className="chat-messages">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`chat-message chat-message-${message.role}`}
                >
                  {message.text}
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>

            <div className="chat-quick-replies">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  className="chat-quick-reply"
                  onClick={() => setChatInput(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>

            <form className="chat-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="chat-input"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Type a message..."
                aria-label="Chat message"
                disabled={isSending}
              />
              <button type="submit" className="chat-send-btn" disabled={isSending}>
                {isSending ? '...' : 'Send'}
              </button>
            </form>
          </div>
        )}

        <button
          type="button"
          className="chat-launcher"
          onClick={() => setIsChatOpen((current) => !current)}
          aria-label={isChatOpen ? 'Close chatbot' : 'Open chatbot'}
        >
          <MessageCircle size={24} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

