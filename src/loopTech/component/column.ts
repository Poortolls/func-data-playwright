import { expectElementToBeVisible } from 'utils/assert-utils';
import { getLocator } from 'utils/locator-utils';

const columnTitleElement = (columnTitle: string) => getLocator(`//main//div//h2[text()="${columnTitle}"]`);
const columnCardTitleElement = (columnTitle: string, cardTitle: string) =>
  getLocator(`//main//div//h2[text()="${columnTitle}"]//..//h3[text()="${cardTitle}"]`);

export async function verifyColumnCard(columnTitle: string, cardTitle: string) {
  await expectElementToBeVisible(columnTitleElement(columnTitle));

  await expectElementToBeVisible(columnCardTitleElement(columnTitle, cardTitle));
  //Add any other assertions to card here
  //create factory if needed to handle different column types
}

const columnCardTagElement = (columnTitle: string, cardTitle: string, tag: string) =>
  getLocator(`//main//div//h2[text()="${columnTitle}"]//..//h3[text()="${cardTitle}"]//..//div//span[text()="${tag}"]`);

async function confirmColumnCardTag(columnTitle: string, cardTitle: string, tag: string) {
  await expectElementToBeVisible(columnCardTagElement(columnTitle, cardTitle, tag));
}

export async function confirmColumnCardTags(columnTitle: string, cardTitle: string, tagList: Array<string>) {
  for (const tag of tagList) {
    await confirmColumnCardTag(columnTitle, cardTitle, tag);
  }
}
