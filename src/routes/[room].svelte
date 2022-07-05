<script lang="ts">
	import { page } from '$app/stores';

	import { onMount } from 'svelte';

	import { joinConversation, updateAttributesConversation } from '../services/chat';
	import { activeConversation, user } from '../store';

	import Participants from '../components/Participants.svelte';
	import Conversation from '../components/Conversation.svelte';
	import ConversationInput from '../components/ConversationInput.svelte';

	let loading = true

	onMount(async () => {
		const localUser = JSON.parse(localStorage.user) ?? {};
		user.set(localUser);
		
		if (!$user || $user?.token == null) return;

		const conversation = await joinConversation({ room: $page.params.room, accessToken: $user.token });

		if (conversation) {
			activeConversation.set(conversation);

			$activeConversation.on('updated', (data: { conversation: Conversation, updateReasons: Array<[]> }) => {
				activeConversation.set(data.conversation)
			});

			if ($activeConversation.createdBy == $user?.name)
				await updateAttributesConversation({ room: $page.params.room, accessToken: $user.token, params: { loading: true } });
		}
	});
	
	async function handleStart(e) {
		e.preventDefault();

		if (!$user || $user?.token == null) return;

		let conversation = await updateAttributesConversation({ room: $page.params.room, accessToken: $user.token, params: { loading: !$activeConversation.attributes.loading } });
		console.log(conversation)
		
		if (conversation) activeConversation.set(conversation);
	}

</script>

{#if $activeConversation?.uniqueName}
	{#if $activeConversation.attributes.loading}
		Loading...
		{#if $activeConversation.createdBy == $user?.name}
			<button on:click={handleStart}>Empezar</button>
		{/if}
	{:else}
		<div class="max-w-6xl mx-auto py-2 relative">
			<h2 class="text-3xl">
				{$activeConversation.uniqueName}
			</h2>
			<Participants />
			<Conversation />
			<ConversationInput />
		</div>
	{/if}
{/if}
