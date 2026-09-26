---
title: "How Gouda Models Are Named"

date: "2026-09-26"

author: "Gouda AI Team"

image: "/naming.png"

tags: ["Gouda", "Research"]

description: "An explanation of the Gouda model naming system and the parameter ranges represented by Ricotta, Gruyère, Gouda and Cheddar."

---

## Introduction

Gouda is both the name of the project and the name of a family of language models.

Within that family, models are assigned cheese names according to their parameter count.

The system is intentionally simple.

### The Gouda family

A **Gouda-family model** is a chat model developed as part of the Gouda project.

Its cheese classification is determined by the number of parameters:

| Parameter count | Model family |
|---:|---|
| <30M | Ricotta |
| 30M–80M | Gruyère |
| 80M–200M | Gouda |
| 200M+ | Cheddar |

The parameter category and the model version are separate concepts.

For example, **Gruyère-1.1** means that the model belongs to the Gruyère parameter range and is version 1.1 of that model line.

## Why parameter ranges?

Parameter count is one of the simplest ways of describing the scale of a language model.

It does not completely determine capability. Training data, architecture, optimisation, tokenisation and inference all matter.

Nevertheless, parameter count provides a useful first approximation of the scale at which a model operates.

The Gouda naming system therefore gives users an immediate indication of model size without requiring them to inspect the model configuration.

## The four categories

### Ricotta

Models below 30 million parameters fall into the Ricotta category.

These models are intended primarily for very small-scale experimentation.

At this scale, the limitations imposed by model capacity become particularly obvious.

### Gruyère

Models from 30M to 80M parameters are Gruyère models.

The current Gruyère line includes Gruyère-1.0 and Gruyère-1.1.

Both use approximately 64M parameters.

### Gouda

Models between 80M and 200M parameters use the Gouda designation itself.

This is also the name of the overall model family, so context determines whether "Gouda" refers to the project or this particular size category.

### Cheddar

Models above 200M parameters are classified as Cheddar.

This category has not yet defined the current public model lineup, but it provides a naming convention for future larger models.

## Version numbers

The cheese category does not replace normal versioning.

Instead, the two pieces of information work together.

For example:

**Gruyère-1.0**

- Gruyère → approximately 30–80M parameters
- 1.0 → model version

**Gruyère-1.1**

- Gruyère → approximately 30–80M parameters
- 1.1 → updated version of the model

This makes it possible to change the model while retaining a consistent description of its scale.

## The current lineage

The publicly released Gouda models currently consist of:

1. **Gouda0.0.1** — 28 May 2025
2. **gouda-g1-xs** — 8 September 2026
3. **Gruyère-1.0** — 9 September 2026
4. **Gruyère-1.1** — 22 September 2026

The naming system is designed to remain usable as the project grows.

If future Gouda models become substantially larger, their cheese classification will change accordingly.