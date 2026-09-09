'use client'

import { useState } from 'react'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  rating?: number
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m Gouda. Ask Me Anything!',
      isUser: false,
      timestamp: new Date(),
      rating: 0
    }
  ])

  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState('Gruyere-1.0-r1')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim() || isLoading) return

    const messageText = inputValue.trim()

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Create the assistant message immediately.
    // Its content will be filled in as tokens arrive.
    const assistantMessageId = (Date.now() + 1).toString()

    const assistantMessage: Message = {
      id: assistantMessageId,
      content: '',
      isUser: false,
      timestamp: new Date(),
      rating: 0
    }

    setMessages(prev => [...prev, assistantMessage])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          model_name: selectedModel,
          max_tokens: 100,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(
          `Failed to get response: ${response.status} ${errorText}`
        )
      }

      if (!response.body) {
        throw new Error('No response body received')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      let accumulatedText = ''

      while (true) {
        const { value, done } = await reader.read()

        if (done) {
          break
        }

        // Decode the incoming bytes into text
        const chunk = decoder.decode(value, {
          stream: true
        })

        accumulatedText += chunk

        // Update the existing assistant message
        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: accumulatedText
                }
              : msg
          )
        )
      }

      // Flush anything remaining in the decoder
      const finalChunk = decoder.decode()

      if (finalChunk) {
        accumulatedText += finalChunk

        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: accumulatedText
                }
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
                content: 'Sorry, something went wrong. Please try again.'
              }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleRating = (messageId: string, rating: number) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, rating }
          : msg
      )
    )
  }

  /*
  const StarRating = ({
    messageId,
    currentRating
  }: {
    messageId: string,
    currentRating: number
  }) => {
    return (
      <div className="flex mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(messageId, star)}
            className="text-lg hover:scale-110 transition-transform"
          >
            <span
              className={
                star <= currentRating
                  ? 'text-yellow-500'
                  : 'text-gray-300'
              }
            >
              ⭐
            </span>
          </button>
        ))}
      </div>
    )
  }
  */

  return (
    <div className="w-full max-w-4xl mx-auto">
      <p className='text-center mb-3 text-5xl text-[#64401e] font-bold'>
        Welcome To Gouda!
      </p>

      <p className='text-center mb-8 text-2xl text-[#64401e]'>
        The Bad (sometimes funny) AI
      </p>

      {/* Chat Container */}
      <div className="bg-[#d7c3aa] rounded-xl shadow-lg min-h-[500px] flex flex-col">

        {/* Messages Area */}
        <div className="flex-1 p-4 space-y-4 min-h-[400px] overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex ${
                  message.isUser
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-[#e6d5c0] text-[#5c4033]'
                      : 'bg-[#dac9b6] text-[#5c4033]'
                  }`}
                >
                  {message.content}
                </div>
              </div>

              {!message.isUser && (
                <div className="flex justify-start">
                  {/* 
                  <StarRating
                    messageId={message.id}
                    currentRating={message.rating || 0}
                  />
                  */}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#dac9b6] text-[#5c4033] px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#5c4033] rounded-full animate-bounce"></div>

                  <div
                    className="w-2 h-2 bg-[#5c4033] rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>

                  <div
                    className="w-2 h-2 bg-[#5c4033] rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-[#f5f0e8] rounded-b-xl">
          <form
            onSubmit={handleSubmit}
            className="flex space-x-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Gouda Something..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />

            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="px-3 py-2 bg-[#8b5a2b] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Gruyere-1.0-r1">
                Gruyere-1.0
              </option>
            </select>

            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-6 py-2 bg-[#8b5a2b] text-white rounded-lg hover:bg-[#704420] focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
