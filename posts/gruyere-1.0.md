---
title: "Gruyère-1.0 — A New Generation of Gouda"

date: "2026-09-09"

author: "Gouda AI Team"

image: "/gruyere-1.0.png"

tags: ["Gouda", "Gruyère", "Release"]

description: "The first Gruyère model, introducing a new stage of the Gouda project with a modernised training and deployment pipeline."

---

## Introduction

**Gruyère-1.0** was released on 9 September 2026, one day after gouda-g1-xs.

Although the model was still deliberately small, Gruyère-1.0 represented a major change in the Gouda project.

The focus was no longer simply on producing another checkpoint. The project had developed a more complete pipeline covering model architecture, training, evaluation, packaging and inference.

Gruyère-1.0 became the foundation for the later Gruyère-1.1 release.

## Architecture

Gruyère-1.0 contains approximately **64 million parameters** and uses the same core architecture that remains in the Gruyère series.

The architecture consists of:

- **12 transformer layers**
- **8 attention heads**
- **512-dimensional embeddings**
- GPT-2-style causal attention
- Learned positional embeddings
- ReLU activation
- Autoregressive next-token prediction

Despite the newer model name, Gruyère does not use every architectural component found in newer large-scale transformer implementations.

In particular, it retains the relatively straightforward GPT-2-style design used throughout the current Gruyère family.

## Training

Gruyère-1.0 was pretrained on approximately **2.6 billion tokens of FineWeb**.

This was a major increase in training data compared with the earlier Gouda models.

The training objective remained standard causal language modelling: predict the next token from the preceding context.

The larger training run allowed the 64M-parameter model to develop substantially stronger language modelling behaviour than the project's earliest models.

## Evaluation

Gruyère-1.0 was evaluated using a collection of standard language-model benchmarks.

| Benchmark | Score |
|---|---:|
| HellaSwag | **27.49%** |
| ARC-Easy | **38.30%** |
| ARC-Challenge | **22.61%** |
| PIQA | **53.54%** |
| WinoGrande | **50.59%** |
| OpenBookQA | **25.80%** |
| LAMBADA | **1.47%** |

These results should be interpreted in the context of the model's size.

Gruyère-1.0 was not intended to compete with large commercial language models. The purpose of these evaluations is instead to measure whether a relatively small model is learning useful statistical and factual structure.

## From model to system

One of the biggest differences between Gruyère-1.0 and the earlier Gouda releases was everything surrounding the model.

The project increasingly involved:

- Hugging Face model integration
- model loading
- text generation
- API inference
- streaming responses
- evaluation infrastructure
- checkpoint management
- a public website

The model was becoming one component of a larger system.

## The beginning of the Gruyère family

Gruyère-1.0 established the architecture that would be retained in the next release.

Rather than immediately increasing model size, the next stage would investigate whether additional high-quality training could improve the model's capabilities.

That experiment became Gruyère-1.1.