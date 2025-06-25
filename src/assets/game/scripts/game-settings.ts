const GAME_NAME = "SicBo";

export const settings = {
    id: 25,
    name: GAME_NAME,
    observerNamespace: GAME_NAME,
    namespaces: [GAME_NAME],
    durations: {
        wholeRound: 42,
        lockingBet: 3,
        placingBet: 30,
        generatingResult: 5,
        showingResult: 6,
        startRound: 1,
    },
    numberOfRoundHistory: 100,
    isMiniGame: true,
};
