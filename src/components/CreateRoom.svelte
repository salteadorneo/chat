<script lang="ts">
	import { goto } from '$app/navigation';

	import { initialize, createConversation } from '../services/chat';
	import { activeConversation, user } from '../store';
	
	let room = Math.random().toString(36).substring(2)

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!$user || $user?.token == null) return;

		initialize({ accessToken: $user.token });

		const conversation = await createConversation({ room });
		if (conversation) {
			activeConversation.set(conversation);
			goto(`/${room}`);
		}
	}
</script>

<div>
	<form on:submit={handleSubmit}>
		<button
			type="submit"
			>Empezar nuevo juego</button
		>
	</form>
</div>
