# Sui-dApp-Kit-Vue

The Sui dApp Kit Vue is a set of Vue 3 components, composables, and utilities to help developers build a dApp for the Sui ecosystem. It is comparable to the official [Sui dApp Kit](https://sdk.mystenlabs.com/dapp-kit); however, the Sui dApp Kit Vue is specifically intended for Vue 3 developers, rather than React developers.

## ✨ Features

* Fully typed.
* Automatic wallet state management.
* Components with customizable style and text.
* Signing messages and committing transactions only takes a few lines of code.

## 📦 Install

```bash
npm i sui-dapp-kit-vue
```

## 🤹‍♀️ Usage

Add a connect button:

```vue
<script setup lang="ts">
import { ConnectButton } from 'sui-dapp-kit-vue'
</script>

<template>
    <div>
        <ConnectButton />
    </div>
</template>
```


Read docs: [https://suicraftteam.github.io/Sui-dApp-Kit-Vue/](https://suicraftteam.github.io/Sui-dApp-Kit-Vue/)

Run example app:
```sh:no-line-numbers
git clone https://github.com/SuiCraftTeam/Sui-dApp-Kit-Vue.git
cd Sui-dApp-Kit-Vue
bun i
bun dev
```


## 📄 License

[MIT License](https://github.com/SuiCraftTeam/Sui-dApp-Kit-Vue/blob/master/LICENSE) © 2024-PRESENT [SuiCraftTeam](https://github.com/SuiCraftTeam)