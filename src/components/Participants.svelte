<script lang="ts">
	import { activeConversation } from '../store';

	import Hearts from '../assets/Hearts.svg';
	import Clubs from '../assets/Clubs.svg';
	import Spades from '../assets/Spades.svg';
	import Diamonds from '../assets/Diamonds.svg';

	const ICONS = [Hearts, Spades, Clubs, Diamonds];

	export let size = ''
</script>

<section>
	{#each [...$activeConversation.participants] as participant, i}
		<div class={`participant ${size}`} title={participant[1].identity}><img src={ICONS[i]} alt="" /></div>
	{/each}
	{#each $activeConversation.attributes.invitations||[] as participant, i}
		<div class={`participant ${size}`} title={participant}><img src={ICONS[i]} alt="" /></div>
	{/each}
</section>

<style>
	.participant {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		background: var(--background);
		border: 1px solid var(--primary);
		border-radius: 50%;
		width: 42px;
		height: 42px;
		text-align: center;
		margin: 0 0 0 -18px;
	}
	.participant:first-child {
		margin-left: 0;
	}
	.small {
		width: 30px;
		height: 30px;
		margin: 0 0 0 -12px;
	}
	img {
		max-height: 60%;
	}
</style>