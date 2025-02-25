import { test } from 'setup/page-setup';
import { testData } from '../testdata/testData';

test.describe('Data Driven Demo Example', async () => {
  for (const testCaseNum in testData.demo) {
    test(`Test Case ${testCaseNum + 1}`, async () => {
      for (const step in testData.demo[testCaseNum].steps) {
        for (const stepName in testData.demo[testCaseNum].steps[step]) {
          await testData.demo[testCaseNum].steps[step][stepName]();
        }
      }
    });
  }
});
