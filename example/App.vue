<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client'
import { useQuery } from '@tanstack/vue-query'
import {
    ConnectButton,
    TransactionBlock,
    useCurrentWallet,
    useCurrentAccount,
    useSignPersonalMessage,
    useSignTransactionBlock,
    useSignAndExecuteTransactionBlock,
} from '../src/'

const { currentWallet } = useCurrentWallet()
const { currentAccount } = useCurrentAccount()
const { signPersonalMessage } = useSignPersonalMessage()
const { signTransactionBlock } = useSignTransactionBlock()
const { signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock()


const params = computed(() => ({
    owner: currentAccount?.value?.address ?? ''
}))
const result = useQuery({
    queryKey: ['getOwnedObjects', params],
    queryFn: async () => {
        const rpcUrl = getFullnodeUrl('devnet')
        const client = new SuiClient({ url: rpcUrl })
        return await client.getOwnedObjects(params.value)
    },
})

const signatures = reactive<(string | undefined)[]>([undefined, undefined, undefined])

const msg = ref('hello, World!')
const signMsg = async () => {
    const { signature } = await signPersonalMessage({ message: new TextEncoder().encode(msg.value) })
    signatures[0] = signature
}

const signEmptyTransactionBlock = async () => {
    const { signature } = await signTransactionBlock({
        transactionBlock: new TransactionBlock(),
        chain: 'sui:devnet'
    })
    signatures[1] = signature
}

const signAndExecuteEmptyTransactionBlock = async () => {
    const { digest } = await signAndExecuteTransactionBlock({
        transactionBlock: new TransactionBlock(),
        chain: 'sui:devnet'
    })
    signatures[2] = digest
}
</script>

<template>
    <div>
        <ConnectButton />
        <div>
            <h2>Current Wallet</h2>
            <div>
                {{ currentWallet()?.name }}
            </div>
        </div>
        <div>
            <h2>Owned Objects</h2>
            <div>
                {{ result.data }}
            </div>
        </div>
        <div>
            <h2>Sign Message</h2>
            <div>
                Message: <input v-model="msg"> <button @click="signMsg">Sign Message</button>
            </div>
            <div>
                Signature: {{ signatures[0] }}
            </div>
        </div>
        <div>
            <h2>Sign Empty Transaction Block</h2>
            <button @click="signEmptyTransactionBlock">Sign empty transaction block</button>
            <div>
                Signature: {{ signatures[1] }}
            </div>
        </div>
        <div>
            <h2>Sign And Execute Empty Transaction Block</h2>
            <button @click="signAndExecuteEmptyTransactionBlock">Sign and execute empty transaction block</button>
            <div>
                Digest: <a target="_blank" :href="`https://suiexplorer.com/txblock/${signatures[2]}?network=devnet`">{{ signatures[2] }}</a>
            </div>
        </div>
    </div>
</template>
