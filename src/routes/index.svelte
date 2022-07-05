<script lang="ts">
	import { user } from '../store';
	import UserHeader from '../components/UserHeader.svelte';
	import RoomSelect from '../components/RoomSelect.svelte';
</script>

<svelte:head>
	<title>Alice</title>
	<meta name="description" content="El chat secreto!" />
</svelte:head>

<UserHeader />
{#if $user}<RoomSelect />{/if}
