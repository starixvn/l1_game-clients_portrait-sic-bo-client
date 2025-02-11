import gc from "@sg/game-client-base";
import { LogStore } from "db://shared-components/game/scripts/stores/log-store";

import { sharedContainer } from "../../scripts/shared-container";

export const settings = {
    id: 10,
    name: "SicBo",
    namespaces: ["SicBo"],
    durations: {
        wholeRound: 57,
        lockingBet: 5,
        placingBet: 45,
        showingResult: 8,
        startRound: 4,
    },
    numberOfRoundHistory: 102,
};

export const containerOptions: gc.IContainerOptions = {
    globalContainer: sharedContainer,
    onContainerCreated: (container) => {
        container.bind(gc.GameConfigs.GameSetting).toConstantValue(settings);
        container.bind(LogStore).to(LogStore);
    },
    features: [...gc.defaultFeatures, gc.BetDetailsNew],
};
