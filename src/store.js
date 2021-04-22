import { createStore } from "vuex";

const store = createStore({
  state: {
    name: "Vue",
    dives: [
      {
        date: "2021-04-06T20:43:49.299Z",
        totalTime: 54,
        maxDepth: 42,
        owner: "/api/users/5",
        gazs: [
          {
            name: "Air",
            startPressure: 200,
            endPressure: 60,
            oxygen: 21,
            nitrogen: 79,
            helium: 0,
            hydrogen: 0,
          },
        ],
      },
      {
        date: "2021-04-06T20:43:49.299Z",
        totalTime: 39,
        maxDepth: 11,
        owner: "/api/users/5",
        gazs: [
          {
            name: "Nitrox",
            startPressure: 200,
            endPressure: 60,
            oxygen: 36,
            nitrogen: 64,
            helium: 0,
            hydrogen: 0,
          },
        ],
      },
    ],
  },
});

export default store;
