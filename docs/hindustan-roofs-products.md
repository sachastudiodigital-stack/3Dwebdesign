# Hindustan Manufacturers & Traders — Product Reference (for CRM)

Source site: https://www.hindustanroofswgl.in/products

> **Note on sourcing:** The dealer's own site (`hindustanroofswgl.in`) returned `403 Forbidden` to
> automated fetching (both this session's proxy and the fetch tool), so the page content could not
> be scraped directly. The product/brand list below is confirmed via search-engine indexing of the
> site's own pages (title tags + snippets from `/products`, `/about-us`, and third-party dealer
> listings e.g. Tata Structura's dealer locator, Justdial). Thickness/size/spec details are pulled
> from the **official brand manufacturers** (JSW, Tata Structura, Jindal, AMNS, APL Apollo) since
> Hindustan Manufacturers & Traders sells these as authorized/branded products carrying the
> manufacturers' standard spec sheets — not company-specific numbers. **Treat all specs as
> "typical for the brand/line in the Indian market" and verify exact SKUs/prices/stock with the
> dealer before entering them as canonical CRM catalog data.**

## Company snapshot

- **Name:** Hindustan Manufacturers & Traders
- **Established:** 2021
- **Location:** Plot No. 129 & 130, Industrial Estate, Rampur, Warangal, Telangana 506151
- **Phone:** 08062463606
- **Positioning:** Roofing sheet manufacturer/fabricator + authorized dealer for JSW and Tata Structura
- **Services offered:** roofing installation, custom steel fabrication, pipe fabrication, structural design/consultation, maintenance & repairs, quality inspection

---

## Product Categories

### 1. Colour-Coated Roofing Sheets (Metal Sheets)

The core product line — pre-painted galvanized/Galvalume steel sheets in trapezoidal/corrugated profiles.

| Brand / Line | Base Metal | Thickness Range | Width | Length | Notes |
|---|---|---|---|---|---|
| **JSW Pragati / Pragathi (+)** | Galvanized steel (GI), AZ 70 coating available | 0.30 mm – 0.80 mm (common: 0.40, 0.45, 0.50 mm) | ~1066 mm effective | Custom cut lengths | Entry/mid-tier line; ~90 gsm zinc coating typical; 7-year warranty |
| **JSW Colouron / Colouron+** | Galvalume (Al-Zn) / PPGL substrate | 0.35 mm – 1.00 mm (common: 0.47, 0.50 mm) | 1060–1260 mm (1060 mm effective cover, 1142 mm overall) | Std. 12 ft, cut-to-length | Premium line; yield strength 550/770 MPa grades; 15-year warranty; trapezoidal profile (265.5 mm pitch, 29 mm crest) |
| **Jindal Sabrang / colour-coated sheets** | GI / Galvalume / stainless / aluminium | 0.16 mm – 1.00 mm (common: 0.45, 0.50 mm) | 750 mm – 1450 mm | Custom | Coating options: RMP, SMP, SDP, PVDF |
| **AMNS (ArcelorMittal Nippon Steel, formerly Essar) sheets** | PPGI / PPGL | 0.45 mm – 1.20 mm (common: 0.50 mm) | Standard profile widths | 6 ft – 20 ft | Corrugated, trapezoidal, or tile profiles |

**Common colors across brands:** off-white, brick red, dusty grey, green, brown, yellow, blue (RAL-based color charts vary by brand).

### 2. Structural Steel Pipes / Hollow Sections

| Brand / Line | Type | Size Range | Thickness | Standard |
|---|---|---|---|---|
| **Tata Structura** | Square Hollow Section (SHS) | 25×25 mm – 250×250 mm (retail YST210: 20×20 – 150×150 mm) | 2 mm – 8 mm (retail: 1.2 – 5 mm) | IS 4923 |
| **Tata Structura** | Rectangular Hollow Section (RHS) | 50×25 mm – 300×200 mm (retail YST210: 40×20 – 200×100 mm) | 2 mm – 8 mm (retail: 1.2 – 5 mm) | IS 4923 |
| **Tata Structura** | Circular Hollow Section (CHS) | 25 NB – 300 NB | 2 mm – 8 mm | IS 4923 |
| **Apollo (APL Apollo / Apollo Bheem)** | GI Round Pipe | 15 NB – 150 NB | 1.6 mm – 3.2 mm | IS 1239, IS 3589; Class A/B/C (light/medium/heavy) |
| **Apollo** | MS Square Pipe | 12 mm – 300 mm | 0.80 mm – 12.00 mm | — |
| **MPL Pipes / MS Pipes** | General mild-steel pipes | Dealer-specific | Dealer-specific | Used for plumbing/irrigation/industrial water lines |

### 3. Transparent / Translucent Roofing Sheets (FRP)

- **Material:** Fibre-Reinforced Plastic (FRP) / fibreglass
- **Thickness:** 0.8 mm, 1.2 mm, 1.5 mm, 2 mm, 2.5 mm, 3 mm, 4 mm (up to 5 mm seen at some suppliers)
- **Light transmission:** ~60–85%
- **Colors:** clear, sky blue, light green
- **Use case:** skylights/light panels combined with metal roofing sheets, warehouse sheds, parking sheds, security cabins

### 4. High-Tensile Fencing Wire

- **Diameter/gauge:** 2.0 mm – 4.0 mm (commonly quoted as 10–12.5 gauge)
- **Zinc (GI) coating:** 30–366 GSM depending on grade/application
- **Standards:** IS 280, BS 10223 Part 3
- **Use case:** boundary/security fencing, agricultural fencing

### 5. Ventilation Fans

- Industrial/commercial exhaust & ventilation fans (no dealer-specific spec sheet found; sizes/CFM would need direct confirmation with the dealer)

### 6. Fasteners (Screws)

- Roofing/structural screws for sheet-to-purlin fastening (self-drilling/self-tapping types typical for the industry; dealer-specific sizes not published)

---

## Suggested CRM Product Taxonomy

```
Product Category
├── Roofing Sheets (Colour Coated)
│   ├── Brand: JSW
│   │   ├── Line: Pragati / Pragati+
│   │   └── Line: Colouron / Colouron+
│   ├── Brand: Jindal (Sabrang)
│   └── Brand: AMNS
├── Transparent / FRP Sheets
├── Structural Pipes
│   ├── Brand: Tata Structura
│   │   ├── SHS (Square Hollow Section)
│   │   ├── RHS (Rectangular Hollow Section)
│   │   └── CHS (Circular Hollow Section)
│   ├── Brand: Apollo / APL Apollo
│   │   ├── GI Round Pipe
│   │   └── MS Square Pipe
│   └── MPL Pipes / MS Pipes (generic)
├── Fencing Wire (High-Tensile GI Wire)
├── Ventilation Fans
└── Fasteners / Screws
```

**Recommended CRM fields per SKU:**
`category`, `brand`, `product_line`, `profile/shape`, `thickness_mm`, `width_mm`, `length` (fixed/cut-to-order), `base_metal/coating_type`, `color`, `warranty_years`, `standard_ref` (e.g. IS 1239), `unit` (sheet / kg / running ft / piece), `price_per_unit`.

---

## Open items to confirm directly with the dealer

Since the source site could not be scraped, the following should be verified by phone/site-visit
before finalizing the CRM catalog:
1. Exact SKUs, thickness options, and colors actually stocked (vs. full brand catalog).
2. Pricing per sheet/kg/running foot for each brand+thickness combination.
3. Fan models/CFM ratings and screw sizes/types sold.
4. Whether they manufacture their own unbranded sheets in addition to reselling JSW/Tata/Jindal/AMNS.
