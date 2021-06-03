// Oasis Sharp | 1502106
import Amplify from "aws-amplify";
import config from "./config";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "books",
        endpoint: config.apiGateway.API_URL,
        region: config.apiGateway.REGION
      },
      {
        name: "cart",
        endpoint: config.apiGateway.API_URL,
        region: config.apiGateway.REGION
      },
      {
        name: "orders",
        endpoint: config.apiGateway.API_URL,
        region: config.apiGateway.REGION
      },
      {
        name: "search",
        endpoint: config.apiGateway.API_URL,
        region: config.apiGateway.REGION
      },
      {
        name: "recommendations",
        endpoint: config.apiGateway.API_URL,
        region: config.apiGateway.REGION
      },
      {
        name: "bestsellers",
        endpoint: config.apiGateway.API_URL,
        region: config.apiGateway.REGION
      }
    ]
  }
});

