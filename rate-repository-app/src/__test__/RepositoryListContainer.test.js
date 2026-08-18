import { RepositoryListContainer } from "../components/RepositoryList";
import { render, screen, within } from '@testing-library/react-native';


describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      await render(<RepositoryListContainer repositories={repositories} />)

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;


      // Consider the first repository item
      const fullName1 = within(firstRepositoryItem).getByText("jaredpalmer/formik")
      const description1 = within(firstRepositoryItem).getByText("Build forms in React, without the tears")
      const language1 = within(firstRepositoryItem).getByText("TypeScript")
      const forksCount1 = within(firstRepositoryItem).getByText("1.6k")
      const stargazersCount1 = within(firstRepositoryItem).getByText("21.9k")
      const ratingAverage1 = within(firstRepositoryItem).getByText("88")
      const reviewCount1 = within(firstRepositoryItem).getByText("3")

      expect(fullName1).toBeVisible()
      expect(description1).toBeVisible()
      expect(language1).toBeVisible()
      expect(forksCount1).toBeVisible()
      expect(stargazersCount1).toBeVisible()
      expect(ratingAverage1).toBeVisible()
      expect(reviewCount1).toBeVisible()
      

      // Consider for the second item.
      const fullName2 = within(secondRepositoryItem).getByText("async-library/react-async")
      const description2 = within(secondRepositoryItem).getByText("Flexible promise-based React data loader")
      const language2 = within(secondRepositoryItem).getByText("JavaScript")
      const forksCount2 = within(secondRepositoryItem).getByText("69")
      const stargazersCount2 = within(secondRepositoryItem).getByText("1.8k")
      const ratingAverage2 = within(secondRepositoryItem).getByText("72")
      const reviewCount2 = within(secondRepositoryItem).getByText("3")

      expect(fullName2).toBeVisible()
      expect(description2).toBeVisible()
      expect(language2).toBeVisible()
      expect(forksCount2).toBeVisible()
      expect(stargazersCount2).toBeVisible()
      expect(ratingAverage2).toBeVisible()
      expect(reviewCount2).toBeVisible()
    });
  });
});