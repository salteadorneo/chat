<script lang="ts">
	export let data = { question: '', answer: '' }
</script>

<section>
	<p>{data.question}</p>
</section>

<style>
	section {
		position: relative;
		left: -5%;
		width: 99vw;
		/* min-height: 60px; */

		font-weight: 700;
		background: var(--background);
		border-top: 1px solid var(--primary);
		border-bottom: 1px solid var(--primary);
		padding: 20px;
	}

	p {
		margin: 0;
		opacity: 0;
		animation: fadeIn 1s ease-in-out forwards;
	}
</style>