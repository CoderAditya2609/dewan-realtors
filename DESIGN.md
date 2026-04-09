# Design Brief

## Tone & Purpose
Refined luxury minimalism. Premium real estate platform conveying trust, exclusivity, and sophistication — similar to Christie's International or Sotheby's. Warm, approachable elegance without aggression or flash.

## Color Palette (OKLCH)

| Token               | Light           | Dark            | Intent                              |
|---------------------|-----------------|-----------------|-------------------------------------|
| **background**      | 0.98 0.01 65    | 0.12 0.01 285   | Warm cream (light), deep charcoal (dark) |
| **foreground**      | 0.15 0.01 285   | 0.96 0.01 65    | Deep charcoal text, cream reversed |
| **card**            | 0.99 0.01 65    | 0.16 0.01 285   | Elevated surface, slight warmth    |
| **primary**         | 0.25 0.02 285   | 0.8 0.06 62     | Charcoal accent, warm gold reversed |
| **accent**          | 0.72 0.16 62    | 0.78 0.12 62    | Soft gold for CTAs & highlights    |
| **secondary**       | 0.65 0.04 62    | 0.28 0.02 285   | Taupe support, cool reversed       |
| **destructive**     | 0.55 0.22 25    | 0.65 0.19 22    | Warm red for alerts                |
| **muted**           | 0.92 0.01 65    | 0.2 0.01 285    | Subtle background, light border    |
| **border**          | 0.88 0.02 65    | 0.24 0.01 285   | Soft edges, low contrast           |

## Typography
- **Display:** Fraunces (serif, editorial, headings & hero text)
- **Body:** DM Sans (clean, readable, trustworthy)
- **Mono:** GeistMono (property specs, data, minimal use)

## Structural Zones

| Zone            | Background         | Border             | Depth               |
|-----------------|--------------------|--------------------|---------------------|
| **Header**      | bg-card            | border-b border-border/20 | subtle elevation |
| **Hero/Featured** | bg-gradient-subtle | none              | gradient overlay    |
| **Content Grid** | bg-background      | alternating zones  | card shadows        |
| **Card Surface** | bg-card/95         | border-border/20   | shadow-md to shadow-hover |
| **Footer**      | bg-muted/10        | border-t border-border/20 | lowest elevation |

## Elevation & Depth
- **Default card:** `shadow-md-soft` (4px blur, 0.08 opacity)
- **Elevated (hover/focused):** `shadow-elevated` (12px blur, 0.16 opacity)
- **Modal/overlay:** `shadow-hover` (16px blur, 0.2 opacity)
- **3D effect:** Glassmorphic cards with `bg-card/95 backdrop-blur-sm` + layered shadows

## Shape Language
- **Cards & large elements:** 16px radius (`rounded-lg`)
- **Interactive buttons:** 8px radius via Tailwind extend
- **Inputs & small elements:** 6px radius via Tailwind extend
- **Full round:** used sparingly on avatars, badges

## Motion & Animation

| Animation           | Duration | Easing          | Use Case                     |
|-------------------|----------|-----------------|------------------------------|
| `fade-in`         | 0.4s     | ease-out        | Page/section entrance       |
| `fade-in-up`      | 0.5s     | ease-out        | Card stagger on load        |
| `slide-in-right`  | 0.4s     | ease-out        | Sidebar/drawer entry        |
| `float`           | 3s       | ease-in-out ∞   | Hero image float effect     |
| **Hover lift**    | 0.3s     | cubic-bezier    | Card scale 1.02 on hover    |

## Component Patterns
- **Card (elevated):** `.card-elevated` — rounded-lg, shadow-md, hover:shadow-lg, scale-102 on hover
- **Card (glass):** `.card-glass` — backdrop blur, bg-card/95, border-border/20
- **Button (primary):** `.btn-primary` — bg-accent, rounded-lg, hover:scale-105
- **Button (secondary):** `.btn-secondary` — bg-secondary, hover:bg-secondary/90
- **Text display:** `.text-display` — font-display, 3xl–5xl, bold, tight tracking
- **Gradient text:** `.gradient-accent-text` — accent to secondary gradient with clip-text

## Signature Detail
Soft gold accents (`0.72 0.16 62`) used sparingly and intentionally — on primary CTAs, featured badges, and interactive state indicators. Combined with layered shadows and warm card backgrounds, this creates visual depth without excess. The cream-to-charcoal contrast maintains premium luxury positioning while remaining highly readable and accessible.

## Constraints
- No neon or bright saturated colors
- No harsh shadows or drop shadows
- No generic default Tailwind colors
- All colors expressed as OKLCH tokens
- Max 2 font families (Fraunces + DM Sans)
- Dark mode is inverted but intentionally designed, not algorithmically flipped

