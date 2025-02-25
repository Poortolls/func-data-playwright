import { click, fill, gotoURL } from 'utils/action-utils';
import { getLocator } from 'utils/locator-utils';

const usernameInput = () => getLocator(`//input[@id="username"]`);
const passwordInput = () => getLocator(`//input[@id="password"]`);
const signInButton = () => getLocator(`//button[@type="submit"][text() ="Sign in"]`);

async function fillUsernameInput(input: string) {
  await fill(usernameInput(), input);
}

async function fillPasswordInput(input: string) {
  await fill(passwordInput(), input);
}

async function clickOnSignInButton() {
  await click(signInButton());
}

async function navigateToLoginPage() {
  await gotoURL(`https://animated-gingersnap-8cf7f2.netlify.app/`);
}

export async function loginToDemoApp(username: string, password: string) {
  await navigateToLoginPage();

  await fillUsernameInput(username);

  await fillPasswordInput(password);

  await clickOnSignInButton();
}
