import { click } from 'utils/action-utils';
import { expectElementToBeVisible } from 'utils/assert-utils';
import { getLocator } from 'utils/locator-utils';

const navMenuButton = (navButtonTitle: string) => getLocator(`//nav//button//*[text()="${navButtonTitle}"]`);
const pageTitle = (pageTitle: string) => getLocator(`//header//h1[text()="${pageTitle}"]`);

async function clickOnNavMenuButton(navButtonTitle: string) {
  await click(navMenuButton(navButtonTitle));
}

export async function navigateTo(navButtonTitle: string) {
  await clickOnNavMenuButton(navButtonTitle);

  await expectElementToBeVisible(pageTitle(navButtonTitle));
}

const logoutButton = () => getLocator(`//header//button[text()="Logout"]`);

export async function clickOnLogoutButton() {
  await click(logoutButton());
}
