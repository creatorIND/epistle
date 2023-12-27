<script>
	import SidebarButton from "./SidebarButton.svelte";
	import { Modal, Menu } from "@svelteuidev/core";
	import { createEventDispatcher } from "svelte";
	import Loader from "./Loader.svelte";
	import Compose from "./Compose.svelte";

	const dispatch = createEventDispatcher();

	export let mailFolders;

	let mails = [];

	let composeOpened = false;
	let selectedFolder = null;

	async function selectFolder(folder) {
		selectedFolder = folder;
		// console.log(selectedFolder);
		try {
			if (selectedFolder.id) {
				mails = await window.api.getMails(selectedFolder.id);
				console.log(mails);
				mails = mails.value;
			}
			// console.log(mails);
		} catch (error) {
			console.error("Cannot retrieve mails: ", error);
		}
		dispatch("folder-selected", mails);
	}
</script>

<div class="sidebar">
	<div class="sidebar__logo">
		<div class="sidebar__logo--icon">
			<img src="./assets/logo.svg" alt="Logo" />
		</div>
		<div class="sidebar__logo--text">Epistle</div>
	</div>
	<div class="sidebar__compose-btn">
		<SidebarButton
			hover={false}
			text="New Message"
			iconURL="./assets/compose.svg"
			on:sidebar-button-click={() => (composeOpened = true)}
		/>
	</div>
	<div class="sidebar__menu-list">
		{#each mailFolders as data}
			<SidebarButton
				isActive={selectedFolder === data}
				text={data.text}
				iconURL={data.iconURL}
				on:sidebar-button-click={() => selectFolder(data)}
			/>
		{/each}
	</div>
	<div class="sidebar__misc">
		<SidebarButton
			text="Dark Mode"
			iconURL="./assets/theme.svg"
			showToggle={true}
			hover={false}
		/>
	</div>
	<Modal
		opened={composeOpened}
		centered
		on:close={() => (composeOpened = false)}
		overlayOpacity={0.3}
		overlayBlur={3}
		closeOnClickOutside={false}
		closeOnEscape={false}
	>
		<Compose />
	</Modal>
</div>

<style lang="scss">
	.sidebar {
		// font-family: "Gothic A1";
		// font-size: 1.6rem;
		width: 100%;
		height: 100%;
		background-color: $color-white;
		border-radius: 0 2rem 2rem 0;
		padding: 4rem;

		&__logo {
			padding: 0 1rem;
			padding-bottom: 3rem;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 0.5rem solid $color-gray-light;

			&--icon {
				img {
					height: 5rem;
					vertical-align: middle;
				}
			}

			&--text {
				font-family: "Josefin Sans", sans-serif;
				font-size: 2.4rem;
				font-weight: 400;
				margin-left: 3rem;
				margin-top: 0.6rem;
			}
		}

		&__compose-btn {
			background-color: $color-primary;
			color: white;
			box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25);
			border-radius: 1.5rem;
			margin-top: 3rem;
		}

		&__menu-list {
			display: flex;
			flex-direction: column;
			margin-top: 3rem;
			gap: 0.7rem;
			padding-bottom: 2rem;
			border-bottom: 0.5rem solid $color-gray-light;
		}

		&__misc {
			margin-top: 3rem;
		}
	}

	.compose {
		font-family: "Gothic A1", sans-serif;
		font-size: 1.8rem;
	}
</style>
