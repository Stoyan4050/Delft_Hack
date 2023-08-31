# XRPLCharity: A Transparent Charity Platform on XRPL

![XRPLCharity Logo](logo.png)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Benefits](#benefits)
4. [Technology Stack](#technology-stack)
5. [How it Works](#how-it-works)
6. [Installation](#installation)
    - [Requirements](#requirements)
    - [Setup](#setup)
7. [Usage](#usage)
8. [Acknowledgments](#acknowledgments)

## Introduction

XRPLCharity is an innovative platform for transparent charitable donations, built on top of the XRP Ledger (XRPL) using Django and React. The platform empowers charities to list their projects in a transparent manner and ensures that funds go exactly where they are intended to go. Every transaction and fund allocation is recorded on the XRPL, offering complete transparency and traceability.

## Features

- **Wallet Creation**: Charities can create or log into an existing wallet using Gem Wallet.
- **Project Listing**: Charities can list new projects specifying crucial information like location, description, retailer address, images, proforma invoice, etc.
- **NFT for Projects**: Each project listing creates a unique NFT with all the project info encoded into the URI.
- **Transparent Donations**: Donors can view live progress of fund collection and can contribute directly via XRP transactions.
- **Automatic Fund Transfer**: When the target amount is reached, the funds are automatically transferred to the pre-specified retailer.
- **NFT Burning**: On successful completion of the project, the corresponding NFT is automatically burned.

## Benefits

- **Transparency**: Every transaction is recorded on the XRPL, ensuring full transparency.
- **Reduced Costs**: Transaction fees are lower than traditional banking methods, especially for cross-border payments.
- **Speed**: XRP Ledger's inherent efficiency ensures quick fund transfers.
- **Security**: The use of blockchain technology guarantees the security of transactions.
- **Targeted Funding**: Funds can only be sent to pre-specified retailers, ensuring they are used as intended.
- **Real-Time Updates**: Both the donor and charity can track fund status in real-time.

## Technology Stack

- [Django](https://www.djangoproject.com/)
- [React](https://reactjs.org/)
- [XRPL](https://xrpl.org/)
- [xrpl-py](https://github.com/XRPLF/xrpl-py)
- [Gem Wallet](https://gemwallet.app/)

## How it Works

1. **Charity Onboarding**: The charity logs in or creates a new wallet via Gem Wallet.
2. **Project Creation**: The charity lists a new project by providing the necessary details. An NFT corresponding to the project is generated in the charity's wallet.
3. **Donor Engagement**: Donors browse through the list of charitable projects and click on the "transact" button to contribute.
4. **Transaction Signing**: The transaction is signed by the donor, transferring the specified amount to the charity's wallet.
5. **Real-Time Updates**: The platform updates the project's fund status on both the charity's domain and the frontend website.
6. **Automatic Fund Transfer**: Upon reaching the target amount, the collected funds are automatically transferred to the pre-specified retailer, and the project's NFT is burned.

## Installation

### Requirements

- Python 3.x
- Node.js
- Yarn or npm
- XRPL Testnet or Mainnet Access

### Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/Stoyan4050/Delft_Hack.git
    cd Delft_Hack
    ```

2. Install backend dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Install frontend dependencies:

    ```bash
    cd frontend
    npm install
    ```

4. Run migrations:

    ```bash
    python manage.py migrate
    ```

5. Start the backend server:

    ```bash
    python manage.py runserver
    ```

6. Start the frontend server:

    ```bash
    cd frontend
    npm start
    ```

## Usage

Visit `http://localhost:3000` for the frontend or `http://localhost:8000` for the backend.

## Acknowledgments

- [XRPLF](https://xrpl.org/) for the wonderful technology that made this possible.
- [Gem Wallet](https://www.gem.co/) for seamless wallet integration.

---

For more details, please feel free to contact us.

Made with ❤️ by the Big_Team.
