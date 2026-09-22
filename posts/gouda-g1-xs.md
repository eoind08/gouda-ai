---
title: "gouda-g1-xs — Returning to Small Language Models"

date: "2026-09-08"

author: "Gouda AI Team"

image: "/gouda-g1-xs.png"

tags: ["Gouda", "Release"]

description: "The September 2026 release of gouda-g1-xs, a 30 million parameter Gouda-family language model trained on approximately 800 million tokens."

---

## Introduction

More than a year after Gouda0.0.1, the project returned to language-model training with **gouda-g1-xs**, released on 8 September 2026.

The new model was dramatically smaller than Gouda0.0.1.

Rather than building a 100M+ parameter model and attempting to train it on a relatively small dataset, gouda-g1-xs was designed around a much smaller parameter budget and a considerably larger amount of training data relative to its size.

The result was a roughly **30 million parameter** model trained on approximately **800 million tokens of FineWeb**.

It was still a tiny language model. It was also considerably more useful as an experiment.

## Architecture

gouda-g1-xs used:

- Approximately **30M parameters**
- **6 transformer layers**
- **6 attention heads**
- **324-dimensional embeddings**
- Causal self-attention
- Autoregressive next-token prediction

The model was deliberately small.

The objective was not to compete with large language models. Instead, gouda-g1-xs was intended to investigate how much useful language modelling behaviour could emerge from a model that could be trained on relatively modest hardware.

## Training

The model was trained on approximately **800 million tokens of FineWeb**.

This represented a significant change from Gouda0.0.1.

The first Gouda had approximately 124M parameters but only around 400M training tokens. G1-XS reversed the emphasis: a much smaller model received substantially more training relative to its capacity.

This allowed the project to investigate a different part of the model-training problem.

However, training did not proceed perfectly.

A later stage of training **blew up**, making the resulting checkpoint unusable. Rather than continuing with the corrupted run, an earlier checkpoint was selected for the release.

This is an important part of the model's history. The released model is not simply the final checkpoint from a successful uninterrupted run.

## Evaluation

gouda-g1-xs achieved approximately **25.4% on HellaSwag**.

This was only a modest improvement over Gouda0.0.1 despite the substantial differences in architecture and training.

That result reinforced an important point: small improvements in benchmark performance do not necessarily correspond to dramatic improvements in generation quality.

The model nevertheless demonstrated significantly more useful language behaviour than the original Gouda release.

## Why build a 30M model?

Small models provide an unusually useful environment for experimentation.

Training a large model can make it difficult to understand which changes actually matter. With a small model, experiments can be performed much more quickly, failures are cheaper, and the relationship between architecture, data and optimisation is easier to investigate.

gouda-g1-xs therefore served two purposes.

It was a model in its own right, but it was also an experimental platform for the next generation of Gouda.

## Lessons from G1-XS

The failure of the later training stage was particularly instructive.

Training stability matters. A model cannot simply be left running indefinitely with the assumption that more optimisation will always produce a better checkpoint.

The project also continued to encounter the central problem first seen with Gouda0.0.1:

> **How do you make a tiny amount of compute produce the most useful possible language model?**

The answer would lead directly into the Gruyère series.