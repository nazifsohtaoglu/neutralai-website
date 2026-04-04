# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- **Run Development Server**: `npm run dev` (starts the development server on `http://localhost:3200`)
- **Build for Production**: `npm run build`
- **Start Production Server**: `npm run start`
- **Run Linter**: `npm run lint`

## High-Level Code Architecture

- **Next.js App Router**: The application is built with Next.js using the App Router for efficient routing and page management.
- **Root Layout and Pages**: The main application layout is defined in `app/layout.tsx`, and the root page is `app/page.tsx`.
- **Route Segments**: Pages such as "About", "Privacy", and "Terms" are structured as distinct route segments within the `app/` directory (e.g., `app/about/page.tsx`).
- **Global Styles**: Global CSS styles are managed in `app/globals.css`.
- **Shared Components**: Reusable UI components like `Navbar`, `Footer`, and `BackButton` are located in `app/components/` and are utilized across the application.

## NeutralAI Gateway Product Overview

NeutralAI Gateway is a stateless PII (Personally Identifiable Information) Gateway designed for regulated UK industries. It detects and masks sensitive data before it reaches an LLM (Large Language Model) using Microsoft Presidio and SpaCy.

### Key Features:
- **PII Detection**: Identifies sensitive data types (PERSON, EMAIL_ADDRESS, PHONE_NUMBER, LOCATION, CRYPTO, IBAN).
- **API**: Provides a FastAPI endpoint for text masking.
- **Architecture**: Utilizes a two-stage detection process (Fast Scan with Presidio/SpaCy and Semantic Validation with Qdrant Vector DB) and Redis for reversible masking.
- **Deployment Options**: Available as SaaS, on-prem/VPC, and via a browser extension.

