<script setup>
import { ref } from 'vue'
import { formatAddress } from '@mysten/sui.js/utils'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon, CheckCircleIcon } from '@heroicons/vue/20/solid'
import ConnectDialog from './ConnectDialog.vue'
import { useConfig, useWallets, useConnectWallet, useAccounts, usePersistState, useDisconnectWallet, useCurrentWallet, useCurrentAccount } from '../composables'


const config = useConfig()
const persistState = usePersistState()
const { wallets } = useWallets()
const { currentWalletStatus } = useCurrentWallet()
const { currentAccount } = useCurrentAccount()
const { accounts } = useAccounts()
const { connect } = useConnectWallet()
const { disconnect } = useDisconnectWallet()

const connectDialog = ref()

if (config.autoConnect.value && persistState.value.lastConnectedWalletName && persistState.value.lastConnectedAccountAddress) {
    wallets.forEach(w => w.name === persistState.value.lastConnectedWalletName && connect(w))
}

const openDialog = () => connectDialog.value.open()
const closeDialog = () => connectDialog.value.close()

defineExpose({ openDialog, closeDialog })
</script>


<template>
    <div class="w-fit flex items-center">
        <Menu v-if="currentWalletStatus === 'connected'" as="div" class="relative inline-block text-left font-mono">
            <MenuButton class="inline-flex w-full justify-center connect-btn-menu-btn">
                {{ formatAddress(currentAccount.address) }}
                <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" />
            </MenuButton>

            <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                <MenuItems class="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div class="px-1 py-1">
                        <MenuItem @click="(currentAccount = account) && (persistState.lastConnectedAccountAddress = account.address)" v-for="account of accounts" v-slot="{ active }">
                        <button class="group connect-btn-menu-item gap-4 justify-between">
                            <div class="text-nowrap">{{ formatAddress(account.address) }}</div>
                            <CheckCircleIcon v-show="currentAccount.address === account.address" class="h-5 w-5 self-end" />
                        </button>
                        </MenuItem>
                    </div>

                    <div class="px-1 py-1">
                        <MenuItem v-slot="{ active }">
                        <button @click="disconnect" @keyup.enter="disconnect" class="connect-btn-menu-item">
                            {{ config.connectButtonText.disconnect }}
                        </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>

        <button v-else class="connect-btn" @click="connectDialog.open()"> {{ config.connectButtonText.connect }} </button>

        <ConnectDialog ref="connectDialog">
            <template v-slot:no-wallets>
                <slot name="no-wallets" />
            </template>
        </ConnectDialog>
    </div>
</template>


<style scoped>
@import '/assets/style/main.css';

.connect-btn {
    @apply py-2 px-4 text-sm font-medium bg-white text-gray-900 rounded-md border border-gray-200 focus:outline-none hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700;
}

.connect-btn-menu-btn {
    @apply px-4 py-2 text-sm font-medium bg-white text-gray-900 rounded-md border border-gray-200 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75;
}

.connect-btn-menu-item {
    @apply flex w-full items-center rounded-md p-2 text-sm text-gray-900;
}

.connect-btn-menu-item:hover {
    @apply bg-black/30 text-white;
}
</style>