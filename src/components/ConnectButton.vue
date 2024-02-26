<script setup>
import { ref } from 'vue'
import { formatAddress } from '@mysten/sui.js/utils'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon, CheckCircleIcon } from '@heroicons/vue/20/solid'
import ConnectDialog from './ConnectDialog.vue'
import { useConfig, useWallets, useConnectWallet, useAccounts, usePersistState, useDisconnectWallet, useCurrentWallet, useCurrentAccount } from '../composables'

const props = defineProps({
    labelConnect: { type: String, default: 'Connect' },
    labelDisconnect: { type: String, default: 'Disonnect' },
})

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
</script>


<template>
    <div class="w-fit flex items-center">
        <Menu v-if="currentWalletStatus === 'connected'" as="div" class="relative inline-block text-left font-mono">
            <div>
                <MenuButton class="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                    {{ formatAddress(currentAccount.address) }}
                    <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" />
                </MenuButton>
            </div>

            <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                <MenuItems class="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div class="px-1 py-1">
                        <MenuItem @click="(currentAccount = account) && (persistState.lastConnectedAccountAddress = account.address)" v-for="account of accounts" v-slot="{ active }">
                        <button :class="[
                            active ? 'bg-violet-500 text-white' : 'text-gray-900',
                            'group flex gap-4 w-full items-center rounded-md p-2 text-sm justify-between',
                        ]">
                            <div class="text-nowrap">{{ formatAddress(account.address) }}</div>
                            <CheckCircleIcon v-show="currentAccount.address === account.address" class="h-5 w-5 self-end" />
                        </button>
                        </MenuItem>
                    </div>

                    <div class="px-1 py-1">
                        <MenuItem v-slot="{ active }">
                        <button @click="disconnect" @keyup.enter="disconnect" :class="[
                            active ? 'bg-violet-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        ]">
                            {{ props.labelDisconnect }}
                        </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>

        <button v-else class="connect-btn" @click="connectDialog.open()"> {{ props.labelConnect }} </button>

        <ConnectDialog ref="connectDialog" />
    </div>
</template>


<style scoped>
@import '/assets/style/main.css';

.connect-btn {
    @apply font-bold py-2 px-4 rounded bg-blue-500 text-white;
}
</style>