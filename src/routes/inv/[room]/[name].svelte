<script lang="ts">
	import { onMount } from 'svelte';

	import { page } from '$app/stores';

	import { getConversation, initialize, joinConversation } from '../../../services/chat';
	import { user } from '../../../store';
	import { goto } from '$app/navigation';
	import { getAccessToken } from '../../../services/user';

	onMount(async () => {
		const anonymousName = $page.params.name

		const accessToken = await getAccessToken({ token: `anonymous_${anonymousName}` });
		user.set({
			name: anonymousName,
			avatar: `https://i.pravatar.cc/150?u=${anonymousName}`,
			email: 'a@a.com',
			token: accessToken,
			userName: anonymousName
		});
		localStorage.user = JSON.stringify($user);

		if ($user) initialize({ accessToken: $user.token});

		try {
			const conversation = await getConversation({ room: $page.params.room });
			if (conversation) goto('/' + conversation.channelState.uniqueName);
			else getConversationTimeout()
		} catch (e) {
			// console.log(e)
		}
		// else goto('/nuevo-juego');

	});

	async function getConversationTimeout() {
		return setTimeout(async () => {
			const conversation = await getConversation({ room: $page.params.room });
			if (conversation) goto('/' + conversation.channelState.uniqueName);
			else getConversationTimeout()
		}, 2000);
	}
</script>

<h1>Pasa al anfitrión tu nick: {$user?.name}</h1>