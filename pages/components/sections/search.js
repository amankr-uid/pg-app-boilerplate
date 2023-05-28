const fetch = require('node-fetch');
const shopifyStoreUrl = 'https://my-app-ui-test.myshopify.com/';
const accessToken = '20dfb42e05f6a65d599700198871d781-1685279237';

const searchProducts = async (searchTerm) => {
  const query = `
    query {
      products(query: "${searchTerm}") {
        edges {
          node {
            id
            title
            handle
            # Add more fields as needed
          }
        }
      }
    }
  `;

  const response = await fetch(`${shopifyStoreUrl}/admin/api/2021-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  return result.data.products.edges.map((edge) => edge.node);
};

// Example usage
searchProducts('t-shirt')
  .then((products) => {
    console.log(products);
  })
  .catch((error) => {
    console.error(error);
  });
