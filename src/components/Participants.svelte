<script lang="ts">
	import type { Participant } from '@twilio/conversations';
	
	import { activeConversation } from '../store';

	// let participants = [...$activeConversation.participants]
	// participants.forEach(async participant => {
	// 	const participantUser = await participant[1].getUser()
	// })

	// $activeConversation.on('participantJoined', (participant: Participant) => {
	// 	participants = [...$activeConversation.participants]
	// });

	// $activeConversation.on('participantLeft', (participant: Participant) => {
	// 	participants = [...$activeConversation.participants]
	// });
</script>

<div>
	{#each [...$activeConversation.participants] as participant}
		<div class="participant">{participant[1].identity}</div>
	{/each}
	{#each $activeConversation.attributes.invitations||[] as participant}
		<div class="participant">{participant}</div>
	{/each}
</div>

<style>
	.participant {
		display: inline-block;
		background: var(--background);
		border: 1px solid var(--primary);
		border-radius: 50%;
		width: 42px;
		line-height: 40px;
		text-align: center;
		margin: 0 0 0 -18px;
	}
	.participant:first-child {
		margin-left: 0;
	}
</style>