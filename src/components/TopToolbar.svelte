<script>
	import Button from "./Button.svelte";
</script>

<div class="top-toolbar">
	<div class="top-toolbar__search-bar">
		<input type="text" placeholder="Search" />
		<Button
			height="5rem"
			width="5rem"
			iconHeight="3rem"
			bgColor="#fcfcfc"
			iconURL="./assets/search.svg"
		/>
	</div>
	<div class="top-toolbar__settings">
		<Button
			iconHeight="3rem"
			bgColor="#fcfcfc"
			iconURL="./assets/settings.svg"
		/>
	</div>
</div>

<style lang="scss">
	.top-toolbar {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding-right: 4rem;
		align-items: center;

		&__search-bar {
			display: flex;
			flex-basis: 90%;

			input[type="text"] {
				outline: none;
				border: none;
				height: 5rem;
				width: 100%;
				background-color: $color-white;
				border-radius: 2rem 0 0 2rem;
				margin-right: -1.5rem;
				padding-left: 2rem;
				font-size: 1.6rem;
			}
		}
	}
</style>
