---

title: "Adding KV Caching to Gouda"

date: "2026-09-22"

author: "Gouda AI Team"

image: "/kv-cache.png"

tags: ["Gouda", "Update"]

description: "A technical look at KV caching and how Gouda uses it to avoid repeatedly computing previous attention keys and values during generation."

---

## Introduction

Autoregressive language models generate text sequentially.

If a model has already generated:

> "The capital of France is"

and wants to generate the next token, it needs to use the previous context.

A naive implementation can repeatedly process the entire sequence from the beginning.

That works, but it performs unnecessary computation.

Gouda therefore uses **key-value caching**, commonly called KV caching, during autoregressive generation.

## The problem

Consider a sequence growing one token at a time.

For the first token, the model processes:

A

For the second:

A B

For the third:

A B C

For the fourth:

A B C D

If every generation step recomputes attention for every previous token, the same information is repeatedly calculated.

The amount of computation therefore grows significantly as the context becomes longer.

## What attention actually needs

For each transformer attention layer, the model produces:

- Queries (Q)
- Keys (K)
- Values (V)

When generating the next token, the new query needs to attend to the keys and values associated with previous tokens.

Those previous keys and values do not change.

Once the model has processed a token, its K and V representations can therefore be stored.

The next generation step only needs to calculate the new token's K and V and combine them with the cached representations.

## Without KV caching

Conceptually:

Step 1:
[A]

Step 2:
[A B]

Step 3:
[A B C]

Step 4:
[A B C D]

The model repeatedly processes the existing context.

## With KV caching

Instead:

Step 1:
A → K₁,V₁

Step 2:
B → K₂,V₂
      + K₁,V₁

Step 3:
C → K₃,V₃
      + K₁,V₁,K₂,V₂

Step 4:
D → K₄,V₄
      + K₁,V₁,K₂,V₂,K₃,V₃

The previous K/V representations are reused.

## Why this matters for Gouda

Gouda models are small, but the API still needs to generate responses efficiently.

The model may produce hundreds of tokens during a single request. Recomputing the entire prompt and generated sequence at every step would waste a significant amount of computation.

KV caching allows the inference system to take advantage of the autoregressive structure of transformer generation.

## KV caching and streaming

KV caching works particularly well alongside streaming.

The generation process becomes:

Prompt
  ↓
Prefill
  ↓
Create KV cache
  ↓
Generate token
  ↓
Update cache
  ↓
Stream token
  ↓
Generate next token
  ↓
Update cache
  ↓
Stream token

The user sees tokens arriving progressively while the model avoids repeatedly recomputing the entire history.

## A useful distinction

KV caching does not change what the model has learned.

It does not improve the model's knowledge, reasoning or benchmark scores.

It is an inference optimisation.

The same model weights produce the same underlying predictions; the difference is that the inference engine performs the computation more efficiently.

## Conclusion

KV caching is a relatively small implementation detail with a substantial practical impact.

For Gouda, it forms part of the infrastructure that turns a trained checkpoint into a usable conversational model.

Together with streaming inference, it allows the API to generate responses incrementally while avoiding unnecessary repeated computation.