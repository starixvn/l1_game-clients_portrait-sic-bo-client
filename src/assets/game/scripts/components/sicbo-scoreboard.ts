import gc from "@sg/game-client-base";
import { _decorator, Layout, Node, Sprite, SpriteAtlas, UITransform } from "cc";
import { GridLayout } from "db://shared-components/shared/common-components/grid-layout/scripts/components/grid-layout";
import { ObserverComponent } from "db://shared-components/shared/common-components/observer-component/scripts/observer-component";
import Observer from "observer";
const { handle, render } = Observer;

const { ccclass, property } = _decorator;

export enum SicBoBetType {
    big = "big",
    small = "small",
    anyTriple = "anyTriple",
    specific1 = "specific1",
    specific2 = "specific2",
    specific3 = "specific3",
    specific4 = "specific4",
    specific5 = "specific5",
    specific6 = "specific6",
}

@ccclass()
export class SicboScoreBoard extends ObserverComponent {
    @property(Node)
    nodeDiceStatistic: Node = null;

    @property(Node)
    nodeBigRoad: Node = null;

    @property(Node)
    nodeContainer: Node = null;

    @property(Node)
    nodeResultPercentage: Node = null;

    @property(SpriteAtlas)
    mainAtlas: SpriteAtlas = null;

    @property(Sprite)
    sprChangeModeBigRoad: Sprite = null;

    private isExpandBeadRoad = false;

    private resultPercentages = {};

    private readonly WIDTH_EXPAND_BEADROAD = 561;
    private readonly WIDTH_COLLAPSE_BEADROAD = 100;
    private readonly WIDTH_SPACING = 22;
    private readonly WIDTH_GAME = 828;

    onClickExpandMode() {
        this.isExpandBeadRoad = !this.isExpandBeadRoad;

        const bigRoadZoomIn = this.nodeBigRoad.getChildByName("zoomInBigRoad");

        const nodes = [
            this.nodeBigRoad,
            this.nodeBigRoad,
            bigRoadZoomIn.children[0],
            bigRoadZoomIn.children[1],
            this.nodeBigRoad.children[0],
            this.nodeBigRoad.children[1],
        ];
        this.nodeBigRoad.children.forEach((child) => {
            nodes.push(child);
        });

        if (this.isExpandBeadRoad) {
            this.nodeDiceStatistic.getComponent(UITransform).width = this.WIDTH_EXPAND_BEADROAD;
            this.setWidthForNodes(nodes, this.WIDTH_GAME - this.WIDTH_SPACING - this.WIDTH_EXPAND_BEADROAD);
            this.sprChangeModeBigRoad.spriteFrame = this.mainAtlas.getSpriteFrame("stats-icon-zoom-out");
        } else {
            this.nodeDiceStatistic.getComponent(UITransform).width = this.WIDTH_COLLAPSE_BEADROAD;
            this.setWidthForNodes(nodes, this.WIDTH_GAME - this.WIDTH_SPACING - this.WIDTH_COLLAPSE_BEADROAD);
            this.sprChangeModeBigRoad.spriteFrame = this.mainAtlas.getSpriteFrame("stats-icon-zoom");
        }
        this.nodeContainer.getComponent(Layout).updateLayout();

        const bigRoadLayout = this.nodeBigRoad.getComponent(GridLayout);
        const bigRoadZoomInLayout = bigRoadZoomIn.getComponent(GridLayout);
    }

    setWidthForNodes(nodes: Node[], width: number) {
        nodes.forEach((node) => {
            node && (node.getComponent(UITransform).width = width);
        });
    }

    @render(gc.RoundHistories.RoundHistoryStore, (store) => store.histories)
    renderResultPercentage(dataLogs: any[]) {
        this.calculatePercentagesMainChoice(dataLogs);
        this.calculatePercentagesSpecifics(dataLogs);
    }

    calculatePercentagesMainChoice(dataLogs: any[]) {
        if (dataLogs.length > 0) {
            let bigTotal = 0,
                smallTotal = 0,
                anyTriple = 0;

            dataLogs.forEach((log) => {
                const { settlementResult } = log;

                bigTotal += settlementResult[SicBoBetType.big] ? 1 : 0;
                smallTotal += settlementResult[SicBoBetType.small] ? 1 : 0;
                anyTriple += settlementResult[SicBoBetType.anyTriple] ? 1 : 0;
            });

            const length = dataLogs.length;

            const bigPercentage = Math.round((bigTotal / length) * 100);
            const smallPercentage = Math.round((smallTotal / length) * 100);
            const anyTriplePercentage = Math.round((anyTriple / length) * 100);

            this.big.string = `${bigPercentage}%`;
            this.small.string = `${smallPercentage}%`;
            this.anyTriple.string = `${anyTriplePercentage}%`;
        }
    }

    calculatePercentagesSpecifics(dataLogs: any[]) {
        if (dataLogs.length > 0) {
            let dice1Total = 0,
                dice2Total = 0,
                dice3Total = 0,
                dice4Total = 0,
                dice5Total = 0;

            dataLogs.forEach((log) => {
                dice1Total += this.countDiceValue(log.result, 1);
                dice2Total += this.countDiceValue(log.result, 2);
                dice3Total += this.countDiceValue(log.result, 3);
                dice4Total += this.countDiceValue(log.result, 4);
                dice5Total += this.countDiceValue(log.result, 5);
            });

            const length = dataLogs.length;

            const dice1Percentage = Math.round((dice1Total / (length * 3)) * 100);
            const dice2Percentage = Math.round((dice2Total / (length * 3)) * 100);
            const dice3Percentage = Math.round((dice3Total / (length * 3)) * 100);
            const dice4Percentage = Math.round((dice4Total / (length * 3)) * 100);
            const dice5Percentage = Math.round((dice5Total / (length * 3)) * 100);
            const dice6Percentage = 100 - (dice1Percentage + dice2Percentage + dice3Percentage + dice4Percentage + dice5Percentage);

            this.dice1Percentage.string = `${dice1Percentage}%`;
            this.dice2Percentage.string = `${dice2Percentage}%`;
            this.dice3Percentage.string = `${dice3Percentage}%`;
            this.dice4Percentage.string = `${dice4Percentage}%`;
            this.dice5Percentage.string = `${dice5Percentage}%`;
            this.dice6Percentage.string = `${dice6Percentage}%`;
        }
    }

    countDiceValue(result: any, value: number) {
        let count = 0;
        if (result.dice1 === value) {
            count++;
        }
        if (result.dice2 === value) {
            count++;
        }
        if (result.dice3 === value) {
            count++;
        }

        return count;
    }
}
