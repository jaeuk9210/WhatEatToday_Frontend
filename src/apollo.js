import { makeVar, ApolloClient, InMemoryCache } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

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

export const client = new ApolloClient({
  uri: "http://localhost:4002/graphql",
  cache: new InMemoryCache(),
});
