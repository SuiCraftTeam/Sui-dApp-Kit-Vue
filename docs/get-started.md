# Get Started

Comparable to the official [Sui dApp Kit][sui-dapp-kit]; however, the Sui dApp Kit Vue is specifically intended for Vue 3 developers. Sui dApp Kit Vue is fully typed, the details of the API can be seen through the code prompt, or you can check the type declaration.

## Install

<CodeGroup>
<CodeGroupItem title="npm">

```sh:no-line-numbers
npm install sui-dapp-kit-vue
```

</CodeGroupItem>
<CodeGroupItem title="yarn">

```sh:no-line-numbers
yarn add sui-dapp-kit-vue
```

</CodeGroupItem>
<CodeGroupItem title="pnpm">

```sh:no-line-numbers
pnpm add sui-dapp-kit-vue
```

</CodeGroupItem>
<CodeGroupItem title="bun">

```sh:no-line-numbers
bun add sui-dapp-kit-vue
```

</CodeGroupItem>
</CodeGroup>

## Config

Usually you can use default config, when you need you can get and set them:

* autoConnect - Enables automatically reconnecting to the most recently used wallet account upon mounting.
* preferredWallets - A list of wallets that are sorted to the top of the wallet list.
* requiredFeatures - A list of features that are required for the dApp to function. This filters the list of wallets presented to users when selecting a wallet to connect from, ensuring that only wallets that meet the dApp requirements can connect.


```vue
<script setup lang="ts">
import { useConfig } from 'sui-dapp-kit-vue'
const { autoConnect, preferredWallets, requiredFeatures } = useConfig()

// disable auto connect
autoConnect.value = false

</script>
```

## Components

### ConnectButton

The ConnectButton shows the user a button to connect and disconnect a wallet. Usually you just need to use ConnectButton, once the user clicks on ConnectButton, the ConnectDialog will pop up.

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

### ConnectDialog

The ConnectDialog component opens a dialog that guides the user through connecting their wallet to the dApp. You can use ConnectDialog without ConnectButton and control the opening and closing of ConnectDialog by yourself:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ConnectDialog } from 'sui-dapp-kit-vue'

const connectDialog = ref()
</script>

<template>
    <div>
        <button @click="connectDialog.open()">Open Connect Dialog</button>
        <ConnectDialog ref="connectDialog" />
    </div>
</template>
```

**Exposes**
* isOpen - boolean, whether the dialog is open or not 
* open - function, open the dialog
* close - function, close the dialog

## Composables

### useWallets

useWallets returns an array of wallets that are available to the user. The wallets are sorted by their priority, with the highest priority wallet being the first in the array.

```vue
<script setup lang="ts">
import { useWallets } from 'sui-dapp-kit-vue'
const { wallets } = useWallets()
// ...
</script>
```

**Wallet properties**
* name - The name of the wallet.
* version - The version of the wallet as a string.
* icon - A data URL of the wallet icon as an SVG.
* accounts - An array of accounts that are available in the wallet.
* features - An object with all the wallet-standard features implemented by the wallet.
* chains - An array of chain identifiers that the wallet supports.

### useAccounts

useAccounts retrieves a list of connected accounts the dApp authorizes

```vue
<script setup lang="ts">
import { useAccounts } from 'sui-dapp-kit-vue'
const { accounts } = useAccounts()
// ...
</script>
```

**Account properties**
* address: The address of the account, corresponding with a public key.
* publicKey: The public key of the account, represented as a Uint8Array.
* chains: The chains the account supports.
* features: The features the account supports.
* label: An optional user-friendly descriptive label or name for the account.
* icon: An optional user-friendly icon for the account.

### useCurrentWallet

useCurrentWallet retrieves the wallet that is currently connected to the dApp and its connection status, if one exists.

```vue
<script setup lang="ts">
import { useCurrentWallet } from 'sui-dapp-kit-vue'
const { currentWalletStatus, currentWallet } = useCurrentWallet()
// ...
</script>
```

**Wallet properties**
* name - The name of the wallet.
* version - The version of the wallet as a string.
* icon - A data URL of the wallet icon as an SVG.
* accounts - An array of accounts that are available in the wallet.
* features - An object with all the wallet-standard features implemented by the wallet.
* chains - An array of chain identifiers that the wallet supports.

### useCurrentAccount

useCurrentAccount retrieves the wallet account that is currently selected, if one exists.

```vue
<script setup lang="ts">
import { useCurrentAccount } from 'sui-dapp-kit-vue'
const { currentAccount } = useCurrentAccount()
// ...
</script>
```

**Account properties**
* address: The address of the account, corresponding with a public key.
* publicKey: The public key of the account, represented as a Uint8Array.
* chains: The chains the account supports.
* features: The features the account supports.
* label: An optional user-friendly descriptive label or name for the account.
* icon: An optional user-friendly icon for the account.


### useConnectWallet

useConnectWallet returns a function for establishing a connection to a specific wallet.

```vue
<script setup lang="ts">
import { useConnectWallet } from 'sui-dapp-kit-vue'
const { connect } = useConnectWallet()
// ... 
connect(wallet)
</script>
```

### useDisconnectWallet

useDisconnectWallet returns a function for disconnecting from an active wallet connection, if currently connected.

```vue
<script setup lang="ts">
import { useDisconnectWallet } from 'sui-dapp-kit-vue'
const { disconnect } = useDisconnectWallet()
// ... 
disconnect()
</script>
```

### useSignPersonalMessage

useSignPersonalMessage is used to prompt the user to sign a message with their wallet.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
    ConnectButton,
    useSignPersonalMessage,
} from 'sui-dapp-kit-vue'


const { signPersonalMessage } = useSignPersonalMessage()
const sig = ref()

const msg = ref('hello, World!')
const signMsg = async () => {
    const { signature } = await signPersonalMessage({ 
        message: new TextEncoder().encode(msg.value) 
    })
    sig.value = signature
}
</script>

<template>
    <div>
        <ConnectButton />
        <div>
            <h2>Sign Message</h2>
            <div>
                Message: <input v-model="msg">
                <button @click="signMsg">Sign Message</button>
            </div>
            <div>
                Signature: {{ sig }}
            </div>
        </div>
    </div>
</template>
```

**Arguments**

* message: The message to sign, as a Uint8Array.

**Result**

* signature: The signature of the message, as a Base64-encoded string.
* bytes: The bytes of the message, as a a Base64-encoded string.

### useSignTransactionBlock

useSignTransactionBlock is used to prompt the user to sign a transaction block with their wallet.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
    ConnectButton,
    TransactionBlock,
    useSignTransactionBlock,
} from 'sui-dapp-kit-vue'

const { signTransactionBlock } = useSignTransactionBlock()
const sig = ref()
const signEmptyTransactionBlock = async () => {
    const { signature } = await signTransactionBlock({
        transactionBlock: new TransactionBlock(),
        chain: 'sui:devnet'
    })
    sig.value = signature
}
</script>

<template>
    <div>
        <ConnectButton />
        <div>
            <h2>Sign Empty Transaction Block</h2>
            <button @click="signEmptyTransactionBlock">
                Sign empty transaction block
            </button>
            <div>
                Signature: {{ sig }}
            </div>
        </div>
    </div>
</template>
```

**Arguments**

* transactionBlock: The transaction block to sign.
* chain: (optional) The chain identifier the transaction block should be signed for.

**Result**

* signature: The signature of the message, as a Base64-encoded string.
* transactionBlockBytes: The serialized transaction bytes, as a a Base64-encoded string.

### useSignAndExecuteTransactionBlock

useSignAndExecuteTransactionBlock is used to prompt the user to sign and execute a transaction block with their wallet.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
    ConnectButton,
    TransactionBlock,
    useSignAndExecuteTransactionBlock,
} from 'sui-dapp-kit-vue'

const { signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock()
const sig = ref()
const signAndExecuteEmptyTransactionBlock = async () => {
    const { digest } = await signAndExecuteTransactionBlock({
        transactionBlock: new TransactionBlock(),
        chain: 'sui:devnet'
    })
    sig.value = digest
}
</script>

<template>
    <div>
        <ConnectButton />
        <div>
            <h2>Sign And Execute Empty Transaction Block</h2>
            <button @click="signAndExecuteEmptyTransactionBlock">
                Sign and execute empty transaction block
            </button>
            <div>
                Digest: 
                <a target="_blank"
                    :href="`https://suiexplorer.com/txblock/${sig}?network=devnet`">
                    {{ sig }}
                </a>
            </div>
        </div>
    </div>
</template>
```

**Arguments**

* transactionBlock: The transaction block to sign and execute.
* chain: (optional) The chain identifier the transaction block should be signed for.


## Query Composables

To be implemented later

## zkSend Integration

To be implemented later

## Example App

You can see example App in example/ directory of the [repo][sui-dapp-kit-vue], clone the repo and run the example App:

```sh:no-line-numbers
git clone https://github.com/SuiCraftTeam/Sui-dApp-Kit-Vue.git
cd Sui-dApp-Kit-Vue
npm i
npm run dev
```

[sui-dapp-kit]: https://sdk.mystenlabs.com/dapp-kit
[sui-dapp-kit-vue]: https://github.com/SuiCraftTeam/Sui-dApp-Kit-Vue

