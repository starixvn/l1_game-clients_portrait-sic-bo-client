const win = window as any;
export const languages = {
    "Common": {},
    "SicBo": {
        "double": "双倍",
        "game_icon_name": "骰宝",
        "game_name": "骰宝",
        "glossary_anyTriple": "任何三重",
        "glossary_big": "大",
        "glossary_small": "小",
        "glossary_specific": "特定号码",
        "scoreboard_anyTriple": "三",
        "scoreboard_big": "大",
        "scoreboard_small": "小",
        "single": "单",
        "text_triple_win": "三倍",
        "triple": "三倍"
    }
};

if (!win.languages) {
    win.languages = {};
}

win.languages.zh_cn = languages;