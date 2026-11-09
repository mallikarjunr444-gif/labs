import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getApiBaseUrl } from '../lib/apiBase';
import {
  X,
  Send,
  Sparkles,
  Paperclip,
  Copy,
  Check,
  RotateCcw,
  Square,
  Shield,
  Bot,
  User,
  Image as ImageIcon,
  AlertCircle,
  WifiOff
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  timestamp: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const DEFAULT_FOLLOW_UPS = [
  'What key questions should I ask my dermatologist during intake?',
  'What over-the-counter ingredients should I avoid for irritated skin?',
  'How do I monitor these visual skin changes safely at home?'
];

const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose, initialQuery }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  // Handle initial query if launched from homepage
  useEffect(() => {
    if (isOpen && initialQuery && messages.length === 0) {
      handleSend(initialQuery);
    }
  }, [isOpen, initialQuery]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        onClose();
        navigate('/analysis', { state: { initialImage: base64Image } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const content = textToSend || input;
    if ((!content.trim() && !selectedImage) || isStreaming) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      image: selectedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    const currentImage = selectedImage;
    setSelectedImage(null);

    // Create Assistant Placeholder
    const assistantId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsStreaming(true);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const payload = {
        messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        image: currentImage
      };

      const response = await fetch(`${getApiBaseUrl()}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to connect to Medicus AI service.');
      }

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        throw new Error('Received HTML response instead of AI stream. Please verify backend status.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        );
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        const errorDetail = err.message || 'Backend connection failed';
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? {
                  ...msg,
                  content: msg.content
                    ? msg.content + `\n\n*(Stream interrupted: ${errorDetail})*`
                    : `⚠️ **Connection Diagnostics**: ${errorDetail}\n\nPlease verify backend server is online at http://127.0.0.1:8000 and API credentials are valid.`
                }
              : msg
          )
        );
      }
    } finally {
      setIsStreaming(false);
      setAbortController(null);
    }
  };

  const handleStop = () => {
    if (abortController) {
      abortController.abort();
      setIsStreaming(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegenerate = () => {
    if (messages.length < 2 || isStreaming) return;
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      setMessages((prev) => prev.slice(0, -1));
      handleSend(lastUserMsg.content);
    }
  };

  const renderMarkdown = (text: string) => {
    if (!text) return { __html: '' };

    let formatted = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^### (.*$)/gim, '<h3 class="text-sm font-bold text-[#1d1d1f] mt-3 mb-1">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-base font-bold text-[#1d1d1f] mt-3 mb-1">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-lg font-bold text-[#1d1d1f] mt-4 mb-2">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#1d1d1f]">$1</strong>')
      .replace(/(?<!^\s*)\*([^\*\n]+)\*/g, '<em class="italic text-[#6e6e73]">$1</em>')
      .replace(/^[\*\-] (.*$)/gim, '<div class="flex items-start gap-2 my-1"><span class="text-[#0071e3] font-bold">•</span><span>$1</span></div>')
      .replace(/\n\n/g, '<div class="h-2"></div>')
      .replace(/\n/g, '<br/>');

    return { __html: formatted };
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-4xl h-[90dvh] sm:h-[85vh] rounded-3xl bg-[#fbfbfd] border border-[#d2d2d7] shadow-2xl flex flex-col overflow-hidden text-[#1d1d1f]"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
        >
          {/* ── HEADER ── */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#d2d2d7]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#eaf2fd] text-[#0071e3] flex items-center justify-center border border-[#0071e3]/20 shadow-sm">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1d1d1f] flex items-center gap-2">
                  Medicus Labs AI
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#eaf2fd] text-[#0071e3] px-2 py-0.5 rounded-md">
                    Live LLM Stream
                  </span>
                </h3>
                <p className="text-xs text-[#6e6e73] flex items-center gap-1">
                  <Shield size={12} className="text-[#0071e3]" />
                  HIPAA Enforced • Clinical Guidance Only
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#fbfbfd] border border-[#d2d2d7] text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f] flex items-center justify-center transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* ── MESSAGES CONTAINER ── */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-[#eaf2fd] text-[#0071e3] flex items-center justify-center text-2xl border border-[#0071e3]/20">
                  <Sparkles size={28} />
                </div>
                <h4 className="text-xl font-bold text-[#1d1d1f]">How can Medicus AI assist your skin health today?</h4>
                <p className="text-xs text-[#6e6e73] leading-relaxed">
                  Describe symptoms, upload skin concern photos, or select a prompt below to launch an instant streaming reference check.
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 sm:gap-4 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-[#eaf2fd] text-[#0071e3] flex items-center justify-center flex-shrink-0 border border-[#0071e3]/20 mt-1">
                      <Bot size={16} />
                    </div>
                  )}

                  <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                    {msg.image && (
                      <div className="rounded-2xl overflow-hidden border border-[#d2d2d7] max-w-xs mb-2 shadow-sm">
                        <img src={msg.image} alt="Uploaded Skin Concern" className="w-full h-auto object-cover" />
                      </div>
                    )}

                    <div
                      className={`p-4 sm:p-5 rounded-3xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#0071e3] text-white rounded-br-none shadow-sm'
                          : 'bg-white border border-[#d2d2d7] text-[#1d1d1f] rounded-bl-none shadow-sm'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <div
                          className="prose prose-sm max-w-none text-[#1d1d1f]"
                          dangerouslySetInnerHTML={renderMarkdown(msg.content)}
                        />
                      ) : (
                        <p>{msg.content}</p>
                      )}
                    </div>

                    {/* Action Bar for Assistant Messages */}
                    {msg.role === 'assistant' && msg.content && (
                      <div className="flex items-center gap-3 text-xs text-[#6e6e73] px-1 pt-1">
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="flex items-center gap-1 hover:text-[#0071e3] transition"
                          title="Copy Response"
                        >
                          {copiedId === msg.id ? <Check size={13} className="text-[#0071e3]" /> : <Copy size={13} />}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>

                        <button
                          onClick={handleRegenerate}
                          disabled={isStreaming}
                          className="flex items-center gap-1 hover:text-[#0071e3] transition disabled:opacity-40"
                          title="Regenerate Response"
                        >
                          <RotateCcw size={13} />
                          <span>Regenerate</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[#f5f5f7] text-[#1d1d1f] flex items-center justify-center flex-shrink-0 border border-[#d2d2d7] mt-1 font-bold text-xs">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Follow-up Suggestion Chips */}
            {!isStreaming && messages.length > 0 && messages[messages.length - 1]?.role === 'assistant' && (
              <div className="pt-4 space-y-2 border-t border-[#d2d2d7]/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868b] block">Suggested follow-ups:</span>
                <div className="flex flex-wrap gap-2">
                  {DEFAULT_FOLLOW_UPS.map((chip, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(chip)}
                      className="text-xs px-3.5 py-2 rounded-full bg-white border border-[#d2d2d7] text-[#6e6e73] hover:bg-[#eaf2fd] hover:border-[#0071e3] hover:text-[#0071e3] transition font-medium text-left"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── INPUT FOOTER ── */}
          <div className="p-4 bg-white border-t border-[#d2d2d7] space-y-3">
            {selectedImage && (
              <div className="flex items-center justify-between p-2 bg-[#f5f5f7] rounded-2xl border border-[#d2d2d7] max-w-xs text-xs">
                <div className="flex items-center gap-2 truncate">
                  <ImageIcon size={14} className="text-[#0071e3]" />
                  <span className="truncate font-semibold">Image attached</span>
                </div>
                <button onClick={() => setSelectedImage(null)} className="text-[#86868b] hover:text-red-500">
                  <X size={14} />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-11 h-11 rounded-full bg-[#fbfbfd] border border-[#d2d2d7] text-[#6e6e73] hover:bg-[#eaf2fd] hover:text-[#0071e3] flex items-center justify-center transition flex-shrink-0"
                title="Attach skin image"
              >
                <Paperclip size={18} />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Medicus AI about skin symptoms..."
                className="flex-1 px-5 py-3 rounded-full bg-[#fbfbfd] border border-[#d2d2d7] text-[#1d1d1f] placeholder-[#86868b] text-sm focus:outline-none focus:border-[#0071e3] transition"
              />

              {isStreaming ? (
                <button
                  type="button"
                  onClick={handleStop}
                  className="w-11 h-11 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-sm hover:bg-amber-700 transition flex-shrink-0"
                  title="Stop Generating"
                >
                  <Square size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!input.trim() && !selectedImage}
                  className="w-11 h-11 rounded-full bg-[#0071e3] text-white flex items-center justify-center shadow-sm hover:bg-[#2997ff] transition disabled:opacity-40 flex-shrink-0"
                  title="Send Message"
                >
                  <Send size={16} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIChatModal;
