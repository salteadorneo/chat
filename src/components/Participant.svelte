<script lang="ts">
	import Hearts from '../assets/Hearts.svg';
	import Spades from '../assets/Spades.svg';
	import Clubs from '../assets/Clubs.svg';
	import Diamonds from '../assets/Diamonds.svg';

	import Clipboard from '../assets/Clipboard.svg';
	import Share from '../assets/Share.svg';

	import { activeConversation } from '../store';

	const ICONS = [Hearts, Spades, Clubs, Diamonds];

	export let participant: string
	export let invite = false

	let copied = false
	function handleCopyLink(participant) {
		const url = `${window.location.origin}/inv/${$activeConversation.uniqueName}/${participant}`;
		navigator.clipboard.writeText(url);
		copied = true
		setTimeout(() => {
			copied = false
		}, 3000);
	}

	function handleShareLink(participant) {
		const url = `${window.location.origin}/inv/${$activeConversation.uniqueName}/${participant}`;
		window.open(`https://api.whatsapp.com/send?text=${url}`)
	}

	function parseName(participant: string) {
		return participant.split('-')[0]
	}
</script>

<div class="participant {invite ? 'noregister' : ''}">
	<span><img src={ICONS[Math.floor(Math.random() * ICONS.length)]} alt="" /></span>
	{parseName(participant)}
	{#if $activeConversation.createdBy != participant}
		<div class="actions">
			<button on:click={() => handleCopyLink(participant)}>
				<img src={Clipboard} alt="Copy" /> {copied ? 'Copiado' : 'Copiar'}
			</button>
			<button on:click={() => handleShareLink(participant)}>
				<img src={Share} alt="Share" /> Compartir
			</button>
		</div>
	{/if}
</div>

<style>
	.participant {
		display: flex;
		align-items: center;
		margin: 0 0 10px;
	}
	.participant span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		border: 1px solid var(--primary);
		margin: 0 10px 0 0;
	}
	.participant span img {
		max-height: 50%;
	}
	.participant .actions {
		margin-left: auto;
	}
	.participant .actions button {
		/* display: inline-flex;
		justify-content: center;
		align-items: center; */
		padding: 0 10px;
		/* width: 22px; */
		height: 22px;
		background: var(--primary);
		color: #f7f7f7;
		margin: 0 0 0 5px;
	}
	.participant .actions button img {
		height: 14px;
		vertical-align: middle;
	}

	.noregister span {
		opacity: .5;
	}
</style>