---
title: "Introducing Streaming Inference to Gouda"

date: "2026-09-22"

author: "Gouda AI Team"

image: "/streaming-inference.png"

tags: ["Gouda", "Update"]

description: "How Gouda's API moved from waiting for a complete response to streaming generated tokens as they are produced."

---

## Introduction

Language models generate text one token at a time.

A conventional API can hide that fact by waiting until generation has finished before returning anything to the user. For a model generating a long response, this can create an unnecessarily large delay between sending a request and seeing the first part of the answer.

Gouda's API therefore supports **streaming generation**.

Instead of waiting for the complete response, the API can send generated text to the client as generation progresses.

## Standard generation

Without streaming, the process looks approximately like this:

User
 ↓
API request
 ↓
Tokenise prompt
 ↓
Generate complete response
 ↓
Return response
 ↓
User sees text

If generating the response takes several seconds, the user sees nothing during most of that time.

This is particularly noticeable with language models because generation is inherently sequential.

## Streaming generation

With streaming, the process becomes:

User
 ↓
API request
 ↓
Tokenise prompt
 ↓
Generate token
 ↓
Send token
 ↓
Generate token
 ↓
Send token
 ↓
Generate token
 ↓
Send token
 ↓
...

The model still takes the same fundamental steps to generate the response, but the interface no longer waits for the entire generation.

The first generated tokens can appear almost immediately after they become available.

## Gouda's implementation

The Gouda API uses FastAPI for the server and exposes a streaming chat endpoint.

The server generates tokens incrementally and returns them through a streaming response rather than constructing the entire answer first.

This makes the API suitable for the Gouda website's chat interface.

The frontend can consume the response and progressively update the conversation as new text arrives.

## Why streaming matters

Streaming does not magically make the model generate tokens faster.

Its main advantage is perceived latency.

Consider a response that takes five seconds to generate.

A non-streaming API might produce:

0s ─────────────── 5s
                  ↓
              complete answer

Streaming can instead produce:

0s → token → token → token → token → ... → 5s

The total generation time may be similar, but the user can begin reading the response much earlier.

## The model and interface are separate

An important architectural distinction is that streaming belongs primarily to the inference and API layer rather than the underlying transformer architecture.

The model still predicts one token at a time.

The API determines whether those predictions are:

accumulated into a complete response; or
transmitted progressively to the client.

This separation allows the same model to be used through different interfaces.

## Streaming in Gouda

Streaming was one of the steps that turned the Gouda API from a simple model-serving endpoint into a more complete conversational system.

Combined with KV caching and the public website, it allows a relatively small language model to provide an interface that behaves much more like a modern chat application.