<script>
	import { createEventDispatcher } from "svelte";
	export let iconURL = null;
	export let text = null;
	export let height = "";
	export let width = "";
	export let bgColor = "";
	export let iconHeight = "";

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch("button-click");
	}
</script>

<div
	class:padding-1={!text}
	style="height: {height}; width: {width}; background-color: {bgColor}"
	class="button"
	on:click={handleClick}
>
	{#if iconURL}
		<div class="button__icon">
			<img style="height: {iconHeight}" src={iconURL} alt="" />
		</div>
	{/if}
	{#if text}
		<div class="button__text">
			{text}
		</div>
	{/if}
</div>

<style lang="scss">
	.button {
		cursor: pointer;
		height: 5rem;
		width: fit-content;
		border: none;
		outline: none;
		padding: 1rem 2rem;
		border-radius: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;

		&__icon {
			img {
				height: 3rem;
				vertical-align: middle;
			}
		}

		&__text {
			font-family: "Gothic A1", sans-serif;
			font-size: 1.8rem;
		}
	}

	.padding-1 {
		padding: 1rem;
	}
</style>
