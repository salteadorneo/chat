<script lang="ts">
	import type { JSONValue } from '@twilio/conversations';

	import { user } from '../store';

	export let message: { body: string; author: string; attributes: JSONValue };

	const { body, author, attributes } = message;

	let userOrigin = message.author === $user?.name ? 'right' : 'left';

	if (attributes?.label) userOrigin = 'label'
</script>

<div class={`${userOrigin}`}>
	<small>{author}</small>
	<p>{body}</p>
</div>

<style>
	div {
		position: relative;
		border: 1px solid var(--primary);
		border-radius: 12px;
		margin-bottom: 22px;
		padding: 0 20px 10px;
		opacity: 0;
		animation: fadeIn .3s ease-in-out forwards;
	}
	.left::before, .right::before {
		content: ' ';
		position: absolute;
		width: 0;
		height: 0;
		left: auto;
		right: -1px;
		bottom: -20px;
		border: 10px solid;
	}
	.right {
		text-align: right;
		margin-left: 30%;
		color: var(--background);
		background: var(--primary);
		border-bottom-right-radius: 0;
	}
	.right::before {
		border-color: var(--primary) var(--primary) transparent transparent;
	}
	.left {
		text-align: left;
		margin-right: 30%;
		background: var(--background);
		border-bottom-left-radius: 0;
	}
	.left::before {
		right: auto;
		left: -1px;
		border-color: var(--primary) transparent transparent var(--primary);
	}
	.left::after {
		content: ' ';
		position: absolute;
		width: 0;
		height: 0;
		right: auto;
		left: 0;
		bottom: -17px;
		border: 10px solid;
		border-color: var(--background) transparent transparent var(--background);
	}
	.label {
		text-align: center;
		background: transparent;
		border: none;
		padding: 0;
	}
	p {
		margin: 0;
		font-size: 12px;
		font-weight: 700;
	}
	small {
		font-size: 8px;
	}
</style>
