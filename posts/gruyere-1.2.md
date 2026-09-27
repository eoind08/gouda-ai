---

title: "Gruyère-1.2 — From Language Model to Chat Model"

date: "2026-09-27"

author: "Gouda AI Team"

image: "/gruyere-1.2.png"

tags: ["Gouda", "Gruyère", "Release"]

---

## description: "Gruyère-1.2 builds on the Gruyère-1.1 foundation with a full fine-tuning pass on UltraChat-200k, moving the model from continued pretraining toward conversational use."

# Gruyère-1.2 — From Language Model to Chat Model

Today we are releasing **Gruyère-1.2**, the latest model in the Gouda family and the third iteration of the Gruyère architecture.

Gruyère-1.2 takes the foundation established by Gruyère-1.0 and refined through Gruyère-1.1, adding a dedicated conversational fine-tuning stage. Rather than changing the underlying architecture, this release focuses on changing **what the model has learned to do with that architecture**.

The result is a model that moves another step away from being simply a pretrained language model and toward being a model designed to interact with users.

## From Gruyère-1.0 to 1.2

The Gruyère series has developed through several distinct training stages.

**Gruyère-1.0** was trained from scratch on approximately **2.6 billion tokens from FineWeb-Edu**, establishing the core language-model foundation.

**Gruyère-1.1** continued training this model on approximately **100 million tokens of NCERT educational material**, focusing specifically on explanatory and instructional text.

Gruyère-1.2 takes the resulting model and introduces a different type of training: **supervised fine-tuning on the full UltraChat-200k dataset**.

This distinction is important. The first two stages primarily expanded and refined the model's underlying language capabilities. Gruyère-1.2 instead concentrates on teaching the model how to use those capabilities in a conversational setting.

## Fine-tuning on UltraChat

For Gruyère-1.2, the complete **UltraChat-200k** dataset was used for a single epoch of fine-tuning, comprising approximately **254 million tokens**.

No additional filtering was applied to the dataset.

The fine-tuning stage was deliberately kept relatively simple. Rather than introducing a large collection of additional training techniques, the aim was to see how far the existing Gruyère foundation could be taken simply by exposing it to a substantial conversational dataset.

This also makes the progression between versions easier to understand:

> **2.6B FineWeb-Edu → 100M NCERT → 254M UltraChat**

Each stage serves a different purpose, building on the previous one rather than replacing it.

## The same Gruyère architecture

Gruyère-1.2 retains the architecture introduced with Gruyère-1.0 and used again in 1.1.

The model contains **12 transformer layers**, **8 attention heads**, and a **512-dimensional embedding space**, with a context length of **1,024 tokens**.

It uses learned positional embeddings, GPT-2-style causal self-attention and ReLU activations.

There was no architectural expansion between Gruyère-1.1 and 1.2. The experiment was instead about **training the same model differently**.

This gives us a cleaner comparison between the effects of continued pretraining and conversational fine-tuning.

## Training a model in a day

One of the constraints of the Gouda project is that models should remain possible to train on relatively accessible hardware.

Gruyère-1.2 was trained entirely on a single **NVIDIA RTX 3080 with 10GB of VRAM**.

The complete Gruyère lineage required approximately:

| Model       | Training stage      | Dataset          |        Time |
| ----------- | ------------------- | ---------------- | ----------: |
| Gruyère-1.0 | Pretraining         | 2.6B FineWeb-Edu |     17h 36m |
| Gruyère-1.1 | Further pretraining | 100M NCERT       |         36m |
| Gruyère-1.2 | Fine-tuning         | 254M UltraChat   |      2h 25m |
| **Total**   |                     |                  | **20h 37m** |

The entire progression from a model trained from scratch to a conversationally fine-tuned model therefore remained within a **24-hour training budget**.

This is an important part of what we are trying to explore with Gouda: how capable a small model can become when the constraints are real, the hardware is local, and training time is limited.

## What changed?

The most obvious change in Gruyère-1.2 is not its number of layers or attention heads.

It is its **behaviour**.

Gruyère-1.0 was primarily a small autoregressive language model. Its job was to predict what text comes next.

Gruyère-1.1 added another layer of capability through educational text, giving the model substantially more exposure to explanations and instructional writing.

Gruyère-1.2 introduces conversational examples at scale.

The intention is for the model to become more capable of:

* following conversational prompts;
* producing responses rather than simply continuing text;
* maintaining a coherent interaction;
* explaining information in a more structured way;
* adapting its output to the conversational context.

It is still a small model, and it remains subject to the limitations of its size and training data. The purpose of the release is not to suggest otherwise, but to measure how much behaviour can be changed through a relatively inexpensive fine-tuning stage.

## Evaluation

Gruyère-1.2 is evaluated alongside Gruyère-1.1 across a range of language understanding and reasoning benchmarks.

The evaluation suite includes **HellaSwag, ARC-Easy, ARC-Challenge, PIQA, Winogrande, OpenBookQA, LAMBADA, BoolQ, COPA, SciQ, WSC273, WikiText, and TruthfulQA**.

The results below compare the two versions using the relevant normalised accuracy, accuracy, multiple-choice, or perplexity metric for each task.

| Benchmark | Metric | Random Chance | Gruyère-1.1 | Gruyère-1.2 |
|---|---|---|---:|---:|
| HellaSwag | `acc_norm` | 25% | 26.18% | **27.7%** |
| ARC-Easy | `acc_norm` | ~25% | 38.34% | **38.68%** |
| ARC-Challenge | `acc_norm` | ~25% | 25.60% | **24.66%** |
| PIQA | `acc_norm` | 50% | 51.41%| **59.30%** |
| Winogrande | `acc_norm` | 50% | 49.33%| **51.46%** |
| OpenBookQA | `acc_norm` | 25% | 26.00% | **27.20%** |
| BoolQ | `acc` | 50% / (62% 'yes' baseline) | 55.50%| **60.61%**|
| COPA | `acc_norm` | 50% | 58.00%| **56.00%** |
| SciQ | `acc_norm` | 25% | 46.20%| **51.70%** |
| WSC273 | `acc_norm` | 50% | 51.08%| **51.28%** |
| TruthfulQA MC2 | `acc` | ~20-25% | 47.24%| **45.07%** |
| --- | --- | --- | --- | --- |
| WikiText | `word_perplexity` | N/A | 55,167.79| **145.55** |
| WikiText | `byte_perplexity` | ~15 | 7.704| **2.538** |
| WikiText | `bits_per_byte` | ~3.9 | 2.946| **1.344** |
| LAMBADA OpenAI | `Perplexity` | 50,304 | 6,950,578.35 (potential error) | **1,165.35** |

## Looking at the model

Benchmark scores only describe part of the change.

We are also examining Gruyère-1.2 through direct generations from the model, looking at whether its responses are more coherent, useful and conversational than those of earlier Gruyère releases.

These examples are particularly useful for a model of this size. A small change in benchmark accuracy does not necessarily capture the difference between a model that merely continues text and one that can meaningfully respond to a prompt.

### Example prompts

*Qualitative examples will be added here following the final evaluation run.*

---

## A small model, trained locally

Gruyère-1.2 is intentionally modest.

At approximately **89 million parameters**, it is far smaller than the models normally associated with modern chat systems.

## The next stage

Gruyère-1.2 marks the end of the current three-stage Gruyère training progression:

**Pretraining → Further pretraining → Fine-tuning**

The next iterations of Gouda will allow us to explore whether further improvements come from scaling the model, improving the data, changing the architecture, or introducing more sophisticated post-training methods.

For now, Gruyère-1.2 provides a useful checkpoint in that process: the same small architecture, trained through three increasingly specialised stages, from general language modelling to educational text and finally to conversation.

**Gruyère-1.2 is available now: [GoudaAI](https://gouda-ai.vercel.app/)**
