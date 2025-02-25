import { confirmColumnCardTags, verifyColumnCard } from 'component/column';
import { navigateTo } from 'component/navMenu';
import { loginToDemoApp } from 'pages/login';

const creds = {
  username: 'admin',
  passowrd: 'password123',
};

export interface TestDataInterface {
  demo: Array<{
    testcase: number;
    steps: Array<{ [stepName: string]: Function }>;
  }>;
}

export const testData: TestDataInterface = {
  demo: [
    {
      testcase: 1,
      steps: [
        {
          'Login to Demo App': async () => {
            await loginToDemoApp(creds.username, creds.passowrd);
          },
        },
        {
          "Navigate to 'Web Application'": async () => {
            await navigateTo('Web Application');
          },
        },
        {
          "Verify 'Implement user authentication' is in the 'To Do' column.": async () => {
            await verifyColumnCard('To Do', 'Implement user authentication');
          },
        },
        {
          "Confirm tags: 'Feature' 'High Priority'": async () => {
            await confirmColumnCardTags('To Do', 'Implement user authentication', ['Feature', 'High Priority']);
          },
        },
      ],
    },
    {
      testcase: 2,
      steps: [
        {
          'Login to Demo App': async () => {
            await loginToDemoApp(creds.username, creds.passowrd);
          },
        },
        {
          "Navigate to 'Web Application'": async () => {
            await navigateTo('Web Application');
          },
        },
        {
          "Verify 'Fix navigation bug' is in the 'To Do' column.": async () => {
            await verifyColumnCard('To Do', 'Fix navigation bug');
          },
        },
        {
          "Confirm tags: 'Bug'": async () => {
            await confirmColumnCardTags('To Do', 'Fix navigation bug', ['Bug']);
          },
        },
      ],
    },
  ],
};
