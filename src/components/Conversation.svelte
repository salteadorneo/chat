<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { activeConversation } from '../store';
	import Message from './Message.svelte';

	let div: HTMLDivElement;
	let messages: Array<{ body: string; author: string }> = [];

	onMount(async () => {
		const paginator = await $activeConversation.getMessages();
		messages = paginator.items;

		$activeConversation.on('messageAdded', (message: { body: string; author: string }) => {
			messages = [...messages, message];
		});
	});

	afterUpdate(() => {
		div.scrollTo(0, div.scrollHeight);
	});
</script>

<div bind:this={div} class="messages">
	{#each messages as message}
		<Message {message} />
	{/each}
</div>

<style>
	.messages {
		padding: 20px 0 5px;
		height: 100%;
		overflow: auto;
	}
</style>