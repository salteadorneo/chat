<script lang="ts">
	import { page } from '$app/stores';

	import { onMount } from 'svelte';

	import { createOrJoinConversation } from '../services/chat';
	import { activeConversation, user } from '../store';

	import Participants from '../components/Participants.svelte';
	import Conversation from '../components/Conversation.svelte';
	import ConversationInput from '../components/ConversationInput.svelte';

	onMount(async () => {
		const localUser = JSON.parse(localStorage.user) ?? {};
		console.log(localUser)
		user.set(localUser);
		
		console.log($user?.token)
		if (!$user || $user?.token == null) return;

		const conversation = await createOrJoinConversation({ room: $page.params.room, accessToken: $user.token });

		console.log(conversation)

		if (conversation) {
			activeConversation.set(conversation);
		}
	});
</script>

{#if $activeConversation?.uniqueName}
	<div class="max-w-6xl mx-auto py-2 relative">
		<h2 class="text-3xl">
			{$activeConversation.uniqueName}
		</h2>
		<Participants />
		<Conversation />
		<ConversationInput />
	</div>
{/if}
