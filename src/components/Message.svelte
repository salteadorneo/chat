<script lang="ts">
	import { user } from '../store';

	export let message: { body: string; author: string };

	const { body, author } = message;

	let userOrigin = message.author === $user?.userName ? 'right' : 'left';
</script>

<div class={`${userOrigin}`}>
	<p>{body}</p>
	<small>{author}</small>
</div>

<style>
	div {
		border: 1px solid var(--primary);
	}
	.right {
		text-align: right;
		margin-left: 40%;
	}
	.left {
		text-align: left;
		margin-right: 40%;
	}
</style>
