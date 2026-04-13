import type { Lesson } from "../types";
import { TOBIRA_CH1_5 } from "./tobira_ch1_5";
import { TOBIRA_CH6_10 } from "./tobira_ch6_10";
import { TOBIRA_CH11_15 } from "./tobira_ch11_15";

export const TOBIRA: Lesson[] = [...TOBIRA_CH1_5, ...TOBIRA_CH6_10, ...TOBIRA_CH11_15];
