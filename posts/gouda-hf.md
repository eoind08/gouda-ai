---

title: "Gouda Comes to Hugging Face"

date: "2026-09-22"

author: "Gouda AI Team"

image: "/gouda-hf.png"

tags: ["Gouda", "Update"]

description: "How Gouda moved from locally trained checkpoints to models that can be loaded and used through the Hugging Face ecosystem."

---

## Introduction

Training a language model is only part of building a usable model.

A checkpoint sitting on a training machine is difficult for anyone else to use. For Gouda to become an actual open model project, the models needed to be packaged, documented and distributed in a standard way.

This led to Gouda's integration with the **Hugging Face ecosystem**.

## From checkpoint to model

During development, Gouda models were initially stored as PyTorch checkpoints.

This was useful during training because it kept the process simple. A checkpoint could contain the complete model and be loaded directly into the project's own code.

However, distribution introduces additional requirements.

A public model needs to communicate:

- what architecture it uses;
- what configuration it requires;
- which tokenizer it expects;
- how generation should be performed;
- and how another user can reproduce inference.

The Hugging Face ecosystem provides a standard interface for many of these requirements.

## Custom model architecture

Gouda does not simply use an off-the-shelf architecture.

The project's model implementation has to represent the exact architecture used during training. This became particularly important as the project moved between older GPT-style checkpoints and the newer Gruyère models.

Compatibility therefore became a real engineering problem.

A checkpoint trained with one architecture cannot simply be loaded into an implementation with a different set of layers, dimensions or parameter names.

This led to more deliberate separation between:

- model configuration;
- model implementation;
- checkpoint weights;
- tokenizer;
- generation code.

## Why distribution matters

Publishing a model changes what the project is.

Before distribution, Gouda is primarily a personal experiment.

After distribution, another person can download the model, inspect it, run inference and evaluate it independently.

That makes reproducibility much more important.

It also makes documentation important. A model card is not just promotional material. It records what the model is, what data it was trained on, how it was evaluated and where its limitations lie.

## The wider Gouda ecosystem

Hugging Face became one part of a larger system surrounding the models.

The current Gouda project consists of several interconnected components:

Training
   ↓
Checkpoint
   ↓
Model packaging
   ↓
Hugging Face
   ↓
Inference
   ↓
Gouda API
   ↓
Gouda website

The purpose of this infrastructure is ultimately simple: make the models easier to inspect and use.

## Conclusion

The move to Hugging Face marked an important transition for Gouda.

The project was no longer only about experimenting with transformer training. It was becoming an end-to-end open model project, where training, evaluation, packaging, inference and documentation all formed part of the same system.