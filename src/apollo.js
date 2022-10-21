import {
  makeVar,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
//Login
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

//BottomSheet Control
export const isShowSocialBottomSheetVar = makeVar(false);
export const isShowEmailBottomSheetVar = makeVar(false);
export const isShowMinPriceBottomSheetVar = makeVar(false);
export const isShowMaxPriceBottomSheetVar = makeVar(false);
export const isShowStartTimeBottomSheetVar = makeVar(false);
export const isShowEndTimeBottomSheetVar = makeVar(false);

//Choiced
export const choicedMinPrice = makeVar({ price: 8000 });
export const choicedMaxPrice = makeVar({ price: 100000 });

export const choicedStartTime = makeVar({
  hour: 9,
  minute: 0,
  meridiem: "AM",
});
export const choicedEndTime = makeVar({
  hour: 11,
  minute: 0,
  meridiem: "PM",
});

const httpLink = createHttpLink({
  uri: "http://localhost:4002/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
