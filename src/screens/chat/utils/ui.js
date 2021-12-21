import { getRandom } from ".";
import { niceColors } from "../../../styles/colors";

export const getNiceColor = () => niceColors[Math.floor(getRandom(0, niceColors.length - 1))];