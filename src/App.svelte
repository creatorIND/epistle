<script>
	import Sidebar from "./components/Sidebar.svelte";
	import MailList from "./components/MailList.svelte";
	import MailInfo from "./components/MailInfo.svelte";
	import { SvelteUIProvider } from "@svelteuidev/core";
	import TopToolbar from "./components/TopToolbar.svelte";
	import Loader from "./components/Loader.svelte";
	import { blur } from "svelte/transition";

	let mails1 = [
		{
			senderName: "Sujal Sinha", //from.emailAddress.name
			subject: "Query Regarding Available Internship Opportunities", //subject
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil cumque delectus deserunt animi recusandae dolorum officia nisi quo itaque dicta magnam quod veritatis ut fuga soluta quidem incidunt dolor earum Estratione rerum perferendis sequi nesciunt labore voluptatem suscipit molestiae praesentium inventore ducimus nihil assumenda provident Tempora rerum ab cupiditate non expedita soluta unde odio sequi molestias incidunt impedit explicabo", //body.content, bodyPreview
			date: "Monday, 20th March 2022, 10:56 am", //receivedDateTime
			isImportant: false, //flag.flagStatus -> {notFlagged, flagged}
			hasAttachment: true, //hasAttachments (boolean)
			//emailId: from.emailAddress.address
			//conversationId
			//isDraft (boolean)
			//isRead (boolean)
			//parentFolderId
		},
		{
			senderName: "Mohit Shankar",
			subject: "Query Regarding Available Internship Opportunities",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil cumque delectus deserunt animi recusandae dolorum officia nisi quo itaque dicta magnam quod veritatis ut fuga soluta quidem incidunt dolor earum Estratione rerum perferendis sequi nesciunt labore voluptatem suscipit molestiae praesentium inventore ducimus nihil assumenda provident Tempora rerum ab cupiditate non expedita soluta unde odio sequi molestias incidunt impedit explicabo",
			date: "Tuesday, 26th July 2000, 10:56 am",
			isImportant: false,
			hasAttachment: false,
		},
		{
			senderName: "Kislay Kumar",
			subject: "Query Regarding Available Internship Opportunities",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil cumque delectus deserunt animi recusandae dolorum officia nisi quo itaque dicta magnam quod veritatis ut fuga soluta quidem incidunt dolor earum Estratione rerum perferendis sequi nesciunt labore voluptatem suscipit molestiae praesentium inventore ducimus nihil assumenda provident Tempora rerum ab cupiditate non expedita soluta unde odio sequi molestias incidunt impedit explicabo",
			date: "Friday, 31st December 1977, 10:56 am",
			isImportant: true,
			hasAttachment: false,
		},
		{
			senderName: "Harshpal Singh",
			subject: "Query Regarding Available Internship Opportunities",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil cumque delectus deserunt animi recusandae dolorum officia nisi quo itaque dicta magnam quod veritatis ut fuga soluta quidem incidunt dolor earum Estratione rerum perferendis sequi nesciunt labore voluptatem suscipit molestiae praesentium inventore ducimus nihil assumenda provident Tempora rerum ab cupiditate non expedita soluta unde odio sequi molestias incidunt impedit explicabo",
			date: "Monday, 20th March 2022, 10:56 am",
			isImportant: true,
			hasAttachment: true,
		},
		{
			senderName: "Swarit Raj",
			subject: "Query Regarding Available Internship Opportunities",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil cumque delectus deserunt animi recusandae dolorum officia nisi quo itaque dicta magnam quod veritatis ut fuga soluta quidem incidunt dolor earum Estratione rerum perferendis sequi nesciunt labore voluptatem suscipit molestiae praesentium inventore ducimus nihil assumenda provident Tempora rerum ab cupiditate non expedita soluta unde odio sequi molestias incidunt impedit explicabo",
			date: "Monday, 20th March 2022, 10:56 am",
			isImportant: false,
			hasAttachment: false,
		},
	];
	let isLoginVisible = true;
	// let mails;
	let selectedMail = null;
	let isLoading = false;
	let mails;
	let mailFolders = [];
	let response;

	async function login() {
		try {
			isLoading = true;
			isLoginVisible = false;
			await populateMailFolders();
			// response = await window.api.getMailFolders();
			// response = response.value;
			// console.log(mailFolders);
			// mails = await window.api.loginAndRetrieveMails();
			// mails = mails.value;
			isLoading = false;
		} catch (error) {
			console.error("Error fetching data from the main process", error);
		}
	}

	async function populateMailFolders() {
		const folders = [
			{
				name: "Inbox",
				iconURL: "./assets/inbox.svg",
				outlook: "Inbox",
			},
			{
				name: "Important",
				iconURL: "./assets/important-default.svg",
				outlook: "Important",
			},
			{
				name: "Sent",
				iconURL: "./assets/sent.svg",
				outlook: "Sent Items",
			},
			{
				name: "Drafts",
				iconURL: "./assets/drafts.svg",
				outlook: "Drafts",
			},
			{
				name: "Archive",
				iconURL: "./assets/archive.svg",
				outlook: "Archive",
			},
			{
				name: "Spam",
				iconURL: "./assets/spam.svg",
				outlook: "Junk Email",
			},
			{
				name: "Bin",
				iconURL: "./assets/bin.svg",
				outlook: "Deleted Items",
			},
		];

		for (const folder of folders) {
			const id = await findFolderByDisplayName(folder.outlook);

			mailFolders.push({
				text: folder.name,
				id,
				iconURL: folder.iconURL,
			});
		}
	}

	async function findFolderByDisplayName(displayName) {
		const response = await window.api.getMailFolders();
		const folders = response.value;

		const folder = folders.find(
			(folder) => folder.displayName === displayName
		);
		return folder ? folder.id : null;
	}

	function handleMailSelected(event) {
		selectedMail = event.detail;
	}
</script>

<SvelteUIProvider>
	<main class="app">
		{#if isLoginVisible}
			<div class="login-page">
				<div class="login-page__wrapper">
					<div class="login-page__title">Add an account...</div>
					<div class="login-page__buttons">
						<div class="login-page__button">
							<img
								src="./assets/gmail.svg"
								alt=""
								class="login-page__button--img"
							/>
							<div class="login-page__button--text">Gmail</div>
						</div>
						<div class="login-page__button">
							<img
								src="./assets/yahoo.svg"
								alt=""
								class="login-page__button--img"
							/>
							<div class="login-page__button--text">Yahoo</div>
						</div>
						<div class="login-page__button">
							<img
								src="./assets/office.svg"
								alt=""
								class="login-page__button--img"
							/>
							<div class="login-page__button--text">
								Office 365
							</div>
						</div>
						<div on:click={login} class="login-page__button">
							<img
								src="./assets/outlook.svg"
								alt=""
								class="login-page__button--img"
							/>
							<div class="login-page__button--text">Outlook</div>
						</div>
					</div>
				</div>
				<img
					class="login-page__bg-art--1"
					src="./assets/login-bg-art1.svg"
					alt=""
				/>
				<img
					class="login-page__bg-art--2"
					src="./assets/login-bg-art2.svg"
					alt=""
				/>
			</div>
		{:else if isLoading}
			<Loader />
		{:else}
			<div transition:blur={{ duration: 500 }} class="app__first-column">
				<Sidebar {mailFolders} />
			</div>
			<div transition:blur={{ duration: 500 }} class="app__second-column">
				<MailList
					mails={mails1}
					on:mail-selected={handleMailSelected}
				/>
			</div>
			<div transition:blur={{ duration: 500 }} class="app__third-column">
				<TopToolbar />
				<MailInfo {selectedMail} />
			</div>
		{/if}
	</main>
</SvelteUIProvider>

<style lang="scss">
	.app {
		height: 100vh;
		display: flex;
		flex-direction: row;

		&__first-column {
			flex-basis: 20%;
		}

		&__second-column {
			flex-basis: 30%;
		}

		&__third-column {
			flex-basis: 50%;
			display: flex;
			flex-direction: column;
			padding-top: 4rem;
			gap: 2rem;
		}
	}

	.login-page {
		height: 100%;
		width: 100%;
		background-color: $color-yellow-light;
		position: relative;
		overflow: hidden;

		&__bg-art {
			&--2 {
				position: absolute;
				top: 0;
				right: 0;
			}

			&--1 {
				position: absolute;
				left: 0;
				bottom: 0;
			}
		}

		&__wrapper {
			z-index: 100;
			width: 74%;
			height: 81%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: $color-white;
			box-shadow: 0px 9px 21px rgba(0, 0, 0, 0.25);
			border-top: 4rem solid $color-primary;
			border-radius: 4rem;
			padding: 4rem;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		&__title {
			margin-top: 6rem;
			font-size: 5rem;
		}

		&__buttons {
			margin-top: 5rem;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
		}

		&__button {
			cursor: pointer;
			background-color: $color-primary-light;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin: 2.5rem;
			padding: 2rem;
			gap: 3rem;
			font-size: 2.5rem;
			border-radius: 2rem;
			flex-basis: 30%;
			transition: all 0.2s ease-out;

			&:hover {
				background-color: $color-secondary-1;
				color: $color-white;
			}

			img {
				height: 4rem;
			}
		}
	}

	:global(:root) {
		font-size: 62.5%;
		color: $color-black;
		background-color: $color-gray-light;
		font-family: "Gothic A1", sans-serif;
		overflow: hidden;

		@include respond(tab-land) {
			font-size: 56.25%;
		}

		@include respond(tab-port) {
			font-size: 50%;
		}

		@include respond(big-desktop) {
			font-size: 75%;
		}
	}

	:global(::selection) {
		background-color: $color-primary-dark;
		color: $color-white;
	}
</style>
