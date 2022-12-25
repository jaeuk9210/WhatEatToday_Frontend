import {
  makeVar,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Login
const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};

// BottomSheet Control
export const isShowSocialBottomSheetVar = makeVar(false);
export const isShowEmailBottomSheetVar = makeVar(false);
export const isShowMinPriceBottomSheetVar = makeVar(false);
export const isShowMaxPriceBottomSheetVar = makeVar(false);
export const isShowStartTimeBottomSheetVar = makeVar(false);
export const isShowEndTimeBottomSheetVar = makeVar(false);
export const isShowStoryBottomSheetVar = makeVar(false);

// Apollo Client
const httpLink = createHttpLink({
  uri: "http://192.168.0.2:4002/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
