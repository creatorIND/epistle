const loginOutlookButton = document.getElementById("login__outlook");
const mailBox = document.querySelector(".user__mails");
const showMailsButton = document.querySelector(".show-mails-btn");

window.renderer.greetUser((event, account) => {
	if (!account) return;
	const greetBox = document.querySelector(".greet-box");
	const greeting = document.createElement("h1");
	greeting.textContent = `Hi there, ${account.name}`;
	greetBox.appendChild(greeting);
	// showMailsButton.style.visibility = "visible";
});

window.renderer.showMails((event, graphResponse) => {
	if (!graphResponse) return;
	console.log(graphResponse);
	mailBox.textContent = JSON.stringify(graphResponse, undefined, 2);
});

loginOutlookButton.addEventListener("click", () => {
	window.renderer.loginWithOutlook();
});

showMailsButton.addEventListener("click", () => {
	window.renderer.retrieveMails();
});
