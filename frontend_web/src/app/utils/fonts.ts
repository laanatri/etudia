import { Open_Sans, Fredoka } from "next/font/google";
import type { NextFont } from "next/dist/compiled/@next/font";

const openSans: NextFont = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
})

const fredoka : NextFont = Fredoka({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
})

interface Fonts {
    openSans: NextFont;
    fredoka: NextFont;
}

const fonts: Fonts = { openSans, fredoka };

export default fonts;