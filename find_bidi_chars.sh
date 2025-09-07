#!/bin/bash
# Script: find_bidi_chars.sh
# Beskrivelse: Finder skjulte/bidi-tegn i alle tekstfiler i projektet

# Liste over uønskede Unicode-tegn (hex-koder)
# 200B: ZERO WIDTH SPACE
# 200C: ZERO WIDTH NON-JOINER
# 200D: ZERO WIDTH JOINER
# 202A: LEFT-TO-RIGHT EMBEDDING
# 202B: RIGHT-TO-LEFT EMBEDDING
# 202D: LEFT-TO-RIGHT OVERRIDE
# 202E: RIGHT-TO-LEFT OVERRIDE
# 2066: LEFT-TO-RIGHT ISOLATE
# 2067: RIGHT-TO-LEFT ISOLATE
# 2068: FIRST STRONG ISOLATE
# 2069: POP DIRECTIONAL ISOLATE
# FEFF: BYTE ORDER MARK (BOM)

# Hex-mønstre til grep (bruges med -P og -n)
PATTERNS=(
    $'\xE2\x80\x8B' # U+200B
    $'\xE2\x80\x8C' # U+200C
    $'\xE2\x80\x8D' # U+200D
    $'\xE2\x80\xAA' # U+202A
    $'\xE2\x80\xAB' # U+202B
    $'\xE2\x80\xAD' # U+202D
    $'\xE2\x80\xAE' # U+202E
    $'\xE2\x81\xA6' # U+2066
    $'\xE2\x81\xA7' # U+2067
    $'\xE2\x81\xA8' # U+2068
    $'\xE2\x81\xA9' # U+2069
    $'\xEF\xBB\xBF' # U+FEFF
)

# Find alle tekstfiler (undgå binære filer og node_modules)
find . -type f \
    ! -path "*/node_modules/*" \
    ! -path "*/.git/*" | while read -r file; do
    for pat in "${PATTERNS[@]}"; do
        grep -a -n -H "$pat" "$file" 2>/dev/null
    done
done

# Forklaring:
# -a: tvinger tekstsøgning (også i "binære" filer)
# -n: viser linjenummer
# -H: viser filnavn
# Udskriver: filnavn:linjenummer:linjeindhold
