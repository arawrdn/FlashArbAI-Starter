# FlashArbAI-Starter

Starter repository for building an AI-driven DeFi arbitrage scanner integrated with WalletConnect (wagmi and @reown/appkit).

> Goal: have a baseline project that you can fork, extend (AI model, real price feeds, and flash loan executor), and later contribute to other projects via pull requests.

## Features (starter)
- Connect wallet using **wagmi** (extendable with WalletConnect / Reown AppKit)
- Demo button to check *arbitrage* (dummy data) — placeholder to replace with real price feeds from Uniswap / Balancer
- Next.js structure ready to deploy on Vercel

## Prerequisites
- Node.js >= 18
- npm or pnpm
- Git
- (Optional) `gh` (GitHub CLI) to create repos from terminal

## Quickstart (local)
1. Clone repo
```bash
git clone https://github.com/<username>/FlashArbAI-Starter.git
cd FlashArbAI-Starter
