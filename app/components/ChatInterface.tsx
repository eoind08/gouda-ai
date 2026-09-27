'use client'

import { useEffect, useRef, useState } from 'react'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

const MODELS = [
  { id: 'Gruyere-1.2', name: 'Gruyère-1.2', apiName: 'Gruyere-1.2' },
  { id: 'Gruyere-1.1', name: 'Gruyère-1.1', apiName: 'Gruyere-1.1' },
]

function ModelSelector({
  selectedModel,
  setSelectedModel,
  disabled,
}: {
  selectedModel: string
  setSelectedModel: (model: string) => void
  disabled: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = MODELS.find(model => model.id === selectedModel) ?? MODELS[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="model-picker" ref={ref}>
      <button
        type="button"
        className={`model-picker-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen(prev => !prev)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="model-picker-trigger-content">
          <span className="model-status-dot" />
          <span>{selected.name}</span>
        </span>

        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="m6 8 4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div className="model-menu" role="listbox">
          <div className="model-menu-heading">Models</div>

          {MODELS.map(model => {
            const active = model.id === selectedModel

            return (
              <button
                key={model.id}
                type="button"
                role="option"
                aria-selected={active}
                className={`model-option ${active ? 'active' : ''}`}
                onClick={() => {
                  setSelectedModel(model.id)
                  setOpen(false)
                }}
              >
                <span className="model-option-main">
                  <span className="model-option-name">{model.name}</span>
                  <span className="model-option-description">
                    {model.id === 'Gruyere-1.2'
                      ? 'Latest chat model - Up to 3x better'
                      : 'Previous generation'}
                  </span>
                </span>

                {active && (
                  <svg className="model-check" viewBox="0 0 20 20">
                    <path d="m5 10 3 3 7-7" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        "Hello! I'm Gouda. Ask me anything!",
      isUser: false,
      timestamp: new Date(),
    },
  ])

  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim() || isLoading) return

    const messageText = inputValue.trim()

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    const assistantMessageId = (Date.now() + 1).toString()

    setMessages(prev => [
      ...prev,
      {
        id: assistantMessageId,
        content: '',
        isUser: false,
        timestamp: new Date(),
      },
    ])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          model_name: MODELS.find(model => model.id === selectedModel)?.apiName,
          max_tokens: 256,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(
          `Failed to get response: ${response.status} ${errorText}`
        )
      }

      if (!response.body) throw new Error('No response body received')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulatedText = ''

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        accumulatedText += decoder.decode(value, { stream: true })

        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMessageId
              ? { ...msg, content: accumulatedText }
              : msg
          )
        )
      }

      const finalChunk = decoder.decode()

      if (finalChunk) {
        accumulatedText += finalChunk

        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMessageId
              ? { ...msg, content: accumulatedText }
              : msg
          )
        )
      }
    } catch (error) {
      console.error('Chat error:', error)

      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content: 'Sorry, something went wrong. Please try again.',
              }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="gouda-hero">
      <div className="hero-decoration hero-decoration-left" aria-hidden="true">
        <span className="shape shape-circle" />
        <span className="shape shape-square" />
        <span className="shape shape-triangle" />
      </div>

      <div className="hero-decoration hero-decoration-right" aria-hidden="true">
        <span className="shape shape-circle" />
        <span className="shape shape-square" />
        <span className="shape shape-triangle" />
      </div>

      <header className="hero-heading">
        <h1>Welcome to Gouda!</h1>
        <p>(Incredibly) Lightweight LLMs</p>
      </header>

      <div className="chat-shell">
        <div className="messages-area chat-scroll">
          {messages.map(message => (
            <div
              key={message.id}
              className={`message-row ${
                message.isUser ? 'message-row-user' : ''
              }`}
            >
              <div
                className={`message ${
                  message.isUser ? 'message-user' : 'message-gouda'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message-row">
              <div className="message message-gouda loading-message">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="composer">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Ask Gouda something..."
            disabled={isLoading}
            aria-label="Message Gouda"
          />

          <div className="composer-actions">
            <ModelSelector
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              disabled={isLoading}
            />

            <button
              type="submit"
              className="send-button"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}