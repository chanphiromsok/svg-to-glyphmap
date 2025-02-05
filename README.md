```javascript
bun run extra-icons.js // if you wan to add your custom icons
bun run index.js // Copy the external icons source

bun svgo // Optimized your svg icons after copied folder name copied_icons
bun svgfont // convert your optimized svg to font include .ttf .css .json .scss ...etc
python3 svgtofont.py // generate glyphmaps.json after that can copy to expo-project [YOUR-FONT].ttf and glyphmaps.json
```
After run these scripts will be generate font folder include .tt that we want and glyphmaps.json
### Usage in react-native-vectoricons
```
glyphmaps.json
import { createIconSet } from "@react-native-vector-icons/common";
import glyphmaps from "./glyphmaps.json"
const Lucide = createIconSet(glyphmaps,
  "lucide", //postScriptName
  "lucide" // fontFileName
);
```