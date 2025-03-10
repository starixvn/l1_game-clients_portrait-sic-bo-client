import gc from "@sg/game-client-base";
import { FakeChipHandlers } from "db://shared-components/game/chip-flying-total-bets/scripts/handlers/fake-chip-handlers";
import { LogStore } from "db://shared-components/game/scripts/stores/log-store";

import { sharedContainer } from "../../scripts/shared-container";

export const settings = {
    id: 25,
    name: "SicBo",
    namespaces: ["SicBo"],
    durations: {
        wholeRound: 42,
        lockingBet: 3,
        placingBet: 30,
        generatingResult: 5,
        showingResult: 6,
        startRound: 1,
    },
    numberOfRoundHistory: 100,
};

export const containerOptions: gc.IContainerOptions = {
    globalContainer: sharedContainer,
    onContainerCreated: (container) => {
        container.bind(gc.GameConfigs.GameSetting).toConstantValue(settings);
        container.bind(LogStore).to(LogStore);
        container.bind(gc.Chips.ChipHandlers).to(FakeChipHandlers);
    },
    features: [...gc.defaultFeatures, gc.BetDetailsNew],
};
