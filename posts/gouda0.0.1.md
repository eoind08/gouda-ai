---
title: "Gouda0.0.1 — The First Gouda Model"
date: "2025-05-28"
author: "Gouda AI Team"
image: "/gouda0.0.1.png"
tags: ["Gouda", "Release"]
description: "The first publicly released Gouda language model, and the beginning of the Gouda project."
---

## Introduction

Gouda0.0.1 was the first publicly released model in the Gouda family, released on 28 May 2025.

It was also, by modern Gouda standards, a very unsuccessful language model.

Gouda0.0.1 contained approximately 124 million parameters, with a 12-layer transformer, 12 attention heads and 768-dimensional embeddings. Despite being substantially larger than some of the models that followed it, the model was trained on only around 400 million tokens.

That mismatch turned out to matter enormously.

The model was effectively being asked to learn the structure of language with far less training data than its capacity required. The result was a model that had begun to optimise the language-modelling objective, but had not developed anything resembling reliable general language generation.

## Architecture

Gouda0.0.1 used a conventional GPT-style decoder-only transformer architecture.

The model consisted of:

- # 124M parameters
- # 12 transformer layers
- # 12 attention heads
- 768-dimensional embeddings
- Autoregressive causal attention
- A vocabulary-based token representation
- Next-token prediction as the training objective

At its core, the training task was straightforward: given a sequence of tokens, predict the token that comes next.

The simplicity of the objective is deceptive. Even a model with hundreds of millions of parameters must learn an enormous number of statistical relationships before its outputs become coherent.

## Training

The model was trained on approximately 400 million tokens.

In retrospect, this was one of the most important lessons from the first Gouda release. Parameter count alone does not determine the capabilities of a language model. A relatively large model trained on too little data can perform worse than a considerably smaller model that has received substantially more training.

Gouda0.0.1 was an early experiment in discovering this relationship firsthand.

The model reached a HellaSwag score of approximately 24%, which was only slightly above the level expected from a model with little useful understanding of the benchmark.

More importantly, qualitative generation showed that the model was largely incoherent.

## What did Gouda0.0.1 actually learn?

The model was not completely random.

It had learned enough statistical structure to produce fragments that sometimes resembled English. Token frequencies, local patterns and some short-range syntactic relationships were present.

However, those capabilities did not translate into reliable text generation.

Longer generations quickly lost coherence. Facts were unreliable, grammatical structure frequently broke down, and the model could not consistently maintain a meaningful topic.

This was an important distinction for the project: a decreasing training loss does not necessarily mean that a language model is becoming useful.

## Results
Parameters	~124M

Layers	12

Attention heads	12

Embedding size	768

Training tokens	~400M

HellaSwag	~24%

These numbers are not impressive by modern language-model standards. That is precisely why Gouda0.0.1 is worth documenting.

It established the baseline from which the later project developed.

## Lessons from the first model

The most important result of Gouda0.0.1 was not its benchmark score.

It demonstrated that building a language model involves much more than implementing a transformer and running an optimisation loop.

The project had to consider:

how much data a model actually needs;
whether the data is sufficiently high quality;
how model size relates to training tokens;
how to evaluate generation;
how to distinguish memorisation from useful behaviour;
and how much compute is required to train a model properly.

Gouda0.0.1 was therefore less a finished language model than the first serious experiment in the Gouda project.

It established the starting point.