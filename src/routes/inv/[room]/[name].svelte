<script lang="ts">
	import { onMount } from 'svelte';

	import { page } from '$app/stores';

	import { getConversation, initialize } from '../../../services/chat';
	import { user } from '../../../store';
	import { goto } from '$app/navigation';
	import { getAccessToken } from '../../../services/user';

	onMount(async () => {
		const anonymousName = $page.params.name

		const accessToken = await getAccessToken({ token: `anonymous_${anonymousName}` });
		user.set({
			name: anonymousName,
			token: accessToken,
		});
		sessionStorage.user = JSON.stringify($user);

		if ($user) initialize({ accessToken: $user.token});

		try {
			const conversation = await getConversation({ room: $page.params.room });
			if (conversation) goto('/' + conversation.channelState.uniqueName);
			else getConversationTimeout()
		} catch (e) {
			// console.log(e)
		}
	});

	async function getConversationTimeout() {
		return setTimeout(async () => {
			const conversation = await getConversation({ room: $page.params.room });
			if (conversation) goto('/' + conversation.channelState.uniqueName);
			else getConversationTimeout()
		}, 2000);
	}
</script>