<script>
	import MailItem from "./MailItem.svelte";
	import Button from "./Button.svelte";
	import { createEventDispatcher } from "svelte";

	export let mails = [];

	let selectedMail = null;
	const dispatch = createEventDispatcher();

	function selectMail(mail) {
		if (selectedMail === mail) {
			selectedMail = null;
		} else {
			selectedMail = mail;
		}
		dispatch("mail-selected", selectedMail);
	}
</script>

<div class="mail-list">
	<div class="mail-list__top">
		<div class="mail-list__title">Inbox</div>
		<div class="mail-list__buttons">
			<Button bgColor="#fcfcfc" iconURL="./assets/filter.svg" />
			<Button bgColor="#02c39a" iconURL="./assets/sync.svg" />
		</div>
	</div>
	<div class="mail-list__main">
		{#each mails as mail}
			<MailItem
				{mail}
				isActive={selectedMail === mail}
				on:mail-item-click={selectMail(mail)}
			/>
		{/each}
	</div>
</div>

<style lang="scss">
	.mail-list {
		width: 100%;
		height: 93%;
		padding: 2rem;
		padding-top: 4rem;

		&__top {
			margin-left: 2rem;
			margin-right: 4rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&__buttons {
			display: flex;
			gap: 2rem;
		}

		&__title {
			font-family: "Merriweather Sans", sans-serif;
			font-size: 3rem;
			font-weight: 300;
		}

		&__main {
			margin-top: 2rem;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			height: 100%;
			overflow-y: scroll;
			padding-bottom: 2rem;
		}
	}
</style>
