---
title: "Gruyère-1.1 — Improving the Gruyère Architecture"

date: "2026-09-22"

author: "Gouda AI Team"

image: "/gruyere-1.1.png"

tags: ["Gouda", "Gruyère", "Release"]

description: "The second Gruyère release, extending Gruyère-1.0 with additional training on curated educational data."

---

## Introduction

**Gruyère-1.1** was released on 22 September 2026.

Rather than introducing a new architecture, the release focused on what could be achieved by taking the existing Gruyère-1.0 model and continuing its training on additional data.

Gruyère-1.1 is therefore best understood as a **fine-tuned version of Gruyère-1.0** rather than an entirely new model.

## Architecture

Gruyère-1.1 uses the same architecture as Gruyère-1.0.

The model consists of:

- Approximately **64 million parameters**
- **12 transformer layers**
- **8 attention heads**
- **512-dimensional embeddings**
- GPT-2-style attention
- Learned positional embeddings
- ReLU activation
- Autoregressive next-token prediction

No architectural redesign was introduced between the two releases.

This was deliberate.

Rather than changing the model architecture, the experiment focused on the effect of additional training data and a different optimisation strategy.

## Pretraining

Gruyère-1.0 and Gruyère-1.1 share the same primary pretraining stage.

The model was pretrained on approximately **2.6 billion tokens of FineWeb**.

The pretraining stage used **Muon** as the optimiser.

This produced the base Gruyère-1.0 model.

## Additional training

For Gruyère-1.1, the model was then trained on an additional approximately **100 million tokens from the NCERT dataset**.

The purpose of this stage was to expose the model to a more concentrated source of educational material.

This differs substantially from general web pretraining.

Rather than continuing to train on another large sample of general internet text, the additional training data was deliberately more focused on educational content.

## Optimisation

The additional NCERT training also used a different optimisation setup.

Rather than using Muon alone, Gruyère-1.1 used **Muon + AdamW** during this additional training stage.

The result was therefore not a new architecture, but a new training stage applied to an existing model.

Conceptually:

```text
FineWeb
   ↓
Gruyère-1.0
   ↓
100M NCERT tokens
   ↓
Muon + AdamW
   ↓
Gruyère-1.1
```

## Evaluation

Gruyère-1.1 was evaluated using the same collection of benchmarks used for Gruyère-1.0.

Benchmark	Gruyère-1.0	Gruyère-1.1
HellaSwag	27.49%	27.49%
ARC-Easy	38.30%	38.30%
ARC-Challenge	22.61%	22.61%
PIQA	53.54%	53.54%
WinoGrande	50.59%	50.59%
OpenBookQA	25.80%	25.80%
LAMBADA	1.47%	1.47%

The benchmark scores were unchanged across the reported evaluation suite.

This is an important result.

The purpose of the NCERT training was not simply to increase every general benchmark score. The experiment instead investigates whether focused additional training can alter the model's behaviour in particular domains without requiring a new architecture or a completely new pretraining run.

## Why not build a new model?

One of the advantages of continuing training from an existing model is efficiency.

Gruyère-1.0 had already learned broad language patterns from 2.6 billion FineWeb tokens.

Starting again from random initialisation would discard that knowledge.

Instead, Gruyère-1.1 takes the existing model and changes the distribution of information it receives during an additional training stage.

This makes the release an experiment in continued training and domain adaptation as much as a model release.

## Conclusion

Gruyère-1.1 does not represent a fundamental architectural change from Gruyère-1.0.

It represents a different question:

| What happens when a small general-purpose language model is given additional training on a concentrated educational dataset?

With the same 12-layer, 8-head, 512-dimensional architecture, the same 2.6B-token FineWeb pretraining and an additional 100M NCERT tokens, Gruyère-1.1 provides a controlled continuation of the Gruyère experiment.

The model therefore marks the next stage of Gouda's investigation into how much can be achieved by improving training and data, rather than simply increasing model size.