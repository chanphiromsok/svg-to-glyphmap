from fontTools.ttLib import TTFont
import json

def ttf_to_glyphmap(ttf_path, output_json):
    font = TTFont(ttf_path)
    glyph_map = {}

    # Process all Unicode character maps
    for table in font['cmap'].tables:
        if table.isUnicode():
            # Map glyph names to their Unicode code points
            for code_point, glyph_name in table.cmap.items():
                glyph_map[glyph_name] = code_point

    # Write to JSON with alphabetical sorting
    with open(output_json, 'w') as f:
        json.dump(
            dict(sorted(glyph_map.items(), key=lambda item: item[0])),
            f,
            indent=2,
            ensure_ascii=False
        )
    print(f"Glyphmap saved to {output_json}")

# Usage
ttf_to_glyphmap('lucide.ttf', 'glyphmaps.json')