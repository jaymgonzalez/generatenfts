<template>
  <div>navbar</div>
  <button v-on:click="web3Modal.openModal()">connect</button>
  <button v-on:click="web3Modal.closeModal()">Disconnect</button>
</template>

<script setup lang="ts">
import { chain, configureChains, createClient } from '@wagmi/core'
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'

// 1. Define constants
const projectId = '5b1e379abbb953f60cfc21ed66f71b76'
const chains = [chain.mainnet]

// 2. Configure wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'web3Modal', chains }),
  provider,
})

const ethereumClient = new EthereumClient(wagmiClient, chains)
const web3Modal = new Web3Modal({ projectId }, ethereumClient)
</script>

<style scoped></style>
