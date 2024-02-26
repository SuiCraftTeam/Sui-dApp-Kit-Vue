<script setup lang="ts">
import { ref } from 'vue'
import { WalletWithRequiredFeatures } from '@mysten/wallet-standard'
import { useWallets, useConnectWallet, useCurrentWallet } from '../composables'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
} from '@headlessui/vue'


const { wallets } = useWallets()
const { currentWalletStatus } = useCurrentWallet()
const walletStatusMsg = ref()
const onSelectWallet = async (wallet: WalletWithRequiredFeatures) => {
    const { connect } = useConnectWallet()
    walletStatusMsg.value = 'Connecting to wallet...'
    await connect(wallet)
    if (currentWalletStatus.value == 'connected') {
        walletStatusMsg.value = 'Wallet connected.'
        close()
    } else if (currentWalletStatus.value == 'disconnected') {
        walletStatusMsg.value = 'Connection failed.'
    }
}

const isOpen = ref(false)
const open = () => {
    isOpen.value = true
    walletStatusMsg.value = undefined
}
const close = () => isOpen.value = false

defineExpose({ open, close })
</script>

<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="isOpen = false" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                        <DialogPanel class="connect-dialog-panel">
                            <DialogTitle class="connect-dialog-title">
                                {{ wallets.length == 0 ? 'Get Started with Sui' : 'Connect a Wallet' }}
                            </DialogTitle>
                            <div class="connect-dialog-content">
                                <div class="mx-auto w-full p-4">
                                    <div class="max-w-96" v-if="wallets.length == 0">
                                        <div class="text-base">Install the Sui Wallet Extension</div>
                                        <p class="mb-4 text-sm text-gray-600">
                                            We recommend pinning Sui Wallet to your taskbar for quicker access.
                                        </p>
                                        <div class="text-base">Create or Import a Wallet</div>
                                        <p class="mb-4 text-sm text-gray-600">
                                            Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.
                                        </p>
                                        <div class="text-base">Refresh Your Browser</div>
                                        <p class="mb-4 text-sm text-gray-600">
                                            Once you set up your wallet, refresh this window browser to load up the extension.
                                        </p>

                                        <div class="flex justify-end">
                                            <div class="connect-dialog-install-button">
                                                <a href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil">
                                                    Install Sui Wallet Extension
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <RadioGroup v-else>
                                        <div class="space-y-2">
                                            <RadioGroupOption @click="onSelectWallet(wallet)" @keyup.enter="onSelectWallet(wallet)" as="template" v-for="wallet in wallets" :key="wallet.name" :value="wallet" v-slot="{ active, checked }">
                                                <div :class="[
                                                    active
                                                        ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                                                        : '',
                                                    checked ? 'bg-sky-900/75 text-white ' : 'bg-white ',
                                                ]" class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none">
                                                    <div class="flex w-full items-center justify-between">
                                                        <div class="flex items-center w-64 gap-4">
                                                            <img :src="wallet.icon" class="w-8 h-8" />
                                                            <div class="text-sm">
                                                                <RadioGroupLabel as="p" :class="checked ? 'text-white' : 'text-gray-900'" class="font-medium">
                                                                    {{ wallet.name }}
                                                                </RadioGroupLabel>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </RadioGroupOption>
                                        </div>
                                    </RadioGroup>
                                    <div class="text-sm mt-4">
                                        {{ walletStatusMsg }}
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<style scoped>
@import '/assets/style/main.css';

.connect-dialog-panel {
    @apply md:w-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all;
}

.connect-dialog-title {
    @apply text-lg text-center font-bold leading-6 text-gray-900;
}

.connect-dialog-content {
    @apply mt-2;
}

.connect-dialog-install-button {
    @apply bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow max-w-fit;
}
</style>
