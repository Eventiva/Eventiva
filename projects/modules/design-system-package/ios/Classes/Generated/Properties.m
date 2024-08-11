
//
// Properties.m
//

// Do not edit directly, this file was auto-generated.


#import "Properties.h"

@implementation Properties

+ (NSDictionary *)getProperty:(NSString *)keyPath {
  return [[self properties] valueForKeyPath:keyPath];
}

+ (nonnull)getValue:(NSString *)keyPath {
  return [[self properties] valueForKeyPath:[NSString stringWithFormat:@"%@.value", keyPath]];
}

+ (NSDictionary *)properties {
  static NSDictionary * dictionary;
  static dispatch_once_t onceToken;

  dispatch_once(&onceToken, ^{
    dictionary = @{
  @"accentColor": @{
    @"inherit": @{
      @"value": inherit,
      @"name": @"AccentColorInherit",
      @"category": @"accentColor",
      @"type": @"inherit"
      },
    @"current": @{
      @"value": currentColor,
      @"name": @"AccentColorCurrent",
      @"category": @"accentColor",
      @"type": @"current"
      },
    @"transparent": @{
      @"value": transparent,
      @"name": @"AccentColorTransparent",
      @"category": @"accentColor",
      @"type": @"transparent"
      },
    @"black": @{
      @"value": #000,
      @"name": @"AccentColorBlack",
      @"category": @"accentColor",
      @"type": @"black"
      },
    @"white": @{
      @"value": #fff,
      @"name": @"AccentColorWhite",
      @"category": @"accentColor",
      @"type": @"white"
      },
    @"slate": @{
      @"50": @{
        @"value": #f8fafc,
        @"name": @"AccentColorSlate50",
        @"category": @"accentColor",
        @"type": @"slate",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f1f5f9,
        @"name": @"AccentColorSlate100",
        @"category": @"accentColor",
        @"type": @"slate",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e2e8f0,
        @"name": @"AccentColorSlate200",
        @"category": @"accentColor",
        @"type": @"slate",
        @"item": @"200"
        },
      @"300": @{
        @"value": #cbd5e1,
        @"name": @"AccentColorSlate300",
        @"category": @"accentColor",
        @"type": @"slate",
        @"item": @"300"
        },
      @"400": @{
        @"value": #94a3b8,
        @"name": @"AccentColorSlate400",
        @"category": @"accentColor",
        @"type": @"slate",
        @"item": @"400"
        },
      @"500": @{
        @"value": #64748b,
        @"name": @"AccentColorSlate500",
        @"category": @"accentColor",
        @"type": @"slate",
        @"item": @"500"
        },
      @"600": @{
        @"value": #475569,
        @"name": @"AccentColorSlate600",
        @"category": @"accentColor",
        @"type": @"slate",
        @"item": @"600"
        },
      @"700": @{
        @"value": #334155,
        @"name": @"AccentColorSlate700",
        @"category": @"accentColor",
        @"type": @"slate",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e293b,
        @"name": @"AccentColorSlate800",
        @"category": @"accentColor",
        @"type": @"slate",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0f172a,
        @"name": @"AccentColorSlate900",
        @"category": @"accentColor",
        @"type": @"slate",
        @"item": @"900"
        },
      @"950": @{
        @"value": #020617,
        @"name": @"AccentColorSlate950",
        @"category": @"accentColor",
        @"type": @"slate",
        @"item": @"950"
        }
      },
    @"gray": @{
      @"50": @{
        @"value": #f9fafb,
        @"name": @"AccentColorGray50",
        @"category": @"accentColor",
        @"type": @"gray",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3f4f6,
        @"name": @"AccentColorGray100",
        @"category": @"accentColor",
        @"type": @"gray",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e7eb,
        @"name": @"AccentColorGray200",
        @"category": @"accentColor",
        @"type": @"gray",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d1d5db,
        @"name": @"AccentColorGray300",
        @"category": @"accentColor",
        @"type": @"gray",
        @"item": @"300"
        },
      @"400": @{
        @"value": #9ca3af,
        @"name": @"AccentColorGray400",
        @"category": @"accentColor",
        @"type": @"gray",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6b7280,
        @"name": @"AccentColorGray500",
        @"category": @"accentColor",
        @"type": @"gray",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4b5563,
        @"name": @"AccentColorGray600",
        @"category": @"accentColor",
        @"type": @"gray",
        @"item": @"600"
        },
      @"700": @{
        @"value": #374151,
        @"name": @"AccentColorGray700",
        @"category": @"accentColor",
        @"type": @"gray",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1f2937,
        @"name": @"AccentColorGray800",
        @"category": @"accentColor",
        @"type": @"gray",
        @"item": @"800"
        },
      @"900": @{
        @"value": #111827,
        @"name": @"AccentColorGray900",
        @"category": @"accentColor",
        @"type": @"gray",
        @"item": @"900"
        },
      @"950": @{
        @"value": #030712,
        @"name": @"AccentColorGray950",
        @"category": @"accentColor",
        @"type": @"gray",
        @"item": @"950"
        }
      },
    @"zinc": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"AccentColorZinc50",
        @"category": @"accentColor",
        @"type": @"zinc",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f4f4f5,
        @"name": @"AccentColorZinc100",
        @"category": @"accentColor",
        @"type": @"zinc",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e4e4e7,
        @"name": @"AccentColorZinc200",
        @"category": @"accentColor",
        @"type": @"zinc",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d8,
        @"name": @"AccentColorZinc300",
        @"category": @"accentColor",
        @"type": @"zinc",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a1a1aa,
        @"name": @"AccentColorZinc400",
        @"category": @"accentColor",
        @"type": @"zinc",
        @"item": @"400"
        },
      @"500": @{
        @"value": #71717a,
        @"name": @"AccentColorZinc500",
        @"category": @"accentColor",
        @"type": @"zinc",
        @"item": @"500"
        },
      @"600": @{
        @"value": #52525b,
        @"name": @"AccentColorZinc600",
        @"category": @"accentColor",
        @"type": @"zinc",
        @"item": @"600"
        },
      @"700": @{
        @"value": #3f3f46,
        @"name": @"AccentColorZinc700",
        @"category": @"accentColor",
        @"type": @"zinc",
        @"item": @"700"
        },
      @"800": @{
        @"value": #27272a,
        @"name": @"AccentColorZinc800",
        @"category": @"accentColor",
        @"type": @"zinc",
        @"item": @"800"
        },
      @"900": @{
        @"value": #18181b,
        @"name": @"AccentColorZinc900",
        @"category": @"accentColor",
        @"type": @"zinc",
        @"item": @"900"
        },
      @"950": @{
        @"value": #09090b,
        @"name": @"AccentColorZinc950",
        @"category": @"accentColor",
        @"type": @"zinc",
        @"item": @"950"
        }
      },
    @"neutral": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"AccentColorNeutral50",
        @"category": @"accentColor",
        @"type": @"neutral",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f5,
        @"name": @"AccentColorNeutral100",
        @"category": @"accentColor",
        @"type": @"neutral",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e5e5,
        @"name": @"AccentColorNeutral200",
        @"category": @"accentColor",
        @"type": @"neutral",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d4,
        @"name": @"AccentColorNeutral300",
        @"category": @"accentColor",
        @"type": @"neutral",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3a3a3,
        @"name": @"AccentColorNeutral400",
        @"category": @"accentColor",
        @"type": @"neutral",
        @"item": @"400"
        },
      @"500": @{
        @"value": #737373,
        @"name": @"AccentColorNeutral500",
        @"category": @"accentColor",
        @"type": @"neutral",
        @"item": @"500"
        },
      @"600": @{
        @"value": #525252,
        @"name": @"AccentColorNeutral600",
        @"category": @"accentColor",
        @"type": @"neutral",
        @"item": @"600"
        },
      @"700": @{
        @"value": #404040,
        @"name": @"AccentColorNeutral700",
        @"category": @"accentColor",
        @"type": @"neutral",
        @"item": @"700"
        },
      @"800": @{
        @"value": #262626,
        @"name": @"AccentColorNeutral800",
        @"category": @"accentColor",
        @"type": @"neutral",
        @"item": @"800"
        },
      @"900": @{
        @"value": #171717,
        @"name": @"AccentColorNeutral900",
        @"category": @"accentColor",
        @"type": @"neutral",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0a0a0a,
        @"name": @"AccentColorNeutral950",
        @"category": @"accentColor",
        @"type": @"neutral",
        @"item": @"950"
        }
      },
    @"stone": @{
      @"50": @{
        @"value": #fafaf9,
        @"name": @"AccentColorStone50",
        @"category": @"accentColor",
        @"type": @"stone",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f4,
        @"name": @"AccentColorStone100",
        @"category": @"accentColor",
        @"type": @"stone",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e7e5e4,
        @"name": @"AccentColorStone200",
        @"category": @"accentColor",
        @"type": @"stone",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d6d3d1,
        @"name": @"AccentColorStone300",
        @"category": @"accentColor",
        @"type": @"stone",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a8a29e,
        @"name": @"AccentColorStone400",
        @"category": @"accentColor",
        @"type": @"stone",
        @"item": @"400"
        },
      @"500": @{
        @"value": #78716c,
        @"name": @"AccentColorStone500",
        @"category": @"accentColor",
        @"type": @"stone",
        @"item": @"500"
        },
      @"600": @{
        @"value": #57534e,
        @"name": @"AccentColorStone600",
        @"category": @"accentColor",
        @"type": @"stone",
        @"item": @"600"
        },
      @"700": @{
        @"value": #44403c,
        @"name": @"AccentColorStone700",
        @"category": @"accentColor",
        @"type": @"stone",
        @"item": @"700"
        },
      @"800": @{
        @"value": #292524,
        @"name": @"AccentColorStone800",
        @"category": @"accentColor",
        @"type": @"stone",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1c1917,
        @"name": @"AccentColorStone900",
        @"category": @"accentColor",
        @"type": @"stone",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0c0a09,
        @"name": @"AccentColorStone950",
        @"category": @"accentColor",
        @"type": @"stone",
        @"item": @"950"
        }
      },
    @"red": @{
      @"50": @{
        @"value": #fef2f2,
        @"name": @"AccentColorRed50",
        @"category": @"accentColor",
        @"type": @"red",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fee2e2,
        @"name": @"AccentColorRed100",
        @"category": @"accentColor",
        @"type": @"red",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecaca,
        @"name": @"AccentColorRed200",
        @"category": @"accentColor",
        @"type": @"red",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fca5a5,
        @"name": @"AccentColorRed300",
        @"category": @"accentColor",
        @"type": @"red",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f87171,
        @"name": @"AccentColorRed400",
        @"category": @"accentColor",
        @"type": @"red",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ef4444,
        @"name": @"AccentColorRed500",
        @"category": @"accentColor",
        @"type": @"red",
        @"item": @"500"
        },
      @"600": @{
        @"value": #dc2626,
        @"name": @"AccentColorRed600",
        @"category": @"accentColor",
        @"type": @"red",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b91c1c,
        @"name": @"AccentColorRed700",
        @"category": @"accentColor",
        @"type": @"red",
        @"item": @"700"
        },
      @"800": @{
        @"value": #991b1b,
        @"name": @"AccentColorRed800",
        @"category": @"accentColor",
        @"type": @"red",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7f1d1d,
        @"name": @"AccentColorRed900",
        @"category": @"accentColor",
        @"type": @"red",
        @"item": @"900"
        },
      @"950": @{
        @"value": #450a0a,
        @"name": @"AccentColorRed950",
        @"category": @"accentColor",
        @"type": @"red",
        @"item": @"950"
        }
      },
    @"orange": @{
      @"50": @{
        @"value": #fff7ed,
        @"name": @"AccentColorOrange50",
        @"category": @"accentColor",
        @"type": @"orange",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffedd5,
        @"name": @"AccentColorOrange100",
        @"category": @"accentColor",
        @"type": @"orange",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fed7aa,
        @"name": @"AccentColorOrange200",
        @"category": @"accentColor",
        @"type": @"orange",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fdba74,
        @"name": @"AccentColorOrange300",
        @"category": @"accentColor",
        @"type": @"orange",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb923c,
        @"name": @"AccentColorOrange400",
        @"category": @"accentColor",
        @"type": @"orange",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f97316,
        @"name": @"AccentColorOrange500",
        @"category": @"accentColor",
        @"type": @"orange",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ea580c,
        @"name": @"AccentColorOrange600",
        @"category": @"accentColor",
        @"type": @"orange",
        @"item": @"600"
        },
      @"700": @{
        @"value": #c2410c,
        @"name": @"AccentColorOrange700",
        @"category": @"accentColor",
        @"type": @"orange",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9a3412,
        @"name": @"AccentColorOrange800",
        @"category": @"accentColor",
        @"type": @"orange",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7c2d12,
        @"name": @"AccentColorOrange900",
        @"category": @"accentColor",
        @"type": @"orange",
        @"item": @"900"
        },
      @"950": @{
        @"value": #431407,
        @"name": @"AccentColorOrange950",
        @"category": @"accentColor",
        @"type": @"orange",
        @"item": @"950"
        }
      },
    @"amber": @{
      @"50": @{
        @"value": #fffbeb,
        @"name": @"AccentColorAmber50",
        @"category": @"accentColor",
        @"type": @"amber",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef3c7,
        @"name": @"AccentColorAmber100",
        @"category": @"accentColor",
        @"type": @"amber",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fde68a,
        @"name": @"AccentColorAmber200",
        @"category": @"accentColor",
        @"type": @"amber",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fcd34d,
        @"name": @"AccentColorAmber300",
        @"category": @"accentColor",
        @"type": @"amber",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fbbf24,
        @"name": @"AccentColorAmber400",
        @"category": @"accentColor",
        @"type": @"amber",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f59e0b,
        @"name": @"AccentColorAmber500",
        @"category": @"accentColor",
        @"type": @"amber",
        @"item": @"500"
        },
      @"600": @{
        @"value": #d97706,
        @"name": @"AccentColorAmber600",
        @"category": @"accentColor",
        @"type": @"amber",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b45309,
        @"name": @"AccentColorAmber700",
        @"category": @"accentColor",
        @"type": @"amber",
        @"item": @"700"
        },
      @"800": @{
        @"value": #92400e,
        @"name": @"AccentColorAmber800",
        @"category": @"accentColor",
        @"type": @"amber",
        @"item": @"800"
        },
      @"900": @{
        @"value": #78350f,
        @"name": @"AccentColorAmber900",
        @"category": @"accentColor",
        @"type": @"amber",
        @"item": @"900"
        },
      @"950": @{
        @"value": #451a03,
        @"name": @"AccentColorAmber950",
        @"category": @"accentColor",
        @"type": @"amber",
        @"item": @"950"
        }
      },
    @"yellow": @{
      @"50": @{
        @"value": #fefce8,
        @"name": @"AccentColorYellow50",
        @"category": @"accentColor",
        @"type": @"yellow",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef9c3,
        @"name": @"AccentColorYellow100",
        @"category": @"accentColor",
        @"type": @"yellow",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fef08a,
        @"name": @"AccentColorYellow200",
        @"category": @"accentColor",
        @"type": @"yellow",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fde047,
        @"name": @"AccentColorYellow300",
        @"category": @"accentColor",
        @"type": @"yellow",
        @"item": @"300"
        },
      @"400": @{
        @"value": #facc15,
        @"name": @"AccentColorYellow400",
        @"category": @"accentColor",
        @"type": @"yellow",
        @"item": @"400"
        },
      @"500": @{
        @"value": #eab308,
        @"name": @"AccentColorYellow500",
        @"category": @"accentColor",
        @"type": @"yellow",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ca8a04,
        @"name": @"AccentColorYellow600",
        @"category": @"accentColor",
        @"type": @"yellow",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a16207,
        @"name": @"AccentColorYellow700",
        @"category": @"accentColor",
        @"type": @"yellow",
        @"item": @"700"
        },
      @"800": @{
        @"value": #854d0e,
        @"name": @"AccentColorYellow800",
        @"category": @"accentColor",
        @"type": @"yellow",
        @"item": @"800"
        },
      @"900": @{
        @"value": #713f12,
        @"name": @"AccentColorYellow900",
        @"category": @"accentColor",
        @"type": @"yellow",
        @"item": @"900"
        },
      @"950": @{
        @"value": #422006,
        @"name": @"AccentColorYellow950",
        @"category": @"accentColor",
        @"type": @"yellow",
        @"item": @"950"
        }
      },
    @"lime": @{
      @"50": @{
        @"value": #f7fee7,
        @"name": @"AccentColorLime50",
        @"category": @"accentColor",
        @"type": @"lime",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ecfccb,
        @"name": @"AccentColorLime100",
        @"category": @"accentColor",
        @"type": @"lime",
        @"item": @"100"
        },
      @"200": @{
        @"value": #d9f99d,
        @"name": @"AccentColorLime200",
        @"category": @"accentColor",
        @"type": @"lime",
        @"item": @"200"
        },
      @"300": @{
        @"value": #bef264,
        @"name": @"AccentColorLime300",
        @"category": @"accentColor",
        @"type": @"lime",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3e635,
        @"name": @"AccentColorLime400",
        @"category": @"accentColor",
        @"type": @"lime",
        @"item": @"400"
        },
      @"500": @{
        @"value": #84cc16,
        @"name": @"AccentColorLime500",
        @"category": @"accentColor",
        @"type": @"lime",
        @"item": @"500"
        },
      @"600": @{
        @"value": #65a30d,
        @"name": @"AccentColorLime600",
        @"category": @"accentColor",
        @"type": @"lime",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4d7c0f,
        @"name": @"AccentColorLime700",
        @"category": @"accentColor",
        @"type": @"lime",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3f6212,
        @"name": @"AccentColorLime800",
        @"category": @"accentColor",
        @"type": @"lime",
        @"item": @"800"
        },
      @"900": @{
        @"value": #365314,
        @"name": @"AccentColorLime900",
        @"category": @"accentColor",
        @"type": @"lime",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1a2e05,
        @"name": @"AccentColorLime950",
        @"category": @"accentColor",
        @"type": @"lime",
        @"item": @"950"
        }
      },
    @"green": @{
      @"50": @{
        @"value": #f0fdf4,
        @"name": @"AccentColorGreen50",
        @"category": @"accentColor",
        @"type": @"green",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dcfce7,
        @"name": @"AccentColorGreen100",
        @"category": @"accentColor",
        @"type": @"green",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bbf7d0,
        @"name": @"AccentColorGreen200",
        @"category": @"accentColor",
        @"type": @"green",
        @"item": @"200"
        },
      @"300": @{
        @"value": #86efac,
        @"name": @"AccentColorGreen300",
        @"category": @"accentColor",
        @"type": @"green",
        @"item": @"300"
        },
      @"400": @{
        @"value": #4ade80,
        @"name": @"AccentColorGreen400",
        @"category": @"accentColor",
        @"type": @"green",
        @"item": @"400"
        },
      @"500": @{
        @"value": #22c55e,
        @"name": @"AccentColorGreen500",
        @"category": @"accentColor",
        @"type": @"green",
        @"item": @"500"
        },
      @"600": @{
        @"value": #16a34a,
        @"name": @"AccentColorGreen600",
        @"category": @"accentColor",
        @"type": @"green",
        @"item": @"600"
        },
      @"700": @{
        @"value": #15803d,
        @"name": @"AccentColorGreen700",
        @"category": @"accentColor",
        @"type": @"green",
        @"item": @"700"
        },
      @"800": @{
        @"value": #166534,
        @"name": @"AccentColorGreen800",
        @"category": @"accentColor",
        @"type": @"green",
        @"item": @"800"
        },
      @"900": @{
        @"value": #14532d,
        @"name": @"AccentColorGreen900",
        @"category": @"accentColor",
        @"type": @"green",
        @"item": @"900"
        },
      @"950": @{
        @"value": #052e16,
        @"name": @"AccentColorGreen950",
        @"category": @"accentColor",
        @"type": @"green",
        @"item": @"950"
        }
      },
    @"emerald": @{
      @"50": @{
        @"value": #ecfdf5,
        @"name": @"AccentColorEmerald50",
        @"category": @"accentColor",
        @"type": @"emerald",
        @"item": @"50"
        },
      @"100": @{
        @"value": #d1fae5,
        @"name": @"AccentColorEmerald100",
        @"category": @"accentColor",
        @"type": @"emerald",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a7f3d0,
        @"name": @"AccentColorEmerald200",
        @"category": @"accentColor",
        @"type": @"emerald",
        @"item": @"200"
        },
      @"300": @{
        @"value": #6ee7b7,
        @"name": @"AccentColorEmerald300",
        @"category": @"accentColor",
        @"type": @"emerald",
        @"item": @"300"
        },
      @"400": @{
        @"value": #34d399,
        @"name": @"AccentColorEmerald400",
        @"category": @"accentColor",
        @"type": @"emerald",
        @"item": @"400"
        },
      @"500": @{
        @"value": #10b981,
        @"name": @"AccentColorEmerald500",
        @"category": @"accentColor",
        @"type": @"emerald",
        @"item": @"500"
        },
      @"600": @{
        @"value": #059669,
        @"name": @"AccentColorEmerald600",
        @"category": @"accentColor",
        @"type": @"emerald",
        @"item": @"600"
        },
      @"700": @{
        @"value": #047857,
        @"name": @"AccentColorEmerald700",
        @"category": @"accentColor",
        @"type": @"emerald",
        @"item": @"700"
        },
      @"800": @{
        @"value": #065f46,
        @"name": @"AccentColorEmerald800",
        @"category": @"accentColor",
        @"type": @"emerald",
        @"item": @"800"
        },
      @"900": @{
        @"value": #064e3b,
        @"name": @"AccentColorEmerald900",
        @"category": @"accentColor",
        @"type": @"emerald",
        @"item": @"900"
        },
      @"950": @{
        @"value": #022c22,
        @"name": @"AccentColorEmerald950",
        @"category": @"accentColor",
        @"type": @"emerald",
        @"item": @"950"
        }
      },
    @"teal": @{
      @"50": @{
        @"value": #f0fdfa,
        @"name": @"AccentColorTeal50",
        @"category": @"accentColor",
        @"type": @"teal",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ccfbf1,
        @"name": @"AccentColorTeal100",
        @"category": @"accentColor",
        @"type": @"teal",
        @"item": @"100"
        },
      @"200": @{
        @"value": #99f6e4,
        @"name": @"AccentColorTeal200",
        @"category": @"accentColor",
        @"type": @"teal",
        @"item": @"200"
        },
      @"300": @{
        @"value": #5eead4,
        @"name": @"AccentColorTeal300",
        @"category": @"accentColor",
        @"type": @"teal",
        @"item": @"300"
        },
      @"400": @{
        @"value": #2dd4bf,
        @"name": @"AccentColorTeal400",
        @"category": @"accentColor",
        @"type": @"teal",
        @"item": @"400"
        },
      @"500": @{
        @"value": #14b8a6,
        @"name": @"AccentColorTeal500",
        @"category": @"accentColor",
        @"type": @"teal",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0d9488,
        @"name": @"AccentColorTeal600",
        @"category": @"accentColor",
        @"type": @"teal",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0f766e,
        @"name": @"AccentColorTeal700",
        @"category": @"accentColor",
        @"type": @"teal",
        @"item": @"700"
        },
      @"800": @{
        @"value": #115e59,
        @"name": @"AccentColorTeal800",
        @"category": @"accentColor",
        @"type": @"teal",
        @"item": @"800"
        },
      @"900": @{
        @"value": #134e4a,
        @"name": @"AccentColorTeal900",
        @"category": @"accentColor",
        @"type": @"teal",
        @"item": @"900"
        },
      @"950": @{
        @"value": #042f2e,
        @"name": @"AccentColorTeal950",
        @"category": @"accentColor",
        @"type": @"teal",
        @"item": @"950"
        }
      },
    @"cyan": @{
      @"50": @{
        @"value": #ecfeff,
        @"name": @"AccentColorCyan50",
        @"category": @"accentColor",
        @"type": @"cyan",
        @"item": @"50"
        },
      @"100": @{
        @"value": #cffafe,
        @"name": @"AccentColorCyan100",
        @"category": @"accentColor",
        @"type": @"cyan",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a5f3fc,
        @"name": @"AccentColorCyan200",
        @"category": @"accentColor",
        @"type": @"cyan",
        @"item": @"200"
        },
      @"300": @{
        @"value": #67e8f9,
        @"name": @"AccentColorCyan300",
        @"category": @"accentColor",
        @"type": @"cyan",
        @"item": @"300"
        },
      @"400": @{
        @"value": #22d3ee,
        @"name": @"AccentColorCyan400",
        @"category": @"accentColor",
        @"type": @"cyan",
        @"item": @"400"
        },
      @"500": @{
        @"value": #06b6d4,
        @"name": @"AccentColorCyan500",
        @"category": @"accentColor",
        @"type": @"cyan",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0891b2,
        @"name": @"AccentColorCyan600",
        @"category": @"accentColor",
        @"type": @"cyan",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0e7490,
        @"name": @"AccentColorCyan700",
        @"category": @"accentColor",
        @"type": @"cyan",
        @"item": @"700"
        },
      @"800": @{
        @"value": #155e75,
        @"name": @"AccentColorCyan800",
        @"category": @"accentColor",
        @"type": @"cyan",
        @"item": @"800"
        },
      @"900": @{
        @"value": #164e63,
        @"name": @"AccentColorCyan900",
        @"category": @"accentColor",
        @"type": @"cyan",
        @"item": @"900"
        },
      @"950": @{
        @"value": #083344,
        @"name": @"AccentColorCyan950",
        @"category": @"accentColor",
        @"type": @"cyan",
        @"item": @"950"
        }
      },
    @"sky": @{
      @"50": @{
        @"value": #f0f9ff,
        @"name": @"AccentColorSky50",
        @"category": @"accentColor",
        @"type": @"sky",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0f2fe,
        @"name": @"AccentColorSky100",
        @"category": @"accentColor",
        @"type": @"sky",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bae6fd,
        @"name": @"AccentColorSky200",
        @"category": @"accentColor",
        @"type": @"sky",
        @"item": @"200"
        },
      @"300": @{
        @"value": #7dd3fc,
        @"name": @"AccentColorSky300",
        @"category": @"accentColor",
        @"type": @"sky",
        @"item": @"300"
        },
      @"400": @{
        @"value": #38bdf8,
        @"name": @"AccentColorSky400",
        @"category": @"accentColor",
        @"type": @"sky",
        @"item": @"400"
        },
      @"500": @{
        @"value": #0ea5e9,
        @"name": @"AccentColorSky500",
        @"category": @"accentColor",
        @"type": @"sky",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0284c7,
        @"name": @"AccentColorSky600",
        @"category": @"accentColor",
        @"type": @"sky",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0369a1,
        @"name": @"AccentColorSky700",
        @"category": @"accentColor",
        @"type": @"sky",
        @"item": @"700"
        },
      @"800": @{
        @"value": #075985,
        @"name": @"AccentColorSky800",
        @"category": @"accentColor",
        @"type": @"sky",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0c4a6e,
        @"name": @"AccentColorSky900",
        @"category": @"accentColor",
        @"type": @"sky",
        @"item": @"900"
        },
      @"950": @{
        @"value": #082f49,
        @"name": @"AccentColorSky950",
        @"category": @"accentColor",
        @"type": @"sky",
        @"item": @"950"
        }
      },
    @"blue": @{
      @"50": @{
        @"value": #eff6ff,
        @"name": @"AccentColorBlue50",
        @"category": @"accentColor",
        @"type": @"blue",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dbeafe,
        @"name": @"AccentColorBlue100",
        @"category": @"accentColor",
        @"type": @"blue",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bfdbfe,
        @"name": @"AccentColorBlue200",
        @"category": @"accentColor",
        @"type": @"blue",
        @"item": @"200"
        },
      @"300": @{
        @"value": #93c5fd,
        @"name": @"AccentColorBlue300",
        @"category": @"accentColor",
        @"type": @"blue",
        @"item": @"300"
        },
      @"400": @{
        @"value": #60a5fa,
        @"name": @"AccentColorBlue400",
        @"category": @"accentColor",
        @"type": @"blue",
        @"item": @"400"
        },
      @"500": @{
        @"value": #3b82f6,
        @"name": @"AccentColorBlue500",
        @"category": @"accentColor",
        @"type": @"blue",
        @"item": @"500"
        },
      @"600": @{
        @"value": #2563eb,
        @"name": @"AccentColorBlue600",
        @"category": @"accentColor",
        @"type": @"blue",
        @"item": @"600"
        },
      @"700": @{
        @"value": #1d4ed8,
        @"name": @"AccentColorBlue700",
        @"category": @"accentColor",
        @"type": @"blue",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e40af,
        @"name": @"AccentColorBlue800",
        @"category": @"accentColor",
        @"type": @"blue",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1e3a8a,
        @"name": @"AccentColorBlue900",
        @"category": @"accentColor",
        @"type": @"blue",
        @"item": @"900"
        },
      @"950": @{
        @"value": #172554,
        @"name": @"AccentColorBlue950",
        @"category": @"accentColor",
        @"type": @"blue",
        @"item": @"950"
        }
      },
    @"indigo": @{
      @"50": @{
        @"value": #eef2ff,
        @"name": @"AccentColorIndigo50",
        @"category": @"accentColor",
        @"type": @"indigo",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0e7ff,
        @"name": @"AccentColorIndigo100",
        @"category": @"accentColor",
        @"type": @"indigo",
        @"item": @"100"
        },
      @"200": @{
        @"value": #c7d2fe,
        @"name": @"AccentColorIndigo200",
        @"category": @"accentColor",
        @"type": @"indigo",
        @"item": @"200"
        },
      @"300": @{
        @"value": #a5b4fc,
        @"name": @"AccentColorIndigo300",
        @"category": @"accentColor",
        @"type": @"indigo",
        @"item": @"300"
        },
      @"400": @{
        @"value": #818cf8,
        @"name": @"AccentColorIndigo400",
        @"category": @"accentColor",
        @"type": @"indigo",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6366f1,
        @"name": @"AccentColorIndigo500",
        @"category": @"accentColor",
        @"type": @"indigo",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4f46e5,
        @"name": @"AccentColorIndigo600",
        @"category": @"accentColor",
        @"type": @"indigo",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4338ca,
        @"name": @"AccentColorIndigo700",
        @"category": @"accentColor",
        @"type": @"indigo",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3730a3,
        @"name": @"AccentColorIndigo800",
        @"category": @"accentColor",
        @"type": @"indigo",
        @"item": @"800"
        },
      @"900": @{
        @"value": #312e81,
        @"name": @"AccentColorIndigo900",
        @"category": @"accentColor",
        @"type": @"indigo",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1e1b4b,
        @"name": @"AccentColorIndigo950",
        @"category": @"accentColor",
        @"type": @"indigo",
        @"item": @"950"
        }
      },
    @"violet": @{
      @"50": @{
        @"value": #f5f3ff,
        @"name": @"AccentColorViolet50",
        @"category": @"accentColor",
        @"type": @"violet",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ede9fe,
        @"name": @"AccentColorViolet100",
        @"category": @"accentColor",
        @"type": @"violet",
        @"item": @"100"
        },
      @"200": @{
        @"value": #ddd6fe,
        @"name": @"AccentColorViolet200",
        @"category": @"accentColor",
        @"type": @"violet",
        @"item": @"200"
        },
      @"300": @{
        @"value": #c4b5fd,
        @"name": @"AccentColorViolet300",
        @"category": @"accentColor",
        @"type": @"violet",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a78bfa,
        @"name": @"AccentColorViolet400",
        @"category": @"accentColor",
        @"type": @"violet",
        @"item": @"400"
        },
      @"500": @{
        @"value": #8b5cf6,
        @"name": @"AccentColorViolet500",
        @"category": @"accentColor",
        @"type": @"violet",
        @"item": @"500"
        },
      @"600": @{
        @"value": #7c3aed,
        @"name": @"AccentColorViolet600",
        @"category": @"accentColor",
        @"type": @"violet",
        @"item": @"600"
        },
      @"700": @{
        @"value": #6d28d9,
        @"name": @"AccentColorViolet700",
        @"category": @"accentColor",
        @"type": @"violet",
        @"item": @"700"
        },
      @"800": @{
        @"value": #5b21b6,
        @"name": @"AccentColorViolet800",
        @"category": @"accentColor",
        @"type": @"violet",
        @"item": @"800"
        },
      @"900": @{
        @"value": #4c1d95,
        @"name": @"AccentColorViolet900",
        @"category": @"accentColor",
        @"type": @"violet",
        @"item": @"900"
        },
      @"950": @{
        @"value": #2e1065,
        @"name": @"AccentColorViolet950",
        @"category": @"accentColor",
        @"type": @"violet",
        @"item": @"950"
        }
      },
    @"purple": @{
      @"50": @{
        @"value": #faf5ff,
        @"name": @"AccentColorPurple50",
        @"category": @"accentColor",
        @"type": @"purple",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3e8ff,
        @"name": @"AccentColorPurple100",
        @"category": @"accentColor",
        @"type": @"purple",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e9d5ff,
        @"name": @"AccentColorPurple200",
        @"category": @"accentColor",
        @"type": @"purple",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d8b4fe,
        @"name": @"AccentColorPurple300",
        @"category": @"accentColor",
        @"type": @"purple",
        @"item": @"300"
        },
      @"400": @{
        @"value": #c084fc,
        @"name": @"AccentColorPurple400",
        @"category": @"accentColor",
        @"type": @"purple",
        @"item": @"400"
        },
      @"500": @{
        @"value": #a855f7,
        @"name": @"AccentColorPurple500",
        @"category": @"accentColor",
        @"type": @"purple",
        @"item": @"500"
        },
      @"600": @{
        @"value": #9333ea,
        @"name": @"AccentColorPurple600",
        @"category": @"accentColor",
        @"type": @"purple",
        @"item": @"600"
        },
      @"700": @{
        @"value": #7e22ce,
        @"name": @"AccentColorPurple700",
        @"category": @"accentColor",
        @"type": @"purple",
        @"item": @"700"
        },
      @"800": @{
        @"value": #6b21a8,
        @"name": @"AccentColorPurple800",
        @"category": @"accentColor",
        @"type": @"purple",
        @"item": @"800"
        },
      @"900": @{
        @"value": #581c87,
        @"name": @"AccentColorPurple900",
        @"category": @"accentColor",
        @"type": @"purple",
        @"item": @"900"
        },
      @"950": @{
        @"value": #3b0764,
        @"name": @"AccentColorPurple950",
        @"category": @"accentColor",
        @"type": @"purple",
        @"item": @"950"
        }
      },
    @"fuchsia": @{
      @"50": @{
        @"value": #fdf4ff,
        @"name": @"AccentColorFuchsia50",
        @"category": @"accentColor",
        @"type": @"fuchsia",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fae8ff,
        @"name": @"AccentColorFuchsia100",
        @"category": @"accentColor",
        @"type": @"fuchsia",
        @"item": @"100"
        },
      @"200": @{
        @"value": #f5d0fe,
        @"name": @"AccentColorFuchsia200",
        @"category": @"accentColor",
        @"type": @"fuchsia",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f0abfc,
        @"name": @"AccentColorFuchsia300",
        @"category": @"accentColor",
        @"type": @"fuchsia",
        @"item": @"300"
        },
      @"400": @{
        @"value": #e879f9,
        @"name": @"AccentColorFuchsia400",
        @"category": @"accentColor",
        @"type": @"fuchsia",
        @"item": @"400"
        },
      @"500": @{
        @"value": #d946ef,
        @"name": @"AccentColorFuchsia500",
        @"category": @"accentColor",
        @"type": @"fuchsia",
        @"item": @"500"
        },
      @"600": @{
        @"value": #c026d3,
        @"name": @"AccentColorFuchsia600",
        @"category": @"accentColor",
        @"type": @"fuchsia",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a21caf,
        @"name": @"AccentColorFuchsia700",
        @"category": @"accentColor",
        @"type": @"fuchsia",
        @"item": @"700"
        },
      @"800": @{
        @"value": #86198f,
        @"name": @"AccentColorFuchsia800",
        @"category": @"accentColor",
        @"type": @"fuchsia",
        @"item": @"800"
        },
      @"900": @{
        @"value": #701a75,
        @"name": @"AccentColorFuchsia900",
        @"category": @"accentColor",
        @"type": @"fuchsia",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4a044e,
        @"name": @"AccentColorFuchsia950",
        @"category": @"accentColor",
        @"type": @"fuchsia",
        @"item": @"950"
        }
      },
    @"pink": @{
      @"50": @{
        @"value": #fdf2f8,
        @"name": @"AccentColorPink50",
        @"category": @"accentColor",
        @"type": @"pink",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fce7f3,
        @"name": @"AccentColorPink100",
        @"category": @"accentColor",
        @"type": @"pink",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fbcfe8,
        @"name": @"AccentColorPink200",
        @"category": @"accentColor",
        @"type": @"pink",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f9a8d4,
        @"name": @"AccentColorPink300",
        @"category": @"accentColor",
        @"type": @"pink",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f472b6,
        @"name": @"AccentColorPink400",
        @"category": @"accentColor",
        @"type": @"pink",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ec4899,
        @"name": @"AccentColorPink500",
        @"category": @"accentColor",
        @"type": @"pink",
        @"item": @"500"
        },
      @"600": @{
        @"value": #db2777,
        @"name": @"AccentColorPink600",
        @"category": @"accentColor",
        @"type": @"pink",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be185d,
        @"name": @"AccentColorPink700",
        @"category": @"accentColor",
        @"type": @"pink",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9d174d,
        @"name": @"AccentColorPink800",
        @"category": @"accentColor",
        @"type": @"pink",
        @"item": @"800"
        },
      @"900": @{
        @"value": #831843,
        @"name": @"AccentColorPink900",
        @"category": @"accentColor",
        @"type": @"pink",
        @"item": @"900"
        },
      @"950": @{
        @"value": #500724,
        @"name": @"AccentColorPink950",
        @"category": @"accentColor",
        @"type": @"pink",
        @"item": @"950"
        }
      },
    @"rose": @{
      @"50": @{
        @"value": #fff1f2,
        @"name": @"AccentColorRose50",
        @"category": @"accentColor",
        @"type": @"rose",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffe4e6,
        @"name": @"AccentColorRose100",
        @"category": @"accentColor",
        @"type": @"rose",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecdd3,
        @"name": @"AccentColorRose200",
        @"category": @"accentColor",
        @"type": @"rose",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fda4af,
        @"name": @"AccentColorRose300",
        @"category": @"accentColor",
        @"type": @"rose",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb7185,
        @"name": @"AccentColorRose400",
        @"category": @"accentColor",
        @"type": @"rose",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f43f5e,
        @"name": @"AccentColorRose500",
        @"category": @"accentColor",
        @"type": @"rose",
        @"item": @"500"
        },
      @"600": @{
        @"value": #e11d48,
        @"name": @"AccentColorRose600",
        @"category": @"accentColor",
        @"type": @"rose",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be123c,
        @"name": @"AccentColorRose700",
        @"category": @"accentColor",
        @"type": @"rose",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9f1239,
        @"name": @"AccentColorRose800",
        @"category": @"accentColor",
        @"type": @"rose",
        @"item": @"800"
        },
      @"900": @{
        @"value": #881337,
        @"name": @"AccentColorRose900",
        @"category": @"accentColor",
        @"type": @"rose",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4c0519,
        @"name": @"AccentColorRose950",
        @"category": @"accentColor",
        @"type": @"rose",
        @"item": @"950"
        }
      },
    @"auto": @{
      @"value": auto,
      @"name": @"AccentColorAuto",
      @"category": @"accentColor",
      @"type": @"auto"
      }
    },
  @"animation": @{
    @"none": @{
      @"value": none,
      @"name": @"AnimationNone",
      @"category": @"animation",
      @"type": @"none"
      },
    @"spin": @{
      @"value": spin 1s linear infinite,
      @"name": @"AnimationSpin",
      @"category": @"animation",
      @"type": @"spin"
      },
    @"ping": @{
      @"value": ping 1s cubic-bezier(0, 0, 0.2, 1) infinite,
      @"name": @"AnimationPing",
      @"category": @"animation",
      @"type": @"ping"
      },
    @"pulse": @{
      @"value": pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite,
      @"name": @"AnimationPulse",
      @"category": @"animation",
      @"type": @"pulse"
      },
    @"bounce": @{
      @"value": bounce 1s infinite,
      @"name": @"AnimationBounce",
      @"category": @"animation",
      @"type": @"bounce"
      }
    },
  @"aria": @{
    @"busy": @{
      @"value": busy="true",
      @"name": @"AriaBusy",
      @"category": @"aria",
      @"type": @"busy"
      },
    @"checked": @{
      @"value": checked="true",
      @"name": @"AriaChecked",
      @"category": @"aria",
      @"type": @"checked"
      },
    @"disabled": @{
      @"value": disabled="true",
      @"name": @"AriaDisabled",
      @"category": @"aria",
      @"type": @"disabled"
      },
    @"expanded": @{
      @"value": expanded="true",
      @"name": @"AriaExpanded",
      @"category": @"aria",
      @"type": @"expanded"
      },
    @"hidden": @{
      @"value": hidden="true",
      @"name": @"AriaHidden",
      @"category": @"aria",
      @"type": @"hidden"
      },
    @"pressed": @{
      @"value": pressed="true",
      @"name": @"AriaPressed",
      @"category": @"aria",
      @"type": @"pressed"
      },
    @"readonly": @{
      @"value": readonly="true",
      @"name": @"AriaReadonly",
      @"category": @"aria",
      @"type": @"readonly"
      },
    @"required": @{
      @"value": required="true",
      @"name": @"AriaRequired",
      @"category": @"aria",
      @"type": @"required"
      },
    @"selected": @{
      @"value": selected="true",
      @"name": @"AriaSelected",
      @"category": @"aria",
      @"type": @"selected"
      }
    },
  @"aspectRatio": @{
    @"auto": @{
      @"value": auto,
      @"name": @"AspectRatioAuto",
      @"category": @"aspectRatio",
      @"type": @"auto"
      },
    @"square": @{
      @"value": 1 / 1,
      @"name": @"AspectRatioSquare",
      @"category": @"aspectRatio",
      @"type": @"square"
      },
    @"video": @{
      @"value": 16 / 9,
      @"name": @"AspectRatioVideo",
      @"category": @"aspectRatio",
      @"type": @"video"
      }
    },
  @"backdropBlur": @{
    @"0": @{
      @"value": 0,
      @"name": @"BackdropBlur0",
      @"category": @"backdropBlur",
      @"type": @"0"
      },
    @"none": @{
      @"value": ,
      @"name": @"BackdropBlurNone",
      @"category": @"backdropBlur",
      @"type": @"none"
      },
    @"sm": @{
      @"value": 4px,
      @"name": @"BackdropBlurSm",
      @"category": @"backdropBlur",
      @"type": @"sm"
      },
    @"DEFAULT": @{
      @"value": 8px,
      @"name": @"BackdropBlurDefault",
      @"category": @"backdropBlur",
      @"type": @"DEFAULT"
      },
    @"md": @{
      @"value": 12px,
      @"name": @"BackdropBlurMd",
      @"category": @"backdropBlur",
      @"type": @"md"
      },
    @"lg": @{
      @"value": 16px,
      @"name": @"BackdropBlurLg",
      @"category": @"backdropBlur",
      @"type": @"lg"
      },
    @"xl": @{
      @"value": 24px,
      @"name": @"BackdropBlurXl",
      @"category": @"backdropBlur",
      @"type": @"xl"
      },
    @"2xl": @{
      @"value": 40px,
      @"name": @"BackdropBlur2xl",
      @"category": @"backdropBlur",
      @"type": @"2xl"
      },
    @"3xl": @{
      @"value": 64px,
      @"name": @"BackdropBlur3xl",
      @"category": @"backdropBlur",
      @"type": @"3xl"
      }
    },
  @"backdropBrightness": @{
    @"0": @{
      @"value": 0,
      @"name": @"BackdropBrightness0",
      @"category": @"backdropBrightness",
      @"type": @"0"
      },
    @"50": @{
      @"value": .5,
      @"name": @"BackdropBrightness50",
      @"category": @"backdropBrightness",
      @"type": @"50"
      },
    @"75": @{
      @"value": .75,
      @"name": @"BackdropBrightness75",
      @"category": @"backdropBrightness",
      @"type": @"75"
      },
    @"90": @{
      @"value": .9,
      @"name": @"BackdropBrightness90",
      @"category": @"backdropBrightness",
      @"type": @"90"
      },
    @"95": @{
      @"value": .95,
      @"name": @"BackdropBrightness95",
      @"category": @"backdropBrightness",
      @"type": @"95"
      },
    @"100": @{
      @"value": 1,
      @"name": @"BackdropBrightness100",
      @"category": @"backdropBrightness",
      @"type": @"100"
      },
    @"105": @{
      @"value": 1.05,
      @"name": @"BackdropBrightness105",
      @"category": @"backdropBrightness",
      @"type": @"105"
      },
    @"110": @{
      @"value": 1.1,
      @"name": @"BackdropBrightness110",
      @"category": @"backdropBrightness",
      @"type": @"110"
      },
    @"125": @{
      @"value": 1.25,
      @"name": @"BackdropBrightness125",
      @"category": @"backdropBrightness",
      @"type": @"125"
      },
    @"150": @{
      @"value": 1.5,
      @"name": @"BackdropBrightness150",
      @"category": @"backdropBrightness",
      @"type": @"150"
      },
    @"200": @{
      @"value": 2,
      @"name": @"BackdropBrightness200",
      @"category": @"backdropBrightness",
      @"type": @"200"
      }
    },
  @"backdropContrast": @{
    @"0": @{
      @"value": 0,
      @"name": @"BackdropContrast0",
      @"category": @"backdropContrast",
      @"type": @"0"
      },
    @"50": @{
      @"value": .5,
      @"name": @"BackdropContrast50",
      @"category": @"backdropContrast",
      @"type": @"50"
      },
    @"75": @{
      @"value": .75,
      @"name": @"BackdropContrast75",
      @"category": @"backdropContrast",
      @"type": @"75"
      },
    @"100": @{
      @"value": 1,
      @"name": @"BackdropContrast100",
      @"category": @"backdropContrast",
      @"type": @"100"
      },
    @"125": @{
      @"value": 1.25,
      @"name": @"BackdropContrast125",
      @"category": @"backdropContrast",
      @"type": @"125"
      },
    @"150": @{
      @"value": 1.5,
      @"name": @"BackdropContrast150",
      @"category": @"backdropContrast",
      @"type": @"150"
      },
    @"200": @{
      @"value": 2,
      @"name": @"BackdropContrast200",
      @"category": @"backdropContrast",
      @"type": @"200"
      }
    },
  @"backdropGrayscale": @{
    @"0": @{
      @"value": 0,
      @"name": @"BackdropGrayscale0",
      @"category": @"backdropGrayscale",
      @"type": @"0"
      },
    @"DEFAULT": @{
      @"value": 100%,
      @"name": @"BackdropGrayscaleDefault",
      @"category": @"backdropGrayscale",
      @"type": @"DEFAULT"
      }
    },
  @"backdropHueRotate": @{
    @"0": @{
      @"value": 0deg,
      @"name": @"BackdropHueRotate0",
      @"category": @"backdropHueRotate",
      @"type": @"0"
      },
    @"15": @{
      @"value": 15deg,
      @"name": @"BackdropHueRotate15",
      @"category": @"backdropHueRotate",
      @"type": @"15"
      },
    @"30": @{
      @"value": 30deg,
      @"name": @"BackdropHueRotate30",
      @"category": @"backdropHueRotate",
      @"type": @"30"
      },
    @"60": @{
      @"value": 60deg,
      @"name": @"BackdropHueRotate60",
      @"category": @"backdropHueRotate",
      @"type": @"60"
      },
    @"90": @{
      @"value": 90deg,
      @"name": @"BackdropHueRotate90",
      @"category": @"backdropHueRotate",
      @"type": @"90"
      },
    @"180": @{
      @"value": 180deg,
      @"name": @"BackdropHueRotate180",
      @"category": @"backdropHueRotate",
      @"type": @"180"
      }
    },
  @"backdropInvert": @{
    @"0": @{
      @"value": 0,
      @"name": @"BackdropInvert0",
      @"category": @"backdropInvert",
      @"type": @"0"
      },
    @"DEFAULT": @{
      @"value": 100%,
      @"name": @"BackdropInvertDefault",
      @"category": @"backdropInvert",
      @"type": @"DEFAULT"
      }
    },
  @"backdropOpacity": @{
    @"0": @{
      @"value": 0,
      @"name": @"BackdropOpacity0",
      @"category": @"backdropOpacity",
      @"type": @"0"
      },
    @"5": @{
      @"value": 0.05,
      @"name": @"BackdropOpacity5",
      @"category": @"backdropOpacity",
      @"type": @"5"
      },
    @"10": @{
      @"value": 0.1,
      @"name": @"BackdropOpacity10",
      @"category": @"backdropOpacity",
      @"type": @"10"
      },
    @"15": @{
      @"value": 0.15,
      @"name": @"BackdropOpacity15",
      @"category": @"backdropOpacity",
      @"type": @"15"
      },
    @"20": @{
      @"value": 0.2,
      @"name": @"BackdropOpacity20",
      @"category": @"backdropOpacity",
      @"type": @"20"
      },
    @"25": @{
      @"value": 0.25,
      @"name": @"BackdropOpacity25",
      @"category": @"backdropOpacity",
      @"type": @"25"
      },
    @"30": @{
      @"value": 0.3,
      @"name": @"BackdropOpacity30",
      @"category": @"backdropOpacity",
      @"type": @"30"
      },
    @"35": @{
      @"value": 0.35,
      @"name": @"BackdropOpacity35",
      @"category": @"backdropOpacity",
      @"type": @"35"
      },
    @"40": @{
      @"value": 0.4,
      @"name": @"BackdropOpacity40",
      @"category": @"backdropOpacity",
      @"type": @"40"
      },
    @"45": @{
      @"value": 0.45,
      @"name": @"BackdropOpacity45",
      @"category": @"backdropOpacity",
      @"type": @"45"
      },
    @"50": @{
      @"value": 0.5,
      @"name": @"BackdropOpacity50",
      @"category": @"backdropOpacity",
      @"type": @"50"
      },
    @"55": @{
      @"value": 0.55,
      @"name": @"BackdropOpacity55",
      @"category": @"backdropOpacity",
      @"type": @"55"
      },
    @"60": @{
      @"value": 0.6,
      @"name": @"BackdropOpacity60",
      @"category": @"backdropOpacity",
      @"type": @"60"
      },
    @"65": @{
      @"value": 0.65,
      @"name": @"BackdropOpacity65",
      @"category": @"backdropOpacity",
      @"type": @"65"
      },
    @"70": @{
      @"value": 0.7,
      @"name": @"BackdropOpacity70",
      @"category": @"backdropOpacity",
      @"type": @"70"
      },
    @"75": @{
      @"value": 0.75,
      @"name": @"BackdropOpacity75",
      @"category": @"backdropOpacity",
      @"type": @"75"
      },
    @"80": @{
      @"value": 0.8,
      @"name": @"BackdropOpacity80",
      @"category": @"backdropOpacity",
      @"type": @"80"
      },
    @"85": @{
      @"value": 0.85,
      @"name": @"BackdropOpacity85",
      @"category": @"backdropOpacity",
      @"type": @"85"
      },
    @"90": @{
      @"value": 0.9,
      @"name": @"BackdropOpacity90",
      @"category": @"backdropOpacity",
      @"type": @"90"
      },
    @"95": @{
      @"value": 0.95,
      @"name": @"BackdropOpacity95",
      @"category": @"backdropOpacity",
      @"type": @"95"
      },
    @"100": @{
      @"value": 1,
      @"name": @"BackdropOpacity100",
      @"category": @"backdropOpacity",
      @"type": @"100"
      }
    },
  @"backdropSaturate": @{
    @"0": @{
      @"value": 0,
      @"name": @"BackdropSaturate0",
      @"category": @"backdropSaturate",
      @"type": @"0"
      },
    @"50": @{
      @"value": .5,
      @"name": @"BackdropSaturate50",
      @"category": @"backdropSaturate",
      @"type": @"50"
      },
    @"100": @{
      @"value": 1,
      @"name": @"BackdropSaturate100",
      @"category": @"backdropSaturate",
      @"type": @"100"
      },
    @"150": @{
      @"value": 1.5,
      @"name": @"BackdropSaturate150",
      @"category": @"backdropSaturate",
      @"type": @"150"
      },
    @"200": @{
      @"value": 2,
      @"name": @"BackdropSaturate200",
      @"category": @"backdropSaturate",
      @"type": @"200"
      }
    },
  @"backdropSepia": @{
    @"0": @{
      @"value": 0,
      @"name": @"BackdropSepia0",
      @"category": @"backdropSepia",
      @"type": @"0"
      },
    @"DEFAULT": @{
      @"value": 100%,
      @"name": @"BackdropSepiaDefault",
      @"category": @"backdropSepia",
      @"type": @"DEFAULT"
      }
    },
  @"backgroundColor": @{
    @"inherit": @{
      @"value": inherit,
      @"name": @"BackgroundColorInherit",
      @"category": @"backgroundColor",
      @"type": @"inherit"
      },
    @"current": @{
      @"value": currentColor,
      @"name": @"BackgroundColorCurrent",
      @"category": @"backgroundColor",
      @"type": @"current"
      },
    @"transparent": @{
      @"value": transparent,
      @"name": @"BackgroundColorTransparent",
      @"category": @"backgroundColor",
      @"type": @"transparent"
      },
    @"black": @{
      @"value": #000,
      @"name": @"BackgroundColorBlack",
      @"category": @"backgroundColor",
      @"type": @"black"
      },
    @"white": @{
      @"value": #fff,
      @"name": @"BackgroundColorWhite",
      @"category": @"backgroundColor",
      @"type": @"white"
      },
    @"slate": @{
      @"50": @{
        @"value": #f8fafc,
        @"name": @"BackgroundColorSlate50",
        @"category": @"backgroundColor",
        @"type": @"slate",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f1f5f9,
        @"name": @"BackgroundColorSlate100",
        @"category": @"backgroundColor",
        @"type": @"slate",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e2e8f0,
        @"name": @"BackgroundColorSlate200",
        @"category": @"backgroundColor",
        @"type": @"slate",
        @"item": @"200"
        },
      @"300": @{
        @"value": #cbd5e1,
        @"name": @"BackgroundColorSlate300",
        @"category": @"backgroundColor",
        @"type": @"slate",
        @"item": @"300"
        },
      @"400": @{
        @"value": #94a3b8,
        @"name": @"BackgroundColorSlate400",
        @"category": @"backgroundColor",
        @"type": @"slate",
        @"item": @"400"
        },
      @"500": @{
        @"value": #64748b,
        @"name": @"BackgroundColorSlate500",
        @"category": @"backgroundColor",
        @"type": @"slate",
        @"item": @"500"
        },
      @"600": @{
        @"value": #475569,
        @"name": @"BackgroundColorSlate600",
        @"category": @"backgroundColor",
        @"type": @"slate",
        @"item": @"600"
        },
      @"700": @{
        @"value": #334155,
        @"name": @"BackgroundColorSlate700",
        @"category": @"backgroundColor",
        @"type": @"slate",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e293b,
        @"name": @"BackgroundColorSlate800",
        @"category": @"backgroundColor",
        @"type": @"slate",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0f172a,
        @"name": @"BackgroundColorSlate900",
        @"category": @"backgroundColor",
        @"type": @"slate",
        @"item": @"900"
        },
      @"950": @{
        @"value": #020617,
        @"name": @"BackgroundColorSlate950",
        @"category": @"backgroundColor",
        @"type": @"slate",
        @"item": @"950"
        }
      },
    @"gray": @{
      @"50": @{
        @"value": #f9fafb,
        @"name": @"BackgroundColorGray50",
        @"category": @"backgroundColor",
        @"type": @"gray",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3f4f6,
        @"name": @"BackgroundColorGray100",
        @"category": @"backgroundColor",
        @"type": @"gray",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e7eb,
        @"name": @"BackgroundColorGray200",
        @"category": @"backgroundColor",
        @"type": @"gray",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d1d5db,
        @"name": @"BackgroundColorGray300",
        @"category": @"backgroundColor",
        @"type": @"gray",
        @"item": @"300"
        },
      @"400": @{
        @"value": #9ca3af,
        @"name": @"BackgroundColorGray400",
        @"category": @"backgroundColor",
        @"type": @"gray",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6b7280,
        @"name": @"BackgroundColorGray500",
        @"category": @"backgroundColor",
        @"type": @"gray",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4b5563,
        @"name": @"BackgroundColorGray600",
        @"category": @"backgroundColor",
        @"type": @"gray",
        @"item": @"600"
        },
      @"700": @{
        @"value": #374151,
        @"name": @"BackgroundColorGray700",
        @"category": @"backgroundColor",
        @"type": @"gray",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1f2937,
        @"name": @"BackgroundColorGray800",
        @"category": @"backgroundColor",
        @"type": @"gray",
        @"item": @"800"
        },
      @"900": @{
        @"value": #111827,
        @"name": @"BackgroundColorGray900",
        @"category": @"backgroundColor",
        @"type": @"gray",
        @"item": @"900"
        },
      @"950": @{
        @"value": #030712,
        @"name": @"BackgroundColorGray950",
        @"category": @"backgroundColor",
        @"type": @"gray",
        @"item": @"950"
        }
      },
    @"zinc": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"BackgroundColorZinc50",
        @"category": @"backgroundColor",
        @"type": @"zinc",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f4f4f5,
        @"name": @"BackgroundColorZinc100",
        @"category": @"backgroundColor",
        @"type": @"zinc",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e4e4e7,
        @"name": @"BackgroundColorZinc200",
        @"category": @"backgroundColor",
        @"type": @"zinc",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d8,
        @"name": @"BackgroundColorZinc300",
        @"category": @"backgroundColor",
        @"type": @"zinc",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a1a1aa,
        @"name": @"BackgroundColorZinc400",
        @"category": @"backgroundColor",
        @"type": @"zinc",
        @"item": @"400"
        },
      @"500": @{
        @"value": #71717a,
        @"name": @"BackgroundColorZinc500",
        @"category": @"backgroundColor",
        @"type": @"zinc",
        @"item": @"500"
        },
      @"600": @{
        @"value": #52525b,
        @"name": @"BackgroundColorZinc600",
        @"category": @"backgroundColor",
        @"type": @"zinc",
        @"item": @"600"
        },
      @"700": @{
        @"value": #3f3f46,
        @"name": @"BackgroundColorZinc700",
        @"category": @"backgroundColor",
        @"type": @"zinc",
        @"item": @"700"
        },
      @"800": @{
        @"value": #27272a,
        @"name": @"BackgroundColorZinc800",
        @"category": @"backgroundColor",
        @"type": @"zinc",
        @"item": @"800"
        },
      @"900": @{
        @"value": #18181b,
        @"name": @"BackgroundColorZinc900",
        @"category": @"backgroundColor",
        @"type": @"zinc",
        @"item": @"900"
        },
      @"950": @{
        @"value": #09090b,
        @"name": @"BackgroundColorZinc950",
        @"category": @"backgroundColor",
        @"type": @"zinc",
        @"item": @"950"
        }
      },
    @"neutral": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"BackgroundColorNeutral50",
        @"category": @"backgroundColor",
        @"type": @"neutral",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f5,
        @"name": @"BackgroundColorNeutral100",
        @"category": @"backgroundColor",
        @"type": @"neutral",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e5e5,
        @"name": @"BackgroundColorNeutral200",
        @"category": @"backgroundColor",
        @"type": @"neutral",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d4,
        @"name": @"BackgroundColorNeutral300",
        @"category": @"backgroundColor",
        @"type": @"neutral",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3a3a3,
        @"name": @"BackgroundColorNeutral400",
        @"category": @"backgroundColor",
        @"type": @"neutral",
        @"item": @"400"
        },
      @"500": @{
        @"value": #737373,
        @"name": @"BackgroundColorNeutral500",
        @"category": @"backgroundColor",
        @"type": @"neutral",
        @"item": @"500"
        },
      @"600": @{
        @"value": #525252,
        @"name": @"BackgroundColorNeutral600",
        @"category": @"backgroundColor",
        @"type": @"neutral",
        @"item": @"600"
        },
      @"700": @{
        @"value": #404040,
        @"name": @"BackgroundColorNeutral700",
        @"category": @"backgroundColor",
        @"type": @"neutral",
        @"item": @"700"
        },
      @"800": @{
        @"value": #262626,
        @"name": @"BackgroundColorNeutral800",
        @"category": @"backgroundColor",
        @"type": @"neutral",
        @"item": @"800"
        },
      @"900": @{
        @"value": #171717,
        @"name": @"BackgroundColorNeutral900",
        @"category": @"backgroundColor",
        @"type": @"neutral",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0a0a0a,
        @"name": @"BackgroundColorNeutral950",
        @"category": @"backgroundColor",
        @"type": @"neutral",
        @"item": @"950"
        }
      },
    @"stone": @{
      @"50": @{
        @"value": #fafaf9,
        @"name": @"BackgroundColorStone50",
        @"category": @"backgroundColor",
        @"type": @"stone",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f4,
        @"name": @"BackgroundColorStone100",
        @"category": @"backgroundColor",
        @"type": @"stone",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e7e5e4,
        @"name": @"BackgroundColorStone200",
        @"category": @"backgroundColor",
        @"type": @"stone",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d6d3d1,
        @"name": @"BackgroundColorStone300",
        @"category": @"backgroundColor",
        @"type": @"stone",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a8a29e,
        @"name": @"BackgroundColorStone400",
        @"category": @"backgroundColor",
        @"type": @"stone",
        @"item": @"400"
        },
      @"500": @{
        @"value": #78716c,
        @"name": @"BackgroundColorStone500",
        @"category": @"backgroundColor",
        @"type": @"stone",
        @"item": @"500"
        },
      @"600": @{
        @"value": #57534e,
        @"name": @"BackgroundColorStone600",
        @"category": @"backgroundColor",
        @"type": @"stone",
        @"item": @"600"
        },
      @"700": @{
        @"value": #44403c,
        @"name": @"BackgroundColorStone700",
        @"category": @"backgroundColor",
        @"type": @"stone",
        @"item": @"700"
        },
      @"800": @{
        @"value": #292524,
        @"name": @"BackgroundColorStone800",
        @"category": @"backgroundColor",
        @"type": @"stone",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1c1917,
        @"name": @"BackgroundColorStone900",
        @"category": @"backgroundColor",
        @"type": @"stone",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0c0a09,
        @"name": @"BackgroundColorStone950",
        @"category": @"backgroundColor",
        @"type": @"stone",
        @"item": @"950"
        }
      },
    @"red": @{
      @"50": @{
        @"value": #fef2f2,
        @"name": @"BackgroundColorRed50",
        @"category": @"backgroundColor",
        @"type": @"red",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fee2e2,
        @"name": @"BackgroundColorRed100",
        @"category": @"backgroundColor",
        @"type": @"red",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecaca,
        @"name": @"BackgroundColorRed200",
        @"category": @"backgroundColor",
        @"type": @"red",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fca5a5,
        @"name": @"BackgroundColorRed300",
        @"category": @"backgroundColor",
        @"type": @"red",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f87171,
        @"name": @"BackgroundColorRed400",
        @"category": @"backgroundColor",
        @"type": @"red",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ef4444,
        @"name": @"BackgroundColorRed500",
        @"category": @"backgroundColor",
        @"type": @"red",
        @"item": @"500"
        },
      @"600": @{
        @"value": #dc2626,
        @"name": @"BackgroundColorRed600",
        @"category": @"backgroundColor",
        @"type": @"red",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b91c1c,
        @"name": @"BackgroundColorRed700",
        @"category": @"backgroundColor",
        @"type": @"red",
        @"item": @"700"
        },
      @"800": @{
        @"value": #991b1b,
        @"name": @"BackgroundColorRed800",
        @"category": @"backgroundColor",
        @"type": @"red",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7f1d1d,
        @"name": @"BackgroundColorRed900",
        @"category": @"backgroundColor",
        @"type": @"red",
        @"item": @"900"
        },
      @"950": @{
        @"value": #450a0a,
        @"name": @"BackgroundColorRed950",
        @"category": @"backgroundColor",
        @"type": @"red",
        @"item": @"950"
        }
      },
    @"orange": @{
      @"50": @{
        @"value": #fff7ed,
        @"name": @"BackgroundColorOrange50",
        @"category": @"backgroundColor",
        @"type": @"orange",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffedd5,
        @"name": @"BackgroundColorOrange100",
        @"category": @"backgroundColor",
        @"type": @"orange",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fed7aa,
        @"name": @"BackgroundColorOrange200",
        @"category": @"backgroundColor",
        @"type": @"orange",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fdba74,
        @"name": @"BackgroundColorOrange300",
        @"category": @"backgroundColor",
        @"type": @"orange",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb923c,
        @"name": @"BackgroundColorOrange400",
        @"category": @"backgroundColor",
        @"type": @"orange",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f97316,
        @"name": @"BackgroundColorOrange500",
        @"category": @"backgroundColor",
        @"type": @"orange",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ea580c,
        @"name": @"BackgroundColorOrange600",
        @"category": @"backgroundColor",
        @"type": @"orange",
        @"item": @"600"
        },
      @"700": @{
        @"value": #c2410c,
        @"name": @"BackgroundColorOrange700",
        @"category": @"backgroundColor",
        @"type": @"orange",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9a3412,
        @"name": @"BackgroundColorOrange800",
        @"category": @"backgroundColor",
        @"type": @"orange",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7c2d12,
        @"name": @"BackgroundColorOrange900",
        @"category": @"backgroundColor",
        @"type": @"orange",
        @"item": @"900"
        },
      @"950": @{
        @"value": #431407,
        @"name": @"BackgroundColorOrange950",
        @"category": @"backgroundColor",
        @"type": @"orange",
        @"item": @"950"
        }
      },
    @"amber": @{
      @"50": @{
        @"value": #fffbeb,
        @"name": @"BackgroundColorAmber50",
        @"category": @"backgroundColor",
        @"type": @"amber",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef3c7,
        @"name": @"BackgroundColorAmber100",
        @"category": @"backgroundColor",
        @"type": @"amber",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fde68a,
        @"name": @"BackgroundColorAmber200",
        @"category": @"backgroundColor",
        @"type": @"amber",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fcd34d,
        @"name": @"BackgroundColorAmber300",
        @"category": @"backgroundColor",
        @"type": @"amber",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fbbf24,
        @"name": @"BackgroundColorAmber400",
        @"category": @"backgroundColor",
        @"type": @"amber",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f59e0b,
        @"name": @"BackgroundColorAmber500",
        @"category": @"backgroundColor",
        @"type": @"amber",
        @"item": @"500"
        },
      @"600": @{
        @"value": #d97706,
        @"name": @"BackgroundColorAmber600",
        @"category": @"backgroundColor",
        @"type": @"amber",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b45309,
        @"name": @"BackgroundColorAmber700",
        @"category": @"backgroundColor",
        @"type": @"amber",
        @"item": @"700"
        },
      @"800": @{
        @"value": #92400e,
        @"name": @"BackgroundColorAmber800",
        @"category": @"backgroundColor",
        @"type": @"amber",
        @"item": @"800"
        },
      @"900": @{
        @"value": #78350f,
        @"name": @"BackgroundColorAmber900",
        @"category": @"backgroundColor",
        @"type": @"amber",
        @"item": @"900"
        },
      @"950": @{
        @"value": #451a03,
        @"name": @"BackgroundColorAmber950",
        @"category": @"backgroundColor",
        @"type": @"amber",
        @"item": @"950"
        }
      },
    @"yellow": @{
      @"50": @{
        @"value": #fefce8,
        @"name": @"BackgroundColorYellow50",
        @"category": @"backgroundColor",
        @"type": @"yellow",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef9c3,
        @"name": @"BackgroundColorYellow100",
        @"category": @"backgroundColor",
        @"type": @"yellow",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fef08a,
        @"name": @"BackgroundColorYellow200",
        @"category": @"backgroundColor",
        @"type": @"yellow",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fde047,
        @"name": @"BackgroundColorYellow300",
        @"category": @"backgroundColor",
        @"type": @"yellow",
        @"item": @"300"
        },
      @"400": @{
        @"value": #facc15,
        @"name": @"BackgroundColorYellow400",
        @"category": @"backgroundColor",
        @"type": @"yellow",
        @"item": @"400"
        },
      @"500": @{
        @"value": #eab308,
        @"name": @"BackgroundColorYellow500",
        @"category": @"backgroundColor",
        @"type": @"yellow",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ca8a04,
        @"name": @"BackgroundColorYellow600",
        @"category": @"backgroundColor",
        @"type": @"yellow",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a16207,
        @"name": @"BackgroundColorYellow700",
        @"category": @"backgroundColor",
        @"type": @"yellow",
        @"item": @"700"
        },
      @"800": @{
        @"value": #854d0e,
        @"name": @"BackgroundColorYellow800",
        @"category": @"backgroundColor",
        @"type": @"yellow",
        @"item": @"800"
        },
      @"900": @{
        @"value": #713f12,
        @"name": @"BackgroundColorYellow900",
        @"category": @"backgroundColor",
        @"type": @"yellow",
        @"item": @"900"
        },
      @"950": @{
        @"value": #422006,
        @"name": @"BackgroundColorYellow950",
        @"category": @"backgroundColor",
        @"type": @"yellow",
        @"item": @"950"
        }
      },
    @"lime": @{
      @"50": @{
        @"value": #f7fee7,
        @"name": @"BackgroundColorLime50",
        @"category": @"backgroundColor",
        @"type": @"lime",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ecfccb,
        @"name": @"BackgroundColorLime100",
        @"category": @"backgroundColor",
        @"type": @"lime",
        @"item": @"100"
        },
      @"200": @{
        @"value": #d9f99d,
        @"name": @"BackgroundColorLime200",
        @"category": @"backgroundColor",
        @"type": @"lime",
        @"item": @"200"
        },
      @"300": @{
        @"value": #bef264,
        @"name": @"BackgroundColorLime300",
        @"category": @"backgroundColor",
        @"type": @"lime",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3e635,
        @"name": @"BackgroundColorLime400",
        @"category": @"backgroundColor",
        @"type": @"lime",
        @"item": @"400"
        },
      @"500": @{
        @"value": #84cc16,
        @"name": @"BackgroundColorLime500",
        @"category": @"backgroundColor",
        @"type": @"lime",
        @"item": @"500"
        },
      @"600": @{
        @"value": #65a30d,
        @"name": @"BackgroundColorLime600",
        @"category": @"backgroundColor",
        @"type": @"lime",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4d7c0f,
        @"name": @"BackgroundColorLime700",
        @"category": @"backgroundColor",
        @"type": @"lime",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3f6212,
        @"name": @"BackgroundColorLime800",
        @"category": @"backgroundColor",
        @"type": @"lime",
        @"item": @"800"
        },
      @"900": @{
        @"value": #365314,
        @"name": @"BackgroundColorLime900",
        @"category": @"backgroundColor",
        @"type": @"lime",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1a2e05,
        @"name": @"BackgroundColorLime950",
        @"category": @"backgroundColor",
        @"type": @"lime",
        @"item": @"950"
        }
      },
    @"green": @{
      @"50": @{
        @"value": #f0fdf4,
        @"name": @"BackgroundColorGreen50",
        @"category": @"backgroundColor",
        @"type": @"green",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dcfce7,
        @"name": @"BackgroundColorGreen100",
        @"category": @"backgroundColor",
        @"type": @"green",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bbf7d0,
        @"name": @"BackgroundColorGreen200",
        @"category": @"backgroundColor",
        @"type": @"green",
        @"item": @"200"
        },
      @"300": @{
        @"value": #86efac,
        @"name": @"BackgroundColorGreen300",
        @"category": @"backgroundColor",
        @"type": @"green",
        @"item": @"300"
        },
      @"400": @{
        @"value": #4ade80,
        @"name": @"BackgroundColorGreen400",
        @"category": @"backgroundColor",
        @"type": @"green",
        @"item": @"400"
        },
      @"500": @{
        @"value": #22c55e,
        @"name": @"BackgroundColorGreen500",
        @"category": @"backgroundColor",
        @"type": @"green",
        @"item": @"500"
        },
      @"600": @{
        @"value": #16a34a,
        @"name": @"BackgroundColorGreen600",
        @"category": @"backgroundColor",
        @"type": @"green",
        @"item": @"600"
        },
      @"700": @{
        @"value": #15803d,
        @"name": @"BackgroundColorGreen700",
        @"category": @"backgroundColor",
        @"type": @"green",
        @"item": @"700"
        },
      @"800": @{
        @"value": #166534,
        @"name": @"BackgroundColorGreen800",
        @"category": @"backgroundColor",
        @"type": @"green",
        @"item": @"800"
        },
      @"900": @{
        @"value": #14532d,
        @"name": @"BackgroundColorGreen900",
        @"category": @"backgroundColor",
        @"type": @"green",
        @"item": @"900"
        },
      @"950": @{
        @"value": #052e16,
        @"name": @"BackgroundColorGreen950",
        @"category": @"backgroundColor",
        @"type": @"green",
        @"item": @"950"
        }
      },
    @"emerald": @{
      @"50": @{
        @"value": #ecfdf5,
        @"name": @"BackgroundColorEmerald50",
        @"category": @"backgroundColor",
        @"type": @"emerald",
        @"item": @"50"
        },
      @"100": @{
        @"value": #d1fae5,
        @"name": @"BackgroundColorEmerald100",
        @"category": @"backgroundColor",
        @"type": @"emerald",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a7f3d0,
        @"name": @"BackgroundColorEmerald200",
        @"category": @"backgroundColor",
        @"type": @"emerald",
        @"item": @"200"
        },
      @"300": @{
        @"value": #6ee7b7,
        @"name": @"BackgroundColorEmerald300",
        @"category": @"backgroundColor",
        @"type": @"emerald",
        @"item": @"300"
        },
      @"400": @{
        @"value": #34d399,
        @"name": @"BackgroundColorEmerald400",
        @"category": @"backgroundColor",
        @"type": @"emerald",
        @"item": @"400"
        },
      @"500": @{
        @"value": #10b981,
        @"name": @"BackgroundColorEmerald500",
        @"category": @"backgroundColor",
        @"type": @"emerald",
        @"item": @"500"
        },
      @"600": @{
        @"value": #059669,
        @"name": @"BackgroundColorEmerald600",
        @"category": @"backgroundColor",
        @"type": @"emerald",
        @"item": @"600"
        },
      @"700": @{
        @"value": #047857,
        @"name": @"BackgroundColorEmerald700",
        @"category": @"backgroundColor",
        @"type": @"emerald",
        @"item": @"700"
        },
      @"800": @{
        @"value": #065f46,
        @"name": @"BackgroundColorEmerald800",
        @"category": @"backgroundColor",
        @"type": @"emerald",
        @"item": @"800"
        },
      @"900": @{
        @"value": #064e3b,
        @"name": @"BackgroundColorEmerald900",
        @"category": @"backgroundColor",
        @"type": @"emerald",
        @"item": @"900"
        },
      @"950": @{
        @"value": #022c22,
        @"name": @"BackgroundColorEmerald950",
        @"category": @"backgroundColor",
        @"type": @"emerald",
        @"item": @"950"
        }
      },
    @"teal": @{
      @"50": @{
        @"value": #f0fdfa,
        @"name": @"BackgroundColorTeal50",
        @"category": @"backgroundColor",
        @"type": @"teal",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ccfbf1,
        @"name": @"BackgroundColorTeal100",
        @"category": @"backgroundColor",
        @"type": @"teal",
        @"item": @"100"
        },
      @"200": @{
        @"value": #99f6e4,
        @"name": @"BackgroundColorTeal200",
        @"category": @"backgroundColor",
        @"type": @"teal",
        @"item": @"200"
        },
      @"300": @{
        @"value": #5eead4,
        @"name": @"BackgroundColorTeal300",
        @"category": @"backgroundColor",
        @"type": @"teal",
        @"item": @"300"
        },
      @"400": @{
        @"value": #2dd4bf,
        @"name": @"BackgroundColorTeal400",
        @"category": @"backgroundColor",
        @"type": @"teal",
        @"item": @"400"
        },
      @"500": @{
        @"value": #14b8a6,
        @"name": @"BackgroundColorTeal500",
        @"category": @"backgroundColor",
        @"type": @"teal",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0d9488,
        @"name": @"BackgroundColorTeal600",
        @"category": @"backgroundColor",
        @"type": @"teal",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0f766e,
        @"name": @"BackgroundColorTeal700",
        @"category": @"backgroundColor",
        @"type": @"teal",
        @"item": @"700"
        },
      @"800": @{
        @"value": #115e59,
        @"name": @"BackgroundColorTeal800",
        @"category": @"backgroundColor",
        @"type": @"teal",
        @"item": @"800"
        },
      @"900": @{
        @"value": #134e4a,
        @"name": @"BackgroundColorTeal900",
        @"category": @"backgroundColor",
        @"type": @"teal",
        @"item": @"900"
        },
      @"950": @{
        @"value": #042f2e,
        @"name": @"BackgroundColorTeal950",
        @"category": @"backgroundColor",
        @"type": @"teal",
        @"item": @"950"
        }
      },
    @"cyan": @{
      @"50": @{
        @"value": #ecfeff,
        @"name": @"BackgroundColorCyan50",
        @"category": @"backgroundColor",
        @"type": @"cyan",
        @"item": @"50"
        },
      @"100": @{
        @"value": #cffafe,
        @"name": @"BackgroundColorCyan100",
        @"category": @"backgroundColor",
        @"type": @"cyan",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a5f3fc,
        @"name": @"BackgroundColorCyan200",
        @"category": @"backgroundColor",
        @"type": @"cyan",
        @"item": @"200"
        },
      @"300": @{
        @"value": #67e8f9,
        @"name": @"BackgroundColorCyan300",
        @"category": @"backgroundColor",
        @"type": @"cyan",
        @"item": @"300"
        },
      @"400": @{
        @"value": #22d3ee,
        @"name": @"BackgroundColorCyan400",
        @"category": @"backgroundColor",
        @"type": @"cyan",
        @"item": @"400"
        },
      @"500": @{
        @"value": #06b6d4,
        @"name": @"BackgroundColorCyan500",
        @"category": @"backgroundColor",
        @"type": @"cyan",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0891b2,
        @"name": @"BackgroundColorCyan600",
        @"category": @"backgroundColor",
        @"type": @"cyan",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0e7490,
        @"name": @"BackgroundColorCyan700",
        @"category": @"backgroundColor",
        @"type": @"cyan",
        @"item": @"700"
        },
      @"800": @{
        @"value": #155e75,
        @"name": @"BackgroundColorCyan800",
        @"category": @"backgroundColor",
        @"type": @"cyan",
        @"item": @"800"
        },
      @"900": @{
        @"value": #164e63,
        @"name": @"BackgroundColorCyan900",
        @"category": @"backgroundColor",
        @"type": @"cyan",
        @"item": @"900"
        },
      @"950": @{
        @"value": #083344,
        @"name": @"BackgroundColorCyan950",
        @"category": @"backgroundColor",
        @"type": @"cyan",
        @"item": @"950"
        }
      },
    @"sky": @{
      @"50": @{
        @"value": #f0f9ff,
        @"name": @"BackgroundColorSky50",
        @"category": @"backgroundColor",
        @"type": @"sky",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0f2fe,
        @"name": @"BackgroundColorSky100",
        @"category": @"backgroundColor",
        @"type": @"sky",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bae6fd,
        @"name": @"BackgroundColorSky200",
        @"category": @"backgroundColor",
        @"type": @"sky",
        @"item": @"200"
        },
      @"300": @{
        @"value": #7dd3fc,
        @"name": @"BackgroundColorSky300",
        @"category": @"backgroundColor",
        @"type": @"sky",
        @"item": @"300"
        },
      @"400": @{
        @"value": #38bdf8,
        @"name": @"BackgroundColorSky400",
        @"category": @"backgroundColor",
        @"type": @"sky",
        @"item": @"400"
        },
      @"500": @{
        @"value": #0ea5e9,
        @"name": @"BackgroundColorSky500",
        @"category": @"backgroundColor",
        @"type": @"sky",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0284c7,
        @"name": @"BackgroundColorSky600",
        @"category": @"backgroundColor",
        @"type": @"sky",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0369a1,
        @"name": @"BackgroundColorSky700",
        @"category": @"backgroundColor",
        @"type": @"sky",
        @"item": @"700"
        },
      @"800": @{
        @"value": #075985,
        @"name": @"BackgroundColorSky800",
        @"category": @"backgroundColor",
        @"type": @"sky",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0c4a6e,
        @"name": @"BackgroundColorSky900",
        @"category": @"backgroundColor",
        @"type": @"sky",
        @"item": @"900"
        },
      @"950": @{
        @"value": #082f49,
        @"name": @"BackgroundColorSky950",
        @"category": @"backgroundColor",
        @"type": @"sky",
        @"item": @"950"
        }
      },
    @"blue": @{
      @"50": @{
        @"value": #eff6ff,
        @"name": @"BackgroundColorBlue50",
        @"category": @"backgroundColor",
        @"type": @"blue",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dbeafe,
        @"name": @"BackgroundColorBlue100",
        @"category": @"backgroundColor",
        @"type": @"blue",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bfdbfe,
        @"name": @"BackgroundColorBlue200",
        @"category": @"backgroundColor",
        @"type": @"blue",
        @"item": @"200"
        },
      @"300": @{
        @"value": #93c5fd,
        @"name": @"BackgroundColorBlue300",
        @"category": @"backgroundColor",
        @"type": @"blue",
        @"item": @"300"
        },
      @"400": @{
        @"value": #60a5fa,
        @"name": @"BackgroundColorBlue400",
        @"category": @"backgroundColor",
        @"type": @"blue",
        @"item": @"400"
        },
      @"500": @{
        @"value": #3b82f6,
        @"name": @"BackgroundColorBlue500",
        @"category": @"backgroundColor",
        @"type": @"blue",
        @"item": @"500"
        },
      @"600": @{
        @"value": #2563eb,
        @"name": @"BackgroundColorBlue600",
        @"category": @"backgroundColor",
        @"type": @"blue",
        @"item": @"600"
        },
      @"700": @{
        @"value": #1d4ed8,
        @"name": @"BackgroundColorBlue700",
        @"category": @"backgroundColor",
        @"type": @"blue",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e40af,
        @"name": @"BackgroundColorBlue800",
        @"category": @"backgroundColor",
        @"type": @"blue",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1e3a8a,
        @"name": @"BackgroundColorBlue900",
        @"category": @"backgroundColor",
        @"type": @"blue",
        @"item": @"900"
        },
      @"950": @{
        @"value": #172554,
        @"name": @"BackgroundColorBlue950",
        @"category": @"backgroundColor",
        @"type": @"blue",
        @"item": @"950"
        }
      },
    @"indigo": @{
      @"50": @{
        @"value": #eef2ff,
        @"name": @"BackgroundColorIndigo50",
        @"category": @"backgroundColor",
        @"type": @"indigo",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0e7ff,
        @"name": @"BackgroundColorIndigo100",
        @"category": @"backgroundColor",
        @"type": @"indigo",
        @"item": @"100"
        },
      @"200": @{
        @"value": #c7d2fe,
        @"name": @"BackgroundColorIndigo200",
        @"category": @"backgroundColor",
        @"type": @"indigo",
        @"item": @"200"
        },
      @"300": @{
        @"value": #a5b4fc,
        @"name": @"BackgroundColorIndigo300",
        @"category": @"backgroundColor",
        @"type": @"indigo",
        @"item": @"300"
        },
      @"400": @{
        @"value": #818cf8,
        @"name": @"BackgroundColorIndigo400",
        @"category": @"backgroundColor",
        @"type": @"indigo",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6366f1,
        @"name": @"BackgroundColorIndigo500",
        @"category": @"backgroundColor",
        @"type": @"indigo",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4f46e5,
        @"name": @"BackgroundColorIndigo600",
        @"category": @"backgroundColor",
        @"type": @"indigo",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4338ca,
        @"name": @"BackgroundColorIndigo700",
        @"category": @"backgroundColor",
        @"type": @"indigo",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3730a3,
        @"name": @"BackgroundColorIndigo800",
        @"category": @"backgroundColor",
        @"type": @"indigo",
        @"item": @"800"
        },
      @"900": @{
        @"value": #312e81,
        @"name": @"BackgroundColorIndigo900",
        @"category": @"backgroundColor",
        @"type": @"indigo",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1e1b4b,
        @"name": @"BackgroundColorIndigo950",
        @"category": @"backgroundColor",
        @"type": @"indigo",
        @"item": @"950"
        }
      },
    @"violet": @{
      @"50": @{
        @"value": #f5f3ff,
        @"name": @"BackgroundColorViolet50",
        @"category": @"backgroundColor",
        @"type": @"violet",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ede9fe,
        @"name": @"BackgroundColorViolet100",
        @"category": @"backgroundColor",
        @"type": @"violet",
        @"item": @"100"
        },
      @"200": @{
        @"value": #ddd6fe,
        @"name": @"BackgroundColorViolet200",
        @"category": @"backgroundColor",
        @"type": @"violet",
        @"item": @"200"
        },
      @"300": @{
        @"value": #c4b5fd,
        @"name": @"BackgroundColorViolet300",
        @"category": @"backgroundColor",
        @"type": @"violet",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a78bfa,
        @"name": @"BackgroundColorViolet400",
        @"category": @"backgroundColor",
        @"type": @"violet",
        @"item": @"400"
        },
      @"500": @{
        @"value": #8b5cf6,
        @"name": @"BackgroundColorViolet500",
        @"category": @"backgroundColor",
        @"type": @"violet",
        @"item": @"500"
        },
      @"600": @{
        @"value": #7c3aed,
        @"name": @"BackgroundColorViolet600",
        @"category": @"backgroundColor",
        @"type": @"violet",
        @"item": @"600"
        },
      @"700": @{
        @"value": #6d28d9,
        @"name": @"BackgroundColorViolet700",
        @"category": @"backgroundColor",
        @"type": @"violet",
        @"item": @"700"
        },
      @"800": @{
        @"value": #5b21b6,
        @"name": @"BackgroundColorViolet800",
        @"category": @"backgroundColor",
        @"type": @"violet",
        @"item": @"800"
        },
      @"900": @{
        @"value": #4c1d95,
        @"name": @"BackgroundColorViolet900",
        @"category": @"backgroundColor",
        @"type": @"violet",
        @"item": @"900"
        },
      @"950": @{
        @"value": #2e1065,
        @"name": @"BackgroundColorViolet950",
        @"category": @"backgroundColor",
        @"type": @"violet",
        @"item": @"950"
        }
      },
    @"purple": @{
      @"50": @{
        @"value": #faf5ff,
        @"name": @"BackgroundColorPurple50",
        @"category": @"backgroundColor",
        @"type": @"purple",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3e8ff,
        @"name": @"BackgroundColorPurple100",
        @"category": @"backgroundColor",
        @"type": @"purple",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e9d5ff,
        @"name": @"BackgroundColorPurple200",
        @"category": @"backgroundColor",
        @"type": @"purple",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d8b4fe,
        @"name": @"BackgroundColorPurple300",
        @"category": @"backgroundColor",
        @"type": @"purple",
        @"item": @"300"
        },
      @"400": @{
        @"value": #c084fc,
        @"name": @"BackgroundColorPurple400",
        @"category": @"backgroundColor",
        @"type": @"purple",
        @"item": @"400"
        },
      @"500": @{
        @"value": #a855f7,
        @"name": @"BackgroundColorPurple500",
        @"category": @"backgroundColor",
        @"type": @"purple",
        @"item": @"500"
        },
      @"600": @{
        @"value": #9333ea,
        @"name": @"BackgroundColorPurple600",
        @"category": @"backgroundColor",
        @"type": @"purple",
        @"item": @"600"
        },
      @"700": @{
        @"value": #7e22ce,
        @"name": @"BackgroundColorPurple700",
        @"category": @"backgroundColor",
        @"type": @"purple",
        @"item": @"700"
        },
      @"800": @{
        @"value": #6b21a8,
        @"name": @"BackgroundColorPurple800",
        @"category": @"backgroundColor",
        @"type": @"purple",
        @"item": @"800"
        },
      @"900": @{
        @"value": #581c87,
        @"name": @"BackgroundColorPurple900",
        @"category": @"backgroundColor",
        @"type": @"purple",
        @"item": @"900"
        },
      @"950": @{
        @"value": #3b0764,
        @"name": @"BackgroundColorPurple950",
        @"category": @"backgroundColor",
        @"type": @"purple",
        @"item": @"950"
        }
      },
    @"fuchsia": @{
      @"50": @{
        @"value": #fdf4ff,
        @"name": @"BackgroundColorFuchsia50",
        @"category": @"backgroundColor",
        @"type": @"fuchsia",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fae8ff,
        @"name": @"BackgroundColorFuchsia100",
        @"category": @"backgroundColor",
        @"type": @"fuchsia",
        @"item": @"100"
        },
      @"200": @{
        @"value": #f5d0fe,
        @"name": @"BackgroundColorFuchsia200",
        @"category": @"backgroundColor",
        @"type": @"fuchsia",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f0abfc,
        @"name": @"BackgroundColorFuchsia300",
        @"category": @"backgroundColor",
        @"type": @"fuchsia",
        @"item": @"300"
        },
      @"400": @{
        @"value": #e879f9,
        @"name": @"BackgroundColorFuchsia400",
        @"category": @"backgroundColor",
        @"type": @"fuchsia",
        @"item": @"400"
        },
      @"500": @{
        @"value": #d946ef,
        @"name": @"BackgroundColorFuchsia500",
        @"category": @"backgroundColor",
        @"type": @"fuchsia",
        @"item": @"500"
        },
      @"600": @{
        @"value": #c026d3,
        @"name": @"BackgroundColorFuchsia600",
        @"category": @"backgroundColor",
        @"type": @"fuchsia",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a21caf,
        @"name": @"BackgroundColorFuchsia700",
        @"category": @"backgroundColor",
        @"type": @"fuchsia",
        @"item": @"700"
        },
      @"800": @{
        @"value": #86198f,
        @"name": @"BackgroundColorFuchsia800",
        @"category": @"backgroundColor",
        @"type": @"fuchsia",
        @"item": @"800"
        },
      @"900": @{
        @"value": #701a75,
        @"name": @"BackgroundColorFuchsia900",
        @"category": @"backgroundColor",
        @"type": @"fuchsia",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4a044e,
        @"name": @"BackgroundColorFuchsia950",
        @"category": @"backgroundColor",
        @"type": @"fuchsia",
        @"item": @"950"
        }
      },
    @"pink": @{
      @"50": @{
        @"value": #fdf2f8,
        @"name": @"BackgroundColorPink50",
        @"category": @"backgroundColor",
        @"type": @"pink",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fce7f3,
        @"name": @"BackgroundColorPink100",
        @"category": @"backgroundColor",
        @"type": @"pink",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fbcfe8,
        @"name": @"BackgroundColorPink200",
        @"category": @"backgroundColor",
        @"type": @"pink",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f9a8d4,
        @"name": @"BackgroundColorPink300",
        @"category": @"backgroundColor",
        @"type": @"pink",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f472b6,
        @"name": @"BackgroundColorPink400",
        @"category": @"backgroundColor",
        @"type": @"pink",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ec4899,
        @"name": @"BackgroundColorPink500",
        @"category": @"backgroundColor",
        @"type": @"pink",
        @"item": @"500"
        },
      @"600": @{
        @"value": #db2777,
        @"name": @"BackgroundColorPink600",
        @"category": @"backgroundColor",
        @"type": @"pink",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be185d,
        @"name": @"BackgroundColorPink700",
        @"category": @"backgroundColor",
        @"type": @"pink",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9d174d,
        @"name": @"BackgroundColorPink800",
        @"category": @"backgroundColor",
        @"type": @"pink",
        @"item": @"800"
        },
      @"900": @{
        @"value": #831843,
        @"name": @"BackgroundColorPink900",
        @"category": @"backgroundColor",
        @"type": @"pink",
        @"item": @"900"
        },
      @"950": @{
        @"value": #500724,
        @"name": @"BackgroundColorPink950",
        @"category": @"backgroundColor",
        @"type": @"pink",
        @"item": @"950"
        }
      },
    @"rose": @{
      @"50": @{
        @"value": #fff1f2,
        @"name": @"BackgroundColorRose50",
        @"category": @"backgroundColor",
        @"type": @"rose",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffe4e6,
        @"name": @"BackgroundColorRose100",
        @"category": @"backgroundColor",
        @"type": @"rose",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecdd3,
        @"name": @"BackgroundColorRose200",
        @"category": @"backgroundColor",
        @"type": @"rose",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fda4af,
        @"name": @"BackgroundColorRose300",
        @"category": @"backgroundColor",
        @"type": @"rose",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb7185,
        @"name": @"BackgroundColorRose400",
        @"category": @"backgroundColor",
        @"type": @"rose",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f43f5e,
        @"name": @"BackgroundColorRose500",
        @"category": @"backgroundColor",
        @"type": @"rose",
        @"item": @"500"
        },
      @"600": @{
        @"value": #e11d48,
        @"name": @"BackgroundColorRose600",
        @"category": @"backgroundColor",
        @"type": @"rose",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be123c,
        @"name": @"BackgroundColorRose700",
        @"category": @"backgroundColor",
        @"type": @"rose",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9f1239,
        @"name": @"BackgroundColorRose800",
        @"category": @"backgroundColor",
        @"type": @"rose",
        @"item": @"800"
        },
      @"900": @{
        @"value": #881337,
        @"name": @"BackgroundColorRose900",
        @"category": @"backgroundColor",
        @"type": @"rose",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4c0519,
        @"name": @"BackgroundColorRose950",
        @"category": @"backgroundColor",
        @"type": @"rose",
        @"item": @"950"
        }
      }
    },
  @"backgroundImage": @{
    @"none": @{
      @"value": none,
      @"name": @"BackgroundImageNone",
      @"category": @"backgroundImage",
      @"type": @"none"
      },
    @"gradient-to-t": @{
      @"value": linear-gradient(to top, var(--tw-gradient-stops)),
      @"name": @"BackgroundImageGradientToT",
      @"category": @"backgroundImage",
      @"type": @"gradient-to-t"
      },
    @"gradient-to-tr": @{
      @"value": linear-gradient(to top right, var(--tw-gradient-stops)),
      @"name": @"BackgroundImageGradientToTr",
      @"category": @"backgroundImage",
      @"type": @"gradient-to-tr"
      },
    @"gradient-to-r": @{
      @"value": linear-gradient(to right, var(--tw-gradient-stops)),
      @"name": @"BackgroundImageGradientToR",
      @"category": @"backgroundImage",
      @"type": @"gradient-to-r"
      },
    @"gradient-to-br": @{
      @"value": linear-gradient(to bottom right, var(--tw-gradient-stops)),
      @"name": @"BackgroundImageGradientToBr",
      @"category": @"backgroundImage",
      @"type": @"gradient-to-br"
      },
    @"gradient-to-b": @{
      @"value": linear-gradient(to bottom, var(--tw-gradient-stops)),
      @"name": @"BackgroundImageGradientToB",
      @"category": @"backgroundImage",
      @"type": @"gradient-to-b"
      },
    @"gradient-to-bl": @{
      @"value": linear-gradient(to bottom left, var(--tw-gradient-stops)),
      @"name": @"BackgroundImageGradientToBl",
      @"category": @"backgroundImage",
      @"type": @"gradient-to-bl"
      },
    @"gradient-to-l": @{
      @"value": linear-gradient(to left, var(--tw-gradient-stops)),
      @"name": @"BackgroundImageGradientToL",
      @"category": @"backgroundImage",
      @"type": @"gradient-to-l"
      },
    @"gradient-to-tl": @{
      @"value": linear-gradient(to top left, var(--tw-gradient-stops)),
      @"name": @"BackgroundImageGradientToTl",
      @"category": @"backgroundImage",
      @"type": @"gradient-to-tl"
      }
    },
  @"backgroundOpacity": @{
    @"0": @{
      @"value": 0,
      @"name": @"BackgroundOpacity0",
      @"category": @"backgroundOpacity",
      @"type": @"0"
      },
    @"5": @{
      @"value": 0.05,
      @"name": @"BackgroundOpacity5",
      @"category": @"backgroundOpacity",
      @"type": @"5"
      },
    @"10": @{
      @"value": 0.1,
      @"name": @"BackgroundOpacity10",
      @"category": @"backgroundOpacity",
      @"type": @"10"
      },
    @"15": @{
      @"value": 0.15,
      @"name": @"BackgroundOpacity15",
      @"category": @"backgroundOpacity",
      @"type": @"15"
      },
    @"20": @{
      @"value": 0.2,
      @"name": @"BackgroundOpacity20",
      @"category": @"backgroundOpacity",
      @"type": @"20"
      },
    @"25": @{
      @"value": 0.25,
      @"name": @"BackgroundOpacity25",
      @"category": @"backgroundOpacity",
      @"type": @"25"
      },
    @"30": @{
      @"value": 0.3,
      @"name": @"BackgroundOpacity30",
      @"category": @"backgroundOpacity",
      @"type": @"30"
      },
    @"35": @{
      @"value": 0.35,
      @"name": @"BackgroundOpacity35",
      @"category": @"backgroundOpacity",
      @"type": @"35"
      },
    @"40": @{
      @"value": 0.4,
      @"name": @"BackgroundOpacity40",
      @"category": @"backgroundOpacity",
      @"type": @"40"
      },
    @"45": @{
      @"value": 0.45,
      @"name": @"BackgroundOpacity45",
      @"category": @"backgroundOpacity",
      @"type": @"45"
      },
    @"50": @{
      @"value": 0.5,
      @"name": @"BackgroundOpacity50",
      @"category": @"backgroundOpacity",
      @"type": @"50"
      },
    @"55": @{
      @"value": 0.55,
      @"name": @"BackgroundOpacity55",
      @"category": @"backgroundOpacity",
      @"type": @"55"
      },
    @"60": @{
      @"value": 0.6,
      @"name": @"BackgroundOpacity60",
      @"category": @"backgroundOpacity",
      @"type": @"60"
      },
    @"65": @{
      @"value": 0.65,
      @"name": @"BackgroundOpacity65",
      @"category": @"backgroundOpacity",
      @"type": @"65"
      },
    @"70": @{
      @"value": 0.7,
      @"name": @"BackgroundOpacity70",
      @"category": @"backgroundOpacity",
      @"type": @"70"
      },
    @"75": @{
      @"value": 0.75,
      @"name": @"BackgroundOpacity75",
      @"category": @"backgroundOpacity",
      @"type": @"75"
      },
    @"80": @{
      @"value": 0.8,
      @"name": @"BackgroundOpacity80",
      @"category": @"backgroundOpacity",
      @"type": @"80"
      },
    @"85": @{
      @"value": 0.85,
      @"name": @"BackgroundOpacity85",
      @"category": @"backgroundOpacity",
      @"type": @"85"
      },
    @"90": @{
      @"value": 0.9,
      @"name": @"BackgroundOpacity90",
      @"category": @"backgroundOpacity",
      @"type": @"90"
      },
    @"95": @{
      @"value": 0.95,
      @"name": @"BackgroundOpacity95",
      @"category": @"backgroundOpacity",
      @"type": @"95"
      },
    @"100": @{
      @"value": 1,
      @"name": @"BackgroundOpacity100",
      @"category": @"backgroundOpacity",
      @"type": @"100"
      }
    },
  @"backgroundPosition": @{
    @"bottom": @{
      @"value": bottom,
      @"name": @"BackgroundPositionBottom",
      @"category": @"backgroundPosition",
      @"type": @"bottom"
      },
    @"center": @{
      @"value": center,
      @"name": @"BackgroundPositionCenter",
      @"category": @"backgroundPosition",
      @"type": @"center"
      },
    @"left": @{
      @"value": left,
      @"name": @"BackgroundPositionLeft",
      @"category": @"backgroundPosition",
      @"type": @"left"
      },
    @"left-bottom": @{
      @"value": left bottom,
      @"name": @"BackgroundPositionLeftBottom",
      @"category": @"backgroundPosition",
      @"type": @"left-bottom"
      },
    @"left-top": @{
      @"value": left top,
      @"name": @"BackgroundPositionLeftTop",
      @"category": @"backgroundPosition",
      @"type": @"left-top"
      },
    @"right": @{
      @"value": right,
      @"name": @"BackgroundPositionRight",
      @"category": @"backgroundPosition",
      @"type": @"right"
      },
    @"right-bottom": @{
      @"value": right bottom,
      @"name": @"BackgroundPositionRightBottom",
      @"category": @"backgroundPosition",
      @"type": @"right-bottom"
      },
    @"right-top": @{
      @"value": right top,
      @"name": @"BackgroundPositionRightTop",
      @"category": @"backgroundPosition",
      @"type": @"right-top"
      },
    @"top": @{
      @"value": top,
      @"name": @"BackgroundPositionTop",
      @"category": @"backgroundPosition",
      @"type": @"top"
      }
    },
  @"backgroundSize": @{
    @"auto": @{
      @"value": auto,
      @"name": @"BackgroundSizeAuto",
      @"category": @"backgroundSize",
      @"type": @"auto"
      },
    @"cover": @{
      @"value": cover,
      @"name": @"BackgroundSizeCover",
      @"category": @"backgroundSize",
      @"type": @"cover"
      },
    @"contain": @{
      @"value": contain,
      @"name": @"BackgroundSizeContain",
      @"category": @"backgroundSize",
      @"type": @"contain"
      }
    },
  @"blur": @{
    @"0": @{
      @"value": 0,
      @"name": @"Blur0",
      @"category": @"blur",
      @"type": @"0"
      },
    @"none": @{
      @"value": ,
      @"name": @"BlurNone",
      @"category": @"blur",
      @"type": @"none"
      },
    @"sm": @{
      @"value": 4px,
      @"name": @"BlurSm",
      @"category": @"blur",
      @"type": @"sm"
      },
    @"DEFAULT": @{
      @"value": 8px,
      @"name": @"BlurDefault",
      @"category": @"blur",
      @"type": @"DEFAULT"
      },
    @"md": @{
      @"value": 12px,
      @"name": @"BlurMd",
      @"category": @"blur",
      @"type": @"md"
      },
    @"lg": @{
      @"value": 16px,
      @"name": @"BlurLg",
      @"category": @"blur",
      @"type": @"lg"
      },
    @"xl": @{
      @"value": 24px,
      @"name": @"BlurXl",
      @"category": @"blur",
      @"type": @"xl"
      },
    @"2xl": @{
      @"value": 40px,
      @"name": @"Blur2xl",
      @"category": @"blur",
      @"type": @"2xl"
      },
    @"3xl": @{
      @"value": 64px,
      @"name": @"Blur3xl",
      @"category": @"blur",
      @"type": @"3xl"
      }
    },
  @"borderColor": @{
    @"inherit": @{
      @"value": inherit,
      @"name": @"BorderColorInherit",
      @"category": @"borderColor",
      @"type": @"inherit"
      },
    @"current": @{
      @"value": currentColor,
      @"name": @"BorderColorCurrent",
      @"category": @"borderColor",
      @"type": @"current"
      },
    @"transparent": @{
      @"value": transparent,
      @"name": @"BorderColorTransparent",
      @"category": @"borderColor",
      @"type": @"transparent"
      },
    @"black": @{
      @"value": #000,
      @"name": @"BorderColorBlack",
      @"category": @"borderColor",
      @"type": @"black"
      },
    @"white": @{
      @"value": #fff,
      @"name": @"BorderColorWhite",
      @"category": @"borderColor",
      @"type": @"white"
      },
    @"slate": @{
      @"50": @{
        @"value": #f8fafc,
        @"name": @"BorderColorSlate50",
        @"category": @"borderColor",
        @"type": @"slate",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f1f5f9,
        @"name": @"BorderColorSlate100",
        @"category": @"borderColor",
        @"type": @"slate",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e2e8f0,
        @"name": @"BorderColorSlate200",
        @"category": @"borderColor",
        @"type": @"slate",
        @"item": @"200"
        },
      @"300": @{
        @"value": #cbd5e1,
        @"name": @"BorderColorSlate300",
        @"category": @"borderColor",
        @"type": @"slate",
        @"item": @"300"
        },
      @"400": @{
        @"value": #94a3b8,
        @"name": @"BorderColorSlate400",
        @"category": @"borderColor",
        @"type": @"slate",
        @"item": @"400"
        },
      @"500": @{
        @"value": #64748b,
        @"name": @"BorderColorSlate500",
        @"category": @"borderColor",
        @"type": @"slate",
        @"item": @"500"
        },
      @"600": @{
        @"value": #475569,
        @"name": @"BorderColorSlate600",
        @"category": @"borderColor",
        @"type": @"slate",
        @"item": @"600"
        },
      @"700": @{
        @"value": #334155,
        @"name": @"BorderColorSlate700",
        @"category": @"borderColor",
        @"type": @"slate",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e293b,
        @"name": @"BorderColorSlate800",
        @"category": @"borderColor",
        @"type": @"slate",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0f172a,
        @"name": @"BorderColorSlate900",
        @"category": @"borderColor",
        @"type": @"slate",
        @"item": @"900"
        },
      @"950": @{
        @"value": #020617,
        @"name": @"BorderColorSlate950",
        @"category": @"borderColor",
        @"type": @"slate",
        @"item": @"950"
        }
      },
    @"gray": @{
      @"50": @{
        @"value": #f9fafb,
        @"name": @"BorderColorGray50",
        @"category": @"borderColor",
        @"type": @"gray",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3f4f6,
        @"name": @"BorderColorGray100",
        @"category": @"borderColor",
        @"type": @"gray",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e7eb,
        @"name": @"BorderColorGray200",
        @"category": @"borderColor",
        @"type": @"gray",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d1d5db,
        @"name": @"BorderColorGray300",
        @"category": @"borderColor",
        @"type": @"gray",
        @"item": @"300"
        },
      @"400": @{
        @"value": #9ca3af,
        @"name": @"BorderColorGray400",
        @"category": @"borderColor",
        @"type": @"gray",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6b7280,
        @"name": @"BorderColorGray500",
        @"category": @"borderColor",
        @"type": @"gray",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4b5563,
        @"name": @"BorderColorGray600",
        @"category": @"borderColor",
        @"type": @"gray",
        @"item": @"600"
        },
      @"700": @{
        @"value": #374151,
        @"name": @"BorderColorGray700",
        @"category": @"borderColor",
        @"type": @"gray",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1f2937,
        @"name": @"BorderColorGray800",
        @"category": @"borderColor",
        @"type": @"gray",
        @"item": @"800"
        },
      @"900": @{
        @"value": #111827,
        @"name": @"BorderColorGray900",
        @"category": @"borderColor",
        @"type": @"gray",
        @"item": @"900"
        },
      @"950": @{
        @"value": #030712,
        @"name": @"BorderColorGray950",
        @"category": @"borderColor",
        @"type": @"gray",
        @"item": @"950"
        }
      },
    @"zinc": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"BorderColorZinc50",
        @"category": @"borderColor",
        @"type": @"zinc",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f4f4f5,
        @"name": @"BorderColorZinc100",
        @"category": @"borderColor",
        @"type": @"zinc",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e4e4e7,
        @"name": @"BorderColorZinc200",
        @"category": @"borderColor",
        @"type": @"zinc",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d8,
        @"name": @"BorderColorZinc300",
        @"category": @"borderColor",
        @"type": @"zinc",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a1a1aa,
        @"name": @"BorderColorZinc400",
        @"category": @"borderColor",
        @"type": @"zinc",
        @"item": @"400"
        },
      @"500": @{
        @"value": #71717a,
        @"name": @"BorderColorZinc500",
        @"category": @"borderColor",
        @"type": @"zinc",
        @"item": @"500"
        },
      @"600": @{
        @"value": #52525b,
        @"name": @"BorderColorZinc600",
        @"category": @"borderColor",
        @"type": @"zinc",
        @"item": @"600"
        },
      @"700": @{
        @"value": #3f3f46,
        @"name": @"BorderColorZinc700",
        @"category": @"borderColor",
        @"type": @"zinc",
        @"item": @"700"
        },
      @"800": @{
        @"value": #27272a,
        @"name": @"BorderColorZinc800",
        @"category": @"borderColor",
        @"type": @"zinc",
        @"item": @"800"
        },
      @"900": @{
        @"value": #18181b,
        @"name": @"BorderColorZinc900",
        @"category": @"borderColor",
        @"type": @"zinc",
        @"item": @"900"
        },
      @"950": @{
        @"value": #09090b,
        @"name": @"BorderColorZinc950",
        @"category": @"borderColor",
        @"type": @"zinc",
        @"item": @"950"
        }
      },
    @"neutral": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"BorderColorNeutral50",
        @"category": @"borderColor",
        @"type": @"neutral",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f5,
        @"name": @"BorderColorNeutral100",
        @"category": @"borderColor",
        @"type": @"neutral",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e5e5,
        @"name": @"BorderColorNeutral200",
        @"category": @"borderColor",
        @"type": @"neutral",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d4,
        @"name": @"BorderColorNeutral300",
        @"category": @"borderColor",
        @"type": @"neutral",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3a3a3,
        @"name": @"BorderColorNeutral400",
        @"category": @"borderColor",
        @"type": @"neutral",
        @"item": @"400"
        },
      @"500": @{
        @"value": #737373,
        @"name": @"BorderColorNeutral500",
        @"category": @"borderColor",
        @"type": @"neutral",
        @"item": @"500"
        },
      @"600": @{
        @"value": #525252,
        @"name": @"BorderColorNeutral600",
        @"category": @"borderColor",
        @"type": @"neutral",
        @"item": @"600"
        },
      @"700": @{
        @"value": #404040,
        @"name": @"BorderColorNeutral700",
        @"category": @"borderColor",
        @"type": @"neutral",
        @"item": @"700"
        },
      @"800": @{
        @"value": #262626,
        @"name": @"BorderColorNeutral800",
        @"category": @"borderColor",
        @"type": @"neutral",
        @"item": @"800"
        },
      @"900": @{
        @"value": #171717,
        @"name": @"BorderColorNeutral900",
        @"category": @"borderColor",
        @"type": @"neutral",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0a0a0a,
        @"name": @"BorderColorNeutral950",
        @"category": @"borderColor",
        @"type": @"neutral",
        @"item": @"950"
        }
      },
    @"stone": @{
      @"50": @{
        @"value": #fafaf9,
        @"name": @"BorderColorStone50",
        @"category": @"borderColor",
        @"type": @"stone",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f4,
        @"name": @"BorderColorStone100",
        @"category": @"borderColor",
        @"type": @"stone",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e7e5e4,
        @"name": @"BorderColorStone200",
        @"category": @"borderColor",
        @"type": @"stone",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d6d3d1,
        @"name": @"BorderColorStone300",
        @"category": @"borderColor",
        @"type": @"stone",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a8a29e,
        @"name": @"BorderColorStone400",
        @"category": @"borderColor",
        @"type": @"stone",
        @"item": @"400"
        },
      @"500": @{
        @"value": #78716c,
        @"name": @"BorderColorStone500",
        @"category": @"borderColor",
        @"type": @"stone",
        @"item": @"500"
        },
      @"600": @{
        @"value": #57534e,
        @"name": @"BorderColorStone600",
        @"category": @"borderColor",
        @"type": @"stone",
        @"item": @"600"
        },
      @"700": @{
        @"value": #44403c,
        @"name": @"BorderColorStone700",
        @"category": @"borderColor",
        @"type": @"stone",
        @"item": @"700"
        },
      @"800": @{
        @"value": #292524,
        @"name": @"BorderColorStone800",
        @"category": @"borderColor",
        @"type": @"stone",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1c1917,
        @"name": @"BorderColorStone900",
        @"category": @"borderColor",
        @"type": @"stone",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0c0a09,
        @"name": @"BorderColorStone950",
        @"category": @"borderColor",
        @"type": @"stone",
        @"item": @"950"
        }
      },
    @"red": @{
      @"50": @{
        @"value": #fef2f2,
        @"name": @"BorderColorRed50",
        @"category": @"borderColor",
        @"type": @"red",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fee2e2,
        @"name": @"BorderColorRed100",
        @"category": @"borderColor",
        @"type": @"red",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecaca,
        @"name": @"BorderColorRed200",
        @"category": @"borderColor",
        @"type": @"red",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fca5a5,
        @"name": @"BorderColorRed300",
        @"category": @"borderColor",
        @"type": @"red",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f87171,
        @"name": @"BorderColorRed400",
        @"category": @"borderColor",
        @"type": @"red",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ef4444,
        @"name": @"BorderColorRed500",
        @"category": @"borderColor",
        @"type": @"red",
        @"item": @"500"
        },
      @"600": @{
        @"value": #dc2626,
        @"name": @"BorderColorRed600",
        @"category": @"borderColor",
        @"type": @"red",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b91c1c,
        @"name": @"BorderColorRed700",
        @"category": @"borderColor",
        @"type": @"red",
        @"item": @"700"
        },
      @"800": @{
        @"value": #991b1b,
        @"name": @"BorderColorRed800",
        @"category": @"borderColor",
        @"type": @"red",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7f1d1d,
        @"name": @"BorderColorRed900",
        @"category": @"borderColor",
        @"type": @"red",
        @"item": @"900"
        },
      @"950": @{
        @"value": #450a0a,
        @"name": @"BorderColorRed950",
        @"category": @"borderColor",
        @"type": @"red",
        @"item": @"950"
        }
      },
    @"orange": @{
      @"50": @{
        @"value": #fff7ed,
        @"name": @"BorderColorOrange50",
        @"category": @"borderColor",
        @"type": @"orange",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffedd5,
        @"name": @"BorderColorOrange100",
        @"category": @"borderColor",
        @"type": @"orange",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fed7aa,
        @"name": @"BorderColorOrange200",
        @"category": @"borderColor",
        @"type": @"orange",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fdba74,
        @"name": @"BorderColorOrange300",
        @"category": @"borderColor",
        @"type": @"orange",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb923c,
        @"name": @"BorderColorOrange400",
        @"category": @"borderColor",
        @"type": @"orange",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f97316,
        @"name": @"BorderColorOrange500",
        @"category": @"borderColor",
        @"type": @"orange",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ea580c,
        @"name": @"BorderColorOrange600",
        @"category": @"borderColor",
        @"type": @"orange",
        @"item": @"600"
        },
      @"700": @{
        @"value": #c2410c,
        @"name": @"BorderColorOrange700",
        @"category": @"borderColor",
        @"type": @"orange",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9a3412,
        @"name": @"BorderColorOrange800",
        @"category": @"borderColor",
        @"type": @"orange",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7c2d12,
        @"name": @"BorderColorOrange900",
        @"category": @"borderColor",
        @"type": @"orange",
        @"item": @"900"
        },
      @"950": @{
        @"value": #431407,
        @"name": @"BorderColorOrange950",
        @"category": @"borderColor",
        @"type": @"orange",
        @"item": @"950"
        }
      },
    @"amber": @{
      @"50": @{
        @"value": #fffbeb,
        @"name": @"BorderColorAmber50",
        @"category": @"borderColor",
        @"type": @"amber",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef3c7,
        @"name": @"BorderColorAmber100",
        @"category": @"borderColor",
        @"type": @"amber",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fde68a,
        @"name": @"BorderColorAmber200",
        @"category": @"borderColor",
        @"type": @"amber",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fcd34d,
        @"name": @"BorderColorAmber300",
        @"category": @"borderColor",
        @"type": @"amber",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fbbf24,
        @"name": @"BorderColorAmber400",
        @"category": @"borderColor",
        @"type": @"amber",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f59e0b,
        @"name": @"BorderColorAmber500",
        @"category": @"borderColor",
        @"type": @"amber",
        @"item": @"500"
        },
      @"600": @{
        @"value": #d97706,
        @"name": @"BorderColorAmber600",
        @"category": @"borderColor",
        @"type": @"amber",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b45309,
        @"name": @"BorderColorAmber700",
        @"category": @"borderColor",
        @"type": @"amber",
        @"item": @"700"
        },
      @"800": @{
        @"value": #92400e,
        @"name": @"BorderColorAmber800",
        @"category": @"borderColor",
        @"type": @"amber",
        @"item": @"800"
        },
      @"900": @{
        @"value": #78350f,
        @"name": @"BorderColorAmber900",
        @"category": @"borderColor",
        @"type": @"amber",
        @"item": @"900"
        },
      @"950": @{
        @"value": #451a03,
        @"name": @"BorderColorAmber950",
        @"category": @"borderColor",
        @"type": @"amber",
        @"item": @"950"
        }
      },
    @"yellow": @{
      @"50": @{
        @"value": #fefce8,
        @"name": @"BorderColorYellow50",
        @"category": @"borderColor",
        @"type": @"yellow",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef9c3,
        @"name": @"BorderColorYellow100",
        @"category": @"borderColor",
        @"type": @"yellow",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fef08a,
        @"name": @"BorderColorYellow200",
        @"category": @"borderColor",
        @"type": @"yellow",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fde047,
        @"name": @"BorderColorYellow300",
        @"category": @"borderColor",
        @"type": @"yellow",
        @"item": @"300"
        },
      @"400": @{
        @"value": #facc15,
        @"name": @"BorderColorYellow400",
        @"category": @"borderColor",
        @"type": @"yellow",
        @"item": @"400"
        },
      @"500": @{
        @"value": #eab308,
        @"name": @"BorderColorYellow500",
        @"category": @"borderColor",
        @"type": @"yellow",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ca8a04,
        @"name": @"BorderColorYellow600",
        @"category": @"borderColor",
        @"type": @"yellow",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a16207,
        @"name": @"BorderColorYellow700",
        @"category": @"borderColor",
        @"type": @"yellow",
        @"item": @"700"
        },
      @"800": @{
        @"value": #854d0e,
        @"name": @"BorderColorYellow800",
        @"category": @"borderColor",
        @"type": @"yellow",
        @"item": @"800"
        },
      @"900": @{
        @"value": #713f12,
        @"name": @"BorderColorYellow900",
        @"category": @"borderColor",
        @"type": @"yellow",
        @"item": @"900"
        },
      @"950": @{
        @"value": #422006,
        @"name": @"BorderColorYellow950",
        @"category": @"borderColor",
        @"type": @"yellow",
        @"item": @"950"
        }
      },
    @"lime": @{
      @"50": @{
        @"value": #f7fee7,
        @"name": @"BorderColorLime50",
        @"category": @"borderColor",
        @"type": @"lime",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ecfccb,
        @"name": @"BorderColorLime100",
        @"category": @"borderColor",
        @"type": @"lime",
        @"item": @"100"
        },
      @"200": @{
        @"value": #d9f99d,
        @"name": @"BorderColorLime200",
        @"category": @"borderColor",
        @"type": @"lime",
        @"item": @"200"
        },
      @"300": @{
        @"value": #bef264,
        @"name": @"BorderColorLime300",
        @"category": @"borderColor",
        @"type": @"lime",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3e635,
        @"name": @"BorderColorLime400",
        @"category": @"borderColor",
        @"type": @"lime",
        @"item": @"400"
        },
      @"500": @{
        @"value": #84cc16,
        @"name": @"BorderColorLime500",
        @"category": @"borderColor",
        @"type": @"lime",
        @"item": @"500"
        },
      @"600": @{
        @"value": #65a30d,
        @"name": @"BorderColorLime600",
        @"category": @"borderColor",
        @"type": @"lime",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4d7c0f,
        @"name": @"BorderColorLime700",
        @"category": @"borderColor",
        @"type": @"lime",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3f6212,
        @"name": @"BorderColorLime800",
        @"category": @"borderColor",
        @"type": @"lime",
        @"item": @"800"
        },
      @"900": @{
        @"value": #365314,
        @"name": @"BorderColorLime900",
        @"category": @"borderColor",
        @"type": @"lime",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1a2e05,
        @"name": @"BorderColorLime950",
        @"category": @"borderColor",
        @"type": @"lime",
        @"item": @"950"
        }
      },
    @"green": @{
      @"50": @{
        @"value": #f0fdf4,
        @"name": @"BorderColorGreen50",
        @"category": @"borderColor",
        @"type": @"green",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dcfce7,
        @"name": @"BorderColorGreen100",
        @"category": @"borderColor",
        @"type": @"green",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bbf7d0,
        @"name": @"BorderColorGreen200",
        @"category": @"borderColor",
        @"type": @"green",
        @"item": @"200"
        },
      @"300": @{
        @"value": #86efac,
        @"name": @"BorderColorGreen300",
        @"category": @"borderColor",
        @"type": @"green",
        @"item": @"300"
        },
      @"400": @{
        @"value": #4ade80,
        @"name": @"BorderColorGreen400",
        @"category": @"borderColor",
        @"type": @"green",
        @"item": @"400"
        },
      @"500": @{
        @"value": #22c55e,
        @"name": @"BorderColorGreen500",
        @"category": @"borderColor",
        @"type": @"green",
        @"item": @"500"
        },
      @"600": @{
        @"value": #16a34a,
        @"name": @"BorderColorGreen600",
        @"category": @"borderColor",
        @"type": @"green",
        @"item": @"600"
        },
      @"700": @{
        @"value": #15803d,
        @"name": @"BorderColorGreen700",
        @"category": @"borderColor",
        @"type": @"green",
        @"item": @"700"
        },
      @"800": @{
        @"value": #166534,
        @"name": @"BorderColorGreen800",
        @"category": @"borderColor",
        @"type": @"green",
        @"item": @"800"
        },
      @"900": @{
        @"value": #14532d,
        @"name": @"BorderColorGreen900",
        @"category": @"borderColor",
        @"type": @"green",
        @"item": @"900"
        },
      @"950": @{
        @"value": #052e16,
        @"name": @"BorderColorGreen950",
        @"category": @"borderColor",
        @"type": @"green",
        @"item": @"950"
        }
      },
    @"emerald": @{
      @"50": @{
        @"value": #ecfdf5,
        @"name": @"BorderColorEmerald50",
        @"category": @"borderColor",
        @"type": @"emerald",
        @"item": @"50"
        },
      @"100": @{
        @"value": #d1fae5,
        @"name": @"BorderColorEmerald100",
        @"category": @"borderColor",
        @"type": @"emerald",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a7f3d0,
        @"name": @"BorderColorEmerald200",
        @"category": @"borderColor",
        @"type": @"emerald",
        @"item": @"200"
        },
      @"300": @{
        @"value": #6ee7b7,
        @"name": @"BorderColorEmerald300",
        @"category": @"borderColor",
        @"type": @"emerald",
        @"item": @"300"
        },
      @"400": @{
        @"value": #34d399,
        @"name": @"BorderColorEmerald400",
        @"category": @"borderColor",
        @"type": @"emerald",
        @"item": @"400"
        },
      @"500": @{
        @"value": #10b981,
        @"name": @"BorderColorEmerald500",
        @"category": @"borderColor",
        @"type": @"emerald",
        @"item": @"500"
        },
      @"600": @{
        @"value": #059669,
        @"name": @"BorderColorEmerald600",
        @"category": @"borderColor",
        @"type": @"emerald",
        @"item": @"600"
        },
      @"700": @{
        @"value": #047857,
        @"name": @"BorderColorEmerald700",
        @"category": @"borderColor",
        @"type": @"emerald",
        @"item": @"700"
        },
      @"800": @{
        @"value": #065f46,
        @"name": @"BorderColorEmerald800",
        @"category": @"borderColor",
        @"type": @"emerald",
        @"item": @"800"
        },
      @"900": @{
        @"value": #064e3b,
        @"name": @"BorderColorEmerald900",
        @"category": @"borderColor",
        @"type": @"emerald",
        @"item": @"900"
        },
      @"950": @{
        @"value": #022c22,
        @"name": @"BorderColorEmerald950",
        @"category": @"borderColor",
        @"type": @"emerald",
        @"item": @"950"
        }
      },
    @"teal": @{
      @"50": @{
        @"value": #f0fdfa,
        @"name": @"BorderColorTeal50",
        @"category": @"borderColor",
        @"type": @"teal",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ccfbf1,
        @"name": @"BorderColorTeal100",
        @"category": @"borderColor",
        @"type": @"teal",
        @"item": @"100"
        },
      @"200": @{
        @"value": #99f6e4,
        @"name": @"BorderColorTeal200",
        @"category": @"borderColor",
        @"type": @"teal",
        @"item": @"200"
        },
      @"300": @{
        @"value": #5eead4,
        @"name": @"BorderColorTeal300",
        @"category": @"borderColor",
        @"type": @"teal",
        @"item": @"300"
        },
      @"400": @{
        @"value": #2dd4bf,
        @"name": @"BorderColorTeal400",
        @"category": @"borderColor",
        @"type": @"teal",
        @"item": @"400"
        },
      @"500": @{
        @"value": #14b8a6,
        @"name": @"BorderColorTeal500",
        @"category": @"borderColor",
        @"type": @"teal",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0d9488,
        @"name": @"BorderColorTeal600",
        @"category": @"borderColor",
        @"type": @"teal",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0f766e,
        @"name": @"BorderColorTeal700",
        @"category": @"borderColor",
        @"type": @"teal",
        @"item": @"700"
        },
      @"800": @{
        @"value": #115e59,
        @"name": @"BorderColorTeal800",
        @"category": @"borderColor",
        @"type": @"teal",
        @"item": @"800"
        },
      @"900": @{
        @"value": #134e4a,
        @"name": @"BorderColorTeal900",
        @"category": @"borderColor",
        @"type": @"teal",
        @"item": @"900"
        },
      @"950": @{
        @"value": #042f2e,
        @"name": @"BorderColorTeal950",
        @"category": @"borderColor",
        @"type": @"teal",
        @"item": @"950"
        }
      },
    @"cyan": @{
      @"50": @{
        @"value": #ecfeff,
        @"name": @"BorderColorCyan50",
        @"category": @"borderColor",
        @"type": @"cyan",
        @"item": @"50"
        },
      @"100": @{
        @"value": #cffafe,
        @"name": @"BorderColorCyan100",
        @"category": @"borderColor",
        @"type": @"cyan",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a5f3fc,
        @"name": @"BorderColorCyan200",
        @"category": @"borderColor",
        @"type": @"cyan",
        @"item": @"200"
        },
      @"300": @{
        @"value": #67e8f9,
        @"name": @"BorderColorCyan300",
        @"category": @"borderColor",
        @"type": @"cyan",
        @"item": @"300"
        },
      @"400": @{
        @"value": #22d3ee,
        @"name": @"BorderColorCyan400",
        @"category": @"borderColor",
        @"type": @"cyan",
        @"item": @"400"
        },
      @"500": @{
        @"value": #06b6d4,
        @"name": @"BorderColorCyan500",
        @"category": @"borderColor",
        @"type": @"cyan",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0891b2,
        @"name": @"BorderColorCyan600",
        @"category": @"borderColor",
        @"type": @"cyan",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0e7490,
        @"name": @"BorderColorCyan700",
        @"category": @"borderColor",
        @"type": @"cyan",
        @"item": @"700"
        },
      @"800": @{
        @"value": #155e75,
        @"name": @"BorderColorCyan800",
        @"category": @"borderColor",
        @"type": @"cyan",
        @"item": @"800"
        },
      @"900": @{
        @"value": #164e63,
        @"name": @"BorderColorCyan900",
        @"category": @"borderColor",
        @"type": @"cyan",
        @"item": @"900"
        },
      @"950": @{
        @"value": #083344,
        @"name": @"BorderColorCyan950",
        @"category": @"borderColor",
        @"type": @"cyan",
        @"item": @"950"
        }
      },
    @"sky": @{
      @"50": @{
        @"value": #f0f9ff,
        @"name": @"BorderColorSky50",
        @"category": @"borderColor",
        @"type": @"sky",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0f2fe,
        @"name": @"BorderColorSky100",
        @"category": @"borderColor",
        @"type": @"sky",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bae6fd,
        @"name": @"BorderColorSky200",
        @"category": @"borderColor",
        @"type": @"sky",
        @"item": @"200"
        },
      @"300": @{
        @"value": #7dd3fc,
        @"name": @"BorderColorSky300",
        @"category": @"borderColor",
        @"type": @"sky",
        @"item": @"300"
        },
      @"400": @{
        @"value": #38bdf8,
        @"name": @"BorderColorSky400",
        @"category": @"borderColor",
        @"type": @"sky",
        @"item": @"400"
        },
      @"500": @{
        @"value": #0ea5e9,
        @"name": @"BorderColorSky500",
        @"category": @"borderColor",
        @"type": @"sky",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0284c7,
        @"name": @"BorderColorSky600",
        @"category": @"borderColor",
        @"type": @"sky",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0369a1,
        @"name": @"BorderColorSky700",
        @"category": @"borderColor",
        @"type": @"sky",
        @"item": @"700"
        },
      @"800": @{
        @"value": #075985,
        @"name": @"BorderColorSky800",
        @"category": @"borderColor",
        @"type": @"sky",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0c4a6e,
        @"name": @"BorderColorSky900",
        @"category": @"borderColor",
        @"type": @"sky",
        @"item": @"900"
        },
      @"950": @{
        @"value": #082f49,
        @"name": @"BorderColorSky950",
        @"category": @"borderColor",
        @"type": @"sky",
        @"item": @"950"
        }
      },
    @"blue": @{
      @"50": @{
        @"value": #eff6ff,
        @"name": @"BorderColorBlue50",
        @"category": @"borderColor",
        @"type": @"blue",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dbeafe,
        @"name": @"BorderColorBlue100",
        @"category": @"borderColor",
        @"type": @"blue",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bfdbfe,
        @"name": @"BorderColorBlue200",
        @"category": @"borderColor",
        @"type": @"blue",
        @"item": @"200"
        },
      @"300": @{
        @"value": #93c5fd,
        @"name": @"BorderColorBlue300",
        @"category": @"borderColor",
        @"type": @"blue",
        @"item": @"300"
        },
      @"400": @{
        @"value": #60a5fa,
        @"name": @"BorderColorBlue400",
        @"category": @"borderColor",
        @"type": @"blue",
        @"item": @"400"
        },
      @"500": @{
        @"value": #3b82f6,
        @"name": @"BorderColorBlue500",
        @"category": @"borderColor",
        @"type": @"blue",
        @"item": @"500"
        },
      @"600": @{
        @"value": #2563eb,
        @"name": @"BorderColorBlue600",
        @"category": @"borderColor",
        @"type": @"blue",
        @"item": @"600"
        },
      @"700": @{
        @"value": #1d4ed8,
        @"name": @"BorderColorBlue700",
        @"category": @"borderColor",
        @"type": @"blue",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e40af,
        @"name": @"BorderColorBlue800",
        @"category": @"borderColor",
        @"type": @"blue",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1e3a8a,
        @"name": @"BorderColorBlue900",
        @"category": @"borderColor",
        @"type": @"blue",
        @"item": @"900"
        },
      @"950": @{
        @"value": #172554,
        @"name": @"BorderColorBlue950",
        @"category": @"borderColor",
        @"type": @"blue",
        @"item": @"950"
        }
      },
    @"indigo": @{
      @"50": @{
        @"value": #eef2ff,
        @"name": @"BorderColorIndigo50",
        @"category": @"borderColor",
        @"type": @"indigo",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0e7ff,
        @"name": @"BorderColorIndigo100",
        @"category": @"borderColor",
        @"type": @"indigo",
        @"item": @"100"
        },
      @"200": @{
        @"value": #c7d2fe,
        @"name": @"BorderColorIndigo200",
        @"category": @"borderColor",
        @"type": @"indigo",
        @"item": @"200"
        },
      @"300": @{
        @"value": #a5b4fc,
        @"name": @"BorderColorIndigo300",
        @"category": @"borderColor",
        @"type": @"indigo",
        @"item": @"300"
        },
      @"400": @{
        @"value": #818cf8,
        @"name": @"BorderColorIndigo400",
        @"category": @"borderColor",
        @"type": @"indigo",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6366f1,
        @"name": @"BorderColorIndigo500",
        @"category": @"borderColor",
        @"type": @"indigo",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4f46e5,
        @"name": @"BorderColorIndigo600",
        @"category": @"borderColor",
        @"type": @"indigo",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4338ca,
        @"name": @"BorderColorIndigo700",
        @"category": @"borderColor",
        @"type": @"indigo",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3730a3,
        @"name": @"BorderColorIndigo800",
        @"category": @"borderColor",
        @"type": @"indigo",
        @"item": @"800"
        },
      @"900": @{
        @"value": #312e81,
        @"name": @"BorderColorIndigo900",
        @"category": @"borderColor",
        @"type": @"indigo",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1e1b4b,
        @"name": @"BorderColorIndigo950",
        @"category": @"borderColor",
        @"type": @"indigo",
        @"item": @"950"
        }
      },
    @"violet": @{
      @"50": @{
        @"value": #f5f3ff,
        @"name": @"BorderColorViolet50",
        @"category": @"borderColor",
        @"type": @"violet",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ede9fe,
        @"name": @"BorderColorViolet100",
        @"category": @"borderColor",
        @"type": @"violet",
        @"item": @"100"
        },
      @"200": @{
        @"value": #ddd6fe,
        @"name": @"BorderColorViolet200",
        @"category": @"borderColor",
        @"type": @"violet",
        @"item": @"200"
        },
      @"300": @{
        @"value": #c4b5fd,
        @"name": @"BorderColorViolet300",
        @"category": @"borderColor",
        @"type": @"violet",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a78bfa,
        @"name": @"BorderColorViolet400",
        @"category": @"borderColor",
        @"type": @"violet",
        @"item": @"400"
        },
      @"500": @{
        @"value": #8b5cf6,
        @"name": @"BorderColorViolet500",
        @"category": @"borderColor",
        @"type": @"violet",
        @"item": @"500"
        },
      @"600": @{
        @"value": #7c3aed,
        @"name": @"BorderColorViolet600",
        @"category": @"borderColor",
        @"type": @"violet",
        @"item": @"600"
        },
      @"700": @{
        @"value": #6d28d9,
        @"name": @"BorderColorViolet700",
        @"category": @"borderColor",
        @"type": @"violet",
        @"item": @"700"
        },
      @"800": @{
        @"value": #5b21b6,
        @"name": @"BorderColorViolet800",
        @"category": @"borderColor",
        @"type": @"violet",
        @"item": @"800"
        },
      @"900": @{
        @"value": #4c1d95,
        @"name": @"BorderColorViolet900",
        @"category": @"borderColor",
        @"type": @"violet",
        @"item": @"900"
        },
      @"950": @{
        @"value": #2e1065,
        @"name": @"BorderColorViolet950",
        @"category": @"borderColor",
        @"type": @"violet",
        @"item": @"950"
        }
      },
    @"purple": @{
      @"50": @{
        @"value": #faf5ff,
        @"name": @"BorderColorPurple50",
        @"category": @"borderColor",
        @"type": @"purple",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3e8ff,
        @"name": @"BorderColorPurple100",
        @"category": @"borderColor",
        @"type": @"purple",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e9d5ff,
        @"name": @"BorderColorPurple200",
        @"category": @"borderColor",
        @"type": @"purple",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d8b4fe,
        @"name": @"BorderColorPurple300",
        @"category": @"borderColor",
        @"type": @"purple",
        @"item": @"300"
        },
      @"400": @{
        @"value": #c084fc,
        @"name": @"BorderColorPurple400",
        @"category": @"borderColor",
        @"type": @"purple",
        @"item": @"400"
        },
      @"500": @{
        @"value": #a855f7,
        @"name": @"BorderColorPurple500",
        @"category": @"borderColor",
        @"type": @"purple",
        @"item": @"500"
        },
      @"600": @{
        @"value": #9333ea,
        @"name": @"BorderColorPurple600",
        @"category": @"borderColor",
        @"type": @"purple",
        @"item": @"600"
        },
      @"700": @{
        @"value": #7e22ce,
        @"name": @"BorderColorPurple700",
        @"category": @"borderColor",
        @"type": @"purple",
        @"item": @"700"
        },
      @"800": @{
        @"value": #6b21a8,
        @"name": @"BorderColorPurple800",
        @"category": @"borderColor",
        @"type": @"purple",
        @"item": @"800"
        },
      @"900": @{
        @"value": #581c87,
        @"name": @"BorderColorPurple900",
        @"category": @"borderColor",
        @"type": @"purple",
        @"item": @"900"
        },
      @"950": @{
        @"value": #3b0764,
        @"name": @"BorderColorPurple950",
        @"category": @"borderColor",
        @"type": @"purple",
        @"item": @"950"
        }
      },
    @"fuchsia": @{
      @"50": @{
        @"value": #fdf4ff,
        @"name": @"BorderColorFuchsia50",
        @"category": @"borderColor",
        @"type": @"fuchsia",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fae8ff,
        @"name": @"BorderColorFuchsia100",
        @"category": @"borderColor",
        @"type": @"fuchsia",
        @"item": @"100"
        },
      @"200": @{
        @"value": #f5d0fe,
        @"name": @"BorderColorFuchsia200",
        @"category": @"borderColor",
        @"type": @"fuchsia",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f0abfc,
        @"name": @"BorderColorFuchsia300",
        @"category": @"borderColor",
        @"type": @"fuchsia",
        @"item": @"300"
        },
      @"400": @{
        @"value": #e879f9,
        @"name": @"BorderColorFuchsia400",
        @"category": @"borderColor",
        @"type": @"fuchsia",
        @"item": @"400"
        },
      @"500": @{
        @"value": #d946ef,
        @"name": @"BorderColorFuchsia500",
        @"category": @"borderColor",
        @"type": @"fuchsia",
        @"item": @"500"
        },
      @"600": @{
        @"value": #c026d3,
        @"name": @"BorderColorFuchsia600",
        @"category": @"borderColor",
        @"type": @"fuchsia",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a21caf,
        @"name": @"BorderColorFuchsia700",
        @"category": @"borderColor",
        @"type": @"fuchsia",
        @"item": @"700"
        },
      @"800": @{
        @"value": #86198f,
        @"name": @"BorderColorFuchsia800",
        @"category": @"borderColor",
        @"type": @"fuchsia",
        @"item": @"800"
        },
      @"900": @{
        @"value": #701a75,
        @"name": @"BorderColorFuchsia900",
        @"category": @"borderColor",
        @"type": @"fuchsia",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4a044e,
        @"name": @"BorderColorFuchsia950",
        @"category": @"borderColor",
        @"type": @"fuchsia",
        @"item": @"950"
        }
      },
    @"pink": @{
      @"50": @{
        @"value": #fdf2f8,
        @"name": @"BorderColorPink50",
        @"category": @"borderColor",
        @"type": @"pink",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fce7f3,
        @"name": @"BorderColorPink100",
        @"category": @"borderColor",
        @"type": @"pink",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fbcfe8,
        @"name": @"BorderColorPink200",
        @"category": @"borderColor",
        @"type": @"pink",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f9a8d4,
        @"name": @"BorderColorPink300",
        @"category": @"borderColor",
        @"type": @"pink",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f472b6,
        @"name": @"BorderColorPink400",
        @"category": @"borderColor",
        @"type": @"pink",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ec4899,
        @"name": @"BorderColorPink500",
        @"category": @"borderColor",
        @"type": @"pink",
        @"item": @"500"
        },
      @"600": @{
        @"value": #db2777,
        @"name": @"BorderColorPink600",
        @"category": @"borderColor",
        @"type": @"pink",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be185d,
        @"name": @"BorderColorPink700",
        @"category": @"borderColor",
        @"type": @"pink",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9d174d,
        @"name": @"BorderColorPink800",
        @"category": @"borderColor",
        @"type": @"pink",
        @"item": @"800"
        },
      @"900": @{
        @"value": #831843,
        @"name": @"BorderColorPink900",
        @"category": @"borderColor",
        @"type": @"pink",
        @"item": @"900"
        },
      @"950": @{
        @"value": #500724,
        @"name": @"BorderColorPink950",
        @"category": @"borderColor",
        @"type": @"pink",
        @"item": @"950"
        }
      },
    @"rose": @{
      @"50": @{
        @"value": #fff1f2,
        @"name": @"BorderColorRose50",
        @"category": @"borderColor",
        @"type": @"rose",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffe4e6,
        @"name": @"BorderColorRose100",
        @"category": @"borderColor",
        @"type": @"rose",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecdd3,
        @"name": @"BorderColorRose200",
        @"category": @"borderColor",
        @"type": @"rose",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fda4af,
        @"name": @"BorderColorRose300",
        @"category": @"borderColor",
        @"type": @"rose",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb7185,
        @"name": @"BorderColorRose400",
        @"category": @"borderColor",
        @"type": @"rose",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f43f5e,
        @"name": @"BorderColorRose500",
        @"category": @"borderColor",
        @"type": @"rose",
        @"item": @"500"
        },
      @"600": @{
        @"value": #e11d48,
        @"name": @"BorderColorRose600",
        @"category": @"borderColor",
        @"type": @"rose",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be123c,
        @"name": @"BorderColorRose700",
        @"category": @"borderColor",
        @"type": @"rose",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9f1239,
        @"name": @"BorderColorRose800",
        @"category": @"borderColor",
        @"type": @"rose",
        @"item": @"800"
        },
      @"900": @{
        @"value": #881337,
        @"name": @"BorderColorRose900",
        @"category": @"borderColor",
        @"type": @"rose",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4c0519,
        @"name": @"BorderColorRose950",
        @"category": @"borderColor",
        @"type": @"rose",
        @"item": @"950"
        }
      },
    @"DEFAULT": @{
      @"value": #e5e7eb,
      @"name": @"BorderColorDefault",
      @"category": @"borderColor",
      @"type": @"DEFAULT"
      }
    },
  @"borderOpacity": @{
    @"0": @{
      @"value": 0,
      @"name": @"BorderOpacity0",
      @"category": @"borderOpacity",
      @"type": @"0"
      },
    @"5": @{
      @"value": 0.05,
      @"name": @"BorderOpacity5",
      @"category": @"borderOpacity",
      @"type": @"5"
      },
    @"10": @{
      @"value": 0.1,
      @"name": @"BorderOpacity10",
      @"category": @"borderOpacity",
      @"type": @"10"
      },
    @"15": @{
      @"value": 0.15,
      @"name": @"BorderOpacity15",
      @"category": @"borderOpacity",
      @"type": @"15"
      },
    @"20": @{
      @"value": 0.2,
      @"name": @"BorderOpacity20",
      @"category": @"borderOpacity",
      @"type": @"20"
      },
    @"25": @{
      @"value": 0.25,
      @"name": @"BorderOpacity25",
      @"category": @"borderOpacity",
      @"type": @"25"
      },
    @"30": @{
      @"value": 0.3,
      @"name": @"BorderOpacity30",
      @"category": @"borderOpacity",
      @"type": @"30"
      },
    @"35": @{
      @"value": 0.35,
      @"name": @"BorderOpacity35",
      @"category": @"borderOpacity",
      @"type": @"35"
      },
    @"40": @{
      @"value": 0.4,
      @"name": @"BorderOpacity40",
      @"category": @"borderOpacity",
      @"type": @"40"
      },
    @"45": @{
      @"value": 0.45,
      @"name": @"BorderOpacity45",
      @"category": @"borderOpacity",
      @"type": @"45"
      },
    @"50": @{
      @"value": 0.5,
      @"name": @"BorderOpacity50",
      @"category": @"borderOpacity",
      @"type": @"50"
      },
    @"55": @{
      @"value": 0.55,
      @"name": @"BorderOpacity55",
      @"category": @"borderOpacity",
      @"type": @"55"
      },
    @"60": @{
      @"value": 0.6,
      @"name": @"BorderOpacity60",
      @"category": @"borderOpacity",
      @"type": @"60"
      },
    @"65": @{
      @"value": 0.65,
      @"name": @"BorderOpacity65",
      @"category": @"borderOpacity",
      @"type": @"65"
      },
    @"70": @{
      @"value": 0.7,
      @"name": @"BorderOpacity70",
      @"category": @"borderOpacity",
      @"type": @"70"
      },
    @"75": @{
      @"value": 0.75,
      @"name": @"BorderOpacity75",
      @"category": @"borderOpacity",
      @"type": @"75"
      },
    @"80": @{
      @"value": 0.8,
      @"name": @"BorderOpacity80",
      @"category": @"borderOpacity",
      @"type": @"80"
      },
    @"85": @{
      @"value": 0.85,
      @"name": @"BorderOpacity85",
      @"category": @"borderOpacity",
      @"type": @"85"
      },
    @"90": @{
      @"value": 0.9,
      @"name": @"BorderOpacity90",
      @"category": @"borderOpacity",
      @"type": @"90"
      },
    @"95": @{
      @"value": 0.95,
      @"name": @"BorderOpacity95",
      @"category": @"borderOpacity",
      @"type": @"95"
      },
    @"100": @{
      @"value": 1,
      @"name": @"BorderOpacity100",
      @"category": @"borderOpacity",
      @"type": @"100"
      }
    },
  @"borderRadius": @{
    @"none": @{
      @"value": 0px,
      @"name": @"BorderRadiusNone",
      @"category": @"borderRadius",
      @"type": @"none"
      },
    @"sm": @{
      @"value": 0.125rem,
      @"name": @"BorderRadiusSm",
      @"category": @"borderRadius",
      @"type": @"sm"
      },
    @"DEFAULT": @{
      @"value": 0.25rem,
      @"name": @"BorderRadiusDefault",
      @"category": @"borderRadius",
      @"type": @"DEFAULT"
      },
    @"md": @{
      @"value": 0.375rem,
      @"name": @"BorderRadiusMd",
      @"category": @"borderRadius",
      @"type": @"md"
      },
    @"lg": @{
      @"value": 0.5rem,
      @"name": @"BorderRadiusLg",
      @"category": @"borderRadius",
      @"type": @"lg"
      },
    @"xl": @{
      @"value": 0.75rem,
      @"name": @"BorderRadiusXl",
      @"category": @"borderRadius",
      @"type": @"xl"
      },
    @"2xl": @{
      @"value": 1rem,
      @"name": @"BorderRadius2xl",
      @"category": @"borderRadius",
      @"type": @"2xl"
      },
    @"3xl": @{
      @"value": 1.5rem,
      @"name": @"BorderRadius3xl",
      @"category": @"borderRadius",
      @"type": @"3xl"
      },
    @"full": @{
      @"value": 9999px,
      @"name": @"BorderRadiusFull",
      @"category": @"borderRadius",
      @"type": @"full"
      }
    },
  @"borderSpacing": @{
    @"0": @{
      @"value": 0px,
      @"name": @"BorderSpacing0",
      @"category": @"borderSpacing",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"BorderSpacing1",
      @"category": @"borderSpacing",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"BorderSpacing2",
      @"category": @"borderSpacing",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"BorderSpacing3",
      @"category": @"borderSpacing",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"BorderSpacing4",
      @"category": @"borderSpacing",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"BorderSpacing5",
      @"category": @"borderSpacing",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"BorderSpacing6",
      @"category": @"borderSpacing",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"BorderSpacing7",
      @"category": @"borderSpacing",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"BorderSpacing8",
      @"category": @"borderSpacing",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"BorderSpacing9",
      @"category": @"borderSpacing",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"BorderSpacing10",
      @"category": @"borderSpacing",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"BorderSpacing11",
      @"category": @"borderSpacing",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"BorderSpacing12",
      @"category": @"borderSpacing",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"BorderSpacing14",
      @"category": @"borderSpacing",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"BorderSpacing16",
      @"category": @"borderSpacing",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"BorderSpacing20",
      @"category": @"borderSpacing",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"BorderSpacing24",
      @"category": @"borderSpacing",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"BorderSpacing28",
      @"category": @"borderSpacing",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"BorderSpacing32",
      @"category": @"borderSpacing",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"BorderSpacing36",
      @"category": @"borderSpacing",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"BorderSpacing40",
      @"category": @"borderSpacing",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"BorderSpacing44",
      @"category": @"borderSpacing",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"BorderSpacing48",
      @"category": @"borderSpacing",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"BorderSpacing52",
      @"category": @"borderSpacing",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"BorderSpacing56",
      @"category": @"borderSpacing",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"BorderSpacing60",
      @"category": @"borderSpacing",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"BorderSpacing64",
      @"category": @"borderSpacing",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"BorderSpacing72",
      @"category": @"borderSpacing",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"BorderSpacing80",
      @"category": @"borderSpacing",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"BorderSpacing96",
      @"category": @"borderSpacing",
      @"type": @"96"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"BorderSpacingPx",
      @"category": @"borderSpacing",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"BorderSpacing05",
      @"category": @"borderSpacing",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"BorderSpacing15",
      @"category": @"borderSpacing",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"BorderSpacing25",
      @"category": @"borderSpacing",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"BorderSpacing35",
      @"category": @"borderSpacing",
      @"type": @"3.5"
      }
    },
  @"borderWidth": @{
    @"0": @{
      @"value": 0px,
      @"name": @"BorderWidth0",
      @"category": @"borderWidth",
      @"type": @"0"
      },
    @"2": @{
      @"value": 2px,
      @"name": @"BorderWidth2",
      @"category": @"borderWidth",
      @"type": @"2"
      },
    @"4": @{
      @"value": 4px,
      @"name": @"BorderWidth4",
      @"category": @"borderWidth",
      @"type": @"4"
      },
    @"8": @{
      @"value": 8px,
      @"name": @"BorderWidth8",
      @"category": @"borderWidth",
      @"type": @"8"
      },
    @"DEFAULT": @{
      @"value": 1px,
      @"name": @"BorderWidthDefault",
      @"category": @"borderWidth",
      @"type": @"DEFAULT"
      }
    },
  @"boxShadow": @{
    @"sm": @{
      @"value": 0 1px 2px 0 rgb(0 0 0 / 0.05),
      @"name": @"BoxShadowSm",
      @"category": @"boxShadow",
      @"type": @"sm"
      },
    @"DEFAULT": @{
      @"value": 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1),
      @"name": @"BoxShadowDefault",
      @"category": @"boxShadow",
      @"type": @"DEFAULT"
      },
    @"md": @{
      @"value": 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1),
      @"name": @"BoxShadowMd",
      @"category": @"boxShadow",
      @"type": @"md"
      },
    @"lg": @{
      @"value": 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1),
      @"name": @"BoxShadowLg",
      @"category": @"boxShadow",
      @"type": @"lg"
      },
    @"xl": @{
      @"value": 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1),
      @"name": @"BoxShadowXl",
      @"category": @"boxShadow",
      @"type": @"xl"
      },
    @"2xl": @{
      @"value": 0 25px 50px -12px rgb(0 0 0 / 0.25),
      @"name": @"BoxShadow2xl",
      @"category": @"boxShadow",
      @"type": @"2xl"
      },
    @"inner": @{
      @"value": inset 0 2px 4px 0 rgb(0 0 0 / 0.05),
      @"name": @"BoxShadowInner",
      @"category": @"boxShadow",
      @"type": @"inner"
      },
    @"none": @{
      @"value": none,
      @"name": @"BoxShadowNone",
      @"category": @"boxShadow",
      @"type": @"none"
      }
    },
  @"boxShadowColor": @{
    @"inherit": @{
      @"value": inherit,
      @"name": @"BoxShadowColorInherit",
      @"category": @"boxShadowColor",
      @"type": @"inherit"
      },
    @"current": @{
      @"value": currentColor,
      @"name": @"BoxShadowColorCurrent",
      @"category": @"boxShadowColor",
      @"type": @"current"
      },
    @"transparent": @{
      @"value": transparent,
      @"name": @"BoxShadowColorTransparent",
      @"category": @"boxShadowColor",
      @"type": @"transparent"
      },
    @"black": @{
      @"value": #000,
      @"name": @"BoxShadowColorBlack",
      @"category": @"boxShadowColor",
      @"type": @"black"
      },
    @"white": @{
      @"value": #fff,
      @"name": @"BoxShadowColorWhite",
      @"category": @"boxShadowColor",
      @"type": @"white"
      },
    @"slate": @{
      @"50": @{
        @"value": #f8fafc,
        @"name": @"BoxShadowColorSlate50",
        @"category": @"boxShadowColor",
        @"type": @"slate",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f1f5f9,
        @"name": @"BoxShadowColorSlate100",
        @"category": @"boxShadowColor",
        @"type": @"slate",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e2e8f0,
        @"name": @"BoxShadowColorSlate200",
        @"category": @"boxShadowColor",
        @"type": @"slate",
        @"item": @"200"
        },
      @"300": @{
        @"value": #cbd5e1,
        @"name": @"BoxShadowColorSlate300",
        @"category": @"boxShadowColor",
        @"type": @"slate",
        @"item": @"300"
        },
      @"400": @{
        @"value": #94a3b8,
        @"name": @"BoxShadowColorSlate400",
        @"category": @"boxShadowColor",
        @"type": @"slate",
        @"item": @"400"
        },
      @"500": @{
        @"value": #64748b,
        @"name": @"BoxShadowColorSlate500",
        @"category": @"boxShadowColor",
        @"type": @"slate",
        @"item": @"500"
        },
      @"600": @{
        @"value": #475569,
        @"name": @"BoxShadowColorSlate600",
        @"category": @"boxShadowColor",
        @"type": @"slate",
        @"item": @"600"
        },
      @"700": @{
        @"value": #334155,
        @"name": @"BoxShadowColorSlate700",
        @"category": @"boxShadowColor",
        @"type": @"slate",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e293b,
        @"name": @"BoxShadowColorSlate800",
        @"category": @"boxShadowColor",
        @"type": @"slate",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0f172a,
        @"name": @"BoxShadowColorSlate900",
        @"category": @"boxShadowColor",
        @"type": @"slate",
        @"item": @"900"
        },
      @"950": @{
        @"value": #020617,
        @"name": @"BoxShadowColorSlate950",
        @"category": @"boxShadowColor",
        @"type": @"slate",
        @"item": @"950"
        }
      },
    @"gray": @{
      @"50": @{
        @"value": #f9fafb,
        @"name": @"BoxShadowColorGray50",
        @"category": @"boxShadowColor",
        @"type": @"gray",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3f4f6,
        @"name": @"BoxShadowColorGray100",
        @"category": @"boxShadowColor",
        @"type": @"gray",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e7eb,
        @"name": @"BoxShadowColorGray200",
        @"category": @"boxShadowColor",
        @"type": @"gray",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d1d5db,
        @"name": @"BoxShadowColorGray300",
        @"category": @"boxShadowColor",
        @"type": @"gray",
        @"item": @"300"
        },
      @"400": @{
        @"value": #9ca3af,
        @"name": @"BoxShadowColorGray400",
        @"category": @"boxShadowColor",
        @"type": @"gray",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6b7280,
        @"name": @"BoxShadowColorGray500",
        @"category": @"boxShadowColor",
        @"type": @"gray",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4b5563,
        @"name": @"BoxShadowColorGray600",
        @"category": @"boxShadowColor",
        @"type": @"gray",
        @"item": @"600"
        },
      @"700": @{
        @"value": #374151,
        @"name": @"BoxShadowColorGray700",
        @"category": @"boxShadowColor",
        @"type": @"gray",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1f2937,
        @"name": @"BoxShadowColorGray800",
        @"category": @"boxShadowColor",
        @"type": @"gray",
        @"item": @"800"
        },
      @"900": @{
        @"value": #111827,
        @"name": @"BoxShadowColorGray900",
        @"category": @"boxShadowColor",
        @"type": @"gray",
        @"item": @"900"
        },
      @"950": @{
        @"value": #030712,
        @"name": @"BoxShadowColorGray950",
        @"category": @"boxShadowColor",
        @"type": @"gray",
        @"item": @"950"
        }
      },
    @"zinc": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"BoxShadowColorZinc50",
        @"category": @"boxShadowColor",
        @"type": @"zinc",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f4f4f5,
        @"name": @"BoxShadowColorZinc100",
        @"category": @"boxShadowColor",
        @"type": @"zinc",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e4e4e7,
        @"name": @"BoxShadowColorZinc200",
        @"category": @"boxShadowColor",
        @"type": @"zinc",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d8,
        @"name": @"BoxShadowColorZinc300",
        @"category": @"boxShadowColor",
        @"type": @"zinc",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a1a1aa,
        @"name": @"BoxShadowColorZinc400",
        @"category": @"boxShadowColor",
        @"type": @"zinc",
        @"item": @"400"
        },
      @"500": @{
        @"value": #71717a,
        @"name": @"BoxShadowColorZinc500",
        @"category": @"boxShadowColor",
        @"type": @"zinc",
        @"item": @"500"
        },
      @"600": @{
        @"value": #52525b,
        @"name": @"BoxShadowColorZinc600",
        @"category": @"boxShadowColor",
        @"type": @"zinc",
        @"item": @"600"
        },
      @"700": @{
        @"value": #3f3f46,
        @"name": @"BoxShadowColorZinc700",
        @"category": @"boxShadowColor",
        @"type": @"zinc",
        @"item": @"700"
        },
      @"800": @{
        @"value": #27272a,
        @"name": @"BoxShadowColorZinc800",
        @"category": @"boxShadowColor",
        @"type": @"zinc",
        @"item": @"800"
        },
      @"900": @{
        @"value": #18181b,
        @"name": @"BoxShadowColorZinc900",
        @"category": @"boxShadowColor",
        @"type": @"zinc",
        @"item": @"900"
        },
      @"950": @{
        @"value": #09090b,
        @"name": @"BoxShadowColorZinc950",
        @"category": @"boxShadowColor",
        @"type": @"zinc",
        @"item": @"950"
        }
      },
    @"neutral": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"BoxShadowColorNeutral50",
        @"category": @"boxShadowColor",
        @"type": @"neutral",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f5,
        @"name": @"BoxShadowColorNeutral100",
        @"category": @"boxShadowColor",
        @"type": @"neutral",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e5e5,
        @"name": @"BoxShadowColorNeutral200",
        @"category": @"boxShadowColor",
        @"type": @"neutral",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d4,
        @"name": @"BoxShadowColorNeutral300",
        @"category": @"boxShadowColor",
        @"type": @"neutral",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3a3a3,
        @"name": @"BoxShadowColorNeutral400",
        @"category": @"boxShadowColor",
        @"type": @"neutral",
        @"item": @"400"
        },
      @"500": @{
        @"value": #737373,
        @"name": @"BoxShadowColorNeutral500",
        @"category": @"boxShadowColor",
        @"type": @"neutral",
        @"item": @"500"
        },
      @"600": @{
        @"value": #525252,
        @"name": @"BoxShadowColorNeutral600",
        @"category": @"boxShadowColor",
        @"type": @"neutral",
        @"item": @"600"
        },
      @"700": @{
        @"value": #404040,
        @"name": @"BoxShadowColorNeutral700",
        @"category": @"boxShadowColor",
        @"type": @"neutral",
        @"item": @"700"
        },
      @"800": @{
        @"value": #262626,
        @"name": @"BoxShadowColorNeutral800",
        @"category": @"boxShadowColor",
        @"type": @"neutral",
        @"item": @"800"
        },
      @"900": @{
        @"value": #171717,
        @"name": @"BoxShadowColorNeutral900",
        @"category": @"boxShadowColor",
        @"type": @"neutral",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0a0a0a,
        @"name": @"BoxShadowColorNeutral950",
        @"category": @"boxShadowColor",
        @"type": @"neutral",
        @"item": @"950"
        }
      },
    @"stone": @{
      @"50": @{
        @"value": #fafaf9,
        @"name": @"BoxShadowColorStone50",
        @"category": @"boxShadowColor",
        @"type": @"stone",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f4,
        @"name": @"BoxShadowColorStone100",
        @"category": @"boxShadowColor",
        @"type": @"stone",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e7e5e4,
        @"name": @"BoxShadowColorStone200",
        @"category": @"boxShadowColor",
        @"type": @"stone",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d6d3d1,
        @"name": @"BoxShadowColorStone300",
        @"category": @"boxShadowColor",
        @"type": @"stone",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a8a29e,
        @"name": @"BoxShadowColorStone400",
        @"category": @"boxShadowColor",
        @"type": @"stone",
        @"item": @"400"
        },
      @"500": @{
        @"value": #78716c,
        @"name": @"BoxShadowColorStone500",
        @"category": @"boxShadowColor",
        @"type": @"stone",
        @"item": @"500"
        },
      @"600": @{
        @"value": #57534e,
        @"name": @"BoxShadowColorStone600",
        @"category": @"boxShadowColor",
        @"type": @"stone",
        @"item": @"600"
        },
      @"700": @{
        @"value": #44403c,
        @"name": @"BoxShadowColorStone700",
        @"category": @"boxShadowColor",
        @"type": @"stone",
        @"item": @"700"
        },
      @"800": @{
        @"value": #292524,
        @"name": @"BoxShadowColorStone800",
        @"category": @"boxShadowColor",
        @"type": @"stone",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1c1917,
        @"name": @"BoxShadowColorStone900",
        @"category": @"boxShadowColor",
        @"type": @"stone",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0c0a09,
        @"name": @"BoxShadowColorStone950",
        @"category": @"boxShadowColor",
        @"type": @"stone",
        @"item": @"950"
        }
      },
    @"red": @{
      @"50": @{
        @"value": #fef2f2,
        @"name": @"BoxShadowColorRed50",
        @"category": @"boxShadowColor",
        @"type": @"red",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fee2e2,
        @"name": @"BoxShadowColorRed100",
        @"category": @"boxShadowColor",
        @"type": @"red",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecaca,
        @"name": @"BoxShadowColorRed200",
        @"category": @"boxShadowColor",
        @"type": @"red",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fca5a5,
        @"name": @"BoxShadowColorRed300",
        @"category": @"boxShadowColor",
        @"type": @"red",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f87171,
        @"name": @"BoxShadowColorRed400",
        @"category": @"boxShadowColor",
        @"type": @"red",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ef4444,
        @"name": @"BoxShadowColorRed500",
        @"category": @"boxShadowColor",
        @"type": @"red",
        @"item": @"500"
        },
      @"600": @{
        @"value": #dc2626,
        @"name": @"BoxShadowColorRed600",
        @"category": @"boxShadowColor",
        @"type": @"red",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b91c1c,
        @"name": @"BoxShadowColorRed700",
        @"category": @"boxShadowColor",
        @"type": @"red",
        @"item": @"700"
        },
      @"800": @{
        @"value": #991b1b,
        @"name": @"BoxShadowColorRed800",
        @"category": @"boxShadowColor",
        @"type": @"red",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7f1d1d,
        @"name": @"BoxShadowColorRed900",
        @"category": @"boxShadowColor",
        @"type": @"red",
        @"item": @"900"
        },
      @"950": @{
        @"value": #450a0a,
        @"name": @"BoxShadowColorRed950",
        @"category": @"boxShadowColor",
        @"type": @"red",
        @"item": @"950"
        }
      },
    @"orange": @{
      @"50": @{
        @"value": #fff7ed,
        @"name": @"BoxShadowColorOrange50",
        @"category": @"boxShadowColor",
        @"type": @"orange",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffedd5,
        @"name": @"BoxShadowColorOrange100",
        @"category": @"boxShadowColor",
        @"type": @"orange",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fed7aa,
        @"name": @"BoxShadowColorOrange200",
        @"category": @"boxShadowColor",
        @"type": @"orange",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fdba74,
        @"name": @"BoxShadowColorOrange300",
        @"category": @"boxShadowColor",
        @"type": @"orange",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb923c,
        @"name": @"BoxShadowColorOrange400",
        @"category": @"boxShadowColor",
        @"type": @"orange",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f97316,
        @"name": @"BoxShadowColorOrange500",
        @"category": @"boxShadowColor",
        @"type": @"orange",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ea580c,
        @"name": @"BoxShadowColorOrange600",
        @"category": @"boxShadowColor",
        @"type": @"orange",
        @"item": @"600"
        },
      @"700": @{
        @"value": #c2410c,
        @"name": @"BoxShadowColorOrange700",
        @"category": @"boxShadowColor",
        @"type": @"orange",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9a3412,
        @"name": @"BoxShadowColorOrange800",
        @"category": @"boxShadowColor",
        @"type": @"orange",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7c2d12,
        @"name": @"BoxShadowColorOrange900",
        @"category": @"boxShadowColor",
        @"type": @"orange",
        @"item": @"900"
        },
      @"950": @{
        @"value": #431407,
        @"name": @"BoxShadowColorOrange950",
        @"category": @"boxShadowColor",
        @"type": @"orange",
        @"item": @"950"
        }
      },
    @"amber": @{
      @"50": @{
        @"value": #fffbeb,
        @"name": @"BoxShadowColorAmber50",
        @"category": @"boxShadowColor",
        @"type": @"amber",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef3c7,
        @"name": @"BoxShadowColorAmber100",
        @"category": @"boxShadowColor",
        @"type": @"amber",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fde68a,
        @"name": @"BoxShadowColorAmber200",
        @"category": @"boxShadowColor",
        @"type": @"amber",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fcd34d,
        @"name": @"BoxShadowColorAmber300",
        @"category": @"boxShadowColor",
        @"type": @"amber",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fbbf24,
        @"name": @"BoxShadowColorAmber400",
        @"category": @"boxShadowColor",
        @"type": @"amber",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f59e0b,
        @"name": @"BoxShadowColorAmber500",
        @"category": @"boxShadowColor",
        @"type": @"amber",
        @"item": @"500"
        },
      @"600": @{
        @"value": #d97706,
        @"name": @"BoxShadowColorAmber600",
        @"category": @"boxShadowColor",
        @"type": @"amber",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b45309,
        @"name": @"BoxShadowColorAmber700",
        @"category": @"boxShadowColor",
        @"type": @"amber",
        @"item": @"700"
        },
      @"800": @{
        @"value": #92400e,
        @"name": @"BoxShadowColorAmber800",
        @"category": @"boxShadowColor",
        @"type": @"amber",
        @"item": @"800"
        },
      @"900": @{
        @"value": #78350f,
        @"name": @"BoxShadowColorAmber900",
        @"category": @"boxShadowColor",
        @"type": @"amber",
        @"item": @"900"
        },
      @"950": @{
        @"value": #451a03,
        @"name": @"BoxShadowColorAmber950",
        @"category": @"boxShadowColor",
        @"type": @"amber",
        @"item": @"950"
        }
      },
    @"yellow": @{
      @"50": @{
        @"value": #fefce8,
        @"name": @"BoxShadowColorYellow50",
        @"category": @"boxShadowColor",
        @"type": @"yellow",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef9c3,
        @"name": @"BoxShadowColorYellow100",
        @"category": @"boxShadowColor",
        @"type": @"yellow",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fef08a,
        @"name": @"BoxShadowColorYellow200",
        @"category": @"boxShadowColor",
        @"type": @"yellow",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fde047,
        @"name": @"BoxShadowColorYellow300",
        @"category": @"boxShadowColor",
        @"type": @"yellow",
        @"item": @"300"
        },
      @"400": @{
        @"value": #facc15,
        @"name": @"BoxShadowColorYellow400",
        @"category": @"boxShadowColor",
        @"type": @"yellow",
        @"item": @"400"
        },
      @"500": @{
        @"value": #eab308,
        @"name": @"BoxShadowColorYellow500",
        @"category": @"boxShadowColor",
        @"type": @"yellow",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ca8a04,
        @"name": @"BoxShadowColorYellow600",
        @"category": @"boxShadowColor",
        @"type": @"yellow",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a16207,
        @"name": @"BoxShadowColorYellow700",
        @"category": @"boxShadowColor",
        @"type": @"yellow",
        @"item": @"700"
        },
      @"800": @{
        @"value": #854d0e,
        @"name": @"BoxShadowColorYellow800",
        @"category": @"boxShadowColor",
        @"type": @"yellow",
        @"item": @"800"
        },
      @"900": @{
        @"value": #713f12,
        @"name": @"BoxShadowColorYellow900",
        @"category": @"boxShadowColor",
        @"type": @"yellow",
        @"item": @"900"
        },
      @"950": @{
        @"value": #422006,
        @"name": @"BoxShadowColorYellow950",
        @"category": @"boxShadowColor",
        @"type": @"yellow",
        @"item": @"950"
        }
      },
    @"lime": @{
      @"50": @{
        @"value": #f7fee7,
        @"name": @"BoxShadowColorLime50",
        @"category": @"boxShadowColor",
        @"type": @"lime",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ecfccb,
        @"name": @"BoxShadowColorLime100",
        @"category": @"boxShadowColor",
        @"type": @"lime",
        @"item": @"100"
        },
      @"200": @{
        @"value": #d9f99d,
        @"name": @"BoxShadowColorLime200",
        @"category": @"boxShadowColor",
        @"type": @"lime",
        @"item": @"200"
        },
      @"300": @{
        @"value": #bef264,
        @"name": @"BoxShadowColorLime300",
        @"category": @"boxShadowColor",
        @"type": @"lime",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3e635,
        @"name": @"BoxShadowColorLime400",
        @"category": @"boxShadowColor",
        @"type": @"lime",
        @"item": @"400"
        },
      @"500": @{
        @"value": #84cc16,
        @"name": @"BoxShadowColorLime500",
        @"category": @"boxShadowColor",
        @"type": @"lime",
        @"item": @"500"
        },
      @"600": @{
        @"value": #65a30d,
        @"name": @"BoxShadowColorLime600",
        @"category": @"boxShadowColor",
        @"type": @"lime",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4d7c0f,
        @"name": @"BoxShadowColorLime700",
        @"category": @"boxShadowColor",
        @"type": @"lime",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3f6212,
        @"name": @"BoxShadowColorLime800",
        @"category": @"boxShadowColor",
        @"type": @"lime",
        @"item": @"800"
        },
      @"900": @{
        @"value": #365314,
        @"name": @"BoxShadowColorLime900",
        @"category": @"boxShadowColor",
        @"type": @"lime",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1a2e05,
        @"name": @"BoxShadowColorLime950",
        @"category": @"boxShadowColor",
        @"type": @"lime",
        @"item": @"950"
        }
      },
    @"green": @{
      @"50": @{
        @"value": #f0fdf4,
        @"name": @"BoxShadowColorGreen50",
        @"category": @"boxShadowColor",
        @"type": @"green",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dcfce7,
        @"name": @"BoxShadowColorGreen100",
        @"category": @"boxShadowColor",
        @"type": @"green",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bbf7d0,
        @"name": @"BoxShadowColorGreen200",
        @"category": @"boxShadowColor",
        @"type": @"green",
        @"item": @"200"
        },
      @"300": @{
        @"value": #86efac,
        @"name": @"BoxShadowColorGreen300",
        @"category": @"boxShadowColor",
        @"type": @"green",
        @"item": @"300"
        },
      @"400": @{
        @"value": #4ade80,
        @"name": @"BoxShadowColorGreen400",
        @"category": @"boxShadowColor",
        @"type": @"green",
        @"item": @"400"
        },
      @"500": @{
        @"value": #22c55e,
        @"name": @"BoxShadowColorGreen500",
        @"category": @"boxShadowColor",
        @"type": @"green",
        @"item": @"500"
        },
      @"600": @{
        @"value": #16a34a,
        @"name": @"BoxShadowColorGreen600",
        @"category": @"boxShadowColor",
        @"type": @"green",
        @"item": @"600"
        },
      @"700": @{
        @"value": #15803d,
        @"name": @"BoxShadowColorGreen700",
        @"category": @"boxShadowColor",
        @"type": @"green",
        @"item": @"700"
        },
      @"800": @{
        @"value": #166534,
        @"name": @"BoxShadowColorGreen800",
        @"category": @"boxShadowColor",
        @"type": @"green",
        @"item": @"800"
        },
      @"900": @{
        @"value": #14532d,
        @"name": @"BoxShadowColorGreen900",
        @"category": @"boxShadowColor",
        @"type": @"green",
        @"item": @"900"
        },
      @"950": @{
        @"value": #052e16,
        @"name": @"BoxShadowColorGreen950",
        @"category": @"boxShadowColor",
        @"type": @"green",
        @"item": @"950"
        }
      },
    @"emerald": @{
      @"50": @{
        @"value": #ecfdf5,
        @"name": @"BoxShadowColorEmerald50",
        @"category": @"boxShadowColor",
        @"type": @"emerald",
        @"item": @"50"
        },
      @"100": @{
        @"value": #d1fae5,
        @"name": @"BoxShadowColorEmerald100",
        @"category": @"boxShadowColor",
        @"type": @"emerald",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a7f3d0,
        @"name": @"BoxShadowColorEmerald200",
        @"category": @"boxShadowColor",
        @"type": @"emerald",
        @"item": @"200"
        },
      @"300": @{
        @"value": #6ee7b7,
        @"name": @"BoxShadowColorEmerald300",
        @"category": @"boxShadowColor",
        @"type": @"emerald",
        @"item": @"300"
        },
      @"400": @{
        @"value": #34d399,
        @"name": @"BoxShadowColorEmerald400",
        @"category": @"boxShadowColor",
        @"type": @"emerald",
        @"item": @"400"
        },
      @"500": @{
        @"value": #10b981,
        @"name": @"BoxShadowColorEmerald500",
        @"category": @"boxShadowColor",
        @"type": @"emerald",
        @"item": @"500"
        },
      @"600": @{
        @"value": #059669,
        @"name": @"BoxShadowColorEmerald600",
        @"category": @"boxShadowColor",
        @"type": @"emerald",
        @"item": @"600"
        },
      @"700": @{
        @"value": #047857,
        @"name": @"BoxShadowColorEmerald700",
        @"category": @"boxShadowColor",
        @"type": @"emerald",
        @"item": @"700"
        },
      @"800": @{
        @"value": #065f46,
        @"name": @"BoxShadowColorEmerald800",
        @"category": @"boxShadowColor",
        @"type": @"emerald",
        @"item": @"800"
        },
      @"900": @{
        @"value": #064e3b,
        @"name": @"BoxShadowColorEmerald900",
        @"category": @"boxShadowColor",
        @"type": @"emerald",
        @"item": @"900"
        },
      @"950": @{
        @"value": #022c22,
        @"name": @"BoxShadowColorEmerald950",
        @"category": @"boxShadowColor",
        @"type": @"emerald",
        @"item": @"950"
        }
      },
    @"teal": @{
      @"50": @{
        @"value": #f0fdfa,
        @"name": @"BoxShadowColorTeal50",
        @"category": @"boxShadowColor",
        @"type": @"teal",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ccfbf1,
        @"name": @"BoxShadowColorTeal100",
        @"category": @"boxShadowColor",
        @"type": @"teal",
        @"item": @"100"
        },
      @"200": @{
        @"value": #99f6e4,
        @"name": @"BoxShadowColorTeal200",
        @"category": @"boxShadowColor",
        @"type": @"teal",
        @"item": @"200"
        },
      @"300": @{
        @"value": #5eead4,
        @"name": @"BoxShadowColorTeal300",
        @"category": @"boxShadowColor",
        @"type": @"teal",
        @"item": @"300"
        },
      @"400": @{
        @"value": #2dd4bf,
        @"name": @"BoxShadowColorTeal400",
        @"category": @"boxShadowColor",
        @"type": @"teal",
        @"item": @"400"
        },
      @"500": @{
        @"value": #14b8a6,
        @"name": @"BoxShadowColorTeal500",
        @"category": @"boxShadowColor",
        @"type": @"teal",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0d9488,
        @"name": @"BoxShadowColorTeal600",
        @"category": @"boxShadowColor",
        @"type": @"teal",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0f766e,
        @"name": @"BoxShadowColorTeal700",
        @"category": @"boxShadowColor",
        @"type": @"teal",
        @"item": @"700"
        },
      @"800": @{
        @"value": #115e59,
        @"name": @"BoxShadowColorTeal800",
        @"category": @"boxShadowColor",
        @"type": @"teal",
        @"item": @"800"
        },
      @"900": @{
        @"value": #134e4a,
        @"name": @"BoxShadowColorTeal900",
        @"category": @"boxShadowColor",
        @"type": @"teal",
        @"item": @"900"
        },
      @"950": @{
        @"value": #042f2e,
        @"name": @"BoxShadowColorTeal950",
        @"category": @"boxShadowColor",
        @"type": @"teal",
        @"item": @"950"
        }
      },
    @"cyan": @{
      @"50": @{
        @"value": #ecfeff,
        @"name": @"BoxShadowColorCyan50",
        @"category": @"boxShadowColor",
        @"type": @"cyan",
        @"item": @"50"
        },
      @"100": @{
        @"value": #cffafe,
        @"name": @"BoxShadowColorCyan100",
        @"category": @"boxShadowColor",
        @"type": @"cyan",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a5f3fc,
        @"name": @"BoxShadowColorCyan200",
        @"category": @"boxShadowColor",
        @"type": @"cyan",
        @"item": @"200"
        },
      @"300": @{
        @"value": #67e8f9,
        @"name": @"BoxShadowColorCyan300",
        @"category": @"boxShadowColor",
        @"type": @"cyan",
        @"item": @"300"
        },
      @"400": @{
        @"value": #22d3ee,
        @"name": @"BoxShadowColorCyan400",
        @"category": @"boxShadowColor",
        @"type": @"cyan",
        @"item": @"400"
        },
      @"500": @{
        @"value": #06b6d4,
        @"name": @"BoxShadowColorCyan500",
        @"category": @"boxShadowColor",
        @"type": @"cyan",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0891b2,
        @"name": @"BoxShadowColorCyan600",
        @"category": @"boxShadowColor",
        @"type": @"cyan",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0e7490,
        @"name": @"BoxShadowColorCyan700",
        @"category": @"boxShadowColor",
        @"type": @"cyan",
        @"item": @"700"
        },
      @"800": @{
        @"value": #155e75,
        @"name": @"BoxShadowColorCyan800",
        @"category": @"boxShadowColor",
        @"type": @"cyan",
        @"item": @"800"
        },
      @"900": @{
        @"value": #164e63,
        @"name": @"BoxShadowColorCyan900",
        @"category": @"boxShadowColor",
        @"type": @"cyan",
        @"item": @"900"
        },
      @"950": @{
        @"value": #083344,
        @"name": @"BoxShadowColorCyan950",
        @"category": @"boxShadowColor",
        @"type": @"cyan",
        @"item": @"950"
        }
      },
    @"sky": @{
      @"50": @{
        @"value": #f0f9ff,
        @"name": @"BoxShadowColorSky50",
        @"category": @"boxShadowColor",
        @"type": @"sky",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0f2fe,
        @"name": @"BoxShadowColorSky100",
        @"category": @"boxShadowColor",
        @"type": @"sky",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bae6fd,
        @"name": @"BoxShadowColorSky200",
        @"category": @"boxShadowColor",
        @"type": @"sky",
        @"item": @"200"
        },
      @"300": @{
        @"value": #7dd3fc,
        @"name": @"BoxShadowColorSky300",
        @"category": @"boxShadowColor",
        @"type": @"sky",
        @"item": @"300"
        },
      @"400": @{
        @"value": #38bdf8,
        @"name": @"BoxShadowColorSky400",
        @"category": @"boxShadowColor",
        @"type": @"sky",
        @"item": @"400"
        },
      @"500": @{
        @"value": #0ea5e9,
        @"name": @"BoxShadowColorSky500",
        @"category": @"boxShadowColor",
        @"type": @"sky",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0284c7,
        @"name": @"BoxShadowColorSky600",
        @"category": @"boxShadowColor",
        @"type": @"sky",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0369a1,
        @"name": @"BoxShadowColorSky700",
        @"category": @"boxShadowColor",
        @"type": @"sky",
        @"item": @"700"
        },
      @"800": @{
        @"value": #075985,
        @"name": @"BoxShadowColorSky800",
        @"category": @"boxShadowColor",
        @"type": @"sky",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0c4a6e,
        @"name": @"BoxShadowColorSky900",
        @"category": @"boxShadowColor",
        @"type": @"sky",
        @"item": @"900"
        },
      @"950": @{
        @"value": #082f49,
        @"name": @"BoxShadowColorSky950",
        @"category": @"boxShadowColor",
        @"type": @"sky",
        @"item": @"950"
        }
      },
    @"blue": @{
      @"50": @{
        @"value": #eff6ff,
        @"name": @"BoxShadowColorBlue50",
        @"category": @"boxShadowColor",
        @"type": @"blue",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dbeafe,
        @"name": @"BoxShadowColorBlue100",
        @"category": @"boxShadowColor",
        @"type": @"blue",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bfdbfe,
        @"name": @"BoxShadowColorBlue200",
        @"category": @"boxShadowColor",
        @"type": @"blue",
        @"item": @"200"
        },
      @"300": @{
        @"value": #93c5fd,
        @"name": @"BoxShadowColorBlue300",
        @"category": @"boxShadowColor",
        @"type": @"blue",
        @"item": @"300"
        },
      @"400": @{
        @"value": #60a5fa,
        @"name": @"BoxShadowColorBlue400",
        @"category": @"boxShadowColor",
        @"type": @"blue",
        @"item": @"400"
        },
      @"500": @{
        @"value": #3b82f6,
        @"name": @"BoxShadowColorBlue500",
        @"category": @"boxShadowColor",
        @"type": @"blue",
        @"item": @"500"
        },
      @"600": @{
        @"value": #2563eb,
        @"name": @"BoxShadowColorBlue600",
        @"category": @"boxShadowColor",
        @"type": @"blue",
        @"item": @"600"
        },
      @"700": @{
        @"value": #1d4ed8,
        @"name": @"BoxShadowColorBlue700",
        @"category": @"boxShadowColor",
        @"type": @"blue",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e40af,
        @"name": @"BoxShadowColorBlue800",
        @"category": @"boxShadowColor",
        @"type": @"blue",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1e3a8a,
        @"name": @"BoxShadowColorBlue900",
        @"category": @"boxShadowColor",
        @"type": @"blue",
        @"item": @"900"
        },
      @"950": @{
        @"value": #172554,
        @"name": @"BoxShadowColorBlue950",
        @"category": @"boxShadowColor",
        @"type": @"blue",
        @"item": @"950"
        }
      },
    @"indigo": @{
      @"50": @{
        @"value": #eef2ff,
        @"name": @"BoxShadowColorIndigo50",
        @"category": @"boxShadowColor",
        @"type": @"indigo",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0e7ff,
        @"name": @"BoxShadowColorIndigo100",
        @"category": @"boxShadowColor",
        @"type": @"indigo",
        @"item": @"100"
        },
      @"200": @{
        @"value": #c7d2fe,
        @"name": @"BoxShadowColorIndigo200",
        @"category": @"boxShadowColor",
        @"type": @"indigo",
        @"item": @"200"
        },
      @"300": @{
        @"value": #a5b4fc,
        @"name": @"BoxShadowColorIndigo300",
        @"category": @"boxShadowColor",
        @"type": @"indigo",
        @"item": @"300"
        },
      @"400": @{
        @"value": #818cf8,
        @"name": @"BoxShadowColorIndigo400",
        @"category": @"boxShadowColor",
        @"type": @"indigo",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6366f1,
        @"name": @"BoxShadowColorIndigo500",
        @"category": @"boxShadowColor",
        @"type": @"indigo",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4f46e5,
        @"name": @"BoxShadowColorIndigo600",
        @"category": @"boxShadowColor",
        @"type": @"indigo",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4338ca,
        @"name": @"BoxShadowColorIndigo700",
        @"category": @"boxShadowColor",
        @"type": @"indigo",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3730a3,
        @"name": @"BoxShadowColorIndigo800",
        @"category": @"boxShadowColor",
        @"type": @"indigo",
        @"item": @"800"
        },
      @"900": @{
        @"value": #312e81,
        @"name": @"BoxShadowColorIndigo900",
        @"category": @"boxShadowColor",
        @"type": @"indigo",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1e1b4b,
        @"name": @"BoxShadowColorIndigo950",
        @"category": @"boxShadowColor",
        @"type": @"indigo",
        @"item": @"950"
        }
      },
    @"violet": @{
      @"50": @{
        @"value": #f5f3ff,
        @"name": @"BoxShadowColorViolet50",
        @"category": @"boxShadowColor",
        @"type": @"violet",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ede9fe,
        @"name": @"BoxShadowColorViolet100",
        @"category": @"boxShadowColor",
        @"type": @"violet",
        @"item": @"100"
        },
      @"200": @{
        @"value": #ddd6fe,
        @"name": @"BoxShadowColorViolet200",
        @"category": @"boxShadowColor",
        @"type": @"violet",
        @"item": @"200"
        },
      @"300": @{
        @"value": #c4b5fd,
        @"name": @"BoxShadowColorViolet300",
        @"category": @"boxShadowColor",
        @"type": @"violet",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a78bfa,
        @"name": @"BoxShadowColorViolet400",
        @"category": @"boxShadowColor",
        @"type": @"violet",
        @"item": @"400"
        },
      @"500": @{
        @"value": #8b5cf6,
        @"name": @"BoxShadowColorViolet500",
        @"category": @"boxShadowColor",
        @"type": @"violet",
        @"item": @"500"
        },
      @"600": @{
        @"value": #7c3aed,
        @"name": @"BoxShadowColorViolet600",
        @"category": @"boxShadowColor",
        @"type": @"violet",
        @"item": @"600"
        },
      @"700": @{
        @"value": #6d28d9,
        @"name": @"BoxShadowColorViolet700",
        @"category": @"boxShadowColor",
        @"type": @"violet",
        @"item": @"700"
        },
      @"800": @{
        @"value": #5b21b6,
        @"name": @"BoxShadowColorViolet800",
        @"category": @"boxShadowColor",
        @"type": @"violet",
        @"item": @"800"
        },
      @"900": @{
        @"value": #4c1d95,
        @"name": @"BoxShadowColorViolet900",
        @"category": @"boxShadowColor",
        @"type": @"violet",
        @"item": @"900"
        },
      @"950": @{
        @"value": #2e1065,
        @"name": @"BoxShadowColorViolet950",
        @"category": @"boxShadowColor",
        @"type": @"violet",
        @"item": @"950"
        }
      },
    @"purple": @{
      @"50": @{
        @"value": #faf5ff,
        @"name": @"BoxShadowColorPurple50",
        @"category": @"boxShadowColor",
        @"type": @"purple",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3e8ff,
        @"name": @"BoxShadowColorPurple100",
        @"category": @"boxShadowColor",
        @"type": @"purple",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e9d5ff,
        @"name": @"BoxShadowColorPurple200",
        @"category": @"boxShadowColor",
        @"type": @"purple",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d8b4fe,
        @"name": @"BoxShadowColorPurple300",
        @"category": @"boxShadowColor",
        @"type": @"purple",
        @"item": @"300"
        },
      @"400": @{
        @"value": #c084fc,
        @"name": @"BoxShadowColorPurple400",
        @"category": @"boxShadowColor",
        @"type": @"purple",
        @"item": @"400"
        },
      @"500": @{
        @"value": #a855f7,
        @"name": @"BoxShadowColorPurple500",
        @"category": @"boxShadowColor",
        @"type": @"purple",
        @"item": @"500"
        },
      @"600": @{
        @"value": #9333ea,
        @"name": @"BoxShadowColorPurple600",
        @"category": @"boxShadowColor",
        @"type": @"purple",
        @"item": @"600"
        },
      @"700": @{
        @"value": #7e22ce,
        @"name": @"BoxShadowColorPurple700",
        @"category": @"boxShadowColor",
        @"type": @"purple",
        @"item": @"700"
        },
      @"800": @{
        @"value": #6b21a8,
        @"name": @"BoxShadowColorPurple800",
        @"category": @"boxShadowColor",
        @"type": @"purple",
        @"item": @"800"
        },
      @"900": @{
        @"value": #581c87,
        @"name": @"BoxShadowColorPurple900",
        @"category": @"boxShadowColor",
        @"type": @"purple",
        @"item": @"900"
        },
      @"950": @{
        @"value": #3b0764,
        @"name": @"BoxShadowColorPurple950",
        @"category": @"boxShadowColor",
        @"type": @"purple",
        @"item": @"950"
        }
      },
    @"fuchsia": @{
      @"50": @{
        @"value": #fdf4ff,
        @"name": @"BoxShadowColorFuchsia50",
        @"category": @"boxShadowColor",
        @"type": @"fuchsia",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fae8ff,
        @"name": @"BoxShadowColorFuchsia100",
        @"category": @"boxShadowColor",
        @"type": @"fuchsia",
        @"item": @"100"
        },
      @"200": @{
        @"value": #f5d0fe,
        @"name": @"BoxShadowColorFuchsia200",
        @"category": @"boxShadowColor",
        @"type": @"fuchsia",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f0abfc,
        @"name": @"BoxShadowColorFuchsia300",
        @"category": @"boxShadowColor",
        @"type": @"fuchsia",
        @"item": @"300"
        },
      @"400": @{
        @"value": #e879f9,
        @"name": @"BoxShadowColorFuchsia400",
        @"category": @"boxShadowColor",
        @"type": @"fuchsia",
        @"item": @"400"
        },
      @"500": @{
        @"value": #d946ef,
        @"name": @"BoxShadowColorFuchsia500",
        @"category": @"boxShadowColor",
        @"type": @"fuchsia",
        @"item": @"500"
        },
      @"600": @{
        @"value": #c026d3,
        @"name": @"BoxShadowColorFuchsia600",
        @"category": @"boxShadowColor",
        @"type": @"fuchsia",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a21caf,
        @"name": @"BoxShadowColorFuchsia700",
        @"category": @"boxShadowColor",
        @"type": @"fuchsia",
        @"item": @"700"
        },
      @"800": @{
        @"value": #86198f,
        @"name": @"BoxShadowColorFuchsia800",
        @"category": @"boxShadowColor",
        @"type": @"fuchsia",
        @"item": @"800"
        },
      @"900": @{
        @"value": #701a75,
        @"name": @"BoxShadowColorFuchsia900",
        @"category": @"boxShadowColor",
        @"type": @"fuchsia",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4a044e,
        @"name": @"BoxShadowColorFuchsia950",
        @"category": @"boxShadowColor",
        @"type": @"fuchsia",
        @"item": @"950"
        }
      },
    @"pink": @{
      @"50": @{
        @"value": #fdf2f8,
        @"name": @"BoxShadowColorPink50",
        @"category": @"boxShadowColor",
        @"type": @"pink",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fce7f3,
        @"name": @"BoxShadowColorPink100",
        @"category": @"boxShadowColor",
        @"type": @"pink",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fbcfe8,
        @"name": @"BoxShadowColorPink200",
        @"category": @"boxShadowColor",
        @"type": @"pink",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f9a8d4,
        @"name": @"BoxShadowColorPink300",
        @"category": @"boxShadowColor",
        @"type": @"pink",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f472b6,
        @"name": @"BoxShadowColorPink400",
        @"category": @"boxShadowColor",
        @"type": @"pink",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ec4899,
        @"name": @"BoxShadowColorPink500",
        @"category": @"boxShadowColor",
        @"type": @"pink",
        @"item": @"500"
        },
      @"600": @{
        @"value": #db2777,
        @"name": @"BoxShadowColorPink600",
        @"category": @"boxShadowColor",
        @"type": @"pink",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be185d,
        @"name": @"BoxShadowColorPink700",
        @"category": @"boxShadowColor",
        @"type": @"pink",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9d174d,
        @"name": @"BoxShadowColorPink800",
        @"category": @"boxShadowColor",
        @"type": @"pink",
        @"item": @"800"
        },
      @"900": @{
        @"value": #831843,
        @"name": @"BoxShadowColorPink900",
        @"category": @"boxShadowColor",
        @"type": @"pink",
        @"item": @"900"
        },
      @"950": @{
        @"value": #500724,
        @"name": @"BoxShadowColorPink950",
        @"category": @"boxShadowColor",
        @"type": @"pink",
        @"item": @"950"
        }
      },
    @"rose": @{
      @"50": @{
        @"value": #fff1f2,
        @"name": @"BoxShadowColorRose50",
        @"category": @"boxShadowColor",
        @"type": @"rose",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffe4e6,
        @"name": @"BoxShadowColorRose100",
        @"category": @"boxShadowColor",
        @"type": @"rose",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecdd3,
        @"name": @"BoxShadowColorRose200",
        @"category": @"boxShadowColor",
        @"type": @"rose",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fda4af,
        @"name": @"BoxShadowColorRose300",
        @"category": @"boxShadowColor",
        @"type": @"rose",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb7185,
        @"name": @"BoxShadowColorRose400",
        @"category": @"boxShadowColor",
        @"type": @"rose",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f43f5e,
        @"name": @"BoxShadowColorRose500",
        @"category": @"boxShadowColor",
        @"type": @"rose",
        @"item": @"500"
        },
      @"600": @{
        @"value": #e11d48,
        @"name": @"BoxShadowColorRose600",
        @"category": @"boxShadowColor",
        @"type": @"rose",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be123c,
        @"name": @"BoxShadowColorRose700",
        @"category": @"boxShadowColor",
        @"type": @"rose",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9f1239,
        @"name": @"BoxShadowColorRose800",
        @"category": @"boxShadowColor",
        @"type": @"rose",
        @"item": @"800"
        },
      @"900": @{
        @"value": #881337,
        @"name": @"BoxShadowColorRose900",
        @"category": @"boxShadowColor",
        @"type": @"rose",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4c0519,
        @"name": @"BoxShadowColorRose950",
        @"category": @"boxShadowColor",
        @"type": @"rose",
        @"item": @"950"
        }
      }
    },
  @"brightness": @{
    @"0": @{
      @"value": 0,
      @"name": @"Brightness0",
      @"category": @"brightness",
      @"type": @"0"
      },
    @"50": @{
      @"value": .5,
      @"name": @"Brightness50",
      @"category": @"brightness",
      @"type": @"50"
      },
    @"75": @{
      @"value": .75,
      @"name": @"Brightness75",
      @"category": @"brightness",
      @"type": @"75"
      },
    @"90": @{
      @"value": .9,
      @"name": @"Brightness90",
      @"category": @"brightness",
      @"type": @"90"
      },
    @"95": @{
      @"value": .95,
      @"name": @"Brightness95",
      @"category": @"brightness",
      @"type": @"95"
      },
    @"100": @{
      @"value": 1,
      @"name": @"Brightness100",
      @"category": @"brightness",
      @"type": @"100"
      },
    @"105": @{
      @"value": 1.05,
      @"name": @"Brightness105",
      @"category": @"brightness",
      @"type": @"105"
      },
    @"110": @{
      @"value": 1.1,
      @"name": @"Brightness110",
      @"category": @"brightness",
      @"type": @"110"
      },
    @"125": @{
      @"value": 1.25,
      @"name": @"Brightness125",
      @"category": @"brightness",
      @"type": @"125"
      },
    @"150": @{
      @"value": 1.5,
      @"name": @"Brightness150",
      @"category": @"brightness",
      @"type": @"150"
      },
    @"200": @{
      @"value": 2,
      @"name": @"Brightness200",
      @"category": @"brightness",
      @"type": @"200"
      }
    },
  @"caretColor": @{
    @"inherit": @{
      @"value": inherit,
      @"name": @"CaretColorInherit",
      @"category": @"caretColor",
      @"type": @"inherit"
      },
    @"current": @{
      @"value": currentColor,
      @"name": @"CaretColorCurrent",
      @"category": @"caretColor",
      @"type": @"current"
      },
    @"transparent": @{
      @"value": transparent,
      @"name": @"CaretColorTransparent",
      @"category": @"caretColor",
      @"type": @"transparent"
      },
    @"black": @{
      @"value": #000,
      @"name": @"CaretColorBlack",
      @"category": @"caretColor",
      @"type": @"black"
      },
    @"white": @{
      @"value": #fff,
      @"name": @"CaretColorWhite",
      @"category": @"caretColor",
      @"type": @"white"
      },
    @"slate": @{
      @"50": @{
        @"value": #f8fafc,
        @"name": @"CaretColorSlate50",
        @"category": @"caretColor",
        @"type": @"slate",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f1f5f9,
        @"name": @"CaretColorSlate100",
        @"category": @"caretColor",
        @"type": @"slate",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e2e8f0,
        @"name": @"CaretColorSlate200",
        @"category": @"caretColor",
        @"type": @"slate",
        @"item": @"200"
        },
      @"300": @{
        @"value": #cbd5e1,
        @"name": @"CaretColorSlate300",
        @"category": @"caretColor",
        @"type": @"slate",
        @"item": @"300"
        },
      @"400": @{
        @"value": #94a3b8,
        @"name": @"CaretColorSlate400",
        @"category": @"caretColor",
        @"type": @"slate",
        @"item": @"400"
        },
      @"500": @{
        @"value": #64748b,
        @"name": @"CaretColorSlate500",
        @"category": @"caretColor",
        @"type": @"slate",
        @"item": @"500"
        },
      @"600": @{
        @"value": #475569,
        @"name": @"CaretColorSlate600",
        @"category": @"caretColor",
        @"type": @"slate",
        @"item": @"600"
        },
      @"700": @{
        @"value": #334155,
        @"name": @"CaretColorSlate700",
        @"category": @"caretColor",
        @"type": @"slate",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e293b,
        @"name": @"CaretColorSlate800",
        @"category": @"caretColor",
        @"type": @"slate",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0f172a,
        @"name": @"CaretColorSlate900",
        @"category": @"caretColor",
        @"type": @"slate",
        @"item": @"900"
        },
      @"950": @{
        @"value": #020617,
        @"name": @"CaretColorSlate950",
        @"category": @"caretColor",
        @"type": @"slate",
        @"item": @"950"
        }
      },
    @"gray": @{
      @"50": @{
        @"value": #f9fafb,
        @"name": @"CaretColorGray50",
        @"category": @"caretColor",
        @"type": @"gray",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3f4f6,
        @"name": @"CaretColorGray100",
        @"category": @"caretColor",
        @"type": @"gray",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e7eb,
        @"name": @"CaretColorGray200",
        @"category": @"caretColor",
        @"type": @"gray",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d1d5db,
        @"name": @"CaretColorGray300",
        @"category": @"caretColor",
        @"type": @"gray",
        @"item": @"300"
        },
      @"400": @{
        @"value": #9ca3af,
        @"name": @"CaretColorGray400",
        @"category": @"caretColor",
        @"type": @"gray",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6b7280,
        @"name": @"CaretColorGray500",
        @"category": @"caretColor",
        @"type": @"gray",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4b5563,
        @"name": @"CaretColorGray600",
        @"category": @"caretColor",
        @"type": @"gray",
        @"item": @"600"
        },
      @"700": @{
        @"value": #374151,
        @"name": @"CaretColorGray700",
        @"category": @"caretColor",
        @"type": @"gray",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1f2937,
        @"name": @"CaretColorGray800",
        @"category": @"caretColor",
        @"type": @"gray",
        @"item": @"800"
        },
      @"900": @{
        @"value": #111827,
        @"name": @"CaretColorGray900",
        @"category": @"caretColor",
        @"type": @"gray",
        @"item": @"900"
        },
      @"950": @{
        @"value": #030712,
        @"name": @"CaretColorGray950",
        @"category": @"caretColor",
        @"type": @"gray",
        @"item": @"950"
        }
      },
    @"zinc": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"CaretColorZinc50",
        @"category": @"caretColor",
        @"type": @"zinc",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f4f4f5,
        @"name": @"CaretColorZinc100",
        @"category": @"caretColor",
        @"type": @"zinc",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e4e4e7,
        @"name": @"CaretColorZinc200",
        @"category": @"caretColor",
        @"type": @"zinc",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d8,
        @"name": @"CaretColorZinc300",
        @"category": @"caretColor",
        @"type": @"zinc",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a1a1aa,
        @"name": @"CaretColorZinc400",
        @"category": @"caretColor",
        @"type": @"zinc",
        @"item": @"400"
        },
      @"500": @{
        @"value": #71717a,
        @"name": @"CaretColorZinc500",
        @"category": @"caretColor",
        @"type": @"zinc",
        @"item": @"500"
        },
      @"600": @{
        @"value": #52525b,
        @"name": @"CaretColorZinc600",
        @"category": @"caretColor",
        @"type": @"zinc",
        @"item": @"600"
        },
      @"700": @{
        @"value": #3f3f46,
        @"name": @"CaretColorZinc700",
        @"category": @"caretColor",
        @"type": @"zinc",
        @"item": @"700"
        },
      @"800": @{
        @"value": #27272a,
        @"name": @"CaretColorZinc800",
        @"category": @"caretColor",
        @"type": @"zinc",
        @"item": @"800"
        },
      @"900": @{
        @"value": #18181b,
        @"name": @"CaretColorZinc900",
        @"category": @"caretColor",
        @"type": @"zinc",
        @"item": @"900"
        },
      @"950": @{
        @"value": #09090b,
        @"name": @"CaretColorZinc950",
        @"category": @"caretColor",
        @"type": @"zinc",
        @"item": @"950"
        }
      },
    @"neutral": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"CaretColorNeutral50",
        @"category": @"caretColor",
        @"type": @"neutral",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f5,
        @"name": @"CaretColorNeutral100",
        @"category": @"caretColor",
        @"type": @"neutral",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e5e5,
        @"name": @"CaretColorNeutral200",
        @"category": @"caretColor",
        @"type": @"neutral",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d4,
        @"name": @"CaretColorNeutral300",
        @"category": @"caretColor",
        @"type": @"neutral",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3a3a3,
        @"name": @"CaretColorNeutral400",
        @"category": @"caretColor",
        @"type": @"neutral",
        @"item": @"400"
        },
      @"500": @{
        @"value": #737373,
        @"name": @"CaretColorNeutral500",
        @"category": @"caretColor",
        @"type": @"neutral",
        @"item": @"500"
        },
      @"600": @{
        @"value": #525252,
        @"name": @"CaretColorNeutral600",
        @"category": @"caretColor",
        @"type": @"neutral",
        @"item": @"600"
        },
      @"700": @{
        @"value": #404040,
        @"name": @"CaretColorNeutral700",
        @"category": @"caretColor",
        @"type": @"neutral",
        @"item": @"700"
        },
      @"800": @{
        @"value": #262626,
        @"name": @"CaretColorNeutral800",
        @"category": @"caretColor",
        @"type": @"neutral",
        @"item": @"800"
        },
      @"900": @{
        @"value": #171717,
        @"name": @"CaretColorNeutral900",
        @"category": @"caretColor",
        @"type": @"neutral",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0a0a0a,
        @"name": @"CaretColorNeutral950",
        @"category": @"caretColor",
        @"type": @"neutral",
        @"item": @"950"
        }
      },
    @"stone": @{
      @"50": @{
        @"value": #fafaf9,
        @"name": @"CaretColorStone50",
        @"category": @"caretColor",
        @"type": @"stone",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f4,
        @"name": @"CaretColorStone100",
        @"category": @"caretColor",
        @"type": @"stone",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e7e5e4,
        @"name": @"CaretColorStone200",
        @"category": @"caretColor",
        @"type": @"stone",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d6d3d1,
        @"name": @"CaretColorStone300",
        @"category": @"caretColor",
        @"type": @"stone",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a8a29e,
        @"name": @"CaretColorStone400",
        @"category": @"caretColor",
        @"type": @"stone",
        @"item": @"400"
        },
      @"500": @{
        @"value": #78716c,
        @"name": @"CaretColorStone500",
        @"category": @"caretColor",
        @"type": @"stone",
        @"item": @"500"
        },
      @"600": @{
        @"value": #57534e,
        @"name": @"CaretColorStone600",
        @"category": @"caretColor",
        @"type": @"stone",
        @"item": @"600"
        },
      @"700": @{
        @"value": #44403c,
        @"name": @"CaretColorStone700",
        @"category": @"caretColor",
        @"type": @"stone",
        @"item": @"700"
        },
      @"800": @{
        @"value": #292524,
        @"name": @"CaretColorStone800",
        @"category": @"caretColor",
        @"type": @"stone",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1c1917,
        @"name": @"CaretColorStone900",
        @"category": @"caretColor",
        @"type": @"stone",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0c0a09,
        @"name": @"CaretColorStone950",
        @"category": @"caretColor",
        @"type": @"stone",
        @"item": @"950"
        }
      },
    @"red": @{
      @"50": @{
        @"value": #fef2f2,
        @"name": @"CaretColorRed50",
        @"category": @"caretColor",
        @"type": @"red",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fee2e2,
        @"name": @"CaretColorRed100",
        @"category": @"caretColor",
        @"type": @"red",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecaca,
        @"name": @"CaretColorRed200",
        @"category": @"caretColor",
        @"type": @"red",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fca5a5,
        @"name": @"CaretColorRed300",
        @"category": @"caretColor",
        @"type": @"red",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f87171,
        @"name": @"CaretColorRed400",
        @"category": @"caretColor",
        @"type": @"red",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ef4444,
        @"name": @"CaretColorRed500",
        @"category": @"caretColor",
        @"type": @"red",
        @"item": @"500"
        },
      @"600": @{
        @"value": #dc2626,
        @"name": @"CaretColorRed600",
        @"category": @"caretColor",
        @"type": @"red",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b91c1c,
        @"name": @"CaretColorRed700",
        @"category": @"caretColor",
        @"type": @"red",
        @"item": @"700"
        },
      @"800": @{
        @"value": #991b1b,
        @"name": @"CaretColorRed800",
        @"category": @"caretColor",
        @"type": @"red",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7f1d1d,
        @"name": @"CaretColorRed900",
        @"category": @"caretColor",
        @"type": @"red",
        @"item": @"900"
        },
      @"950": @{
        @"value": #450a0a,
        @"name": @"CaretColorRed950",
        @"category": @"caretColor",
        @"type": @"red",
        @"item": @"950"
        }
      },
    @"orange": @{
      @"50": @{
        @"value": #fff7ed,
        @"name": @"CaretColorOrange50",
        @"category": @"caretColor",
        @"type": @"orange",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffedd5,
        @"name": @"CaretColorOrange100",
        @"category": @"caretColor",
        @"type": @"orange",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fed7aa,
        @"name": @"CaretColorOrange200",
        @"category": @"caretColor",
        @"type": @"orange",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fdba74,
        @"name": @"CaretColorOrange300",
        @"category": @"caretColor",
        @"type": @"orange",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb923c,
        @"name": @"CaretColorOrange400",
        @"category": @"caretColor",
        @"type": @"orange",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f97316,
        @"name": @"CaretColorOrange500",
        @"category": @"caretColor",
        @"type": @"orange",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ea580c,
        @"name": @"CaretColorOrange600",
        @"category": @"caretColor",
        @"type": @"orange",
        @"item": @"600"
        },
      @"700": @{
        @"value": #c2410c,
        @"name": @"CaretColorOrange700",
        @"category": @"caretColor",
        @"type": @"orange",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9a3412,
        @"name": @"CaretColorOrange800",
        @"category": @"caretColor",
        @"type": @"orange",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7c2d12,
        @"name": @"CaretColorOrange900",
        @"category": @"caretColor",
        @"type": @"orange",
        @"item": @"900"
        },
      @"950": @{
        @"value": #431407,
        @"name": @"CaretColorOrange950",
        @"category": @"caretColor",
        @"type": @"orange",
        @"item": @"950"
        }
      },
    @"amber": @{
      @"50": @{
        @"value": #fffbeb,
        @"name": @"CaretColorAmber50",
        @"category": @"caretColor",
        @"type": @"amber",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef3c7,
        @"name": @"CaretColorAmber100",
        @"category": @"caretColor",
        @"type": @"amber",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fde68a,
        @"name": @"CaretColorAmber200",
        @"category": @"caretColor",
        @"type": @"amber",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fcd34d,
        @"name": @"CaretColorAmber300",
        @"category": @"caretColor",
        @"type": @"amber",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fbbf24,
        @"name": @"CaretColorAmber400",
        @"category": @"caretColor",
        @"type": @"amber",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f59e0b,
        @"name": @"CaretColorAmber500",
        @"category": @"caretColor",
        @"type": @"amber",
        @"item": @"500"
        },
      @"600": @{
        @"value": #d97706,
        @"name": @"CaretColorAmber600",
        @"category": @"caretColor",
        @"type": @"amber",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b45309,
        @"name": @"CaretColorAmber700",
        @"category": @"caretColor",
        @"type": @"amber",
        @"item": @"700"
        },
      @"800": @{
        @"value": #92400e,
        @"name": @"CaretColorAmber800",
        @"category": @"caretColor",
        @"type": @"amber",
        @"item": @"800"
        },
      @"900": @{
        @"value": #78350f,
        @"name": @"CaretColorAmber900",
        @"category": @"caretColor",
        @"type": @"amber",
        @"item": @"900"
        },
      @"950": @{
        @"value": #451a03,
        @"name": @"CaretColorAmber950",
        @"category": @"caretColor",
        @"type": @"amber",
        @"item": @"950"
        }
      },
    @"yellow": @{
      @"50": @{
        @"value": #fefce8,
        @"name": @"CaretColorYellow50",
        @"category": @"caretColor",
        @"type": @"yellow",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef9c3,
        @"name": @"CaretColorYellow100",
        @"category": @"caretColor",
        @"type": @"yellow",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fef08a,
        @"name": @"CaretColorYellow200",
        @"category": @"caretColor",
        @"type": @"yellow",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fde047,
        @"name": @"CaretColorYellow300",
        @"category": @"caretColor",
        @"type": @"yellow",
        @"item": @"300"
        },
      @"400": @{
        @"value": #facc15,
        @"name": @"CaretColorYellow400",
        @"category": @"caretColor",
        @"type": @"yellow",
        @"item": @"400"
        },
      @"500": @{
        @"value": #eab308,
        @"name": @"CaretColorYellow500",
        @"category": @"caretColor",
        @"type": @"yellow",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ca8a04,
        @"name": @"CaretColorYellow600",
        @"category": @"caretColor",
        @"type": @"yellow",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a16207,
        @"name": @"CaretColorYellow700",
        @"category": @"caretColor",
        @"type": @"yellow",
        @"item": @"700"
        },
      @"800": @{
        @"value": #854d0e,
        @"name": @"CaretColorYellow800",
        @"category": @"caretColor",
        @"type": @"yellow",
        @"item": @"800"
        },
      @"900": @{
        @"value": #713f12,
        @"name": @"CaretColorYellow900",
        @"category": @"caretColor",
        @"type": @"yellow",
        @"item": @"900"
        },
      @"950": @{
        @"value": #422006,
        @"name": @"CaretColorYellow950",
        @"category": @"caretColor",
        @"type": @"yellow",
        @"item": @"950"
        }
      },
    @"lime": @{
      @"50": @{
        @"value": #f7fee7,
        @"name": @"CaretColorLime50",
        @"category": @"caretColor",
        @"type": @"lime",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ecfccb,
        @"name": @"CaretColorLime100",
        @"category": @"caretColor",
        @"type": @"lime",
        @"item": @"100"
        },
      @"200": @{
        @"value": #d9f99d,
        @"name": @"CaretColorLime200",
        @"category": @"caretColor",
        @"type": @"lime",
        @"item": @"200"
        },
      @"300": @{
        @"value": #bef264,
        @"name": @"CaretColorLime300",
        @"category": @"caretColor",
        @"type": @"lime",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3e635,
        @"name": @"CaretColorLime400",
        @"category": @"caretColor",
        @"type": @"lime",
        @"item": @"400"
        },
      @"500": @{
        @"value": #84cc16,
        @"name": @"CaretColorLime500",
        @"category": @"caretColor",
        @"type": @"lime",
        @"item": @"500"
        },
      @"600": @{
        @"value": #65a30d,
        @"name": @"CaretColorLime600",
        @"category": @"caretColor",
        @"type": @"lime",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4d7c0f,
        @"name": @"CaretColorLime700",
        @"category": @"caretColor",
        @"type": @"lime",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3f6212,
        @"name": @"CaretColorLime800",
        @"category": @"caretColor",
        @"type": @"lime",
        @"item": @"800"
        },
      @"900": @{
        @"value": #365314,
        @"name": @"CaretColorLime900",
        @"category": @"caretColor",
        @"type": @"lime",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1a2e05,
        @"name": @"CaretColorLime950",
        @"category": @"caretColor",
        @"type": @"lime",
        @"item": @"950"
        }
      },
    @"green": @{
      @"50": @{
        @"value": #f0fdf4,
        @"name": @"CaretColorGreen50",
        @"category": @"caretColor",
        @"type": @"green",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dcfce7,
        @"name": @"CaretColorGreen100",
        @"category": @"caretColor",
        @"type": @"green",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bbf7d0,
        @"name": @"CaretColorGreen200",
        @"category": @"caretColor",
        @"type": @"green",
        @"item": @"200"
        },
      @"300": @{
        @"value": #86efac,
        @"name": @"CaretColorGreen300",
        @"category": @"caretColor",
        @"type": @"green",
        @"item": @"300"
        },
      @"400": @{
        @"value": #4ade80,
        @"name": @"CaretColorGreen400",
        @"category": @"caretColor",
        @"type": @"green",
        @"item": @"400"
        },
      @"500": @{
        @"value": #22c55e,
        @"name": @"CaretColorGreen500",
        @"category": @"caretColor",
        @"type": @"green",
        @"item": @"500"
        },
      @"600": @{
        @"value": #16a34a,
        @"name": @"CaretColorGreen600",
        @"category": @"caretColor",
        @"type": @"green",
        @"item": @"600"
        },
      @"700": @{
        @"value": #15803d,
        @"name": @"CaretColorGreen700",
        @"category": @"caretColor",
        @"type": @"green",
        @"item": @"700"
        },
      @"800": @{
        @"value": #166534,
        @"name": @"CaretColorGreen800",
        @"category": @"caretColor",
        @"type": @"green",
        @"item": @"800"
        },
      @"900": @{
        @"value": #14532d,
        @"name": @"CaretColorGreen900",
        @"category": @"caretColor",
        @"type": @"green",
        @"item": @"900"
        },
      @"950": @{
        @"value": #052e16,
        @"name": @"CaretColorGreen950",
        @"category": @"caretColor",
        @"type": @"green",
        @"item": @"950"
        }
      },
    @"emerald": @{
      @"50": @{
        @"value": #ecfdf5,
        @"name": @"CaretColorEmerald50",
        @"category": @"caretColor",
        @"type": @"emerald",
        @"item": @"50"
        },
      @"100": @{
        @"value": #d1fae5,
        @"name": @"CaretColorEmerald100",
        @"category": @"caretColor",
        @"type": @"emerald",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a7f3d0,
        @"name": @"CaretColorEmerald200",
        @"category": @"caretColor",
        @"type": @"emerald",
        @"item": @"200"
        },
      @"300": @{
        @"value": #6ee7b7,
        @"name": @"CaretColorEmerald300",
        @"category": @"caretColor",
        @"type": @"emerald",
        @"item": @"300"
        },
      @"400": @{
        @"value": #34d399,
        @"name": @"CaretColorEmerald400",
        @"category": @"caretColor",
        @"type": @"emerald",
        @"item": @"400"
        },
      @"500": @{
        @"value": #10b981,
        @"name": @"CaretColorEmerald500",
        @"category": @"caretColor",
        @"type": @"emerald",
        @"item": @"500"
        },
      @"600": @{
        @"value": #059669,
        @"name": @"CaretColorEmerald600",
        @"category": @"caretColor",
        @"type": @"emerald",
        @"item": @"600"
        },
      @"700": @{
        @"value": #047857,
        @"name": @"CaretColorEmerald700",
        @"category": @"caretColor",
        @"type": @"emerald",
        @"item": @"700"
        },
      @"800": @{
        @"value": #065f46,
        @"name": @"CaretColorEmerald800",
        @"category": @"caretColor",
        @"type": @"emerald",
        @"item": @"800"
        },
      @"900": @{
        @"value": #064e3b,
        @"name": @"CaretColorEmerald900",
        @"category": @"caretColor",
        @"type": @"emerald",
        @"item": @"900"
        },
      @"950": @{
        @"value": #022c22,
        @"name": @"CaretColorEmerald950",
        @"category": @"caretColor",
        @"type": @"emerald",
        @"item": @"950"
        }
      },
    @"teal": @{
      @"50": @{
        @"value": #f0fdfa,
        @"name": @"CaretColorTeal50",
        @"category": @"caretColor",
        @"type": @"teal",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ccfbf1,
        @"name": @"CaretColorTeal100",
        @"category": @"caretColor",
        @"type": @"teal",
        @"item": @"100"
        },
      @"200": @{
        @"value": #99f6e4,
        @"name": @"CaretColorTeal200",
        @"category": @"caretColor",
        @"type": @"teal",
        @"item": @"200"
        },
      @"300": @{
        @"value": #5eead4,
        @"name": @"CaretColorTeal300",
        @"category": @"caretColor",
        @"type": @"teal",
        @"item": @"300"
        },
      @"400": @{
        @"value": #2dd4bf,
        @"name": @"CaretColorTeal400",
        @"category": @"caretColor",
        @"type": @"teal",
        @"item": @"400"
        },
      @"500": @{
        @"value": #14b8a6,
        @"name": @"CaretColorTeal500",
        @"category": @"caretColor",
        @"type": @"teal",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0d9488,
        @"name": @"CaretColorTeal600",
        @"category": @"caretColor",
        @"type": @"teal",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0f766e,
        @"name": @"CaretColorTeal700",
        @"category": @"caretColor",
        @"type": @"teal",
        @"item": @"700"
        },
      @"800": @{
        @"value": #115e59,
        @"name": @"CaretColorTeal800",
        @"category": @"caretColor",
        @"type": @"teal",
        @"item": @"800"
        },
      @"900": @{
        @"value": #134e4a,
        @"name": @"CaretColorTeal900",
        @"category": @"caretColor",
        @"type": @"teal",
        @"item": @"900"
        },
      @"950": @{
        @"value": #042f2e,
        @"name": @"CaretColorTeal950",
        @"category": @"caretColor",
        @"type": @"teal",
        @"item": @"950"
        }
      },
    @"cyan": @{
      @"50": @{
        @"value": #ecfeff,
        @"name": @"CaretColorCyan50",
        @"category": @"caretColor",
        @"type": @"cyan",
        @"item": @"50"
        },
      @"100": @{
        @"value": #cffafe,
        @"name": @"CaretColorCyan100",
        @"category": @"caretColor",
        @"type": @"cyan",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a5f3fc,
        @"name": @"CaretColorCyan200",
        @"category": @"caretColor",
        @"type": @"cyan",
        @"item": @"200"
        },
      @"300": @{
        @"value": #67e8f9,
        @"name": @"CaretColorCyan300",
        @"category": @"caretColor",
        @"type": @"cyan",
        @"item": @"300"
        },
      @"400": @{
        @"value": #22d3ee,
        @"name": @"CaretColorCyan400",
        @"category": @"caretColor",
        @"type": @"cyan",
        @"item": @"400"
        },
      @"500": @{
        @"value": #06b6d4,
        @"name": @"CaretColorCyan500",
        @"category": @"caretColor",
        @"type": @"cyan",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0891b2,
        @"name": @"CaretColorCyan600",
        @"category": @"caretColor",
        @"type": @"cyan",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0e7490,
        @"name": @"CaretColorCyan700",
        @"category": @"caretColor",
        @"type": @"cyan",
        @"item": @"700"
        },
      @"800": @{
        @"value": #155e75,
        @"name": @"CaretColorCyan800",
        @"category": @"caretColor",
        @"type": @"cyan",
        @"item": @"800"
        },
      @"900": @{
        @"value": #164e63,
        @"name": @"CaretColorCyan900",
        @"category": @"caretColor",
        @"type": @"cyan",
        @"item": @"900"
        },
      @"950": @{
        @"value": #083344,
        @"name": @"CaretColorCyan950",
        @"category": @"caretColor",
        @"type": @"cyan",
        @"item": @"950"
        }
      },
    @"sky": @{
      @"50": @{
        @"value": #f0f9ff,
        @"name": @"CaretColorSky50",
        @"category": @"caretColor",
        @"type": @"sky",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0f2fe,
        @"name": @"CaretColorSky100",
        @"category": @"caretColor",
        @"type": @"sky",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bae6fd,
        @"name": @"CaretColorSky200",
        @"category": @"caretColor",
        @"type": @"sky",
        @"item": @"200"
        },
      @"300": @{
        @"value": #7dd3fc,
        @"name": @"CaretColorSky300",
        @"category": @"caretColor",
        @"type": @"sky",
        @"item": @"300"
        },
      @"400": @{
        @"value": #38bdf8,
        @"name": @"CaretColorSky400",
        @"category": @"caretColor",
        @"type": @"sky",
        @"item": @"400"
        },
      @"500": @{
        @"value": #0ea5e9,
        @"name": @"CaretColorSky500",
        @"category": @"caretColor",
        @"type": @"sky",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0284c7,
        @"name": @"CaretColorSky600",
        @"category": @"caretColor",
        @"type": @"sky",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0369a1,
        @"name": @"CaretColorSky700",
        @"category": @"caretColor",
        @"type": @"sky",
        @"item": @"700"
        },
      @"800": @{
        @"value": #075985,
        @"name": @"CaretColorSky800",
        @"category": @"caretColor",
        @"type": @"sky",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0c4a6e,
        @"name": @"CaretColorSky900",
        @"category": @"caretColor",
        @"type": @"sky",
        @"item": @"900"
        },
      @"950": @{
        @"value": #082f49,
        @"name": @"CaretColorSky950",
        @"category": @"caretColor",
        @"type": @"sky",
        @"item": @"950"
        }
      },
    @"blue": @{
      @"50": @{
        @"value": #eff6ff,
        @"name": @"CaretColorBlue50",
        @"category": @"caretColor",
        @"type": @"blue",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dbeafe,
        @"name": @"CaretColorBlue100",
        @"category": @"caretColor",
        @"type": @"blue",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bfdbfe,
        @"name": @"CaretColorBlue200",
        @"category": @"caretColor",
        @"type": @"blue",
        @"item": @"200"
        },
      @"300": @{
        @"value": #93c5fd,
        @"name": @"CaretColorBlue300",
        @"category": @"caretColor",
        @"type": @"blue",
        @"item": @"300"
        },
      @"400": @{
        @"value": #60a5fa,
        @"name": @"CaretColorBlue400",
        @"category": @"caretColor",
        @"type": @"blue",
        @"item": @"400"
        },
      @"500": @{
        @"value": #3b82f6,
        @"name": @"CaretColorBlue500",
        @"category": @"caretColor",
        @"type": @"blue",
        @"item": @"500"
        },
      @"600": @{
        @"value": #2563eb,
        @"name": @"CaretColorBlue600",
        @"category": @"caretColor",
        @"type": @"blue",
        @"item": @"600"
        },
      @"700": @{
        @"value": #1d4ed8,
        @"name": @"CaretColorBlue700",
        @"category": @"caretColor",
        @"type": @"blue",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e40af,
        @"name": @"CaretColorBlue800",
        @"category": @"caretColor",
        @"type": @"blue",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1e3a8a,
        @"name": @"CaretColorBlue900",
        @"category": @"caretColor",
        @"type": @"blue",
        @"item": @"900"
        },
      @"950": @{
        @"value": #172554,
        @"name": @"CaretColorBlue950",
        @"category": @"caretColor",
        @"type": @"blue",
        @"item": @"950"
        }
      },
    @"indigo": @{
      @"50": @{
        @"value": #eef2ff,
        @"name": @"CaretColorIndigo50",
        @"category": @"caretColor",
        @"type": @"indigo",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0e7ff,
        @"name": @"CaretColorIndigo100",
        @"category": @"caretColor",
        @"type": @"indigo",
        @"item": @"100"
        },
      @"200": @{
        @"value": #c7d2fe,
        @"name": @"CaretColorIndigo200",
        @"category": @"caretColor",
        @"type": @"indigo",
        @"item": @"200"
        },
      @"300": @{
        @"value": #a5b4fc,
        @"name": @"CaretColorIndigo300",
        @"category": @"caretColor",
        @"type": @"indigo",
        @"item": @"300"
        },
      @"400": @{
        @"value": #818cf8,
        @"name": @"CaretColorIndigo400",
        @"category": @"caretColor",
        @"type": @"indigo",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6366f1,
        @"name": @"CaretColorIndigo500",
        @"category": @"caretColor",
        @"type": @"indigo",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4f46e5,
        @"name": @"CaretColorIndigo600",
        @"category": @"caretColor",
        @"type": @"indigo",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4338ca,
        @"name": @"CaretColorIndigo700",
        @"category": @"caretColor",
        @"type": @"indigo",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3730a3,
        @"name": @"CaretColorIndigo800",
        @"category": @"caretColor",
        @"type": @"indigo",
        @"item": @"800"
        },
      @"900": @{
        @"value": #312e81,
        @"name": @"CaretColorIndigo900",
        @"category": @"caretColor",
        @"type": @"indigo",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1e1b4b,
        @"name": @"CaretColorIndigo950",
        @"category": @"caretColor",
        @"type": @"indigo",
        @"item": @"950"
        }
      },
    @"violet": @{
      @"50": @{
        @"value": #f5f3ff,
        @"name": @"CaretColorViolet50",
        @"category": @"caretColor",
        @"type": @"violet",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ede9fe,
        @"name": @"CaretColorViolet100",
        @"category": @"caretColor",
        @"type": @"violet",
        @"item": @"100"
        },
      @"200": @{
        @"value": #ddd6fe,
        @"name": @"CaretColorViolet200",
        @"category": @"caretColor",
        @"type": @"violet",
        @"item": @"200"
        },
      @"300": @{
        @"value": #c4b5fd,
        @"name": @"CaretColorViolet300",
        @"category": @"caretColor",
        @"type": @"violet",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a78bfa,
        @"name": @"CaretColorViolet400",
        @"category": @"caretColor",
        @"type": @"violet",
        @"item": @"400"
        },
      @"500": @{
        @"value": #8b5cf6,
        @"name": @"CaretColorViolet500",
        @"category": @"caretColor",
        @"type": @"violet",
        @"item": @"500"
        },
      @"600": @{
        @"value": #7c3aed,
        @"name": @"CaretColorViolet600",
        @"category": @"caretColor",
        @"type": @"violet",
        @"item": @"600"
        },
      @"700": @{
        @"value": #6d28d9,
        @"name": @"CaretColorViolet700",
        @"category": @"caretColor",
        @"type": @"violet",
        @"item": @"700"
        },
      @"800": @{
        @"value": #5b21b6,
        @"name": @"CaretColorViolet800",
        @"category": @"caretColor",
        @"type": @"violet",
        @"item": @"800"
        },
      @"900": @{
        @"value": #4c1d95,
        @"name": @"CaretColorViolet900",
        @"category": @"caretColor",
        @"type": @"violet",
        @"item": @"900"
        },
      @"950": @{
        @"value": #2e1065,
        @"name": @"CaretColorViolet950",
        @"category": @"caretColor",
        @"type": @"violet",
        @"item": @"950"
        }
      },
    @"purple": @{
      @"50": @{
        @"value": #faf5ff,
        @"name": @"CaretColorPurple50",
        @"category": @"caretColor",
        @"type": @"purple",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3e8ff,
        @"name": @"CaretColorPurple100",
        @"category": @"caretColor",
        @"type": @"purple",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e9d5ff,
        @"name": @"CaretColorPurple200",
        @"category": @"caretColor",
        @"type": @"purple",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d8b4fe,
        @"name": @"CaretColorPurple300",
        @"category": @"caretColor",
        @"type": @"purple",
        @"item": @"300"
        },
      @"400": @{
        @"value": #c084fc,
        @"name": @"CaretColorPurple400",
        @"category": @"caretColor",
        @"type": @"purple",
        @"item": @"400"
        },
      @"500": @{
        @"value": #a855f7,
        @"name": @"CaretColorPurple500",
        @"category": @"caretColor",
        @"type": @"purple",
        @"item": @"500"
        },
      @"600": @{
        @"value": #9333ea,
        @"name": @"CaretColorPurple600",
        @"category": @"caretColor",
        @"type": @"purple",
        @"item": @"600"
        },
      @"700": @{
        @"value": #7e22ce,
        @"name": @"CaretColorPurple700",
        @"category": @"caretColor",
        @"type": @"purple",
        @"item": @"700"
        },
      @"800": @{
        @"value": #6b21a8,
        @"name": @"CaretColorPurple800",
        @"category": @"caretColor",
        @"type": @"purple",
        @"item": @"800"
        },
      @"900": @{
        @"value": #581c87,
        @"name": @"CaretColorPurple900",
        @"category": @"caretColor",
        @"type": @"purple",
        @"item": @"900"
        },
      @"950": @{
        @"value": #3b0764,
        @"name": @"CaretColorPurple950",
        @"category": @"caretColor",
        @"type": @"purple",
        @"item": @"950"
        }
      },
    @"fuchsia": @{
      @"50": @{
        @"value": #fdf4ff,
        @"name": @"CaretColorFuchsia50",
        @"category": @"caretColor",
        @"type": @"fuchsia",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fae8ff,
        @"name": @"CaretColorFuchsia100",
        @"category": @"caretColor",
        @"type": @"fuchsia",
        @"item": @"100"
        },
      @"200": @{
        @"value": #f5d0fe,
        @"name": @"CaretColorFuchsia200",
        @"category": @"caretColor",
        @"type": @"fuchsia",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f0abfc,
        @"name": @"CaretColorFuchsia300",
        @"category": @"caretColor",
        @"type": @"fuchsia",
        @"item": @"300"
        },
      @"400": @{
        @"value": #e879f9,
        @"name": @"CaretColorFuchsia400",
        @"category": @"caretColor",
        @"type": @"fuchsia",
        @"item": @"400"
        },
      @"500": @{
        @"value": #d946ef,
        @"name": @"CaretColorFuchsia500",
        @"category": @"caretColor",
        @"type": @"fuchsia",
        @"item": @"500"
        },
      @"600": @{
        @"value": #c026d3,
        @"name": @"CaretColorFuchsia600",
        @"category": @"caretColor",
        @"type": @"fuchsia",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a21caf,
        @"name": @"CaretColorFuchsia700",
        @"category": @"caretColor",
        @"type": @"fuchsia",
        @"item": @"700"
        },
      @"800": @{
        @"value": #86198f,
        @"name": @"CaretColorFuchsia800",
        @"category": @"caretColor",
        @"type": @"fuchsia",
        @"item": @"800"
        },
      @"900": @{
        @"value": #701a75,
        @"name": @"CaretColorFuchsia900",
        @"category": @"caretColor",
        @"type": @"fuchsia",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4a044e,
        @"name": @"CaretColorFuchsia950",
        @"category": @"caretColor",
        @"type": @"fuchsia",
        @"item": @"950"
        }
      },
    @"pink": @{
      @"50": @{
        @"value": #fdf2f8,
        @"name": @"CaretColorPink50",
        @"category": @"caretColor",
        @"type": @"pink",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fce7f3,
        @"name": @"CaretColorPink100",
        @"category": @"caretColor",
        @"type": @"pink",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fbcfe8,
        @"name": @"CaretColorPink200",
        @"category": @"caretColor",
        @"type": @"pink",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f9a8d4,
        @"name": @"CaretColorPink300",
        @"category": @"caretColor",
        @"type": @"pink",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f472b6,
        @"name": @"CaretColorPink400",
        @"category": @"caretColor",
        @"type": @"pink",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ec4899,
        @"name": @"CaretColorPink500",
        @"category": @"caretColor",
        @"type": @"pink",
        @"item": @"500"
        },
      @"600": @{
        @"value": #db2777,
        @"name": @"CaretColorPink600",
        @"category": @"caretColor",
        @"type": @"pink",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be185d,
        @"name": @"CaretColorPink700",
        @"category": @"caretColor",
        @"type": @"pink",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9d174d,
        @"name": @"CaretColorPink800",
        @"category": @"caretColor",
        @"type": @"pink",
        @"item": @"800"
        },
      @"900": @{
        @"value": #831843,
        @"name": @"CaretColorPink900",
        @"category": @"caretColor",
        @"type": @"pink",
        @"item": @"900"
        },
      @"950": @{
        @"value": #500724,
        @"name": @"CaretColorPink950",
        @"category": @"caretColor",
        @"type": @"pink",
        @"item": @"950"
        }
      },
    @"rose": @{
      @"50": @{
        @"value": #fff1f2,
        @"name": @"CaretColorRose50",
        @"category": @"caretColor",
        @"type": @"rose",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffe4e6,
        @"name": @"CaretColorRose100",
        @"category": @"caretColor",
        @"type": @"rose",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecdd3,
        @"name": @"CaretColorRose200",
        @"category": @"caretColor",
        @"type": @"rose",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fda4af,
        @"name": @"CaretColorRose300",
        @"category": @"caretColor",
        @"type": @"rose",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb7185,
        @"name": @"CaretColorRose400",
        @"category": @"caretColor",
        @"type": @"rose",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f43f5e,
        @"name": @"CaretColorRose500",
        @"category": @"caretColor",
        @"type": @"rose",
        @"item": @"500"
        },
      @"600": @{
        @"value": #e11d48,
        @"name": @"CaretColorRose600",
        @"category": @"caretColor",
        @"type": @"rose",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be123c,
        @"name": @"CaretColorRose700",
        @"category": @"caretColor",
        @"type": @"rose",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9f1239,
        @"name": @"CaretColorRose800",
        @"category": @"caretColor",
        @"type": @"rose",
        @"item": @"800"
        },
      @"900": @{
        @"value": #881337,
        @"name": @"CaretColorRose900",
        @"category": @"caretColor",
        @"type": @"rose",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4c0519,
        @"name": @"CaretColorRose950",
        @"category": @"caretColor",
        @"type": @"rose",
        @"item": @"950"
        }
      }
    },
  @"colors": @{
    @"inherit": @{
      @"value": inherit,
      @"name": @"ColorsInherit",
      @"category": @"colors",
      @"type": @"inherit"
      },
    @"current": @{
      @"value": currentColor,
      @"name": @"ColorsCurrent",
      @"category": @"colors",
      @"type": @"current"
      },
    @"transparent": @{
      @"value": transparent,
      @"name": @"ColorsTransparent",
      @"category": @"colors",
      @"type": @"transparent"
      },
    @"black": @{
      @"value": #000,
      @"name": @"ColorsBlack",
      @"category": @"colors",
      @"type": @"black"
      },
    @"white": @{
      @"value": #fff,
      @"name": @"ColorsWhite",
      @"category": @"colors",
      @"type": @"white"
      },
    @"slate": @{
      @"50": @{
        @"value": #f8fafc,
        @"name": @"ColorsSlate50",
        @"category": @"colors",
        @"type": @"slate",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f1f5f9,
        @"name": @"ColorsSlate100",
        @"category": @"colors",
        @"type": @"slate",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e2e8f0,
        @"name": @"ColorsSlate200",
        @"category": @"colors",
        @"type": @"slate",
        @"item": @"200"
        },
      @"300": @{
        @"value": #cbd5e1,
        @"name": @"ColorsSlate300",
        @"category": @"colors",
        @"type": @"slate",
        @"item": @"300"
        },
      @"400": @{
        @"value": #94a3b8,
        @"name": @"ColorsSlate400",
        @"category": @"colors",
        @"type": @"slate",
        @"item": @"400"
        },
      @"500": @{
        @"value": #64748b,
        @"name": @"ColorsSlate500",
        @"category": @"colors",
        @"type": @"slate",
        @"item": @"500"
        },
      @"600": @{
        @"value": #475569,
        @"name": @"ColorsSlate600",
        @"category": @"colors",
        @"type": @"slate",
        @"item": @"600"
        },
      @"700": @{
        @"value": #334155,
        @"name": @"ColorsSlate700",
        @"category": @"colors",
        @"type": @"slate",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e293b,
        @"name": @"ColorsSlate800",
        @"category": @"colors",
        @"type": @"slate",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0f172a,
        @"name": @"ColorsSlate900",
        @"category": @"colors",
        @"type": @"slate",
        @"item": @"900"
        },
      @"950": @{
        @"value": #020617,
        @"name": @"ColorsSlate950",
        @"category": @"colors",
        @"type": @"slate",
        @"item": @"950"
        }
      },
    @"gray": @{
      @"50": @{
        @"value": #f9fafb,
        @"name": @"ColorsGray50",
        @"category": @"colors",
        @"type": @"gray",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3f4f6,
        @"name": @"ColorsGray100",
        @"category": @"colors",
        @"type": @"gray",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e7eb,
        @"name": @"ColorsGray200",
        @"category": @"colors",
        @"type": @"gray",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d1d5db,
        @"name": @"ColorsGray300",
        @"category": @"colors",
        @"type": @"gray",
        @"item": @"300"
        },
      @"400": @{
        @"value": #9ca3af,
        @"name": @"ColorsGray400",
        @"category": @"colors",
        @"type": @"gray",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6b7280,
        @"name": @"ColorsGray500",
        @"category": @"colors",
        @"type": @"gray",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4b5563,
        @"name": @"ColorsGray600",
        @"category": @"colors",
        @"type": @"gray",
        @"item": @"600"
        },
      @"700": @{
        @"value": #374151,
        @"name": @"ColorsGray700",
        @"category": @"colors",
        @"type": @"gray",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1f2937,
        @"name": @"ColorsGray800",
        @"category": @"colors",
        @"type": @"gray",
        @"item": @"800"
        },
      @"900": @{
        @"value": #111827,
        @"name": @"ColorsGray900",
        @"category": @"colors",
        @"type": @"gray",
        @"item": @"900"
        },
      @"950": @{
        @"value": #030712,
        @"name": @"ColorsGray950",
        @"category": @"colors",
        @"type": @"gray",
        @"item": @"950"
        }
      },
    @"zinc": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"ColorsZinc50",
        @"category": @"colors",
        @"type": @"zinc",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f4f4f5,
        @"name": @"ColorsZinc100",
        @"category": @"colors",
        @"type": @"zinc",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e4e4e7,
        @"name": @"ColorsZinc200",
        @"category": @"colors",
        @"type": @"zinc",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d8,
        @"name": @"ColorsZinc300",
        @"category": @"colors",
        @"type": @"zinc",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a1a1aa,
        @"name": @"ColorsZinc400",
        @"category": @"colors",
        @"type": @"zinc",
        @"item": @"400"
        },
      @"500": @{
        @"value": #71717a,
        @"name": @"ColorsZinc500",
        @"category": @"colors",
        @"type": @"zinc",
        @"item": @"500"
        },
      @"600": @{
        @"value": #52525b,
        @"name": @"ColorsZinc600",
        @"category": @"colors",
        @"type": @"zinc",
        @"item": @"600"
        },
      @"700": @{
        @"value": #3f3f46,
        @"name": @"ColorsZinc700",
        @"category": @"colors",
        @"type": @"zinc",
        @"item": @"700"
        },
      @"800": @{
        @"value": #27272a,
        @"name": @"ColorsZinc800",
        @"category": @"colors",
        @"type": @"zinc",
        @"item": @"800"
        },
      @"900": @{
        @"value": #18181b,
        @"name": @"ColorsZinc900",
        @"category": @"colors",
        @"type": @"zinc",
        @"item": @"900"
        },
      @"950": @{
        @"value": #09090b,
        @"name": @"ColorsZinc950",
        @"category": @"colors",
        @"type": @"zinc",
        @"item": @"950"
        }
      },
    @"neutral": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"ColorsNeutral50",
        @"category": @"colors",
        @"type": @"neutral",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f5,
        @"name": @"ColorsNeutral100",
        @"category": @"colors",
        @"type": @"neutral",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e5e5,
        @"name": @"ColorsNeutral200",
        @"category": @"colors",
        @"type": @"neutral",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d4,
        @"name": @"ColorsNeutral300",
        @"category": @"colors",
        @"type": @"neutral",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3a3a3,
        @"name": @"ColorsNeutral400",
        @"category": @"colors",
        @"type": @"neutral",
        @"item": @"400"
        },
      @"500": @{
        @"value": #737373,
        @"name": @"ColorsNeutral500",
        @"category": @"colors",
        @"type": @"neutral",
        @"item": @"500"
        },
      @"600": @{
        @"value": #525252,
        @"name": @"ColorsNeutral600",
        @"category": @"colors",
        @"type": @"neutral",
        @"item": @"600"
        },
      @"700": @{
        @"value": #404040,
        @"name": @"ColorsNeutral700",
        @"category": @"colors",
        @"type": @"neutral",
        @"item": @"700"
        },
      @"800": @{
        @"value": #262626,
        @"name": @"ColorsNeutral800",
        @"category": @"colors",
        @"type": @"neutral",
        @"item": @"800"
        },
      @"900": @{
        @"value": #171717,
        @"name": @"ColorsNeutral900",
        @"category": @"colors",
        @"type": @"neutral",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0a0a0a,
        @"name": @"ColorsNeutral950",
        @"category": @"colors",
        @"type": @"neutral",
        @"item": @"950"
        }
      },
    @"stone": @{
      @"50": @{
        @"value": #fafaf9,
        @"name": @"ColorsStone50",
        @"category": @"colors",
        @"type": @"stone",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f4,
        @"name": @"ColorsStone100",
        @"category": @"colors",
        @"type": @"stone",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e7e5e4,
        @"name": @"ColorsStone200",
        @"category": @"colors",
        @"type": @"stone",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d6d3d1,
        @"name": @"ColorsStone300",
        @"category": @"colors",
        @"type": @"stone",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a8a29e,
        @"name": @"ColorsStone400",
        @"category": @"colors",
        @"type": @"stone",
        @"item": @"400"
        },
      @"500": @{
        @"value": #78716c,
        @"name": @"ColorsStone500",
        @"category": @"colors",
        @"type": @"stone",
        @"item": @"500"
        },
      @"600": @{
        @"value": #57534e,
        @"name": @"ColorsStone600",
        @"category": @"colors",
        @"type": @"stone",
        @"item": @"600"
        },
      @"700": @{
        @"value": #44403c,
        @"name": @"ColorsStone700",
        @"category": @"colors",
        @"type": @"stone",
        @"item": @"700"
        },
      @"800": @{
        @"value": #292524,
        @"name": @"ColorsStone800",
        @"category": @"colors",
        @"type": @"stone",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1c1917,
        @"name": @"ColorsStone900",
        @"category": @"colors",
        @"type": @"stone",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0c0a09,
        @"name": @"ColorsStone950",
        @"category": @"colors",
        @"type": @"stone",
        @"item": @"950"
        }
      },
    @"red": @{
      @"50": @{
        @"value": #fef2f2,
        @"name": @"ColorsRed50",
        @"category": @"colors",
        @"type": @"red",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fee2e2,
        @"name": @"ColorsRed100",
        @"category": @"colors",
        @"type": @"red",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecaca,
        @"name": @"ColorsRed200",
        @"category": @"colors",
        @"type": @"red",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fca5a5,
        @"name": @"ColorsRed300",
        @"category": @"colors",
        @"type": @"red",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f87171,
        @"name": @"ColorsRed400",
        @"category": @"colors",
        @"type": @"red",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ef4444,
        @"name": @"ColorsRed500",
        @"category": @"colors",
        @"type": @"red",
        @"item": @"500"
        },
      @"600": @{
        @"value": #dc2626,
        @"name": @"ColorsRed600",
        @"category": @"colors",
        @"type": @"red",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b91c1c,
        @"name": @"ColorsRed700",
        @"category": @"colors",
        @"type": @"red",
        @"item": @"700"
        },
      @"800": @{
        @"value": #991b1b,
        @"name": @"ColorsRed800",
        @"category": @"colors",
        @"type": @"red",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7f1d1d,
        @"name": @"ColorsRed900",
        @"category": @"colors",
        @"type": @"red",
        @"item": @"900"
        },
      @"950": @{
        @"value": #450a0a,
        @"name": @"ColorsRed950",
        @"category": @"colors",
        @"type": @"red",
        @"item": @"950"
        }
      },
    @"orange": @{
      @"50": @{
        @"value": #fff7ed,
        @"name": @"ColorsOrange50",
        @"category": @"colors",
        @"type": @"orange",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffedd5,
        @"name": @"ColorsOrange100",
        @"category": @"colors",
        @"type": @"orange",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fed7aa,
        @"name": @"ColorsOrange200",
        @"category": @"colors",
        @"type": @"orange",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fdba74,
        @"name": @"ColorsOrange300",
        @"category": @"colors",
        @"type": @"orange",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb923c,
        @"name": @"ColorsOrange400",
        @"category": @"colors",
        @"type": @"orange",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f97316,
        @"name": @"ColorsOrange500",
        @"category": @"colors",
        @"type": @"orange",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ea580c,
        @"name": @"ColorsOrange600",
        @"category": @"colors",
        @"type": @"orange",
        @"item": @"600"
        },
      @"700": @{
        @"value": #c2410c,
        @"name": @"ColorsOrange700",
        @"category": @"colors",
        @"type": @"orange",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9a3412,
        @"name": @"ColorsOrange800",
        @"category": @"colors",
        @"type": @"orange",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7c2d12,
        @"name": @"ColorsOrange900",
        @"category": @"colors",
        @"type": @"orange",
        @"item": @"900"
        },
      @"950": @{
        @"value": #431407,
        @"name": @"ColorsOrange950",
        @"category": @"colors",
        @"type": @"orange",
        @"item": @"950"
        }
      },
    @"amber": @{
      @"50": @{
        @"value": #fffbeb,
        @"name": @"ColorsAmber50",
        @"category": @"colors",
        @"type": @"amber",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef3c7,
        @"name": @"ColorsAmber100",
        @"category": @"colors",
        @"type": @"amber",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fde68a,
        @"name": @"ColorsAmber200",
        @"category": @"colors",
        @"type": @"amber",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fcd34d,
        @"name": @"ColorsAmber300",
        @"category": @"colors",
        @"type": @"amber",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fbbf24,
        @"name": @"ColorsAmber400",
        @"category": @"colors",
        @"type": @"amber",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f59e0b,
        @"name": @"ColorsAmber500",
        @"category": @"colors",
        @"type": @"amber",
        @"item": @"500"
        },
      @"600": @{
        @"value": #d97706,
        @"name": @"ColorsAmber600",
        @"category": @"colors",
        @"type": @"amber",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b45309,
        @"name": @"ColorsAmber700",
        @"category": @"colors",
        @"type": @"amber",
        @"item": @"700"
        },
      @"800": @{
        @"value": #92400e,
        @"name": @"ColorsAmber800",
        @"category": @"colors",
        @"type": @"amber",
        @"item": @"800"
        },
      @"900": @{
        @"value": #78350f,
        @"name": @"ColorsAmber900",
        @"category": @"colors",
        @"type": @"amber",
        @"item": @"900"
        },
      @"950": @{
        @"value": #451a03,
        @"name": @"ColorsAmber950",
        @"category": @"colors",
        @"type": @"amber",
        @"item": @"950"
        }
      },
    @"yellow": @{
      @"50": @{
        @"value": #fefce8,
        @"name": @"ColorsYellow50",
        @"category": @"colors",
        @"type": @"yellow",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef9c3,
        @"name": @"ColorsYellow100",
        @"category": @"colors",
        @"type": @"yellow",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fef08a,
        @"name": @"ColorsYellow200",
        @"category": @"colors",
        @"type": @"yellow",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fde047,
        @"name": @"ColorsYellow300",
        @"category": @"colors",
        @"type": @"yellow",
        @"item": @"300"
        },
      @"400": @{
        @"value": #facc15,
        @"name": @"ColorsYellow400",
        @"category": @"colors",
        @"type": @"yellow",
        @"item": @"400"
        },
      @"500": @{
        @"value": #eab308,
        @"name": @"ColorsYellow500",
        @"category": @"colors",
        @"type": @"yellow",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ca8a04,
        @"name": @"ColorsYellow600",
        @"category": @"colors",
        @"type": @"yellow",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a16207,
        @"name": @"ColorsYellow700",
        @"category": @"colors",
        @"type": @"yellow",
        @"item": @"700"
        },
      @"800": @{
        @"value": #854d0e,
        @"name": @"ColorsYellow800",
        @"category": @"colors",
        @"type": @"yellow",
        @"item": @"800"
        },
      @"900": @{
        @"value": #713f12,
        @"name": @"ColorsYellow900",
        @"category": @"colors",
        @"type": @"yellow",
        @"item": @"900"
        },
      @"950": @{
        @"value": #422006,
        @"name": @"ColorsYellow950",
        @"category": @"colors",
        @"type": @"yellow",
        @"item": @"950"
        }
      },
    @"lime": @{
      @"50": @{
        @"value": #f7fee7,
        @"name": @"ColorsLime50",
        @"category": @"colors",
        @"type": @"lime",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ecfccb,
        @"name": @"ColorsLime100",
        @"category": @"colors",
        @"type": @"lime",
        @"item": @"100"
        },
      @"200": @{
        @"value": #d9f99d,
        @"name": @"ColorsLime200",
        @"category": @"colors",
        @"type": @"lime",
        @"item": @"200"
        },
      @"300": @{
        @"value": #bef264,
        @"name": @"ColorsLime300",
        @"category": @"colors",
        @"type": @"lime",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3e635,
        @"name": @"ColorsLime400",
        @"category": @"colors",
        @"type": @"lime",
        @"item": @"400"
        },
      @"500": @{
        @"value": #84cc16,
        @"name": @"ColorsLime500",
        @"category": @"colors",
        @"type": @"lime",
        @"item": @"500"
        },
      @"600": @{
        @"value": #65a30d,
        @"name": @"ColorsLime600",
        @"category": @"colors",
        @"type": @"lime",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4d7c0f,
        @"name": @"ColorsLime700",
        @"category": @"colors",
        @"type": @"lime",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3f6212,
        @"name": @"ColorsLime800",
        @"category": @"colors",
        @"type": @"lime",
        @"item": @"800"
        },
      @"900": @{
        @"value": #365314,
        @"name": @"ColorsLime900",
        @"category": @"colors",
        @"type": @"lime",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1a2e05,
        @"name": @"ColorsLime950",
        @"category": @"colors",
        @"type": @"lime",
        @"item": @"950"
        }
      },
    @"green": @{
      @"50": @{
        @"value": #f0fdf4,
        @"name": @"ColorsGreen50",
        @"category": @"colors",
        @"type": @"green",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dcfce7,
        @"name": @"ColorsGreen100",
        @"category": @"colors",
        @"type": @"green",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bbf7d0,
        @"name": @"ColorsGreen200",
        @"category": @"colors",
        @"type": @"green",
        @"item": @"200"
        },
      @"300": @{
        @"value": #86efac,
        @"name": @"ColorsGreen300",
        @"category": @"colors",
        @"type": @"green",
        @"item": @"300"
        },
      @"400": @{
        @"value": #4ade80,
        @"name": @"ColorsGreen400",
        @"category": @"colors",
        @"type": @"green",
        @"item": @"400"
        },
      @"500": @{
        @"value": #22c55e,
        @"name": @"ColorsGreen500",
        @"category": @"colors",
        @"type": @"green",
        @"item": @"500"
        },
      @"600": @{
        @"value": #16a34a,
        @"name": @"ColorsGreen600",
        @"category": @"colors",
        @"type": @"green",
        @"item": @"600"
        },
      @"700": @{
        @"value": #15803d,
        @"name": @"ColorsGreen700",
        @"category": @"colors",
        @"type": @"green",
        @"item": @"700"
        },
      @"800": @{
        @"value": #166534,
        @"name": @"ColorsGreen800",
        @"category": @"colors",
        @"type": @"green",
        @"item": @"800"
        },
      @"900": @{
        @"value": #14532d,
        @"name": @"ColorsGreen900",
        @"category": @"colors",
        @"type": @"green",
        @"item": @"900"
        },
      @"950": @{
        @"value": #052e16,
        @"name": @"ColorsGreen950",
        @"category": @"colors",
        @"type": @"green",
        @"item": @"950"
        }
      },
    @"emerald": @{
      @"50": @{
        @"value": #ecfdf5,
        @"name": @"ColorsEmerald50",
        @"category": @"colors",
        @"type": @"emerald",
        @"item": @"50"
        },
      @"100": @{
        @"value": #d1fae5,
        @"name": @"ColorsEmerald100",
        @"category": @"colors",
        @"type": @"emerald",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a7f3d0,
        @"name": @"ColorsEmerald200",
        @"category": @"colors",
        @"type": @"emerald",
        @"item": @"200"
        },
      @"300": @{
        @"value": #6ee7b7,
        @"name": @"ColorsEmerald300",
        @"category": @"colors",
        @"type": @"emerald",
        @"item": @"300"
        },
      @"400": @{
        @"value": #34d399,
        @"name": @"ColorsEmerald400",
        @"category": @"colors",
        @"type": @"emerald",
        @"item": @"400"
        },
      @"500": @{
        @"value": #10b981,
        @"name": @"ColorsEmerald500",
        @"category": @"colors",
        @"type": @"emerald",
        @"item": @"500"
        },
      @"600": @{
        @"value": #059669,
        @"name": @"ColorsEmerald600",
        @"category": @"colors",
        @"type": @"emerald",
        @"item": @"600"
        },
      @"700": @{
        @"value": #047857,
        @"name": @"ColorsEmerald700",
        @"category": @"colors",
        @"type": @"emerald",
        @"item": @"700"
        },
      @"800": @{
        @"value": #065f46,
        @"name": @"ColorsEmerald800",
        @"category": @"colors",
        @"type": @"emerald",
        @"item": @"800"
        },
      @"900": @{
        @"value": #064e3b,
        @"name": @"ColorsEmerald900",
        @"category": @"colors",
        @"type": @"emerald",
        @"item": @"900"
        },
      @"950": @{
        @"value": #022c22,
        @"name": @"ColorsEmerald950",
        @"category": @"colors",
        @"type": @"emerald",
        @"item": @"950"
        }
      },
    @"teal": @{
      @"50": @{
        @"value": #f0fdfa,
        @"name": @"ColorsTeal50",
        @"category": @"colors",
        @"type": @"teal",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ccfbf1,
        @"name": @"ColorsTeal100",
        @"category": @"colors",
        @"type": @"teal",
        @"item": @"100"
        },
      @"200": @{
        @"value": #99f6e4,
        @"name": @"ColorsTeal200",
        @"category": @"colors",
        @"type": @"teal",
        @"item": @"200"
        },
      @"300": @{
        @"value": #5eead4,
        @"name": @"ColorsTeal300",
        @"category": @"colors",
        @"type": @"teal",
        @"item": @"300"
        },
      @"400": @{
        @"value": #2dd4bf,
        @"name": @"ColorsTeal400",
        @"category": @"colors",
        @"type": @"teal",
        @"item": @"400"
        },
      @"500": @{
        @"value": #14b8a6,
        @"name": @"ColorsTeal500",
        @"category": @"colors",
        @"type": @"teal",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0d9488,
        @"name": @"ColorsTeal600",
        @"category": @"colors",
        @"type": @"teal",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0f766e,
        @"name": @"ColorsTeal700",
        @"category": @"colors",
        @"type": @"teal",
        @"item": @"700"
        },
      @"800": @{
        @"value": #115e59,
        @"name": @"ColorsTeal800",
        @"category": @"colors",
        @"type": @"teal",
        @"item": @"800"
        },
      @"900": @{
        @"value": #134e4a,
        @"name": @"ColorsTeal900",
        @"category": @"colors",
        @"type": @"teal",
        @"item": @"900"
        },
      @"950": @{
        @"value": #042f2e,
        @"name": @"ColorsTeal950",
        @"category": @"colors",
        @"type": @"teal",
        @"item": @"950"
        }
      },
    @"cyan": @{
      @"50": @{
        @"value": #ecfeff,
        @"name": @"ColorsCyan50",
        @"category": @"colors",
        @"type": @"cyan",
        @"item": @"50"
        },
      @"100": @{
        @"value": #cffafe,
        @"name": @"ColorsCyan100",
        @"category": @"colors",
        @"type": @"cyan",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a5f3fc,
        @"name": @"ColorsCyan200",
        @"category": @"colors",
        @"type": @"cyan",
        @"item": @"200"
        },
      @"300": @{
        @"value": #67e8f9,
        @"name": @"ColorsCyan300",
        @"category": @"colors",
        @"type": @"cyan",
        @"item": @"300"
        },
      @"400": @{
        @"value": #22d3ee,
        @"name": @"ColorsCyan400",
        @"category": @"colors",
        @"type": @"cyan",
        @"item": @"400"
        },
      @"500": @{
        @"value": #06b6d4,
        @"name": @"ColorsCyan500",
        @"category": @"colors",
        @"type": @"cyan",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0891b2,
        @"name": @"ColorsCyan600",
        @"category": @"colors",
        @"type": @"cyan",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0e7490,
        @"name": @"ColorsCyan700",
        @"category": @"colors",
        @"type": @"cyan",
        @"item": @"700"
        },
      @"800": @{
        @"value": #155e75,
        @"name": @"ColorsCyan800",
        @"category": @"colors",
        @"type": @"cyan",
        @"item": @"800"
        },
      @"900": @{
        @"value": #164e63,
        @"name": @"ColorsCyan900",
        @"category": @"colors",
        @"type": @"cyan",
        @"item": @"900"
        },
      @"950": @{
        @"value": #083344,
        @"name": @"ColorsCyan950",
        @"category": @"colors",
        @"type": @"cyan",
        @"item": @"950"
        }
      },
    @"sky": @{
      @"50": @{
        @"value": #f0f9ff,
        @"name": @"ColorsSky50",
        @"category": @"colors",
        @"type": @"sky",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0f2fe,
        @"name": @"ColorsSky100",
        @"category": @"colors",
        @"type": @"sky",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bae6fd,
        @"name": @"ColorsSky200",
        @"category": @"colors",
        @"type": @"sky",
        @"item": @"200"
        },
      @"300": @{
        @"value": #7dd3fc,
        @"name": @"ColorsSky300",
        @"category": @"colors",
        @"type": @"sky",
        @"item": @"300"
        },
      @"400": @{
        @"value": #38bdf8,
        @"name": @"ColorsSky400",
        @"category": @"colors",
        @"type": @"sky",
        @"item": @"400"
        },
      @"500": @{
        @"value": #0ea5e9,
        @"name": @"ColorsSky500",
        @"category": @"colors",
        @"type": @"sky",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0284c7,
        @"name": @"ColorsSky600",
        @"category": @"colors",
        @"type": @"sky",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0369a1,
        @"name": @"ColorsSky700",
        @"category": @"colors",
        @"type": @"sky",
        @"item": @"700"
        },
      @"800": @{
        @"value": #075985,
        @"name": @"ColorsSky800",
        @"category": @"colors",
        @"type": @"sky",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0c4a6e,
        @"name": @"ColorsSky900",
        @"category": @"colors",
        @"type": @"sky",
        @"item": @"900"
        },
      @"950": @{
        @"value": #082f49,
        @"name": @"ColorsSky950",
        @"category": @"colors",
        @"type": @"sky",
        @"item": @"950"
        }
      },
    @"blue": @{
      @"50": @{
        @"value": #eff6ff,
        @"name": @"ColorsBlue50",
        @"category": @"colors",
        @"type": @"blue",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dbeafe,
        @"name": @"ColorsBlue100",
        @"category": @"colors",
        @"type": @"blue",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bfdbfe,
        @"name": @"ColorsBlue200",
        @"category": @"colors",
        @"type": @"blue",
        @"item": @"200"
        },
      @"300": @{
        @"value": #93c5fd,
        @"name": @"ColorsBlue300",
        @"category": @"colors",
        @"type": @"blue",
        @"item": @"300"
        },
      @"400": @{
        @"value": #60a5fa,
        @"name": @"ColorsBlue400",
        @"category": @"colors",
        @"type": @"blue",
        @"item": @"400"
        },
      @"500": @{
        @"value": #3b82f6,
        @"name": @"ColorsBlue500",
        @"category": @"colors",
        @"type": @"blue",
        @"item": @"500"
        },
      @"600": @{
        @"value": #2563eb,
        @"name": @"ColorsBlue600",
        @"category": @"colors",
        @"type": @"blue",
        @"item": @"600"
        },
      @"700": @{
        @"value": #1d4ed8,
        @"name": @"ColorsBlue700",
        @"category": @"colors",
        @"type": @"blue",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e40af,
        @"name": @"ColorsBlue800",
        @"category": @"colors",
        @"type": @"blue",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1e3a8a,
        @"name": @"ColorsBlue900",
        @"category": @"colors",
        @"type": @"blue",
        @"item": @"900"
        },
      @"950": @{
        @"value": #172554,
        @"name": @"ColorsBlue950",
        @"category": @"colors",
        @"type": @"blue",
        @"item": @"950"
        }
      },
    @"indigo": @{
      @"50": @{
        @"value": #eef2ff,
        @"name": @"ColorsIndigo50",
        @"category": @"colors",
        @"type": @"indigo",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0e7ff,
        @"name": @"ColorsIndigo100",
        @"category": @"colors",
        @"type": @"indigo",
        @"item": @"100"
        },
      @"200": @{
        @"value": #c7d2fe,
        @"name": @"ColorsIndigo200",
        @"category": @"colors",
        @"type": @"indigo",
        @"item": @"200"
        },
      @"300": @{
        @"value": #a5b4fc,
        @"name": @"ColorsIndigo300",
        @"category": @"colors",
        @"type": @"indigo",
        @"item": @"300"
        },
      @"400": @{
        @"value": #818cf8,
        @"name": @"ColorsIndigo400",
        @"category": @"colors",
        @"type": @"indigo",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6366f1,
        @"name": @"ColorsIndigo500",
        @"category": @"colors",
        @"type": @"indigo",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4f46e5,
        @"name": @"ColorsIndigo600",
        @"category": @"colors",
        @"type": @"indigo",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4338ca,
        @"name": @"ColorsIndigo700",
        @"category": @"colors",
        @"type": @"indigo",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3730a3,
        @"name": @"ColorsIndigo800",
        @"category": @"colors",
        @"type": @"indigo",
        @"item": @"800"
        },
      @"900": @{
        @"value": #312e81,
        @"name": @"ColorsIndigo900",
        @"category": @"colors",
        @"type": @"indigo",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1e1b4b,
        @"name": @"ColorsIndigo950",
        @"category": @"colors",
        @"type": @"indigo",
        @"item": @"950"
        }
      },
    @"violet": @{
      @"50": @{
        @"value": #f5f3ff,
        @"name": @"ColorsViolet50",
        @"category": @"colors",
        @"type": @"violet",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ede9fe,
        @"name": @"ColorsViolet100",
        @"category": @"colors",
        @"type": @"violet",
        @"item": @"100"
        },
      @"200": @{
        @"value": #ddd6fe,
        @"name": @"ColorsViolet200",
        @"category": @"colors",
        @"type": @"violet",
        @"item": @"200"
        },
      @"300": @{
        @"value": #c4b5fd,
        @"name": @"ColorsViolet300",
        @"category": @"colors",
        @"type": @"violet",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a78bfa,
        @"name": @"ColorsViolet400",
        @"category": @"colors",
        @"type": @"violet",
        @"item": @"400"
        },
      @"500": @{
        @"value": #8b5cf6,
        @"name": @"ColorsViolet500",
        @"category": @"colors",
        @"type": @"violet",
        @"item": @"500"
        },
      @"600": @{
        @"value": #7c3aed,
        @"name": @"ColorsViolet600",
        @"category": @"colors",
        @"type": @"violet",
        @"item": @"600"
        },
      @"700": @{
        @"value": #6d28d9,
        @"name": @"ColorsViolet700",
        @"category": @"colors",
        @"type": @"violet",
        @"item": @"700"
        },
      @"800": @{
        @"value": #5b21b6,
        @"name": @"ColorsViolet800",
        @"category": @"colors",
        @"type": @"violet",
        @"item": @"800"
        },
      @"900": @{
        @"value": #4c1d95,
        @"name": @"ColorsViolet900",
        @"category": @"colors",
        @"type": @"violet",
        @"item": @"900"
        },
      @"950": @{
        @"value": #2e1065,
        @"name": @"ColorsViolet950",
        @"category": @"colors",
        @"type": @"violet",
        @"item": @"950"
        }
      },
    @"purple": @{
      @"50": @{
        @"value": #faf5ff,
        @"name": @"ColorsPurple50",
        @"category": @"colors",
        @"type": @"purple",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3e8ff,
        @"name": @"ColorsPurple100",
        @"category": @"colors",
        @"type": @"purple",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e9d5ff,
        @"name": @"ColorsPurple200",
        @"category": @"colors",
        @"type": @"purple",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d8b4fe,
        @"name": @"ColorsPurple300",
        @"category": @"colors",
        @"type": @"purple",
        @"item": @"300"
        },
      @"400": @{
        @"value": #c084fc,
        @"name": @"ColorsPurple400",
        @"category": @"colors",
        @"type": @"purple",
        @"item": @"400"
        },
      @"500": @{
        @"value": #a855f7,
        @"name": @"ColorsPurple500",
        @"category": @"colors",
        @"type": @"purple",
        @"item": @"500"
        },
      @"600": @{
        @"value": #9333ea,
        @"name": @"ColorsPurple600",
        @"category": @"colors",
        @"type": @"purple",
        @"item": @"600"
        },
      @"700": @{
        @"value": #7e22ce,
        @"name": @"ColorsPurple700",
        @"category": @"colors",
        @"type": @"purple",
        @"item": @"700"
        },
      @"800": @{
        @"value": #6b21a8,
        @"name": @"ColorsPurple800",
        @"category": @"colors",
        @"type": @"purple",
        @"item": @"800"
        },
      @"900": @{
        @"value": #581c87,
        @"name": @"ColorsPurple900",
        @"category": @"colors",
        @"type": @"purple",
        @"item": @"900"
        },
      @"950": @{
        @"value": #3b0764,
        @"name": @"ColorsPurple950",
        @"category": @"colors",
        @"type": @"purple",
        @"item": @"950"
        }
      },
    @"fuchsia": @{
      @"50": @{
        @"value": #fdf4ff,
        @"name": @"ColorsFuchsia50",
        @"category": @"colors",
        @"type": @"fuchsia",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fae8ff,
        @"name": @"ColorsFuchsia100",
        @"category": @"colors",
        @"type": @"fuchsia",
        @"item": @"100"
        },
      @"200": @{
        @"value": #f5d0fe,
        @"name": @"ColorsFuchsia200",
        @"category": @"colors",
        @"type": @"fuchsia",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f0abfc,
        @"name": @"ColorsFuchsia300",
        @"category": @"colors",
        @"type": @"fuchsia",
        @"item": @"300"
        },
      @"400": @{
        @"value": #e879f9,
        @"name": @"ColorsFuchsia400",
        @"category": @"colors",
        @"type": @"fuchsia",
        @"item": @"400"
        },
      @"500": @{
        @"value": #d946ef,
        @"name": @"ColorsFuchsia500",
        @"category": @"colors",
        @"type": @"fuchsia",
        @"item": @"500"
        },
      @"600": @{
        @"value": #c026d3,
        @"name": @"ColorsFuchsia600",
        @"category": @"colors",
        @"type": @"fuchsia",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a21caf,
        @"name": @"ColorsFuchsia700",
        @"category": @"colors",
        @"type": @"fuchsia",
        @"item": @"700"
        },
      @"800": @{
        @"value": #86198f,
        @"name": @"ColorsFuchsia800",
        @"category": @"colors",
        @"type": @"fuchsia",
        @"item": @"800"
        },
      @"900": @{
        @"value": #701a75,
        @"name": @"ColorsFuchsia900",
        @"category": @"colors",
        @"type": @"fuchsia",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4a044e,
        @"name": @"ColorsFuchsia950",
        @"category": @"colors",
        @"type": @"fuchsia",
        @"item": @"950"
        }
      },
    @"pink": @{
      @"50": @{
        @"value": #fdf2f8,
        @"name": @"ColorsPink50",
        @"category": @"colors",
        @"type": @"pink",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fce7f3,
        @"name": @"ColorsPink100",
        @"category": @"colors",
        @"type": @"pink",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fbcfe8,
        @"name": @"ColorsPink200",
        @"category": @"colors",
        @"type": @"pink",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f9a8d4,
        @"name": @"ColorsPink300",
        @"category": @"colors",
        @"type": @"pink",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f472b6,
        @"name": @"ColorsPink400",
        @"category": @"colors",
        @"type": @"pink",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ec4899,
        @"name": @"ColorsPink500",
        @"category": @"colors",
        @"type": @"pink",
        @"item": @"500"
        },
      @"600": @{
        @"value": #db2777,
        @"name": @"ColorsPink600",
        @"category": @"colors",
        @"type": @"pink",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be185d,
        @"name": @"ColorsPink700",
        @"category": @"colors",
        @"type": @"pink",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9d174d,
        @"name": @"ColorsPink800",
        @"category": @"colors",
        @"type": @"pink",
        @"item": @"800"
        },
      @"900": @{
        @"value": #831843,
        @"name": @"ColorsPink900",
        @"category": @"colors",
        @"type": @"pink",
        @"item": @"900"
        },
      @"950": @{
        @"value": #500724,
        @"name": @"ColorsPink950",
        @"category": @"colors",
        @"type": @"pink",
        @"item": @"950"
        }
      },
    @"rose": @{
      @"50": @{
        @"value": #fff1f2,
        @"name": @"ColorsRose50",
        @"category": @"colors",
        @"type": @"rose",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffe4e6,
        @"name": @"ColorsRose100",
        @"category": @"colors",
        @"type": @"rose",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecdd3,
        @"name": @"ColorsRose200",
        @"category": @"colors",
        @"type": @"rose",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fda4af,
        @"name": @"ColorsRose300",
        @"category": @"colors",
        @"type": @"rose",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb7185,
        @"name": @"ColorsRose400",
        @"category": @"colors",
        @"type": @"rose",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f43f5e,
        @"name": @"ColorsRose500",
        @"category": @"colors",
        @"type": @"rose",
        @"item": @"500"
        },
      @"600": @{
        @"value": #e11d48,
        @"name": @"ColorsRose600",
        @"category": @"colors",
        @"type": @"rose",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be123c,
        @"name": @"ColorsRose700",
        @"category": @"colors",
        @"type": @"rose",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9f1239,
        @"name": @"ColorsRose800",
        @"category": @"colors",
        @"type": @"rose",
        @"item": @"800"
        },
      @"900": @{
        @"value": #881337,
        @"name": @"ColorsRose900",
        @"category": @"colors",
        @"type": @"rose",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4c0519,
        @"name": @"ColorsRose950",
        @"category": @"colors",
        @"type": @"rose",
        @"item": @"950"
        }
      }
    },
  @"columns": @{
    @"1": @{
      @"value": 1,
      @"name": @"Columns1",
      @"category": @"columns",
      @"type": @"1"
      },
    @"2": @{
      @"value": 2,
      @"name": @"Columns2",
      @"category": @"columns",
      @"type": @"2"
      },
    @"3": @{
      @"value": 3,
      @"name": @"Columns3",
      @"category": @"columns",
      @"type": @"3"
      },
    @"4": @{
      @"value": 4,
      @"name": @"Columns4",
      @"category": @"columns",
      @"type": @"4"
      },
    @"5": @{
      @"value": 5,
      @"name": @"Columns5",
      @"category": @"columns",
      @"type": @"5"
      },
    @"6": @{
      @"value": 6,
      @"name": @"Columns6",
      @"category": @"columns",
      @"type": @"6"
      },
    @"7": @{
      @"value": 7,
      @"name": @"Columns7",
      @"category": @"columns",
      @"type": @"7"
      },
    @"8": @{
      @"value": 8,
      @"name": @"Columns8",
      @"category": @"columns",
      @"type": @"8"
      },
    @"9": @{
      @"value": 9,
      @"name": @"Columns9",
      @"category": @"columns",
      @"type": @"9"
      },
    @"10": @{
      @"value": 10,
      @"name": @"Columns10",
      @"category": @"columns",
      @"type": @"10"
      },
    @"11": @{
      @"value": 11,
      @"name": @"Columns11",
      @"category": @"columns",
      @"type": @"11"
      },
    @"12": @{
      @"value": 12,
      @"name": @"Columns12",
      @"category": @"columns",
      @"type": @"12"
      },
    @"auto": @{
      @"value": auto,
      @"name": @"ColumnsAuto",
      @"category": @"columns",
      @"type": @"auto"
      },
    @"3xs": @{
      @"value": 16rem,
      @"name": @"Columns3xs",
      @"category": @"columns",
      @"type": @"3xs"
      },
    @"2xs": @{
      @"value": 18rem,
      @"name": @"Columns2xs",
      @"category": @"columns",
      @"type": @"2xs"
      },
    @"xs": @{
      @"value": 20rem,
      @"name": @"ColumnsXs",
      @"category": @"columns",
      @"type": @"xs"
      },
    @"sm": @{
      @"value": 24rem,
      @"name": @"ColumnsSm",
      @"category": @"columns",
      @"type": @"sm"
      },
    @"md": @{
      @"value": 28rem,
      @"name": @"ColumnsMd",
      @"category": @"columns",
      @"type": @"md"
      },
    @"lg": @{
      @"value": 32rem,
      @"name": @"ColumnsLg",
      @"category": @"columns",
      @"type": @"lg"
      },
    @"xl": @{
      @"value": 36rem,
      @"name": @"ColumnsXl",
      @"category": @"columns",
      @"type": @"xl"
      },
    @"2xl": @{
      @"value": 42rem,
      @"name": @"Columns2xl",
      @"category": @"columns",
      @"type": @"2xl"
      },
    @"3xl": @{
      @"value": 48rem,
      @"name": @"Columns3xl",
      @"category": @"columns",
      @"type": @"3xl"
      },
    @"4xl": @{
      @"value": 56rem,
      @"name": @"Columns4xl",
      @"category": @"columns",
      @"type": @"4xl"
      },
    @"5xl": @{
      @"value": 64rem,
      @"name": @"Columns5xl",
      @"category": @"columns",
      @"type": @"5xl"
      },
    @"6xl": @{
      @"value": 72rem,
      @"name": @"Columns6xl",
      @"category": @"columns",
      @"type": @"6xl"
      },
    @"7xl": @{
      @"value": 80rem,
      @"name": @"Columns7xl",
      @"category": @"columns",
      @"type": @"7xl"
      }
    },
  @"content": @{
    @"none": @{
      @"value": none,
      @"name": @"ContentNone",
      @"category": @"content",
      @"type": @"none"
      }
    },
  @"contrast": @{
    @"0": @{
      @"value": 0,
      @"name": @"Contrast0",
      @"category": @"contrast",
      @"type": @"0"
      },
    @"50": @{
      @"value": .5,
      @"name": @"Contrast50",
      @"category": @"contrast",
      @"type": @"50"
      },
    @"75": @{
      @"value": .75,
      @"name": @"Contrast75",
      @"category": @"contrast",
      @"type": @"75"
      },
    @"100": @{
      @"value": 1,
      @"name": @"Contrast100",
      @"category": @"contrast",
      @"type": @"100"
      },
    @"125": @{
      @"value": 1.25,
      @"name": @"Contrast125",
      @"category": @"contrast",
      @"type": @"125"
      },
    @"150": @{
      @"value": 1.5,
      @"name": @"Contrast150",
      @"category": @"contrast",
      @"type": @"150"
      },
    @"200": @{
      @"value": 2,
      @"name": @"Contrast200",
      @"category": @"contrast",
      @"type": @"200"
      }
    },
  @"cursor": @{
    @"auto": @{
      @"value": auto,
      @"name": @"CursorAuto",
      @"category": @"cursor",
      @"type": @"auto"
      },
    @"default": @{
      @"value": default,
      @"name": @"CursorDefault",
      @"category": @"cursor",
      @"type": @"default"
      },
    @"pointer": @{
      @"value": pointer,
      @"name": @"CursorPointer",
      @"category": @"cursor",
      @"type": @"pointer"
      },
    @"wait": @{
      @"value": wait,
      @"name": @"CursorWait",
      @"category": @"cursor",
      @"type": @"wait"
      },
    @"text": @{
      @"value": text,
      @"name": @"CursorText",
      @"category": @"cursor",
      @"type": @"text"
      },
    @"move": @{
      @"value": move,
      @"name": @"CursorMove",
      @"category": @"cursor",
      @"type": @"move"
      },
    @"help": @{
      @"value": help,
      @"name": @"CursorHelp",
      @"category": @"cursor",
      @"type": @"help"
      },
    @"not-allowed": @{
      @"value": not-allowed,
      @"name": @"CursorNotAllowed",
      @"category": @"cursor",
      @"type": @"not-allowed"
      },
    @"none": @{
      @"value": none,
      @"name": @"CursorNone",
      @"category": @"cursor",
      @"type": @"none"
      },
    @"context-menu": @{
      @"value": context-menu,
      @"name": @"CursorContextMenu",
      @"category": @"cursor",
      @"type": @"context-menu"
      },
    @"progress": @{
      @"value": progress,
      @"name": @"CursorProgress",
      @"category": @"cursor",
      @"type": @"progress"
      },
    @"cell": @{
      @"value": cell,
      @"name": @"CursorCell",
      @"category": @"cursor",
      @"type": @"cell"
      },
    @"crosshair": @{
      @"value": crosshair,
      @"name": @"CursorCrosshair",
      @"category": @"cursor",
      @"type": @"crosshair"
      },
    @"vertical-text": @{
      @"value": vertical-text,
      @"name": @"CursorVerticalText",
      @"category": @"cursor",
      @"type": @"vertical-text"
      },
    @"alias": @{
      @"value": alias,
      @"name": @"CursorAlias",
      @"category": @"cursor",
      @"type": @"alias"
      },
    @"copy": @{
      @"value": copy,
      @"name": @"CursorCopy",
      @"category": @"cursor",
      @"type": @"copy"
      },
    @"no-drop": @{
      @"value": no-drop,
      @"name": @"CursorNoDrop",
      @"category": @"cursor",
      @"type": @"no-drop"
      },
    @"grab": @{
      @"value": grab,
      @"name": @"CursorGrab",
      @"category": @"cursor",
      @"type": @"grab"
      },
    @"grabbing": @{
      @"value": grabbing,
      @"name": @"CursorGrabbing",
      @"category": @"cursor",
      @"type": @"grabbing"
      },
    @"all-scroll": @{
      @"value": all-scroll,
      @"name": @"CursorAllScroll",
      @"category": @"cursor",
      @"type": @"all-scroll"
      },
    @"col-resize": @{
      @"value": col-resize,
      @"name": @"CursorColResize",
      @"category": @"cursor",
      @"type": @"col-resize"
      },
    @"row-resize": @{
      @"value": row-resize,
      @"name": @"CursorRowResize",
      @"category": @"cursor",
      @"type": @"row-resize"
      },
    @"n-resize": @{
      @"value": n-resize,
      @"name": @"CursorNResize",
      @"category": @"cursor",
      @"type": @"n-resize"
      },
    @"e-resize": @{
      @"value": e-resize,
      @"name": @"CursorEResize",
      @"category": @"cursor",
      @"type": @"e-resize"
      },
    @"s-resize": @{
      @"value": s-resize,
      @"name": @"CursorSResize",
      @"category": @"cursor",
      @"type": @"s-resize"
      },
    @"w-resize": @{
      @"value": w-resize,
      @"name": @"CursorWResize",
      @"category": @"cursor",
      @"type": @"w-resize"
      },
    @"ne-resize": @{
      @"value": ne-resize,
      @"name": @"CursorNeResize",
      @"category": @"cursor",
      @"type": @"ne-resize"
      },
    @"nw-resize": @{
      @"value": nw-resize,
      @"name": @"CursorNwResize",
      @"category": @"cursor",
      @"type": @"nw-resize"
      },
    @"se-resize": @{
      @"value": se-resize,
      @"name": @"CursorSeResize",
      @"category": @"cursor",
      @"type": @"se-resize"
      },
    @"sw-resize": @{
      @"value": sw-resize,
      @"name": @"CursorSwResize",
      @"category": @"cursor",
      @"type": @"sw-resize"
      },
    @"ew-resize": @{
      @"value": ew-resize,
      @"name": @"CursorEwResize",
      @"category": @"cursor",
      @"type": @"ew-resize"
      },
    @"ns-resize": @{
      @"value": ns-resize,
      @"name": @"CursorNsResize",
      @"category": @"cursor",
      @"type": @"ns-resize"
      },
    @"nesw-resize": @{
      @"value": nesw-resize,
      @"name": @"CursorNeswResize",
      @"category": @"cursor",
      @"type": @"nesw-resize"
      },
    @"nwse-resize": @{
      @"value": nwse-resize,
      @"name": @"CursorNwseResize",
      @"category": @"cursor",
      @"type": @"nwse-resize"
      },
    @"zoom-in": @{
      @"value": zoom-in,
      @"name": @"CursorZoomIn",
      @"category": @"cursor",
      @"type": @"zoom-in"
      },
    @"zoom-out": @{
      @"value": zoom-out,
      @"name": @"CursorZoomOut",
      @"category": @"cursor",
      @"type": @"zoom-out"
      }
    },
  @"divideColor": @{
    @"inherit": @{
      @"value": inherit,
      @"name": @"DivideColorInherit",
      @"category": @"divideColor",
      @"type": @"inherit"
      },
    @"current": @{
      @"value": currentColor,
      @"name": @"DivideColorCurrent",
      @"category": @"divideColor",
      @"type": @"current"
      },
    @"transparent": @{
      @"value": transparent,
      @"name": @"DivideColorTransparent",
      @"category": @"divideColor",
      @"type": @"transparent"
      },
    @"black": @{
      @"value": #000,
      @"name": @"DivideColorBlack",
      @"category": @"divideColor",
      @"type": @"black"
      },
    @"white": @{
      @"value": #fff,
      @"name": @"DivideColorWhite",
      @"category": @"divideColor",
      @"type": @"white"
      },
    @"slate": @{
      @"50": @{
        @"value": #f8fafc,
        @"name": @"DivideColorSlate50",
        @"category": @"divideColor",
        @"type": @"slate",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f1f5f9,
        @"name": @"DivideColorSlate100",
        @"category": @"divideColor",
        @"type": @"slate",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e2e8f0,
        @"name": @"DivideColorSlate200",
        @"category": @"divideColor",
        @"type": @"slate",
        @"item": @"200"
        },
      @"300": @{
        @"value": #cbd5e1,
        @"name": @"DivideColorSlate300",
        @"category": @"divideColor",
        @"type": @"slate",
        @"item": @"300"
        },
      @"400": @{
        @"value": #94a3b8,
        @"name": @"DivideColorSlate400",
        @"category": @"divideColor",
        @"type": @"slate",
        @"item": @"400"
        },
      @"500": @{
        @"value": #64748b,
        @"name": @"DivideColorSlate500",
        @"category": @"divideColor",
        @"type": @"slate",
        @"item": @"500"
        },
      @"600": @{
        @"value": #475569,
        @"name": @"DivideColorSlate600",
        @"category": @"divideColor",
        @"type": @"slate",
        @"item": @"600"
        },
      @"700": @{
        @"value": #334155,
        @"name": @"DivideColorSlate700",
        @"category": @"divideColor",
        @"type": @"slate",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e293b,
        @"name": @"DivideColorSlate800",
        @"category": @"divideColor",
        @"type": @"slate",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0f172a,
        @"name": @"DivideColorSlate900",
        @"category": @"divideColor",
        @"type": @"slate",
        @"item": @"900"
        },
      @"950": @{
        @"value": #020617,
        @"name": @"DivideColorSlate950",
        @"category": @"divideColor",
        @"type": @"slate",
        @"item": @"950"
        }
      },
    @"gray": @{
      @"50": @{
        @"value": #f9fafb,
        @"name": @"DivideColorGray50",
        @"category": @"divideColor",
        @"type": @"gray",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3f4f6,
        @"name": @"DivideColorGray100",
        @"category": @"divideColor",
        @"type": @"gray",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e7eb,
        @"name": @"DivideColorGray200",
        @"category": @"divideColor",
        @"type": @"gray",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d1d5db,
        @"name": @"DivideColorGray300",
        @"category": @"divideColor",
        @"type": @"gray",
        @"item": @"300"
        },
      @"400": @{
        @"value": #9ca3af,
        @"name": @"DivideColorGray400",
        @"category": @"divideColor",
        @"type": @"gray",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6b7280,
        @"name": @"DivideColorGray500",
        @"category": @"divideColor",
        @"type": @"gray",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4b5563,
        @"name": @"DivideColorGray600",
        @"category": @"divideColor",
        @"type": @"gray",
        @"item": @"600"
        },
      @"700": @{
        @"value": #374151,
        @"name": @"DivideColorGray700",
        @"category": @"divideColor",
        @"type": @"gray",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1f2937,
        @"name": @"DivideColorGray800",
        @"category": @"divideColor",
        @"type": @"gray",
        @"item": @"800"
        },
      @"900": @{
        @"value": #111827,
        @"name": @"DivideColorGray900",
        @"category": @"divideColor",
        @"type": @"gray",
        @"item": @"900"
        },
      @"950": @{
        @"value": #030712,
        @"name": @"DivideColorGray950",
        @"category": @"divideColor",
        @"type": @"gray",
        @"item": @"950"
        }
      },
    @"zinc": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"DivideColorZinc50",
        @"category": @"divideColor",
        @"type": @"zinc",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f4f4f5,
        @"name": @"DivideColorZinc100",
        @"category": @"divideColor",
        @"type": @"zinc",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e4e4e7,
        @"name": @"DivideColorZinc200",
        @"category": @"divideColor",
        @"type": @"zinc",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d8,
        @"name": @"DivideColorZinc300",
        @"category": @"divideColor",
        @"type": @"zinc",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a1a1aa,
        @"name": @"DivideColorZinc400",
        @"category": @"divideColor",
        @"type": @"zinc",
        @"item": @"400"
        },
      @"500": @{
        @"value": #71717a,
        @"name": @"DivideColorZinc500",
        @"category": @"divideColor",
        @"type": @"zinc",
        @"item": @"500"
        },
      @"600": @{
        @"value": #52525b,
        @"name": @"DivideColorZinc600",
        @"category": @"divideColor",
        @"type": @"zinc",
        @"item": @"600"
        },
      @"700": @{
        @"value": #3f3f46,
        @"name": @"DivideColorZinc700",
        @"category": @"divideColor",
        @"type": @"zinc",
        @"item": @"700"
        },
      @"800": @{
        @"value": #27272a,
        @"name": @"DivideColorZinc800",
        @"category": @"divideColor",
        @"type": @"zinc",
        @"item": @"800"
        },
      @"900": @{
        @"value": #18181b,
        @"name": @"DivideColorZinc900",
        @"category": @"divideColor",
        @"type": @"zinc",
        @"item": @"900"
        },
      @"950": @{
        @"value": #09090b,
        @"name": @"DivideColorZinc950",
        @"category": @"divideColor",
        @"type": @"zinc",
        @"item": @"950"
        }
      },
    @"neutral": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"DivideColorNeutral50",
        @"category": @"divideColor",
        @"type": @"neutral",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f5,
        @"name": @"DivideColorNeutral100",
        @"category": @"divideColor",
        @"type": @"neutral",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e5e5,
        @"name": @"DivideColorNeutral200",
        @"category": @"divideColor",
        @"type": @"neutral",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d4,
        @"name": @"DivideColorNeutral300",
        @"category": @"divideColor",
        @"type": @"neutral",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3a3a3,
        @"name": @"DivideColorNeutral400",
        @"category": @"divideColor",
        @"type": @"neutral",
        @"item": @"400"
        },
      @"500": @{
        @"value": #737373,
        @"name": @"DivideColorNeutral500",
        @"category": @"divideColor",
        @"type": @"neutral",
        @"item": @"500"
        },
      @"600": @{
        @"value": #525252,
        @"name": @"DivideColorNeutral600",
        @"category": @"divideColor",
        @"type": @"neutral",
        @"item": @"600"
        },
      @"700": @{
        @"value": #404040,
        @"name": @"DivideColorNeutral700",
        @"category": @"divideColor",
        @"type": @"neutral",
        @"item": @"700"
        },
      @"800": @{
        @"value": #262626,
        @"name": @"DivideColorNeutral800",
        @"category": @"divideColor",
        @"type": @"neutral",
        @"item": @"800"
        },
      @"900": @{
        @"value": #171717,
        @"name": @"DivideColorNeutral900",
        @"category": @"divideColor",
        @"type": @"neutral",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0a0a0a,
        @"name": @"DivideColorNeutral950",
        @"category": @"divideColor",
        @"type": @"neutral",
        @"item": @"950"
        }
      },
    @"stone": @{
      @"50": @{
        @"value": #fafaf9,
        @"name": @"DivideColorStone50",
        @"category": @"divideColor",
        @"type": @"stone",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f4,
        @"name": @"DivideColorStone100",
        @"category": @"divideColor",
        @"type": @"stone",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e7e5e4,
        @"name": @"DivideColorStone200",
        @"category": @"divideColor",
        @"type": @"stone",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d6d3d1,
        @"name": @"DivideColorStone300",
        @"category": @"divideColor",
        @"type": @"stone",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a8a29e,
        @"name": @"DivideColorStone400",
        @"category": @"divideColor",
        @"type": @"stone",
        @"item": @"400"
        },
      @"500": @{
        @"value": #78716c,
        @"name": @"DivideColorStone500",
        @"category": @"divideColor",
        @"type": @"stone",
        @"item": @"500"
        },
      @"600": @{
        @"value": #57534e,
        @"name": @"DivideColorStone600",
        @"category": @"divideColor",
        @"type": @"stone",
        @"item": @"600"
        },
      @"700": @{
        @"value": #44403c,
        @"name": @"DivideColorStone700",
        @"category": @"divideColor",
        @"type": @"stone",
        @"item": @"700"
        },
      @"800": @{
        @"value": #292524,
        @"name": @"DivideColorStone800",
        @"category": @"divideColor",
        @"type": @"stone",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1c1917,
        @"name": @"DivideColorStone900",
        @"category": @"divideColor",
        @"type": @"stone",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0c0a09,
        @"name": @"DivideColorStone950",
        @"category": @"divideColor",
        @"type": @"stone",
        @"item": @"950"
        }
      },
    @"red": @{
      @"50": @{
        @"value": #fef2f2,
        @"name": @"DivideColorRed50",
        @"category": @"divideColor",
        @"type": @"red",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fee2e2,
        @"name": @"DivideColorRed100",
        @"category": @"divideColor",
        @"type": @"red",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecaca,
        @"name": @"DivideColorRed200",
        @"category": @"divideColor",
        @"type": @"red",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fca5a5,
        @"name": @"DivideColorRed300",
        @"category": @"divideColor",
        @"type": @"red",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f87171,
        @"name": @"DivideColorRed400",
        @"category": @"divideColor",
        @"type": @"red",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ef4444,
        @"name": @"DivideColorRed500",
        @"category": @"divideColor",
        @"type": @"red",
        @"item": @"500"
        },
      @"600": @{
        @"value": #dc2626,
        @"name": @"DivideColorRed600",
        @"category": @"divideColor",
        @"type": @"red",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b91c1c,
        @"name": @"DivideColorRed700",
        @"category": @"divideColor",
        @"type": @"red",
        @"item": @"700"
        },
      @"800": @{
        @"value": #991b1b,
        @"name": @"DivideColorRed800",
        @"category": @"divideColor",
        @"type": @"red",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7f1d1d,
        @"name": @"DivideColorRed900",
        @"category": @"divideColor",
        @"type": @"red",
        @"item": @"900"
        },
      @"950": @{
        @"value": #450a0a,
        @"name": @"DivideColorRed950",
        @"category": @"divideColor",
        @"type": @"red",
        @"item": @"950"
        }
      },
    @"orange": @{
      @"50": @{
        @"value": #fff7ed,
        @"name": @"DivideColorOrange50",
        @"category": @"divideColor",
        @"type": @"orange",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffedd5,
        @"name": @"DivideColorOrange100",
        @"category": @"divideColor",
        @"type": @"orange",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fed7aa,
        @"name": @"DivideColorOrange200",
        @"category": @"divideColor",
        @"type": @"orange",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fdba74,
        @"name": @"DivideColorOrange300",
        @"category": @"divideColor",
        @"type": @"orange",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb923c,
        @"name": @"DivideColorOrange400",
        @"category": @"divideColor",
        @"type": @"orange",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f97316,
        @"name": @"DivideColorOrange500",
        @"category": @"divideColor",
        @"type": @"orange",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ea580c,
        @"name": @"DivideColorOrange600",
        @"category": @"divideColor",
        @"type": @"orange",
        @"item": @"600"
        },
      @"700": @{
        @"value": #c2410c,
        @"name": @"DivideColorOrange700",
        @"category": @"divideColor",
        @"type": @"orange",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9a3412,
        @"name": @"DivideColorOrange800",
        @"category": @"divideColor",
        @"type": @"orange",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7c2d12,
        @"name": @"DivideColorOrange900",
        @"category": @"divideColor",
        @"type": @"orange",
        @"item": @"900"
        },
      @"950": @{
        @"value": #431407,
        @"name": @"DivideColorOrange950",
        @"category": @"divideColor",
        @"type": @"orange",
        @"item": @"950"
        }
      },
    @"amber": @{
      @"50": @{
        @"value": #fffbeb,
        @"name": @"DivideColorAmber50",
        @"category": @"divideColor",
        @"type": @"amber",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef3c7,
        @"name": @"DivideColorAmber100",
        @"category": @"divideColor",
        @"type": @"amber",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fde68a,
        @"name": @"DivideColorAmber200",
        @"category": @"divideColor",
        @"type": @"amber",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fcd34d,
        @"name": @"DivideColorAmber300",
        @"category": @"divideColor",
        @"type": @"amber",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fbbf24,
        @"name": @"DivideColorAmber400",
        @"category": @"divideColor",
        @"type": @"amber",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f59e0b,
        @"name": @"DivideColorAmber500",
        @"category": @"divideColor",
        @"type": @"amber",
        @"item": @"500"
        },
      @"600": @{
        @"value": #d97706,
        @"name": @"DivideColorAmber600",
        @"category": @"divideColor",
        @"type": @"amber",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b45309,
        @"name": @"DivideColorAmber700",
        @"category": @"divideColor",
        @"type": @"amber",
        @"item": @"700"
        },
      @"800": @{
        @"value": #92400e,
        @"name": @"DivideColorAmber800",
        @"category": @"divideColor",
        @"type": @"amber",
        @"item": @"800"
        },
      @"900": @{
        @"value": #78350f,
        @"name": @"DivideColorAmber900",
        @"category": @"divideColor",
        @"type": @"amber",
        @"item": @"900"
        },
      @"950": @{
        @"value": #451a03,
        @"name": @"DivideColorAmber950",
        @"category": @"divideColor",
        @"type": @"amber",
        @"item": @"950"
        }
      },
    @"yellow": @{
      @"50": @{
        @"value": #fefce8,
        @"name": @"DivideColorYellow50",
        @"category": @"divideColor",
        @"type": @"yellow",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef9c3,
        @"name": @"DivideColorYellow100",
        @"category": @"divideColor",
        @"type": @"yellow",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fef08a,
        @"name": @"DivideColorYellow200",
        @"category": @"divideColor",
        @"type": @"yellow",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fde047,
        @"name": @"DivideColorYellow300",
        @"category": @"divideColor",
        @"type": @"yellow",
        @"item": @"300"
        },
      @"400": @{
        @"value": #facc15,
        @"name": @"DivideColorYellow400",
        @"category": @"divideColor",
        @"type": @"yellow",
        @"item": @"400"
        },
      @"500": @{
        @"value": #eab308,
        @"name": @"DivideColorYellow500",
        @"category": @"divideColor",
        @"type": @"yellow",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ca8a04,
        @"name": @"DivideColorYellow600",
        @"category": @"divideColor",
        @"type": @"yellow",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a16207,
        @"name": @"DivideColorYellow700",
        @"category": @"divideColor",
        @"type": @"yellow",
        @"item": @"700"
        },
      @"800": @{
        @"value": #854d0e,
        @"name": @"DivideColorYellow800",
        @"category": @"divideColor",
        @"type": @"yellow",
        @"item": @"800"
        },
      @"900": @{
        @"value": #713f12,
        @"name": @"DivideColorYellow900",
        @"category": @"divideColor",
        @"type": @"yellow",
        @"item": @"900"
        },
      @"950": @{
        @"value": #422006,
        @"name": @"DivideColorYellow950",
        @"category": @"divideColor",
        @"type": @"yellow",
        @"item": @"950"
        }
      },
    @"lime": @{
      @"50": @{
        @"value": #f7fee7,
        @"name": @"DivideColorLime50",
        @"category": @"divideColor",
        @"type": @"lime",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ecfccb,
        @"name": @"DivideColorLime100",
        @"category": @"divideColor",
        @"type": @"lime",
        @"item": @"100"
        },
      @"200": @{
        @"value": #d9f99d,
        @"name": @"DivideColorLime200",
        @"category": @"divideColor",
        @"type": @"lime",
        @"item": @"200"
        },
      @"300": @{
        @"value": #bef264,
        @"name": @"DivideColorLime300",
        @"category": @"divideColor",
        @"type": @"lime",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3e635,
        @"name": @"DivideColorLime400",
        @"category": @"divideColor",
        @"type": @"lime",
        @"item": @"400"
        },
      @"500": @{
        @"value": #84cc16,
        @"name": @"DivideColorLime500",
        @"category": @"divideColor",
        @"type": @"lime",
        @"item": @"500"
        },
      @"600": @{
        @"value": #65a30d,
        @"name": @"DivideColorLime600",
        @"category": @"divideColor",
        @"type": @"lime",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4d7c0f,
        @"name": @"DivideColorLime700",
        @"category": @"divideColor",
        @"type": @"lime",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3f6212,
        @"name": @"DivideColorLime800",
        @"category": @"divideColor",
        @"type": @"lime",
        @"item": @"800"
        },
      @"900": @{
        @"value": #365314,
        @"name": @"DivideColorLime900",
        @"category": @"divideColor",
        @"type": @"lime",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1a2e05,
        @"name": @"DivideColorLime950",
        @"category": @"divideColor",
        @"type": @"lime",
        @"item": @"950"
        }
      },
    @"green": @{
      @"50": @{
        @"value": #f0fdf4,
        @"name": @"DivideColorGreen50",
        @"category": @"divideColor",
        @"type": @"green",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dcfce7,
        @"name": @"DivideColorGreen100",
        @"category": @"divideColor",
        @"type": @"green",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bbf7d0,
        @"name": @"DivideColorGreen200",
        @"category": @"divideColor",
        @"type": @"green",
        @"item": @"200"
        },
      @"300": @{
        @"value": #86efac,
        @"name": @"DivideColorGreen300",
        @"category": @"divideColor",
        @"type": @"green",
        @"item": @"300"
        },
      @"400": @{
        @"value": #4ade80,
        @"name": @"DivideColorGreen400",
        @"category": @"divideColor",
        @"type": @"green",
        @"item": @"400"
        },
      @"500": @{
        @"value": #22c55e,
        @"name": @"DivideColorGreen500",
        @"category": @"divideColor",
        @"type": @"green",
        @"item": @"500"
        },
      @"600": @{
        @"value": #16a34a,
        @"name": @"DivideColorGreen600",
        @"category": @"divideColor",
        @"type": @"green",
        @"item": @"600"
        },
      @"700": @{
        @"value": #15803d,
        @"name": @"DivideColorGreen700",
        @"category": @"divideColor",
        @"type": @"green",
        @"item": @"700"
        },
      @"800": @{
        @"value": #166534,
        @"name": @"DivideColorGreen800",
        @"category": @"divideColor",
        @"type": @"green",
        @"item": @"800"
        },
      @"900": @{
        @"value": #14532d,
        @"name": @"DivideColorGreen900",
        @"category": @"divideColor",
        @"type": @"green",
        @"item": @"900"
        },
      @"950": @{
        @"value": #052e16,
        @"name": @"DivideColorGreen950",
        @"category": @"divideColor",
        @"type": @"green",
        @"item": @"950"
        }
      },
    @"emerald": @{
      @"50": @{
        @"value": #ecfdf5,
        @"name": @"DivideColorEmerald50",
        @"category": @"divideColor",
        @"type": @"emerald",
        @"item": @"50"
        },
      @"100": @{
        @"value": #d1fae5,
        @"name": @"DivideColorEmerald100",
        @"category": @"divideColor",
        @"type": @"emerald",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a7f3d0,
        @"name": @"DivideColorEmerald200",
        @"category": @"divideColor",
        @"type": @"emerald",
        @"item": @"200"
        },
      @"300": @{
        @"value": #6ee7b7,
        @"name": @"DivideColorEmerald300",
        @"category": @"divideColor",
        @"type": @"emerald",
        @"item": @"300"
        },
      @"400": @{
        @"value": #34d399,
        @"name": @"DivideColorEmerald400",
        @"category": @"divideColor",
        @"type": @"emerald",
        @"item": @"400"
        },
      @"500": @{
        @"value": #10b981,
        @"name": @"DivideColorEmerald500",
        @"category": @"divideColor",
        @"type": @"emerald",
        @"item": @"500"
        },
      @"600": @{
        @"value": #059669,
        @"name": @"DivideColorEmerald600",
        @"category": @"divideColor",
        @"type": @"emerald",
        @"item": @"600"
        },
      @"700": @{
        @"value": #047857,
        @"name": @"DivideColorEmerald700",
        @"category": @"divideColor",
        @"type": @"emerald",
        @"item": @"700"
        },
      @"800": @{
        @"value": #065f46,
        @"name": @"DivideColorEmerald800",
        @"category": @"divideColor",
        @"type": @"emerald",
        @"item": @"800"
        },
      @"900": @{
        @"value": #064e3b,
        @"name": @"DivideColorEmerald900",
        @"category": @"divideColor",
        @"type": @"emerald",
        @"item": @"900"
        },
      @"950": @{
        @"value": #022c22,
        @"name": @"DivideColorEmerald950",
        @"category": @"divideColor",
        @"type": @"emerald",
        @"item": @"950"
        }
      },
    @"teal": @{
      @"50": @{
        @"value": #f0fdfa,
        @"name": @"DivideColorTeal50",
        @"category": @"divideColor",
        @"type": @"teal",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ccfbf1,
        @"name": @"DivideColorTeal100",
        @"category": @"divideColor",
        @"type": @"teal",
        @"item": @"100"
        },
      @"200": @{
        @"value": #99f6e4,
        @"name": @"DivideColorTeal200",
        @"category": @"divideColor",
        @"type": @"teal",
        @"item": @"200"
        },
      @"300": @{
        @"value": #5eead4,
        @"name": @"DivideColorTeal300",
        @"category": @"divideColor",
        @"type": @"teal",
        @"item": @"300"
        },
      @"400": @{
        @"value": #2dd4bf,
        @"name": @"DivideColorTeal400",
        @"category": @"divideColor",
        @"type": @"teal",
        @"item": @"400"
        },
      @"500": @{
        @"value": #14b8a6,
        @"name": @"DivideColorTeal500",
        @"category": @"divideColor",
        @"type": @"teal",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0d9488,
        @"name": @"DivideColorTeal600",
        @"category": @"divideColor",
        @"type": @"teal",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0f766e,
        @"name": @"DivideColorTeal700",
        @"category": @"divideColor",
        @"type": @"teal",
        @"item": @"700"
        },
      @"800": @{
        @"value": #115e59,
        @"name": @"DivideColorTeal800",
        @"category": @"divideColor",
        @"type": @"teal",
        @"item": @"800"
        },
      @"900": @{
        @"value": #134e4a,
        @"name": @"DivideColorTeal900",
        @"category": @"divideColor",
        @"type": @"teal",
        @"item": @"900"
        },
      @"950": @{
        @"value": #042f2e,
        @"name": @"DivideColorTeal950",
        @"category": @"divideColor",
        @"type": @"teal",
        @"item": @"950"
        }
      },
    @"cyan": @{
      @"50": @{
        @"value": #ecfeff,
        @"name": @"DivideColorCyan50",
        @"category": @"divideColor",
        @"type": @"cyan",
        @"item": @"50"
        },
      @"100": @{
        @"value": #cffafe,
        @"name": @"DivideColorCyan100",
        @"category": @"divideColor",
        @"type": @"cyan",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a5f3fc,
        @"name": @"DivideColorCyan200",
        @"category": @"divideColor",
        @"type": @"cyan",
        @"item": @"200"
        },
      @"300": @{
        @"value": #67e8f9,
        @"name": @"DivideColorCyan300",
        @"category": @"divideColor",
        @"type": @"cyan",
        @"item": @"300"
        },
      @"400": @{
        @"value": #22d3ee,
        @"name": @"DivideColorCyan400",
        @"category": @"divideColor",
        @"type": @"cyan",
        @"item": @"400"
        },
      @"500": @{
        @"value": #06b6d4,
        @"name": @"DivideColorCyan500",
        @"category": @"divideColor",
        @"type": @"cyan",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0891b2,
        @"name": @"DivideColorCyan600",
        @"category": @"divideColor",
        @"type": @"cyan",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0e7490,
        @"name": @"DivideColorCyan700",
        @"category": @"divideColor",
        @"type": @"cyan",
        @"item": @"700"
        },
      @"800": @{
        @"value": #155e75,
        @"name": @"DivideColorCyan800",
        @"category": @"divideColor",
        @"type": @"cyan",
        @"item": @"800"
        },
      @"900": @{
        @"value": #164e63,
        @"name": @"DivideColorCyan900",
        @"category": @"divideColor",
        @"type": @"cyan",
        @"item": @"900"
        },
      @"950": @{
        @"value": #083344,
        @"name": @"DivideColorCyan950",
        @"category": @"divideColor",
        @"type": @"cyan",
        @"item": @"950"
        }
      },
    @"sky": @{
      @"50": @{
        @"value": #f0f9ff,
        @"name": @"DivideColorSky50",
        @"category": @"divideColor",
        @"type": @"sky",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0f2fe,
        @"name": @"DivideColorSky100",
        @"category": @"divideColor",
        @"type": @"sky",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bae6fd,
        @"name": @"DivideColorSky200",
        @"category": @"divideColor",
        @"type": @"sky",
        @"item": @"200"
        },
      @"300": @{
        @"value": #7dd3fc,
        @"name": @"DivideColorSky300",
        @"category": @"divideColor",
        @"type": @"sky",
        @"item": @"300"
        },
      @"400": @{
        @"value": #38bdf8,
        @"name": @"DivideColorSky400",
        @"category": @"divideColor",
        @"type": @"sky",
        @"item": @"400"
        },
      @"500": @{
        @"value": #0ea5e9,
        @"name": @"DivideColorSky500",
        @"category": @"divideColor",
        @"type": @"sky",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0284c7,
        @"name": @"DivideColorSky600",
        @"category": @"divideColor",
        @"type": @"sky",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0369a1,
        @"name": @"DivideColorSky700",
        @"category": @"divideColor",
        @"type": @"sky",
        @"item": @"700"
        },
      @"800": @{
        @"value": #075985,
        @"name": @"DivideColorSky800",
        @"category": @"divideColor",
        @"type": @"sky",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0c4a6e,
        @"name": @"DivideColorSky900",
        @"category": @"divideColor",
        @"type": @"sky",
        @"item": @"900"
        },
      @"950": @{
        @"value": #082f49,
        @"name": @"DivideColorSky950",
        @"category": @"divideColor",
        @"type": @"sky",
        @"item": @"950"
        }
      },
    @"blue": @{
      @"50": @{
        @"value": #eff6ff,
        @"name": @"DivideColorBlue50",
        @"category": @"divideColor",
        @"type": @"blue",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dbeafe,
        @"name": @"DivideColorBlue100",
        @"category": @"divideColor",
        @"type": @"blue",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bfdbfe,
        @"name": @"DivideColorBlue200",
        @"category": @"divideColor",
        @"type": @"blue",
        @"item": @"200"
        },
      @"300": @{
        @"value": #93c5fd,
        @"name": @"DivideColorBlue300",
        @"category": @"divideColor",
        @"type": @"blue",
        @"item": @"300"
        },
      @"400": @{
        @"value": #60a5fa,
        @"name": @"DivideColorBlue400",
        @"category": @"divideColor",
        @"type": @"blue",
        @"item": @"400"
        },
      @"500": @{
        @"value": #3b82f6,
        @"name": @"DivideColorBlue500",
        @"category": @"divideColor",
        @"type": @"blue",
        @"item": @"500"
        },
      @"600": @{
        @"value": #2563eb,
        @"name": @"DivideColorBlue600",
        @"category": @"divideColor",
        @"type": @"blue",
        @"item": @"600"
        },
      @"700": @{
        @"value": #1d4ed8,
        @"name": @"DivideColorBlue700",
        @"category": @"divideColor",
        @"type": @"blue",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e40af,
        @"name": @"DivideColorBlue800",
        @"category": @"divideColor",
        @"type": @"blue",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1e3a8a,
        @"name": @"DivideColorBlue900",
        @"category": @"divideColor",
        @"type": @"blue",
        @"item": @"900"
        },
      @"950": @{
        @"value": #172554,
        @"name": @"DivideColorBlue950",
        @"category": @"divideColor",
        @"type": @"blue",
        @"item": @"950"
        }
      },
    @"indigo": @{
      @"50": @{
        @"value": #eef2ff,
        @"name": @"DivideColorIndigo50",
        @"category": @"divideColor",
        @"type": @"indigo",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0e7ff,
        @"name": @"DivideColorIndigo100",
        @"category": @"divideColor",
        @"type": @"indigo",
        @"item": @"100"
        },
      @"200": @{
        @"value": #c7d2fe,
        @"name": @"DivideColorIndigo200",
        @"category": @"divideColor",
        @"type": @"indigo",
        @"item": @"200"
        },
      @"300": @{
        @"value": #a5b4fc,
        @"name": @"DivideColorIndigo300",
        @"category": @"divideColor",
        @"type": @"indigo",
        @"item": @"300"
        },
      @"400": @{
        @"value": #818cf8,
        @"name": @"DivideColorIndigo400",
        @"category": @"divideColor",
        @"type": @"indigo",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6366f1,
        @"name": @"DivideColorIndigo500",
        @"category": @"divideColor",
        @"type": @"indigo",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4f46e5,
        @"name": @"DivideColorIndigo600",
        @"category": @"divideColor",
        @"type": @"indigo",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4338ca,
        @"name": @"DivideColorIndigo700",
        @"category": @"divideColor",
        @"type": @"indigo",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3730a3,
        @"name": @"DivideColorIndigo800",
        @"category": @"divideColor",
        @"type": @"indigo",
        @"item": @"800"
        },
      @"900": @{
        @"value": #312e81,
        @"name": @"DivideColorIndigo900",
        @"category": @"divideColor",
        @"type": @"indigo",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1e1b4b,
        @"name": @"DivideColorIndigo950",
        @"category": @"divideColor",
        @"type": @"indigo",
        @"item": @"950"
        }
      },
    @"violet": @{
      @"50": @{
        @"value": #f5f3ff,
        @"name": @"DivideColorViolet50",
        @"category": @"divideColor",
        @"type": @"violet",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ede9fe,
        @"name": @"DivideColorViolet100",
        @"category": @"divideColor",
        @"type": @"violet",
        @"item": @"100"
        },
      @"200": @{
        @"value": #ddd6fe,
        @"name": @"DivideColorViolet200",
        @"category": @"divideColor",
        @"type": @"violet",
        @"item": @"200"
        },
      @"300": @{
        @"value": #c4b5fd,
        @"name": @"DivideColorViolet300",
        @"category": @"divideColor",
        @"type": @"violet",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a78bfa,
        @"name": @"DivideColorViolet400",
        @"category": @"divideColor",
        @"type": @"violet",
        @"item": @"400"
        },
      @"500": @{
        @"value": #8b5cf6,
        @"name": @"DivideColorViolet500",
        @"category": @"divideColor",
        @"type": @"violet",
        @"item": @"500"
        },
      @"600": @{
        @"value": #7c3aed,
        @"name": @"DivideColorViolet600",
        @"category": @"divideColor",
        @"type": @"violet",
        @"item": @"600"
        },
      @"700": @{
        @"value": #6d28d9,
        @"name": @"DivideColorViolet700",
        @"category": @"divideColor",
        @"type": @"violet",
        @"item": @"700"
        },
      @"800": @{
        @"value": #5b21b6,
        @"name": @"DivideColorViolet800",
        @"category": @"divideColor",
        @"type": @"violet",
        @"item": @"800"
        },
      @"900": @{
        @"value": #4c1d95,
        @"name": @"DivideColorViolet900",
        @"category": @"divideColor",
        @"type": @"violet",
        @"item": @"900"
        },
      @"950": @{
        @"value": #2e1065,
        @"name": @"DivideColorViolet950",
        @"category": @"divideColor",
        @"type": @"violet",
        @"item": @"950"
        }
      },
    @"purple": @{
      @"50": @{
        @"value": #faf5ff,
        @"name": @"DivideColorPurple50",
        @"category": @"divideColor",
        @"type": @"purple",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3e8ff,
        @"name": @"DivideColorPurple100",
        @"category": @"divideColor",
        @"type": @"purple",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e9d5ff,
        @"name": @"DivideColorPurple200",
        @"category": @"divideColor",
        @"type": @"purple",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d8b4fe,
        @"name": @"DivideColorPurple300",
        @"category": @"divideColor",
        @"type": @"purple",
        @"item": @"300"
        },
      @"400": @{
        @"value": #c084fc,
        @"name": @"DivideColorPurple400",
        @"category": @"divideColor",
        @"type": @"purple",
        @"item": @"400"
        },
      @"500": @{
        @"value": #a855f7,
        @"name": @"DivideColorPurple500",
        @"category": @"divideColor",
        @"type": @"purple",
        @"item": @"500"
        },
      @"600": @{
        @"value": #9333ea,
        @"name": @"DivideColorPurple600",
        @"category": @"divideColor",
        @"type": @"purple",
        @"item": @"600"
        },
      @"700": @{
        @"value": #7e22ce,
        @"name": @"DivideColorPurple700",
        @"category": @"divideColor",
        @"type": @"purple",
        @"item": @"700"
        },
      @"800": @{
        @"value": #6b21a8,
        @"name": @"DivideColorPurple800",
        @"category": @"divideColor",
        @"type": @"purple",
        @"item": @"800"
        },
      @"900": @{
        @"value": #581c87,
        @"name": @"DivideColorPurple900",
        @"category": @"divideColor",
        @"type": @"purple",
        @"item": @"900"
        },
      @"950": @{
        @"value": #3b0764,
        @"name": @"DivideColorPurple950",
        @"category": @"divideColor",
        @"type": @"purple",
        @"item": @"950"
        }
      },
    @"fuchsia": @{
      @"50": @{
        @"value": #fdf4ff,
        @"name": @"DivideColorFuchsia50",
        @"category": @"divideColor",
        @"type": @"fuchsia",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fae8ff,
        @"name": @"DivideColorFuchsia100",
        @"category": @"divideColor",
        @"type": @"fuchsia",
        @"item": @"100"
        },
      @"200": @{
        @"value": #f5d0fe,
        @"name": @"DivideColorFuchsia200",
        @"category": @"divideColor",
        @"type": @"fuchsia",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f0abfc,
        @"name": @"DivideColorFuchsia300",
        @"category": @"divideColor",
        @"type": @"fuchsia",
        @"item": @"300"
        },
      @"400": @{
        @"value": #e879f9,
        @"name": @"DivideColorFuchsia400",
        @"category": @"divideColor",
        @"type": @"fuchsia",
        @"item": @"400"
        },
      @"500": @{
        @"value": #d946ef,
        @"name": @"DivideColorFuchsia500",
        @"category": @"divideColor",
        @"type": @"fuchsia",
        @"item": @"500"
        },
      @"600": @{
        @"value": #c026d3,
        @"name": @"DivideColorFuchsia600",
        @"category": @"divideColor",
        @"type": @"fuchsia",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a21caf,
        @"name": @"DivideColorFuchsia700",
        @"category": @"divideColor",
        @"type": @"fuchsia",
        @"item": @"700"
        },
      @"800": @{
        @"value": #86198f,
        @"name": @"DivideColorFuchsia800",
        @"category": @"divideColor",
        @"type": @"fuchsia",
        @"item": @"800"
        },
      @"900": @{
        @"value": #701a75,
        @"name": @"DivideColorFuchsia900",
        @"category": @"divideColor",
        @"type": @"fuchsia",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4a044e,
        @"name": @"DivideColorFuchsia950",
        @"category": @"divideColor",
        @"type": @"fuchsia",
        @"item": @"950"
        }
      },
    @"pink": @{
      @"50": @{
        @"value": #fdf2f8,
        @"name": @"DivideColorPink50",
        @"category": @"divideColor",
        @"type": @"pink",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fce7f3,
        @"name": @"DivideColorPink100",
        @"category": @"divideColor",
        @"type": @"pink",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fbcfe8,
        @"name": @"DivideColorPink200",
        @"category": @"divideColor",
        @"type": @"pink",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f9a8d4,
        @"name": @"DivideColorPink300",
        @"category": @"divideColor",
        @"type": @"pink",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f472b6,
        @"name": @"DivideColorPink400",
        @"category": @"divideColor",
        @"type": @"pink",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ec4899,
        @"name": @"DivideColorPink500",
        @"category": @"divideColor",
        @"type": @"pink",
        @"item": @"500"
        },
      @"600": @{
        @"value": #db2777,
        @"name": @"DivideColorPink600",
        @"category": @"divideColor",
        @"type": @"pink",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be185d,
        @"name": @"DivideColorPink700",
        @"category": @"divideColor",
        @"type": @"pink",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9d174d,
        @"name": @"DivideColorPink800",
        @"category": @"divideColor",
        @"type": @"pink",
        @"item": @"800"
        },
      @"900": @{
        @"value": #831843,
        @"name": @"DivideColorPink900",
        @"category": @"divideColor",
        @"type": @"pink",
        @"item": @"900"
        },
      @"950": @{
        @"value": #500724,
        @"name": @"DivideColorPink950",
        @"category": @"divideColor",
        @"type": @"pink",
        @"item": @"950"
        }
      },
    @"rose": @{
      @"50": @{
        @"value": #fff1f2,
        @"name": @"DivideColorRose50",
        @"category": @"divideColor",
        @"type": @"rose",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffe4e6,
        @"name": @"DivideColorRose100",
        @"category": @"divideColor",
        @"type": @"rose",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecdd3,
        @"name": @"DivideColorRose200",
        @"category": @"divideColor",
        @"type": @"rose",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fda4af,
        @"name": @"DivideColorRose300",
        @"category": @"divideColor",
        @"type": @"rose",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb7185,
        @"name": @"DivideColorRose400",
        @"category": @"divideColor",
        @"type": @"rose",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f43f5e,
        @"name": @"DivideColorRose500",
        @"category": @"divideColor",
        @"type": @"rose",
        @"item": @"500"
        },
      @"600": @{
        @"value": #e11d48,
        @"name": @"DivideColorRose600",
        @"category": @"divideColor",
        @"type": @"rose",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be123c,
        @"name": @"DivideColorRose700",
        @"category": @"divideColor",
        @"type": @"rose",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9f1239,
        @"name": @"DivideColorRose800",
        @"category": @"divideColor",
        @"type": @"rose",
        @"item": @"800"
        },
      @"900": @{
        @"value": #881337,
        @"name": @"DivideColorRose900",
        @"category": @"divideColor",
        @"type": @"rose",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4c0519,
        @"name": @"DivideColorRose950",
        @"category": @"divideColor",
        @"type": @"rose",
        @"item": @"950"
        }
      },
    @"DEFAULT": @{
      @"value": #e5e7eb,
      @"name": @"DivideColorDefault",
      @"category": @"divideColor",
      @"type": @"DEFAULT"
      }
    },
  @"divideOpacity": @{
    @"0": @{
      @"value": 0,
      @"name": @"DivideOpacity0",
      @"category": @"divideOpacity",
      @"type": @"0"
      },
    @"5": @{
      @"value": 0.05,
      @"name": @"DivideOpacity5",
      @"category": @"divideOpacity",
      @"type": @"5"
      },
    @"10": @{
      @"value": 0.1,
      @"name": @"DivideOpacity10",
      @"category": @"divideOpacity",
      @"type": @"10"
      },
    @"15": @{
      @"value": 0.15,
      @"name": @"DivideOpacity15",
      @"category": @"divideOpacity",
      @"type": @"15"
      },
    @"20": @{
      @"value": 0.2,
      @"name": @"DivideOpacity20",
      @"category": @"divideOpacity",
      @"type": @"20"
      },
    @"25": @{
      @"value": 0.25,
      @"name": @"DivideOpacity25",
      @"category": @"divideOpacity",
      @"type": @"25"
      },
    @"30": @{
      @"value": 0.3,
      @"name": @"DivideOpacity30",
      @"category": @"divideOpacity",
      @"type": @"30"
      },
    @"35": @{
      @"value": 0.35,
      @"name": @"DivideOpacity35",
      @"category": @"divideOpacity",
      @"type": @"35"
      },
    @"40": @{
      @"value": 0.4,
      @"name": @"DivideOpacity40",
      @"category": @"divideOpacity",
      @"type": @"40"
      },
    @"45": @{
      @"value": 0.45,
      @"name": @"DivideOpacity45",
      @"category": @"divideOpacity",
      @"type": @"45"
      },
    @"50": @{
      @"value": 0.5,
      @"name": @"DivideOpacity50",
      @"category": @"divideOpacity",
      @"type": @"50"
      },
    @"55": @{
      @"value": 0.55,
      @"name": @"DivideOpacity55",
      @"category": @"divideOpacity",
      @"type": @"55"
      },
    @"60": @{
      @"value": 0.6,
      @"name": @"DivideOpacity60",
      @"category": @"divideOpacity",
      @"type": @"60"
      },
    @"65": @{
      @"value": 0.65,
      @"name": @"DivideOpacity65",
      @"category": @"divideOpacity",
      @"type": @"65"
      },
    @"70": @{
      @"value": 0.7,
      @"name": @"DivideOpacity70",
      @"category": @"divideOpacity",
      @"type": @"70"
      },
    @"75": @{
      @"value": 0.75,
      @"name": @"DivideOpacity75",
      @"category": @"divideOpacity",
      @"type": @"75"
      },
    @"80": @{
      @"value": 0.8,
      @"name": @"DivideOpacity80",
      @"category": @"divideOpacity",
      @"type": @"80"
      },
    @"85": @{
      @"value": 0.85,
      @"name": @"DivideOpacity85",
      @"category": @"divideOpacity",
      @"type": @"85"
      },
    @"90": @{
      @"value": 0.9,
      @"name": @"DivideOpacity90",
      @"category": @"divideOpacity",
      @"type": @"90"
      },
    @"95": @{
      @"value": 0.95,
      @"name": @"DivideOpacity95",
      @"category": @"divideOpacity",
      @"type": @"95"
      },
    @"100": @{
      @"value": 1,
      @"name": @"DivideOpacity100",
      @"category": @"divideOpacity",
      @"type": @"100"
      }
    },
  @"divideWidth": @{
    @"0": @{
      @"value": 0px,
      @"name": @"DivideWidth0",
      @"category": @"divideWidth",
      @"type": @"0"
      },
    @"2": @{
      @"value": 2px,
      @"name": @"DivideWidth2",
      @"category": @"divideWidth",
      @"type": @"2"
      },
    @"4": @{
      @"value": 4px,
      @"name": @"DivideWidth4",
      @"category": @"divideWidth",
      @"type": @"4"
      },
    @"8": @{
      @"value": 8px,
      @"name": @"DivideWidth8",
      @"category": @"divideWidth",
      @"type": @"8"
      },
    @"DEFAULT": @{
      @"value": 1px,
      @"name": @"DivideWidthDefault",
      @"category": @"divideWidth",
      @"type": @"DEFAULT"
      }
    },
  @"dropShadow": @{
    @"sm": @{
      @"value": 0 1px 1px rgb(0 0 0 / 0.05),
      @"name": @"DropShadowSm",
      @"category": @"dropShadow",
      @"type": @"sm"
      },
    @"DEFAULT": @{
      @"0": @{
        @"value": 0 1px 2px rgb(0 0 0 / 0.1),
        @"name": @"DropShadowDefault0",
        @"category": @"dropShadow",
        @"type": @"DEFAULT",
        @"item": @"0"
        },
      @"1": @{
        @"value": 0 1px 1px rgb(0 0 0 / 0.06),
        @"name": @"DropShadowDefault1",
        @"category": @"dropShadow",
        @"type": @"DEFAULT",
        @"item": @"1"
        }
      },
    @"md": @{
      @"0": @{
        @"value": 0 4px 3px rgb(0 0 0 / 0.07),
        @"name": @"DropShadowMd0",
        @"category": @"dropShadow",
        @"type": @"md",
        @"item": @"0"
        },
      @"1": @{
        @"value": 0 2px 2px rgb(0 0 0 / 0.06),
        @"name": @"DropShadowMd1",
        @"category": @"dropShadow",
        @"type": @"md",
        @"item": @"1"
        }
      },
    @"lg": @{
      @"0": @{
        @"value": 0 10px 8px rgb(0 0 0 / 0.04),
        @"name": @"DropShadowLg0",
        @"category": @"dropShadow",
        @"type": @"lg",
        @"item": @"0"
        },
      @"1": @{
        @"value": 0 4px 3px rgb(0 0 0 / 0.1),
        @"name": @"DropShadowLg1",
        @"category": @"dropShadow",
        @"type": @"lg",
        @"item": @"1"
        }
      },
    @"xl": @{
      @"0": @{
        @"value": 0 20px 13px rgb(0 0 0 / 0.03),
        @"name": @"DropShadowXl0",
        @"category": @"dropShadow",
        @"type": @"xl",
        @"item": @"0"
        },
      @"1": @{
        @"value": 0 8px 5px rgb(0 0 0 / 0.08),
        @"name": @"DropShadowXl1",
        @"category": @"dropShadow",
        @"type": @"xl",
        @"item": @"1"
        }
      },
    @"2xl": @{
      @"value": 0 25px 25px rgb(0 0 0 / 0.15),
      @"name": @"DropShadow2xl",
      @"category": @"dropShadow",
      @"type": @"2xl"
      },
    @"none": @{
      @"value": 0 0 #0000,
      @"name": @"DropShadowNone",
      @"category": @"dropShadow",
      @"type": @"none"
      }
    },
  @"fill": @{
    @"none": @{
      @"value": none,
      @"name": @"FillNone",
      @"category": @"fill",
      @"type": @"none"
      },
    @"inherit": @{
      @"value": inherit,
      @"name": @"FillInherit",
      @"category": @"fill",
      @"type": @"inherit"
      },
    @"current": @{
      @"value": currentColor,
      @"name": @"FillCurrent",
      @"category": @"fill",
      @"type": @"current"
      },
    @"transparent": @{
      @"value": transparent,
      @"name": @"FillTransparent",
      @"category": @"fill",
      @"type": @"transparent"
      },
    @"black": @{
      @"value": #000,
      @"name": @"FillBlack",
      @"category": @"fill",
      @"type": @"black"
      },
    @"white": @{
      @"value": #fff,
      @"name": @"FillWhite",
      @"category": @"fill",
      @"type": @"white"
      },
    @"slate": @{
      @"50": @{
        @"value": #f8fafc,
        @"name": @"FillSlate50",
        @"category": @"fill",
        @"type": @"slate",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f1f5f9,
        @"name": @"FillSlate100",
        @"category": @"fill",
        @"type": @"slate",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e2e8f0,
        @"name": @"FillSlate200",
        @"category": @"fill",
        @"type": @"slate",
        @"item": @"200"
        },
      @"300": @{
        @"value": #cbd5e1,
        @"name": @"FillSlate300",
        @"category": @"fill",
        @"type": @"slate",
        @"item": @"300"
        },
      @"400": @{
        @"value": #94a3b8,
        @"name": @"FillSlate400",
        @"category": @"fill",
        @"type": @"slate",
        @"item": @"400"
        },
      @"500": @{
        @"value": #64748b,
        @"name": @"FillSlate500",
        @"category": @"fill",
        @"type": @"slate",
        @"item": @"500"
        },
      @"600": @{
        @"value": #475569,
        @"name": @"FillSlate600",
        @"category": @"fill",
        @"type": @"slate",
        @"item": @"600"
        },
      @"700": @{
        @"value": #334155,
        @"name": @"FillSlate700",
        @"category": @"fill",
        @"type": @"slate",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e293b,
        @"name": @"FillSlate800",
        @"category": @"fill",
        @"type": @"slate",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0f172a,
        @"name": @"FillSlate900",
        @"category": @"fill",
        @"type": @"slate",
        @"item": @"900"
        },
      @"950": @{
        @"value": #020617,
        @"name": @"FillSlate950",
        @"category": @"fill",
        @"type": @"slate",
        @"item": @"950"
        }
      },
    @"gray": @{
      @"50": @{
        @"value": #f9fafb,
        @"name": @"FillGray50",
        @"category": @"fill",
        @"type": @"gray",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3f4f6,
        @"name": @"FillGray100",
        @"category": @"fill",
        @"type": @"gray",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e7eb,
        @"name": @"FillGray200",
        @"category": @"fill",
        @"type": @"gray",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d1d5db,
        @"name": @"FillGray300",
        @"category": @"fill",
        @"type": @"gray",
        @"item": @"300"
        },
      @"400": @{
        @"value": #9ca3af,
        @"name": @"FillGray400",
        @"category": @"fill",
        @"type": @"gray",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6b7280,
        @"name": @"FillGray500",
        @"category": @"fill",
        @"type": @"gray",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4b5563,
        @"name": @"FillGray600",
        @"category": @"fill",
        @"type": @"gray",
        @"item": @"600"
        },
      @"700": @{
        @"value": #374151,
        @"name": @"FillGray700",
        @"category": @"fill",
        @"type": @"gray",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1f2937,
        @"name": @"FillGray800",
        @"category": @"fill",
        @"type": @"gray",
        @"item": @"800"
        },
      @"900": @{
        @"value": #111827,
        @"name": @"FillGray900",
        @"category": @"fill",
        @"type": @"gray",
        @"item": @"900"
        },
      @"950": @{
        @"value": #030712,
        @"name": @"FillGray950",
        @"category": @"fill",
        @"type": @"gray",
        @"item": @"950"
        }
      },
    @"zinc": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"FillZinc50",
        @"category": @"fill",
        @"type": @"zinc",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f4f4f5,
        @"name": @"FillZinc100",
        @"category": @"fill",
        @"type": @"zinc",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e4e4e7,
        @"name": @"FillZinc200",
        @"category": @"fill",
        @"type": @"zinc",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d8,
        @"name": @"FillZinc300",
        @"category": @"fill",
        @"type": @"zinc",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a1a1aa,
        @"name": @"FillZinc400",
        @"category": @"fill",
        @"type": @"zinc",
        @"item": @"400"
        },
      @"500": @{
        @"value": #71717a,
        @"name": @"FillZinc500",
        @"category": @"fill",
        @"type": @"zinc",
        @"item": @"500"
        },
      @"600": @{
        @"value": #52525b,
        @"name": @"FillZinc600",
        @"category": @"fill",
        @"type": @"zinc",
        @"item": @"600"
        },
      @"700": @{
        @"value": #3f3f46,
        @"name": @"FillZinc700",
        @"category": @"fill",
        @"type": @"zinc",
        @"item": @"700"
        },
      @"800": @{
        @"value": #27272a,
        @"name": @"FillZinc800",
        @"category": @"fill",
        @"type": @"zinc",
        @"item": @"800"
        },
      @"900": @{
        @"value": #18181b,
        @"name": @"FillZinc900",
        @"category": @"fill",
        @"type": @"zinc",
        @"item": @"900"
        },
      @"950": @{
        @"value": #09090b,
        @"name": @"FillZinc950",
        @"category": @"fill",
        @"type": @"zinc",
        @"item": @"950"
        }
      },
    @"neutral": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"FillNeutral50",
        @"category": @"fill",
        @"type": @"neutral",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f5,
        @"name": @"FillNeutral100",
        @"category": @"fill",
        @"type": @"neutral",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e5e5,
        @"name": @"FillNeutral200",
        @"category": @"fill",
        @"type": @"neutral",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d4,
        @"name": @"FillNeutral300",
        @"category": @"fill",
        @"type": @"neutral",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3a3a3,
        @"name": @"FillNeutral400",
        @"category": @"fill",
        @"type": @"neutral",
        @"item": @"400"
        },
      @"500": @{
        @"value": #737373,
        @"name": @"FillNeutral500",
        @"category": @"fill",
        @"type": @"neutral",
        @"item": @"500"
        },
      @"600": @{
        @"value": #525252,
        @"name": @"FillNeutral600",
        @"category": @"fill",
        @"type": @"neutral",
        @"item": @"600"
        },
      @"700": @{
        @"value": #404040,
        @"name": @"FillNeutral700",
        @"category": @"fill",
        @"type": @"neutral",
        @"item": @"700"
        },
      @"800": @{
        @"value": #262626,
        @"name": @"FillNeutral800",
        @"category": @"fill",
        @"type": @"neutral",
        @"item": @"800"
        },
      @"900": @{
        @"value": #171717,
        @"name": @"FillNeutral900",
        @"category": @"fill",
        @"type": @"neutral",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0a0a0a,
        @"name": @"FillNeutral950",
        @"category": @"fill",
        @"type": @"neutral",
        @"item": @"950"
        }
      },
    @"stone": @{
      @"50": @{
        @"value": #fafaf9,
        @"name": @"FillStone50",
        @"category": @"fill",
        @"type": @"stone",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f4,
        @"name": @"FillStone100",
        @"category": @"fill",
        @"type": @"stone",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e7e5e4,
        @"name": @"FillStone200",
        @"category": @"fill",
        @"type": @"stone",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d6d3d1,
        @"name": @"FillStone300",
        @"category": @"fill",
        @"type": @"stone",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a8a29e,
        @"name": @"FillStone400",
        @"category": @"fill",
        @"type": @"stone",
        @"item": @"400"
        },
      @"500": @{
        @"value": #78716c,
        @"name": @"FillStone500",
        @"category": @"fill",
        @"type": @"stone",
        @"item": @"500"
        },
      @"600": @{
        @"value": #57534e,
        @"name": @"FillStone600",
        @"category": @"fill",
        @"type": @"stone",
        @"item": @"600"
        },
      @"700": @{
        @"value": #44403c,
        @"name": @"FillStone700",
        @"category": @"fill",
        @"type": @"stone",
        @"item": @"700"
        },
      @"800": @{
        @"value": #292524,
        @"name": @"FillStone800",
        @"category": @"fill",
        @"type": @"stone",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1c1917,
        @"name": @"FillStone900",
        @"category": @"fill",
        @"type": @"stone",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0c0a09,
        @"name": @"FillStone950",
        @"category": @"fill",
        @"type": @"stone",
        @"item": @"950"
        }
      },
    @"red": @{
      @"50": @{
        @"value": #fef2f2,
        @"name": @"FillRed50",
        @"category": @"fill",
        @"type": @"red",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fee2e2,
        @"name": @"FillRed100",
        @"category": @"fill",
        @"type": @"red",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecaca,
        @"name": @"FillRed200",
        @"category": @"fill",
        @"type": @"red",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fca5a5,
        @"name": @"FillRed300",
        @"category": @"fill",
        @"type": @"red",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f87171,
        @"name": @"FillRed400",
        @"category": @"fill",
        @"type": @"red",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ef4444,
        @"name": @"FillRed500",
        @"category": @"fill",
        @"type": @"red",
        @"item": @"500"
        },
      @"600": @{
        @"value": #dc2626,
        @"name": @"FillRed600",
        @"category": @"fill",
        @"type": @"red",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b91c1c,
        @"name": @"FillRed700",
        @"category": @"fill",
        @"type": @"red",
        @"item": @"700"
        },
      @"800": @{
        @"value": #991b1b,
        @"name": @"FillRed800",
        @"category": @"fill",
        @"type": @"red",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7f1d1d,
        @"name": @"FillRed900",
        @"category": @"fill",
        @"type": @"red",
        @"item": @"900"
        },
      @"950": @{
        @"value": #450a0a,
        @"name": @"FillRed950",
        @"category": @"fill",
        @"type": @"red",
        @"item": @"950"
        }
      },
    @"orange": @{
      @"50": @{
        @"value": #fff7ed,
        @"name": @"FillOrange50",
        @"category": @"fill",
        @"type": @"orange",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffedd5,
        @"name": @"FillOrange100",
        @"category": @"fill",
        @"type": @"orange",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fed7aa,
        @"name": @"FillOrange200",
        @"category": @"fill",
        @"type": @"orange",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fdba74,
        @"name": @"FillOrange300",
        @"category": @"fill",
        @"type": @"orange",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb923c,
        @"name": @"FillOrange400",
        @"category": @"fill",
        @"type": @"orange",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f97316,
        @"name": @"FillOrange500",
        @"category": @"fill",
        @"type": @"orange",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ea580c,
        @"name": @"FillOrange600",
        @"category": @"fill",
        @"type": @"orange",
        @"item": @"600"
        },
      @"700": @{
        @"value": #c2410c,
        @"name": @"FillOrange700",
        @"category": @"fill",
        @"type": @"orange",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9a3412,
        @"name": @"FillOrange800",
        @"category": @"fill",
        @"type": @"orange",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7c2d12,
        @"name": @"FillOrange900",
        @"category": @"fill",
        @"type": @"orange",
        @"item": @"900"
        },
      @"950": @{
        @"value": #431407,
        @"name": @"FillOrange950",
        @"category": @"fill",
        @"type": @"orange",
        @"item": @"950"
        }
      },
    @"amber": @{
      @"50": @{
        @"value": #fffbeb,
        @"name": @"FillAmber50",
        @"category": @"fill",
        @"type": @"amber",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef3c7,
        @"name": @"FillAmber100",
        @"category": @"fill",
        @"type": @"amber",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fde68a,
        @"name": @"FillAmber200",
        @"category": @"fill",
        @"type": @"amber",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fcd34d,
        @"name": @"FillAmber300",
        @"category": @"fill",
        @"type": @"amber",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fbbf24,
        @"name": @"FillAmber400",
        @"category": @"fill",
        @"type": @"amber",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f59e0b,
        @"name": @"FillAmber500",
        @"category": @"fill",
        @"type": @"amber",
        @"item": @"500"
        },
      @"600": @{
        @"value": #d97706,
        @"name": @"FillAmber600",
        @"category": @"fill",
        @"type": @"amber",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b45309,
        @"name": @"FillAmber700",
        @"category": @"fill",
        @"type": @"amber",
        @"item": @"700"
        },
      @"800": @{
        @"value": #92400e,
        @"name": @"FillAmber800",
        @"category": @"fill",
        @"type": @"amber",
        @"item": @"800"
        },
      @"900": @{
        @"value": #78350f,
        @"name": @"FillAmber900",
        @"category": @"fill",
        @"type": @"amber",
        @"item": @"900"
        },
      @"950": @{
        @"value": #451a03,
        @"name": @"FillAmber950",
        @"category": @"fill",
        @"type": @"amber",
        @"item": @"950"
        }
      },
    @"yellow": @{
      @"50": @{
        @"value": #fefce8,
        @"name": @"FillYellow50",
        @"category": @"fill",
        @"type": @"yellow",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef9c3,
        @"name": @"FillYellow100",
        @"category": @"fill",
        @"type": @"yellow",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fef08a,
        @"name": @"FillYellow200",
        @"category": @"fill",
        @"type": @"yellow",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fde047,
        @"name": @"FillYellow300",
        @"category": @"fill",
        @"type": @"yellow",
        @"item": @"300"
        },
      @"400": @{
        @"value": #facc15,
        @"name": @"FillYellow400",
        @"category": @"fill",
        @"type": @"yellow",
        @"item": @"400"
        },
      @"500": @{
        @"value": #eab308,
        @"name": @"FillYellow500",
        @"category": @"fill",
        @"type": @"yellow",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ca8a04,
        @"name": @"FillYellow600",
        @"category": @"fill",
        @"type": @"yellow",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a16207,
        @"name": @"FillYellow700",
        @"category": @"fill",
        @"type": @"yellow",
        @"item": @"700"
        },
      @"800": @{
        @"value": #854d0e,
        @"name": @"FillYellow800",
        @"category": @"fill",
        @"type": @"yellow",
        @"item": @"800"
        },
      @"900": @{
        @"value": #713f12,
        @"name": @"FillYellow900",
        @"category": @"fill",
        @"type": @"yellow",
        @"item": @"900"
        },
      @"950": @{
        @"value": #422006,
        @"name": @"FillYellow950",
        @"category": @"fill",
        @"type": @"yellow",
        @"item": @"950"
        }
      },
    @"lime": @{
      @"50": @{
        @"value": #f7fee7,
        @"name": @"FillLime50",
        @"category": @"fill",
        @"type": @"lime",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ecfccb,
        @"name": @"FillLime100",
        @"category": @"fill",
        @"type": @"lime",
        @"item": @"100"
        },
      @"200": @{
        @"value": #d9f99d,
        @"name": @"FillLime200",
        @"category": @"fill",
        @"type": @"lime",
        @"item": @"200"
        },
      @"300": @{
        @"value": #bef264,
        @"name": @"FillLime300",
        @"category": @"fill",
        @"type": @"lime",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3e635,
        @"name": @"FillLime400",
        @"category": @"fill",
        @"type": @"lime",
        @"item": @"400"
        },
      @"500": @{
        @"value": #84cc16,
        @"name": @"FillLime500",
        @"category": @"fill",
        @"type": @"lime",
        @"item": @"500"
        },
      @"600": @{
        @"value": #65a30d,
        @"name": @"FillLime600",
        @"category": @"fill",
        @"type": @"lime",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4d7c0f,
        @"name": @"FillLime700",
        @"category": @"fill",
        @"type": @"lime",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3f6212,
        @"name": @"FillLime800",
        @"category": @"fill",
        @"type": @"lime",
        @"item": @"800"
        },
      @"900": @{
        @"value": #365314,
        @"name": @"FillLime900",
        @"category": @"fill",
        @"type": @"lime",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1a2e05,
        @"name": @"FillLime950",
        @"category": @"fill",
        @"type": @"lime",
        @"item": @"950"
        }
      },
    @"green": @{
      @"50": @{
        @"value": #f0fdf4,
        @"name": @"FillGreen50",
        @"category": @"fill",
        @"type": @"green",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dcfce7,
        @"name": @"FillGreen100",
        @"category": @"fill",
        @"type": @"green",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bbf7d0,
        @"name": @"FillGreen200",
        @"category": @"fill",
        @"type": @"green",
        @"item": @"200"
        },
      @"300": @{
        @"value": #86efac,
        @"name": @"FillGreen300",
        @"category": @"fill",
        @"type": @"green",
        @"item": @"300"
        },
      @"400": @{
        @"value": #4ade80,
        @"name": @"FillGreen400",
        @"category": @"fill",
        @"type": @"green",
        @"item": @"400"
        },
      @"500": @{
        @"value": #22c55e,
        @"name": @"FillGreen500",
        @"category": @"fill",
        @"type": @"green",
        @"item": @"500"
        },
      @"600": @{
        @"value": #16a34a,
        @"name": @"FillGreen600",
        @"category": @"fill",
        @"type": @"green",
        @"item": @"600"
        },
      @"700": @{
        @"value": #15803d,
        @"name": @"FillGreen700",
        @"category": @"fill",
        @"type": @"green",
        @"item": @"700"
        },
      @"800": @{
        @"value": #166534,
        @"name": @"FillGreen800",
        @"category": @"fill",
        @"type": @"green",
        @"item": @"800"
        },
      @"900": @{
        @"value": #14532d,
        @"name": @"FillGreen900",
        @"category": @"fill",
        @"type": @"green",
        @"item": @"900"
        },
      @"950": @{
        @"value": #052e16,
        @"name": @"FillGreen950",
        @"category": @"fill",
        @"type": @"green",
        @"item": @"950"
        }
      },
    @"emerald": @{
      @"50": @{
        @"value": #ecfdf5,
        @"name": @"FillEmerald50",
        @"category": @"fill",
        @"type": @"emerald",
        @"item": @"50"
        },
      @"100": @{
        @"value": #d1fae5,
        @"name": @"FillEmerald100",
        @"category": @"fill",
        @"type": @"emerald",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a7f3d0,
        @"name": @"FillEmerald200",
        @"category": @"fill",
        @"type": @"emerald",
        @"item": @"200"
        },
      @"300": @{
        @"value": #6ee7b7,
        @"name": @"FillEmerald300",
        @"category": @"fill",
        @"type": @"emerald",
        @"item": @"300"
        },
      @"400": @{
        @"value": #34d399,
        @"name": @"FillEmerald400",
        @"category": @"fill",
        @"type": @"emerald",
        @"item": @"400"
        },
      @"500": @{
        @"value": #10b981,
        @"name": @"FillEmerald500",
        @"category": @"fill",
        @"type": @"emerald",
        @"item": @"500"
        },
      @"600": @{
        @"value": #059669,
        @"name": @"FillEmerald600",
        @"category": @"fill",
        @"type": @"emerald",
        @"item": @"600"
        },
      @"700": @{
        @"value": #047857,
        @"name": @"FillEmerald700",
        @"category": @"fill",
        @"type": @"emerald",
        @"item": @"700"
        },
      @"800": @{
        @"value": #065f46,
        @"name": @"FillEmerald800",
        @"category": @"fill",
        @"type": @"emerald",
        @"item": @"800"
        },
      @"900": @{
        @"value": #064e3b,
        @"name": @"FillEmerald900",
        @"category": @"fill",
        @"type": @"emerald",
        @"item": @"900"
        },
      @"950": @{
        @"value": #022c22,
        @"name": @"FillEmerald950",
        @"category": @"fill",
        @"type": @"emerald",
        @"item": @"950"
        }
      },
    @"teal": @{
      @"50": @{
        @"value": #f0fdfa,
        @"name": @"FillTeal50",
        @"category": @"fill",
        @"type": @"teal",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ccfbf1,
        @"name": @"FillTeal100",
        @"category": @"fill",
        @"type": @"teal",
        @"item": @"100"
        },
      @"200": @{
        @"value": #99f6e4,
        @"name": @"FillTeal200",
        @"category": @"fill",
        @"type": @"teal",
        @"item": @"200"
        },
      @"300": @{
        @"value": #5eead4,
        @"name": @"FillTeal300",
        @"category": @"fill",
        @"type": @"teal",
        @"item": @"300"
        },
      @"400": @{
        @"value": #2dd4bf,
        @"name": @"FillTeal400",
        @"category": @"fill",
        @"type": @"teal",
        @"item": @"400"
        },
      @"500": @{
        @"value": #14b8a6,
        @"name": @"FillTeal500",
        @"category": @"fill",
        @"type": @"teal",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0d9488,
        @"name": @"FillTeal600",
        @"category": @"fill",
        @"type": @"teal",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0f766e,
        @"name": @"FillTeal700",
        @"category": @"fill",
        @"type": @"teal",
        @"item": @"700"
        },
      @"800": @{
        @"value": #115e59,
        @"name": @"FillTeal800",
        @"category": @"fill",
        @"type": @"teal",
        @"item": @"800"
        },
      @"900": @{
        @"value": #134e4a,
        @"name": @"FillTeal900",
        @"category": @"fill",
        @"type": @"teal",
        @"item": @"900"
        },
      @"950": @{
        @"value": #042f2e,
        @"name": @"FillTeal950",
        @"category": @"fill",
        @"type": @"teal",
        @"item": @"950"
        }
      },
    @"cyan": @{
      @"50": @{
        @"value": #ecfeff,
        @"name": @"FillCyan50",
        @"category": @"fill",
        @"type": @"cyan",
        @"item": @"50"
        },
      @"100": @{
        @"value": #cffafe,
        @"name": @"FillCyan100",
        @"category": @"fill",
        @"type": @"cyan",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a5f3fc,
        @"name": @"FillCyan200",
        @"category": @"fill",
        @"type": @"cyan",
        @"item": @"200"
        },
      @"300": @{
        @"value": #67e8f9,
        @"name": @"FillCyan300",
        @"category": @"fill",
        @"type": @"cyan",
        @"item": @"300"
        },
      @"400": @{
        @"value": #22d3ee,
        @"name": @"FillCyan400",
        @"category": @"fill",
        @"type": @"cyan",
        @"item": @"400"
        },
      @"500": @{
        @"value": #06b6d4,
        @"name": @"FillCyan500",
        @"category": @"fill",
        @"type": @"cyan",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0891b2,
        @"name": @"FillCyan600",
        @"category": @"fill",
        @"type": @"cyan",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0e7490,
        @"name": @"FillCyan700",
        @"category": @"fill",
        @"type": @"cyan",
        @"item": @"700"
        },
      @"800": @{
        @"value": #155e75,
        @"name": @"FillCyan800",
        @"category": @"fill",
        @"type": @"cyan",
        @"item": @"800"
        },
      @"900": @{
        @"value": #164e63,
        @"name": @"FillCyan900",
        @"category": @"fill",
        @"type": @"cyan",
        @"item": @"900"
        },
      @"950": @{
        @"value": #083344,
        @"name": @"FillCyan950",
        @"category": @"fill",
        @"type": @"cyan",
        @"item": @"950"
        }
      },
    @"sky": @{
      @"50": @{
        @"value": #f0f9ff,
        @"name": @"FillSky50",
        @"category": @"fill",
        @"type": @"sky",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0f2fe,
        @"name": @"FillSky100",
        @"category": @"fill",
        @"type": @"sky",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bae6fd,
        @"name": @"FillSky200",
        @"category": @"fill",
        @"type": @"sky",
        @"item": @"200"
        },
      @"300": @{
        @"value": #7dd3fc,
        @"name": @"FillSky300",
        @"category": @"fill",
        @"type": @"sky",
        @"item": @"300"
        },
      @"400": @{
        @"value": #38bdf8,
        @"name": @"FillSky400",
        @"category": @"fill",
        @"type": @"sky",
        @"item": @"400"
        },
      @"500": @{
        @"value": #0ea5e9,
        @"name": @"FillSky500",
        @"category": @"fill",
        @"type": @"sky",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0284c7,
        @"name": @"FillSky600",
        @"category": @"fill",
        @"type": @"sky",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0369a1,
        @"name": @"FillSky700",
        @"category": @"fill",
        @"type": @"sky",
        @"item": @"700"
        },
      @"800": @{
        @"value": #075985,
        @"name": @"FillSky800",
        @"category": @"fill",
        @"type": @"sky",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0c4a6e,
        @"name": @"FillSky900",
        @"category": @"fill",
        @"type": @"sky",
        @"item": @"900"
        },
      @"950": @{
        @"value": #082f49,
        @"name": @"FillSky950",
        @"category": @"fill",
        @"type": @"sky",
        @"item": @"950"
        }
      },
    @"blue": @{
      @"50": @{
        @"value": #eff6ff,
        @"name": @"FillBlue50",
        @"category": @"fill",
        @"type": @"blue",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dbeafe,
        @"name": @"FillBlue100",
        @"category": @"fill",
        @"type": @"blue",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bfdbfe,
        @"name": @"FillBlue200",
        @"category": @"fill",
        @"type": @"blue",
        @"item": @"200"
        },
      @"300": @{
        @"value": #93c5fd,
        @"name": @"FillBlue300",
        @"category": @"fill",
        @"type": @"blue",
        @"item": @"300"
        },
      @"400": @{
        @"value": #60a5fa,
        @"name": @"FillBlue400",
        @"category": @"fill",
        @"type": @"blue",
        @"item": @"400"
        },
      @"500": @{
        @"value": #3b82f6,
        @"name": @"FillBlue500",
        @"category": @"fill",
        @"type": @"blue",
        @"item": @"500"
        },
      @"600": @{
        @"value": #2563eb,
        @"name": @"FillBlue600",
        @"category": @"fill",
        @"type": @"blue",
        @"item": @"600"
        },
      @"700": @{
        @"value": #1d4ed8,
        @"name": @"FillBlue700",
        @"category": @"fill",
        @"type": @"blue",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e40af,
        @"name": @"FillBlue800",
        @"category": @"fill",
        @"type": @"blue",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1e3a8a,
        @"name": @"FillBlue900",
        @"category": @"fill",
        @"type": @"blue",
        @"item": @"900"
        },
      @"950": @{
        @"value": #172554,
        @"name": @"FillBlue950",
        @"category": @"fill",
        @"type": @"blue",
        @"item": @"950"
        }
      },
    @"indigo": @{
      @"50": @{
        @"value": #eef2ff,
        @"name": @"FillIndigo50",
        @"category": @"fill",
        @"type": @"indigo",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0e7ff,
        @"name": @"FillIndigo100",
        @"category": @"fill",
        @"type": @"indigo",
        @"item": @"100"
        },
      @"200": @{
        @"value": #c7d2fe,
        @"name": @"FillIndigo200",
        @"category": @"fill",
        @"type": @"indigo",
        @"item": @"200"
        },
      @"300": @{
        @"value": #a5b4fc,
        @"name": @"FillIndigo300",
        @"category": @"fill",
        @"type": @"indigo",
        @"item": @"300"
        },
      @"400": @{
        @"value": #818cf8,
        @"name": @"FillIndigo400",
        @"category": @"fill",
        @"type": @"indigo",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6366f1,
        @"name": @"FillIndigo500",
        @"category": @"fill",
        @"type": @"indigo",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4f46e5,
        @"name": @"FillIndigo600",
        @"category": @"fill",
        @"type": @"indigo",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4338ca,
        @"name": @"FillIndigo700",
        @"category": @"fill",
        @"type": @"indigo",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3730a3,
        @"name": @"FillIndigo800",
        @"category": @"fill",
        @"type": @"indigo",
        @"item": @"800"
        },
      @"900": @{
        @"value": #312e81,
        @"name": @"FillIndigo900",
        @"category": @"fill",
        @"type": @"indigo",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1e1b4b,
        @"name": @"FillIndigo950",
        @"category": @"fill",
        @"type": @"indigo",
        @"item": @"950"
        }
      },
    @"violet": @{
      @"50": @{
        @"value": #f5f3ff,
        @"name": @"FillViolet50",
        @"category": @"fill",
        @"type": @"violet",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ede9fe,
        @"name": @"FillViolet100",
        @"category": @"fill",
        @"type": @"violet",
        @"item": @"100"
        },
      @"200": @{
        @"value": #ddd6fe,
        @"name": @"FillViolet200",
        @"category": @"fill",
        @"type": @"violet",
        @"item": @"200"
        },
      @"300": @{
        @"value": #c4b5fd,
        @"name": @"FillViolet300",
        @"category": @"fill",
        @"type": @"violet",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a78bfa,
        @"name": @"FillViolet400",
        @"category": @"fill",
        @"type": @"violet",
        @"item": @"400"
        },
      @"500": @{
        @"value": #8b5cf6,
        @"name": @"FillViolet500",
        @"category": @"fill",
        @"type": @"violet",
        @"item": @"500"
        },
      @"600": @{
        @"value": #7c3aed,
        @"name": @"FillViolet600",
        @"category": @"fill",
        @"type": @"violet",
        @"item": @"600"
        },
      @"700": @{
        @"value": #6d28d9,
        @"name": @"FillViolet700",
        @"category": @"fill",
        @"type": @"violet",
        @"item": @"700"
        },
      @"800": @{
        @"value": #5b21b6,
        @"name": @"FillViolet800",
        @"category": @"fill",
        @"type": @"violet",
        @"item": @"800"
        },
      @"900": @{
        @"value": #4c1d95,
        @"name": @"FillViolet900",
        @"category": @"fill",
        @"type": @"violet",
        @"item": @"900"
        },
      @"950": @{
        @"value": #2e1065,
        @"name": @"FillViolet950",
        @"category": @"fill",
        @"type": @"violet",
        @"item": @"950"
        }
      },
    @"purple": @{
      @"50": @{
        @"value": #faf5ff,
        @"name": @"FillPurple50",
        @"category": @"fill",
        @"type": @"purple",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3e8ff,
        @"name": @"FillPurple100",
        @"category": @"fill",
        @"type": @"purple",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e9d5ff,
        @"name": @"FillPurple200",
        @"category": @"fill",
        @"type": @"purple",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d8b4fe,
        @"name": @"FillPurple300",
        @"category": @"fill",
        @"type": @"purple",
        @"item": @"300"
        },
      @"400": @{
        @"value": #c084fc,
        @"name": @"FillPurple400",
        @"category": @"fill",
        @"type": @"purple",
        @"item": @"400"
        },
      @"500": @{
        @"value": #a855f7,
        @"name": @"FillPurple500",
        @"category": @"fill",
        @"type": @"purple",
        @"item": @"500"
        },
      @"600": @{
        @"value": #9333ea,
        @"name": @"FillPurple600",
        @"category": @"fill",
        @"type": @"purple",
        @"item": @"600"
        },
      @"700": @{
        @"value": #7e22ce,
        @"name": @"FillPurple700",
        @"category": @"fill",
        @"type": @"purple",
        @"item": @"700"
        },
      @"800": @{
        @"value": #6b21a8,
        @"name": @"FillPurple800",
        @"category": @"fill",
        @"type": @"purple",
        @"item": @"800"
        },
      @"900": @{
        @"value": #581c87,
        @"name": @"FillPurple900",
        @"category": @"fill",
        @"type": @"purple",
        @"item": @"900"
        },
      @"950": @{
        @"value": #3b0764,
        @"name": @"FillPurple950",
        @"category": @"fill",
        @"type": @"purple",
        @"item": @"950"
        }
      },
    @"fuchsia": @{
      @"50": @{
        @"value": #fdf4ff,
        @"name": @"FillFuchsia50",
        @"category": @"fill",
        @"type": @"fuchsia",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fae8ff,
        @"name": @"FillFuchsia100",
        @"category": @"fill",
        @"type": @"fuchsia",
        @"item": @"100"
        },
      @"200": @{
        @"value": #f5d0fe,
        @"name": @"FillFuchsia200",
        @"category": @"fill",
        @"type": @"fuchsia",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f0abfc,
        @"name": @"FillFuchsia300",
        @"category": @"fill",
        @"type": @"fuchsia",
        @"item": @"300"
        },
      @"400": @{
        @"value": #e879f9,
        @"name": @"FillFuchsia400",
        @"category": @"fill",
        @"type": @"fuchsia",
        @"item": @"400"
        },
      @"500": @{
        @"value": #d946ef,
        @"name": @"FillFuchsia500",
        @"category": @"fill",
        @"type": @"fuchsia",
        @"item": @"500"
        },
      @"600": @{
        @"value": #c026d3,
        @"name": @"FillFuchsia600",
        @"category": @"fill",
        @"type": @"fuchsia",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a21caf,
        @"name": @"FillFuchsia700",
        @"category": @"fill",
        @"type": @"fuchsia",
        @"item": @"700"
        },
      @"800": @{
        @"value": #86198f,
        @"name": @"FillFuchsia800",
        @"category": @"fill",
        @"type": @"fuchsia",
        @"item": @"800"
        },
      @"900": @{
        @"value": #701a75,
        @"name": @"FillFuchsia900",
        @"category": @"fill",
        @"type": @"fuchsia",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4a044e,
        @"name": @"FillFuchsia950",
        @"category": @"fill",
        @"type": @"fuchsia",
        @"item": @"950"
        }
      },
    @"pink": @{
      @"50": @{
        @"value": #fdf2f8,
        @"name": @"FillPink50",
        @"category": @"fill",
        @"type": @"pink",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fce7f3,
        @"name": @"FillPink100",
        @"category": @"fill",
        @"type": @"pink",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fbcfe8,
        @"name": @"FillPink200",
        @"category": @"fill",
        @"type": @"pink",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f9a8d4,
        @"name": @"FillPink300",
        @"category": @"fill",
        @"type": @"pink",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f472b6,
        @"name": @"FillPink400",
        @"category": @"fill",
        @"type": @"pink",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ec4899,
        @"name": @"FillPink500",
        @"category": @"fill",
        @"type": @"pink",
        @"item": @"500"
        },
      @"600": @{
        @"value": #db2777,
        @"name": @"FillPink600",
        @"category": @"fill",
        @"type": @"pink",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be185d,
        @"name": @"FillPink700",
        @"category": @"fill",
        @"type": @"pink",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9d174d,
        @"name": @"FillPink800",
        @"category": @"fill",
        @"type": @"pink",
        @"item": @"800"
        },
      @"900": @{
        @"value": #831843,
        @"name": @"FillPink900",
        @"category": @"fill",
        @"type": @"pink",
        @"item": @"900"
        },
      @"950": @{
        @"value": #500724,
        @"name": @"FillPink950",
        @"category": @"fill",
        @"type": @"pink",
        @"item": @"950"
        }
      },
    @"rose": @{
      @"50": @{
        @"value": #fff1f2,
        @"name": @"FillRose50",
        @"category": @"fill",
        @"type": @"rose",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffe4e6,
        @"name": @"FillRose100",
        @"category": @"fill",
        @"type": @"rose",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecdd3,
        @"name": @"FillRose200",
        @"category": @"fill",
        @"type": @"rose",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fda4af,
        @"name": @"FillRose300",
        @"category": @"fill",
        @"type": @"rose",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb7185,
        @"name": @"FillRose400",
        @"category": @"fill",
        @"type": @"rose",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f43f5e,
        @"name": @"FillRose500",
        @"category": @"fill",
        @"type": @"rose",
        @"item": @"500"
        },
      @"600": @{
        @"value": #e11d48,
        @"name": @"FillRose600",
        @"category": @"fill",
        @"type": @"rose",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be123c,
        @"name": @"FillRose700",
        @"category": @"fill",
        @"type": @"rose",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9f1239,
        @"name": @"FillRose800",
        @"category": @"fill",
        @"type": @"rose",
        @"item": @"800"
        },
      @"900": @{
        @"value": #881337,
        @"name": @"FillRose900",
        @"category": @"fill",
        @"type": @"rose",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4c0519,
        @"name": @"FillRose950",
        @"category": @"fill",
        @"type": @"rose",
        @"item": @"950"
        }
      }
    },
  @"flex": @{
    @"1": @{
      @"value": 1 1 0%,
      @"name": @"Flex1",
      @"category": @"flex",
      @"type": @"1"
      },
    @"auto": @{
      @"value": 1 1 auto,
      @"name": @"FlexAuto",
      @"category": @"flex",
      @"type": @"auto"
      },
    @"initial": @{
      @"value": 0 1 auto,
      @"name": @"FlexInitial",
      @"category": @"flex",
      @"type": @"initial"
      },
    @"none": @{
      @"value": none,
      @"name": @"FlexNone",
      @"category": @"flex",
      @"type": @"none"
      }
    },
  @"flexBasis": @{
    @"0": @{
      @"value": 0px,
      @"name": @"FlexBasis0",
      @"category": @"flexBasis",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"FlexBasis1",
      @"category": @"flexBasis",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"FlexBasis2",
      @"category": @"flexBasis",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"FlexBasis3",
      @"category": @"flexBasis",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"FlexBasis4",
      @"category": @"flexBasis",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"FlexBasis5",
      @"category": @"flexBasis",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"FlexBasis6",
      @"category": @"flexBasis",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"FlexBasis7",
      @"category": @"flexBasis",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"FlexBasis8",
      @"category": @"flexBasis",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"FlexBasis9",
      @"category": @"flexBasis",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"FlexBasis10",
      @"category": @"flexBasis",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"FlexBasis11",
      @"category": @"flexBasis",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"FlexBasis12",
      @"category": @"flexBasis",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"FlexBasis14",
      @"category": @"flexBasis",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"FlexBasis16",
      @"category": @"flexBasis",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"FlexBasis20",
      @"category": @"flexBasis",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"FlexBasis24",
      @"category": @"flexBasis",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"FlexBasis28",
      @"category": @"flexBasis",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"FlexBasis32",
      @"category": @"flexBasis",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"FlexBasis36",
      @"category": @"flexBasis",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"FlexBasis40",
      @"category": @"flexBasis",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"FlexBasis44",
      @"category": @"flexBasis",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"FlexBasis48",
      @"category": @"flexBasis",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"FlexBasis52",
      @"category": @"flexBasis",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"FlexBasis56",
      @"category": @"flexBasis",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"FlexBasis60",
      @"category": @"flexBasis",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"FlexBasis64",
      @"category": @"flexBasis",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"FlexBasis72",
      @"category": @"flexBasis",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"FlexBasis80",
      @"category": @"flexBasis",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"FlexBasis96",
      @"category": @"flexBasis",
      @"type": @"96"
      },
    @"auto": @{
      @"value": auto,
      @"name": @"FlexBasisAuto",
      @"category": @"flexBasis",
      @"type": @"auto"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"FlexBasisPx",
      @"category": @"flexBasis",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"FlexBasis05",
      @"category": @"flexBasis",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"FlexBasis15",
      @"category": @"flexBasis",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"FlexBasis25",
      @"category": @"flexBasis",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"FlexBasis35",
      @"category": @"flexBasis",
      @"type": @"3.5"
      },
    @"1/2": @{
      @"value": 50%,
      @"name": @"FlexBasis12",
      @"category": @"flexBasis",
      @"type": @"1/2"
      },
    @"1/3": @{
      @"value": 33.333333%,
      @"name": @"FlexBasis13",
      @"category": @"flexBasis",
      @"type": @"1/3"
      },
    @"2/3": @{
      @"value": 66.666667%,
      @"name": @"FlexBasis23",
      @"category": @"flexBasis",
      @"type": @"2/3"
      },
    @"1/4": @{
      @"value": 25%,
      @"name": @"FlexBasis14",
      @"category": @"flexBasis",
      @"type": @"1/4"
      },
    @"2/4": @{
      @"value": 50%,
      @"name": @"FlexBasis24",
      @"category": @"flexBasis",
      @"type": @"2/4"
      },
    @"3/4": @{
      @"value": 75%,
      @"name": @"FlexBasis34",
      @"category": @"flexBasis",
      @"type": @"3/4"
      },
    @"1/5": @{
      @"value": 20%,
      @"name": @"FlexBasis15",
      @"category": @"flexBasis",
      @"type": @"1/5"
      },
    @"2/5": @{
      @"value": 40%,
      @"name": @"FlexBasis25",
      @"category": @"flexBasis",
      @"type": @"2/5"
      },
    @"3/5": @{
      @"value": 60%,
      @"name": @"FlexBasis35",
      @"category": @"flexBasis",
      @"type": @"3/5"
      },
    @"4/5": @{
      @"value": 80%,
      @"name": @"FlexBasis45",
      @"category": @"flexBasis",
      @"type": @"4/5"
      },
    @"1/6": @{
      @"value": 16.666667%,
      @"name": @"FlexBasis16",
      @"category": @"flexBasis",
      @"type": @"1/6"
      },
    @"2/6": @{
      @"value": 33.333333%,
      @"name": @"FlexBasis26",
      @"category": @"flexBasis",
      @"type": @"2/6"
      },
    @"3/6": @{
      @"value": 50%,
      @"name": @"FlexBasis36",
      @"category": @"flexBasis",
      @"type": @"3/6"
      },
    @"4/6": @{
      @"value": 66.666667%,
      @"name": @"FlexBasis46",
      @"category": @"flexBasis",
      @"type": @"4/6"
      },
    @"5/6": @{
      @"value": 83.333333%,
      @"name": @"FlexBasis56",
      @"category": @"flexBasis",
      @"type": @"5/6"
      },
    @"1/12": @{
      @"value": 8.333333%,
      @"name": @"FlexBasis112",
      @"category": @"flexBasis",
      @"type": @"1/12"
      },
    @"2/12": @{
      @"value": 16.666667%,
      @"name": @"FlexBasis212",
      @"category": @"flexBasis",
      @"type": @"2/12"
      },
    @"3/12": @{
      @"value": 25%,
      @"name": @"FlexBasis312",
      @"category": @"flexBasis",
      @"type": @"3/12"
      },
    @"4/12": @{
      @"value": 33.333333%,
      @"name": @"FlexBasis412",
      @"category": @"flexBasis",
      @"type": @"4/12"
      },
    @"5/12": @{
      @"value": 41.666667%,
      @"name": @"FlexBasis512",
      @"category": @"flexBasis",
      @"type": @"5/12"
      },
    @"6/12": @{
      @"value": 50%,
      @"name": @"FlexBasis612",
      @"category": @"flexBasis",
      @"type": @"6/12"
      },
    @"7/12": @{
      @"value": 58.333333%,
      @"name": @"FlexBasis712",
      @"category": @"flexBasis",
      @"type": @"7/12"
      },
    @"8/12": @{
      @"value": 66.666667%,
      @"name": @"FlexBasis812",
      @"category": @"flexBasis",
      @"type": @"8/12"
      },
    @"9/12": @{
      @"value": 75%,
      @"name": @"FlexBasis912",
      @"category": @"flexBasis",
      @"type": @"9/12"
      },
    @"10/12": @{
      @"value": 83.333333%,
      @"name": @"FlexBasis1012",
      @"category": @"flexBasis",
      @"type": @"10/12"
      },
    @"11/12": @{
      @"value": 91.666667%,
      @"name": @"FlexBasis1112",
      @"category": @"flexBasis",
      @"type": @"11/12"
      },
    @"full": @{
      @"value": 100%,
      @"name": @"FlexBasisFull",
      @"category": @"flexBasis",
      @"type": @"full"
      }
    },
  @"flexGrow": @{
    @"0": @{
      @"value": 0,
      @"name": @"FlexGrow0",
      @"category": @"flexGrow",
      @"type": @"0"
      },
    @"DEFAULT": @{
      @"value": 1,
      @"name": @"FlexGrowDefault",
      @"category": @"flexGrow",
      @"type": @"DEFAULT"
      }
    },
  @"flexShrink": @{
    @"0": @{
      @"value": 0,
      @"name": @"FlexShrink0",
      @"category": @"flexShrink",
      @"type": @"0"
      },
    @"DEFAULT": @{
      @"value": 1,
      @"name": @"FlexShrinkDefault",
      @"category": @"flexShrink",
      @"type": @"DEFAULT"
      }
    },
  @"fontFamily": @{
    @"sans": @{
      @"value": ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji",
      @"name": @"FontFamilySans",
      @"category": @"fontFamily",
      @"type": @"sans"
      },
    @"serif": @{
      @"value": ui-serif,Georgia,Cambria,"Times New Roman",Times,serif,
      @"name": @"FontFamilySerif",
      @"category": @"fontFamily",
      @"type": @"serif"
      },
    @"mono": @{
      @"value": ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace,
      @"name": @"FontFamilyMono",
      @"category": @"fontFamily",
      @"type": @"mono"
      }
    },
  @"fontSize": @{
    @"xs": @{
      @"value": 0.75rem,
      @"name": @"FontSizeXs",
      @"category": @"fontSize",
      @"type": @"xs"
      },
    @"xs--lineHeight": @{
      @"value": 1rem,
      @"name": @"FontSizeXsLineHeight",
      @"category": @"fontSize",
      @"type": @"xs--lineHeight"
      },
    @"sm": @{
      @"value": 0.875rem,
      @"name": @"FontSizeSm",
      @"category": @"fontSize",
      @"type": @"sm"
      },
    @"sm--lineHeight": @{
      @"value": 1.25rem,
      @"name": @"FontSizeSmLineHeight",
      @"category": @"fontSize",
      @"type": @"sm--lineHeight"
      },
    @"base": @{
      @"value": 1rem,
      @"name": @"FontSizeBase",
      @"category": @"fontSize",
      @"type": @"base"
      },
    @"base--lineHeight": @{
      @"value": 1.5rem,
      @"name": @"FontSizeBaseLineHeight",
      @"category": @"fontSize",
      @"type": @"base--lineHeight"
      },
    @"lg": @{
      @"value": 1.125rem,
      @"name": @"FontSizeLg",
      @"category": @"fontSize",
      @"type": @"lg"
      },
    @"lg--lineHeight": @{
      @"value": 1.75rem,
      @"name": @"FontSizeLgLineHeight",
      @"category": @"fontSize",
      @"type": @"lg--lineHeight"
      },
    @"xl": @{
      @"value": 1.25rem,
      @"name": @"FontSizeXl",
      @"category": @"fontSize",
      @"type": @"xl"
      },
    @"xl--lineHeight": @{
      @"value": 1.75rem,
      @"name": @"FontSizeXlLineHeight",
      @"category": @"fontSize",
      @"type": @"xl--lineHeight"
      },
    @"2xl": @{
      @"value": 1.5rem,
      @"name": @"FontSize2xl",
      @"category": @"fontSize",
      @"type": @"2xl"
      },
    @"2xl--lineHeight": @{
      @"value": 2rem,
      @"name": @"FontSize2xlLineHeight",
      @"category": @"fontSize",
      @"type": @"2xl--lineHeight"
      },
    @"3xl": @{
      @"value": 1.875rem,
      @"name": @"FontSize3xl",
      @"category": @"fontSize",
      @"type": @"3xl"
      },
    @"3xl--lineHeight": @{
      @"value": 2.25rem,
      @"name": @"FontSize3xlLineHeight",
      @"category": @"fontSize",
      @"type": @"3xl--lineHeight"
      },
    @"4xl": @{
      @"value": 2.25rem,
      @"name": @"FontSize4xl",
      @"category": @"fontSize",
      @"type": @"4xl"
      },
    @"4xl--lineHeight": @{
      @"value": 2.5rem,
      @"name": @"FontSize4xlLineHeight",
      @"category": @"fontSize",
      @"type": @"4xl--lineHeight"
      },
    @"5xl": @{
      @"value": 3rem,
      @"name": @"FontSize5xl",
      @"category": @"fontSize",
      @"type": @"5xl"
      },
    @"5xl--lineHeight": @{
      @"value": 1,
      @"name": @"FontSize5xlLineHeight",
      @"category": @"fontSize",
      @"type": @"5xl--lineHeight"
      },
    @"6xl": @{
      @"value": 3.75rem,
      @"name": @"FontSize6xl",
      @"category": @"fontSize",
      @"type": @"6xl"
      },
    @"6xl--lineHeight": @{
      @"value": 1,
      @"name": @"FontSize6xlLineHeight",
      @"category": @"fontSize",
      @"type": @"6xl--lineHeight"
      },
    @"7xl": @{
      @"value": 4.5rem,
      @"name": @"FontSize7xl",
      @"category": @"fontSize",
      @"type": @"7xl"
      },
    @"7xl--lineHeight": @{
      @"value": 1,
      @"name": @"FontSize7xlLineHeight",
      @"category": @"fontSize",
      @"type": @"7xl--lineHeight"
      },
    @"8xl": @{
      @"value": 6rem,
      @"name": @"FontSize8xl",
      @"category": @"fontSize",
      @"type": @"8xl"
      },
    @"8xl--lineHeight": @{
      @"value": 1,
      @"name": @"FontSize8xlLineHeight",
      @"category": @"fontSize",
      @"type": @"8xl--lineHeight"
      },
    @"9xl": @{
      @"value": 8rem,
      @"name": @"FontSize9xl",
      @"category": @"fontSize",
      @"type": @"9xl"
      },
    @"9xl--lineHeight": @{
      @"value": 1,
      @"name": @"FontSize9xlLineHeight",
      @"category": @"fontSize",
      @"type": @"9xl--lineHeight"
      }
    },
  @"fontWeight": @{
    @"thin": @{
      @"value": 100,
      @"name": @"FontWeightThin",
      @"category": @"fontWeight",
      @"type": @"thin"
      },
    @"extralight": @{
      @"value": 200,
      @"name": @"FontWeightExtralight",
      @"category": @"fontWeight",
      @"type": @"extralight"
      },
    @"light": @{
      @"value": 300,
      @"name": @"FontWeightLight",
      @"category": @"fontWeight",
      @"type": @"light"
      },
    @"normal": @{
      @"value": 400,
      @"name": @"FontWeightNormal",
      @"category": @"fontWeight",
      @"type": @"normal"
      },
    @"medium": @{
      @"value": 500,
      @"name": @"FontWeightMedium",
      @"category": @"fontWeight",
      @"type": @"medium"
      },
    @"semibold": @{
      @"value": 600,
      @"name": @"FontWeightSemibold",
      @"category": @"fontWeight",
      @"type": @"semibold"
      },
    @"bold": @{
      @"value": 700,
      @"name": @"FontWeightBold",
      @"category": @"fontWeight",
      @"type": @"bold"
      },
    @"extrabold": @{
      @"value": 800,
      @"name": @"FontWeightExtrabold",
      @"category": @"fontWeight",
      @"type": @"extrabold"
      },
    @"black": @{
      @"value": 900,
      @"name": @"FontWeightBlack",
      @"category": @"fontWeight",
      @"type": @"black"
      }
    },
  @"gap": @{
    @"0": @{
      @"value": 0px,
      @"name": @"Gap0",
      @"category": @"gap",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"Gap1",
      @"category": @"gap",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"Gap2",
      @"category": @"gap",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"Gap3",
      @"category": @"gap",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"Gap4",
      @"category": @"gap",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"Gap5",
      @"category": @"gap",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"Gap6",
      @"category": @"gap",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"Gap7",
      @"category": @"gap",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"Gap8",
      @"category": @"gap",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"Gap9",
      @"category": @"gap",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"Gap10",
      @"category": @"gap",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"Gap11",
      @"category": @"gap",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"Gap12",
      @"category": @"gap",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"Gap14",
      @"category": @"gap",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"Gap16",
      @"category": @"gap",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"Gap20",
      @"category": @"gap",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"Gap24",
      @"category": @"gap",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"Gap28",
      @"category": @"gap",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"Gap32",
      @"category": @"gap",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"Gap36",
      @"category": @"gap",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"Gap40",
      @"category": @"gap",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"Gap44",
      @"category": @"gap",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"Gap48",
      @"category": @"gap",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"Gap52",
      @"category": @"gap",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"Gap56",
      @"category": @"gap",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"Gap60",
      @"category": @"gap",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"Gap64",
      @"category": @"gap",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"Gap72",
      @"category": @"gap",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"Gap80",
      @"category": @"gap",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"Gap96",
      @"category": @"gap",
      @"type": @"96"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"GapPx",
      @"category": @"gap",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"Gap05",
      @"category": @"gap",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"Gap15",
      @"category": @"gap",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"Gap25",
      @"category": @"gap",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"Gap35",
      @"category": @"gap",
      @"type": @"3.5"
      }
    },
  @"gradientColorStops": @{
    @"inherit": @{
      @"value": inherit,
      @"name": @"GradientColorStopsInherit",
      @"category": @"gradientColorStops",
      @"type": @"inherit"
      },
    @"current": @{
      @"value": currentColor,
      @"name": @"GradientColorStopsCurrent",
      @"category": @"gradientColorStops",
      @"type": @"current"
      },
    @"transparent": @{
      @"value": transparent,
      @"name": @"GradientColorStopsTransparent",
      @"category": @"gradientColorStops",
      @"type": @"transparent"
      },
    @"black": @{
      @"value": #000,
      @"name": @"GradientColorStopsBlack",
      @"category": @"gradientColorStops",
      @"type": @"black"
      },
    @"white": @{
      @"value": #fff,
      @"name": @"GradientColorStopsWhite",
      @"category": @"gradientColorStops",
      @"type": @"white"
      },
    @"slate": @{
      @"50": @{
        @"value": #f8fafc,
        @"name": @"GradientColorStopsSlate50",
        @"category": @"gradientColorStops",
        @"type": @"slate",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f1f5f9,
        @"name": @"GradientColorStopsSlate100",
        @"category": @"gradientColorStops",
        @"type": @"slate",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e2e8f0,
        @"name": @"GradientColorStopsSlate200",
        @"category": @"gradientColorStops",
        @"type": @"slate",
        @"item": @"200"
        },
      @"300": @{
        @"value": #cbd5e1,
        @"name": @"GradientColorStopsSlate300",
        @"category": @"gradientColorStops",
        @"type": @"slate",
        @"item": @"300"
        },
      @"400": @{
        @"value": #94a3b8,
        @"name": @"GradientColorStopsSlate400",
        @"category": @"gradientColorStops",
        @"type": @"slate",
        @"item": @"400"
        },
      @"500": @{
        @"value": #64748b,
        @"name": @"GradientColorStopsSlate500",
        @"category": @"gradientColorStops",
        @"type": @"slate",
        @"item": @"500"
        },
      @"600": @{
        @"value": #475569,
        @"name": @"GradientColorStopsSlate600",
        @"category": @"gradientColorStops",
        @"type": @"slate",
        @"item": @"600"
        },
      @"700": @{
        @"value": #334155,
        @"name": @"GradientColorStopsSlate700",
        @"category": @"gradientColorStops",
        @"type": @"slate",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e293b,
        @"name": @"GradientColorStopsSlate800",
        @"category": @"gradientColorStops",
        @"type": @"slate",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0f172a,
        @"name": @"GradientColorStopsSlate900",
        @"category": @"gradientColorStops",
        @"type": @"slate",
        @"item": @"900"
        },
      @"950": @{
        @"value": #020617,
        @"name": @"GradientColorStopsSlate950",
        @"category": @"gradientColorStops",
        @"type": @"slate",
        @"item": @"950"
        }
      },
    @"gray": @{
      @"50": @{
        @"value": #f9fafb,
        @"name": @"GradientColorStopsGray50",
        @"category": @"gradientColorStops",
        @"type": @"gray",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3f4f6,
        @"name": @"GradientColorStopsGray100",
        @"category": @"gradientColorStops",
        @"type": @"gray",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e7eb,
        @"name": @"GradientColorStopsGray200",
        @"category": @"gradientColorStops",
        @"type": @"gray",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d1d5db,
        @"name": @"GradientColorStopsGray300",
        @"category": @"gradientColorStops",
        @"type": @"gray",
        @"item": @"300"
        },
      @"400": @{
        @"value": #9ca3af,
        @"name": @"GradientColorStopsGray400",
        @"category": @"gradientColorStops",
        @"type": @"gray",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6b7280,
        @"name": @"GradientColorStopsGray500",
        @"category": @"gradientColorStops",
        @"type": @"gray",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4b5563,
        @"name": @"GradientColorStopsGray600",
        @"category": @"gradientColorStops",
        @"type": @"gray",
        @"item": @"600"
        },
      @"700": @{
        @"value": #374151,
        @"name": @"GradientColorStopsGray700",
        @"category": @"gradientColorStops",
        @"type": @"gray",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1f2937,
        @"name": @"GradientColorStopsGray800",
        @"category": @"gradientColorStops",
        @"type": @"gray",
        @"item": @"800"
        },
      @"900": @{
        @"value": #111827,
        @"name": @"GradientColorStopsGray900",
        @"category": @"gradientColorStops",
        @"type": @"gray",
        @"item": @"900"
        },
      @"950": @{
        @"value": #030712,
        @"name": @"GradientColorStopsGray950",
        @"category": @"gradientColorStops",
        @"type": @"gray",
        @"item": @"950"
        }
      },
    @"zinc": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"GradientColorStopsZinc50",
        @"category": @"gradientColorStops",
        @"type": @"zinc",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f4f4f5,
        @"name": @"GradientColorStopsZinc100",
        @"category": @"gradientColorStops",
        @"type": @"zinc",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e4e4e7,
        @"name": @"GradientColorStopsZinc200",
        @"category": @"gradientColorStops",
        @"type": @"zinc",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d8,
        @"name": @"GradientColorStopsZinc300",
        @"category": @"gradientColorStops",
        @"type": @"zinc",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a1a1aa,
        @"name": @"GradientColorStopsZinc400",
        @"category": @"gradientColorStops",
        @"type": @"zinc",
        @"item": @"400"
        },
      @"500": @{
        @"value": #71717a,
        @"name": @"GradientColorStopsZinc500",
        @"category": @"gradientColorStops",
        @"type": @"zinc",
        @"item": @"500"
        },
      @"600": @{
        @"value": #52525b,
        @"name": @"GradientColorStopsZinc600",
        @"category": @"gradientColorStops",
        @"type": @"zinc",
        @"item": @"600"
        },
      @"700": @{
        @"value": #3f3f46,
        @"name": @"GradientColorStopsZinc700",
        @"category": @"gradientColorStops",
        @"type": @"zinc",
        @"item": @"700"
        },
      @"800": @{
        @"value": #27272a,
        @"name": @"GradientColorStopsZinc800",
        @"category": @"gradientColorStops",
        @"type": @"zinc",
        @"item": @"800"
        },
      @"900": @{
        @"value": #18181b,
        @"name": @"GradientColorStopsZinc900",
        @"category": @"gradientColorStops",
        @"type": @"zinc",
        @"item": @"900"
        },
      @"950": @{
        @"value": #09090b,
        @"name": @"GradientColorStopsZinc950",
        @"category": @"gradientColorStops",
        @"type": @"zinc",
        @"item": @"950"
        }
      },
    @"neutral": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"GradientColorStopsNeutral50",
        @"category": @"gradientColorStops",
        @"type": @"neutral",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f5,
        @"name": @"GradientColorStopsNeutral100",
        @"category": @"gradientColorStops",
        @"type": @"neutral",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e5e5,
        @"name": @"GradientColorStopsNeutral200",
        @"category": @"gradientColorStops",
        @"type": @"neutral",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d4,
        @"name": @"GradientColorStopsNeutral300",
        @"category": @"gradientColorStops",
        @"type": @"neutral",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3a3a3,
        @"name": @"GradientColorStopsNeutral400",
        @"category": @"gradientColorStops",
        @"type": @"neutral",
        @"item": @"400"
        },
      @"500": @{
        @"value": #737373,
        @"name": @"GradientColorStopsNeutral500",
        @"category": @"gradientColorStops",
        @"type": @"neutral",
        @"item": @"500"
        },
      @"600": @{
        @"value": #525252,
        @"name": @"GradientColorStopsNeutral600",
        @"category": @"gradientColorStops",
        @"type": @"neutral",
        @"item": @"600"
        },
      @"700": @{
        @"value": #404040,
        @"name": @"GradientColorStopsNeutral700",
        @"category": @"gradientColorStops",
        @"type": @"neutral",
        @"item": @"700"
        },
      @"800": @{
        @"value": #262626,
        @"name": @"GradientColorStopsNeutral800",
        @"category": @"gradientColorStops",
        @"type": @"neutral",
        @"item": @"800"
        },
      @"900": @{
        @"value": #171717,
        @"name": @"GradientColorStopsNeutral900",
        @"category": @"gradientColorStops",
        @"type": @"neutral",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0a0a0a,
        @"name": @"GradientColorStopsNeutral950",
        @"category": @"gradientColorStops",
        @"type": @"neutral",
        @"item": @"950"
        }
      },
    @"stone": @{
      @"50": @{
        @"value": #fafaf9,
        @"name": @"GradientColorStopsStone50",
        @"category": @"gradientColorStops",
        @"type": @"stone",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f4,
        @"name": @"GradientColorStopsStone100",
        @"category": @"gradientColorStops",
        @"type": @"stone",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e7e5e4,
        @"name": @"GradientColorStopsStone200",
        @"category": @"gradientColorStops",
        @"type": @"stone",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d6d3d1,
        @"name": @"GradientColorStopsStone300",
        @"category": @"gradientColorStops",
        @"type": @"stone",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a8a29e,
        @"name": @"GradientColorStopsStone400",
        @"category": @"gradientColorStops",
        @"type": @"stone",
        @"item": @"400"
        },
      @"500": @{
        @"value": #78716c,
        @"name": @"GradientColorStopsStone500",
        @"category": @"gradientColorStops",
        @"type": @"stone",
        @"item": @"500"
        },
      @"600": @{
        @"value": #57534e,
        @"name": @"GradientColorStopsStone600",
        @"category": @"gradientColorStops",
        @"type": @"stone",
        @"item": @"600"
        },
      @"700": @{
        @"value": #44403c,
        @"name": @"GradientColorStopsStone700",
        @"category": @"gradientColorStops",
        @"type": @"stone",
        @"item": @"700"
        },
      @"800": @{
        @"value": #292524,
        @"name": @"GradientColorStopsStone800",
        @"category": @"gradientColorStops",
        @"type": @"stone",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1c1917,
        @"name": @"GradientColorStopsStone900",
        @"category": @"gradientColorStops",
        @"type": @"stone",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0c0a09,
        @"name": @"GradientColorStopsStone950",
        @"category": @"gradientColorStops",
        @"type": @"stone",
        @"item": @"950"
        }
      },
    @"red": @{
      @"50": @{
        @"value": #fef2f2,
        @"name": @"GradientColorStopsRed50",
        @"category": @"gradientColorStops",
        @"type": @"red",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fee2e2,
        @"name": @"GradientColorStopsRed100",
        @"category": @"gradientColorStops",
        @"type": @"red",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecaca,
        @"name": @"GradientColorStopsRed200",
        @"category": @"gradientColorStops",
        @"type": @"red",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fca5a5,
        @"name": @"GradientColorStopsRed300",
        @"category": @"gradientColorStops",
        @"type": @"red",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f87171,
        @"name": @"GradientColorStopsRed400",
        @"category": @"gradientColorStops",
        @"type": @"red",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ef4444,
        @"name": @"GradientColorStopsRed500",
        @"category": @"gradientColorStops",
        @"type": @"red",
        @"item": @"500"
        },
      @"600": @{
        @"value": #dc2626,
        @"name": @"GradientColorStopsRed600",
        @"category": @"gradientColorStops",
        @"type": @"red",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b91c1c,
        @"name": @"GradientColorStopsRed700",
        @"category": @"gradientColorStops",
        @"type": @"red",
        @"item": @"700"
        },
      @"800": @{
        @"value": #991b1b,
        @"name": @"GradientColorStopsRed800",
        @"category": @"gradientColorStops",
        @"type": @"red",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7f1d1d,
        @"name": @"GradientColorStopsRed900",
        @"category": @"gradientColorStops",
        @"type": @"red",
        @"item": @"900"
        },
      @"950": @{
        @"value": #450a0a,
        @"name": @"GradientColorStopsRed950",
        @"category": @"gradientColorStops",
        @"type": @"red",
        @"item": @"950"
        }
      },
    @"orange": @{
      @"50": @{
        @"value": #fff7ed,
        @"name": @"GradientColorStopsOrange50",
        @"category": @"gradientColorStops",
        @"type": @"orange",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffedd5,
        @"name": @"GradientColorStopsOrange100",
        @"category": @"gradientColorStops",
        @"type": @"orange",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fed7aa,
        @"name": @"GradientColorStopsOrange200",
        @"category": @"gradientColorStops",
        @"type": @"orange",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fdba74,
        @"name": @"GradientColorStopsOrange300",
        @"category": @"gradientColorStops",
        @"type": @"orange",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb923c,
        @"name": @"GradientColorStopsOrange400",
        @"category": @"gradientColorStops",
        @"type": @"orange",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f97316,
        @"name": @"GradientColorStopsOrange500",
        @"category": @"gradientColorStops",
        @"type": @"orange",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ea580c,
        @"name": @"GradientColorStopsOrange600",
        @"category": @"gradientColorStops",
        @"type": @"orange",
        @"item": @"600"
        },
      @"700": @{
        @"value": #c2410c,
        @"name": @"GradientColorStopsOrange700",
        @"category": @"gradientColorStops",
        @"type": @"orange",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9a3412,
        @"name": @"GradientColorStopsOrange800",
        @"category": @"gradientColorStops",
        @"type": @"orange",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7c2d12,
        @"name": @"GradientColorStopsOrange900",
        @"category": @"gradientColorStops",
        @"type": @"orange",
        @"item": @"900"
        },
      @"950": @{
        @"value": #431407,
        @"name": @"GradientColorStopsOrange950",
        @"category": @"gradientColorStops",
        @"type": @"orange",
        @"item": @"950"
        }
      },
    @"amber": @{
      @"50": @{
        @"value": #fffbeb,
        @"name": @"GradientColorStopsAmber50",
        @"category": @"gradientColorStops",
        @"type": @"amber",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef3c7,
        @"name": @"GradientColorStopsAmber100",
        @"category": @"gradientColorStops",
        @"type": @"amber",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fde68a,
        @"name": @"GradientColorStopsAmber200",
        @"category": @"gradientColorStops",
        @"type": @"amber",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fcd34d,
        @"name": @"GradientColorStopsAmber300",
        @"category": @"gradientColorStops",
        @"type": @"amber",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fbbf24,
        @"name": @"GradientColorStopsAmber400",
        @"category": @"gradientColorStops",
        @"type": @"amber",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f59e0b,
        @"name": @"GradientColorStopsAmber500",
        @"category": @"gradientColorStops",
        @"type": @"amber",
        @"item": @"500"
        },
      @"600": @{
        @"value": #d97706,
        @"name": @"GradientColorStopsAmber600",
        @"category": @"gradientColorStops",
        @"type": @"amber",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b45309,
        @"name": @"GradientColorStopsAmber700",
        @"category": @"gradientColorStops",
        @"type": @"amber",
        @"item": @"700"
        },
      @"800": @{
        @"value": #92400e,
        @"name": @"GradientColorStopsAmber800",
        @"category": @"gradientColorStops",
        @"type": @"amber",
        @"item": @"800"
        },
      @"900": @{
        @"value": #78350f,
        @"name": @"GradientColorStopsAmber900",
        @"category": @"gradientColorStops",
        @"type": @"amber",
        @"item": @"900"
        },
      @"950": @{
        @"value": #451a03,
        @"name": @"GradientColorStopsAmber950",
        @"category": @"gradientColorStops",
        @"type": @"amber",
        @"item": @"950"
        }
      },
    @"yellow": @{
      @"50": @{
        @"value": #fefce8,
        @"name": @"GradientColorStopsYellow50",
        @"category": @"gradientColorStops",
        @"type": @"yellow",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef9c3,
        @"name": @"GradientColorStopsYellow100",
        @"category": @"gradientColorStops",
        @"type": @"yellow",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fef08a,
        @"name": @"GradientColorStopsYellow200",
        @"category": @"gradientColorStops",
        @"type": @"yellow",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fde047,
        @"name": @"GradientColorStopsYellow300",
        @"category": @"gradientColorStops",
        @"type": @"yellow",
        @"item": @"300"
        },
      @"400": @{
        @"value": #facc15,
        @"name": @"GradientColorStopsYellow400",
        @"category": @"gradientColorStops",
        @"type": @"yellow",
        @"item": @"400"
        },
      @"500": @{
        @"value": #eab308,
        @"name": @"GradientColorStopsYellow500",
        @"category": @"gradientColorStops",
        @"type": @"yellow",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ca8a04,
        @"name": @"GradientColorStopsYellow600",
        @"category": @"gradientColorStops",
        @"type": @"yellow",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a16207,
        @"name": @"GradientColorStopsYellow700",
        @"category": @"gradientColorStops",
        @"type": @"yellow",
        @"item": @"700"
        },
      @"800": @{
        @"value": #854d0e,
        @"name": @"GradientColorStopsYellow800",
        @"category": @"gradientColorStops",
        @"type": @"yellow",
        @"item": @"800"
        },
      @"900": @{
        @"value": #713f12,
        @"name": @"GradientColorStopsYellow900",
        @"category": @"gradientColorStops",
        @"type": @"yellow",
        @"item": @"900"
        },
      @"950": @{
        @"value": #422006,
        @"name": @"GradientColorStopsYellow950",
        @"category": @"gradientColorStops",
        @"type": @"yellow",
        @"item": @"950"
        }
      },
    @"lime": @{
      @"50": @{
        @"value": #f7fee7,
        @"name": @"GradientColorStopsLime50",
        @"category": @"gradientColorStops",
        @"type": @"lime",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ecfccb,
        @"name": @"GradientColorStopsLime100",
        @"category": @"gradientColorStops",
        @"type": @"lime",
        @"item": @"100"
        },
      @"200": @{
        @"value": #d9f99d,
        @"name": @"GradientColorStopsLime200",
        @"category": @"gradientColorStops",
        @"type": @"lime",
        @"item": @"200"
        },
      @"300": @{
        @"value": #bef264,
        @"name": @"GradientColorStopsLime300",
        @"category": @"gradientColorStops",
        @"type": @"lime",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3e635,
        @"name": @"GradientColorStopsLime400",
        @"category": @"gradientColorStops",
        @"type": @"lime",
        @"item": @"400"
        },
      @"500": @{
        @"value": #84cc16,
        @"name": @"GradientColorStopsLime500",
        @"category": @"gradientColorStops",
        @"type": @"lime",
        @"item": @"500"
        },
      @"600": @{
        @"value": #65a30d,
        @"name": @"GradientColorStopsLime600",
        @"category": @"gradientColorStops",
        @"type": @"lime",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4d7c0f,
        @"name": @"GradientColorStopsLime700",
        @"category": @"gradientColorStops",
        @"type": @"lime",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3f6212,
        @"name": @"GradientColorStopsLime800",
        @"category": @"gradientColorStops",
        @"type": @"lime",
        @"item": @"800"
        },
      @"900": @{
        @"value": #365314,
        @"name": @"GradientColorStopsLime900",
        @"category": @"gradientColorStops",
        @"type": @"lime",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1a2e05,
        @"name": @"GradientColorStopsLime950",
        @"category": @"gradientColorStops",
        @"type": @"lime",
        @"item": @"950"
        }
      },
    @"green": @{
      @"50": @{
        @"value": #f0fdf4,
        @"name": @"GradientColorStopsGreen50",
        @"category": @"gradientColorStops",
        @"type": @"green",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dcfce7,
        @"name": @"GradientColorStopsGreen100",
        @"category": @"gradientColorStops",
        @"type": @"green",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bbf7d0,
        @"name": @"GradientColorStopsGreen200",
        @"category": @"gradientColorStops",
        @"type": @"green",
        @"item": @"200"
        },
      @"300": @{
        @"value": #86efac,
        @"name": @"GradientColorStopsGreen300",
        @"category": @"gradientColorStops",
        @"type": @"green",
        @"item": @"300"
        },
      @"400": @{
        @"value": #4ade80,
        @"name": @"GradientColorStopsGreen400",
        @"category": @"gradientColorStops",
        @"type": @"green",
        @"item": @"400"
        },
      @"500": @{
        @"value": #22c55e,
        @"name": @"GradientColorStopsGreen500",
        @"category": @"gradientColorStops",
        @"type": @"green",
        @"item": @"500"
        },
      @"600": @{
        @"value": #16a34a,
        @"name": @"GradientColorStopsGreen600",
        @"category": @"gradientColorStops",
        @"type": @"green",
        @"item": @"600"
        },
      @"700": @{
        @"value": #15803d,
        @"name": @"GradientColorStopsGreen700",
        @"category": @"gradientColorStops",
        @"type": @"green",
        @"item": @"700"
        },
      @"800": @{
        @"value": #166534,
        @"name": @"GradientColorStopsGreen800",
        @"category": @"gradientColorStops",
        @"type": @"green",
        @"item": @"800"
        },
      @"900": @{
        @"value": #14532d,
        @"name": @"GradientColorStopsGreen900",
        @"category": @"gradientColorStops",
        @"type": @"green",
        @"item": @"900"
        },
      @"950": @{
        @"value": #052e16,
        @"name": @"GradientColorStopsGreen950",
        @"category": @"gradientColorStops",
        @"type": @"green",
        @"item": @"950"
        }
      },
    @"emerald": @{
      @"50": @{
        @"value": #ecfdf5,
        @"name": @"GradientColorStopsEmerald50",
        @"category": @"gradientColorStops",
        @"type": @"emerald",
        @"item": @"50"
        },
      @"100": @{
        @"value": #d1fae5,
        @"name": @"GradientColorStopsEmerald100",
        @"category": @"gradientColorStops",
        @"type": @"emerald",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a7f3d0,
        @"name": @"GradientColorStopsEmerald200",
        @"category": @"gradientColorStops",
        @"type": @"emerald",
        @"item": @"200"
        },
      @"300": @{
        @"value": #6ee7b7,
        @"name": @"GradientColorStopsEmerald300",
        @"category": @"gradientColorStops",
        @"type": @"emerald",
        @"item": @"300"
        },
      @"400": @{
        @"value": #34d399,
        @"name": @"GradientColorStopsEmerald400",
        @"category": @"gradientColorStops",
        @"type": @"emerald",
        @"item": @"400"
        },
      @"500": @{
        @"value": #10b981,
        @"name": @"GradientColorStopsEmerald500",
        @"category": @"gradientColorStops",
        @"type": @"emerald",
        @"item": @"500"
        },
      @"600": @{
        @"value": #059669,
        @"name": @"GradientColorStopsEmerald600",
        @"category": @"gradientColorStops",
        @"type": @"emerald",
        @"item": @"600"
        },
      @"700": @{
        @"value": #047857,
        @"name": @"GradientColorStopsEmerald700",
        @"category": @"gradientColorStops",
        @"type": @"emerald",
        @"item": @"700"
        },
      @"800": @{
        @"value": #065f46,
        @"name": @"GradientColorStopsEmerald800",
        @"category": @"gradientColorStops",
        @"type": @"emerald",
        @"item": @"800"
        },
      @"900": @{
        @"value": #064e3b,
        @"name": @"GradientColorStopsEmerald900",
        @"category": @"gradientColorStops",
        @"type": @"emerald",
        @"item": @"900"
        },
      @"950": @{
        @"value": #022c22,
        @"name": @"GradientColorStopsEmerald950",
        @"category": @"gradientColorStops",
        @"type": @"emerald",
        @"item": @"950"
        }
      },
    @"teal": @{
      @"50": @{
        @"value": #f0fdfa,
        @"name": @"GradientColorStopsTeal50",
        @"category": @"gradientColorStops",
        @"type": @"teal",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ccfbf1,
        @"name": @"GradientColorStopsTeal100",
        @"category": @"gradientColorStops",
        @"type": @"teal",
        @"item": @"100"
        },
      @"200": @{
        @"value": #99f6e4,
        @"name": @"GradientColorStopsTeal200",
        @"category": @"gradientColorStops",
        @"type": @"teal",
        @"item": @"200"
        },
      @"300": @{
        @"value": #5eead4,
        @"name": @"GradientColorStopsTeal300",
        @"category": @"gradientColorStops",
        @"type": @"teal",
        @"item": @"300"
        },
      @"400": @{
        @"value": #2dd4bf,
        @"name": @"GradientColorStopsTeal400",
        @"category": @"gradientColorStops",
        @"type": @"teal",
        @"item": @"400"
        },
      @"500": @{
        @"value": #14b8a6,
        @"name": @"GradientColorStopsTeal500",
        @"category": @"gradientColorStops",
        @"type": @"teal",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0d9488,
        @"name": @"GradientColorStopsTeal600",
        @"category": @"gradientColorStops",
        @"type": @"teal",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0f766e,
        @"name": @"GradientColorStopsTeal700",
        @"category": @"gradientColorStops",
        @"type": @"teal",
        @"item": @"700"
        },
      @"800": @{
        @"value": #115e59,
        @"name": @"GradientColorStopsTeal800",
        @"category": @"gradientColorStops",
        @"type": @"teal",
        @"item": @"800"
        },
      @"900": @{
        @"value": #134e4a,
        @"name": @"GradientColorStopsTeal900",
        @"category": @"gradientColorStops",
        @"type": @"teal",
        @"item": @"900"
        },
      @"950": @{
        @"value": #042f2e,
        @"name": @"GradientColorStopsTeal950",
        @"category": @"gradientColorStops",
        @"type": @"teal",
        @"item": @"950"
        }
      },
    @"cyan": @{
      @"50": @{
        @"value": #ecfeff,
        @"name": @"GradientColorStopsCyan50",
        @"category": @"gradientColorStops",
        @"type": @"cyan",
        @"item": @"50"
        },
      @"100": @{
        @"value": #cffafe,
        @"name": @"GradientColorStopsCyan100",
        @"category": @"gradientColorStops",
        @"type": @"cyan",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a5f3fc,
        @"name": @"GradientColorStopsCyan200",
        @"category": @"gradientColorStops",
        @"type": @"cyan",
        @"item": @"200"
        },
      @"300": @{
        @"value": #67e8f9,
        @"name": @"GradientColorStopsCyan300",
        @"category": @"gradientColorStops",
        @"type": @"cyan",
        @"item": @"300"
        },
      @"400": @{
        @"value": #22d3ee,
        @"name": @"GradientColorStopsCyan400",
        @"category": @"gradientColorStops",
        @"type": @"cyan",
        @"item": @"400"
        },
      @"500": @{
        @"value": #06b6d4,
        @"name": @"GradientColorStopsCyan500",
        @"category": @"gradientColorStops",
        @"type": @"cyan",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0891b2,
        @"name": @"GradientColorStopsCyan600",
        @"category": @"gradientColorStops",
        @"type": @"cyan",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0e7490,
        @"name": @"GradientColorStopsCyan700",
        @"category": @"gradientColorStops",
        @"type": @"cyan",
        @"item": @"700"
        },
      @"800": @{
        @"value": #155e75,
        @"name": @"GradientColorStopsCyan800",
        @"category": @"gradientColorStops",
        @"type": @"cyan",
        @"item": @"800"
        },
      @"900": @{
        @"value": #164e63,
        @"name": @"GradientColorStopsCyan900",
        @"category": @"gradientColorStops",
        @"type": @"cyan",
        @"item": @"900"
        },
      @"950": @{
        @"value": #083344,
        @"name": @"GradientColorStopsCyan950",
        @"category": @"gradientColorStops",
        @"type": @"cyan",
        @"item": @"950"
        }
      },
    @"sky": @{
      @"50": @{
        @"value": #f0f9ff,
        @"name": @"GradientColorStopsSky50",
        @"category": @"gradientColorStops",
        @"type": @"sky",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0f2fe,
        @"name": @"GradientColorStopsSky100",
        @"category": @"gradientColorStops",
        @"type": @"sky",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bae6fd,
        @"name": @"GradientColorStopsSky200",
        @"category": @"gradientColorStops",
        @"type": @"sky",
        @"item": @"200"
        },
      @"300": @{
        @"value": #7dd3fc,
        @"name": @"GradientColorStopsSky300",
        @"category": @"gradientColorStops",
        @"type": @"sky",
        @"item": @"300"
        },
      @"400": @{
        @"value": #38bdf8,
        @"name": @"GradientColorStopsSky400",
        @"category": @"gradientColorStops",
        @"type": @"sky",
        @"item": @"400"
        },
      @"500": @{
        @"value": #0ea5e9,
        @"name": @"GradientColorStopsSky500",
        @"category": @"gradientColorStops",
        @"type": @"sky",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0284c7,
        @"name": @"GradientColorStopsSky600",
        @"category": @"gradientColorStops",
        @"type": @"sky",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0369a1,
        @"name": @"GradientColorStopsSky700",
        @"category": @"gradientColorStops",
        @"type": @"sky",
        @"item": @"700"
        },
      @"800": @{
        @"value": #075985,
        @"name": @"GradientColorStopsSky800",
        @"category": @"gradientColorStops",
        @"type": @"sky",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0c4a6e,
        @"name": @"GradientColorStopsSky900",
        @"category": @"gradientColorStops",
        @"type": @"sky",
        @"item": @"900"
        },
      @"950": @{
        @"value": #082f49,
        @"name": @"GradientColorStopsSky950",
        @"category": @"gradientColorStops",
        @"type": @"sky",
        @"item": @"950"
        }
      },
    @"blue": @{
      @"50": @{
        @"value": #eff6ff,
        @"name": @"GradientColorStopsBlue50",
        @"category": @"gradientColorStops",
        @"type": @"blue",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dbeafe,
        @"name": @"GradientColorStopsBlue100",
        @"category": @"gradientColorStops",
        @"type": @"blue",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bfdbfe,
        @"name": @"GradientColorStopsBlue200",
        @"category": @"gradientColorStops",
        @"type": @"blue",
        @"item": @"200"
        },
      @"300": @{
        @"value": #93c5fd,
        @"name": @"GradientColorStopsBlue300",
        @"category": @"gradientColorStops",
        @"type": @"blue",
        @"item": @"300"
        },
      @"400": @{
        @"value": #60a5fa,
        @"name": @"GradientColorStopsBlue400",
        @"category": @"gradientColorStops",
        @"type": @"blue",
        @"item": @"400"
        },
      @"500": @{
        @"value": #3b82f6,
        @"name": @"GradientColorStopsBlue500",
        @"category": @"gradientColorStops",
        @"type": @"blue",
        @"item": @"500"
        },
      @"600": @{
        @"value": #2563eb,
        @"name": @"GradientColorStopsBlue600",
        @"category": @"gradientColorStops",
        @"type": @"blue",
        @"item": @"600"
        },
      @"700": @{
        @"value": #1d4ed8,
        @"name": @"GradientColorStopsBlue700",
        @"category": @"gradientColorStops",
        @"type": @"blue",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e40af,
        @"name": @"GradientColorStopsBlue800",
        @"category": @"gradientColorStops",
        @"type": @"blue",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1e3a8a,
        @"name": @"GradientColorStopsBlue900",
        @"category": @"gradientColorStops",
        @"type": @"blue",
        @"item": @"900"
        },
      @"950": @{
        @"value": #172554,
        @"name": @"GradientColorStopsBlue950",
        @"category": @"gradientColorStops",
        @"type": @"blue",
        @"item": @"950"
        }
      },
    @"indigo": @{
      @"50": @{
        @"value": #eef2ff,
        @"name": @"GradientColorStopsIndigo50",
        @"category": @"gradientColorStops",
        @"type": @"indigo",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0e7ff,
        @"name": @"GradientColorStopsIndigo100",
        @"category": @"gradientColorStops",
        @"type": @"indigo",
        @"item": @"100"
        },
      @"200": @{
        @"value": #c7d2fe,
        @"name": @"GradientColorStopsIndigo200",
        @"category": @"gradientColorStops",
        @"type": @"indigo",
        @"item": @"200"
        },
      @"300": @{
        @"value": #a5b4fc,
        @"name": @"GradientColorStopsIndigo300",
        @"category": @"gradientColorStops",
        @"type": @"indigo",
        @"item": @"300"
        },
      @"400": @{
        @"value": #818cf8,
        @"name": @"GradientColorStopsIndigo400",
        @"category": @"gradientColorStops",
        @"type": @"indigo",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6366f1,
        @"name": @"GradientColorStopsIndigo500",
        @"category": @"gradientColorStops",
        @"type": @"indigo",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4f46e5,
        @"name": @"GradientColorStopsIndigo600",
        @"category": @"gradientColorStops",
        @"type": @"indigo",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4338ca,
        @"name": @"GradientColorStopsIndigo700",
        @"category": @"gradientColorStops",
        @"type": @"indigo",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3730a3,
        @"name": @"GradientColorStopsIndigo800",
        @"category": @"gradientColorStops",
        @"type": @"indigo",
        @"item": @"800"
        },
      @"900": @{
        @"value": #312e81,
        @"name": @"GradientColorStopsIndigo900",
        @"category": @"gradientColorStops",
        @"type": @"indigo",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1e1b4b,
        @"name": @"GradientColorStopsIndigo950",
        @"category": @"gradientColorStops",
        @"type": @"indigo",
        @"item": @"950"
        }
      },
    @"violet": @{
      @"50": @{
        @"value": #f5f3ff,
        @"name": @"GradientColorStopsViolet50",
        @"category": @"gradientColorStops",
        @"type": @"violet",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ede9fe,
        @"name": @"GradientColorStopsViolet100",
        @"category": @"gradientColorStops",
        @"type": @"violet",
        @"item": @"100"
        },
      @"200": @{
        @"value": #ddd6fe,
        @"name": @"GradientColorStopsViolet200",
        @"category": @"gradientColorStops",
        @"type": @"violet",
        @"item": @"200"
        },
      @"300": @{
        @"value": #c4b5fd,
        @"name": @"GradientColorStopsViolet300",
        @"category": @"gradientColorStops",
        @"type": @"violet",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a78bfa,
        @"name": @"GradientColorStopsViolet400",
        @"category": @"gradientColorStops",
        @"type": @"violet",
        @"item": @"400"
        },
      @"500": @{
        @"value": #8b5cf6,
        @"name": @"GradientColorStopsViolet500",
        @"category": @"gradientColorStops",
        @"type": @"violet",
        @"item": @"500"
        },
      @"600": @{
        @"value": #7c3aed,
        @"name": @"GradientColorStopsViolet600",
        @"category": @"gradientColorStops",
        @"type": @"violet",
        @"item": @"600"
        },
      @"700": @{
        @"value": #6d28d9,
        @"name": @"GradientColorStopsViolet700",
        @"category": @"gradientColorStops",
        @"type": @"violet",
        @"item": @"700"
        },
      @"800": @{
        @"value": #5b21b6,
        @"name": @"GradientColorStopsViolet800",
        @"category": @"gradientColorStops",
        @"type": @"violet",
        @"item": @"800"
        },
      @"900": @{
        @"value": #4c1d95,
        @"name": @"GradientColorStopsViolet900",
        @"category": @"gradientColorStops",
        @"type": @"violet",
        @"item": @"900"
        },
      @"950": @{
        @"value": #2e1065,
        @"name": @"GradientColorStopsViolet950",
        @"category": @"gradientColorStops",
        @"type": @"violet",
        @"item": @"950"
        }
      },
    @"purple": @{
      @"50": @{
        @"value": #faf5ff,
        @"name": @"GradientColorStopsPurple50",
        @"category": @"gradientColorStops",
        @"type": @"purple",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3e8ff,
        @"name": @"GradientColorStopsPurple100",
        @"category": @"gradientColorStops",
        @"type": @"purple",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e9d5ff,
        @"name": @"GradientColorStopsPurple200",
        @"category": @"gradientColorStops",
        @"type": @"purple",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d8b4fe,
        @"name": @"GradientColorStopsPurple300",
        @"category": @"gradientColorStops",
        @"type": @"purple",
        @"item": @"300"
        },
      @"400": @{
        @"value": #c084fc,
        @"name": @"GradientColorStopsPurple400",
        @"category": @"gradientColorStops",
        @"type": @"purple",
        @"item": @"400"
        },
      @"500": @{
        @"value": #a855f7,
        @"name": @"GradientColorStopsPurple500",
        @"category": @"gradientColorStops",
        @"type": @"purple",
        @"item": @"500"
        },
      @"600": @{
        @"value": #9333ea,
        @"name": @"GradientColorStopsPurple600",
        @"category": @"gradientColorStops",
        @"type": @"purple",
        @"item": @"600"
        },
      @"700": @{
        @"value": #7e22ce,
        @"name": @"GradientColorStopsPurple700",
        @"category": @"gradientColorStops",
        @"type": @"purple",
        @"item": @"700"
        },
      @"800": @{
        @"value": #6b21a8,
        @"name": @"GradientColorStopsPurple800",
        @"category": @"gradientColorStops",
        @"type": @"purple",
        @"item": @"800"
        },
      @"900": @{
        @"value": #581c87,
        @"name": @"GradientColorStopsPurple900",
        @"category": @"gradientColorStops",
        @"type": @"purple",
        @"item": @"900"
        },
      @"950": @{
        @"value": #3b0764,
        @"name": @"GradientColorStopsPurple950",
        @"category": @"gradientColorStops",
        @"type": @"purple",
        @"item": @"950"
        }
      },
    @"fuchsia": @{
      @"50": @{
        @"value": #fdf4ff,
        @"name": @"GradientColorStopsFuchsia50",
        @"category": @"gradientColorStops",
        @"type": @"fuchsia",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fae8ff,
        @"name": @"GradientColorStopsFuchsia100",
        @"category": @"gradientColorStops",
        @"type": @"fuchsia",
        @"item": @"100"
        },
      @"200": @{
        @"value": #f5d0fe,
        @"name": @"GradientColorStopsFuchsia200",
        @"category": @"gradientColorStops",
        @"type": @"fuchsia",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f0abfc,
        @"name": @"GradientColorStopsFuchsia300",
        @"category": @"gradientColorStops",
        @"type": @"fuchsia",
        @"item": @"300"
        },
      @"400": @{
        @"value": #e879f9,
        @"name": @"GradientColorStopsFuchsia400",
        @"category": @"gradientColorStops",
        @"type": @"fuchsia",
        @"item": @"400"
        },
      @"500": @{
        @"value": #d946ef,
        @"name": @"GradientColorStopsFuchsia500",
        @"category": @"gradientColorStops",
        @"type": @"fuchsia",
        @"item": @"500"
        },
      @"600": @{
        @"value": #c026d3,
        @"name": @"GradientColorStopsFuchsia600",
        @"category": @"gradientColorStops",
        @"type": @"fuchsia",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a21caf,
        @"name": @"GradientColorStopsFuchsia700",
        @"category": @"gradientColorStops",
        @"type": @"fuchsia",
        @"item": @"700"
        },
      @"800": @{
        @"value": #86198f,
        @"name": @"GradientColorStopsFuchsia800",
        @"category": @"gradientColorStops",
        @"type": @"fuchsia",
        @"item": @"800"
        },
      @"900": @{
        @"value": #701a75,
        @"name": @"GradientColorStopsFuchsia900",
        @"category": @"gradientColorStops",
        @"type": @"fuchsia",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4a044e,
        @"name": @"GradientColorStopsFuchsia950",
        @"category": @"gradientColorStops",
        @"type": @"fuchsia",
        @"item": @"950"
        }
      },
    @"pink": @{
      @"50": @{
        @"value": #fdf2f8,
        @"name": @"GradientColorStopsPink50",
        @"category": @"gradientColorStops",
        @"type": @"pink",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fce7f3,
        @"name": @"GradientColorStopsPink100",
        @"category": @"gradientColorStops",
        @"type": @"pink",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fbcfe8,
        @"name": @"GradientColorStopsPink200",
        @"category": @"gradientColorStops",
        @"type": @"pink",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f9a8d4,
        @"name": @"GradientColorStopsPink300",
        @"category": @"gradientColorStops",
        @"type": @"pink",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f472b6,
        @"name": @"GradientColorStopsPink400",
        @"category": @"gradientColorStops",
        @"type": @"pink",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ec4899,
        @"name": @"GradientColorStopsPink500",
        @"category": @"gradientColorStops",
        @"type": @"pink",
        @"item": @"500"
        },
      @"600": @{
        @"value": #db2777,
        @"name": @"GradientColorStopsPink600",
        @"category": @"gradientColorStops",
        @"type": @"pink",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be185d,
        @"name": @"GradientColorStopsPink700",
        @"category": @"gradientColorStops",
        @"type": @"pink",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9d174d,
        @"name": @"GradientColorStopsPink800",
        @"category": @"gradientColorStops",
        @"type": @"pink",
        @"item": @"800"
        },
      @"900": @{
        @"value": #831843,
        @"name": @"GradientColorStopsPink900",
        @"category": @"gradientColorStops",
        @"type": @"pink",
        @"item": @"900"
        },
      @"950": @{
        @"value": #500724,
        @"name": @"GradientColorStopsPink950",
        @"category": @"gradientColorStops",
        @"type": @"pink",
        @"item": @"950"
        }
      },
    @"rose": @{
      @"50": @{
        @"value": #fff1f2,
        @"name": @"GradientColorStopsRose50",
        @"category": @"gradientColorStops",
        @"type": @"rose",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffe4e6,
        @"name": @"GradientColorStopsRose100",
        @"category": @"gradientColorStops",
        @"type": @"rose",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecdd3,
        @"name": @"GradientColorStopsRose200",
        @"category": @"gradientColorStops",
        @"type": @"rose",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fda4af,
        @"name": @"GradientColorStopsRose300",
        @"category": @"gradientColorStops",
        @"type": @"rose",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb7185,
        @"name": @"GradientColorStopsRose400",
        @"category": @"gradientColorStops",
        @"type": @"rose",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f43f5e,
        @"name": @"GradientColorStopsRose500",
        @"category": @"gradientColorStops",
        @"type": @"rose",
        @"item": @"500"
        },
      @"600": @{
        @"value": #e11d48,
        @"name": @"GradientColorStopsRose600",
        @"category": @"gradientColorStops",
        @"type": @"rose",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be123c,
        @"name": @"GradientColorStopsRose700",
        @"category": @"gradientColorStops",
        @"type": @"rose",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9f1239,
        @"name": @"GradientColorStopsRose800",
        @"category": @"gradientColorStops",
        @"type": @"rose",
        @"item": @"800"
        },
      @"900": @{
        @"value": #881337,
        @"name": @"GradientColorStopsRose900",
        @"category": @"gradientColorStops",
        @"type": @"rose",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4c0519,
        @"name": @"GradientColorStopsRose950",
        @"category": @"gradientColorStops",
        @"type": @"rose",
        @"item": @"950"
        }
      }
    },
  @"gradientColorStopPositions": @{
    @"0%": @{
      @"value": 0%,
      @"name": @"GradientColorStopPositions0",
      @"category": @"gradientColorStopPositions",
      @"type": @"0%"
      },
    @"5%": @{
      @"value": 5%,
      @"name": @"GradientColorStopPositions5",
      @"category": @"gradientColorStopPositions",
      @"type": @"5%"
      },
    @"10%": @{
      @"value": 10%,
      @"name": @"GradientColorStopPositions10",
      @"category": @"gradientColorStopPositions",
      @"type": @"10%"
      },
    @"15%": @{
      @"value": 15%,
      @"name": @"GradientColorStopPositions15",
      @"category": @"gradientColorStopPositions",
      @"type": @"15%"
      },
    @"20%": @{
      @"value": 20%,
      @"name": @"GradientColorStopPositions20",
      @"category": @"gradientColorStopPositions",
      @"type": @"20%"
      },
    @"25%": @{
      @"value": 25%,
      @"name": @"GradientColorStopPositions25",
      @"category": @"gradientColorStopPositions",
      @"type": @"25%"
      },
    @"30%": @{
      @"value": 30%,
      @"name": @"GradientColorStopPositions30",
      @"category": @"gradientColorStopPositions",
      @"type": @"30%"
      },
    @"35%": @{
      @"value": 35%,
      @"name": @"GradientColorStopPositions35",
      @"category": @"gradientColorStopPositions",
      @"type": @"35%"
      },
    @"40%": @{
      @"value": 40%,
      @"name": @"GradientColorStopPositions40",
      @"category": @"gradientColorStopPositions",
      @"type": @"40%"
      },
    @"45%": @{
      @"value": 45%,
      @"name": @"GradientColorStopPositions45",
      @"category": @"gradientColorStopPositions",
      @"type": @"45%"
      },
    @"50%": @{
      @"value": 50%,
      @"name": @"GradientColorStopPositions50",
      @"category": @"gradientColorStopPositions",
      @"type": @"50%"
      },
    @"55%": @{
      @"value": 55%,
      @"name": @"GradientColorStopPositions55",
      @"category": @"gradientColorStopPositions",
      @"type": @"55%"
      },
    @"60%": @{
      @"value": 60%,
      @"name": @"GradientColorStopPositions60",
      @"category": @"gradientColorStopPositions",
      @"type": @"60%"
      },
    @"65%": @{
      @"value": 65%,
      @"name": @"GradientColorStopPositions65",
      @"category": @"gradientColorStopPositions",
      @"type": @"65%"
      },
    @"70%": @{
      @"value": 70%,
      @"name": @"GradientColorStopPositions70",
      @"category": @"gradientColorStopPositions",
      @"type": @"70%"
      },
    @"75%": @{
      @"value": 75%,
      @"name": @"GradientColorStopPositions75",
      @"category": @"gradientColorStopPositions",
      @"type": @"75%"
      },
    @"80%": @{
      @"value": 80%,
      @"name": @"GradientColorStopPositions80",
      @"category": @"gradientColorStopPositions",
      @"type": @"80%"
      },
    @"85%": @{
      @"value": 85%,
      @"name": @"GradientColorStopPositions85",
      @"category": @"gradientColorStopPositions",
      @"type": @"85%"
      },
    @"90%": @{
      @"value": 90%,
      @"name": @"GradientColorStopPositions90",
      @"category": @"gradientColorStopPositions",
      @"type": @"90%"
      },
    @"95%": @{
      @"value": 95%,
      @"name": @"GradientColorStopPositions95",
      @"category": @"gradientColorStopPositions",
      @"type": @"95%"
      },
    @"100%": @{
      @"value": 100%,
      @"name": @"GradientColorStopPositions100",
      @"category": @"gradientColorStopPositions",
      @"type": @"100%"
      }
    },
  @"grayscale": @{
    @"0": @{
      @"value": 0,
      @"name": @"Grayscale0",
      @"category": @"grayscale",
      @"type": @"0"
      },
    @"DEFAULT": @{
      @"value": 100%,
      @"name": @"GrayscaleDefault",
      @"category": @"grayscale",
      @"type": @"DEFAULT"
      }
    },
  @"gridAutoColumns": @{
    @"auto": @{
      @"value": auto,
      @"name": @"GridAutoColumnsAuto",
      @"category": @"gridAutoColumns",
      @"type": @"auto"
      },
    @"min": @{
      @"value": min-content,
      @"name": @"GridAutoColumnsMin",
      @"category": @"gridAutoColumns",
      @"type": @"min"
      },
    @"max": @{
      @"value": max-content,
      @"name": @"GridAutoColumnsMax",
      @"category": @"gridAutoColumns",
      @"type": @"max"
      },
    @"fr": @{
      @"value": minmax(0, 1fr),
      @"name": @"GridAutoColumnsFr",
      @"category": @"gridAutoColumns",
      @"type": @"fr"
      }
    },
  @"gridAutoRows": @{
    @"auto": @{
      @"value": auto,
      @"name": @"GridAutoRowsAuto",
      @"category": @"gridAutoRows",
      @"type": @"auto"
      },
    @"min": @{
      @"value": min-content,
      @"name": @"GridAutoRowsMin",
      @"category": @"gridAutoRows",
      @"type": @"min"
      },
    @"max": @{
      @"value": max-content,
      @"name": @"GridAutoRowsMax",
      @"category": @"gridAutoRows",
      @"type": @"max"
      },
    @"fr": @{
      @"value": minmax(0, 1fr),
      @"name": @"GridAutoRowsFr",
      @"category": @"gridAutoRows",
      @"type": @"fr"
      }
    },
  @"gridColumn": @{
    @"auto": @{
      @"value": auto,
      @"name": @"GridColumnAuto",
      @"category": @"gridColumn",
      @"type": @"auto"
      },
    @"span-1": @{
      @"value": span 1 / span 1,
      @"name": @"GridColumnSpan1",
      @"category": @"gridColumn",
      @"type": @"span-1"
      },
    @"span-2": @{
      @"value": span 2 / span 2,
      @"name": @"GridColumnSpan2",
      @"category": @"gridColumn",
      @"type": @"span-2"
      },
    @"span-3": @{
      @"value": span 3 / span 3,
      @"name": @"GridColumnSpan3",
      @"category": @"gridColumn",
      @"type": @"span-3"
      },
    @"span-4": @{
      @"value": span 4 / span 4,
      @"name": @"GridColumnSpan4",
      @"category": @"gridColumn",
      @"type": @"span-4"
      },
    @"span-5": @{
      @"value": span 5 / span 5,
      @"name": @"GridColumnSpan5",
      @"category": @"gridColumn",
      @"type": @"span-5"
      },
    @"span-6": @{
      @"value": span 6 / span 6,
      @"name": @"GridColumnSpan6",
      @"category": @"gridColumn",
      @"type": @"span-6"
      },
    @"span-7": @{
      @"value": span 7 / span 7,
      @"name": @"GridColumnSpan7",
      @"category": @"gridColumn",
      @"type": @"span-7"
      },
    @"span-8": @{
      @"value": span 8 / span 8,
      @"name": @"GridColumnSpan8",
      @"category": @"gridColumn",
      @"type": @"span-8"
      },
    @"span-9": @{
      @"value": span 9 / span 9,
      @"name": @"GridColumnSpan9",
      @"category": @"gridColumn",
      @"type": @"span-9"
      },
    @"span-10": @{
      @"value": span 10 / span 10,
      @"name": @"GridColumnSpan10",
      @"category": @"gridColumn",
      @"type": @"span-10"
      },
    @"span-11": @{
      @"value": span 11 / span 11,
      @"name": @"GridColumnSpan11",
      @"category": @"gridColumn",
      @"type": @"span-11"
      },
    @"span-12": @{
      @"value": span 12 / span 12,
      @"name": @"GridColumnSpan12",
      @"category": @"gridColumn",
      @"type": @"span-12"
      },
    @"span-full": @{
      @"value": 1 / -1,
      @"name": @"GridColumnSpanFull",
      @"category": @"gridColumn",
      @"type": @"span-full"
      }
    },
  @"gridColumnEnd": @{
    @"1": @{
      @"value": 1,
      @"name": @"GridColumnEnd1",
      @"category": @"gridColumnEnd",
      @"type": @"1"
      },
    @"2": @{
      @"value": 2,
      @"name": @"GridColumnEnd2",
      @"category": @"gridColumnEnd",
      @"type": @"2"
      },
    @"3": @{
      @"value": 3,
      @"name": @"GridColumnEnd3",
      @"category": @"gridColumnEnd",
      @"type": @"3"
      },
    @"4": @{
      @"value": 4,
      @"name": @"GridColumnEnd4",
      @"category": @"gridColumnEnd",
      @"type": @"4"
      },
    @"5": @{
      @"value": 5,
      @"name": @"GridColumnEnd5",
      @"category": @"gridColumnEnd",
      @"type": @"5"
      },
    @"6": @{
      @"value": 6,
      @"name": @"GridColumnEnd6",
      @"category": @"gridColumnEnd",
      @"type": @"6"
      },
    @"7": @{
      @"value": 7,
      @"name": @"GridColumnEnd7",
      @"category": @"gridColumnEnd",
      @"type": @"7"
      },
    @"8": @{
      @"value": 8,
      @"name": @"GridColumnEnd8",
      @"category": @"gridColumnEnd",
      @"type": @"8"
      },
    @"9": @{
      @"value": 9,
      @"name": @"GridColumnEnd9",
      @"category": @"gridColumnEnd",
      @"type": @"9"
      },
    @"10": @{
      @"value": 10,
      @"name": @"GridColumnEnd10",
      @"category": @"gridColumnEnd",
      @"type": @"10"
      },
    @"11": @{
      @"value": 11,
      @"name": @"GridColumnEnd11",
      @"category": @"gridColumnEnd",
      @"type": @"11"
      },
    @"12": @{
      @"value": 12,
      @"name": @"GridColumnEnd12",
      @"category": @"gridColumnEnd",
      @"type": @"12"
      },
    @"13": @{
      @"value": 13,
      @"name": @"GridColumnEnd13",
      @"category": @"gridColumnEnd",
      @"type": @"13"
      },
    @"auto": @{
      @"value": auto,
      @"name": @"GridColumnEndAuto",
      @"category": @"gridColumnEnd",
      @"type": @"auto"
      }
    },
  @"gridColumnStart": @{
    @"1": @{
      @"value": 1,
      @"name": @"GridColumnStart1",
      @"category": @"gridColumnStart",
      @"type": @"1"
      },
    @"2": @{
      @"value": 2,
      @"name": @"GridColumnStart2",
      @"category": @"gridColumnStart",
      @"type": @"2"
      },
    @"3": @{
      @"value": 3,
      @"name": @"GridColumnStart3",
      @"category": @"gridColumnStart",
      @"type": @"3"
      },
    @"4": @{
      @"value": 4,
      @"name": @"GridColumnStart4",
      @"category": @"gridColumnStart",
      @"type": @"4"
      },
    @"5": @{
      @"value": 5,
      @"name": @"GridColumnStart5",
      @"category": @"gridColumnStart",
      @"type": @"5"
      },
    @"6": @{
      @"value": 6,
      @"name": @"GridColumnStart6",
      @"category": @"gridColumnStart",
      @"type": @"6"
      },
    @"7": @{
      @"value": 7,
      @"name": @"GridColumnStart7",
      @"category": @"gridColumnStart",
      @"type": @"7"
      },
    @"8": @{
      @"value": 8,
      @"name": @"GridColumnStart8",
      @"category": @"gridColumnStart",
      @"type": @"8"
      },
    @"9": @{
      @"value": 9,
      @"name": @"GridColumnStart9",
      @"category": @"gridColumnStart",
      @"type": @"9"
      },
    @"10": @{
      @"value": 10,
      @"name": @"GridColumnStart10",
      @"category": @"gridColumnStart",
      @"type": @"10"
      },
    @"11": @{
      @"value": 11,
      @"name": @"GridColumnStart11",
      @"category": @"gridColumnStart",
      @"type": @"11"
      },
    @"12": @{
      @"value": 12,
      @"name": @"GridColumnStart12",
      @"category": @"gridColumnStart",
      @"type": @"12"
      },
    @"13": @{
      @"value": 13,
      @"name": @"GridColumnStart13",
      @"category": @"gridColumnStart",
      @"type": @"13"
      },
    @"auto": @{
      @"value": auto,
      @"name": @"GridColumnStartAuto",
      @"category": @"gridColumnStart",
      @"type": @"auto"
      }
    },
  @"gridRow": @{
    @"auto": @{
      @"value": auto,
      @"name": @"GridRowAuto",
      @"category": @"gridRow",
      @"type": @"auto"
      },
    @"span-1": @{
      @"value": span 1 / span 1,
      @"name": @"GridRowSpan1",
      @"category": @"gridRow",
      @"type": @"span-1"
      },
    @"span-2": @{
      @"value": span 2 / span 2,
      @"name": @"GridRowSpan2",
      @"category": @"gridRow",
      @"type": @"span-2"
      },
    @"span-3": @{
      @"value": span 3 / span 3,
      @"name": @"GridRowSpan3",
      @"category": @"gridRow",
      @"type": @"span-3"
      },
    @"span-4": @{
      @"value": span 4 / span 4,
      @"name": @"GridRowSpan4",
      @"category": @"gridRow",
      @"type": @"span-4"
      },
    @"span-5": @{
      @"value": span 5 / span 5,
      @"name": @"GridRowSpan5",
      @"category": @"gridRow",
      @"type": @"span-5"
      },
    @"span-6": @{
      @"value": span 6 / span 6,
      @"name": @"GridRowSpan6",
      @"category": @"gridRow",
      @"type": @"span-6"
      },
    @"span-7": @{
      @"value": span 7 / span 7,
      @"name": @"GridRowSpan7",
      @"category": @"gridRow",
      @"type": @"span-7"
      },
    @"span-8": @{
      @"value": span 8 / span 8,
      @"name": @"GridRowSpan8",
      @"category": @"gridRow",
      @"type": @"span-8"
      },
    @"span-9": @{
      @"value": span 9 / span 9,
      @"name": @"GridRowSpan9",
      @"category": @"gridRow",
      @"type": @"span-9"
      },
    @"span-10": @{
      @"value": span 10 / span 10,
      @"name": @"GridRowSpan10",
      @"category": @"gridRow",
      @"type": @"span-10"
      },
    @"span-11": @{
      @"value": span 11 / span 11,
      @"name": @"GridRowSpan11",
      @"category": @"gridRow",
      @"type": @"span-11"
      },
    @"span-12": @{
      @"value": span 12 / span 12,
      @"name": @"GridRowSpan12",
      @"category": @"gridRow",
      @"type": @"span-12"
      },
    @"span-full": @{
      @"value": 1 / -1,
      @"name": @"GridRowSpanFull",
      @"category": @"gridRow",
      @"type": @"span-full"
      }
    },
  @"gridRowEnd": @{
    @"1": @{
      @"value": 1,
      @"name": @"GridRowEnd1",
      @"category": @"gridRowEnd",
      @"type": @"1"
      },
    @"2": @{
      @"value": 2,
      @"name": @"GridRowEnd2",
      @"category": @"gridRowEnd",
      @"type": @"2"
      },
    @"3": @{
      @"value": 3,
      @"name": @"GridRowEnd3",
      @"category": @"gridRowEnd",
      @"type": @"3"
      },
    @"4": @{
      @"value": 4,
      @"name": @"GridRowEnd4",
      @"category": @"gridRowEnd",
      @"type": @"4"
      },
    @"5": @{
      @"value": 5,
      @"name": @"GridRowEnd5",
      @"category": @"gridRowEnd",
      @"type": @"5"
      },
    @"6": @{
      @"value": 6,
      @"name": @"GridRowEnd6",
      @"category": @"gridRowEnd",
      @"type": @"6"
      },
    @"7": @{
      @"value": 7,
      @"name": @"GridRowEnd7",
      @"category": @"gridRowEnd",
      @"type": @"7"
      },
    @"8": @{
      @"value": 8,
      @"name": @"GridRowEnd8",
      @"category": @"gridRowEnd",
      @"type": @"8"
      },
    @"9": @{
      @"value": 9,
      @"name": @"GridRowEnd9",
      @"category": @"gridRowEnd",
      @"type": @"9"
      },
    @"10": @{
      @"value": 10,
      @"name": @"GridRowEnd10",
      @"category": @"gridRowEnd",
      @"type": @"10"
      },
    @"11": @{
      @"value": 11,
      @"name": @"GridRowEnd11",
      @"category": @"gridRowEnd",
      @"type": @"11"
      },
    @"12": @{
      @"value": 12,
      @"name": @"GridRowEnd12",
      @"category": @"gridRowEnd",
      @"type": @"12"
      },
    @"13": @{
      @"value": 13,
      @"name": @"GridRowEnd13",
      @"category": @"gridRowEnd",
      @"type": @"13"
      },
    @"auto": @{
      @"value": auto,
      @"name": @"GridRowEndAuto",
      @"category": @"gridRowEnd",
      @"type": @"auto"
      }
    },
  @"gridRowStart": @{
    @"1": @{
      @"value": 1,
      @"name": @"GridRowStart1",
      @"category": @"gridRowStart",
      @"type": @"1"
      },
    @"2": @{
      @"value": 2,
      @"name": @"GridRowStart2",
      @"category": @"gridRowStart",
      @"type": @"2"
      },
    @"3": @{
      @"value": 3,
      @"name": @"GridRowStart3",
      @"category": @"gridRowStart",
      @"type": @"3"
      },
    @"4": @{
      @"value": 4,
      @"name": @"GridRowStart4",
      @"category": @"gridRowStart",
      @"type": @"4"
      },
    @"5": @{
      @"value": 5,
      @"name": @"GridRowStart5",
      @"category": @"gridRowStart",
      @"type": @"5"
      },
    @"6": @{
      @"value": 6,
      @"name": @"GridRowStart6",
      @"category": @"gridRowStart",
      @"type": @"6"
      },
    @"7": @{
      @"value": 7,
      @"name": @"GridRowStart7",
      @"category": @"gridRowStart",
      @"type": @"7"
      },
    @"8": @{
      @"value": 8,
      @"name": @"GridRowStart8",
      @"category": @"gridRowStart",
      @"type": @"8"
      },
    @"9": @{
      @"value": 9,
      @"name": @"GridRowStart9",
      @"category": @"gridRowStart",
      @"type": @"9"
      },
    @"10": @{
      @"value": 10,
      @"name": @"GridRowStart10",
      @"category": @"gridRowStart",
      @"type": @"10"
      },
    @"11": @{
      @"value": 11,
      @"name": @"GridRowStart11",
      @"category": @"gridRowStart",
      @"type": @"11"
      },
    @"12": @{
      @"value": 12,
      @"name": @"GridRowStart12",
      @"category": @"gridRowStart",
      @"type": @"12"
      },
    @"13": @{
      @"value": 13,
      @"name": @"GridRowStart13",
      @"category": @"gridRowStart",
      @"type": @"13"
      },
    @"auto": @{
      @"value": auto,
      @"name": @"GridRowStartAuto",
      @"category": @"gridRowStart",
      @"type": @"auto"
      }
    },
  @"gridTemplateColumns": @{
    @"1": @{
      @"value": repeat(1, minmax(0, 1fr)),
      @"name": @"GridTemplateColumns1",
      @"category": @"gridTemplateColumns",
      @"type": @"1"
      },
    @"2": @{
      @"value": repeat(2, minmax(0, 1fr)),
      @"name": @"GridTemplateColumns2",
      @"category": @"gridTemplateColumns",
      @"type": @"2"
      },
    @"3": @{
      @"value": repeat(3, minmax(0, 1fr)),
      @"name": @"GridTemplateColumns3",
      @"category": @"gridTemplateColumns",
      @"type": @"3"
      },
    @"4": @{
      @"value": repeat(4, minmax(0, 1fr)),
      @"name": @"GridTemplateColumns4",
      @"category": @"gridTemplateColumns",
      @"type": @"4"
      },
    @"5": @{
      @"value": repeat(5, minmax(0, 1fr)),
      @"name": @"GridTemplateColumns5",
      @"category": @"gridTemplateColumns",
      @"type": @"5"
      },
    @"6": @{
      @"value": repeat(6, minmax(0, 1fr)),
      @"name": @"GridTemplateColumns6",
      @"category": @"gridTemplateColumns",
      @"type": @"6"
      },
    @"7": @{
      @"value": repeat(7, minmax(0, 1fr)),
      @"name": @"GridTemplateColumns7",
      @"category": @"gridTemplateColumns",
      @"type": @"7"
      },
    @"8": @{
      @"value": repeat(8, minmax(0, 1fr)),
      @"name": @"GridTemplateColumns8",
      @"category": @"gridTemplateColumns",
      @"type": @"8"
      },
    @"9": @{
      @"value": repeat(9, minmax(0, 1fr)),
      @"name": @"GridTemplateColumns9",
      @"category": @"gridTemplateColumns",
      @"type": @"9"
      },
    @"10": @{
      @"value": repeat(10, minmax(0, 1fr)),
      @"name": @"GridTemplateColumns10",
      @"category": @"gridTemplateColumns",
      @"type": @"10"
      },
    @"11": @{
      @"value": repeat(11, minmax(0, 1fr)),
      @"name": @"GridTemplateColumns11",
      @"category": @"gridTemplateColumns",
      @"type": @"11"
      },
    @"12": @{
      @"value": repeat(12, minmax(0, 1fr)),
      @"name": @"GridTemplateColumns12",
      @"category": @"gridTemplateColumns",
      @"type": @"12"
      },
    @"none": @{
      @"value": none,
      @"name": @"GridTemplateColumnsNone",
      @"category": @"gridTemplateColumns",
      @"type": @"none"
      },
    @"subgrid": @{
      @"value": subgrid,
      @"name": @"GridTemplateColumnsSubgrid",
      @"category": @"gridTemplateColumns",
      @"type": @"subgrid"
      }
    },
  @"gridTemplateRows": @{
    @"1": @{
      @"value": repeat(1, minmax(0, 1fr)),
      @"name": @"GridTemplateRows1",
      @"category": @"gridTemplateRows",
      @"type": @"1"
      },
    @"2": @{
      @"value": repeat(2, minmax(0, 1fr)),
      @"name": @"GridTemplateRows2",
      @"category": @"gridTemplateRows",
      @"type": @"2"
      },
    @"3": @{
      @"value": repeat(3, minmax(0, 1fr)),
      @"name": @"GridTemplateRows3",
      @"category": @"gridTemplateRows",
      @"type": @"3"
      },
    @"4": @{
      @"value": repeat(4, minmax(0, 1fr)),
      @"name": @"GridTemplateRows4",
      @"category": @"gridTemplateRows",
      @"type": @"4"
      },
    @"5": @{
      @"value": repeat(5, minmax(0, 1fr)),
      @"name": @"GridTemplateRows5",
      @"category": @"gridTemplateRows",
      @"type": @"5"
      },
    @"6": @{
      @"value": repeat(6, minmax(0, 1fr)),
      @"name": @"GridTemplateRows6",
      @"category": @"gridTemplateRows",
      @"type": @"6"
      },
    @"7": @{
      @"value": repeat(7, minmax(0, 1fr)),
      @"name": @"GridTemplateRows7",
      @"category": @"gridTemplateRows",
      @"type": @"7"
      },
    @"8": @{
      @"value": repeat(8, minmax(0, 1fr)),
      @"name": @"GridTemplateRows8",
      @"category": @"gridTemplateRows",
      @"type": @"8"
      },
    @"9": @{
      @"value": repeat(9, minmax(0, 1fr)),
      @"name": @"GridTemplateRows9",
      @"category": @"gridTemplateRows",
      @"type": @"9"
      },
    @"10": @{
      @"value": repeat(10, minmax(0, 1fr)),
      @"name": @"GridTemplateRows10",
      @"category": @"gridTemplateRows",
      @"type": @"10"
      },
    @"11": @{
      @"value": repeat(11, minmax(0, 1fr)),
      @"name": @"GridTemplateRows11",
      @"category": @"gridTemplateRows",
      @"type": @"11"
      },
    @"12": @{
      @"value": repeat(12, minmax(0, 1fr)),
      @"name": @"GridTemplateRows12",
      @"category": @"gridTemplateRows",
      @"type": @"12"
      },
    @"none": @{
      @"value": none,
      @"name": @"GridTemplateRowsNone",
      @"category": @"gridTemplateRows",
      @"type": @"none"
      },
    @"subgrid": @{
      @"value": subgrid,
      @"name": @"GridTemplateRowsSubgrid",
      @"category": @"gridTemplateRows",
      @"type": @"subgrid"
      }
    },
  @"height": @{
    @"0": @{
      @"value": 0px,
      @"name": @"Height0",
      @"category": @"height",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"Height1",
      @"category": @"height",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"Height2",
      @"category": @"height",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"Height3",
      @"category": @"height",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"Height4",
      @"category": @"height",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"Height5",
      @"category": @"height",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"Height6",
      @"category": @"height",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"Height7",
      @"category": @"height",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"Height8",
      @"category": @"height",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"Height9",
      @"category": @"height",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"Height10",
      @"category": @"height",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"Height11",
      @"category": @"height",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"Height12",
      @"category": @"height",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"Height14",
      @"category": @"height",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"Height16",
      @"category": @"height",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"Height20",
      @"category": @"height",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"Height24",
      @"category": @"height",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"Height28",
      @"category": @"height",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"Height32",
      @"category": @"height",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"Height36",
      @"category": @"height",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"Height40",
      @"category": @"height",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"Height44",
      @"category": @"height",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"Height48",
      @"category": @"height",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"Height52",
      @"category": @"height",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"Height56",
      @"category": @"height",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"Height60",
      @"category": @"height",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"Height64",
      @"category": @"height",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"Height72",
      @"category": @"height",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"Height80",
      @"category": @"height",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"Height96",
      @"category": @"height",
      @"type": @"96"
      },
    @"auto": @{
      @"value": auto,
      @"name": @"HeightAuto",
      @"category": @"height",
      @"type": @"auto"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"HeightPx",
      @"category": @"height",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"Height05",
      @"category": @"height",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"Height15",
      @"category": @"height",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"Height25",
      @"category": @"height",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"Height35",
      @"category": @"height",
      @"type": @"3.5"
      },
    @"1/2": @{
      @"value": 50%,
      @"name": @"Height12",
      @"category": @"height",
      @"type": @"1/2"
      },
    @"1/3": @{
      @"value": 33.333333%,
      @"name": @"Height13",
      @"category": @"height",
      @"type": @"1/3"
      },
    @"2/3": @{
      @"value": 66.666667%,
      @"name": @"Height23",
      @"category": @"height",
      @"type": @"2/3"
      },
    @"1/4": @{
      @"value": 25%,
      @"name": @"Height14",
      @"category": @"height",
      @"type": @"1/4"
      },
    @"2/4": @{
      @"value": 50%,
      @"name": @"Height24",
      @"category": @"height",
      @"type": @"2/4"
      },
    @"3/4": @{
      @"value": 75%,
      @"name": @"Height34",
      @"category": @"height",
      @"type": @"3/4"
      },
    @"1/5": @{
      @"value": 20%,
      @"name": @"Height15",
      @"category": @"height",
      @"type": @"1/5"
      },
    @"2/5": @{
      @"value": 40%,
      @"name": @"Height25",
      @"category": @"height",
      @"type": @"2/5"
      },
    @"3/5": @{
      @"value": 60%,
      @"name": @"Height35",
      @"category": @"height",
      @"type": @"3/5"
      },
    @"4/5": @{
      @"value": 80%,
      @"name": @"Height45",
      @"category": @"height",
      @"type": @"4/5"
      },
    @"1/6": @{
      @"value": 16.666667%,
      @"name": @"Height16",
      @"category": @"height",
      @"type": @"1/6"
      },
    @"2/6": @{
      @"value": 33.333333%,
      @"name": @"Height26",
      @"category": @"height",
      @"type": @"2/6"
      },
    @"3/6": @{
      @"value": 50%,
      @"name": @"Height36",
      @"category": @"height",
      @"type": @"3/6"
      },
    @"4/6": @{
      @"value": 66.666667%,
      @"name": @"Height46",
      @"category": @"height",
      @"type": @"4/6"
      },
    @"5/6": @{
      @"value": 83.333333%,
      @"name": @"Height56",
      @"category": @"height",
      @"type": @"5/6"
      },
    @"full": @{
      @"value": 100%,
      @"name": @"HeightFull",
      @"category": @"height",
      @"type": @"full"
      },
    @"screen": @{
      @"value": 100vh,
      @"name": @"HeightScreen",
      @"category": @"height",
      @"type": @"screen"
      },
    @"svh": @{
      @"value": 100svh,
      @"name": @"HeightSvh",
      @"category": @"height",
      @"type": @"svh"
      },
    @"lvh": @{
      @"value": 100lvh,
      @"name": @"HeightLvh",
      @"category": @"height",
      @"type": @"lvh"
      },
    @"dvh": @{
      @"value": 100dvh,
      @"name": @"HeightDvh",
      @"category": @"height",
      @"type": @"dvh"
      },
    @"min": @{
      @"value": min-content,
      @"name": @"HeightMin",
      @"category": @"height",
      @"type": @"min"
      },
    @"max": @{
      @"value": max-content,
      @"name": @"HeightMax",
      @"category": @"height",
      @"type": @"max"
      },
    @"fit": @{
      @"value": fit-content,
      @"name": @"HeightFit",
      @"category": @"height",
      @"type": @"fit"
      }
    },
  @"hueRotate": @{
    @"0": @{
      @"value": 0deg,
      @"name": @"HueRotate0",
      @"category": @"hueRotate",
      @"type": @"0"
      },
    @"15": @{
      @"value": 15deg,
      @"name": @"HueRotate15",
      @"category": @"hueRotate",
      @"type": @"15"
      },
    @"30": @{
      @"value": 30deg,
      @"name": @"HueRotate30",
      @"category": @"hueRotate",
      @"type": @"30"
      },
    @"60": @{
      @"value": 60deg,
      @"name": @"HueRotate60",
      @"category": @"hueRotate",
      @"type": @"60"
      },
    @"90": @{
      @"value": 90deg,
      @"name": @"HueRotate90",
      @"category": @"hueRotate",
      @"type": @"90"
      },
    @"180": @{
      @"value": 180deg,
      @"name": @"HueRotate180",
      @"category": @"hueRotate",
      @"type": @"180"
      }
    },
  @"inset": @{
    @"0": @{
      @"value": 0px,
      @"name": @"Inset0",
      @"category": @"inset",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"Inset1",
      @"category": @"inset",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"Inset2",
      @"category": @"inset",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"Inset3",
      @"category": @"inset",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"Inset4",
      @"category": @"inset",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"Inset5",
      @"category": @"inset",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"Inset6",
      @"category": @"inset",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"Inset7",
      @"category": @"inset",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"Inset8",
      @"category": @"inset",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"Inset9",
      @"category": @"inset",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"Inset10",
      @"category": @"inset",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"Inset11",
      @"category": @"inset",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"Inset12",
      @"category": @"inset",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"Inset14",
      @"category": @"inset",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"Inset16",
      @"category": @"inset",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"Inset20",
      @"category": @"inset",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"Inset24",
      @"category": @"inset",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"Inset28",
      @"category": @"inset",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"Inset32",
      @"category": @"inset",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"Inset36",
      @"category": @"inset",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"Inset40",
      @"category": @"inset",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"Inset44",
      @"category": @"inset",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"Inset48",
      @"category": @"inset",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"Inset52",
      @"category": @"inset",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"Inset56",
      @"category": @"inset",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"Inset60",
      @"category": @"inset",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"Inset64",
      @"category": @"inset",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"Inset72",
      @"category": @"inset",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"Inset80",
      @"category": @"inset",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"Inset96",
      @"category": @"inset",
      @"type": @"96"
      },
    @"auto": @{
      @"value": auto,
      @"name": @"InsetAuto",
      @"category": @"inset",
      @"type": @"auto"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"InsetPx",
      @"category": @"inset",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"Inset05",
      @"category": @"inset",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"Inset15",
      @"category": @"inset",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"Inset25",
      @"category": @"inset",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"Inset35",
      @"category": @"inset",
      @"type": @"3.5"
      },
    @"1/2": @{
      @"value": 50%,
      @"name": @"Inset12",
      @"category": @"inset",
      @"type": @"1/2"
      },
    @"1/3": @{
      @"value": 33.333333%,
      @"name": @"Inset13",
      @"category": @"inset",
      @"type": @"1/3"
      },
    @"2/3": @{
      @"value": 66.666667%,
      @"name": @"Inset23",
      @"category": @"inset",
      @"type": @"2/3"
      },
    @"1/4": @{
      @"value": 25%,
      @"name": @"Inset14",
      @"category": @"inset",
      @"type": @"1/4"
      },
    @"2/4": @{
      @"value": 50%,
      @"name": @"Inset24",
      @"category": @"inset",
      @"type": @"2/4"
      },
    @"3/4": @{
      @"value": 75%,
      @"name": @"Inset34",
      @"category": @"inset",
      @"type": @"3/4"
      },
    @"full": @{
      @"value": 100%,
      @"name": @"InsetFull",
      @"category": @"inset",
      @"type": @"full"
      }
    },
  @"invert": @{
    @"0": @{
      @"value": 0,
      @"name": @"Invert0",
      @"category": @"invert",
      @"type": @"0"
      },
    @"DEFAULT": @{
      @"value": 100%,
      @"name": @"InvertDefault",
      @"category": @"invert",
      @"type": @"DEFAULT"
      }
    },
  @"keyframes": @{
    @"spin": @{
      @"to": @{
        @"value": [object Object],
        @"name": @"KeyframesSpinTo",
        @"category": @"keyframes",
        @"type": @"spin",
        @"item": @"to"
        }
      },
    @"ping": @{
      @"75%, 100%": @{
        @"value": [object Object],
        @"name": @"KeyframesPing75100",
        @"category": @"keyframes",
        @"type": @"ping",
        @"item": @"75%, 100%"
        }
      },
    @"pulse": @{
      @"50%": @{
        @"value": [object Object],
        @"name": @"KeyframesPulse50",
        @"category": @"keyframes",
        @"type": @"pulse",
        @"item": @"50%"
        }
      },
    @"bounce": @{
      @"0%, 100%": @{
        @"value": [object Object],
        @"name": @"KeyframesBounce0100",
        @"category": @"keyframes",
        @"type": @"bounce",
        @"item": @"0%, 100%"
        },
      @"50%": @{
        @"value": [object Object],
        @"name": @"KeyframesBounce50",
        @"category": @"keyframes",
        @"type": @"bounce",
        @"item": @"50%"
        }
      }
    },
  @"letterSpacing": @{
    @"tighter": @{
      @"value": -0.05em,
      @"name": @"LetterSpacingTighter",
      @"category": @"letterSpacing",
      @"type": @"tighter"
      },
    @"tight": @{
      @"value": -0.025em,
      @"name": @"LetterSpacingTight",
      @"category": @"letterSpacing",
      @"type": @"tight"
      },
    @"normal": @{
      @"value": 0em,
      @"name": @"LetterSpacingNormal",
      @"category": @"letterSpacing",
      @"type": @"normal"
      },
    @"wide": @{
      @"value": 0.025em,
      @"name": @"LetterSpacingWide",
      @"category": @"letterSpacing",
      @"type": @"wide"
      },
    @"wider": @{
      @"value": 0.05em,
      @"name": @"LetterSpacingWider",
      @"category": @"letterSpacing",
      @"type": @"wider"
      },
    @"widest": @{
      @"value": 0.1em,
      @"name": @"LetterSpacingWidest",
      @"category": @"letterSpacing",
      @"type": @"widest"
      }
    },
  @"lineHeight": @{
    @"3": @{
      @"value": .75rem,
      @"name": @"LineHeight3",
      @"category": @"lineHeight",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"LineHeight4",
      @"category": @"lineHeight",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"LineHeight5",
      @"category": @"lineHeight",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"LineHeight6",
      @"category": @"lineHeight",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"LineHeight7",
      @"category": @"lineHeight",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"LineHeight8",
      @"category": @"lineHeight",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"LineHeight9",
      @"category": @"lineHeight",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"LineHeight10",
      @"category": @"lineHeight",
      @"type": @"10"
      },
    @"none": @{
      @"value": 1,
      @"name": @"LineHeightNone",
      @"category": @"lineHeight",
      @"type": @"none"
      },
    @"tight": @{
      @"value": 1.25,
      @"name": @"LineHeightTight",
      @"category": @"lineHeight",
      @"type": @"tight"
      },
    @"snug": @{
      @"value": 1.375,
      @"name": @"LineHeightSnug",
      @"category": @"lineHeight",
      @"type": @"snug"
      },
    @"normal": @{
      @"value": 1.5,
      @"name": @"LineHeightNormal",
      @"category": @"lineHeight",
      @"type": @"normal"
      },
    @"relaxed": @{
      @"value": 1.625,
      @"name": @"LineHeightRelaxed",
      @"category": @"lineHeight",
      @"type": @"relaxed"
      },
    @"loose": @{
      @"value": 2,
      @"name": @"LineHeightLoose",
      @"category": @"lineHeight",
      @"type": @"loose"
      }
    },
  @"listStyleType": @{
    @"none": @{
      @"value": none,
      @"name": @"ListStyleTypeNone",
      @"category": @"listStyleType",
      @"type": @"none"
      },
    @"disc": @{
      @"value": disc,
      @"name": @"ListStyleTypeDisc",
      @"category": @"listStyleType",
      @"type": @"disc"
      },
    @"decimal": @{
      @"value": decimal,
      @"name": @"ListStyleTypeDecimal",
      @"category": @"listStyleType",
      @"type": @"decimal"
      }
    },
  @"listStyleImage": @{
    @"none": @{
      @"value": none,
      @"name": @"ListStyleImageNone",
      @"category": @"listStyleImage",
      @"type": @"none"
      }
    },
  @"margin": @{
    @"0": @{
      @"value": 0px,
      @"name": @"Margin0",
      @"category": @"margin",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"Margin1",
      @"category": @"margin",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"Margin2",
      @"category": @"margin",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"Margin3",
      @"category": @"margin",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"Margin4",
      @"category": @"margin",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"Margin5",
      @"category": @"margin",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"Margin6",
      @"category": @"margin",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"Margin7",
      @"category": @"margin",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"Margin8",
      @"category": @"margin",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"Margin9",
      @"category": @"margin",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"Margin10",
      @"category": @"margin",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"Margin11",
      @"category": @"margin",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"Margin12",
      @"category": @"margin",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"Margin14",
      @"category": @"margin",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"Margin16",
      @"category": @"margin",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"Margin20",
      @"category": @"margin",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"Margin24",
      @"category": @"margin",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"Margin28",
      @"category": @"margin",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"Margin32",
      @"category": @"margin",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"Margin36",
      @"category": @"margin",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"Margin40",
      @"category": @"margin",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"Margin44",
      @"category": @"margin",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"Margin48",
      @"category": @"margin",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"Margin52",
      @"category": @"margin",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"Margin56",
      @"category": @"margin",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"Margin60",
      @"category": @"margin",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"Margin64",
      @"category": @"margin",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"Margin72",
      @"category": @"margin",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"Margin80",
      @"category": @"margin",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"Margin96",
      @"category": @"margin",
      @"type": @"96"
      },
    @"auto": @{
      @"value": auto,
      @"name": @"MarginAuto",
      @"category": @"margin",
      @"type": @"auto"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"MarginPx",
      @"category": @"margin",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"Margin05",
      @"category": @"margin",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"Margin15",
      @"category": @"margin",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"Margin25",
      @"category": @"margin",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"Margin35",
      @"category": @"margin",
      @"type": @"3.5"
      }
    },
  @"lineClamp": @{
    @"1": @{
      @"value": 1,
      @"name": @"LineClamp1",
      @"category": @"lineClamp",
      @"type": @"1"
      },
    @"2": @{
      @"value": 2,
      @"name": @"LineClamp2",
      @"category": @"lineClamp",
      @"type": @"2"
      },
    @"3": @{
      @"value": 3,
      @"name": @"LineClamp3",
      @"category": @"lineClamp",
      @"type": @"3"
      },
    @"4": @{
      @"value": 4,
      @"name": @"LineClamp4",
      @"category": @"lineClamp",
      @"type": @"4"
      },
    @"5": @{
      @"value": 5,
      @"name": @"LineClamp5",
      @"category": @"lineClamp",
      @"type": @"5"
      },
    @"6": @{
      @"value": 6,
      @"name": @"LineClamp6",
      @"category": @"lineClamp",
      @"type": @"6"
      }
    },
  @"maxHeight": @{
    @"0": @{
      @"value": 0px,
      @"name": @"MaxHeight0",
      @"category": @"maxHeight",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"MaxHeight1",
      @"category": @"maxHeight",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"MaxHeight2",
      @"category": @"maxHeight",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"MaxHeight3",
      @"category": @"maxHeight",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"MaxHeight4",
      @"category": @"maxHeight",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"MaxHeight5",
      @"category": @"maxHeight",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"MaxHeight6",
      @"category": @"maxHeight",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"MaxHeight7",
      @"category": @"maxHeight",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"MaxHeight8",
      @"category": @"maxHeight",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"MaxHeight9",
      @"category": @"maxHeight",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"MaxHeight10",
      @"category": @"maxHeight",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"MaxHeight11",
      @"category": @"maxHeight",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"MaxHeight12",
      @"category": @"maxHeight",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"MaxHeight14",
      @"category": @"maxHeight",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"MaxHeight16",
      @"category": @"maxHeight",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"MaxHeight20",
      @"category": @"maxHeight",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"MaxHeight24",
      @"category": @"maxHeight",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"MaxHeight28",
      @"category": @"maxHeight",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"MaxHeight32",
      @"category": @"maxHeight",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"MaxHeight36",
      @"category": @"maxHeight",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"MaxHeight40",
      @"category": @"maxHeight",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"MaxHeight44",
      @"category": @"maxHeight",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"MaxHeight48",
      @"category": @"maxHeight",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"MaxHeight52",
      @"category": @"maxHeight",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"MaxHeight56",
      @"category": @"maxHeight",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"MaxHeight60",
      @"category": @"maxHeight",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"MaxHeight64",
      @"category": @"maxHeight",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"MaxHeight72",
      @"category": @"maxHeight",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"MaxHeight80",
      @"category": @"maxHeight",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"MaxHeight96",
      @"category": @"maxHeight",
      @"type": @"96"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"MaxHeightPx",
      @"category": @"maxHeight",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"MaxHeight05",
      @"category": @"maxHeight",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"MaxHeight15",
      @"category": @"maxHeight",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"MaxHeight25",
      @"category": @"maxHeight",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"MaxHeight35",
      @"category": @"maxHeight",
      @"type": @"3.5"
      },
    @"none": @{
      @"value": none,
      @"name": @"MaxHeightNone",
      @"category": @"maxHeight",
      @"type": @"none"
      },
    @"full": @{
      @"value": 100%,
      @"name": @"MaxHeightFull",
      @"category": @"maxHeight",
      @"type": @"full"
      },
    @"screen": @{
      @"value": 100vh,
      @"name": @"MaxHeightScreen",
      @"category": @"maxHeight",
      @"type": @"screen"
      },
    @"svh": @{
      @"value": 100svh,
      @"name": @"MaxHeightSvh",
      @"category": @"maxHeight",
      @"type": @"svh"
      },
    @"lvh": @{
      @"value": 100lvh,
      @"name": @"MaxHeightLvh",
      @"category": @"maxHeight",
      @"type": @"lvh"
      },
    @"dvh": @{
      @"value": 100dvh,
      @"name": @"MaxHeightDvh",
      @"category": @"maxHeight",
      @"type": @"dvh"
      },
    @"min": @{
      @"value": min-content,
      @"name": @"MaxHeightMin",
      @"category": @"maxHeight",
      @"type": @"min"
      },
    @"max": @{
      @"value": max-content,
      @"name": @"MaxHeightMax",
      @"category": @"maxHeight",
      @"type": @"max"
      },
    @"fit": @{
      @"value": fit-content,
      @"name": @"MaxHeightFit",
      @"category": @"maxHeight",
      @"type": @"fit"
      }
    },
  @"maxWidth": @{
    @"0": @{
      @"value": 0px,
      @"name": @"MaxWidth0",
      @"category": @"maxWidth",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"MaxWidth1",
      @"category": @"maxWidth",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"MaxWidth2",
      @"category": @"maxWidth",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"MaxWidth3",
      @"category": @"maxWidth",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"MaxWidth4",
      @"category": @"maxWidth",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"MaxWidth5",
      @"category": @"maxWidth",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"MaxWidth6",
      @"category": @"maxWidth",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"MaxWidth7",
      @"category": @"maxWidth",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"MaxWidth8",
      @"category": @"maxWidth",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"MaxWidth9",
      @"category": @"maxWidth",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"MaxWidth10",
      @"category": @"maxWidth",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"MaxWidth11",
      @"category": @"maxWidth",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"MaxWidth12",
      @"category": @"maxWidth",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"MaxWidth14",
      @"category": @"maxWidth",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"MaxWidth16",
      @"category": @"maxWidth",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"MaxWidth20",
      @"category": @"maxWidth",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"MaxWidth24",
      @"category": @"maxWidth",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"MaxWidth28",
      @"category": @"maxWidth",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"MaxWidth32",
      @"category": @"maxWidth",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"MaxWidth36",
      @"category": @"maxWidth",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"MaxWidth40",
      @"category": @"maxWidth",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"MaxWidth44",
      @"category": @"maxWidth",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"MaxWidth48",
      @"category": @"maxWidth",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"MaxWidth52",
      @"category": @"maxWidth",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"MaxWidth56",
      @"category": @"maxWidth",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"MaxWidth60",
      @"category": @"maxWidth",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"MaxWidth64",
      @"category": @"maxWidth",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"MaxWidth72",
      @"category": @"maxWidth",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"MaxWidth80",
      @"category": @"maxWidth",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"MaxWidth96",
      @"category": @"maxWidth",
      @"type": @"96"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"MaxWidthPx",
      @"category": @"maxWidth",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"MaxWidth05",
      @"category": @"maxWidth",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"MaxWidth15",
      @"category": @"maxWidth",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"MaxWidth25",
      @"category": @"maxWidth",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"MaxWidth35",
      @"category": @"maxWidth",
      @"type": @"3.5"
      },
    @"none": @{
      @"value": none,
      @"name": @"MaxWidthNone",
      @"category": @"maxWidth",
      @"type": @"none"
      },
    @"xs": @{
      @"value": 20rem,
      @"name": @"MaxWidthXs",
      @"category": @"maxWidth",
      @"type": @"xs"
      },
    @"sm": @{
      @"value": 24rem,
      @"name": @"MaxWidthSm",
      @"category": @"maxWidth",
      @"type": @"sm"
      },
    @"md": @{
      @"value": 28rem,
      @"name": @"MaxWidthMd",
      @"category": @"maxWidth",
      @"type": @"md"
      },
    @"lg": @{
      @"value": 32rem,
      @"name": @"MaxWidthLg",
      @"category": @"maxWidth",
      @"type": @"lg"
      },
    @"xl": @{
      @"value": 36rem,
      @"name": @"MaxWidthXl",
      @"category": @"maxWidth",
      @"type": @"xl"
      },
    @"2xl": @{
      @"value": 42rem,
      @"name": @"MaxWidth2xl",
      @"category": @"maxWidth",
      @"type": @"2xl"
      },
    @"3xl": @{
      @"value": 48rem,
      @"name": @"MaxWidth3xl",
      @"category": @"maxWidth",
      @"type": @"3xl"
      },
    @"4xl": @{
      @"value": 56rem,
      @"name": @"MaxWidth4xl",
      @"category": @"maxWidth",
      @"type": @"4xl"
      },
    @"5xl": @{
      @"value": 64rem,
      @"name": @"MaxWidth5xl",
      @"category": @"maxWidth",
      @"type": @"5xl"
      },
    @"6xl": @{
      @"value": 72rem,
      @"name": @"MaxWidth6xl",
      @"category": @"maxWidth",
      @"type": @"6xl"
      },
    @"7xl": @{
      @"value": 80rem,
      @"name": @"MaxWidth7xl",
      @"category": @"maxWidth",
      @"type": @"7xl"
      },
    @"full": @{
      @"value": 100%,
      @"name": @"MaxWidthFull",
      @"category": @"maxWidth",
      @"type": @"full"
      },
    @"min": @{
      @"value": min-content,
      @"name": @"MaxWidthMin",
      @"category": @"maxWidth",
      @"type": @"min"
      },
    @"max": @{
      @"value": max-content,
      @"name": @"MaxWidthMax",
      @"category": @"maxWidth",
      @"type": @"max"
      },
    @"fit": @{
      @"value": fit-content,
      @"name": @"MaxWidthFit",
      @"category": @"maxWidth",
      @"type": @"fit"
      },
    @"prose": @{
      @"value": 65ch,
      @"name": @"MaxWidthProse",
      @"category": @"maxWidth",
      @"type": @"prose"
      },
    @"screen-sm": @{
      @"value": 640px,
      @"name": @"MaxWidthScreenSm",
      @"category": @"maxWidth",
      @"type": @"screen-sm"
      },
    @"screen-md": @{
      @"value": 768px,
      @"name": @"MaxWidthScreenMd",
      @"category": @"maxWidth",
      @"type": @"screen-md"
      },
    @"screen-lg": @{
      @"value": 1024px,
      @"name": @"MaxWidthScreenLg",
      @"category": @"maxWidth",
      @"type": @"screen-lg"
      },
    @"screen-xl": @{
      @"value": 1280px,
      @"name": @"MaxWidthScreenXl",
      @"category": @"maxWidth",
      @"type": @"screen-xl"
      },
    @"screen-2xl": @{
      @"value": 1536px,
      @"name": @"MaxWidthScreen2xl",
      @"category": @"maxWidth",
      @"type": @"screen-2xl"
      }
    },
  @"minHeight": @{
    @"0": @{
      @"value": 0px,
      @"name": @"MinHeight0",
      @"category": @"minHeight",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"MinHeight1",
      @"category": @"minHeight",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"MinHeight2",
      @"category": @"minHeight",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"MinHeight3",
      @"category": @"minHeight",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"MinHeight4",
      @"category": @"minHeight",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"MinHeight5",
      @"category": @"minHeight",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"MinHeight6",
      @"category": @"minHeight",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"MinHeight7",
      @"category": @"minHeight",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"MinHeight8",
      @"category": @"minHeight",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"MinHeight9",
      @"category": @"minHeight",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"MinHeight10",
      @"category": @"minHeight",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"MinHeight11",
      @"category": @"minHeight",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"MinHeight12",
      @"category": @"minHeight",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"MinHeight14",
      @"category": @"minHeight",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"MinHeight16",
      @"category": @"minHeight",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"MinHeight20",
      @"category": @"minHeight",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"MinHeight24",
      @"category": @"minHeight",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"MinHeight28",
      @"category": @"minHeight",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"MinHeight32",
      @"category": @"minHeight",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"MinHeight36",
      @"category": @"minHeight",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"MinHeight40",
      @"category": @"minHeight",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"MinHeight44",
      @"category": @"minHeight",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"MinHeight48",
      @"category": @"minHeight",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"MinHeight52",
      @"category": @"minHeight",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"MinHeight56",
      @"category": @"minHeight",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"MinHeight60",
      @"category": @"minHeight",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"MinHeight64",
      @"category": @"minHeight",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"MinHeight72",
      @"category": @"minHeight",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"MinHeight80",
      @"category": @"minHeight",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"MinHeight96",
      @"category": @"minHeight",
      @"type": @"96"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"MinHeightPx",
      @"category": @"minHeight",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"MinHeight05",
      @"category": @"minHeight",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"MinHeight15",
      @"category": @"minHeight",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"MinHeight25",
      @"category": @"minHeight",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"MinHeight35",
      @"category": @"minHeight",
      @"type": @"3.5"
      },
    @"full": @{
      @"value": 100%,
      @"name": @"MinHeightFull",
      @"category": @"minHeight",
      @"type": @"full"
      },
    @"screen": @{
      @"value": 100vh,
      @"name": @"MinHeightScreen",
      @"category": @"minHeight",
      @"type": @"screen"
      },
    @"svh": @{
      @"value": 100svh,
      @"name": @"MinHeightSvh",
      @"category": @"minHeight",
      @"type": @"svh"
      },
    @"lvh": @{
      @"value": 100lvh,
      @"name": @"MinHeightLvh",
      @"category": @"minHeight",
      @"type": @"lvh"
      },
    @"dvh": @{
      @"value": 100dvh,
      @"name": @"MinHeightDvh",
      @"category": @"minHeight",
      @"type": @"dvh"
      },
    @"min": @{
      @"value": min-content,
      @"name": @"MinHeightMin",
      @"category": @"minHeight",
      @"type": @"min"
      },
    @"max": @{
      @"value": max-content,
      @"name": @"MinHeightMax",
      @"category": @"minHeight",
      @"type": @"max"
      },
    @"fit": @{
      @"value": fit-content,
      @"name": @"MinHeightFit",
      @"category": @"minHeight",
      @"type": @"fit"
      }
    },
  @"minWidth": @{
    @"0": @{
      @"value": 0px,
      @"name": @"MinWidth0",
      @"category": @"minWidth",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"MinWidth1",
      @"category": @"minWidth",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"MinWidth2",
      @"category": @"minWidth",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"MinWidth3",
      @"category": @"minWidth",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"MinWidth4",
      @"category": @"minWidth",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"MinWidth5",
      @"category": @"minWidth",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"MinWidth6",
      @"category": @"minWidth",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"MinWidth7",
      @"category": @"minWidth",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"MinWidth8",
      @"category": @"minWidth",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"MinWidth9",
      @"category": @"minWidth",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"MinWidth10",
      @"category": @"minWidth",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"MinWidth11",
      @"category": @"minWidth",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"MinWidth12",
      @"category": @"minWidth",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"MinWidth14",
      @"category": @"minWidth",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"MinWidth16",
      @"category": @"minWidth",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"MinWidth20",
      @"category": @"minWidth",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"MinWidth24",
      @"category": @"minWidth",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"MinWidth28",
      @"category": @"minWidth",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"MinWidth32",
      @"category": @"minWidth",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"MinWidth36",
      @"category": @"minWidth",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"MinWidth40",
      @"category": @"minWidth",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"MinWidth44",
      @"category": @"minWidth",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"MinWidth48",
      @"category": @"minWidth",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"MinWidth52",
      @"category": @"minWidth",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"MinWidth56",
      @"category": @"minWidth",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"MinWidth60",
      @"category": @"minWidth",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"MinWidth64",
      @"category": @"minWidth",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"MinWidth72",
      @"category": @"minWidth",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"MinWidth80",
      @"category": @"minWidth",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"MinWidth96",
      @"category": @"minWidth",
      @"type": @"96"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"MinWidthPx",
      @"category": @"minWidth",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"MinWidth05",
      @"category": @"minWidth",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"MinWidth15",
      @"category": @"minWidth",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"MinWidth25",
      @"category": @"minWidth",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"MinWidth35",
      @"category": @"minWidth",
      @"type": @"3.5"
      },
    @"full": @{
      @"value": 100%,
      @"name": @"MinWidthFull",
      @"category": @"minWidth",
      @"type": @"full"
      },
    @"min": @{
      @"value": min-content,
      @"name": @"MinWidthMin",
      @"category": @"minWidth",
      @"type": @"min"
      },
    @"max": @{
      @"value": max-content,
      @"name": @"MinWidthMax",
      @"category": @"minWidth",
      @"type": @"max"
      },
    @"fit": @{
      @"value": fit-content,
      @"name": @"MinWidthFit",
      @"category": @"minWidth",
      @"type": @"fit"
      }
    },
  @"objectPosition": @{
    @"bottom": @{
      @"value": bottom,
      @"name": @"ObjectPositionBottom",
      @"category": @"objectPosition",
      @"type": @"bottom"
      },
    @"center": @{
      @"value": center,
      @"name": @"ObjectPositionCenter",
      @"category": @"objectPosition",
      @"type": @"center"
      },
    @"left": @{
      @"value": left,
      @"name": @"ObjectPositionLeft",
      @"category": @"objectPosition",
      @"type": @"left"
      },
    @"left-bottom": @{
      @"value": left bottom,
      @"name": @"ObjectPositionLeftBottom",
      @"category": @"objectPosition",
      @"type": @"left-bottom"
      },
    @"left-top": @{
      @"value": left top,
      @"name": @"ObjectPositionLeftTop",
      @"category": @"objectPosition",
      @"type": @"left-top"
      },
    @"right": @{
      @"value": right,
      @"name": @"ObjectPositionRight",
      @"category": @"objectPosition",
      @"type": @"right"
      },
    @"right-bottom": @{
      @"value": right bottom,
      @"name": @"ObjectPositionRightBottom",
      @"category": @"objectPosition",
      @"type": @"right-bottom"
      },
    @"right-top": @{
      @"value": right top,
      @"name": @"ObjectPositionRightTop",
      @"category": @"objectPosition",
      @"type": @"right-top"
      },
    @"top": @{
      @"value": top,
      @"name": @"ObjectPositionTop",
      @"category": @"objectPosition",
      @"type": @"top"
      }
    },
  @"opacity": @{
    @"0": @{
      @"value": 0,
      @"name": @"Opacity0",
      @"category": @"opacity",
      @"type": @"0"
      },
    @"5": @{
      @"value": 0.05,
      @"name": @"Opacity5",
      @"category": @"opacity",
      @"type": @"5"
      },
    @"10": @{
      @"value": 0.1,
      @"name": @"Opacity10",
      @"category": @"opacity",
      @"type": @"10"
      },
    @"15": @{
      @"value": 0.15,
      @"name": @"Opacity15",
      @"category": @"opacity",
      @"type": @"15"
      },
    @"20": @{
      @"value": 0.2,
      @"name": @"Opacity20",
      @"category": @"opacity",
      @"type": @"20"
      },
    @"25": @{
      @"value": 0.25,
      @"name": @"Opacity25",
      @"category": @"opacity",
      @"type": @"25"
      },
    @"30": @{
      @"value": 0.3,
      @"name": @"Opacity30",
      @"category": @"opacity",
      @"type": @"30"
      },
    @"35": @{
      @"value": 0.35,
      @"name": @"Opacity35",
      @"category": @"opacity",
      @"type": @"35"
      },
    @"40": @{
      @"value": 0.4,
      @"name": @"Opacity40",
      @"category": @"opacity",
      @"type": @"40"
      },
    @"45": @{
      @"value": 0.45,
      @"name": @"Opacity45",
      @"category": @"opacity",
      @"type": @"45"
      },
    @"50": @{
      @"value": 0.5,
      @"name": @"Opacity50",
      @"category": @"opacity",
      @"type": @"50"
      },
    @"55": @{
      @"value": 0.55,
      @"name": @"Opacity55",
      @"category": @"opacity",
      @"type": @"55"
      },
    @"60": @{
      @"value": 0.6,
      @"name": @"Opacity60",
      @"category": @"opacity",
      @"type": @"60"
      },
    @"65": @{
      @"value": 0.65,
      @"name": @"Opacity65",
      @"category": @"opacity",
      @"type": @"65"
      },
    @"70": @{
      @"value": 0.7,
      @"name": @"Opacity70",
      @"category": @"opacity",
      @"type": @"70"
      },
    @"75": @{
      @"value": 0.75,
      @"name": @"Opacity75",
      @"category": @"opacity",
      @"type": @"75"
      },
    @"80": @{
      @"value": 0.8,
      @"name": @"Opacity80",
      @"category": @"opacity",
      @"type": @"80"
      },
    @"85": @{
      @"value": 0.85,
      @"name": @"Opacity85",
      @"category": @"opacity",
      @"type": @"85"
      },
    @"90": @{
      @"value": 0.9,
      @"name": @"Opacity90",
      @"category": @"opacity",
      @"type": @"90"
      },
    @"95": @{
      @"value": 0.95,
      @"name": @"Opacity95",
      @"category": @"opacity",
      @"type": @"95"
      },
    @"100": @{
      @"value": 1,
      @"name": @"Opacity100",
      @"category": @"opacity",
      @"type": @"100"
      }
    },
  @"order": @{
    @"1": @{
      @"value": 1,
      @"name": @"Order1",
      @"category": @"order",
      @"type": @"1"
      },
    @"2": @{
      @"value": 2,
      @"name": @"Order2",
      @"category": @"order",
      @"type": @"2"
      },
    @"3": @{
      @"value": 3,
      @"name": @"Order3",
      @"category": @"order",
      @"type": @"3"
      },
    @"4": @{
      @"value": 4,
      @"name": @"Order4",
      @"category": @"order",
      @"type": @"4"
      },
    @"5": @{
      @"value": 5,
      @"name": @"Order5",
      @"category": @"order",
      @"type": @"5"
      },
    @"6": @{
      @"value": 6,
      @"name": @"Order6",
      @"category": @"order",
      @"type": @"6"
      },
    @"7": @{
      @"value": 7,
      @"name": @"Order7",
      @"category": @"order",
      @"type": @"7"
      },
    @"8": @{
      @"value": 8,
      @"name": @"Order8",
      @"category": @"order",
      @"type": @"8"
      },
    @"9": @{
      @"value": 9,
      @"name": @"Order9",
      @"category": @"order",
      @"type": @"9"
      },
    @"10": @{
      @"value": 10,
      @"name": @"Order10",
      @"category": @"order",
      @"type": @"10"
      },
    @"11": @{
      @"value": 11,
      @"name": @"Order11",
      @"category": @"order",
      @"type": @"11"
      },
    @"12": @{
      @"value": 12,
      @"name": @"Order12",
      @"category": @"order",
      @"type": @"12"
      },
    @"first": @{
      @"value": -9999,
      @"name": @"OrderFirst",
      @"category": @"order",
      @"type": @"first"
      },
    @"last": @{
      @"value": 9999,
      @"name": @"OrderLast",
      @"category": @"order",
      @"type": @"last"
      },
    @"none": @{
      @"value": 0,
      @"name": @"OrderNone",
      @"category": @"order",
      @"type": @"none"
      }
    },
  @"outlineColor": @{
    @"inherit": @{
      @"value": inherit,
      @"name": @"OutlineColorInherit",
      @"category": @"outlineColor",
      @"type": @"inherit"
      },
    @"current": @{
      @"value": currentColor,
      @"name": @"OutlineColorCurrent",
      @"category": @"outlineColor",
      @"type": @"current"
      },
    @"transparent": @{
      @"value": transparent,
      @"name": @"OutlineColorTransparent",
      @"category": @"outlineColor",
      @"type": @"transparent"
      },
    @"black": @{
      @"value": #000,
      @"name": @"OutlineColorBlack",
      @"category": @"outlineColor",
      @"type": @"black"
      },
    @"white": @{
      @"value": #fff,
      @"name": @"OutlineColorWhite",
      @"category": @"outlineColor",
      @"type": @"white"
      },
    @"slate": @{
      @"50": @{
        @"value": #f8fafc,
        @"name": @"OutlineColorSlate50",
        @"category": @"outlineColor",
        @"type": @"slate",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f1f5f9,
        @"name": @"OutlineColorSlate100",
        @"category": @"outlineColor",
        @"type": @"slate",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e2e8f0,
        @"name": @"OutlineColorSlate200",
        @"category": @"outlineColor",
        @"type": @"slate",
        @"item": @"200"
        },
      @"300": @{
        @"value": #cbd5e1,
        @"name": @"OutlineColorSlate300",
        @"category": @"outlineColor",
        @"type": @"slate",
        @"item": @"300"
        },
      @"400": @{
        @"value": #94a3b8,
        @"name": @"OutlineColorSlate400",
        @"category": @"outlineColor",
        @"type": @"slate",
        @"item": @"400"
        },
      @"500": @{
        @"value": #64748b,
        @"name": @"OutlineColorSlate500",
        @"category": @"outlineColor",
        @"type": @"slate",
        @"item": @"500"
        },
      @"600": @{
        @"value": #475569,
        @"name": @"OutlineColorSlate600",
        @"category": @"outlineColor",
        @"type": @"slate",
        @"item": @"600"
        },
      @"700": @{
        @"value": #334155,
        @"name": @"OutlineColorSlate700",
        @"category": @"outlineColor",
        @"type": @"slate",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e293b,
        @"name": @"OutlineColorSlate800",
        @"category": @"outlineColor",
        @"type": @"slate",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0f172a,
        @"name": @"OutlineColorSlate900",
        @"category": @"outlineColor",
        @"type": @"slate",
        @"item": @"900"
        },
      @"950": @{
        @"value": #020617,
        @"name": @"OutlineColorSlate950",
        @"category": @"outlineColor",
        @"type": @"slate",
        @"item": @"950"
        }
      },
    @"gray": @{
      @"50": @{
        @"value": #f9fafb,
        @"name": @"OutlineColorGray50",
        @"category": @"outlineColor",
        @"type": @"gray",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3f4f6,
        @"name": @"OutlineColorGray100",
        @"category": @"outlineColor",
        @"type": @"gray",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e7eb,
        @"name": @"OutlineColorGray200",
        @"category": @"outlineColor",
        @"type": @"gray",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d1d5db,
        @"name": @"OutlineColorGray300",
        @"category": @"outlineColor",
        @"type": @"gray",
        @"item": @"300"
        },
      @"400": @{
        @"value": #9ca3af,
        @"name": @"OutlineColorGray400",
        @"category": @"outlineColor",
        @"type": @"gray",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6b7280,
        @"name": @"OutlineColorGray500",
        @"category": @"outlineColor",
        @"type": @"gray",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4b5563,
        @"name": @"OutlineColorGray600",
        @"category": @"outlineColor",
        @"type": @"gray",
        @"item": @"600"
        },
      @"700": @{
        @"value": #374151,
        @"name": @"OutlineColorGray700",
        @"category": @"outlineColor",
        @"type": @"gray",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1f2937,
        @"name": @"OutlineColorGray800",
        @"category": @"outlineColor",
        @"type": @"gray",
        @"item": @"800"
        },
      @"900": @{
        @"value": #111827,
        @"name": @"OutlineColorGray900",
        @"category": @"outlineColor",
        @"type": @"gray",
        @"item": @"900"
        },
      @"950": @{
        @"value": #030712,
        @"name": @"OutlineColorGray950",
        @"category": @"outlineColor",
        @"type": @"gray",
        @"item": @"950"
        }
      },
    @"zinc": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"OutlineColorZinc50",
        @"category": @"outlineColor",
        @"type": @"zinc",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f4f4f5,
        @"name": @"OutlineColorZinc100",
        @"category": @"outlineColor",
        @"type": @"zinc",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e4e4e7,
        @"name": @"OutlineColorZinc200",
        @"category": @"outlineColor",
        @"type": @"zinc",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d8,
        @"name": @"OutlineColorZinc300",
        @"category": @"outlineColor",
        @"type": @"zinc",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a1a1aa,
        @"name": @"OutlineColorZinc400",
        @"category": @"outlineColor",
        @"type": @"zinc",
        @"item": @"400"
        },
      @"500": @{
        @"value": #71717a,
        @"name": @"OutlineColorZinc500",
        @"category": @"outlineColor",
        @"type": @"zinc",
        @"item": @"500"
        },
      @"600": @{
        @"value": #52525b,
        @"name": @"OutlineColorZinc600",
        @"category": @"outlineColor",
        @"type": @"zinc",
        @"item": @"600"
        },
      @"700": @{
        @"value": #3f3f46,
        @"name": @"OutlineColorZinc700",
        @"category": @"outlineColor",
        @"type": @"zinc",
        @"item": @"700"
        },
      @"800": @{
        @"value": #27272a,
        @"name": @"OutlineColorZinc800",
        @"category": @"outlineColor",
        @"type": @"zinc",
        @"item": @"800"
        },
      @"900": @{
        @"value": #18181b,
        @"name": @"OutlineColorZinc900",
        @"category": @"outlineColor",
        @"type": @"zinc",
        @"item": @"900"
        },
      @"950": @{
        @"value": #09090b,
        @"name": @"OutlineColorZinc950",
        @"category": @"outlineColor",
        @"type": @"zinc",
        @"item": @"950"
        }
      },
    @"neutral": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"OutlineColorNeutral50",
        @"category": @"outlineColor",
        @"type": @"neutral",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f5,
        @"name": @"OutlineColorNeutral100",
        @"category": @"outlineColor",
        @"type": @"neutral",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e5e5,
        @"name": @"OutlineColorNeutral200",
        @"category": @"outlineColor",
        @"type": @"neutral",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d4,
        @"name": @"OutlineColorNeutral300",
        @"category": @"outlineColor",
        @"type": @"neutral",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3a3a3,
        @"name": @"OutlineColorNeutral400",
        @"category": @"outlineColor",
        @"type": @"neutral",
        @"item": @"400"
        },
      @"500": @{
        @"value": #737373,
        @"name": @"OutlineColorNeutral500",
        @"category": @"outlineColor",
        @"type": @"neutral",
        @"item": @"500"
        },
      @"600": @{
        @"value": #525252,
        @"name": @"OutlineColorNeutral600",
        @"category": @"outlineColor",
        @"type": @"neutral",
        @"item": @"600"
        },
      @"700": @{
        @"value": #404040,
        @"name": @"OutlineColorNeutral700",
        @"category": @"outlineColor",
        @"type": @"neutral",
        @"item": @"700"
        },
      @"800": @{
        @"value": #262626,
        @"name": @"OutlineColorNeutral800",
        @"category": @"outlineColor",
        @"type": @"neutral",
        @"item": @"800"
        },
      @"900": @{
        @"value": #171717,
        @"name": @"OutlineColorNeutral900",
        @"category": @"outlineColor",
        @"type": @"neutral",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0a0a0a,
        @"name": @"OutlineColorNeutral950",
        @"category": @"outlineColor",
        @"type": @"neutral",
        @"item": @"950"
        }
      },
    @"stone": @{
      @"50": @{
        @"value": #fafaf9,
        @"name": @"OutlineColorStone50",
        @"category": @"outlineColor",
        @"type": @"stone",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f4,
        @"name": @"OutlineColorStone100",
        @"category": @"outlineColor",
        @"type": @"stone",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e7e5e4,
        @"name": @"OutlineColorStone200",
        @"category": @"outlineColor",
        @"type": @"stone",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d6d3d1,
        @"name": @"OutlineColorStone300",
        @"category": @"outlineColor",
        @"type": @"stone",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a8a29e,
        @"name": @"OutlineColorStone400",
        @"category": @"outlineColor",
        @"type": @"stone",
        @"item": @"400"
        },
      @"500": @{
        @"value": #78716c,
        @"name": @"OutlineColorStone500",
        @"category": @"outlineColor",
        @"type": @"stone",
        @"item": @"500"
        },
      @"600": @{
        @"value": #57534e,
        @"name": @"OutlineColorStone600",
        @"category": @"outlineColor",
        @"type": @"stone",
        @"item": @"600"
        },
      @"700": @{
        @"value": #44403c,
        @"name": @"OutlineColorStone700",
        @"category": @"outlineColor",
        @"type": @"stone",
        @"item": @"700"
        },
      @"800": @{
        @"value": #292524,
        @"name": @"OutlineColorStone800",
        @"category": @"outlineColor",
        @"type": @"stone",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1c1917,
        @"name": @"OutlineColorStone900",
        @"category": @"outlineColor",
        @"type": @"stone",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0c0a09,
        @"name": @"OutlineColorStone950",
        @"category": @"outlineColor",
        @"type": @"stone",
        @"item": @"950"
        }
      },
    @"red": @{
      @"50": @{
        @"value": #fef2f2,
        @"name": @"OutlineColorRed50",
        @"category": @"outlineColor",
        @"type": @"red",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fee2e2,
        @"name": @"OutlineColorRed100",
        @"category": @"outlineColor",
        @"type": @"red",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecaca,
        @"name": @"OutlineColorRed200",
        @"category": @"outlineColor",
        @"type": @"red",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fca5a5,
        @"name": @"OutlineColorRed300",
        @"category": @"outlineColor",
        @"type": @"red",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f87171,
        @"name": @"OutlineColorRed400",
        @"category": @"outlineColor",
        @"type": @"red",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ef4444,
        @"name": @"OutlineColorRed500",
        @"category": @"outlineColor",
        @"type": @"red",
        @"item": @"500"
        },
      @"600": @{
        @"value": #dc2626,
        @"name": @"OutlineColorRed600",
        @"category": @"outlineColor",
        @"type": @"red",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b91c1c,
        @"name": @"OutlineColorRed700",
        @"category": @"outlineColor",
        @"type": @"red",
        @"item": @"700"
        },
      @"800": @{
        @"value": #991b1b,
        @"name": @"OutlineColorRed800",
        @"category": @"outlineColor",
        @"type": @"red",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7f1d1d,
        @"name": @"OutlineColorRed900",
        @"category": @"outlineColor",
        @"type": @"red",
        @"item": @"900"
        },
      @"950": @{
        @"value": #450a0a,
        @"name": @"OutlineColorRed950",
        @"category": @"outlineColor",
        @"type": @"red",
        @"item": @"950"
        }
      },
    @"orange": @{
      @"50": @{
        @"value": #fff7ed,
        @"name": @"OutlineColorOrange50",
        @"category": @"outlineColor",
        @"type": @"orange",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffedd5,
        @"name": @"OutlineColorOrange100",
        @"category": @"outlineColor",
        @"type": @"orange",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fed7aa,
        @"name": @"OutlineColorOrange200",
        @"category": @"outlineColor",
        @"type": @"orange",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fdba74,
        @"name": @"OutlineColorOrange300",
        @"category": @"outlineColor",
        @"type": @"orange",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb923c,
        @"name": @"OutlineColorOrange400",
        @"category": @"outlineColor",
        @"type": @"orange",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f97316,
        @"name": @"OutlineColorOrange500",
        @"category": @"outlineColor",
        @"type": @"orange",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ea580c,
        @"name": @"OutlineColorOrange600",
        @"category": @"outlineColor",
        @"type": @"orange",
        @"item": @"600"
        },
      @"700": @{
        @"value": #c2410c,
        @"name": @"OutlineColorOrange700",
        @"category": @"outlineColor",
        @"type": @"orange",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9a3412,
        @"name": @"OutlineColorOrange800",
        @"category": @"outlineColor",
        @"type": @"orange",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7c2d12,
        @"name": @"OutlineColorOrange900",
        @"category": @"outlineColor",
        @"type": @"orange",
        @"item": @"900"
        },
      @"950": @{
        @"value": #431407,
        @"name": @"OutlineColorOrange950",
        @"category": @"outlineColor",
        @"type": @"orange",
        @"item": @"950"
        }
      },
    @"amber": @{
      @"50": @{
        @"value": #fffbeb,
        @"name": @"OutlineColorAmber50",
        @"category": @"outlineColor",
        @"type": @"amber",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef3c7,
        @"name": @"OutlineColorAmber100",
        @"category": @"outlineColor",
        @"type": @"amber",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fde68a,
        @"name": @"OutlineColorAmber200",
        @"category": @"outlineColor",
        @"type": @"amber",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fcd34d,
        @"name": @"OutlineColorAmber300",
        @"category": @"outlineColor",
        @"type": @"amber",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fbbf24,
        @"name": @"OutlineColorAmber400",
        @"category": @"outlineColor",
        @"type": @"amber",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f59e0b,
        @"name": @"OutlineColorAmber500",
        @"category": @"outlineColor",
        @"type": @"amber",
        @"item": @"500"
        },
      @"600": @{
        @"value": #d97706,
        @"name": @"OutlineColorAmber600",
        @"category": @"outlineColor",
        @"type": @"amber",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b45309,
        @"name": @"OutlineColorAmber700",
        @"category": @"outlineColor",
        @"type": @"amber",
        @"item": @"700"
        },
      @"800": @{
        @"value": #92400e,
        @"name": @"OutlineColorAmber800",
        @"category": @"outlineColor",
        @"type": @"amber",
        @"item": @"800"
        },
      @"900": @{
        @"value": #78350f,
        @"name": @"OutlineColorAmber900",
        @"category": @"outlineColor",
        @"type": @"amber",
        @"item": @"900"
        },
      @"950": @{
        @"value": #451a03,
        @"name": @"OutlineColorAmber950",
        @"category": @"outlineColor",
        @"type": @"amber",
        @"item": @"950"
        }
      },
    @"yellow": @{
      @"50": @{
        @"value": #fefce8,
        @"name": @"OutlineColorYellow50",
        @"category": @"outlineColor",
        @"type": @"yellow",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef9c3,
        @"name": @"OutlineColorYellow100",
        @"category": @"outlineColor",
        @"type": @"yellow",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fef08a,
        @"name": @"OutlineColorYellow200",
        @"category": @"outlineColor",
        @"type": @"yellow",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fde047,
        @"name": @"OutlineColorYellow300",
        @"category": @"outlineColor",
        @"type": @"yellow",
        @"item": @"300"
        },
      @"400": @{
        @"value": #facc15,
        @"name": @"OutlineColorYellow400",
        @"category": @"outlineColor",
        @"type": @"yellow",
        @"item": @"400"
        },
      @"500": @{
        @"value": #eab308,
        @"name": @"OutlineColorYellow500",
        @"category": @"outlineColor",
        @"type": @"yellow",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ca8a04,
        @"name": @"OutlineColorYellow600",
        @"category": @"outlineColor",
        @"type": @"yellow",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a16207,
        @"name": @"OutlineColorYellow700",
        @"category": @"outlineColor",
        @"type": @"yellow",
        @"item": @"700"
        },
      @"800": @{
        @"value": #854d0e,
        @"name": @"OutlineColorYellow800",
        @"category": @"outlineColor",
        @"type": @"yellow",
        @"item": @"800"
        },
      @"900": @{
        @"value": #713f12,
        @"name": @"OutlineColorYellow900",
        @"category": @"outlineColor",
        @"type": @"yellow",
        @"item": @"900"
        },
      @"950": @{
        @"value": #422006,
        @"name": @"OutlineColorYellow950",
        @"category": @"outlineColor",
        @"type": @"yellow",
        @"item": @"950"
        }
      },
    @"lime": @{
      @"50": @{
        @"value": #f7fee7,
        @"name": @"OutlineColorLime50",
        @"category": @"outlineColor",
        @"type": @"lime",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ecfccb,
        @"name": @"OutlineColorLime100",
        @"category": @"outlineColor",
        @"type": @"lime",
        @"item": @"100"
        },
      @"200": @{
        @"value": #d9f99d,
        @"name": @"OutlineColorLime200",
        @"category": @"outlineColor",
        @"type": @"lime",
        @"item": @"200"
        },
      @"300": @{
        @"value": #bef264,
        @"name": @"OutlineColorLime300",
        @"category": @"outlineColor",
        @"type": @"lime",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3e635,
        @"name": @"OutlineColorLime400",
        @"category": @"outlineColor",
        @"type": @"lime",
        @"item": @"400"
        },
      @"500": @{
        @"value": #84cc16,
        @"name": @"OutlineColorLime500",
        @"category": @"outlineColor",
        @"type": @"lime",
        @"item": @"500"
        },
      @"600": @{
        @"value": #65a30d,
        @"name": @"OutlineColorLime600",
        @"category": @"outlineColor",
        @"type": @"lime",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4d7c0f,
        @"name": @"OutlineColorLime700",
        @"category": @"outlineColor",
        @"type": @"lime",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3f6212,
        @"name": @"OutlineColorLime800",
        @"category": @"outlineColor",
        @"type": @"lime",
        @"item": @"800"
        },
      @"900": @{
        @"value": #365314,
        @"name": @"OutlineColorLime900",
        @"category": @"outlineColor",
        @"type": @"lime",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1a2e05,
        @"name": @"OutlineColorLime950",
        @"category": @"outlineColor",
        @"type": @"lime",
        @"item": @"950"
        }
      },
    @"green": @{
      @"50": @{
        @"value": #f0fdf4,
        @"name": @"OutlineColorGreen50",
        @"category": @"outlineColor",
        @"type": @"green",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dcfce7,
        @"name": @"OutlineColorGreen100",
        @"category": @"outlineColor",
        @"type": @"green",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bbf7d0,
        @"name": @"OutlineColorGreen200",
        @"category": @"outlineColor",
        @"type": @"green",
        @"item": @"200"
        },
      @"300": @{
        @"value": #86efac,
        @"name": @"OutlineColorGreen300",
        @"category": @"outlineColor",
        @"type": @"green",
        @"item": @"300"
        },
      @"400": @{
        @"value": #4ade80,
        @"name": @"OutlineColorGreen400",
        @"category": @"outlineColor",
        @"type": @"green",
        @"item": @"400"
        },
      @"500": @{
        @"value": #22c55e,
        @"name": @"OutlineColorGreen500",
        @"category": @"outlineColor",
        @"type": @"green",
        @"item": @"500"
        },
      @"600": @{
        @"value": #16a34a,
        @"name": @"OutlineColorGreen600",
        @"category": @"outlineColor",
        @"type": @"green",
        @"item": @"600"
        },
      @"700": @{
        @"value": #15803d,
        @"name": @"OutlineColorGreen700",
        @"category": @"outlineColor",
        @"type": @"green",
        @"item": @"700"
        },
      @"800": @{
        @"value": #166534,
        @"name": @"OutlineColorGreen800",
        @"category": @"outlineColor",
        @"type": @"green",
        @"item": @"800"
        },
      @"900": @{
        @"value": #14532d,
        @"name": @"OutlineColorGreen900",
        @"category": @"outlineColor",
        @"type": @"green",
        @"item": @"900"
        },
      @"950": @{
        @"value": #052e16,
        @"name": @"OutlineColorGreen950",
        @"category": @"outlineColor",
        @"type": @"green",
        @"item": @"950"
        }
      },
    @"emerald": @{
      @"50": @{
        @"value": #ecfdf5,
        @"name": @"OutlineColorEmerald50",
        @"category": @"outlineColor",
        @"type": @"emerald",
        @"item": @"50"
        },
      @"100": @{
        @"value": #d1fae5,
        @"name": @"OutlineColorEmerald100",
        @"category": @"outlineColor",
        @"type": @"emerald",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a7f3d0,
        @"name": @"OutlineColorEmerald200",
        @"category": @"outlineColor",
        @"type": @"emerald",
        @"item": @"200"
        },
      @"300": @{
        @"value": #6ee7b7,
        @"name": @"OutlineColorEmerald300",
        @"category": @"outlineColor",
        @"type": @"emerald",
        @"item": @"300"
        },
      @"400": @{
        @"value": #34d399,
        @"name": @"OutlineColorEmerald400",
        @"category": @"outlineColor",
        @"type": @"emerald",
        @"item": @"400"
        },
      @"500": @{
        @"value": #10b981,
        @"name": @"OutlineColorEmerald500",
        @"category": @"outlineColor",
        @"type": @"emerald",
        @"item": @"500"
        },
      @"600": @{
        @"value": #059669,
        @"name": @"OutlineColorEmerald600",
        @"category": @"outlineColor",
        @"type": @"emerald",
        @"item": @"600"
        },
      @"700": @{
        @"value": #047857,
        @"name": @"OutlineColorEmerald700",
        @"category": @"outlineColor",
        @"type": @"emerald",
        @"item": @"700"
        },
      @"800": @{
        @"value": #065f46,
        @"name": @"OutlineColorEmerald800",
        @"category": @"outlineColor",
        @"type": @"emerald",
        @"item": @"800"
        },
      @"900": @{
        @"value": #064e3b,
        @"name": @"OutlineColorEmerald900",
        @"category": @"outlineColor",
        @"type": @"emerald",
        @"item": @"900"
        },
      @"950": @{
        @"value": #022c22,
        @"name": @"OutlineColorEmerald950",
        @"category": @"outlineColor",
        @"type": @"emerald",
        @"item": @"950"
        }
      },
    @"teal": @{
      @"50": @{
        @"value": #f0fdfa,
        @"name": @"OutlineColorTeal50",
        @"category": @"outlineColor",
        @"type": @"teal",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ccfbf1,
        @"name": @"OutlineColorTeal100",
        @"category": @"outlineColor",
        @"type": @"teal",
        @"item": @"100"
        },
      @"200": @{
        @"value": #99f6e4,
        @"name": @"OutlineColorTeal200",
        @"category": @"outlineColor",
        @"type": @"teal",
        @"item": @"200"
        },
      @"300": @{
        @"value": #5eead4,
        @"name": @"OutlineColorTeal300",
        @"category": @"outlineColor",
        @"type": @"teal",
        @"item": @"300"
        },
      @"400": @{
        @"value": #2dd4bf,
        @"name": @"OutlineColorTeal400",
        @"category": @"outlineColor",
        @"type": @"teal",
        @"item": @"400"
        },
      @"500": @{
        @"value": #14b8a6,
        @"name": @"OutlineColorTeal500",
        @"category": @"outlineColor",
        @"type": @"teal",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0d9488,
        @"name": @"OutlineColorTeal600",
        @"category": @"outlineColor",
        @"type": @"teal",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0f766e,
        @"name": @"OutlineColorTeal700",
        @"category": @"outlineColor",
        @"type": @"teal",
        @"item": @"700"
        },
      @"800": @{
        @"value": #115e59,
        @"name": @"OutlineColorTeal800",
        @"category": @"outlineColor",
        @"type": @"teal",
        @"item": @"800"
        },
      @"900": @{
        @"value": #134e4a,
        @"name": @"OutlineColorTeal900",
        @"category": @"outlineColor",
        @"type": @"teal",
        @"item": @"900"
        },
      @"950": @{
        @"value": #042f2e,
        @"name": @"OutlineColorTeal950",
        @"category": @"outlineColor",
        @"type": @"teal",
        @"item": @"950"
        }
      },
    @"cyan": @{
      @"50": @{
        @"value": #ecfeff,
        @"name": @"OutlineColorCyan50",
        @"category": @"outlineColor",
        @"type": @"cyan",
        @"item": @"50"
        },
      @"100": @{
        @"value": #cffafe,
        @"name": @"OutlineColorCyan100",
        @"category": @"outlineColor",
        @"type": @"cyan",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a5f3fc,
        @"name": @"OutlineColorCyan200",
        @"category": @"outlineColor",
        @"type": @"cyan",
        @"item": @"200"
        },
      @"300": @{
        @"value": #67e8f9,
        @"name": @"OutlineColorCyan300",
        @"category": @"outlineColor",
        @"type": @"cyan",
        @"item": @"300"
        },
      @"400": @{
        @"value": #22d3ee,
        @"name": @"OutlineColorCyan400",
        @"category": @"outlineColor",
        @"type": @"cyan",
        @"item": @"400"
        },
      @"500": @{
        @"value": #06b6d4,
        @"name": @"OutlineColorCyan500",
        @"category": @"outlineColor",
        @"type": @"cyan",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0891b2,
        @"name": @"OutlineColorCyan600",
        @"category": @"outlineColor",
        @"type": @"cyan",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0e7490,
        @"name": @"OutlineColorCyan700",
        @"category": @"outlineColor",
        @"type": @"cyan",
        @"item": @"700"
        },
      @"800": @{
        @"value": #155e75,
        @"name": @"OutlineColorCyan800",
        @"category": @"outlineColor",
        @"type": @"cyan",
        @"item": @"800"
        },
      @"900": @{
        @"value": #164e63,
        @"name": @"OutlineColorCyan900",
        @"category": @"outlineColor",
        @"type": @"cyan",
        @"item": @"900"
        },
      @"950": @{
        @"value": #083344,
        @"name": @"OutlineColorCyan950",
        @"category": @"outlineColor",
        @"type": @"cyan",
        @"item": @"950"
        }
      },
    @"sky": @{
      @"50": @{
        @"value": #f0f9ff,
        @"name": @"OutlineColorSky50",
        @"category": @"outlineColor",
        @"type": @"sky",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0f2fe,
        @"name": @"OutlineColorSky100",
        @"category": @"outlineColor",
        @"type": @"sky",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bae6fd,
        @"name": @"OutlineColorSky200",
        @"category": @"outlineColor",
        @"type": @"sky",
        @"item": @"200"
        },
      @"300": @{
        @"value": #7dd3fc,
        @"name": @"OutlineColorSky300",
        @"category": @"outlineColor",
        @"type": @"sky",
        @"item": @"300"
        },
      @"400": @{
        @"value": #38bdf8,
        @"name": @"OutlineColorSky400",
        @"category": @"outlineColor",
        @"type": @"sky",
        @"item": @"400"
        },
      @"500": @{
        @"value": #0ea5e9,
        @"name": @"OutlineColorSky500",
        @"category": @"outlineColor",
        @"type": @"sky",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0284c7,
        @"name": @"OutlineColorSky600",
        @"category": @"outlineColor",
        @"type": @"sky",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0369a1,
        @"name": @"OutlineColorSky700",
        @"category": @"outlineColor",
        @"type": @"sky",
        @"item": @"700"
        },
      @"800": @{
        @"value": #075985,
        @"name": @"OutlineColorSky800",
        @"category": @"outlineColor",
        @"type": @"sky",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0c4a6e,
        @"name": @"OutlineColorSky900",
        @"category": @"outlineColor",
        @"type": @"sky",
        @"item": @"900"
        },
      @"950": @{
        @"value": #082f49,
        @"name": @"OutlineColorSky950",
        @"category": @"outlineColor",
        @"type": @"sky",
        @"item": @"950"
        }
      },
    @"blue": @{
      @"50": @{
        @"value": #eff6ff,
        @"name": @"OutlineColorBlue50",
        @"category": @"outlineColor",
        @"type": @"blue",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dbeafe,
        @"name": @"OutlineColorBlue100",
        @"category": @"outlineColor",
        @"type": @"blue",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bfdbfe,
        @"name": @"OutlineColorBlue200",
        @"category": @"outlineColor",
        @"type": @"blue",
        @"item": @"200"
        },
      @"300": @{
        @"value": #93c5fd,
        @"name": @"OutlineColorBlue300",
        @"category": @"outlineColor",
        @"type": @"blue",
        @"item": @"300"
        },
      @"400": @{
        @"value": #60a5fa,
        @"name": @"OutlineColorBlue400",
        @"category": @"outlineColor",
        @"type": @"blue",
        @"item": @"400"
        },
      @"500": @{
        @"value": #3b82f6,
        @"name": @"OutlineColorBlue500",
        @"category": @"outlineColor",
        @"type": @"blue",
        @"item": @"500"
        },
      @"600": @{
        @"value": #2563eb,
        @"name": @"OutlineColorBlue600",
        @"category": @"outlineColor",
        @"type": @"blue",
        @"item": @"600"
        },
      @"700": @{
        @"value": #1d4ed8,
        @"name": @"OutlineColorBlue700",
        @"category": @"outlineColor",
        @"type": @"blue",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e40af,
        @"name": @"OutlineColorBlue800",
        @"category": @"outlineColor",
        @"type": @"blue",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1e3a8a,
        @"name": @"OutlineColorBlue900",
        @"category": @"outlineColor",
        @"type": @"blue",
        @"item": @"900"
        },
      @"950": @{
        @"value": #172554,
        @"name": @"OutlineColorBlue950",
        @"category": @"outlineColor",
        @"type": @"blue",
        @"item": @"950"
        }
      },
    @"indigo": @{
      @"50": @{
        @"value": #eef2ff,
        @"name": @"OutlineColorIndigo50",
        @"category": @"outlineColor",
        @"type": @"indigo",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0e7ff,
        @"name": @"OutlineColorIndigo100",
        @"category": @"outlineColor",
        @"type": @"indigo",
        @"item": @"100"
        },
      @"200": @{
        @"value": #c7d2fe,
        @"name": @"OutlineColorIndigo200",
        @"category": @"outlineColor",
        @"type": @"indigo",
        @"item": @"200"
        },
      @"300": @{
        @"value": #a5b4fc,
        @"name": @"OutlineColorIndigo300",
        @"category": @"outlineColor",
        @"type": @"indigo",
        @"item": @"300"
        },
      @"400": @{
        @"value": #818cf8,
        @"name": @"OutlineColorIndigo400",
        @"category": @"outlineColor",
        @"type": @"indigo",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6366f1,
        @"name": @"OutlineColorIndigo500",
        @"category": @"outlineColor",
        @"type": @"indigo",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4f46e5,
        @"name": @"OutlineColorIndigo600",
        @"category": @"outlineColor",
        @"type": @"indigo",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4338ca,
        @"name": @"OutlineColorIndigo700",
        @"category": @"outlineColor",
        @"type": @"indigo",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3730a3,
        @"name": @"OutlineColorIndigo800",
        @"category": @"outlineColor",
        @"type": @"indigo",
        @"item": @"800"
        },
      @"900": @{
        @"value": #312e81,
        @"name": @"OutlineColorIndigo900",
        @"category": @"outlineColor",
        @"type": @"indigo",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1e1b4b,
        @"name": @"OutlineColorIndigo950",
        @"category": @"outlineColor",
        @"type": @"indigo",
        @"item": @"950"
        }
      },
    @"violet": @{
      @"50": @{
        @"value": #f5f3ff,
        @"name": @"OutlineColorViolet50",
        @"category": @"outlineColor",
        @"type": @"violet",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ede9fe,
        @"name": @"OutlineColorViolet100",
        @"category": @"outlineColor",
        @"type": @"violet",
        @"item": @"100"
        },
      @"200": @{
        @"value": #ddd6fe,
        @"name": @"OutlineColorViolet200",
        @"category": @"outlineColor",
        @"type": @"violet",
        @"item": @"200"
        },
      @"300": @{
        @"value": #c4b5fd,
        @"name": @"OutlineColorViolet300",
        @"category": @"outlineColor",
        @"type": @"violet",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a78bfa,
        @"name": @"OutlineColorViolet400",
        @"category": @"outlineColor",
        @"type": @"violet",
        @"item": @"400"
        },
      @"500": @{
        @"value": #8b5cf6,
        @"name": @"OutlineColorViolet500",
        @"category": @"outlineColor",
        @"type": @"violet",
        @"item": @"500"
        },
      @"600": @{
        @"value": #7c3aed,
        @"name": @"OutlineColorViolet600",
        @"category": @"outlineColor",
        @"type": @"violet",
        @"item": @"600"
        },
      @"700": @{
        @"value": #6d28d9,
        @"name": @"OutlineColorViolet700",
        @"category": @"outlineColor",
        @"type": @"violet",
        @"item": @"700"
        },
      @"800": @{
        @"value": #5b21b6,
        @"name": @"OutlineColorViolet800",
        @"category": @"outlineColor",
        @"type": @"violet",
        @"item": @"800"
        },
      @"900": @{
        @"value": #4c1d95,
        @"name": @"OutlineColorViolet900",
        @"category": @"outlineColor",
        @"type": @"violet",
        @"item": @"900"
        },
      @"950": @{
        @"value": #2e1065,
        @"name": @"OutlineColorViolet950",
        @"category": @"outlineColor",
        @"type": @"violet",
        @"item": @"950"
        }
      },
    @"purple": @{
      @"50": @{
        @"value": #faf5ff,
        @"name": @"OutlineColorPurple50",
        @"category": @"outlineColor",
        @"type": @"purple",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3e8ff,
        @"name": @"OutlineColorPurple100",
        @"category": @"outlineColor",
        @"type": @"purple",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e9d5ff,
        @"name": @"OutlineColorPurple200",
        @"category": @"outlineColor",
        @"type": @"purple",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d8b4fe,
        @"name": @"OutlineColorPurple300",
        @"category": @"outlineColor",
        @"type": @"purple",
        @"item": @"300"
        },
      @"400": @{
        @"value": #c084fc,
        @"name": @"OutlineColorPurple400",
        @"category": @"outlineColor",
        @"type": @"purple",
        @"item": @"400"
        },
      @"500": @{
        @"value": #a855f7,
        @"name": @"OutlineColorPurple500",
        @"category": @"outlineColor",
        @"type": @"purple",
        @"item": @"500"
        },
      @"600": @{
        @"value": #9333ea,
        @"name": @"OutlineColorPurple600",
        @"category": @"outlineColor",
        @"type": @"purple",
        @"item": @"600"
        },
      @"700": @{
        @"value": #7e22ce,
        @"name": @"OutlineColorPurple700",
        @"category": @"outlineColor",
        @"type": @"purple",
        @"item": @"700"
        },
      @"800": @{
        @"value": #6b21a8,
        @"name": @"OutlineColorPurple800",
        @"category": @"outlineColor",
        @"type": @"purple",
        @"item": @"800"
        },
      @"900": @{
        @"value": #581c87,
        @"name": @"OutlineColorPurple900",
        @"category": @"outlineColor",
        @"type": @"purple",
        @"item": @"900"
        },
      @"950": @{
        @"value": #3b0764,
        @"name": @"OutlineColorPurple950",
        @"category": @"outlineColor",
        @"type": @"purple",
        @"item": @"950"
        }
      },
    @"fuchsia": @{
      @"50": @{
        @"value": #fdf4ff,
        @"name": @"OutlineColorFuchsia50",
        @"category": @"outlineColor",
        @"type": @"fuchsia",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fae8ff,
        @"name": @"OutlineColorFuchsia100",
        @"category": @"outlineColor",
        @"type": @"fuchsia",
        @"item": @"100"
        },
      @"200": @{
        @"value": #f5d0fe,
        @"name": @"OutlineColorFuchsia200",
        @"category": @"outlineColor",
        @"type": @"fuchsia",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f0abfc,
        @"name": @"OutlineColorFuchsia300",
        @"category": @"outlineColor",
        @"type": @"fuchsia",
        @"item": @"300"
        },
      @"400": @{
        @"value": #e879f9,
        @"name": @"OutlineColorFuchsia400",
        @"category": @"outlineColor",
        @"type": @"fuchsia",
        @"item": @"400"
        },
      @"500": @{
        @"value": #d946ef,
        @"name": @"OutlineColorFuchsia500",
        @"category": @"outlineColor",
        @"type": @"fuchsia",
        @"item": @"500"
        },
      @"600": @{
        @"value": #c026d3,
        @"name": @"OutlineColorFuchsia600",
        @"category": @"outlineColor",
        @"type": @"fuchsia",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a21caf,
        @"name": @"OutlineColorFuchsia700",
        @"category": @"outlineColor",
        @"type": @"fuchsia",
        @"item": @"700"
        },
      @"800": @{
        @"value": #86198f,
        @"name": @"OutlineColorFuchsia800",
        @"category": @"outlineColor",
        @"type": @"fuchsia",
        @"item": @"800"
        },
      @"900": @{
        @"value": #701a75,
        @"name": @"OutlineColorFuchsia900",
        @"category": @"outlineColor",
        @"type": @"fuchsia",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4a044e,
        @"name": @"OutlineColorFuchsia950",
        @"category": @"outlineColor",
        @"type": @"fuchsia",
        @"item": @"950"
        }
      },
    @"pink": @{
      @"50": @{
        @"value": #fdf2f8,
        @"name": @"OutlineColorPink50",
        @"category": @"outlineColor",
        @"type": @"pink",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fce7f3,
        @"name": @"OutlineColorPink100",
        @"category": @"outlineColor",
        @"type": @"pink",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fbcfe8,
        @"name": @"OutlineColorPink200",
        @"category": @"outlineColor",
        @"type": @"pink",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f9a8d4,
        @"name": @"OutlineColorPink300",
        @"category": @"outlineColor",
        @"type": @"pink",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f472b6,
        @"name": @"OutlineColorPink400",
        @"category": @"outlineColor",
        @"type": @"pink",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ec4899,
        @"name": @"OutlineColorPink500",
        @"category": @"outlineColor",
        @"type": @"pink",
        @"item": @"500"
        },
      @"600": @{
        @"value": #db2777,
        @"name": @"OutlineColorPink600",
        @"category": @"outlineColor",
        @"type": @"pink",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be185d,
        @"name": @"OutlineColorPink700",
        @"category": @"outlineColor",
        @"type": @"pink",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9d174d,
        @"name": @"OutlineColorPink800",
        @"category": @"outlineColor",
        @"type": @"pink",
        @"item": @"800"
        },
      @"900": @{
        @"value": #831843,
        @"name": @"OutlineColorPink900",
        @"category": @"outlineColor",
        @"type": @"pink",
        @"item": @"900"
        },
      @"950": @{
        @"value": #500724,
        @"name": @"OutlineColorPink950",
        @"category": @"outlineColor",
        @"type": @"pink",
        @"item": @"950"
        }
      },
    @"rose": @{
      @"50": @{
        @"value": #fff1f2,
        @"name": @"OutlineColorRose50",
        @"category": @"outlineColor",
        @"type": @"rose",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffe4e6,
        @"name": @"OutlineColorRose100",
        @"category": @"outlineColor",
        @"type": @"rose",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecdd3,
        @"name": @"OutlineColorRose200",
        @"category": @"outlineColor",
        @"type": @"rose",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fda4af,
        @"name": @"OutlineColorRose300",
        @"category": @"outlineColor",
        @"type": @"rose",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb7185,
        @"name": @"OutlineColorRose400",
        @"category": @"outlineColor",
        @"type": @"rose",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f43f5e,
        @"name": @"OutlineColorRose500",
        @"category": @"outlineColor",
        @"type": @"rose",
        @"item": @"500"
        },
      @"600": @{
        @"value": #e11d48,
        @"name": @"OutlineColorRose600",
        @"category": @"outlineColor",
        @"type": @"rose",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be123c,
        @"name": @"OutlineColorRose700",
        @"category": @"outlineColor",
        @"type": @"rose",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9f1239,
        @"name": @"OutlineColorRose800",
        @"category": @"outlineColor",
        @"type": @"rose",
        @"item": @"800"
        },
      @"900": @{
        @"value": #881337,
        @"name": @"OutlineColorRose900",
        @"category": @"outlineColor",
        @"type": @"rose",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4c0519,
        @"name": @"OutlineColorRose950",
        @"category": @"outlineColor",
        @"type": @"rose",
        @"item": @"950"
        }
      }
    },
  @"outlineOffset": @{
    @"0": @{
      @"value": 0px,
      @"name": @"OutlineOffset0",
      @"category": @"outlineOffset",
      @"type": @"0"
      },
    @"1": @{
      @"value": 1px,
      @"name": @"OutlineOffset1",
      @"category": @"outlineOffset",
      @"type": @"1"
      },
    @"2": @{
      @"value": 2px,
      @"name": @"OutlineOffset2",
      @"category": @"outlineOffset",
      @"type": @"2"
      },
    @"4": @{
      @"value": 4px,
      @"name": @"OutlineOffset4",
      @"category": @"outlineOffset",
      @"type": @"4"
      },
    @"8": @{
      @"value": 8px,
      @"name": @"OutlineOffset8",
      @"category": @"outlineOffset",
      @"type": @"8"
      }
    },
  @"outlineWidth": @{
    @"0": @{
      @"value": 0px,
      @"name": @"OutlineWidth0",
      @"category": @"outlineWidth",
      @"type": @"0"
      },
    @"1": @{
      @"value": 1px,
      @"name": @"OutlineWidth1",
      @"category": @"outlineWidth",
      @"type": @"1"
      },
    @"2": @{
      @"value": 2px,
      @"name": @"OutlineWidth2",
      @"category": @"outlineWidth",
      @"type": @"2"
      },
    @"4": @{
      @"value": 4px,
      @"name": @"OutlineWidth4",
      @"category": @"outlineWidth",
      @"type": @"4"
      },
    @"8": @{
      @"value": 8px,
      @"name": @"OutlineWidth8",
      @"category": @"outlineWidth",
      @"type": @"8"
      }
    },
  @"padding": @{
    @"0": @{
      @"value": 0px,
      @"name": @"Padding0",
      @"category": @"padding",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"Padding1",
      @"category": @"padding",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"Padding2",
      @"category": @"padding",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"Padding3",
      @"category": @"padding",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"Padding4",
      @"category": @"padding",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"Padding5",
      @"category": @"padding",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"Padding6",
      @"category": @"padding",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"Padding7",
      @"category": @"padding",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"Padding8",
      @"category": @"padding",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"Padding9",
      @"category": @"padding",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"Padding10",
      @"category": @"padding",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"Padding11",
      @"category": @"padding",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"Padding12",
      @"category": @"padding",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"Padding14",
      @"category": @"padding",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"Padding16",
      @"category": @"padding",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"Padding20",
      @"category": @"padding",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"Padding24",
      @"category": @"padding",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"Padding28",
      @"category": @"padding",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"Padding32",
      @"category": @"padding",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"Padding36",
      @"category": @"padding",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"Padding40",
      @"category": @"padding",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"Padding44",
      @"category": @"padding",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"Padding48",
      @"category": @"padding",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"Padding52",
      @"category": @"padding",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"Padding56",
      @"category": @"padding",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"Padding60",
      @"category": @"padding",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"Padding64",
      @"category": @"padding",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"Padding72",
      @"category": @"padding",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"Padding80",
      @"category": @"padding",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"Padding96",
      @"category": @"padding",
      @"type": @"96"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"PaddingPx",
      @"category": @"padding",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"Padding05",
      @"category": @"padding",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"Padding15",
      @"category": @"padding",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"Padding25",
      @"category": @"padding",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"Padding35",
      @"category": @"padding",
      @"type": @"3.5"
      }
    },
  @"placeholderColor": @{
    @"inherit": @{
      @"value": inherit,
      @"name": @"PlaceholderColorInherit",
      @"category": @"placeholderColor",
      @"type": @"inherit"
      },
    @"current": @{
      @"value": currentColor,
      @"name": @"PlaceholderColorCurrent",
      @"category": @"placeholderColor",
      @"type": @"current"
      },
    @"transparent": @{
      @"value": transparent,
      @"name": @"PlaceholderColorTransparent",
      @"category": @"placeholderColor",
      @"type": @"transparent"
      },
    @"black": @{
      @"value": #000,
      @"name": @"PlaceholderColorBlack",
      @"category": @"placeholderColor",
      @"type": @"black"
      },
    @"white": @{
      @"value": #fff,
      @"name": @"PlaceholderColorWhite",
      @"category": @"placeholderColor",
      @"type": @"white"
      },
    @"slate": @{
      @"50": @{
        @"value": #f8fafc,
        @"name": @"PlaceholderColorSlate50",
        @"category": @"placeholderColor",
        @"type": @"slate",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f1f5f9,
        @"name": @"PlaceholderColorSlate100",
        @"category": @"placeholderColor",
        @"type": @"slate",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e2e8f0,
        @"name": @"PlaceholderColorSlate200",
        @"category": @"placeholderColor",
        @"type": @"slate",
        @"item": @"200"
        },
      @"300": @{
        @"value": #cbd5e1,
        @"name": @"PlaceholderColorSlate300",
        @"category": @"placeholderColor",
        @"type": @"slate",
        @"item": @"300"
        },
      @"400": @{
        @"value": #94a3b8,
        @"name": @"PlaceholderColorSlate400",
        @"category": @"placeholderColor",
        @"type": @"slate",
        @"item": @"400"
        },
      @"500": @{
        @"value": #64748b,
        @"name": @"PlaceholderColorSlate500",
        @"category": @"placeholderColor",
        @"type": @"slate",
        @"item": @"500"
        },
      @"600": @{
        @"value": #475569,
        @"name": @"PlaceholderColorSlate600",
        @"category": @"placeholderColor",
        @"type": @"slate",
        @"item": @"600"
        },
      @"700": @{
        @"value": #334155,
        @"name": @"PlaceholderColorSlate700",
        @"category": @"placeholderColor",
        @"type": @"slate",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e293b,
        @"name": @"PlaceholderColorSlate800",
        @"category": @"placeholderColor",
        @"type": @"slate",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0f172a,
        @"name": @"PlaceholderColorSlate900",
        @"category": @"placeholderColor",
        @"type": @"slate",
        @"item": @"900"
        },
      @"950": @{
        @"value": #020617,
        @"name": @"PlaceholderColorSlate950",
        @"category": @"placeholderColor",
        @"type": @"slate",
        @"item": @"950"
        }
      },
    @"gray": @{
      @"50": @{
        @"value": #f9fafb,
        @"name": @"PlaceholderColorGray50",
        @"category": @"placeholderColor",
        @"type": @"gray",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3f4f6,
        @"name": @"PlaceholderColorGray100",
        @"category": @"placeholderColor",
        @"type": @"gray",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e7eb,
        @"name": @"PlaceholderColorGray200",
        @"category": @"placeholderColor",
        @"type": @"gray",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d1d5db,
        @"name": @"PlaceholderColorGray300",
        @"category": @"placeholderColor",
        @"type": @"gray",
        @"item": @"300"
        },
      @"400": @{
        @"value": #9ca3af,
        @"name": @"PlaceholderColorGray400",
        @"category": @"placeholderColor",
        @"type": @"gray",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6b7280,
        @"name": @"PlaceholderColorGray500",
        @"category": @"placeholderColor",
        @"type": @"gray",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4b5563,
        @"name": @"PlaceholderColorGray600",
        @"category": @"placeholderColor",
        @"type": @"gray",
        @"item": @"600"
        },
      @"700": @{
        @"value": #374151,
        @"name": @"PlaceholderColorGray700",
        @"category": @"placeholderColor",
        @"type": @"gray",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1f2937,
        @"name": @"PlaceholderColorGray800",
        @"category": @"placeholderColor",
        @"type": @"gray",
        @"item": @"800"
        },
      @"900": @{
        @"value": #111827,
        @"name": @"PlaceholderColorGray900",
        @"category": @"placeholderColor",
        @"type": @"gray",
        @"item": @"900"
        },
      @"950": @{
        @"value": #030712,
        @"name": @"PlaceholderColorGray950",
        @"category": @"placeholderColor",
        @"type": @"gray",
        @"item": @"950"
        }
      },
    @"zinc": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"PlaceholderColorZinc50",
        @"category": @"placeholderColor",
        @"type": @"zinc",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f4f4f5,
        @"name": @"PlaceholderColorZinc100",
        @"category": @"placeholderColor",
        @"type": @"zinc",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e4e4e7,
        @"name": @"PlaceholderColorZinc200",
        @"category": @"placeholderColor",
        @"type": @"zinc",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d8,
        @"name": @"PlaceholderColorZinc300",
        @"category": @"placeholderColor",
        @"type": @"zinc",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a1a1aa,
        @"name": @"PlaceholderColorZinc400",
        @"category": @"placeholderColor",
        @"type": @"zinc",
        @"item": @"400"
        },
      @"500": @{
        @"value": #71717a,
        @"name": @"PlaceholderColorZinc500",
        @"category": @"placeholderColor",
        @"type": @"zinc",
        @"item": @"500"
        },
      @"600": @{
        @"value": #52525b,
        @"name": @"PlaceholderColorZinc600",
        @"category": @"placeholderColor",
        @"type": @"zinc",
        @"item": @"600"
        },
      @"700": @{
        @"value": #3f3f46,
        @"name": @"PlaceholderColorZinc700",
        @"category": @"placeholderColor",
        @"type": @"zinc",
        @"item": @"700"
        },
      @"800": @{
        @"value": #27272a,
        @"name": @"PlaceholderColorZinc800",
        @"category": @"placeholderColor",
        @"type": @"zinc",
        @"item": @"800"
        },
      @"900": @{
        @"value": #18181b,
        @"name": @"PlaceholderColorZinc900",
        @"category": @"placeholderColor",
        @"type": @"zinc",
        @"item": @"900"
        },
      @"950": @{
        @"value": #09090b,
        @"name": @"PlaceholderColorZinc950",
        @"category": @"placeholderColor",
        @"type": @"zinc",
        @"item": @"950"
        }
      },
    @"neutral": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"PlaceholderColorNeutral50",
        @"category": @"placeholderColor",
        @"type": @"neutral",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f5,
        @"name": @"PlaceholderColorNeutral100",
        @"category": @"placeholderColor",
        @"type": @"neutral",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e5e5,
        @"name": @"PlaceholderColorNeutral200",
        @"category": @"placeholderColor",
        @"type": @"neutral",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d4,
        @"name": @"PlaceholderColorNeutral300",
        @"category": @"placeholderColor",
        @"type": @"neutral",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3a3a3,
        @"name": @"PlaceholderColorNeutral400",
        @"category": @"placeholderColor",
        @"type": @"neutral",
        @"item": @"400"
        },
      @"500": @{
        @"value": #737373,
        @"name": @"PlaceholderColorNeutral500",
        @"category": @"placeholderColor",
        @"type": @"neutral",
        @"item": @"500"
        },
      @"600": @{
        @"value": #525252,
        @"name": @"PlaceholderColorNeutral600",
        @"category": @"placeholderColor",
        @"type": @"neutral",
        @"item": @"600"
        },
      @"700": @{
        @"value": #404040,
        @"name": @"PlaceholderColorNeutral700",
        @"category": @"placeholderColor",
        @"type": @"neutral",
        @"item": @"700"
        },
      @"800": @{
        @"value": #262626,
        @"name": @"PlaceholderColorNeutral800",
        @"category": @"placeholderColor",
        @"type": @"neutral",
        @"item": @"800"
        },
      @"900": @{
        @"value": #171717,
        @"name": @"PlaceholderColorNeutral900",
        @"category": @"placeholderColor",
        @"type": @"neutral",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0a0a0a,
        @"name": @"PlaceholderColorNeutral950",
        @"category": @"placeholderColor",
        @"type": @"neutral",
        @"item": @"950"
        }
      },
    @"stone": @{
      @"50": @{
        @"value": #fafaf9,
        @"name": @"PlaceholderColorStone50",
        @"category": @"placeholderColor",
        @"type": @"stone",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f4,
        @"name": @"PlaceholderColorStone100",
        @"category": @"placeholderColor",
        @"type": @"stone",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e7e5e4,
        @"name": @"PlaceholderColorStone200",
        @"category": @"placeholderColor",
        @"type": @"stone",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d6d3d1,
        @"name": @"PlaceholderColorStone300",
        @"category": @"placeholderColor",
        @"type": @"stone",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a8a29e,
        @"name": @"PlaceholderColorStone400",
        @"category": @"placeholderColor",
        @"type": @"stone",
        @"item": @"400"
        },
      @"500": @{
        @"value": #78716c,
        @"name": @"PlaceholderColorStone500",
        @"category": @"placeholderColor",
        @"type": @"stone",
        @"item": @"500"
        },
      @"600": @{
        @"value": #57534e,
        @"name": @"PlaceholderColorStone600",
        @"category": @"placeholderColor",
        @"type": @"stone",
        @"item": @"600"
        },
      @"700": @{
        @"value": #44403c,
        @"name": @"PlaceholderColorStone700",
        @"category": @"placeholderColor",
        @"type": @"stone",
        @"item": @"700"
        },
      @"800": @{
        @"value": #292524,
        @"name": @"PlaceholderColorStone800",
        @"category": @"placeholderColor",
        @"type": @"stone",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1c1917,
        @"name": @"PlaceholderColorStone900",
        @"category": @"placeholderColor",
        @"type": @"stone",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0c0a09,
        @"name": @"PlaceholderColorStone950",
        @"category": @"placeholderColor",
        @"type": @"stone",
        @"item": @"950"
        }
      },
    @"red": @{
      @"50": @{
        @"value": #fef2f2,
        @"name": @"PlaceholderColorRed50",
        @"category": @"placeholderColor",
        @"type": @"red",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fee2e2,
        @"name": @"PlaceholderColorRed100",
        @"category": @"placeholderColor",
        @"type": @"red",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecaca,
        @"name": @"PlaceholderColorRed200",
        @"category": @"placeholderColor",
        @"type": @"red",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fca5a5,
        @"name": @"PlaceholderColorRed300",
        @"category": @"placeholderColor",
        @"type": @"red",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f87171,
        @"name": @"PlaceholderColorRed400",
        @"category": @"placeholderColor",
        @"type": @"red",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ef4444,
        @"name": @"PlaceholderColorRed500",
        @"category": @"placeholderColor",
        @"type": @"red",
        @"item": @"500"
        },
      @"600": @{
        @"value": #dc2626,
        @"name": @"PlaceholderColorRed600",
        @"category": @"placeholderColor",
        @"type": @"red",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b91c1c,
        @"name": @"PlaceholderColorRed700",
        @"category": @"placeholderColor",
        @"type": @"red",
        @"item": @"700"
        },
      @"800": @{
        @"value": #991b1b,
        @"name": @"PlaceholderColorRed800",
        @"category": @"placeholderColor",
        @"type": @"red",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7f1d1d,
        @"name": @"PlaceholderColorRed900",
        @"category": @"placeholderColor",
        @"type": @"red",
        @"item": @"900"
        },
      @"950": @{
        @"value": #450a0a,
        @"name": @"PlaceholderColorRed950",
        @"category": @"placeholderColor",
        @"type": @"red",
        @"item": @"950"
        }
      },
    @"orange": @{
      @"50": @{
        @"value": #fff7ed,
        @"name": @"PlaceholderColorOrange50",
        @"category": @"placeholderColor",
        @"type": @"orange",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffedd5,
        @"name": @"PlaceholderColorOrange100",
        @"category": @"placeholderColor",
        @"type": @"orange",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fed7aa,
        @"name": @"PlaceholderColorOrange200",
        @"category": @"placeholderColor",
        @"type": @"orange",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fdba74,
        @"name": @"PlaceholderColorOrange300",
        @"category": @"placeholderColor",
        @"type": @"orange",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb923c,
        @"name": @"PlaceholderColorOrange400",
        @"category": @"placeholderColor",
        @"type": @"orange",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f97316,
        @"name": @"PlaceholderColorOrange500",
        @"category": @"placeholderColor",
        @"type": @"orange",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ea580c,
        @"name": @"PlaceholderColorOrange600",
        @"category": @"placeholderColor",
        @"type": @"orange",
        @"item": @"600"
        },
      @"700": @{
        @"value": #c2410c,
        @"name": @"PlaceholderColorOrange700",
        @"category": @"placeholderColor",
        @"type": @"orange",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9a3412,
        @"name": @"PlaceholderColorOrange800",
        @"category": @"placeholderColor",
        @"type": @"orange",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7c2d12,
        @"name": @"PlaceholderColorOrange900",
        @"category": @"placeholderColor",
        @"type": @"orange",
        @"item": @"900"
        },
      @"950": @{
        @"value": #431407,
        @"name": @"PlaceholderColorOrange950",
        @"category": @"placeholderColor",
        @"type": @"orange",
        @"item": @"950"
        }
      },
    @"amber": @{
      @"50": @{
        @"value": #fffbeb,
        @"name": @"PlaceholderColorAmber50",
        @"category": @"placeholderColor",
        @"type": @"amber",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef3c7,
        @"name": @"PlaceholderColorAmber100",
        @"category": @"placeholderColor",
        @"type": @"amber",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fde68a,
        @"name": @"PlaceholderColorAmber200",
        @"category": @"placeholderColor",
        @"type": @"amber",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fcd34d,
        @"name": @"PlaceholderColorAmber300",
        @"category": @"placeholderColor",
        @"type": @"amber",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fbbf24,
        @"name": @"PlaceholderColorAmber400",
        @"category": @"placeholderColor",
        @"type": @"amber",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f59e0b,
        @"name": @"PlaceholderColorAmber500",
        @"category": @"placeholderColor",
        @"type": @"amber",
        @"item": @"500"
        },
      @"600": @{
        @"value": #d97706,
        @"name": @"PlaceholderColorAmber600",
        @"category": @"placeholderColor",
        @"type": @"amber",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b45309,
        @"name": @"PlaceholderColorAmber700",
        @"category": @"placeholderColor",
        @"type": @"amber",
        @"item": @"700"
        },
      @"800": @{
        @"value": #92400e,
        @"name": @"PlaceholderColorAmber800",
        @"category": @"placeholderColor",
        @"type": @"amber",
        @"item": @"800"
        },
      @"900": @{
        @"value": #78350f,
        @"name": @"PlaceholderColorAmber900",
        @"category": @"placeholderColor",
        @"type": @"amber",
        @"item": @"900"
        },
      @"950": @{
        @"value": #451a03,
        @"name": @"PlaceholderColorAmber950",
        @"category": @"placeholderColor",
        @"type": @"amber",
        @"item": @"950"
        }
      },
    @"yellow": @{
      @"50": @{
        @"value": #fefce8,
        @"name": @"PlaceholderColorYellow50",
        @"category": @"placeholderColor",
        @"type": @"yellow",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef9c3,
        @"name": @"PlaceholderColorYellow100",
        @"category": @"placeholderColor",
        @"type": @"yellow",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fef08a,
        @"name": @"PlaceholderColorYellow200",
        @"category": @"placeholderColor",
        @"type": @"yellow",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fde047,
        @"name": @"PlaceholderColorYellow300",
        @"category": @"placeholderColor",
        @"type": @"yellow",
        @"item": @"300"
        },
      @"400": @{
        @"value": #facc15,
        @"name": @"PlaceholderColorYellow400",
        @"category": @"placeholderColor",
        @"type": @"yellow",
        @"item": @"400"
        },
      @"500": @{
        @"value": #eab308,
        @"name": @"PlaceholderColorYellow500",
        @"category": @"placeholderColor",
        @"type": @"yellow",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ca8a04,
        @"name": @"PlaceholderColorYellow600",
        @"category": @"placeholderColor",
        @"type": @"yellow",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a16207,
        @"name": @"PlaceholderColorYellow700",
        @"category": @"placeholderColor",
        @"type": @"yellow",
        @"item": @"700"
        },
      @"800": @{
        @"value": #854d0e,
        @"name": @"PlaceholderColorYellow800",
        @"category": @"placeholderColor",
        @"type": @"yellow",
        @"item": @"800"
        },
      @"900": @{
        @"value": #713f12,
        @"name": @"PlaceholderColorYellow900",
        @"category": @"placeholderColor",
        @"type": @"yellow",
        @"item": @"900"
        },
      @"950": @{
        @"value": #422006,
        @"name": @"PlaceholderColorYellow950",
        @"category": @"placeholderColor",
        @"type": @"yellow",
        @"item": @"950"
        }
      },
    @"lime": @{
      @"50": @{
        @"value": #f7fee7,
        @"name": @"PlaceholderColorLime50",
        @"category": @"placeholderColor",
        @"type": @"lime",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ecfccb,
        @"name": @"PlaceholderColorLime100",
        @"category": @"placeholderColor",
        @"type": @"lime",
        @"item": @"100"
        },
      @"200": @{
        @"value": #d9f99d,
        @"name": @"PlaceholderColorLime200",
        @"category": @"placeholderColor",
        @"type": @"lime",
        @"item": @"200"
        },
      @"300": @{
        @"value": #bef264,
        @"name": @"PlaceholderColorLime300",
        @"category": @"placeholderColor",
        @"type": @"lime",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3e635,
        @"name": @"PlaceholderColorLime400",
        @"category": @"placeholderColor",
        @"type": @"lime",
        @"item": @"400"
        },
      @"500": @{
        @"value": #84cc16,
        @"name": @"PlaceholderColorLime500",
        @"category": @"placeholderColor",
        @"type": @"lime",
        @"item": @"500"
        },
      @"600": @{
        @"value": #65a30d,
        @"name": @"PlaceholderColorLime600",
        @"category": @"placeholderColor",
        @"type": @"lime",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4d7c0f,
        @"name": @"PlaceholderColorLime700",
        @"category": @"placeholderColor",
        @"type": @"lime",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3f6212,
        @"name": @"PlaceholderColorLime800",
        @"category": @"placeholderColor",
        @"type": @"lime",
        @"item": @"800"
        },
      @"900": @{
        @"value": #365314,
        @"name": @"PlaceholderColorLime900",
        @"category": @"placeholderColor",
        @"type": @"lime",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1a2e05,
        @"name": @"PlaceholderColorLime950",
        @"category": @"placeholderColor",
        @"type": @"lime",
        @"item": @"950"
        }
      },
    @"green": @{
      @"50": @{
        @"value": #f0fdf4,
        @"name": @"PlaceholderColorGreen50",
        @"category": @"placeholderColor",
        @"type": @"green",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dcfce7,
        @"name": @"PlaceholderColorGreen100",
        @"category": @"placeholderColor",
        @"type": @"green",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bbf7d0,
        @"name": @"PlaceholderColorGreen200",
        @"category": @"placeholderColor",
        @"type": @"green",
        @"item": @"200"
        },
      @"300": @{
        @"value": #86efac,
        @"name": @"PlaceholderColorGreen300",
        @"category": @"placeholderColor",
        @"type": @"green",
        @"item": @"300"
        },
      @"400": @{
        @"value": #4ade80,
        @"name": @"PlaceholderColorGreen400",
        @"category": @"placeholderColor",
        @"type": @"green",
        @"item": @"400"
        },
      @"500": @{
        @"value": #22c55e,
        @"name": @"PlaceholderColorGreen500",
        @"category": @"placeholderColor",
        @"type": @"green",
        @"item": @"500"
        },
      @"600": @{
        @"value": #16a34a,
        @"name": @"PlaceholderColorGreen600",
        @"category": @"placeholderColor",
        @"type": @"green",
        @"item": @"600"
        },
      @"700": @{
        @"value": #15803d,
        @"name": @"PlaceholderColorGreen700",
        @"category": @"placeholderColor",
        @"type": @"green",
        @"item": @"700"
        },
      @"800": @{
        @"value": #166534,
        @"name": @"PlaceholderColorGreen800",
        @"category": @"placeholderColor",
        @"type": @"green",
        @"item": @"800"
        },
      @"900": @{
        @"value": #14532d,
        @"name": @"PlaceholderColorGreen900",
        @"category": @"placeholderColor",
        @"type": @"green",
        @"item": @"900"
        },
      @"950": @{
        @"value": #052e16,
        @"name": @"PlaceholderColorGreen950",
        @"category": @"placeholderColor",
        @"type": @"green",
        @"item": @"950"
        }
      },
    @"emerald": @{
      @"50": @{
        @"value": #ecfdf5,
        @"name": @"PlaceholderColorEmerald50",
        @"category": @"placeholderColor",
        @"type": @"emerald",
        @"item": @"50"
        },
      @"100": @{
        @"value": #d1fae5,
        @"name": @"PlaceholderColorEmerald100",
        @"category": @"placeholderColor",
        @"type": @"emerald",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a7f3d0,
        @"name": @"PlaceholderColorEmerald200",
        @"category": @"placeholderColor",
        @"type": @"emerald",
        @"item": @"200"
        },
      @"300": @{
        @"value": #6ee7b7,
        @"name": @"PlaceholderColorEmerald300",
        @"category": @"placeholderColor",
        @"type": @"emerald",
        @"item": @"300"
        },
      @"400": @{
        @"value": #34d399,
        @"name": @"PlaceholderColorEmerald400",
        @"category": @"placeholderColor",
        @"type": @"emerald",
        @"item": @"400"
        },
      @"500": @{
        @"value": #10b981,
        @"name": @"PlaceholderColorEmerald500",
        @"category": @"placeholderColor",
        @"type": @"emerald",
        @"item": @"500"
        },
      @"600": @{
        @"value": #059669,
        @"name": @"PlaceholderColorEmerald600",
        @"category": @"placeholderColor",
        @"type": @"emerald",
        @"item": @"600"
        },
      @"700": @{
        @"value": #047857,
        @"name": @"PlaceholderColorEmerald700",
        @"category": @"placeholderColor",
        @"type": @"emerald",
        @"item": @"700"
        },
      @"800": @{
        @"value": #065f46,
        @"name": @"PlaceholderColorEmerald800",
        @"category": @"placeholderColor",
        @"type": @"emerald",
        @"item": @"800"
        },
      @"900": @{
        @"value": #064e3b,
        @"name": @"PlaceholderColorEmerald900",
        @"category": @"placeholderColor",
        @"type": @"emerald",
        @"item": @"900"
        },
      @"950": @{
        @"value": #022c22,
        @"name": @"PlaceholderColorEmerald950",
        @"category": @"placeholderColor",
        @"type": @"emerald",
        @"item": @"950"
        }
      },
    @"teal": @{
      @"50": @{
        @"value": #f0fdfa,
        @"name": @"PlaceholderColorTeal50",
        @"category": @"placeholderColor",
        @"type": @"teal",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ccfbf1,
        @"name": @"PlaceholderColorTeal100",
        @"category": @"placeholderColor",
        @"type": @"teal",
        @"item": @"100"
        },
      @"200": @{
        @"value": #99f6e4,
        @"name": @"PlaceholderColorTeal200",
        @"category": @"placeholderColor",
        @"type": @"teal",
        @"item": @"200"
        },
      @"300": @{
        @"value": #5eead4,
        @"name": @"PlaceholderColorTeal300",
        @"category": @"placeholderColor",
        @"type": @"teal",
        @"item": @"300"
        },
      @"400": @{
        @"value": #2dd4bf,
        @"name": @"PlaceholderColorTeal400",
        @"category": @"placeholderColor",
        @"type": @"teal",
        @"item": @"400"
        },
      @"500": @{
        @"value": #14b8a6,
        @"name": @"PlaceholderColorTeal500",
        @"category": @"placeholderColor",
        @"type": @"teal",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0d9488,
        @"name": @"PlaceholderColorTeal600",
        @"category": @"placeholderColor",
        @"type": @"teal",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0f766e,
        @"name": @"PlaceholderColorTeal700",
        @"category": @"placeholderColor",
        @"type": @"teal",
        @"item": @"700"
        },
      @"800": @{
        @"value": #115e59,
        @"name": @"PlaceholderColorTeal800",
        @"category": @"placeholderColor",
        @"type": @"teal",
        @"item": @"800"
        },
      @"900": @{
        @"value": #134e4a,
        @"name": @"PlaceholderColorTeal900",
        @"category": @"placeholderColor",
        @"type": @"teal",
        @"item": @"900"
        },
      @"950": @{
        @"value": #042f2e,
        @"name": @"PlaceholderColorTeal950",
        @"category": @"placeholderColor",
        @"type": @"teal",
        @"item": @"950"
        }
      },
    @"cyan": @{
      @"50": @{
        @"value": #ecfeff,
        @"name": @"PlaceholderColorCyan50",
        @"category": @"placeholderColor",
        @"type": @"cyan",
        @"item": @"50"
        },
      @"100": @{
        @"value": #cffafe,
        @"name": @"PlaceholderColorCyan100",
        @"category": @"placeholderColor",
        @"type": @"cyan",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a5f3fc,
        @"name": @"PlaceholderColorCyan200",
        @"category": @"placeholderColor",
        @"type": @"cyan",
        @"item": @"200"
        },
      @"300": @{
        @"value": #67e8f9,
        @"name": @"PlaceholderColorCyan300",
        @"category": @"placeholderColor",
        @"type": @"cyan",
        @"item": @"300"
        },
      @"400": @{
        @"value": #22d3ee,
        @"name": @"PlaceholderColorCyan400",
        @"category": @"placeholderColor",
        @"type": @"cyan",
        @"item": @"400"
        },
      @"500": @{
        @"value": #06b6d4,
        @"name": @"PlaceholderColorCyan500",
        @"category": @"placeholderColor",
        @"type": @"cyan",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0891b2,
        @"name": @"PlaceholderColorCyan600",
        @"category": @"placeholderColor",
        @"type": @"cyan",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0e7490,
        @"name": @"PlaceholderColorCyan700",
        @"category": @"placeholderColor",
        @"type": @"cyan",
        @"item": @"700"
        },
      @"800": @{
        @"value": #155e75,
        @"name": @"PlaceholderColorCyan800",
        @"category": @"placeholderColor",
        @"type": @"cyan",
        @"item": @"800"
        },
      @"900": @{
        @"value": #164e63,
        @"name": @"PlaceholderColorCyan900",
        @"category": @"placeholderColor",
        @"type": @"cyan",
        @"item": @"900"
        },
      @"950": @{
        @"value": #083344,
        @"name": @"PlaceholderColorCyan950",
        @"category": @"placeholderColor",
        @"type": @"cyan",
        @"item": @"950"
        }
      },
    @"sky": @{
      @"50": @{
        @"value": #f0f9ff,
        @"name": @"PlaceholderColorSky50",
        @"category": @"placeholderColor",
        @"type": @"sky",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0f2fe,
        @"name": @"PlaceholderColorSky100",
        @"category": @"placeholderColor",
        @"type": @"sky",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bae6fd,
        @"name": @"PlaceholderColorSky200",
        @"category": @"placeholderColor",
        @"type": @"sky",
        @"item": @"200"
        },
      @"300": @{
        @"value": #7dd3fc,
        @"name": @"PlaceholderColorSky300",
        @"category": @"placeholderColor",
        @"type": @"sky",
        @"item": @"300"
        },
      @"400": @{
        @"value": #38bdf8,
        @"name": @"PlaceholderColorSky400",
        @"category": @"placeholderColor",
        @"type": @"sky",
        @"item": @"400"
        },
      @"500": @{
        @"value": #0ea5e9,
        @"name": @"PlaceholderColorSky500",
        @"category": @"placeholderColor",
        @"type": @"sky",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0284c7,
        @"name": @"PlaceholderColorSky600",
        @"category": @"placeholderColor",
        @"type": @"sky",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0369a1,
        @"name": @"PlaceholderColorSky700",
        @"category": @"placeholderColor",
        @"type": @"sky",
        @"item": @"700"
        },
      @"800": @{
        @"value": #075985,
        @"name": @"PlaceholderColorSky800",
        @"category": @"placeholderColor",
        @"type": @"sky",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0c4a6e,
        @"name": @"PlaceholderColorSky900",
        @"category": @"placeholderColor",
        @"type": @"sky",
        @"item": @"900"
        },
      @"950": @{
        @"value": #082f49,
        @"name": @"PlaceholderColorSky950",
        @"category": @"placeholderColor",
        @"type": @"sky",
        @"item": @"950"
        }
      },
    @"blue": @{
      @"50": @{
        @"value": #eff6ff,
        @"name": @"PlaceholderColorBlue50",
        @"category": @"placeholderColor",
        @"type": @"blue",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dbeafe,
        @"name": @"PlaceholderColorBlue100",
        @"category": @"placeholderColor",
        @"type": @"blue",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bfdbfe,
        @"name": @"PlaceholderColorBlue200",
        @"category": @"placeholderColor",
        @"type": @"blue",
        @"item": @"200"
        },
      @"300": @{
        @"value": #93c5fd,
        @"name": @"PlaceholderColorBlue300",
        @"category": @"placeholderColor",
        @"type": @"blue",
        @"item": @"300"
        },
      @"400": @{
        @"value": #60a5fa,
        @"name": @"PlaceholderColorBlue400",
        @"category": @"placeholderColor",
        @"type": @"blue",
        @"item": @"400"
        },
      @"500": @{
        @"value": #3b82f6,
        @"name": @"PlaceholderColorBlue500",
        @"category": @"placeholderColor",
        @"type": @"blue",
        @"item": @"500"
        },
      @"600": @{
        @"value": #2563eb,
        @"name": @"PlaceholderColorBlue600",
        @"category": @"placeholderColor",
        @"type": @"blue",
        @"item": @"600"
        },
      @"700": @{
        @"value": #1d4ed8,
        @"name": @"PlaceholderColorBlue700",
        @"category": @"placeholderColor",
        @"type": @"blue",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e40af,
        @"name": @"PlaceholderColorBlue800",
        @"category": @"placeholderColor",
        @"type": @"blue",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1e3a8a,
        @"name": @"PlaceholderColorBlue900",
        @"category": @"placeholderColor",
        @"type": @"blue",
        @"item": @"900"
        },
      @"950": @{
        @"value": #172554,
        @"name": @"PlaceholderColorBlue950",
        @"category": @"placeholderColor",
        @"type": @"blue",
        @"item": @"950"
        }
      },
    @"indigo": @{
      @"50": @{
        @"value": #eef2ff,
        @"name": @"PlaceholderColorIndigo50",
        @"category": @"placeholderColor",
        @"type": @"indigo",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0e7ff,
        @"name": @"PlaceholderColorIndigo100",
        @"category": @"placeholderColor",
        @"type": @"indigo",
        @"item": @"100"
        },
      @"200": @{
        @"value": #c7d2fe,
        @"name": @"PlaceholderColorIndigo200",
        @"category": @"placeholderColor",
        @"type": @"indigo",
        @"item": @"200"
        },
      @"300": @{
        @"value": #a5b4fc,
        @"name": @"PlaceholderColorIndigo300",
        @"category": @"placeholderColor",
        @"type": @"indigo",
        @"item": @"300"
        },
      @"400": @{
        @"value": #818cf8,
        @"name": @"PlaceholderColorIndigo400",
        @"category": @"placeholderColor",
        @"type": @"indigo",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6366f1,
        @"name": @"PlaceholderColorIndigo500",
        @"category": @"placeholderColor",
        @"type": @"indigo",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4f46e5,
        @"name": @"PlaceholderColorIndigo600",
        @"category": @"placeholderColor",
        @"type": @"indigo",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4338ca,
        @"name": @"PlaceholderColorIndigo700",
        @"category": @"placeholderColor",
        @"type": @"indigo",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3730a3,
        @"name": @"PlaceholderColorIndigo800",
        @"category": @"placeholderColor",
        @"type": @"indigo",
        @"item": @"800"
        },
      @"900": @{
        @"value": #312e81,
        @"name": @"PlaceholderColorIndigo900",
        @"category": @"placeholderColor",
        @"type": @"indigo",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1e1b4b,
        @"name": @"PlaceholderColorIndigo950",
        @"category": @"placeholderColor",
        @"type": @"indigo",
        @"item": @"950"
        }
      },
    @"violet": @{
      @"50": @{
        @"value": #f5f3ff,
        @"name": @"PlaceholderColorViolet50",
        @"category": @"placeholderColor",
        @"type": @"violet",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ede9fe,
        @"name": @"PlaceholderColorViolet100",
        @"category": @"placeholderColor",
        @"type": @"violet",
        @"item": @"100"
        },
      @"200": @{
        @"value": #ddd6fe,
        @"name": @"PlaceholderColorViolet200",
        @"category": @"placeholderColor",
        @"type": @"violet",
        @"item": @"200"
        },
      @"300": @{
        @"value": #c4b5fd,
        @"name": @"PlaceholderColorViolet300",
        @"category": @"placeholderColor",
        @"type": @"violet",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a78bfa,
        @"name": @"PlaceholderColorViolet400",
        @"category": @"placeholderColor",
        @"type": @"violet",
        @"item": @"400"
        },
      @"500": @{
        @"value": #8b5cf6,
        @"name": @"PlaceholderColorViolet500",
        @"category": @"placeholderColor",
        @"type": @"violet",
        @"item": @"500"
        },
      @"600": @{
        @"value": #7c3aed,
        @"name": @"PlaceholderColorViolet600",
        @"category": @"placeholderColor",
        @"type": @"violet",
        @"item": @"600"
        },
      @"700": @{
        @"value": #6d28d9,
        @"name": @"PlaceholderColorViolet700",
        @"category": @"placeholderColor",
        @"type": @"violet",
        @"item": @"700"
        },
      @"800": @{
        @"value": #5b21b6,
        @"name": @"PlaceholderColorViolet800",
        @"category": @"placeholderColor",
        @"type": @"violet",
        @"item": @"800"
        },
      @"900": @{
        @"value": #4c1d95,
        @"name": @"PlaceholderColorViolet900",
        @"category": @"placeholderColor",
        @"type": @"violet",
        @"item": @"900"
        },
      @"950": @{
        @"value": #2e1065,
        @"name": @"PlaceholderColorViolet950",
        @"category": @"placeholderColor",
        @"type": @"violet",
        @"item": @"950"
        }
      },
    @"purple": @{
      @"50": @{
        @"value": #faf5ff,
        @"name": @"PlaceholderColorPurple50",
        @"category": @"placeholderColor",
        @"type": @"purple",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3e8ff,
        @"name": @"PlaceholderColorPurple100",
        @"category": @"placeholderColor",
        @"type": @"purple",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e9d5ff,
        @"name": @"PlaceholderColorPurple200",
        @"category": @"placeholderColor",
        @"type": @"purple",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d8b4fe,
        @"name": @"PlaceholderColorPurple300",
        @"category": @"placeholderColor",
        @"type": @"purple",
        @"item": @"300"
        },
      @"400": @{
        @"value": #c084fc,
        @"name": @"PlaceholderColorPurple400",
        @"category": @"placeholderColor",
        @"type": @"purple",
        @"item": @"400"
        },
      @"500": @{
        @"value": #a855f7,
        @"name": @"PlaceholderColorPurple500",
        @"category": @"placeholderColor",
        @"type": @"purple",
        @"item": @"500"
        },
      @"600": @{
        @"value": #9333ea,
        @"name": @"PlaceholderColorPurple600",
        @"category": @"placeholderColor",
        @"type": @"purple",
        @"item": @"600"
        },
      @"700": @{
        @"value": #7e22ce,
        @"name": @"PlaceholderColorPurple700",
        @"category": @"placeholderColor",
        @"type": @"purple",
        @"item": @"700"
        },
      @"800": @{
        @"value": #6b21a8,
        @"name": @"PlaceholderColorPurple800",
        @"category": @"placeholderColor",
        @"type": @"purple",
        @"item": @"800"
        },
      @"900": @{
        @"value": #581c87,
        @"name": @"PlaceholderColorPurple900",
        @"category": @"placeholderColor",
        @"type": @"purple",
        @"item": @"900"
        },
      @"950": @{
        @"value": #3b0764,
        @"name": @"PlaceholderColorPurple950",
        @"category": @"placeholderColor",
        @"type": @"purple",
        @"item": @"950"
        }
      },
    @"fuchsia": @{
      @"50": @{
        @"value": #fdf4ff,
        @"name": @"PlaceholderColorFuchsia50",
        @"category": @"placeholderColor",
        @"type": @"fuchsia",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fae8ff,
        @"name": @"PlaceholderColorFuchsia100",
        @"category": @"placeholderColor",
        @"type": @"fuchsia",
        @"item": @"100"
        },
      @"200": @{
        @"value": #f5d0fe,
        @"name": @"PlaceholderColorFuchsia200",
        @"category": @"placeholderColor",
        @"type": @"fuchsia",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f0abfc,
        @"name": @"PlaceholderColorFuchsia300",
        @"category": @"placeholderColor",
        @"type": @"fuchsia",
        @"item": @"300"
        },
      @"400": @{
        @"value": #e879f9,
        @"name": @"PlaceholderColorFuchsia400",
        @"category": @"placeholderColor",
        @"type": @"fuchsia",
        @"item": @"400"
        },
      @"500": @{
        @"value": #d946ef,
        @"name": @"PlaceholderColorFuchsia500",
        @"category": @"placeholderColor",
        @"type": @"fuchsia",
        @"item": @"500"
        },
      @"600": @{
        @"value": #c026d3,
        @"name": @"PlaceholderColorFuchsia600",
        @"category": @"placeholderColor",
        @"type": @"fuchsia",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a21caf,
        @"name": @"PlaceholderColorFuchsia700",
        @"category": @"placeholderColor",
        @"type": @"fuchsia",
        @"item": @"700"
        },
      @"800": @{
        @"value": #86198f,
        @"name": @"PlaceholderColorFuchsia800",
        @"category": @"placeholderColor",
        @"type": @"fuchsia",
        @"item": @"800"
        },
      @"900": @{
        @"value": #701a75,
        @"name": @"PlaceholderColorFuchsia900",
        @"category": @"placeholderColor",
        @"type": @"fuchsia",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4a044e,
        @"name": @"PlaceholderColorFuchsia950",
        @"category": @"placeholderColor",
        @"type": @"fuchsia",
        @"item": @"950"
        }
      },
    @"pink": @{
      @"50": @{
        @"value": #fdf2f8,
        @"name": @"PlaceholderColorPink50",
        @"category": @"placeholderColor",
        @"type": @"pink",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fce7f3,
        @"name": @"PlaceholderColorPink100",
        @"category": @"placeholderColor",
        @"type": @"pink",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fbcfe8,
        @"name": @"PlaceholderColorPink200",
        @"category": @"placeholderColor",
        @"type": @"pink",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f9a8d4,
        @"name": @"PlaceholderColorPink300",
        @"category": @"placeholderColor",
        @"type": @"pink",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f472b6,
        @"name": @"PlaceholderColorPink400",
        @"category": @"placeholderColor",
        @"type": @"pink",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ec4899,
        @"name": @"PlaceholderColorPink500",
        @"category": @"placeholderColor",
        @"type": @"pink",
        @"item": @"500"
        },
      @"600": @{
        @"value": #db2777,
        @"name": @"PlaceholderColorPink600",
        @"category": @"placeholderColor",
        @"type": @"pink",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be185d,
        @"name": @"PlaceholderColorPink700",
        @"category": @"placeholderColor",
        @"type": @"pink",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9d174d,
        @"name": @"PlaceholderColorPink800",
        @"category": @"placeholderColor",
        @"type": @"pink",
        @"item": @"800"
        },
      @"900": @{
        @"value": #831843,
        @"name": @"PlaceholderColorPink900",
        @"category": @"placeholderColor",
        @"type": @"pink",
        @"item": @"900"
        },
      @"950": @{
        @"value": #500724,
        @"name": @"PlaceholderColorPink950",
        @"category": @"placeholderColor",
        @"type": @"pink",
        @"item": @"950"
        }
      },
    @"rose": @{
      @"50": @{
        @"value": #fff1f2,
        @"name": @"PlaceholderColorRose50",
        @"category": @"placeholderColor",
        @"type": @"rose",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffe4e6,
        @"name": @"PlaceholderColorRose100",
        @"category": @"placeholderColor",
        @"type": @"rose",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecdd3,
        @"name": @"PlaceholderColorRose200",
        @"category": @"placeholderColor",
        @"type": @"rose",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fda4af,
        @"name": @"PlaceholderColorRose300",
        @"category": @"placeholderColor",
        @"type": @"rose",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb7185,
        @"name": @"PlaceholderColorRose400",
        @"category": @"placeholderColor",
        @"type": @"rose",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f43f5e,
        @"name": @"PlaceholderColorRose500",
        @"category": @"placeholderColor",
        @"type": @"rose",
        @"item": @"500"
        },
      @"600": @{
        @"value": #e11d48,
        @"name": @"PlaceholderColorRose600",
        @"category": @"placeholderColor",
        @"type": @"rose",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be123c,
        @"name": @"PlaceholderColorRose700",
        @"category": @"placeholderColor",
        @"type": @"rose",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9f1239,
        @"name": @"PlaceholderColorRose800",
        @"category": @"placeholderColor",
        @"type": @"rose",
        @"item": @"800"
        },
      @"900": @{
        @"value": #881337,
        @"name": @"PlaceholderColorRose900",
        @"category": @"placeholderColor",
        @"type": @"rose",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4c0519,
        @"name": @"PlaceholderColorRose950",
        @"category": @"placeholderColor",
        @"type": @"rose",
        @"item": @"950"
        }
      }
    },
  @"placeholderOpacity": @{
    @"0": @{
      @"value": 0,
      @"name": @"PlaceholderOpacity0",
      @"category": @"placeholderOpacity",
      @"type": @"0"
      },
    @"5": @{
      @"value": 0.05,
      @"name": @"PlaceholderOpacity5",
      @"category": @"placeholderOpacity",
      @"type": @"5"
      },
    @"10": @{
      @"value": 0.1,
      @"name": @"PlaceholderOpacity10",
      @"category": @"placeholderOpacity",
      @"type": @"10"
      },
    @"15": @{
      @"value": 0.15,
      @"name": @"PlaceholderOpacity15",
      @"category": @"placeholderOpacity",
      @"type": @"15"
      },
    @"20": @{
      @"value": 0.2,
      @"name": @"PlaceholderOpacity20",
      @"category": @"placeholderOpacity",
      @"type": @"20"
      },
    @"25": @{
      @"value": 0.25,
      @"name": @"PlaceholderOpacity25",
      @"category": @"placeholderOpacity",
      @"type": @"25"
      },
    @"30": @{
      @"value": 0.3,
      @"name": @"PlaceholderOpacity30",
      @"category": @"placeholderOpacity",
      @"type": @"30"
      },
    @"35": @{
      @"value": 0.35,
      @"name": @"PlaceholderOpacity35",
      @"category": @"placeholderOpacity",
      @"type": @"35"
      },
    @"40": @{
      @"value": 0.4,
      @"name": @"PlaceholderOpacity40",
      @"category": @"placeholderOpacity",
      @"type": @"40"
      },
    @"45": @{
      @"value": 0.45,
      @"name": @"PlaceholderOpacity45",
      @"category": @"placeholderOpacity",
      @"type": @"45"
      },
    @"50": @{
      @"value": 0.5,
      @"name": @"PlaceholderOpacity50",
      @"category": @"placeholderOpacity",
      @"type": @"50"
      },
    @"55": @{
      @"value": 0.55,
      @"name": @"PlaceholderOpacity55",
      @"category": @"placeholderOpacity",
      @"type": @"55"
      },
    @"60": @{
      @"value": 0.6,
      @"name": @"PlaceholderOpacity60",
      @"category": @"placeholderOpacity",
      @"type": @"60"
      },
    @"65": @{
      @"value": 0.65,
      @"name": @"PlaceholderOpacity65",
      @"category": @"placeholderOpacity",
      @"type": @"65"
      },
    @"70": @{
      @"value": 0.7,
      @"name": @"PlaceholderOpacity70",
      @"category": @"placeholderOpacity",
      @"type": @"70"
      },
    @"75": @{
      @"value": 0.75,
      @"name": @"PlaceholderOpacity75",
      @"category": @"placeholderOpacity",
      @"type": @"75"
      },
    @"80": @{
      @"value": 0.8,
      @"name": @"PlaceholderOpacity80",
      @"category": @"placeholderOpacity",
      @"type": @"80"
      },
    @"85": @{
      @"value": 0.85,
      @"name": @"PlaceholderOpacity85",
      @"category": @"placeholderOpacity",
      @"type": @"85"
      },
    @"90": @{
      @"value": 0.9,
      @"name": @"PlaceholderOpacity90",
      @"category": @"placeholderOpacity",
      @"type": @"90"
      },
    @"95": @{
      @"value": 0.95,
      @"name": @"PlaceholderOpacity95",
      @"category": @"placeholderOpacity",
      @"type": @"95"
      },
    @"100": @{
      @"value": 1,
      @"name": @"PlaceholderOpacity100",
      @"category": @"placeholderOpacity",
      @"type": @"100"
      }
    },
  @"ringColor": @{
    @"DEFAULT": @{
      @"value": #3b82f6,
      @"name": @"RingColorDefault",
      @"category": @"ringColor",
      @"type": @"DEFAULT"
      },
    @"inherit": @{
      @"value": inherit,
      @"name": @"RingColorInherit",
      @"category": @"ringColor",
      @"type": @"inherit"
      },
    @"current": @{
      @"value": currentColor,
      @"name": @"RingColorCurrent",
      @"category": @"ringColor",
      @"type": @"current"
      },
    @"transparent": @{
      @"value": transparent,
      @"name": @"RingColorTransparent",
      @"category": @"ringColor",
      @"type": @"transparent"
      },
    @"black": @{
      @"value": #000,
      @"name": @"RingColorBlack",
      @"category": @"ringColor",
      @"type": @"black"
      },
    @"white": @{
      @"value": #fff,
      @"name": @"RingColorWhite",
      @"category": @"ringColor",
      @"type": @"white"
      },
    @"slate": @{
      @"50": @{
        @"value": #f8fafc,
        @"name": @"RingColorSlate50",
        @"category": @"ringColor",
        @"type": @"slate",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f1f5f9,
        @"name": @"RingColorSlate100",
        @"category": @"ringColor",
        @"type": @"slate",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e2e8f0,
        @"name": @"RingColorSlate200",
        @"category": @"ringColor",
        @"type": @"slate",
        @"item": @"200"
        },
      @"300": @{
        @"value": #cbd5e1,
        @"name": @"RingColorSlate300",
        @"category": @"ringColor",
        @"type": @"slate",
        @"item": @"300"
        },
      @"400": @{
        @"value": #94a3b8,
        @"name": @"RingColorSlate400",
        @"category": @"ringColor",
        @"type": @"slate",
        @"item": @"400"
        },
      @"500": @{
        @"value": #64748b,
        @"name": @"RingColorSlate500",
        @"category": @"ringColor",
        @"type": @"slate",
        @"item": @"500"
        },
      @"600": @{
        @"value": #475569,
        @"name": @"RingColorSlate600",
        @"category": @"ringColor",
        @"type": @"slate",
        @"item": @"600"
        },
      @"700": @{
        @"value": #334155,
        @"name": @"RingColorSlate700",
        @"category": @"ringColor",
        @"type": @"slate",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e293b,
        @"name": @"RingColorSlate800",
        @"category": @"ringColor",
        @"type": @"slate",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0f172a,
        @"name": @"RingColorSlate900",
        @"category": @"ringColor",
        @"type": @"slate",
        @"item": @"900"
        },
      @"950": @{
        @"value": #020617,
        @"name": @"RingColorSlate950",
        @"category": @"ringColor",
        @"type": @"slate",
        @"item": @"950"
        }
      },
    @"gray": @{
      @"50": @{
        @"value": #f9fafb,
        @"name": @"RingColorGray50",
        @"category": @"ringColor",
        @"type": @"gray",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3f4f6,
        @"name": @"RingColorGray100",
        @"category": @"ringColor",
        @"type": @"gray",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e7eb,
        @"name": @"RingColorGray200",
        @"category": @"ringColor",
        @"type": @"gray",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d1d5db,
        @"name": @"RingColorGray300",
        @"category": @"ringColor",
        @"type": @"gray",
        @"item": @"300"
        },
      @"400": @{
        @"value": #9ca3af,
        @"name": @"RingColorGray400",
        @"category": @"ringColor",
        @"type": @"gray",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6b7280,
        @"name": @"RingColorGray500",
        @"category": @"ringColor",
        @"type": @"gray",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4b5563,
        @"name": @"RingColorGray600",
        @"category": @"ringColor",
        @"type": @"gray",
        @"item": @"600"
        },
      @"700": @{
        @"value": #374151,
        @"name": @"RingColorGray700",
        @"category": @"ringColor",
        @"type": @"gray",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1f2937,
        @"name": @"RingColorGray800",
        @"category": @"ringColor",
        @"type": @"gray",
        @"item": @"800"
        },
      @"900": @{
        @"value": #111827,
        @"name": @"RingColorGray900",
        @"category": @"ringColor",
        @"type": @"gray",
        @"item": @"900"
        },
      @"950": @{
        @"value": #030712,
        @"name": @"RingColorGray950",
        @"category": @"ringColor",
        @"type": @"gray",
        @"item": @"950"
        }
      },
    @"zinc": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"RingColorZinc50",
        @"category": @"ringColor",
        @"type": @"zinc",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f4f4f5,
        @"name": @"RingColorZinc100",
        @"category": @"ringColor",
        @"type": @"zinc",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e4e4e7,
        @"name": @"RingColorZinc200",
        @"category": @"ringColor",
        @"type": @"zinc",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d8,
        @"name": @"RingColorZinc300",
        @"category": @"ringColor",
        @"type": @"zinc",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a1a1aa,
        @"name": @"RingColorZinc400",
        @"category": @"ringColor",
        @"type": @"zinc",
        @"item": @"400"
        },
      @"500": @{
        @"value": #71717a,
        @"name": @"RingColorZinc500",
        @"category": @"ringColor",
        @"type": @"zinc",
        @"item": @"500"
        },
      @"600": @{
        @"value": #52525b,
        @"name": @"RingColorZinc600",
        @"category": @"ringColor",
        @"type": @"zinc",
        @"item": @"600"
        },
      @"700": @{
        @"value": #3f3f46,
        @"name": @"RingColorZinc700",
        @"category": @"ringColor",
        @"type": @"zinc",
        @"item": @"700"
        },
      @"800": @{
        @"value": #27272a,
        @"name": @"RingColorZinc800",
        @"category": @"ringColor",
        @"type": @"zinc",
        @"item": @"800"
        },
      @"900": @{
        @"value": #18181b,
        @"name": @"RingColorZinc900",
        @"category": @"ringColor",
        @"type": @"zinc",
        @"item": @"900"
        },
      @"950": @{
        @"value": #09090b,
        @"name": @"RingColorZinc950",
        @"category": @"ringColor",
        @"type": @"zinc",
        @"item": @"950"
        }
      },
    @"neutral": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"RingColorNeutral50",
        @"category": @"ringColor",
        @"type": @"neutral",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f5,
        @"name": @"RingColorNeutral100",
        @"category": @"ringColor",
        @"type": @"neutral",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e5e5,
        @"name": @"RingColorNeutral200",
        @"category": @"ringColor",
        @"type": @"neutral",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d4,
        @"name": @"RingColorNeutral300",
        @"category": @"ringColor",
        @"type": @"neutral",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3a3a3,
        @"name": @"RingColorNeutral400",
        @"category": @"ringColor",
        @"type": @"neutral",
        @"item": @"400"
        },
      @"500": @{
        @"value": #737373,
        @"name": @"RingColorNeutral500",
        @"category": @"ringColor",
        @"type": @"neutral",
        @"item": @"500"
        },
      @"600": @{
        @"value": #525252,
        @"name": @"RingColorNeutral600",
        @"category": @"ringColor",
        @"type": @"neutral",
        @"item": @"600"
        },
      @"700": @{
        @"value": #404040,
        @"name": @"RingColorNeutral700",
        @"category": @"ringColor",
        @"type": @"neutral",
        @"item": @"700"
        },
      @"800": @{
        @"value": #262626,
        @"name": @"RingColorNeutral800",
        @"category": @"ringColor",
        @"type": @"neutral",
        @"item": @"800"
        },
      @"900": @{
        @"value": #171717,
        @"name": @"RingColorNeutral900",
        @"category": @"ringColor",
        @"type": @"neutral",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0a0a0a,
        @"name": @"RingColorNeutral950",
        @"category": @"ringColor",
        @"type": @"neutral",
        @"item": @"950"
        }
      },
    @"stone": @{
      @"50": @{
        @"value": #fafaf9,
        @"name": @"RingColorStone50",
        @"category": @"ringColor",
        @"type": @"stone",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f4,
        @"name": @"RingColorStone100",
        @"category": @"ringColor",
        @"type": @"stone",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e7e5e4,
        @"name": @"RingColorStone200",
        @"category": @"ringColor",
        @"type": @"stone",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d6d3d1,
        @"name": @"RingColorStone300",
        @"category": @"ringColor",
        @"type": @"stone",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a8a29e,
        @"name": @"RingColorStone400",
        @"category": @"ringColor",
        @"type": @"stone",
        @"item": @"400"
        },
      @"500": @{
        @"value": #78716c,
        @"name": @"RingColorStone500",
        @"category": @"ringColor",
        @"type": @"stone",
        @"item": @"500"
        },
      @"600": @{
        @"value": #57534e,
        @"name": @"RingColorStone600",
        @"category": @"ringColor",
        @"type": @"stone",
        @"item": @"600"
        },
      @"700": @{
        @"value": #44403c,
        @"name": @"RingColorStone700",
        @"category": @"ringColor",
        @"type": @"stone",
        @"item": @"700"
        },
      @"800": @{
        @"value": #292524,
        @"name": @"RingColorStone800",
        @"category": @"ringColor",
        @"type": @"stone",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1c1917,
        @"name": @"RingColorStone900",
        @"category": @"ringColor",
        @"type": @"stone",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0c0a09,
        @"name": @"RingColorStone950",
        @"category": @"ringColor",
        @"type": @"stone",
        @"item": @"950"
        }
      },
    @"red": @{
      @"50": @{
        @"value": #fef2f2,
        @"name": @"RingColorRed50",
        @"category": @"ringColor",
        @"type": @"red",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fee2e2,
        @"name": @"RingColorRed100",
        @"category": @"ringColor",
        @"type": @"red",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecaca,
        @"name": @"RingColorRed200",
        @"category": @"ringColor",
        @"type": @"red",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fca5a5,
        @"name": @"RingColorRed300",
        @"category": @"ringColor",
        @"type": @"red",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f87171,
        @"name": @"RingColorRed400",
        @"category": @"ringColor",
        @"type": @"red",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ef4444,
        @"name": @"RingColorRed500",
        @"category": @"ringColor",
        @"type": @"red",
        @"item": @"500"
        },
      @"600": @{
        @"value": #dc2626,
        @"name": @"RingColorRed600",
        @"category": @"ringColor",
        @"type": @"red",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b91c1c,
        @"name": @"RingColorRed700",
        @"category": @"ringColor",
        @"type": @"red",
        @"item": @"700"
        },
      @"800": @{
        @"value": #991b1b,
        @"name": @"RingColorRed800",
        @"category": @"ringColor",
        @"type": @"red",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7f1d1d,
        @"name": @"RingColorRed900",
        @"category": @"ringColor",
        @"type": @"red",
        @"item": @"900"
        },
      @"950": @{
        @"value": #450a0a,
        @"name": @"RingColorRed950",
        @"category": @"ringColor",
        @"type": @"red",
        @"item": @"950"
        }
      },
    @"orange": @{
      @"50": @{
        @"value": #fff7ed,
        @"name": @"RingColorOrange50",
        @"category": @"ringColor",
        @"type": @"orange",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffedd5,
        @"name": @"RingColorOrange100",
        @"category": @"ringColor",
        @"type": @"orange",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fed7aa,
        @"name": @"RingColorOrange200",
        @"category": @"ringColor",
        @"type": @"orange",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fdba74,
        @"name": @"RingColorOrange300",
        @"category": @"ringColor",
        @"type": @"orange",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb923c,
        @"name": @"RingColorOrange400",
        @"category": @"ringColor",
        @"type": @"orange",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f97316,
        @"name": @"RingColorOrange500",
        @"category": @"ringColor",
        @"type": @"orange",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ea580c,
        @"name": @"RingColorOrange600",
        @"category": @"ringColor",
        @"type": @"orange",
        @"item": @"600"
        },
      @"700": @{
        @"value": #c2410c,
        @"name": @"RingColorOrange700",
        @"category": @"ringColor",
        @"type": @"orange",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9a3412,
        @"name": @"RingColorOrange800",
        @"category": @"ringColor",
        @"type": @"orange",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7c2d12,
        @"name": @"RingColorOrange900",
        @"category": @"ringColor",
        @"type": @"orange",
        @"item": @"900"
        },
      @"950": @{
        @"value": #431407,
        @"name": @"RingColorOrange950",
        @"category": @"ringColor",
        @"type": @"orange",
        @"item": @"950"
        }
      },
    @"amber": @{
      @"50": @{
        @"value": #fffbeb,
        @"name": @"RingColorAmber50",
        @"category": @"ringColor",
        @"type": @"amber",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef3c7,
        @"name": @"RingColorAmber100",
        @"category": @"ringColor",
        @"type": @"amber",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fde68a,
        @"name": @"RingColorAmber200",
        @"category": @"ringColor",
        @"type": @"amber",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fcd34d,
        @"name": @"RingColorAmber300",
        @"category": @"ringColor",
        @"type": @"amber",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fbbf24,
        @"name": @"RingColorAmber400",
        @"category": @"ringColor",
        @"type": @"amber",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f59e0b,
        @"name": @"RingColorAmber500",
        @"category": @"ringColor",
        @"type": @"amber",
        @"item": @"500"
        },
      @"600": @{
        @"value": #d97706,
        @"name": @"RingColorAmber600",
        @"category": @"ringColor",
        @"type": @"amber",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b45309,
        @"name": @"RingColorAmber700",
        @"category": @"ringColor",
        @"type": @"amber",
        @"item": @"700"
        },
      @"800": @{
        @"value": #92400e,
        @"name": @"RingColorAmber800",
        @"category": @"ringColor",
        @"type": @"amber",
        @"item": @"800"
        },
      @"900": @{
        @"value": #78350f,
        @"name": @"RingColorAmber900",
        @"category": @"ringColor",
        @"type": @"amber",
        @"item": @"900"
        },
      @"950": @{
        @"value": #451a03,
        @"name": @"RingColorAmber950",
        @"category": @"ringColor",
        @"type": @"amber",
        @"item": @"950"
        }
      },
    @"yellow": @{
      @"50": @{
        @"value": #fefce8,
        @"name": @"RingColorYellow50",
        @"category": @"ringColor",
        @"type": @"yellow",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef9c3,
        @"name": @"RingColorYellow100",
        @"category": @"ringColor",
        @"type": @"yellow",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fef08a,
        @"name": @"RingColorYellow200",
        @"category": @"ringColor",
        @"type": @"yellow",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fde047,
        @"name": @"RingColorYellow300",
        @"category": @"ringColor",
        @"type": @"yellow",
        @"item": @"300"
        },
      @"400": @{
        @"value": #facc15,
        @"name": @"RingColorYellow400",
        @"category": @"ringColor",
        @"type": @"yellow",
        @"item": @"400"
        },
      @"500": @{
        @"value": #eab308,
        @"name": @"RingColorYellow500",
        @"category": @"ringColor",
        @"type": @"yellow",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ca8a04,
        @"name": @"RingColorYellow600",
        @"category": @"ringColor",
        @"type": @"yellow",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a16207,
        @"name": @"RingColorYellow700",
        @"category": @"ringColor",
        @"type": @"yellow",
        @"item": @"700"
        },
      @"800": @{
        @"value": #854d0e,
        @"name": @"RingColorYellow800",
        @"category": @"ringColor",
        @"type": @"yellow",
        @"item": @"800"
        },
      @"900": @{
        @"value": #713f12,
        @"name": @"RingColorYellow900",
        @"category": @"ringColor",
        @"type": @"yellow",
        @"item": @"900"
        },
      @"950": @{
        @"value": #422006,
        @"name": @"RingColorYellow950",
        @"category": @"ringColor",
        @"type": @"yellow",
        @"item": @"950"
        }
      },
    @"lime": @{
      @"50": @{
        @"value": #f7fee7,
        @"name": @"RingColorLime50",
        @"category": @"ringColor",
        @"type": @"lime",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ecfccb,
        @"name": @"RingColorLime100",
        @"category": @"ringColor",
        @"type": @"lime",
        @"item": @"100"
        },
      @"200": @{
        @"value": #d9f99d,
        @"name": @"RingColorLime200",
        @"category": @"ringColor",
        @"type": @"lime",
        @"item": @"200"
        },
      @"300": @{
        @"value": #bef264,
        @"name": @"RingColorLime300",
        @"category": @"ringColor",
        @"type": @"lime",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3e635,
        @"name": @"RingColorLime400",
        @"category": @"ringColor",
        @"type": @"lime",
        @"item": @"400"
        },
      @"500": @{
        @"value": #84cc16,
        @"name": @"RingColorLime500",
        @"category": @"ringColor",
        @"type": @"lime",
        @"item": @"500"
        },
      @"600": @{
        @"value": #65a30d,
        @"name": @"RingColorLime600",
        @"category": @"ringColor",
        @"type": @"lime",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4d7c0f,
        @"name": @"RingColorLime700",
        @"category": @"ringColor",
        @"type": @"lime",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3f6212,
        @"name": @"RingColorLime800",
        @"category": @"ringColor",
        @"type": @"lime",
        @"item": @"800"
        },
      @"900": @{
        @"value": #365314,
        @"name": @"RingColorLime900",
        @"category": @"ringColor",
        @"type": @"lime",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1a2e05,
        @"name": @"RingColorLime950",
        @"category": @"ringColor",
        @"type": @"lime",
        @"item": @"950"
        }
      },
    @"green": @{
      @"50": @{
        @"value": #f0fdf4,
        @"name": @"RingColorGreen50",
        @"category": @"ringColor",
        @"type": @"green",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dcfce7,
        @"name": @"RingColorGreen100",
        @"category": @"ringColor",
        @"type": @"green",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bbf7d0,
        @"name": @"RingColorGreen200",
        @"category": @"ringColor",
        @"type": @"green",
        @"item": @"200"
        },
      @"300": @{
        @"value": #86efac,
        @"name": @"RingColorGreen300",
        @"category": @"ringColor",
        @"type": @"green",
        @"item": @"300"
        },
      @"400": @{
        @"value": #4ade80,
        @"name": @"RingColorGreen400",
        @"category": @"ringColor",
        @"type": @"green",
        @"item": @"400"
        },
      @"500": @{
        @"value": #22c55e,
        @"name": @"RingColorGreen500",
        @"category": @"ringColor",
        @"type": @"green",
        @"item": @"500"
        },
      @"600": @{
        @"value": #16a34a,
        @"name": @"RingColorGreen600",
        @"category": @"ringColor",
        @"type": @"green",
        @"item": @"600"
        },
      @"700": @{
        @"value": #15803d,
        @"name": @"RingColorGreen700",
        @"category": @"ringColor",
        @"type": @"green",
        @"item": @"700"
        },
      @"800": @{
        @"value": #166534,
        @"name": @"RingColorGreen800",
        @"category": @"ringColor",
        @"type": @"green",
        @"item": @"800"
        },
      @"900": @{
        @"value": #14532d,
        @"name": @"RingColorGreen900",
        @"category": @"ringColor",
        @"type": @"green",
        @"item": @"900"
        },
      @"950": @{
        @"value": #052e16,
        @"name": @"RingColorGreen950",
        @"category": @"ringColor",
        @"type": @"green",
        @"item": @"950"
        }
      },
    @"emerald": @{
      @"50": @{
        @"value": #ecfdf5,
        @"name": @"RingColorEmerald50",
        @"category": @"ringColor",
        @"type": @"emerald",
        @"item": @"50"
        },
      @"100": @{
        @"value": #d1fae5,
        @"name": @"RingColorEmerald100",
        @"category": @"ringColor",
        @"type": @"emerald",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a7f3d0,
        @"name": @"RingColorEmerald200",
        @"category": @"ringColor",
        @"type": @"emerald",
        @"item": @"200"
        },
      @"300": @{
        @"value": #6ee7b7,
        @"name": @"RingColorEmerald300",
        @"category": @"ringColor",
        @"type": @"emerald",
        @"item": @"300"
        },
      @"400": @{
        @"value": #34d399,
        @"name": @"RingColorEmerald400",
        @"category": @"ringColor",
        @"type": @"emerald",
        @"item": @"400"
        },
      @"500": @{
        @"value": #10b981,
        @"name": @"RingColorEmerald500",
        @"category": @"ringColor",
        @"type": @"emerald",
        @"item": @"500"
        },
      @"600": @{
        @"value": #059669,
        @"name": @"RingColorEmerald600",
        @"category": @"ringColor",
        @"type": @"emerald",
        @"item": @"600"
        },
      @"700": @{
        @"value": #047857,
        @"name": @"RingColorEmerald700",
        @"category": @"ringColor",
        @"type": @"emerald",
        @"item": @"700"
        },
      @"800": @{
        @"value": #065f46,
        @"name": @"RingColorEmerald800",
        @"category": @"ringColor",
        @"type": @"emerald",
        @"item": @"800"
        },
      @"900": @{
        @"value": #064e3b,
        @"name": @"RingColorEmerald900",
        @"category": @"ringColor",
        @"type": @"emerald",
        @"item": @"900"
        },
      @"950": @{
        @"value": #022c22,
        @"name": @"RingColorEmerald950",
        @"category": @"ringColor",
        @"type": @"emerald",
        @"item": @"950"
        }
      },
    @"teal": @{
      @"50": @{
        @"value": #f0fdfa,
        @"name": @"RingColorTeal50",
        @"category": @"ringColor",
        @"type": @"teal",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ccfbf1,
        @"name": @"RingColorTeal100",
        @"category": @"ringColor",
        @"type": @"teal",
        @"item": @"100"
        },
      @"200": @{
        @"value": #99f6e4,
        @"name": @"RingColorTeal200",
        @"category": @"ringColor",
        @"type": @"teal",
        @"item": @"200"
        },
      @"300": @{
        @"value": #5eead4,
        @"name": @"RingColorTeal300",
        @"category": @"ringColor",
        @"type": @"teal",
        @"item": @"300"
        },
      @"400": @{
        @"value": #2dd4bf,
        @"name": @"RingColorTeal400",
        @"category": @"ringColor",
        @"type": @"teal",
        @"item": @"400"
        },
      @"500": @{
        @"value": #14b8a6,
        @"name": @"RingColorTeal500",
        @"category": @"ringColor",
        @"type": @"teal",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0d9488,
        @"name": @"RingColorTeal600",
        @"category": @"ringColor",
        @"type": @"teal",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0f766e,
        @"name": @"RingColorTeal700",
        @"category": @"ringColor",
        @"type": @"teal",
        @"item": @"700"
        },
      @"800": @{
        @"value": #115e59,
        @"name": @"RingColorTeal800",
        @"category": @"ringColor",
        @"type": @"teal",
        @"item": @"800"
        },
      @"900": @{
        @"value": #134e4a,
        @"name": @"RingColorTeal900",
        @"category": @"ringColor",
        @"type": @"teal",
        @"item": @"900"
        },
      @"950": @{
        @"value": #042f2e,
        @"name": @"RingColorTeal950",
        @"category": @"ringColor",
        @"type": @"teal",
        @"item": @"950"
        }
      },
    @"cyan": @{
      @"50": @{
        @"value": #ecfeff,
        @"name": @"RingColorCyan50",
        @"category": @"ringColor",
        @"type": @"cyan",
        @"item": @"50"
        },
      @"100": @{
        @"value": #cffafe,
        @"name": @"RingColorCyan100",
        @"category": @"ringColor",
        @"type": @"cyan",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a5f3fc,
        @"name": @"RingColorCyan200",
        @"category": @"ringColor",
        @"type": @"cyan",
        @"item": @"200"
        },
      @"300": @{
        @"value": #67e8f9,
        @"name": @"RingColorCyan300",
        @"category": @"ringColor",
        @"type": @"cyan",
        @"item": @"300"
        },
      @"400": @{
        @"value": #22d3ee,
        @"name": @"RingColorCyan400",
        @"category": @"ringColor",
        @"type": @"cyan",
        @"item": @"400"
        },
      @"500": @{
        @"value": #06b6d4,
        @"name": @"RingColorCyan500",
        @"category": @"ringColor",
        @"type": @"cyan",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0891b2,
        @"name": @"RingColorCyan600",
        @"category": @"ringColor",
        @"type": @"cyan",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0e7490,
        @"name": @"RingColorCyan700",
        @"category": @"ringColor",
        @"type": @"cyan",
        @"item": @"700"
        },
      @"800": @{
        @"value": #155e75,
        @"name": @"RingColorCyan800",
        @"category": @"ringColor",
        @"type": @"cyan",
        @"item": @"800"
        },
      @"900": @{
        @"value": #164e63,
        @"name": @"RingColorCyan900",
        @"category": @"ringColor",
        @"type": @"cyan",
        @"item": @"900"
        },
      @"950": @{
        @"value": #083344,
        @"name": @"RingColorCyan950",
        @"category": @"ringColor",
        @"type": @"cyan",
        @"item": @"950"
        }
      },
    @"sky": @{
      @"50": @{
        @"value": #f0f9ff,
        @"name": @"RingColorSky50",
        @"category": @"ringColor",
        @"type": @"sky",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0f2fe,
        @"name": @"RingColorSky100",
        @"category": @"ringColor",
        @"type": @"sky",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bae6fd,
        @"name": @"RingColorSky200",
        @"category": @"ringColor",
        @"type": @"sky",
        @"item": @"200"
        },
      @"300": @{
        @"value": #7dd3fc,
        @"name": @"RingColorSky300",
        @"category": @"ringColor",
        @"type": @"sky",
        @"item": @"300"
        },
      @"400": @{
        @"value": #38bdf8,
        @"name": @"RingColorSky400",
        @"category": @"ringColor",
        @"type": @"sky",
        @"item": @"400"
        },
      @"500": @{
        @"value": #0ea5e9,
        @"name": @"RingColorSky500",
        @"category": @"ringColor",
        @"type": @"sky",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0284c7,
        @"name": @"RingColorSky600",
        @"category": @"ringColor",
        @"type": @"sky",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0369a1,
        @"name": @"RingColorSky700",
        @"category": @"ringColor",
        @"type": @"sky",
        @"item": @"700"
        },
      @"800": @{
        @"value": #075985,
        @"name": @"RingColorSky800",
        @"category": @"ringColor",
        @"type": @"sky",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0c4a6e,
        @"name": @"RingColorSky900",
        @"category": @"ringColor",
        @"type": @"sky",
        @"item": @"900"
        },
      @"950": @{
        @"value": #082f49,
        @"name": @"RingColorSky950",
        @"category": @"ringColor",
        @"type": @"sky",
        @"item": @"950"
        }
      },
    @"blue": @{
      @"50": @{
        @"value": #eff6ff,
        @"name": @"RingColorBlue50",
        @"category": @"ringColor",
        @"type": @"blue",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dbeafe,
        @"name": @"RingColorBlue100",
        @"category": @"ringColor",
        @"type": @"blue",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bfdbfe,
        @"name": @"RingColorBlue200",
        @"category": @"ringColor",
        @"type": @"blue",
        @"item": @"200"
        },
      @"300": @{
        @"value": #93c5fd,
        @"name": @"RingColorBlue300",
        @"category": @"ringColor",
        @"type": @"blue",
        @"item": @"300"
        },
      @"400": @{
        @"value": #60a5fa,
        @"name": @"RingColorBlue400",
        @"category": @"ringColor",
        @"type": @"blue",
        @"item": @"400"
        },
      @"500": @{
        @"value": #3b82f6,
        @"name": @"RingColorBlue500",
        @"category": @"ringColor",
        @"type": @"blue",
        @"item": @"500"
        },
      @"600": @{
        @"value": #2563eb,
        @"name": @"RingColorBlue600",
        @"category": @"ringColor",
        @"type": @"blue",
        @"item": @"600"
        },
      @"700": @{
        @"value": #1d4ed8,
        @"name": @"RingColorBlue700",
        @"category": @"ringColor",
        @"type": @"blue",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e40af,
        @"name": @"RingColorBlue800",
        @"category": @"ringColor",
        @"type": @"blue",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1e3a8a,
        @"name": @"RingColorBlue900",
        @"category": @"ringColor",
        @"type": @"blue",
        @"item": @"900"
        },
      @"950": @{
        @"value": #172554,
        @"name": @"RingColorBlue950",
        @"category": @"ringColor",
        @"type": @"blue",
        @"item": @"950"
        }
      },
    @"indigo": @{
      @"50": @{
        @"value": #eef2ff,
        @"name": @"RingColorIndigo50",
        @"category": @"ringColor",
        @"type": @"indigo",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0e7ff,
        @"name": @"RingColorIndigo100",
        @"category": @"ringColor",
        @"type": @"indigo",
        @"item": @"100"
        },
      @"200": @{
        @"value": #c7d2fe,
        @"name": @"RingColorIndigo200",
        @"category": @"ringColor",
        @"type": @"indigo",
        @"item": @"200"
        },
      @"300": @{
        @"value": #a5b4fc,
        @"name": @"RingColorIndigo300",
        @"category": @"ringColor",
        @"type": @"indigo",
        @"item": @"300"
        },
      @"400": @{
        @"value": #818cf8,
        @"name": @"RingColorIndigo400",
        @"category": @"ringColor",
        @"type": @"indigo",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6366f1,
        @"name": @"RingColorIndigo500",
        @"category": @"ringColor",
        @"type": @"indigo",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4f46e5,
        @"name": @"RingColorIndigo600",
        @"category": @"ringColor",
        @"type": @"indigo",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4338ca,
        @"name": @"RingColorIndigo700",
        @"category": @"ringColor",
        @"type": @"indigo",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3730a3,
        @"name": @"RingColorIndigo800",
        @"category": @"ringColor",
        @"type": @"indigo",
        @"item": @"800"
        },
      @"900": @{
        @"value": #312e81,
        @"name": @"RingColorIndigo900",
        @"category": @"ringColor",
        @"type": @"indigo",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1e1b4b,
        @"name": @"RingColorIndigo950",
        @"category": @"ringColor",
        @"type": @"indigo",
        @"item": @"950"
        }
      },
    @"violet": @{
      @"50": @{
        @"value": #f5f3ff,
        @"name": @"RingColorViolet50",
        @"category": @"ringColor",
        @"type": @"violet",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ede9fe,
        @"name": @"RingColorViolet100",
        @"category": @"ringColor",
        @"type": @"violet",
        @"item": @"100"
        },
      @"200": @{
        @"value": #ddd6fe,
        @"name": @"RingColorViolet200",
        @"category": @"ringColor",
        @"type": @"violet",
        @"item": @"200"
        },
      @"300": @{
        @"value": #c4b5fd,
        @"name": @"RingColorViolet300",
        @"category": @"ringColor",
        @"type": @"violet",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a78bfa,
        @"name": @"RingColorViolet400",
        @"category": @"ringColor",
        @"type": @"violet",
        @"item": @"400"
        },
      @"500": @{
        @"value": #8b5cf6,
        @"name": @"RingColorViolet500",
        @"category": @"ringColor",
        @"type": @"violet",
        @"item": @"500"
        },
      @"600": @{
        @"value": #7c3aed,
        @"name": @"RingColorViolet600",
        @"category": @"ringColor",
        @"type": @"violet",
        @"item": @"600"
        },
      @"700": @{
        @"value": #6d28d9,
        @"name": @"RingColorViolet700",
        @"category": @"ringColor",
        @"type": @"violet",
        @"item": @"700"
        },
      @"800": @{
        @"value": #5b21b6,
        @"name": @"RingColorViolet800",
        @"category": @"ringColor",
        @"type": @"violet",
        @"item": @"800"
        },
      @"900": @{
        @"value": #4c1d95,
        @"name": @"RingColorViolet900",
        @"category": @"ringColor",
        @"type": @"violet",
        @"item": @"900"
        },
      @"950": @{
        @"value": #2e1065,
        @"name": @"RingColorViolet950",
        @"category": @"ringColor",
        @"type": @"violet",
        @"item": @"950"
        }
      },
    @"purple": @{
      @"50": @{
        @"value": #faf5ff,
        @"name": @"RingColorPurple50",
        @"category": @"ringColor",
        @"type": @"purple",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3e8ff,
        @"name": @"RingColorPurple100",
        @"category": @"ringColor",
        @"type": @"purple",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e9d5ff,
        @"name": @"RingColorPurple200",
        @"category": @"ringColor",
        @"type": @"purple",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d8b4fe,
        @"name": @"RingColorPurple300",
        @"category": @"ringColor",
        @"type": @"purple",
        @"item": @"300"
        },
      @"400": @{
        @"value": #c084fc,
        @"name": @"RingColorPurple400",
        @"category": @"ringColor",
        @"type": @"purple",
        @"item": @"400"
        },
      @"500": @{
        @"value": #a855f7,
        @"name": @"RingColorPurple500",
        @"category": @"ringColor",
        @"type": @"purple",
        @"item": @"500"
        },
      @"600": @{
        @"value": #9333ea,
        @"name": @"RingColorPurple600",
        @"category": @"ringColor",
        @"type": @"purple",
        @"item": @"600"
        },
      @"700": @{
        @"value": #7e22ce,
        @"name": @"RingColorPurple700",
        @"category": @"ringColor",
        @"type": @"purple",
        @"item": @"700"
        },
      @"800": @{
        @"value": #6b21a8,
        @"name": @"RingColorPurple800",
        @"category": @"ringColor",
        @"type": @"purple",
        @"item": @"800"
        },
      @"900": @{
        @"value": #581c87,
        @"name": @"RingColorPurple900",
        @"category": @"ringColor",
        @"type": @"purple",
        @"item": @"900"
        },
      @"950": @{
        @"value": #3b0764,
        @"name": @"RingColorPurple950",
        @"category": @"ringColor",
        @"type": @"purple",
        @"item": @"950"
        }
      },
    @"fuchsia": @{
      @"50": @{
        @"value": #fdf4ff,
        @"name": @"RingColorFuchsia50",
        @"category": @"ringColor",
        @"type": @"fuchsia",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fae8ff,
        @"name": @"RingColorFuchsia100",
        @"category": @"ringColor",
        @"type": @"fuchsia",
        @"item": @"100"
        },
      @"200": @{
        @"value": #f5d0fe,
        @"name": @"RingColorFuchsia200",
        @"category": @"ringColor",
        @"type": @"fuchsia",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f0abfc,
        @"name": @"RingColorFuchsia300",
        @"category": @"ringColor",
        @"type": @"fuchsia",
        @"item": @"300"
        },
      @"400": @{
        @"value": #e879f9,
        @"name": @"RingColorFuchsia400",
        @"category": @"ringColor",
        @"type": @"fuchsia",
        @"item": @"400"
        },
      @"500": @{
        @"value": #d946ef,
        @"name": @"RingColorFuchsia500",
        @"category": @"ringColor",
        @"type": @"fuchsia",
        @"item": @"500"
        },
      @"600": @{
        @"value": #c026d3,
        @"name": @"RingColorFuchsia600",
        @"category": @"ringColor",
        @"type": @"fuchsia",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a21caf,
        @"name": @"RingColorFuchsia700",
        @"category": @"ringColor",
        @"type": @"fuchsia",
        @"item": @"700"
        },
      @"800": @{
        @"value": #86198f,
        @"name": @"RingColorFuchsia800",
        @"category": @"ringColor",
        @"type": @"fuchsia",
        @"item": @"800"
        },
      @"900": @{
        @"value": #701a75,
        @"name": @"RingColorFuchsia900",
        @"category": @"ringColor",
        @"type": @"fuchsia",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4a044e,
        @"name": @"RingColorFuchsia950",
        @"category": @"ringColor",
        @"type": @"fuchsia",
        @"item": @"950"
        }
      },
    @"pink": @{
      @"50": @{
        @"value": #fdf2f8,
        @"name": @"RingColorPink50",
        @"category": @"ringColor",
        @"type": @"pink",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fce7f3,
        @"name": @"RingColorPink100",
        @"category": @"ringColor",
        @"type": @"pink",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fbcfe8,
        @"name": @"RingColorPink200",
        @"category": @"ringColor",
        @"type": @"pink",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f9a8d4,
        @"name": @"RingColorPink300",
        @"category": @"ringColor",
        @"type": @"pink",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f472b6,
        @"name": @"RingColorPink400",
        @"category": @"ringColor",
        @"type": @"pink",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ec4899,
        @"name": @"RingColorPink500",
        @"category": @"ringColor",
        @"type": @"pink",
        @"item": @"500"
        },
      @"600": @{
        @"value": #db2777,
        @"name": @"RingColorPink600",
        @"category": @"ringColor",
        @"type": @"pink",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be185d,
        @"name": @"RingColorPink700",
        @"category": @"ringColor",
        @"type": @"pink",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9d174d,
        @"name": @"RingColorPink800",
        @"category": @"ringColor",
        @"type": @"pink",
        @"item": @"800"
        },
      @"900": @{
        @"value": #831843,
        @"name": @"RingColorPink900",
        @"category": @"ringColor",
        @"type": @"pink",
        @"item": @"900"
        },
      @"950": @{
        @"value": #500724,
        @"name": @"RingColorPink950",
        @"category": @"ringColor",
        @"type": @"pink",
        @"item": @"950"
        }
      },
    @"rose": @{
      @"50": @{
        @"value": #fff1f2,
        @"name": @"RingColorRose50",
        @"category": @"ringColor",
        @"type": @"rose",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffe4e6,
        @"name": @"RingColorRose100",
        @"category": @"ringColor",
        @"type": @"rose",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecdd3,
        @"name": @"RingColorRose200",
        @"category": @"ringColor",
        @"type": @"rose",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fda4af,
        @"name": @"RingColorRose300",
        @"category": @"ringColor",
        @"type": @"rose",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb7185,
        @"name": @"RingColorRose400",
        @"category": @"ringColor",
        @"type": @"rose",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f43f5e,
        @"name": @"RingColorRose500",
        @"category": @"ringColor",
        @"type": @"rose",
        @"item": @"500"
        },
      @"600": @{
        @"value": #e11d48,
        @"name": @"RingColorRose600",
        @"category": @"ringColor",
        @"type": @"rose",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be123c,
        @"name": @"RingColorRose700",
        @"category": @"ringColor",
        @"type": @"rose",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9f1239,
        @"name": @"RingColorRose800",
        @"category": @"ringColor",
        @"type": @"rose",
        @"item": @"800"
        },
      @"900": @{
        @"value": #881337,
        @"name": @"RingColorRose900",
        @"category": @"ringColor",
        @"type": @"rose",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4c0519,
        @"name": @"RingColorRose950",
        @"category": @"ringColor",
        @"type": @"rose",
        @"item": @"950"
        }
      }
    },
  @"ringOffsetColor": @{
    @"inherit": @{
      @"value": inherit,
      @"name": @"RingOffsetColorInherit",
      @"category": @"ringOffsetColor",
      @"type": @"inherit"
      },
    @"current": @{
      @"value": currentColor,
      @"name": @"RingOffsetColorCurrent",
      @"category": @"ringOffsetColor",
      @"type": @"current"
      },
    @"transparent": @{
      @"value": transparent,
      @"name": @"RingOffsetColorTransparent",
      @"category": @"ringOffsetColor",
      @"type": @"transparent"
      },
    @"black": @{
      @"value": #000,
      @"name": @"RingOffsetColorBlack",
      @"category": @"ringOffsetColor",
      @"type": @"black"
      },
    @"white": @{
      @"value": #fff,
      @"name": @"RingOffsetColorWhite",
      @"category": @"ringOffsetColor",
      @"type": @"white"
      },
    @"slate": @{
      @"50": @{
        @"value": #f8fafc,
        @"name": @"RingOffsetColorSlate50",
        @"category": @"ringOffsetColor",
        @"type": @"slate",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f1f5f9,
        @"name": @"RingOffsetColorSlate100",
        @"category": @"ringOffsetColor",
        @"type": @"slate",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e2e8f0,
        @"name": @"RingOffsetColorSlate200",
        @"category": @"ringOffsetColor",
        @"type": @"slate",
        @"item": @"200"
        },
      @"300": @{
        @"value": #cbd5e1,
        @"name": @"RingOffsetColorSlate300",
        @"category": @"ringOffsetColor",
        @"type": @"slate",
        @"item": @"300"
        },
      @"400": @{
        @"value": #94a3b8,
        @"name": @"RingOffsetColorSlate400",
        @"category": @"ringOffsetColor",
        @"type": @"slate",
        @"item": @"400"
        },
      @"500": @{
        @"value": #64748b,
        @"name": @"RingOffsetColorSlate500",
        @"category": @"ringOffsetColor",
        @"type": @"slate",
        @"item": @"500"
        },
      @"600": @{
        @"value": #475569,
        @"name": @"RingOffsetColorSlate600",
        @"category": @"ringOffsetColor",
        @"type": @"slate",
        @"item": @"600"
        },
      @"700": @{
        @"value": #334155,
        @"name": @"RingOffsetColorSlate700",
        @"category": @"ringOffsetColor",
        @"type": @"slate",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e293b,
        @"name": @"RingOffsetColorSlate800",
        @"category": @"ringOffsetColor",
        @"type": @"slate",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0f172a,
        @"name": @"RingOffsetColorSlate900",
        @"category": @"ringOffsetColor",
        @"type": @"slate",
        @"item": @"900"
        },
      @"950": @{
        @"value": #020617,
        @"name": @"RingOffsetColorSlate950",
        @"category": @"ringOffsetColor",
        @"type": @"slate",
        @"item": @"950"
        }
      },
    @"gray": @{
      @"50": @{
        @"value": #f9fafb,
        @"name": @"RingOffsetColorGray50",
        @"category": @"ringOffsetColor",
        @"type": @"gray",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3f4f6,
        @"name": @"RingOffsetColorGray100",
        @"category": @"ringOffsetColor",
        @"type": @"gray",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e7eb,
        @"name": @"RingOffsetColorGray200",
        @"category": @"ringOffsetColor",
        @"type": @"gray",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d1d5db,
        @"name": @"RingOffsetColorGray300",
        @"category": @"ringOffsetColor",
        @"type": @"gray",
        @"item": @"300"
        },
      @"400": @{
        @"value": #9ca3af,
        @"name": @"RingOffsetColorGray400",
        @"category": @"ringOffsetColor",
        @"type": @"gray",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6b7280,
        @"name": @"RingOffsetColorGray500",
        @"category": @"ringOffsetColor",
        @"type": @"gray",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4b5563,
        @"name": @"RingOffsetColorGray600",
        @"category": @"ringOffsetColor",
        @"type": @"gray",
        @"item": @"600"
        },
      @"700": @{
        @"value": #374151,
        @"name": @"RingOffsetColorGray700",
        @"category": @"ringOffsetColor",
        @"type": @"gray",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1f2937,
        @"name": @"RingOffsetColorGray800",
        @"category": @"ringOffsetColor",
        @"type": @"gray",
        @"item": @"800"
        },
      @"900": @{
        @"value": #111827,
        @"name": @"RingOffsetColorGray900",
        @"category": @"ringOffsetColor",
        @"type": @"gray",
        @"item": @"900"
        },
      @"950": @{
        @"value": #030712,
        @"name": @"RingOffsetColorGray950",
        @"category": @"ringOffsetColor",
        @"type": @"gray",
        @"item": @"950"
        }
      },
    @"zinc": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"RingOffsetColorZinc50",
        @"category": @"ringOffsetColor",
        @"type": @"zinc",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f4f4f5,
        @"name": @"RingOffsetColorZinc100",
        @"category": @"ringOffsetColor",
        @"type": @"zinc",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e4e4e7,
        @"name": @"RingOffsetColorZinc200",
        @"category": @"ringOffsetColor",
        @"type": @"zinc",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d8,
        @"name": @"RingOffsetColorZinc300",
        @"category": @"ringOffsetColor",
        @"type": @"zinc",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a1a1aa,
        @"name": @"RingOffsetColorZinc400",
        @"category": @"ringOffsetColor",
        @"type": @"zinc",
        @"item": @"400"
        },
      @"500": @{
        @"value": #71717a,
        @"name": @"RingOffsetColorZinc500",
        @"category": @"ringOffsetColor",
        @"type": @"zinc",
        @"item": @"500"
        },
      @"600": @{
        @"value": #52525b,
        @"name": @"RingOffsetColorZinc600",
        @"category": @"ringOffsetColor",
        @"type": @"zinc",
        @"item": @"600"
        },
      @"700": @{
        @"value": #3f3f46,
        @"name": @"RingOffsetColorZinc700",
        @"category": @"ringOffsetColor",
        @"type": @"zinc",
        @"item": @"700"
        },
      @"800": @{
        @"value": #27272a,
        @"name": @"RingOffsetColorZinc800",
        @"category": @"ringOffsetColor",
        @"type": @"zinc",
        @"item": @"800"
        },
      @"900": @{
        @"value": #18181b,
        @"name": @"RingOffsetColorZinc900",
        @"category": @"ringOffsetColor",
        @"type": @"zinc",
        @"item": @"900"
        },
      @"950": @{
        @"value": #09090b,
        @"name": @"RingOffsetColorZinc950",
        @"category": @"ringOffsetColor",
        @"type": @"zinc",
        @"item": @"950"
        }
      },
    @"neutral": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"RingOffsetColorNeutral50",
        @"category": @"ringOffsetColor",
        @"type": @"neutral",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f5,
        @"name": @"RingOffsetColorNeutral100",
        @"category": @"ringOffsetColor",
        @"type": @"neutral",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e5e5,
        @"name": @"RingOffsetColorNeutral200",
        @"category": @"ringOffsetColor",
        @"type": @"neutral",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d4,
        @"name": @"RingOffsetColorNeutral300",
        @"category": @"ringOffsetColor",
        @"type": @"neutral",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3a3a3,
        @"name": @"RingOffsetColorNeutral400",
        @"category": @"ringOffsetColor",
        @"type": @"neutral",
        @"item": @"400"
        },
      @"500": @{
        @"value": #737373,
        @"name": @"RingOffsetColorNeutral500",
        @"category": @"ringOffsetColor",
        @"type": @"neutral",
        @"item": @"500"
        },
      @"600": @{
        @"value": #525252,
        @"name": @"RingOffsetColorNeutral600",
        @"category": @"ringOffsetColor",
        @"type": @"neutral",
        @"item": @"600"
        },
      @"700": @{
        @"value": #404040,
        @"name": @"RingOffsetColorNeutral700",
        @"category": @"ringOffsetColor",
        @"type": @"neutral",
        @"item": @"700"
        },
      @"800": @{
        @"value": #262626,
        @"name": @"RingOffsetColorNeutral800",
        @"category": @"ringOffsetColor",
        @"type": @"neutral",
        @"item": @"800"
        },
      @"900": @{
        @"value": #171717,
        @"name": @"RingOffsetColorNeutral900",
        @"category": @"ringOffsetColor",
        @"type": @"neutral",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0a0a0a,
        @"name": @"RingOffsetColorNeutral950",
        @"category": @"ringOffsetColor",
        @"type": @"neutral",
        @"item": @"950"
        }
      },
    @"stone": @{
      @"50": @{
        @"value": #fafaf9,
        @"name": @"RingOffsetColorStone50",
        @"category": @"ringOffsetColor",
        @"type": @"stone",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f4,
        @"name": @"RingOffsetColorStone100",
        @"category": @"ringOffsetColor",
        @"type": @"stone",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e7e5e4,
        @"name": @"RingOffsetColorStone200",
        @"category": @"ringOffsetColor",
        @"type": @"stone",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d6d3d1,
        @"name": @"RingOffsetColorStone300",
        @"category": @"ringOffsetColor",
        @"type": @"stone",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a8a29e,
        @"name": @"RingOffsetColorStone400",
        @"category": @"ringOffsetColor",
        @"type": @"stone",
        @"item": @"400"
        },
      @"500": @{
        @"value": #78716c,
        @"name": @"RingOffsetColorStone500",
        @"category": @"ringOffsetColor",
        @"type": @"stone",
        @"item": @"500"
        },
      @"600": @{
        @"value": #57534e,
        @"name": @"RingOffsetColorStone600",
        @"category": @"ringOffsetColor",
        @"type": @"stone",
        @"item": @"600"
        },
      @"700": @{
        @"value": #44403c,
        @"name": @"RingOffsetColorStone700",
        @"category": @"ringOffsetColor",
        @"type": @"stone",
        @"item": @"700"
        },
      @"800": @{
        @"value": #292524,
        @"name": @"RingOffsetColorStone800",
        @"category": @"ringOffsetColor",
        @"type": @"stone",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1c1917,
        @"name": @"RingOffsetColorStone900",
        @"category": @"ringOffsetColor",
        @"type": @"stone",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0c0a09,
        @"name": @"RingOffsetColorStone950",
        @"category": @"ringOffsetColor",
        @"type": @"stone",
        @"item": @"950"
        }
      },
    @"red": @{
      @"50": @{
        @"value": #fef2f2,
        @"name": @"RingOffsetColorRed50",
        @"category": @"ringOffsetColor",
        @"type": @"red",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fee2e2,
        @"name": @"RingOffsetColorRed100",
        @"category": @"ringOffsetColor",
        @"type": @"red",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecaca,
        @"name": @"RingOffsetColorRed200",
        @"category": @"ringOffsetColor",
        @"type": @"red",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fca5a5,
        @"name": @"RingOffsetColorRed300",
        @"category": @"ringOffsetColor",
        @"type": @"red",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f87171,
        @"name": @"RingOffsetColorRed400",
        @"category": @"ringOffsetColor",
        @"type": @"red",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ef4444,
        @"name": @"RingOffsetColorRed500",
        @"category": @"ringOffsetColor",
        @"type": @"red",
        @"item": @"500"
        },
      @"600": @{
        @"value": #dc2626,
        @"name": @"RingOffsetColorRed600",
        @"category": @"ringOffsetColor",
        @"type": @"red",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b91c1c,
        @"name": @"RingOffsetColorRed700",
        @"category": @"ringOffsetColor",
        @"type": @"red",
        @"item": @"700"
        },
      @"800": @{
        @"value": #991b1b,
        @"name": @"RingOffsetColorRed800",
        @"category": @"ringOffsetColor",
        @"type": @"red",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7f1d1d,
        @"name": @"RingOffsetColorRed900",
        @"category": @"ringOffsetColor",
        @"type": @"red",
        @"item": @"900"
        },
      @"950": @{
        @"value": #450a0a,
        @"name": @"RingOffsetColorRed950",
        @"category": @"ringOffsetColor",
        @"type": @"red",
        @"item": @"950"
        }
      },
    @"orange": @{
      @"50": @{
        @"value": #fff7ed,
        @"name": @"RingOffsetColorOrange50",
        @"category": @"ringOffsetColor",
        @"type": @"orange",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffedd5,
        @"name": @"RingOffsetColorOrange100",
        @"category": @"ringOffsetColor",
        @"type": @"orange",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fed7aa,
        @"name": @"RingOffsetColorOrange200",
        @"category": @"ringOffsetColor",
        @"type": @"orange",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fdba74,
        @"name": @"RingOffsetColorOrange300",
        @"category": @"ringOffsetColor",
        @"type": @"orange",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb923c,
        @"name": @"RingOffsetColorOrange400",
        @"category": @"ringOffsetColor",
        @"type": @"orange",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f97316,
        @"name": @"RingOffsetColorOrange500",
        @"category": @"ringOffsetColor",
        @"type": @"orange",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ea580c,
        @"name": @"RingOffsetColorOrange600",
        @"category": @"ringOffsetColor",
        @"type": @"orange",
        @"item": @"600"
        },
      @"700": @{
        @"value": #c2410c,
        @"name": @"RingOffsetColorOrange700",
        @"category": @"ringOffsetColor",
        @"type": @"orange",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9a3412,
        @"name": @"RingOffsetColorOrange800",
        @"category": @"ringOffsetColor",
        @"type": @"orange",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7c2d12,
        @"name": @"RingOffsetColorOrange900",
        @"category": @"ringOffsetColor",
        @"type": @"orange",
        @"item": @"900"
        },
      @"950": @{
        @"value": #431407,
        @"name": @"RingOffsetColorOrange950",
        @"category": @"ringOffsetColor",
        @"type": @"orange",
        @"item": @"950"
        }
      },
    @"amber": @{
      @"50": @{
        @"value": #fffbeb,
        @"name": @"RingOffsetColorAmber50",
        @"category": @"ringOffsetColor",
        @"type": @"amber",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef3c7,
        @"name": @"RingOffsetColorAmber100",
        @"category": @"ringOffsetColor",
        @"type": @"amber",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fde68a,
        @"name": @"RingOffsetColorAmber200",
        @"category": @"ringOffsetColor",
        @"type": @"amber",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fcd34d,
        @"name": @"RingOffsetColorAmber300",
        @"category": @"ringOffsetColor",
        @"type": @"amber",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fbbf24,
        @"name": @"RingOffsetColorAmber400",
        @"category": @"ringOffsetColor",
        @"type": @"amber",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f59e0b,
        @"name": @"RingOffsetColorAmber500",
        @"category": @"ringOffsetColor",
        @"type": @"amber",
        @"item": @"500"
        },
      @"600": @{
        @"value": #d97706,
        @"name": @"RingOffsetColorAmber600",
        @"category": @"ringOffsetColor",
        @"type": @"amber",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b45309,
        @"name": @"RingOffsetColorAmber700",
        @"category": @"ringOffsetColor",
        @"type": @"amber",
        @"item": @"700"
        },
      @"800": @{
        @"value": #92400e,
        @"name": @"RingOffsetColorAmber800",
        @"category": @"ringOffsetColor",
        @"type": @"amber",
        @"item": @"800"
        },
      @"900": @{
        @"value": #78350f,
        @"name": @"RingOffsetColorAmber900",
        @"category": @"ringOffsetColor",
        @"type": @"amber",
        @"item": @"900"
        },
      @"950": @{
        @"value": #451a03,
        @"name": @"RingOffsetColorAmber950",
        @"category": @"ringOffsetColor",
        @"type": @"amber",
        @"item": @"950"
        }
      },
    @"yellow": @{
      @"50": @{
        @"value": #fefce8,
        @"name": @"RingOffsetColorYellow50",
        @"category": @"ringOffsetColor",
        @"type": @"yellow",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef9c3,
        @"name": @"RingOffsetColorYellow100",
        @"category": @"ringOffsetColor",
        @"type": @"yellow",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fef08a,
        @"name": @"RingOffsetColorYellow200",
        @"category": @"ringOffsetColor",
        @"type": @"yellow",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fde047,
        @"name": @"RingOffsetColorYellow300",
        @"category": @"ringOffsetColor",
        @"type": @"yellow",
        @"item": @"300"
        },
      @"400": @{
        @"value": #facc15,
        @"name": @"RingOffsetColorYellow400",
        @"category": @"ringOffsetColor",
        @"type": @"yellow",
        @"item": @"400"
        },
      @"500": @{
        @"value": #eab308,
        @"name": @"RingOffsetColorYellow500",
        @"category": @"ringOffsetColor",
        @"type": @"yellow",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ca8a04,
        @"name": @"RingOffsetColorYellow600",
        @"category": @"ringOffsetColor",
        @"type": @"yellow",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a16207,
        @"name": @"RingOffsetColorYellow700",
        @"category": @"ringOffsetColor",
        @"type": @"yellow",
        @"item": @"700"
        },
      @"800": @{
        @"value": #854d0e,
        @"name": @"RingOffsetColorYellow800",
        @"category": @"ringOffsetColor",
        @"type": @"yellow",
        @"item": @"800"
        },
      @"900": @{
        @"value": #713f12,
        @"name": @"RingOffsetColorYellow900",
        @"category": @"ringOffsetColor",
        @"type": @"yellow",
        @"item": @"900"
        },
      @"950": @{
        @"value": #422006,
        @"name": @"RingOffsetColorYellow950",
        @"category": @"ringOffsetColor",
        @"type": @"yellow",
        @"item": @"950"
        }
      },
    @"lime": @{
      @"50": @{
        @"value": #f7fee7,
        @"name": @"RingOffsetColorLime50",
        @"category": @"ringOffsetColor",
        @"type": @"lime",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ecfccb,
        @"name": @"RingOffsetColorLime100",
        @"category": @"ringOffsetColor",
        @"type": @"lime",
        @"item": @"100"
        },
      @"200": @{
        @"value": #d9f99d,
        @"name": @"RingOffsetColorLime200",
        @"category": @"ringOffsetColor",
        @"type": @"lime",
        @"item": @"200"
        },
      @"300": @{
        @"value": #bef264,
        @"name": @"RingOffsetColorLime300",
        @"category": @"ringOffsetColor",
        @"type": @"lime",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3e635,
        @"name": @"RingOffsetColorLime400",
        @"category": @"ringOffsetColor",
        @"type": @"lime",
        @"item": @"400"
        },
      @"500": @{
        @"value": #84cc16,
        @"name": @"RingOffsetColorLime500",
        @"category": @"ringOffsetColor",
        @"type": @"lime",
        @"item": @"500"
        },
      @"600": @{
        @"value": #65a30d,
        @"name": @"RingOffsetColorLime600",
        @"category": @"ringOffsetColor",
        @"type": @"lime",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4d7c0f,
        @"name": @"RingOffsetColorLime700",
        @"category": @"ringOffsetColor",
        @"type": @"lime",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3f6212,
        @"name": @"RingOffsetColorLime800",
        @"category": @"ringOffsetColor",
        @"type": @"lime",
        @"item": @"800"
        },
      @"900": @{
        @"value": #365314,
        @"name": @"RingOffsetColorLime900",
        @"category": @"ringOffsetColor",
        @"type": @"lime",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1a2e05,
        @"name": @"RingOffsetColorLime950",
        @"category": @"ringOffsetColor",
        @"type": @"lime",
        @"item": @"950"
        }
      },
    @"green": @{
      @"50": @{
        @"value": #f0fdf4,
        @"name": @"RingOffsetColorGreen50",
        @"category": @"ringOffsetColor",
        @"type": @"green",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dcfce7,
        @"name": @"RingOffsetColorGreen100",
        @"category": @"ringOffsetColor",
        @"type": @"green",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bbf7d0,
        @"name": @"RingOffsetColorGreen200",
        @"category": @"ringOffsetColor",
        @"type": @"green",
        @"item": @"200"
        },
      @"300": @{
        @"value": #86efac,
        @"name": @"RingOffsetColorGreen300",
        @"category": @"ringOffsetColor",
        @"type": @"green",
        @"item": @"300"
        },
      @"400": @{
        @"value": #4ade80,
        @"name": @"RingOffsetColorGreen400",
        @"category": @"ringOffsetColor",
        @"type": @"green",
        @"item": @"400"
        },
      @"500": @{
        @"value": #22c55e,
        @"name": @"RingOffsetColorGreen500",
        @"category": @"ringOffsetColor",
        @"type": @"green",
        @"item": @"500"
        },
      @"600": @{
        @"value": #16a34a,
        @"name": @"RingOffsetColorGreen600",
        @"category": @"ringOffsetColor",
        @"type": @"green",
        @"item": @"600"
        },
      @"700": @{
        @"value": #15803d,
        @"name": @"RingOffsetColorGreen700",
        @"category": @"ringOffsetColor",
        @"type": @"green",
        @"item": @"700"
        },
      @"800": @{
        @"value": #166534,
        @"name": @"RingOffsetColorGreen800",
        @"category": @"ringOffsetColor",
        @"type": @"green",
        @"item": @"800"
        },
      @"900": @{
        @"value": #14532d,
        @"name": @"RingOffsetColorGreen900",
        @"category": @"ringOffsetColor",
        @"type": @"green",
        @"item": @"900"
        },
      @"950": @{
        @"value": #052e16,
        @"name": @"RingOffsetColorGreen950",
        @"category": @"ringOffsetColor",
        @"type": @"green",
        @"item": @"950"
        }
      },
    @"emerald": @{
      @"50": @{
        @"value": #ecfdf5,
        @"name": @"RingOffsetColorEmerald50",
        @"category": @"ringOffsetColor",
        @"type": @"emerald",
        @"item": @"50"
        },
      @"100": @{
        @"value": #d1fae5,
        @"name": @"RingOffsetColorEmerald100",
        @"category": @"ringOffsetColor",
        @"type": @"emerald",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a7f3d0,
        @"name": @"RingOffsetColorEmerald200",
        @"category": @"ringOffsetColor",
        @"type": @"emerald",
        @"item": @"200"
        },
      @"300": @{
        @"value": #6ee7b7,
        @"name": @"RingOffsetColorEmerald300",
        @"category": @"ringOffsetColor",
        @"type": @"emerald",
        @"item": @"300"
        },
      @"400": @{
        @"value": #34d399,
        @"name": @"RingOffsetColorEmerald400",
        @"category": @"ringOffsetColor",
        @"type": @"emerald",
        @"item": @"400"
        },
      @"500": @{
        @"value": #10b981,
        @"name": @"RingOffsetColorEmerald500",
        @"category": @"ringOffsetColor",
        @"type": @"emerald",
        @"item": @"500"
        },
      @"600": @{
        @"value": #059669,
        @"name": @"RingOffsetColorEmerald600",
        @"category": @"ringOffsetColor",
        @"type": @"emerald",
        @"item": @"600"
        },
      @"700": @{
        @"value": #047857,
        @"name": @"RingOffsetColorEmerald700",
        @"category": @"ringOffsetColor",
        @"type": @"emerald",
        @"item": @"700"
        },
      @"800": @{
        @"value": #065f46,
        @"name": @"RingOffsetColorEmerald800",
        @"category": @"ringOffsetColor",
        @"type": @"emerald",
        @"item": @"800"
        },
      @"900": @{
        @"value": #064e3b,
        @"name": @"RingOffsetColorEmerald900",
        @"category": @"ringOffsetColor",
        @"type": @"emerald",
        @"item": @"900"
        },
      @"950": @{
        @"value": #022c22,
        @"name": @"RingOffsetColorEmerald950",
        @"category": @"ringOffsetColor",
        @"type": @"emerald",
        @"item": @"950"
        }
      },
    @"teal": @{
      @"50": @{
        @"value": #f0fdfa,
        @"name": @"RingOffsetColorTeal50",
        @"category": @"ringOffsetColor",
        @"type": @"teal",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ccfbf1,
        @"name": @"RingOffsetColorTeal100",
        @"category": @"ringOffsetColor",
        @"type": @"teal",
        @"item": @"100"
        },
      @"200": @{
        @"value": #99f6e4,
        @"name": @"RingOffsetColorTeal200",
        @"category": @"ringOffsetColor",
        @"type": @"teal",
        @"item": @"200"
        },
      @"300": @{
        @"value": #5eead4,
        @"name": @"RingOffsetColorTeal300",
        @"category": @"ringOffsetColor",
        @"type": @"teal",
        @"item": @"300"
        },
      @"400": @{
        @"value": #2dd4bf,
        @"name": @"RingOffsetColorTeal400",
        @"category": @"ringOffsetColor",
        @"type": @"teal",
        @"item": @"400"
        },
      @"500": @{
        @"value": #14b8a6,
        @"name": @"RingOffsetColorTeal500",
        @"category": @"ringOffsetColor",
        @"type": @"teal",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0d9488,
        @"name": @"RingOffsetColorTeal600",
        @"category": @"ringOffsetColor",
        @"type": @"teal",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0f766e,
        @"name": @"RingOffsetColorTeal700",
        @"category": @"ringOffsetColor",
        @"type": @"teal",
        @"item": @"700"
        },
      @"800": @{
        @"value": #115e59,
        @"name": @"RingOffsetColorTeal800",
        @"category": @"ringOffsetColor",
        @"type": @"teal",
        @"item": @"800"
        },
      @"900": @{
        @"value": #134e4a,
        @"name": @"RingOffsetColorTeal900",
        @"category": @"ringOffsetColor",
        @"type": @"teal",
        @"item": @"900"
        },
      @"950": @{
        @"value": #042f2e,
        @"name": @"RingOffsetColorTeal950",
        @"category": @"ringOffsetColor",
        @"type": @"teal",
        @"item": @"950"
        }
      },
    @"cyan": @{
      @"50": @{
        @"value": #ecfeff,
        @"name": @"RingOffsetColorCyan50",
        @"category": @"ringOffsetColor",
        @"type": @"cyan",
        @"item": @"50"
        },
      @"100": @{
        @"value": #cffafe,
        @"name": @"RingOffsetColorCyan100",
        @"category": @"ringOffsetColor",
        @"type": @"cyan",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a5f3fc,
        @"name": @"RingOffsetColorCyan200",
        @"category": @"ringOffsetColor",
        @"type": @"cyan",
        @"item": @"200"
        },
      @"300": @{
        @"value": #67e8f9,
        @"name": @"RingOffsetColorCyan300",
        @"category": @"ringOffsetColor",
        @"type": @"cyan",
        @"item": @"300"
        },
      @"400": @{
        @"value": #22d3ee,
        @"name": @"RingOffsetColorCyan400",
        @"category": @"ringOffsetColor",
        @"type": @"cyan",
        @"item": @"400"
        },
      @"500": @{
        @"value": #06b6d4,
        @"name": @"RingOffsetColorCyan500",
        @"category": @"ringOffsetColor",
        @"type": @"cyan",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0891b2,
        @"name": @"RingOffsetColorCyan600",
        @"category": @"ringOffsetColor",
        @"type": @"cyan",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0e7490,
        @"name": @"RingOffsetColorCyan700",
        @"category": @"ringOffsetColor",
        @"type": @"cyan",
        @"item": @"700"
        },
      @"800": @{
        @"value": #155e75,
        @"name": @"RingOffsetColorCyan800",
        @"category": @"ringOffsetColor",
        @"type": @"cyan",
        @"item": @"800"
        },
      @"900": @{
        @"value": #164e63,
        @"name": @"RingOffsetColorCyan900",
        @"category": @"ringOffsetColor",
        @"type": @"cyan",
        @"item": @"900"
        },
      @"950": @{
        @"value": #083344,
        @"name": @"RingOffsetColorCyan950",
        @"category": @"ringOffsetColor",
        @"type": @"cyan",
        @"item": @"950"
        }
      },
    @"sky": @{
      @"50": @{
        @"value": #f0f9ff,
        @"name": @"RingOffsetColorSky50",
        @"category": @"ringOffsetColor",
        @"type": @"sky",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0f2fe,
        @"name": @"RingOffsetColorSky100",
        @"category": @"ringOffsetColor",
        @"type": @"sky",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bae6fd,
        @"name": @"RingOffsetColorSky200",
        @"category": @"ringOffsetColor",
        @"type": @"sky",
        @"item": @"200"
        },
      @"300": @{
        @"value": #7dd3fc,
        @"name": @"RingOffsetColorSky300",
        @"category": @"ringOffsetColor",
        @"type": @"sky",
        @"item": @"300"
        },
      @"400": @{
        @"value": #38bdf8,
        @"name": @"RingOffsetColorSky400",
        @"category": @"ringOffsetColor",
        @"type": @"sky",
        @"item": @"400"
        },
      @"500": @{
        @"value": #0ea5e9,
        @"name": @"RingOffsetColorSky500",
        @"category": @"ringOffsetColor",
        @"type": @"sky",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0284c7,
        @"name": @"RingOffsetColorSky600",
        @"category": @"ringOffsetColor",
        @"type": @"sky",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0369a1,
        @"name": @"RingOffsetColorSky700",
        @"category": @"ringOffsetColor",
        @"type": @"sky",
        @"item": @"700"
        },
      @"800": @{
        @"value": #075985,
        @"name": @"RingOffsetColorSky800",
        @"category": @"ringOffsetColor",
        @"type": @"sky",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0c4a6e,
        @"name": @"RingOffsetColorSky900",
        @"category": @"ringOffsetColor",
        @"type": @"sky",
        @"item": @"900"
        },
      @"950": @{
        @"value": #082f49,
        @"name": @"RingOffsetColorSky950",
        @"category": @"ringOffsetColor",
        @"type": @"sky",
        @"item": @"950"
        }
      },
    @"blue": @{
      @"50": @{
        @"value": #eff6ff,
        @"name": @"RingOffsetColorBlue50",
        @"category": @"ringOffsetColor",
        @"type": @"blue",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dbeafe,
        @"name": @"RingOffsetColorBlue100",
        @"category": @"ringOffsetColor",
        @"type": @"blue",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bfdbfe,
        @"name": @"RingOffsetColorBlue200",
        @"category": @"ringOffsetColor",
        @"type": @"blue",
        @"item": @"200"
        },
      @"300": @{
        @"value": #93c5fd,
        @"name": @"RingOffsetColorBlue300",
        @"category": @"ringOffsetColor",
        @"type": @"blue",
        @"item": @"300"
        },
      @"400": @{
        @"value": #60a5fa,
        @"name": @"RingOffsetColorBlue400",
        @"category": @"ringOffsetColor",
        @"type": @"blue",
        @"item": @"400"
        },
      @"500": @{
        @"value": #3b82f6,
        @"name": @"RingOffsetColorBlue500",
        @"category": @"ringOffsetColor",
        @"type": @"blue",
        @"item": @"500"
        },
      @"600": @{
        @"value": #2563eb,
        @"name": @"RingOffsetColorBlue600",
        @"category": @"ringOffsetColor",
        @"type": @"blue",
        @"item": @"600"
        },
      @"700": @{
        @"value": #1d4ed8,
        @"name": @"RingOffsetColorBlue700",
        @"category": @"ringOffsetColor",
        @"type": @"blue",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e40af,
        @"name": @"RingOffsetColorBlue800",
        @"category": @"ringOffsetColor",
        @"type": @"blue",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1e3a8a,
        @"name": @"RingOffsetColorBlue900",
        @"category": @"ringOffsetColor",
        @"type": @"blue",
        @"item": @"900"
        },
      @"950": @{
        @"value": #172554,
        @"name": @"RingOffsetColorBlue950",
        @"category": @"ringOffsetColor",
        @"type": @"blue",
        @"item": @"950"
        }
      },
    @"indigo": @{
      @"50": @{
        @"value": #eef2ff,
        @"name": @"RingOffsetColorIndigo50",
        @"category": @"ringOffsetColor",
        @"type": @"indigo",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0e7ff,
        @"name": @"RingOffsetColorIndigo100",
        @"category": @"ringOffsetColor",
        @"type": @"indigo",
        @"item": @"100"
        },
      @"200": @{
        @"value": #c7d2fe,
        @"name": @"RingOffsetColorIndigo200",
        @"category": @"ringOffsetColor",
        @"type": @"indigo",
        @"item": @"200"
        },
      @"300": @{
        @"value": #a5b4fc,
        @"name": @"RingOffsetColorIndigo300",
        @"category": @"ringOffsetColor",
        @"type": @"indigo",
        @"item": @"300"
        },
      @"400": @{
        @"value": #818cf8,
        @"name": @"RingOffsetColorIndigo400",
        @"category": @"ringOffsetColor",
        @"type": @"indigo",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6366f1,
        @"name": @"RingOffsetColorIndigo500",
        @"category": @"ringOffsetColor",
        @"type": @"indigo",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4f46e5,
        @"name": @"RingOffsetColorIndigo600",
        @"category": @"ringOffsetColor",
        @"type": @"indigo",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4338ca,
        @"name": @"RingOffsetColorIndigo700",
        @"category": @"ringOffsetColor",
        @"type": @"indigo",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3730a3,
        @"name": @"RingOffsetColorIndigo800",
        @"category": @"ringOffsetColor",
        @"type": @"indigo",
        @"item": @"800"
        },
      @"900": @{
        @"value": #312e81,
        @"name": @"RingOffsetColorIndigo900",
        @"category": @"ringOffsetColor",
        @"type": @"indigo",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1e1b4b,
        @"name": @"RingOffsetColorIndigo950",
        @"category": @"ringOffsetColor",
        @"type": @"indigo",
        @"item": @"950"
        }
      },
    @"violet": @{
      @"50": @{
        @"value": #f5f3ff,
        @"name": @"RingOffsetColorViolet50",
        @"category": @"ringOffsetColor",
        @"type": @"violet",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ede9fe,
        @"name": @"RingOffsetColorViolet100",
        @"category": @"ringOffsetColor",
        @"type": @"violet",
        @"item": @"100"
        },
      @"200": @{
        @"value": #ddd6fe,
        @"name": @"RingOffsetColorViolet200",
        @"category": @"ringOffsetColor",
        @"type": @"violet",
        @"item": @"200"
        },
      @"300": @{
        @"value": #c4b5fd,
        @"name": @"RingOffsetColorViolet300",
        @"category": @"ringOffsetColor",
        @"type": @"violet",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a78bfa,
        @"name": @"RingOffsetColorViolet400",
        @"category": @"ringOffsetColor",
        @"type": @"violet",
        @"item": @"400"
        },
      @"500": @{
        @"value": #8b5cf6,
        @"name": @"RingOffsetColorViolet500",
        @"category": @"ringOffsetColor",
        @"type": @"violet",
        @"item": @"500"
        },
      @"600": @{
        @"value": #7c3aed,
        @"name": @"RingOffsetColorViolet600",
        @"category": @"ringOffsetColor",
        @"type": @"violet",
        @"item": @"600"
        },
      @"700": @{
        @"value": #6d28d9,
        @"name": @"RingOffsetColorViolet700",
        @"category": @"ringOffsetColor",
        @"type": @"violet",
        @"item": @"700"
        },
      @"800": @{
        @"value": #5b21b6,
        @"name": @"RingOffsetColorViolet800",
        @"category": @"ringOffsetColor",
        @"type": @"violet",
        @"item": @"800"
        },
      @"900": @{
        @"value": #4c1d95,
        @"name": @"RingOffsetColorViolet900",
        @"category": @"ringOffsetColor",
        @"type": @"violet",
        @"item": @"900"
        },
      @"950": @{
        @"value": #2e1065,
        @"name": @"RingOffsetColorViolet950",
        @"category": @"ringOffsetColor",
        @"type": @"violet",
        @"item": @"950"
        }
      },
    @"purple": @{
      @"50": @{
        @"value": #faf5ff,
        @"name": @"RingOffsetColorPurple50",
        @"category": @"ringOffsetColor",
        @"type": @"purple",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3e8ff,
        @"name": @"RingOffsetColorPurple100",
        @"category": @"ringOffsetColor",
        @"type": @"purple",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e9d5ff,
        @"name": @"RingOffsetColorPurple200",
        @"category": @"ringOffsetColor",
        @"type": @"purple",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d8b4fe,
        @"name": @"RingOffsetColorPurple300",
        @"category": @"ringOffsetColor",
        @"type": @"purple",
        @"item": @"300"
        },
      @"400": @{
        @"value": #c084fc,
        @"name": @"RingOffsetColorPurple400",
        @"category": @"ringOffsetColor",
        @"type": @"purple",
        @"item": @"400"
        },
      @"500": @{
        @"value": #a855f7,
        @"name": @"RingOffsetColorPurple500",
        @"category": @"ringOffsetColor",
        @"type": @"purple",
        @"item": @"500"
        },
      @"600": @{
        @"value": #9333ea,
        @"name": @"RingOffsetColorPurple600",
        @"category": @"ringOffsetColor",
        @"type": @"purple",
        @"item": @"600"
        },
      @"700": @{
        @"value": #7e22ce,
        @"name": @"RingOffsetColorPurple700",
        @"category": @"ringOffsetColor",
        @"type": @"purple",
        @"item": @"700"
        },
      @"800": @{
        @"value": #6b21a8,
        @"name": @"RingOffsetColorPurple800",
        @"category": @"ringOffsetColor",
        @"type": @"purple",
        @"item": @"800"
        },
      @"900": @{
        @"value": #581c87,
        @"name": @"RingOffsetColorPurple900",
        @"category": @"ringOffsetColor",
        @"type": @"purple",
        @"item": @"900"
        },
      @"950": @{
        @"value": #3b0764,
        @"name": @"RingOffsetColorPurple950",
        @"category": @"ringOffsetColor",
        @"type": @"purple",
        @"item": @"950"
        }
      },
    @"fuchsia": @{
      @"50": @{
        @"value": #fdf4ff,
        @"name": @"RingOffsetColorFuchsia50",
        @"category": @"ringOffsetColor",
        @"type": @"fuchsia",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fae8ff,
        @"name": @"RingOffsetColorFuchsia100",
        @"category": @"ringOffsetColor",
        @"type": @"fuchsia",
        @"item": @"100"
        },
      @"200": @{
        @"value": #f5d0fe,
        @"name": @"RingOffsetColorFuchsia200",
        @"category": @"ringOffsetColor",
        @"type": @"fuchsia",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f0abfc,
        @"name": @"RingOffsetColorFuchsia300",
        @"category": @"ringOffsetColor",
        @"type": @"fuchsia",
        @"item": @"300"
        },
      @"400": @{
        @"value": #e879f9,
        @"name": @"RingOffsetColorFuchsia400",
        @"category": @"ringOffsetColor",
        @"type": @"fuchsia",
        @"item": @"400"
        },
      @"500": @{
        @"value": #d946ef,
        @"name": @"RingOffsetColorFuchsia500",
        @"category": @"ringOffsetColor",
        @"type": @"fuchsia",
        @"item": @"500"
        },
      @"600": @{
        @"value": #c026d3,
        @"name": @"RingOffsetColorFuchsia600",
        @"category": @"ringOffsetColor",
        @"type": @"fuchsia",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a21caf,
        @"name": @"RingOffsetColorFuchsia700",
        @"category": @"ringOffsetColor",
        @"type": @"fuchsia",
        @"item": @"700"
        },
      @"800": @{
        @"value": #86198f,
        @"name": @"RingOffsetColorFuchsia800",
        @"category": @"ringOffsetColor",
        @"type": @"fuchsia",
        @"item": @"800"
        },
      @"900": @{
        @"value": #701a75,
        @"name": @"RingOffsetColorFuchsia900",
        @"category": @"ringOffsetColor",
        @"type": @"fuchsia",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4a044e,
        @"name": @"RingOffsetColorFuchsia950",
        @"category": @"ringOffsetColor",
        @"type": @"fuchsia",
        @"item": @"950"
        }
      },
    @"pink": @{
      @"50": @{
        @"value": #fdf2f8,
        @"name": @"RingOffsetColorPink50",
        @"category": @"ringOffsetColor",
        @"type": @"pink",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fce7f3,
        @"name": @"RingOffsetColorPink100",
        @"category": @"ringOffsetColor",
        @"type": @"pink",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fbcfe8,
        @"name": @"RingOffsetColorPink200",
        @"category": @"ringOffsetColor",
        @"type": @"pink",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f9a8d4,
        @"name": @"RingOffsetColorPink300",
        @"category": @"ringOffsetColor",
        @"type": @"pink",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f472b6,
        @"name": @"RingOffsetColorPink400",
        @"category": @"ringOffsetColor",
        @"type": @"pink",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ec4899,
        @"name": @"RingOffsetColorPink500",
        @"category": @"ringOffsetColor",
        @"type": @"pink",
        @"item": @"500"
        },
      @"600": @{
        @"value": #db2777,
        @"name": @"RingOffsetColorPink600",
        @"category": @"ringOffsetColor",
        @"type": @"pink",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be185d,
        @"name": @"RingOffsetColorPink700",
        @"category": @"ringOffsetColor",
        @"type": @"pink",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9d174d,
        @"name": @"RingOffsetColorPink800",
        @"category": @"ringOffsetColor",
        @"type": @"pink",
        @"item": @"800"
        },
      @"900": @{
        @"value": #831843,
        @"name": @"RingOffsetColorPink900",
        @"category": @"ringOffsetColor",
        @"type": @"pink",
        @"item": @"900"
        },
      @"950": @{
        @"value": #500724,
        @"name": @"RingOffsetColorPink950",
        @"category": @"ringOffsetColor",
        @"type": @"pink",
        @"item": @"950"
        }
      },
    @"rose": @{
      @"50": @{
        @"value": #fff1f2,
        @"name": @"RingOffsetColorRose50",
        @"category": @"ringOffsetColor",
        @"type": @"rose",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffe4e6,
        @"name": @"RingOffsetColorRose100",
        @"category": @"ringOffsetColor",
        @"type": @"rose",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecdd3,
        @"name": @"RingOffsetColorRose200",
        @"category": @"ringOffsetColor",
        @"type": @"rose",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fda4af,
        @"name": @"RingOffsetColorRose300",
        @"category": @"ringOffsetColor",
        @"type": @"rose",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb7185,
        @"name": @"RingOffsetColorRose400",
        @"category": @"ringOffsetColor",
        @"type": @"rose",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f43f5e,
        @"name": @"RingOffsetColorRose500",
        @"category": @"ringOffsetColor",
        @"type": @"rose",
        @"item": @"500"
        },
      @"600": @{
        @"value": #e11d48,
        @"name": @"RingOffsetColorRose600",
        @"category": @"ringOffsetColor",
        @"type": @"rose",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be123c,
        @"name": @"RingOffsetColorRose700",
        @"category": @"ringOffsetColor",
        @"type": @"rose",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9f1239,
        @"name": @"RingOffsetColorRose800",
        @"category": @"ringOffsetColor",
        @"type": @"rose",
        @"item": @"800"
        },
      @"900": @{
        @"value": #881337,
        @"name": @"RingOffsetColorRose900",
        @"category": @"ringOffsetColor",
        @"type": @"rose",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4c0519,
        @"name": @"RingOffsetColorRose950",
        @"category": @"ringOffsetColor",
        @"type": @"rose",
        @"item": @"950"
        }
      }
    },
  @"ringOffsetWidth": @{
    @"0": @{
      @"value": 0px,
      @"name": @"RingOffsetWidth0",
      @"category": @"ringOffsetWidth",
      @"type": @"0"
      },
    @"1": @{
      @"value": 1px,
      @"name": @"RingOffsetWidth1",
      @"category": @"ringOffsetWidth",
      @"type": @"1"
      },
    @"2": @{
      @"value": 2px,
      @"name": @"RingOffsetWidth2",
      @"category": @"ringOffsetWidth",
      @"type": @"2"
      },
    @"4": @{
      @"value": 4px,
      @"name": @"RingOffsetWidth4",
      @"category": @"ringOffsetWidth",
      @"type": @"4"
      },
    @"8": @{
      @"value": 8px,
      @"name": @"RingOffsetWidth8",
      @"category": @"ringOffsetWidth",
      @"type": @"8"
      }
    },
  @"ringOpacity": @{
    @"0": @{
      @"value": 0,
      @"name": @"RingOpacity0",
      @"category": @"ringOpacity",
      @"type": @"0"
      },
    @"5": @{
      @"value": 0.05,
      @"name": @"RingOpacity5",
      @"category": @"ringOpacity",
      @"type": @"5"
      },
    @"10": @{
      @"value": 0.1,
      @"name": @"RingOpacity10",
      @"category": @"ringOpacity",
      @"type": @"10"
      },
    @"15": @{
      @"value": 0.15,
      @"name": @"RingOpacity15",
      @"category": @"ringOpacity",
      @"type": @"15"
      },
    @"20": @{
      @"value": 0.2,
      @"name": @"RingOpacity20",
      @"category": @"ringOpacity",
      @"type": @"20"
      },
    @"25": @{
      @"value": 0.25,
      @"name": @"RingOpacity25",
      @"category": @"ringOpacity",
      @"type": @"25"
      },
    @"30": @{
      @"value": 0.3,
      @"name": @"RingOpacity30",
      @"category": @"ringOpacity",
      @"type": @"30"
      },
    @"35": @{
      @"value": 0.35,
      @"name": @"RingOpacity35",
      @"category": @"ringOpacity",
      @"type": @"35"
      },
    @"40": @{
      @"value": 0.4,
      @"name": @"RingOpacity40",
      @"category": @"ringOpacity",
      @"type": @"40"
      },
    @"45": @{
      @"value": 0.45,
      @"name": @"RingOpacity45",
      @"category": @"ringOpacity",
      @"type": @"45"
      },
    @"50": @{
      @"value": 0.5,
      @"name": @"RingOpacity50",
      @"category": @"ringOpacity",
      @"type": @"50"
      },
    @"55": @{
      @"value": 0.55,
      @"name": @"RingOpacity55",
      @"category": @"ringOpacity",
      @"type": @"55"
      },
    @"60": @{
      @"value": 0.6,
      @"name": @"RingOpacity60",
      @"category": @"ringOpacity",
      @"type": @"60"
      },
    @"65": @{
      @"value": 0.65,
      @"name": @"RingOpacity65",
      @"category": @"ringOpacity",
      @"type": @"65"
      },
    @"70": @{
      @"value": 0.7,
      @"name": @"RingOpacity70",
      @"category": @"ringOpacity",
      @"type": @"70"
      },
    @"75": @{
      @"value": 0.75,
      @"name": @"RingOpacity75",
      @"category": @"ringOpacity",
      @"type": @"75"
      },
    @"80": @{
      @"value": 0.8,
      @"name": @"RingOpacity80",
      @"category": @"ringOpacity",
      @"type": @"80"
      },
    @"85": @{
      @"value": 0.85,
      @"name": @"RingOpacity85",
      @"category": @"ringOpacity",
      @"type": @"85"
      },
    @"90": @{
      @"value": 0.9,
      @"name": @"RingOpacity90",
      @"category": @"ringOpacity",
      @"type": @"90"
      },
    @"95": @{
      @"value": 0.95,
      @"name": @"RingOpacity95",
      @"category": @"ringOpacity",
      @"type": @"95"
      },
    @"100": @{
      @"value": 1,
      @"name": @"RingOpacity100",
      @"category": @"ringOpacity",
      @"type": @"100"
      },
    @"DEFAULT": @{
      @"value": 0.5,
      @"name": @"RingOpacityDefault",
      @"category": @"ringOpacity",
      @"type": @"DEFAULT"
      }
    },
  @"ringWidth": @{
    @"0": @{
      @"value": 0px,
      @"name": @"RingWidth0",
      @"category": @"ringWidth",
      @"type": @"0"
      },
    @"1": @{
      @"value": 1px,
      @"name": @"RingWidth1",
      @"category": @"ringWidth",
      @"type": @"1"
      },
    @"2": @{
      @"value": 2px,
      @"name": @"RingWidth2",
      @"category": @"ringWidth",
      @"type": @"2"
      },
    @"4": @{
      @"value": 4px,
      @"name": @"RingWidth4",
      @"category": @"ringWidth",
      @"type": @"4"
      },
    @"8": @{
      @"value": 8px,
      @"name": @"RingWidth8",
      @"category": @"ringWidth",
      @"type": @"8"
      },
    @"DEFAULT": @{
      @"value": 3px,
      @"name": @"RingWidthDefault",
      @"category": @"ringWidth",
      @"type": @"DEFAULT"
      }
    },
  @"rotate": @{
    @"0": @{
      @"value": 0deg,
      @"name": @"Rotate0",
      @"category": @"rotate",
      @"type": @"0"
      },
    @"1": @{
      @"value": 1deg,
      @"name": @"Rotate1",
      @"category": @"rotate",
      @"type": @"1"
      },
    @"2": @{
      @"value": 2deg,
      @"name": @"Rotate2",
      @"category": @"rotate",
      @"type": @"2"
      },
    @"3": @{
      @"value": 3deg,
      @"name": @"Rotate3",
      @"category": @"rotate",
      @"type": @"3"
      },
    @"6": @{
      @"value": 6deg,
      @"name": @"Rotate6",
      @"category": @"rotate",
      @"type": @"6"
      },
    @"12": @{
      @"value": 12deg,
      @"name": @"Rotate12",
      @"category": @"rotate",
      @"type": @"12"
      },
    @"45": @{
      @"value": 45deg,
      @"name": @"Rotate45",
      @"category": @"rotate",
      @"type": @"45"
      },
    @"90": @{
      @"value": 90deg,
      @"name": @"Rotate90",
      @"category": @"rotate",
      @"type": @"90"
      },
    @"180": @{
      @"value": 180deg,
      @"name": @"Rotate180",
      @"category": @"rotate",
      @"type": @"180"
      }
    },
  @"saturate": @{
    @"0": @{
      @"value": 0,
      @"name": @"Saturate0",
      @"category": @"saturate",
      @"type": @"0"
      },
    @"50": @{
      @"value": .5,
      @"name": @"Saturate50",
      @"category": @"saturate",
      @"type": @"50"
      },
    @"100": @{
      @"value": 1,
      @"name": @"Saturate100",
      @"category": @"saturate",
      @"type": @"100"
      },
    @"150": @{
      @"value": 1.5,
      @"name": @"Saturate150",
      @"category": @"saturate",
      @"type": @"150"
      },
    @"200": @{
      @"value": 2,
      @"name": @"Saturate200",
      @"category": @"saturate",
      @"type": @"200"
      }
    },
  @"scale": @{
    @"0": @{
      @"value": 0,
      @"name": @"Scale0",
      @"category": @"scale",
      @"type": @"0"
      },
    @"50": @{
      @"value": .5,
      @"name": @"Scale50",
      @"category": @"scale",
      @"type": @"50"
      },
    @"75": @{
      @"value": .75,
      @"name": @"Scale75",
      @"category": @"scale",
      @"type": @"75"
      },
    @"90": @{
      @"value": .9,
      @"name": @"Scale90",
      @"category": @"scale",
      @"type": @"90"
      },
    @"95": @{
      @"value": .95,
      @"name": @"Scale95",
      @"category": @"scale",
      @"type": @"95"
      },
    @"100": @{
      @"value": 1,
      @"name": @"Scale100",
      @"category": @"scale",
      @"type": @"100"
      },
    @"105": @{
      @"value": 1.05,
      @"name": @"Scale105",
      @"category": @"scale",
      @"type": @"105"
      },
    @"110": @{
      @"value": 1.1,
      @"name": @"Scale110",
      @"category": @"scale",
      @"type": @"110"
      },
    @"125": @{
      @"value": 1.25,
      @"name": @"Scale125",
      @"category": @"scale",
      @"type": @"125"
      },
    @"150": @{
      @"value": 1.5,
      @"name": @"Scale150",
      @"category": @"scale",
      @"type": @"150"
      }
    },
  @"screens": @{
    @"sm": @{
      @"value": 640px,
      @"name": @"ScreensSm",
      @"category": @"screens",
      @"type": @"sm"
      },
    @"md": @{
      @"value": 768px,
      @"name": @"ScreensMd",
      @"category": @"screens",
      @"type": @"md"
      },
    @"lg": @{
      @"value": 1024px,
      @"name": @"ScreensLg",
      @"category": @"screens",
      @"type": @"lg"
      },
    @"xl": @{
      @"value": 1280px,
      @"name": @"ScreensXl",
      @"category": @"screens",
      @"type": @"xl"
      },
    @"2xl": @{
      @"value": 1536px,
      @"name": @"Screens2xl",
      @"category": @"screens",
      @"type": @"2xl"
      }
    },
  @"scrollMargin": @{
    @"0": @{
      @"value": 0px,
      @"name": @"ScrollMargin0",
      @"category": @"scrollMargin",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"ScrollMargin1",
      @"category": @"scrollMargin",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"ScrollMargin2",
      @"category": @"scrollMargin",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"ScrollMargin3",
      @"category": @"scrollMargin",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"ScrollMargin4",
      @"category": @"scrollMargin",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"ScrollMargin5",
      @"category": @"scrollMargin",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"ScrollMargin6",
      @"category": @"scrollMargin",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"ScrollMargin7",
      @"category": @"scrollMargin",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"ScrollMargin8",
      @"category": @"scrollMargin",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"ScrollMargin9",
      @"category": @"scrollMargin",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"ScrollMargin10",
      @"category": @"scrollMargin",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"ScrollMargin11",
      @"category": @"scrollMargin",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"ScrollMargin12",
      @"category": @"scrollMargin",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"ScrollMargin14",
      @"category": @"scrollMargin",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"ScrollMargin16",
      @"category": @"scrollMargin",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"ScrollMargin20",
      @"category": @"scrollMargin",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"ScrollMargin24",
      @"category": @"scrollMargin",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"ScrollMargin28",
      @"category": @"scrollMargin",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"ScrollMargin32",
      @"category": @"scrollMargin",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"ScrollMargin36",
      @"category": @"scrollMargin",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"ScrollMargin40",
      @"category": @"scrollMargin",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"ScrollMargin44",
      @"category": @"scrollMargin",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"ScrollMargin48",
      @"category": @"scrollMargin",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"ScrollMargin52",
      @"category": @"scrollMargin",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"ScrollMargin56",
      @"category": @"scrollMargin",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"ScrollMargin60",
      @"category": @"scrollMargin",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"ScrollMargin64",
      @"category": @"scrollMargin",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"ScrollMargin72",
      @"category": @"scrollMargin",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"ScrollMargin80",
      @"category": @"scrollMargin",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"ScrollMargin96",
      @"category": @"scrollMargin",
      @"type": @"96"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"ScrollMarginPx",
      @"category": @"scrollMargin",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"ScrollMargin05",
      @"category": @"scrollMargin",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"ScrollMargin15",
      @"category": @"scrollMargin",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"ScrollMargin25",
      @"category": @"scrollMargin",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"ScrollMargin35",
      @"category": @"scrollMargin",
      @"type": @"3.5"
      }
    },
  @"scrollPadding": @{
    @"0": @{
      @"value": 0px,
      @"name": @"ScrollPadding0",
      @"category": @"scrollPadding",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"ScrollPadding1",
      @"category": @"scrollPadding",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"ScrollPadding2",
      @"category": @"scrollPadding",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"ScrollPadding3",
      @"category": @"scrollPadding",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"ScrollPadding4",
      @"category": @"scrollPadding",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"ScrollPadding5",
      @"category": @"scrollPadding",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"ScrollPadding6",
      @"category": @"scrollPadding",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"ScrollPadding7",
      @"category": @"scrollPadding",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"ScrollPadding8",
      @"category": @"scrollPadding",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"ScrollPadding9",
      @"category": @"scrollPadding",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"ScrollPadding10",
      @"category": @"scrollPadding",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"ScrollPadding11",
      @"category": @"scrollPadding",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"ScrollPadding12",
      @"category": @"scrollPadding",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"ScrollPadding14",
      @"category": @"scrollPadding",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"ScrollPadding16",
      @"category": @"scrollPadding",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"ScrollPadding20",
      @"category": @"scrollPadding",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"ScrollPadding24",
      @"category": @"scrollPadding",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"ScrollPadding28",
      @"category": @"scrollPadding",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"ScrollPadding32",
      @"category": @"scrollPadding",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"ScrollPadding36",
      @"category": @"scrollPadding",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"ScrollPadding40",
      @"category": @"scrollPadding",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"ScrollPadding44",
      @"category": @"scrollPadding",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"ScrollPadding48",
      @"category": @"scrollPadding",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"ScrollPadding52",
      @"category": @"scrollPadding",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"ScrollPadding56",
      @"category": @"scrollPadding",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"ScrollPadding60",
      @"category": @"scrollPadding",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"ScrollPadding64",
      @"category": @"scrollPadding",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"ScrollPadding72",
      @"category": @"scrollPadding",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"ScrollPadding80",
      @"category": @"scrollPadding",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"ScrollPadding96",
      @"category": @"scrollPadding",
      @"type": @"96"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"ScrollPaddingPx",
      @"category": @"scrollPadding",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"ScrollPadding05",
      @"category": @"scrollPadding",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"ScrollPadding15",
      @"category": @"scrollPadding",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"ScrollPadding25",
      @"category": @"scrollPadding",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"ScrollPadding35",
      @"category": @"scrollPadding",
      @"type": @"3.5"
      }
    },
  @"sepia": @{
    @"0": @{
      @"value": 0,
      @"name": @"Sepia0",
      @"category": @"sepia",
      @"type": @"0"
      },
    @"DEFAULT": @{
      @"value": 100%,
      @"name": @"SepiaDefault",
      @"category": @"sepia",
      @"type": @"DEFAULT"
      }
    },
  @"skew": @{
    @"0": @{
      @"value": 0deg,
      @"name": @"Skew0",
      @"category": @"skew",
      @"type": @"0"
      },
    @"1": @{
      @"value": 1deg,
      @"name": @"Skew1",
      @"category": @"skew",
      @"type": @"1"
      },
    @"2": @{
      @"value": 2deg,
      @"name": @"Skew2",
      @"category": @"skew",
      @"type": @"2"
      },
    @"3": @{
      @"value": 3deg,
      @"name": @"Skew3",
      @"category": @"skew",
      @"type": @"3"
      },
    @"6": @{
      @"value": 6deg,
      @"name": @"Skew6",
      @"category": @"skew",
      @"type": @"6"
      },
    @"12": @{
      @"value": 12deg,
      @"name": @"Skew12",
      @"category": @"skew",
      @"type": @"12"
      }
    },
  @"space": @{
    @"0": @{
      @"value": 0px,
      @"name": @"Space0",
      @"category": @"space",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"Space1",
      @"category": @"space",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"Space2",
      @"category": @"space",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"Space3",
      @"category": @"space",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"Space4",
      @"category": @"space",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"Space5",
      @"category": @"space",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"Space6",
      @"category": @"space",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"Space7",
      @"category": @"space",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"Space8",
      @"category": @"space",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"Space9",
      @"category": @"space",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"Space10",
      @"category": @"space",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"Space11",
      @"category": @"space",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"Space12",
      @"category": @"space",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"Space14",
      @"category": @"space",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"Space16",
      @"category": @"space",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"Space20",
      @"category": @"space",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"Space24",
      @"category": @"space",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"Space28",
      @"category": @"space",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"Space32",
      @"category": @"space",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"Space36",
      @"category": @"space",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"Space40",
      @"category": @"space",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"Space44",
      @"category": @"space",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"Space48",
      @"category": @"space",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"Space52",
      @"category": @"space",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"Space56",
      @"category": @"space",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"Space60",
      @"category": @"space",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"Space64",
      @"category": @"space",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"Space72",
      @"category": @"space",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"Space80",
      @"category": @"space",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"Space96",
      @"category": @"space",
      @"type": @"96"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"SpacePx",
      @"category": @"space",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"Space05",
      @"category": @"space",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"Space15",
      @"category": @"space",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"Space25",
      @"category": @"space",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"Space35",
      @"category": @"space",
      @"type": @"3.5"
      }
    },
  @"spacing": @{
    @"0": @{
      @"value": 0px,
      @"name": @"Spacing0",
      @"category": @"spacing",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"Spacing1",
      @"category": @"spacing",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"Spacing2",
      @"category": @"spacing",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"Spacing3",
      @"category": @"spacing",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"Spacing4",
      @"category": @"spacing",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"Spacing5",
      @"category": @"spacing",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"Spacing6",
      @"category": @"spacing",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"Spacing7",
      @"category": @"spacing",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"Spacing8",
      @"category": @"spacing",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"Spacing9",
      @"category": @"spacing",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"Spacing10",
      @"category": @"spacing",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"Spacing11",
      @"category": @"spacing",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"Spacing12",
      @"category": @"spacing",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"Spacing14",
      @"category": @"spacing",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"Spacing16",
      @"category": @"spacing",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"Spacing20",
      @"category": @"spacing",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"Spacing24",
      @"category": @"spacing",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"Spacing28",
      @"category": @"spacing",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"Spacing32",
      @"category": @"spacing",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"Spacing36",
      @"category": @"spacing",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"Spacing40",
      @"category": @"spacing",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"Spacing44",
      @"category": @"spacing",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"Spacing48",
      @"category": @"spacing",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"Spacing52",
      @"category": @"spacing",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"Spacing56",
      @"category": @"spacing",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"Spacing60",
      @"category": @"spacing",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"Spacing64",
      @"category": @"spacing",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"Spacing72",
      @"category": @"spacing",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"Spacing80",
      @"category": @"spacing",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"Spacing96",
      @"category": @"spacing",
      @"type": @"96"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"SpacingPx",
      @"category": @"spacing",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"Spacing05",
      @"category": @"spacing",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"Spacing15",
      @"category": @"spacing",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"Spacing25",
      @"category": @"spacing",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"Spacing35",
      @"category": @"spacing",
      @"type": @"3.5"
      }
    },
  @"stroke": @{
    @"none": @{
      @"value": none,
      @"name": @"StrokeNone",
      @"category": @"stroke",
      @"type": @"none"
      },
    @"inherit": @{
      @"value": inherit,
      @"name": @"StrokeInherit",
      @"category": @"stroke",
      @"type": @"inherit"
      },
    @"current": @{
      @"value": currentColor,
      @"name": @"StrokeCurrent",
      @"category": @"stroke",
      @"type": @"current"
      },
    @"transparent": @{
      @"value": transparent,
      @"name": @"StrokeTransparent",
      @"category": @"stroke",
      @"type": @"transparent"
      },
    @"black": @{
      @"value": #000,
      @"name": @"StrokeBlack",
      @"category": @"stroke",
      @"type": @"black"
      },
    @"white": @{
      @"value": #fff,
      @"name": @"StrokeWhite",
      @"category": @"stroke",
      @"type": @"white"
      },
    @"slate": @{
      @"50": @{
        @"value": #f8fafc,
        @"name": @"StrokeSlate50",
        @"category": @"stroke",
        @"type": @"slate",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f1f5f9,
        @"name": @"StrokeSlate100",
        @"category": @"stroke",
        @"type": @"slate",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e2e8f0,
        @"name": @"StrokeSlate200",
        @"category": @"stroke",
        @"type": @"slate",
        @"item": @"200"
        },
      @"300": @{
        @"value": #cbd5e1,
        @"name": @"StrokeSlate300",
        @"category": @"stroke",
        @"type": @"slate",
        @"item": @"300"
        },
      @"400": @{
        @"value": #94a3b8,
        @"name": @"StrokeSlate400",
        @"category": @"stroke",
        @"type": @"slate",
        @"item": @"400"
        },
      @"500": @{
        @"value": #64748b,
        @"name": @"StrokeSlate500",
        @"category": @"stroke",
        @"type": @"slate",
        @"item": @"500"
        },
      @"600": @{
        @"value": #475569,
        @"name": @"StrokeSlate600",
        @"category": @"stroke",
        @"type": @"slate",
        @"item": @"600"
        },
      @"700": @{
        @"value": #334155,
        @"name": @"StrokeSlate700",
        @"category": @"stroke",
        @"type": @"slate",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e293b,
        @"name": @"StrokeSlate800",
        @"category": @"stroke",
        @"type": @"slate",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0f172a,
        @"name": @"StrokeSlate900",
        @"category": @"stroke",
        @"type": @"slate",
        @"item": @"900"
        },
      @"950": @{
        @"value": #020617,
        @"name": @"StrokeSlate950",
        @"category": @"stroke",
        @"type": @"slate",
        @"item": @"950"
        }
      },
    @"gray": @{
      @"50": @{
        @"value": #f9fafb,
        @"name": @"StrokeGray50",
        @"category": @"stroke",
        @"type": @"gray",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3f4f6,
        @"name": @"StrokeGray100",
        @"category": @"stroke",
        @"type": @"gray",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e7eb,
        @"name": @"StrokeGray200",
        @"category": @"stroke",
        @"type": @"gray",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d1d5db,
        @"name": @"StrokeGray300",
        @"category": @"stroke",
        @"type": @"gray",
        @"item": @"300"
        },
      @"400": @{
        @"value": #9ca3af,
        @"name": @"StrokeGray400",
        @"category": @"stroke",
        @"type": @"gray",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6b7280,
        @"name": @"StrokeGray500",
        @"category": @"stroke",
        @"type": @"gray",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4b5563,
        @"name": @"StrokeGray600",
        @"category": @"stroke",
        @"type": @"gray",
        @"item": @"600"
        },
      @"700": @{
        @"value": #374151,
        @"name": @"StrokeGray700",
        @"category": @"stroke",
        @"type": @"gray",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1f2937,
        @"name": @"StrokeGray800",
        @"category": @"stroke",
        @"type": @"gray",
        @"item": @"800"
        },
      @"900": @{
        @"value": #111827,
        @"name": @"StrokeGray900",
        @"category": @"stroke",
        @"type": @"gray",
        @"item": @"900"
        },
      @"950": @{
        @"value": #030712,
        @"name": @"StrokeGray950",
        @"category": @"stroke",
        @"type": @"gray",
        @"item": @"950"
        }
      },
    @"zinc": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"StrokeZinc50",
        @"category": @"stroke",
        @"type": @"zinc",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f4f4f5,
        @"name": @"StrokeZinc100",
        @"category": @"stroke",
        @"type": @"zinc",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e4e4e7,
        @"name": @"StrokeZinc200",
        @"category": @"stroke",
        @"type": @"zinc",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d8,
        @"name": @"StrokeZinc300",
        @"category": @"stroke",
        @"type": @"zinc",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a1a1aa,
        @"name": @"StrokeZinc400",
        @"category": @"stroke",
        @"type": @"zinc",
        @"item": @"400"
        },
      @"500": @{
        @"value": #71717a,
        @"name": @"StrokeZinc500",
        @"category": @"stroke",
        @"type": @"zinc",
        @"item": @"500"
        },
      @"600": @{
        @"value": #52525b,
        @"name": @"StrokeZinc600",
        @"category": @"stroke",
        @"type": @"zinc",
        @"item": @"600"
        },
      @"700": @{
        @"value": #3f3f46,
        @"name": @"StrokeZinc700",
        @"category": @"stroke",
        @"type": @"zinc",
        @"item": @"700"
        },
      @"800": @{
        @"value": #27272a,
        @"name": @"StrokeZinc800",
        @"category": @"stroke",
        @"type": @"zinc",
        @"item": @"800"
        },
      @"900": @{
        @"value": #18181b,
        @"name": @"StrokeZinc900",
        @"category": @"stroke",
        @"type": @"zinc",
        @"item": @"900"
        },
      @"950": @{
        @"value": #09090b,
        @"name": @"StrokeZinc950",
        @"category": @"stroke",
        @"type": @"zinc",
        @"item": @"950"
        }
      },
    @"neutral": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"StrokeNeutral50",
        @"category": @"stroke",
        @"type": @"neutral",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f5,
        @"name": @"StrokeNeutral100",
        @"category": @"stroke",
        @"type": @"neutral",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e5e5,
        @"name": @"StrokeNeutral200",
        @"category": @"stroke",
        @"type": @"neutral",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d4,
        @"name": @"StrokeNeutral300",
        @"category": @"stroke",
        @"type": @"neutral",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3a3a3,
        @"name": @"StrokeNeutral400",
        @"category": @"stroke",
        @"type": @"neutral",
        @"item": @"400"
        },
      @"500": @{
        @"value": #737373,
        @"name": @"StrokeNeutral500",
        @"category": @"stroke",
        @"type": @"neutral",
        @"item": @"500"
        },
      @"600": @{
        @"value": #525252,
        @"name": @"StrokeNeutral600",
        @"category": @"stroke",
        @"type": @"neutral",
        @"item": @"600"
        },
      @"700": @{
        @"value": #404040,
        @"name": @"StrokeNeutral700",
        @"category": @"stroke",
        @"type": @"neutral",
        @"item": @"700"
        },
      @"800": @{
        @"value": #262626,
        @"name": @"StrokeNeutral800",
        @"category": @"stroke",
        @"type": @"neutral",
        @"item": @"800"
        },
      @"900": @{
        @"value": #171717,
        @"name": @"StrokeNeutral900",
        @"category": @"stroke",
        @"type": @"neutral",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0a0a0a,
        @"name": @"StrokeNeutral950",
        @"category": @"stroke",
        @"type": @"neutral",
        @"item": @"950"
        }
      },
    @"stone": @{
      @"50": @{
        @"value": #fafaf9,
        @"name": @"StrokeStone50",
        @"category": @"stroke",
        @"type": @"stone",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f4,
        @"name": @"StrokeStone100",
        @"category": @"stroke",
        @"type": @"stone",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e7e5e4,
        @"name": @"StrokeStone200",
        @"category": @"stroke",
        @"type": @"stone",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d6d3d1,
        @"name": @"StrokeStone300",
        @"category": @"stroke",
        @"type": @"stone",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a8a29e,
        @"name": @"StrokeStone400",
        @"category": @"stroke",
        @"type": @"stone",
        @"item": @"400"
        },
      @"500": @{
        @"value": #78716c,
        @"name": @"StrokeStone500",
        @"category": @"stroke",
        @"type": @"stone",
        @"item": @"500"
        },
      @"600": @{
        @"value": #57534e,
        @"name": @"StrokeStone600",
        @"category": @"stroke",
        @"type": @"stone",
        @"item": @"600"
        },
      @"700": @{
        @"value": #44403c,
        @"name": @"StrokeStone700",
        @"category": @"stroke",
        @"type": @"stone",
        @"item": @"700"
        },
      @"800": @{
        @"value": #292524,
        @"name": @"StrokeStone800",
        @"category": @"stroke",
        @"type": @"stone",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1c1917,
        @"name": @"StrokeStone900",
        @"category": @"stroke",
        @"type": @"stone",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0c0a09,
        @"name": @"StrokeStone950",
        @"category": @"stroke",
        @"type": @"stone",
        @"item": @"950"
        }
      },
    @"red": @{
      @"50": @{
        @"value": #fef2f2,
        @"name": @"StrokeRed50",
        @"category": @"stroke",
        @"type": @"red",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fee2e2,
        @"name": @"StrokeRed100",
        @"category": @"stroke",
        @"type": @"red",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecaca,
        @"name": @"StrokeRed200",
        @"category": @"stroke",
        @"type": @"red",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fca5a5,
        @"name": @"StrokeRed300",
        @"category": @"stroke",
        @"type": @"red",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f87171,
        @"name": @"StrokeRed400",
        @"category": @"stroke",
        @"type": @"red",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ef4444,
        @"name": @"StrokeRed500",
        @"category": @"stroke",
        @"type": @"red",
        @"item": @"500"
        },
      @"600": @{
        @"value": #dc2626,
        @"name": @"StrokeRed600",
        @"category": @"stroke",
        @"type": @"red",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b91c1c,
        @"name": @"StrokeRed700",
        @"category": @"stroke",
        @"type": @"red",
        @"item": @"700"
        },
      @"800": @{
        @"value": #991b1b,
        @"name": @"StrokeRed800",
        @"category": @"stroke",
        @"type": @"red",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7f1d1d,
        @"name": @"StrokeRed900",
        @"category": @"stroke",
        @"type": @"red",
        @"item": @"900"
        },
      @"950": @{
        @"value": #450a0a,
        @"name": @"StrokeRed950",
        @"category": @"stroke",
        @"type": @"red",
        @"item": @"950"
        }
      },
    @"orange": @{
      @"50": @{
        @"value": #fff7ed,
        @"name": @"StrokeOrange50",
        @"category": @"stroke",
        @"type": @"orange",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffedd5,
        @"name": @"StrokeOrange100",
        @"category": @"stroke",
        @"type": @"orange",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fed7aa,
        @"name": @"StrokeOrange200",
        @"category": @"stroke",
        @"type": @"orange",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fdba74,
        @"name": @"StrokeOrange300",
        @"category": @"stroke",
        @"type": @"orange",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb923c,
        @"name": @"StrokeOrange400",
        @"category": @"stroke",
        @"type": @"orange",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f97316,
        @"name": @"StrokeOrange500",
        @"category": @"stroke",
        @"type": @"orange",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ea580c,
        @"name": @"StrokeOrange600",
        @"category": @"stroke",
        @"type": @"orange",
        @"item": @"600"
        },
      @"700": @{
        @"value": #c2410c,
        @"name": @"StrokeOrange700",
        @"category": @"stroke",
        @"type": @"orange",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9a3412,
        @"name": @"StrokeOrange800",
        @"category": @"stroke",
        @"type": @"orange",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7c2d12,
        @"name": @"StrokeOrange900",
        @"category": @"stroke",
        @"type": @"orange",
        @"item": @"900"
        },
      @"950": @{
        @"value": #431407,
        @"name": @"StrokeOrange950",
        @"category": @"stroke",
        @"type": @"orange",
        @"item": @"950"
        }
      },
    @"amber": @{
      @"50": @{
        @"value": #fffbeb,
        @"name": @"StrokeAmber50",
        @"category": @"stroke",
        @"type": @"amber",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef3c7,
        @"name": @"StrokeAmber100",
        @"category": @"stroke",
        @"type": @"amber",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fde68a,
        @"name": @"StrokeAmber200",
        @"category": @"stroke",
        @"type": @"amber",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fcd34d,
        @"name": @"StrokeAmber300",
        @"category": @"stroke",
        @"type": @"amber",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fbbf24,
        @"name": @"StrokeAmber400",
        @"category": @"stroke",
        @"type": @"amber",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f59e0b,
        @"name": @"StrokeAmber500",
        @"category": @"stroke",
        @"type": @"amber",
        @"item": @"500"
        },
      @"600": @{
        @"value": #d97706,
        @"name": @"StrokeAmber600",
        @"category": @"stroke",
        @"type": @"amber",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b45309,
        @"name": @"StrokeAmber700",
        @"category": @"stroke",
        @"type": @"amber",
        @"item": @"700"
        },
      @"800": @{
        @"value": #92400e,
        @"name": @"StrokeAmber800",
        @"category": @"stroke",
        @"type": @"amber",
        @"item": @"800"
        },
      @"900": @{
        @"value": #78350f,
        @"name": @"StrokeAmber900",
        @"category": @"stroke",
        @"type": @"amber",
        @"item": @"900"
        },
      @"950": @{
        @"value": #451a03,
        @"name": @"StrokeAmber950",
        @"category": @"stroke",
        @"type": @"amber",
        @"item": @"950"
        }
      },
    @"yellow": @{
      @"50": @{
        @"value": #fefce8,
        @"name": @"StrokeYellow50",
        @"category": @"stroke",
        @"type": @"yellow",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef9c3,
        @"name": @"StrokeYellow100",
        @"category": @"stroke",
        @"type": @"yellow",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fef08a,
        @"name": @"StrokeYellow200",
        @"category": @"stroke",
        @"type": @"yellow",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fde047,
        @"name": @"StrokeYellow300",
        @"category": @"stroke",
        @"type": @"yellow",
        @"item": @"300"
        },
      @"400": @{
        @"value": #facc15,
        @"name": @"StrokeYellow400",
        @"category": @"stroke",
        @"type": @"yellow",
        @"item": @"400"
        },
      @"500": @{
        @"value": #eab308,
        @"name": @"StrokeYellow500",
        @"category": @"stroke",
        @"type": @"yellow",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ca8a04,
        @"name": @"StrokeYellow600",
        @"category": @"stroke",
        @"type": @"yellow",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a16207,
        @"name": @"StrokeYellow700",
        @"category": @"stroke",
        @"type": @"yellow",
        @"item": @"700"
        },
      @"800": @{
        @"value": #854d0e,
        @"name": @"StrokeYellow800",
        @"category": @"stroke",
        @"type": @"yellow",
        @"item": @"800"
        },
      @"900": @{
        @"value": #713f12,
        @"name": @"StrokeYellow900",
        @"category": @"stroke",
        @"type": @"yellow",
        @"item": @"900"
        },
      @"950": @{
        @"value": #422006,
        @"name": @"StrokeYellow950",
        @"category": @"stroke",
        @"type": @"yellow",
        @"item": @"950"
        }
      },
    @"lime": @{
      @"50": @{
        @"value": #f7fee7,
        @"name": @"StrokeLime50",
        @"category": @"stroke",
        @"type": @"lime",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ecfccb,
        @"name": @"StrokeLime100",
        @"category": @"stroke",
        @"type": @"lime",
        @"item": @"100"
        },
      @"200": @{
        @"value": #d9f99d,
        @"name": @"StrokeLime200",
        @"category": @"stroke",
        @"type": @"lime",
        @"item": @"200"
        },
      @"300": @{
        @"value": #bef264,
        @"name": @"StrokeLime300",
        @"category": @"stroke",
        @"type": @"lime",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3e635,
        @"name": @"StrokeLime400",
        @"category": @"stroke",
        @"type": @"lime",
        @"item": @"400"
        },
      @"500": @{
        @"value": #84cc16,
        @"name": @"StrokeLime500",
        @"category": @"stroke",
        @"type": @"lime",
        @"item": @"500"
        },
      @"600": @{
        @"value": #65a30d,
        @"name": @"StrokeLime600",
        @"category": @"stroke",
        @"type": @"lime",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4d7c0f,
        @"name": @"StrokeLime700",
        @"category": @"stroke",
        @"type": @"lime",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3f6212,
        @"name": @"StrokeLime800",
        @"category": @"stroke",
        @"type": @"lime",
        @"item": @"800"
        },
      @"900": @{
        @"value": #365314,
        @"name": @"StrokeLime900",
        @"category": @"stroke",
        @"type": @"lime",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1a2e05,
        @"name": @"StrokeLime950",
        @"category": @"stroke",
        @"type": @"lime",
        @"item": @"950"
        }
      },
    @"green": @{
      @"50": @{
        @"value": #f0fdf4,
        @"name": @"StrokeGreen50",
        @"category": @"stroke",
        @"type": @"green",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dcfce7,
        @"name": @"StrokeGreen100",
        @"category": @"stroke",
        @"type": @"green",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bbf7d0,
        @"name": @"StrokeGreen200",
        @"category": @"stroke",
        @"type": @"green",
        @"item": @"200"
        },
      @"300": @{
        @"value": #86efac,
        @"name": @"StrokeGreen300",
        @"category": @"stroke",
        @"type": @"green",
        @"item": @"300"
        },
      @"400": @{
        @"value": #4ade80,
        @"name": @"StrokeGreen400",
        @"category": @"stroke",
        @"type": @"green",
        @"item": @"400"
        },
      @"500": @{
        @"value": #22c55e,
        @"name": @"StrokeGreen500",
        @"category": @"stroke",
        @"type": @"green",
        @"item": @"500"
        },
      @"600": @{
        @"value": #16a34a,
        @"name": @"StrokeGreen600",
        @"category": @"stroke",
        @"type": @"green",
        @"item": @"600"
        },
      @"700": @{
        @"value": #15803d,
        @"name": @"StrokeGreen700",
        @"category": @"stroke",
        @"type": @"green",
        @"item": @"700"
        },
      @"800": @{
        @"value": #166534,
        @"name": @"StrokeGreen800",
        @"category": @"stroke",
        @"type": @"green",
        @"item": @"800"
        },
      @"900": @{
        @"value": #14532d,
        @"name": @"StrokeGreen900",
        @"category": @"stroke",
        @"type": @"green",
        @"item": @"900"
        },
      @"950": @{
        @"value": #052e16,
        @"name": @"StrokeGreen950",
        @"category": @"stroke",
        @"type": @"green",
        @"item": @"950"
        }
      },
    @"emerald": @{
      @"50": @{
        @"value": #ecfdf5,
        @"name": @"StrokeEmerald50",
        @"category": @"stroke",
        @"type": @"emerald",
        @"item": @"50"
        },
      @"100": @{
        @"value": #d1fae5,
        @"name": @"StrokeEmerald100",
        @"category": @"stroke",
        @"type": @"emerald",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a7f3d0,
        @"name": @"StrokeEmerald200",
        @"category": @"stroke",
        @"type": @"emerald",
        @"item": @"200"
        },
      @"300": @{
        @"value": #6ee7b7,
        @"name": @"StrokeEmerald300",
        @"category": @"stroke",
        @"type": @"emerald",
        @"item": @"300"
        },
      @"400": @{
        @"value": #34d399,
        @"name": @"StrokeEmerald400",
        @"category": @"stroke",
        @"type": @"emerald",
        @"item": @"400"
        },
      @"500": @{
        @"value": #10b981,
        @"name": @"StrokeEmerald500",
        @"category": @"stroke",
        @"type": @"emerald",
        @"item": @"500"
        },
      @"600": @{
        @"value": #059669,
        @"name": @"StrokeEmerald600",
        @"category": @"stroke",
        @"type": @"emerald",
        @"item": @"600"
        },
      @"700": @{
        @"value": #047857,
        @"name": @"StrokeEmerald700",
        @"category": @"stroke",
        @"type": @"emerald",
        @"item": @"700"
        },
      @"800": @{
        @"value": #065f46,
        @"name": @"StrokeEmerald800",
        @"category": @"stroke",
        @"type": @"emerald",
        @"item": @"800"
        },
      @"900": @{
        @"value": #064e3b,
        @"name": @"StrokeEmerald900",
        @"category": @"stroke",
        @"type": @"emerald",
        @"item": @"900"
        },
      @"950": @{
        @"value": #022c22,
        @"name": @"StrokeEmerald950",
        @"category": @"stroke",
        @"type": @"emerald",
        @"item": @"950"
        }
      },
    @"teal": @{
      @"50": @{
        @"value": #f0fdfa,
        @"name": @"StrokeTeal50",
        @"category": @"stroke",
        @"type": @"teal",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ccfbf1,
        @"name": @"StrokeTeal100",
        @"category": @"stroke",
        @"type": @"teal",
        @"item": @"100"
        },
      @"200": @{
        @"value": #99f6e4,
        @"name": @"StrokeTeal200",
        @"category": @"stroke",
        @"type": @"teal",
        @"item": @"200"
        },
      @"300": @{
        @"value": #5eead4,
        @"name": @"StrokeTeal300",
        @"category": @"stroke",
        @"type": @"teal",
        @"item": @"300"
        },
      @"400": @{
        @"value": #2dd4bf,
        @"name": @"StrokeTeal400",
        @"category": @"stroke",
        @"type": @"teal",
        @"item": @"400"
        },
      @"500": @{
        @"value": #14b8a6,
        @"name": @"StrokeTeal500",
        @"category": @"stroke",
        @"type": @"teal",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0d9488,
        @"name": @"StrokeTeal600",
        @"category": @"stroke",
        @"type": @"teal",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0f766e,
        @"name": @"StrokeTeal700",
        @"category": @"stroke",
        @"type": @"teal",
        @"item": @"700"
        },
      @"800": @{
        @"value": #115e59,
        @"name": @"StrokeTeal800",
        @"category": @"stroke",
        @"type": @"teal",
        @"item": @"800"
        },
      @"900": @{
        @"value": #134e4a,
        @"name": @"StrokeTeal900",
        @"category": @"stroke",
        @"type": @"teal",
        @"item": @"900"
        },
      @"950": @{
        @"value": #042f2e,
        @"name": @"StrokeTeal950",
        @"category": @"stroke",
        @"type": @"teal",
        @"item": @"950"
        }
      },
    @"cyan": @{
      @"50": @{
        @"value": #ecfeff,
        @"name": @"StrokeCyan50",
        @"category": @"stroke",
        @"type": @"cyan",
        @"item": @"50"
        },
      @"100": @{
        @"value": #cffafe,
        @"name": @"StrokeCyan100",
        @"category": @"stroke",
        @"type": @"cyan",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a5f3fc,
        @"name": @"StrokeCyan200",
        @"category": @"stroke",
        @"type": @"cyan",
        @"item": @"200"
        },
      @"300": @{
        @"value": #67e8f9,
        @"name": @"StrokeCyan300",
        @"category": @"stroke",
        @"type": @"cyan",
        @"item": @"300"
        },
      @"400": @{
        @"value": #22d3ee,
        @"name": @"StrokeCyan400",
        @"category": @"stroke",
        @"type": @"cyan",
        @"item": @"400"
        },
      @"500": @{
        @"value": #06b6d4,
        @"name": @"StrokeCyan500",
        @"category": @"stroke",
        @"type": @"cyan",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0891b2,
        @"name": @"StrokeCyan600",
        @"category": @"stroke",
        @"type": @"cyan",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0e7490,
        @"name": @"StrokeCyan700",
        @"category": @"stroke",
        @"type": @"cyan",
        @"item": @"700"
        },
      @"800": @{
        @"value": #155e75,
        @"name": @"StrokeCyan800",
        @"category": @"stroke",
        @"type": @"cyan",
        @"item": @"800"
        },
      @"900": @{
        @"value": #164e63,
        @"name": @"StrokeCyan900",
        @"category": @"stroke",
        @"type": @"cyan",
        @"item": @"900"
        },
      @"950": @{
        @"value": #083344,
        @"name": @"StrokeCyan950",
        @"category": @"stroke",
        @"type": @"cyan",
        @"item": @"950"
        }
      },
    @"sky": @{
      @"50": @{
        @"value": #f0f9ff,
        @"name": @"StrokeSky50",
        @"category": @"stroke",
        @"type": @"sky",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0f2fe,
        @"name": @"StrokeSky100",
        @"category": @"stroke",
        @"type": @"sky",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bae6fd,
        @"name": @"StrokeSky200",
        @"category": @"stroke",
        @"type": @"sky",
        @"item": @"200"
        },
      @"300": @{
        @"value": #7dd3fc,
        @"name": @"StrokeSky300",
        @"category": @"stroke",
        @"type": @"sky",
        @"item": @"300"
        },
      @"400": @{
        @"value": #38bdf8,
        @"name": @"StrokeSky400",
        @"category": @"stroke",
        @"type": @"sky",
        @"item": @"400"
        },
      @"500": @{
        @"value": #0ea5e9,
        @"name": @"StrokeSky500",
        @"category": @"stroke",
        @"type": @"sky",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0284c7,
        @"name": @"StrokeSky600",
        @"category": @"stroke",
        @"type": @"sky",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0369a1,
        @"name": @"StrokeSky700",
        @"category": @"stroke",
        @"type": @"sky",
        @"item": @"700"
        },
      @"800": @{
        @"value": #075985,
        @"name": @"StrokeSky800",
        @"category": @"stroke",
        @"type": @"sky",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0c4a6e,
        @"name": @"StrokeSky900",
        @"category": @"stroke",
        @"type": @"sky",
        @"item": @"900"
        },
      @"950": @{
        @"value": #082f49,
        @"name": @"StrokeSky950",
        @"category": @"stroke",
        @"type": @"sky",
        @"item": @"950"
        }
      },
    @"blue": @{
      @"50": @{
        @"value": #eff6ff,
        @"name": @"StrokeBlue50",
        @"category": @"stroke",
        @"type": @"blue",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dbeafe,
        @"name": @"StrokeBlue100",
        @"category": @"stroke",
        @"type": @"blue",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bfdbfe,
        @"name": @"StrokeBlue200",
        @"category": @"stroke",
        @"type": @"blue",
        @"item": @"200"
        },
      @"300": @{
        @"value": #93c5fd,
        @"name": @"StrokeBlue300",
        @"category": @"stroke",
        @"type": @"blue",
        @"item": @"300"
        },
      @"400": @{
        @"value": #60a5fa,
        @"name": @"StrokeBlue400",
        @"category": @"stroke",
        @"type": @"blue",
        @"item": @"400"
        },
      @"500": @{
        @"value": #3b82f6,
        @"name": @"StrokeBlue500",
        @"category": @"stroke",
        @"type": @"blue",
        @"item": @"500"
        },
      @"600": @{
        @"value": #2563eb,
        @"name": @"StrokeBlue600",
        @"category": @"stroke",
        @"type": @"blue",
        @"item": @"600"
        },
      @"700": @{
        @"value": #1d4ed8,
        @"name": @"StrokeBlue700",
        @"category": @"stroke",
        @"type": @"blue",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e40af,
        @"name": @"StrokeBlue800",
        @"category": @"stroke",
        @"type": @"blue",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1e3a8a,
        @"name": @"StrokeBlue900",
        @"category": @"stroke",
        @"type": @"blue",
        @"item": @"900"
        },
      @"950": @{
        @"value": #172554,
        @"name": @"StrokeBlue950",
        @"category": @"stroke",
        @"type": @"blue",
        @"item": @"950"
        }
      },
    @"indigo": @{
      @"50": @{
        @"value": #eef2ff,
        @"name": @"StrokeIndigo50",
        @"category": @"stroke",
        @"type": @"indigo",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0e7ff,
        @"name": @"StrokeIndigo100",
        @"category": @"stroke",
        @"type": @"indigo",
        @"item": @"100"
        },
      @"200": @{
        @"value": #c7d2fe,
        @"name": @"StrokeIndigo200",
        @"category": @"stroke",
        @"type": @"indigo",
        @"item": @"200"
        },
      @"300": @{
        @"value": #a5b4fc,
        @"name": @"StrokeIndigo300",
        @"category": @"stroke",
        @"type": @"indigo",
        @"item": @"300"
        },
      @"400": @{
        @"value": #818cf8,
        @"name": @"StrokeIndigo400",
        @"category": @"stroke",
        @"type": @"indigo",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6366f1,
        @"name": @"StrokeIndigo500",
        @"category": @"stroke",
        @"type": @"indigo",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4f46e5,
        @"name": @"StrokeIndigo600",
        @"category": @"stroke",
        @"type": @"indigo",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4338ca,
        @"name": @"StrokeIndigo700",
        @"category": @"stroke",
        @"type": @"indigo",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3730a3,
        @"name": @"StrokeIndigo800",
        @"category": @"stroke",
        @"type": @"indigo",
        @"item": @"800"
        },
      @"900": @{
        @"value": #312e81,
        @"name": @"StrokeIndigo900",
        @"category": @"stroke",
        @"type": @"indigo",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1e1b4b,
        @"name": @"StrokeIndigo950",
        @"category": @"stroke",
        @"type": @"indigo",
        @"item": @"950"
        }
      },
    @"violet": @{
      @"50": @{
        @"value": #f5f3ff,
        @"name": @"StrokeViolet50",
        @"category": @"stroke",
        @"type": @"violet",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ede9fe,
        @"name": @"StrokeViolet100",
        @"category": @"stroke",
        @"type": @"violet",
        @"item": @"100"
        },
      @"200": @{
        @"value": #ddd6fe,
        @"name": @"StrokeViolet200",
        @"category": @"stroke",
        @"type": @"violet",
        @"item": @"200"
        },
      @"300": @{
        @"value": #c4b5fd,
        @"name": @"StrokeViolet300",
        @"category": @"stroke",
        @"type": @"violet",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a78bfa,
        @"name": @"StrokeViolet400",
        @"category": @"stroke",
        @"type": @"violet",
        @"item": @"400"
        },
      @"500": @{
        @"value": #8b5cf6,
        @"name": @"StrokeViolet500",
        @"category": @"stroke",
        @"type": @"violet",
        @"item": @"500"
        },
      @"600": @{
        @"value": #7c3aed,
        @"name": @"StrokeViolet600",
        @"category": @"stroke",
        @"type": @"violet",
        @"item": @"600"
        },
      @"700": @{
        @"value": #6d28d9,
        @"name": @"StrokeViolet700",
        @"category": @"stroke",
        @"type": @"violet",
        @"item": @"700"
        },
      @"800": @{
        @"value": #5b21b6,
        @"name": @"StrokeViolet800",
        @"category": @"stroke",
        @"type": @"violet",
        @"item": @"800"
        },
      @"900": @{
        @"value": #4c1d95,
        @"name": @"StrokeViolet900",
        @"category": @"stroke",
        @"type": @"violet",
        @"item": @"900"
        },
      @"950": @{
        @"value": #2e1065,
        @"name": @"StrokeViolet950",
        @"category": @"stroke",
        @"type": @"violet",
        @"item": @"950"
        }
      },
    @"purple": @{
      @"50": @{
        @"value": #faf5ff,
        @"name": @"StrokePurple50",
        @"category": @"stroke",
        @"type": @"purple",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3e8ff,
        @"name": @"StrokePurple100",
        @"category": @"stroke",
        @"type": @"purple",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e9d5ff,
        @"name": @"StrokePurple200",
        @"category": @"stroke",
        @"type": @"purple",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d8b4fe,
        @"name": @"StrokePurple300",
        @"category": @"stroke",
        @"type": @"purple",
        @"item": @"300"
        },
      @"400": @{
        @"value": #c084fc,
        @"name": @"StrokePurple400",
        @"category": @"stroke",
        @"type": @"purple",
        @"item": @"400"
        },
      @"500": @{
        @"value": #a855f7,
        @"name": @"StrokePurple500",
        @"category": @"stroke",
        @"type": @"purple",
        @"item": @"500"
        },
      @"600": @{
        @"value": #9333ea,
        @"name": @"StrokePurple600",
        @"category": @"stroke",
        @"type": @"purple",
        @"item": @"600"
        },
      @"700": @{
        @"value": #7e22ce,
        @"name": @"StrokePurple700",
        @"category": @"stroke",
        @"type": @"purple",
        @"item": @"700"
        },
      @"800": @{
        @"value": #6b21a8,
        @"name": @"StrokePurple800",
        @"category": @"stroke",
        @"type": @"purple",
        @"item": @"800"
        },
      @"900": @{
        @"value": #581c87,
        @"name": @"StrokePurple900",
        @"category": @"stroke",
        @"type": @"purple",
        @"item": @"900"
        },
      @"950": @{
        @"value": #3b0764,
        @"name": @"StrokePurple950",
        @"category": @"stroke",
        @"type": @"purple",
        @"item": @"950"
        }
      },
    @"fuchsia": @{
      @"50": @{
        @"value": #fdf4ff,
        @"name": @"StrokeFuchsia50",
        @"category": @"stroke",
        @"type": @"fuchsia",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fae8ff,
        @"name": @"StrokeFuchsia100",
        @"category": @"stroke",
        @"type": @"fuchsia",
        @"item": @"100"
        },
      @"200": @{
        @"value": #f5d0fe,
        @"name": @"StrokeFuchsia200",
        @"category": @"stroke",
        @"type": @"fuchsia",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f0abfc,
        @"name": @"StrokeFuchsia300",
        @"category": @"stroke",
        @"type": @"fuchsia",
        @"item": @"300"
        },
      @"400": @{
        @"value": #e879f9,
        @"name": @"StrokeFuchsia400",
        @"category": @"stroke",
        @"type": @"fuchsia",
        @"item": @"400"
        },
      @"500": @{
        @"value": #d946ef,
        @"name": @"StrokeFuchsia500",
        @"category": @"stroke",
        @"type": @"fuchsia",
        @"item": @"500"
        },
      @"600": @{
        @"value": #c026d3,
        @"name": @"StrokeFuchsia600",
        @"category": @"stroke",
        @"type": @"fuchsia",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a21caf,
        @"name": @"StrokeFuchsia700",
        @"category": @"stroke",
        @"type": @"fuchsia",
        @"item": @"700"
        },
      @"800": @{
        @"value": #86198f,
        @"name": @"StrokeFuchsia800",
        @"category": @"stroke",
        @"type": @"fuchsia",
        @"item": @"800"
        },
      @"900": @{
        @"value": #701a75,
        @"name": @"StrokeFuchsia900",
        @"category": @"stroke",
        @"type": @"fuchsia",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4a044e,
        @"name": @"StrokeFuchsia950",
        @"category": @"stroke",
        @"type": @"fuchsia",
        @"item": @"950"
        }
      },
    @"pink": @{
      @"50": @{
        @"value": #fdf2f8,
        @"name": @"StrokePink50",
        @"category": @"stroke",
        @"type": @"pink",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fce7f3,
        @"name": @"StrokePink100",
        @"category": @"stroke",
        @"type": @"pink",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fbcfe8,
        @"name": @"StrokePink200",
        @"category": @"stroke",
        @"type": @"pink",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f9a8d4,
        @"name": @"StrokePink300",
        @"category": @"stroke",
        @"type": @"pink",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f472b6,
        @"name": @"StrokePink400",
        @"category": @"stroke",
        @"type": @"pink",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ec4899,
        @"name": @"StrokePink500",
        @"category": @"stroke",
        @"type": @"pink",
        @"item": @"500"
        },
      @"600": @{
        @"value": #db2777,
        @"name": @"StrokePink600",
        @"category": @"stroke",
        @"type": @"pink",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be185d,
        @"name": @"StrokePink700",
        @"category": @"stroke",
        @"type": @"pink",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9d174d,
        @"name": @"StrokePink800",
        @"category": @"stroke",
        @"type": @"pink",
        @"item": @"800"
        },
      @"900": @{
        @"value": #831843,
        @"name": @"StrokePink900",
        @"category": @"stroke",
        @"type": @"pink",
        @"item": @"900"
        },
      @"950": @{
        @"value": #500724,
        @"name": @"StrokePink950",
        @"category": @"stroke",
        @"type": @"pink",
        @"item": @"950"
        }
      },
    @"rose": @{
      @"50": @{
        @"value": #fff1f2,
        @"name": @"StrokeRose50",
        @"category": @"stroke",
        @"type": @"rose",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffe4e6,
        @"name": @"StrokeRose100",
        @"category": @"stroke",
        @"type": @"rose",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecdd3,
        @"name": @"StrokeRose200",
        @"category": @"stroke",
        @"type": @"rose",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fda4af,
        @"name": @"StrokeRose300",
        @"category": @"stroke",
        @"type": @"rose",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb7185,
        @"name": @"StrokeRose400",
        @"category": @"stroke",
        @"type": @"rose",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f43f5e,
        @"name": @"StrokeRose500",
        @"category": @"stroke",
        @"type": @"rose",
        @"item": @"500"
        },
      @"600": @{
        @"value": #e11d48,
        @"name": @"StrokeRose600",
        @"category": @"stroke",
        @"type": @"rose",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be123c,
        @"name": @"StrokeRose700",
        @"category": @"stroke",
        @"type": @"rose",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9f1239,
        @"name": @"StrokeRose800",
        @"category": @"stroke",
        @"type": @"rose",
        @"item": @"800"
        },
      @"900": @{
        @"value": #881337,
        @"name": @"StrokeRose900",
        @"category": @"stroke",
        @"type": @"rose",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4c0519,
        @"name": @"StrokeRose950",
        @"category": @"stroke",
        @"type": @"rose",
        @"item": @"950"
        }
      }
    },
  @"strokeWidth": @{
    @"0": @{
      @"value": 0,
      @"name": @"StrokeWidth0",
      @"category": @"strokeWidth",
      @"type": @"0"
      },
    @"1": @{
      @"value": 1,
      @"name": @"StrokeWidth1",
      @"category": @"strokeWidth",
      @"type": @"1"
      },
    @"2": @{
      @"value": 2,
      @"name": @"StrokeWidth2",
      @"category": @"strokeWidth",
      @"type": @"2"
      }
    },
  @"textColor": @{
    @"inherit": @{
      @"value": inherit,
      @"name": @"TextColorInherit",
      @"category": @"textColor",
      @"type": @"inherit"
      },
    @"current": @{
      @"value": currentColor,
      @"name": @"TextColorCurrent",
      @"category": @"textColor",
      @"type": @"current"
      },
    @"transparent": @{
      @"value": transparent,
      @"name": @"TextColorTransparent",
      @"category": @"textColor",
      @"type": @"transparent"
      },
    @"black": @{
      @"value": #000,
      @"name": @"TextColorBlack",
      @"category": @"textColor",
      @"type": @"black"
      },
    @"white": @{
      @"value": #fff,
      @"name": @"TextColorWhite",
      @"category": @"textColor",
      @"type": @"white"
      },
    @"slate": @{
      @"50": @{
        @"value": #f8fafc,
        @"name": @"TextColorSlate50",
        @"category": @"textColor",
        @"type": @"slate",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f1f5f9,
        @"name": @"TextColorSlate100",
        @"category": @"textColor",
        @"type": @"slate",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e2e8f0,
        @"name": @"TextColorSlate200",
        @"category": @"textColor",
        @"type": @"slate",
        @"item": @"200"
        },
      @"300": @{
        @"value": #cbd5e1,
        @"name": @"TextColorSlate300",
        @"category": @"textColor",
        @"type": @"slate",
        @"item": @"300"
        },
      @"400": @{
        @"value": #94a3b8,
        @"name": @"TextColorSlate400",
        @"category": @"textColor",
        @"type": @"slate",
        @"item": @"400"
        },
      @"500": @{
        @"value": #64748b,
        @"name": @"TextColorSlate500",
        @"category": @"textColor",
        @"type": @"slate",
        @"item": @"500"
        },
      @"600": @{
        @"value": #475569,
        @"name": @"TextColorSlate600",
        @"category": @"textColor",
        @"type": @"slate",
        @"item": @"600"
        },
      @"700": @{
        @"value": #334155,
        @"name": @"TextColorSlate700",
        @"category": @"textColor",
        @"type": @"slate",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e293b,
        @"name": @"TextColorSlate800",
        @"category": @"textColor",
        @"type": @"slate",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0f172a,
        @"name": @"TextColorSlate900",
        @"category": @"textColor",
        @"type": @"slate",
        @"item": @"900"
        },
      @"950": @{
        @"value": #020617,
        @"name": @"TextColorSlate950",
        @"category": @"textColor",
        @"type": @"slate",
        @"item": @"950"
        }
      },
    @"gray": @{
      @"50": @{
        @"value": #f9fafb,
        @"name": @"TextColorGray50",
        @"category": @"textColor",
        @"type": @"gray",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3f4f6,
        @"name": @"TextColorGray100",
        @"category": @"textColor",
        @"type": @"gray",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e7eb,
        @"name": @"TextColorGray200",
        @"category": @"textColor",
        @"type": @"gray",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d1d5db,
        @"name": @"TextColorGray300",
        @"category": @"textColor",
        @"type": @"gray",
        @"item": @"300"
        },
      @"400": @{
        @"value": #9ca3af,
        @"name": @"TextColorGray400",
        @"category": @"textColor",
        @"type": @"gray",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6b7280,
        @"name": @"TextColorGray500",
        @"category": @"textColor",
        @"type": @"gray",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4b5563,
        @"name": @"TextColorGray600",
        @"category": @"textColor",
        @"type": @"gray",
        @"item": @"600"
        },
      @"700": @{
        @"value": #374151,
        @"name": @"TextColorGray700",
        @"category": @"textColor",
        @"type": @"gray",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1f2937,
        @"name": @"TextColorGray800",
        @"category": @"textColor",
        @"type": @"gray",
        @"item": @"800"
        },
      @"900": @{
        @"value": #111827,
        @"name": @"TextColorGray900",
        @"category": @"textColor",
        @"type": @"gray",
        @"item": @"900"
        },
      @"950": @{
        @"value": #030712,
        @"name": @"TextColorGray950",
        @"category": @"textColor",
        @"type": @"gray",
        @"item": @"950"
        }
      },
    @"zinc": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"TextColorZinc50",
        @"category": @"textColor",
        @"type": @"zinc",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f4f4f5,
        @"name": @"TextColorZinc100",
        @"category": @"textColor",
        @"type": @"zinc",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e4e4e7,
        @"name": @"TextColorZinc200",
        @"category": @"textColor",
        @"type": @"zinc",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d8,
        @"name": @"TextColorZinc300",
        @"category": @"textColor",
        @"type": @"zinc",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a1a1aa,
        @"name": @"TextColorZinc400",
        @"category": @"textColor",
        @"type": @"zinc",
        @"item": @"400"
        },
      @"500": @{
        @"value": #71717a,
        @"name": @"TextColorZinc500",
        @"category": @"textColor",
        @"type": @"zinc",
        @"item": @"500"
        },
      @"600": @{
        @"value": #52525b,
        @"name": @"TextColorZinc600",
        @"category": @"textColor",
        @"type": @"zinc",
        @"item": @"600"
        },
      @"700": @{
        @"value": #3f3f46,
        @"name": @"TextColorZinc700",
        @"category": @"textColor",
        @"type": @"zinc",
        @"item": @"700"
        },
      @"800": @{
        @"value": #27272a,
        @"name": @"TextColorZinc800",
        @"category": @"textColor",
        @"type": @"zinc",
        @"item": @"800"
        },
      @"900": @{
        @"value": #18181b,
        @"name": @"TextColorZinc900",
        @"category": @"textColor",
        @"type": @"zinc",
        @"item": @"900"
        },
      @"950": @{
        @"value": #09090b,
        @"name": @"TextColorZinc950",
        @"category": @"textColor",
        @"type": @"zinc",
        @"item": @"950"
        }
      },
    @"neutral": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"TextColorNeutral50",
        @"category": @"textColor",
        @"type": @"neutral",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f5,
        @"name": @"TextColorNeutral100",
        @"category": @"textColor",
        @"type": @"neutral",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e5e5,
        @"name": @"TextColorNeutral200",
        @"category": @"textColor",
        @"type": @"neutral",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d4,
        @"name": @"TextColorNeutral300",
        @"category": @"textColor",
        @"type": @"neutral",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3a3a3,
        @"name": @"TextColorNeutral400",
        @"category": @"textColor",
        @"type": @"neutral",
        @"item": @"400"
        },
      @"500": @{
        @"value": #737373,
        @"name": @"TextColorNeutral500",
        @"category": @"textColor",
        @"type": @"neutral",
        @"item": @"500"
        },
      @"600": @{
        @"value": #525252,
        @"name": @"TextColorNeutral600",
        @"category": @"textColor",
        @"type": @"neutral",
        @"item": @"600"
        },
      @"700": @{
        @"value": #404040,
        @"name": @"TextColorNeutral700",
        @"category": @"textColor",
        @"type": @"neutral",
        @"item": @"700"
        },
      @"800": @{
        @"value": #262626,
        @"name": @"TextColorNeutral800",
        @"category": @"textColor",
        @"type": @"neutral",
        @"item": @"800"
        },
      @"900": @{
        @"value": #171717,
        @"name": @"TextColorNeutral900",
        @"category": @"textColor",
        @"type": @"neutral",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0a0a0a,
        @"name": @"TextColorNeutral950",
        @"category": @"textColor",
        @"type": @"neutral",
        @"item": @"950"
        }
      },
    @"stone": @{
      @"50": @{
        @"value": #fafaf9,
        @"name": @"TextColorStone50",
        @"category": @"textColor",
        @"type": @"stone",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f4,
        @"name": @"TextColorStone100",
        @"category": @"textColor",
        @"type": @"stone",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e7e5e4,
        @"name": @"TextColorStone200",
        @"category": @"textColor",
        @"type": @"stone",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d6d3d1,
        @"name": @"TextColorStone300",
        @"category": @"textColor",
        @"type": @"stone",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a8a29e,
        @"name": @"TextColorStone400",
        @"category": @"textColor",
        @"type": @"stone",
        @"item": @"400"
        },
      @"500": @{
        @"value": #78716c,
        @"name": @"TextColorStone500",
        @"category": @"textColor",
        @"type": @"stone",
        @"item": @"500"
        },
      @"600": @{
        @"value": #57534e,
        @"name": @"TextColorStone600",
        @"category": @"textColor",
        @"type": @"stone",
        @"item": @"600"
        },
      @"700": @{
        @"value": #44403c,
        @"name": @"TextColorStone700",
        @"category": @"textColor",
        @"type": @"stone",
        @"item": @"700"
        },
      @"800": @{
        @"value": #292524,
        @"name": @"TextColorStone800",
        @"category": @"textColor",
        @"type": @"stone",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1c1917,
        @"name": @"TextColorStone900",
        @"category": @"textColor",
        @"type": @"stone",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0c0a09,
        @"name": @"TextColorStone950",
        @"category": @"textColor",
        @"type": @"stone",
        @"item": @"950"
        }
      },
    @"red": @{
      @"50": @{
        @"value": #fef2f2,
        @"name": @"TextColorRed50",
        @"category": @"textColor",
        @"type": @"red",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fee2e2,
        @"name": @"TextColorRed100",
        @"category": @"textColor",
        @"type": @"red",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecaca,
        @"name": @"TextColorRed200",
        @"category": @"textColor",
        @"type": @"red",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fca5a5,
        @"name": @"TextColorRed300",
        @"category": @"textColor",
        @"type": @"red",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f87171,
        @"name": @"TextColorRed400",
        @"category": @"textColor",
        @"type": @"red",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ef4444,
        @"name": @"TextColorRed500",
        @"category": @"textColor",
        @"type": @"red",
        @"item": @"500"
        },
      @"600": @{
        @"value": #dc2626,
        @"name": @"TextColorRed600",
        @"category": @"textColor",
        @"type": @"red",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b91c1c,
        @"name": @"TextColorRed700",
        @"category": @"textColor",
        @"type": @"red",
        @"item": @"700"
        },
      @"800": @{
        @"value": #991b1b,
        @"name": @"TextColorRed800",
        @"category": @"textColor",
        @"type": @"red",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7f1d1d,
        @"name": @"TextColorRed900",
        @"category": @"textColor",
        @"type": @"red",
        @"item": @"900"
        },
      @"950": @{
        @"value": #450a0a,
        @"name": @"TextColorRed950",
        @"category": @"textColor",
        @"type": @"red",
        @"item": @"950"
        }
      },
    @"orange": @{
      @"50": @{
        @"value": #fff7ed,
        @"name": @"TextColorOrange50",
        @"category": @"textColor",
        @"type": @"orange",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffedd5,
        @"name": @"TextColorOrange100",
        @"category": @"textColor",
        @"type": @"orange",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fed7aa,
        @"name": @"TextColorOrange200",
        @"category": @"textColor",
        @"type": @"orange",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fdba74,
        @"name": @"TextColorOrange300",
        @"category": @"textColor",
        @"type": @"orange",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb923c,
        @"name": @"TextColorOrange400",
        @"category": @"textColor",
        @"type": @"orange",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f97316,
        @"name": @"TextColorOrange500",
        @"category": @"textColor",
        @"type": @"orange",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ea580c,
        @"name": @"TextColorOrange600",
        @"category": @"textColor",
        @"type": @"orange",
        @"item": @"600"
        },
      @"700": @{
        @"value": #c2410c,
        @"name": @"TextColorOrange700",
        @"category": @"textColor",
        @"type": @"orange",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9a3412,
        @"name": @"TextColorOrange800",
        @"category": @"textColor",
        @"type": @"orange",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7c2d12,
        @"name": @"TextColorOrange900",
        @"category": @"textColor",
        @"type": @"orange",
        @"item": @"900"
        },
      @"950": @{
        @"value": #431407,
        @"name": @"TextColorOrange950",
        @"category": @"textColor",
        @"type": @"orange",
        @"item": @"950"
        }
      },
    @"amber": @{
      @"50": @{
        @"value": #fffbeb,
        @"name": @"TextColorAmber50",
        @"category": @"textColor",
        @"type": @"amber",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef3c7,
        @"name": @"TextColorAmber100",
        @"category": @"textColor",
        @"type": @"amber",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fde68a,
        @"name": @"TextColorAmber200",
        @"category": @"textColor",
        @"type": @"amber",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fcd34d,
        @"name": @"TextColorAmber300",
        @"category": @"textColor",
        @"type": @"amber",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fbbf24,
        @"name": @"TextColorAmber400",
        @"category": @"textColor",
        @"type": @"amber",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f59e0b,
        @"name": @"TextColorAmber500",
        @"category": @"textColor",
        @"type": @"amber",
        @"item": @"500"
        },
      @"600": @{
        @"value": #d97706,
        @"name": @"TextColorAmber600",
        @"category": @"textColor",
        @"type": @"amber",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b45309,
        @"name": @"TextColorAmber700",
        @"category": @"textColor",
        @"type": @"amber",
        @"item": @"700"
        },
      @"800": @{
        @"value": #92400e,
        @"name": @"TextColorAmber800",
        @"category": @"textColor",
        @"type": @"amber",
        @"item": @"800"
        },
      @"900": @{
        @"value": #78350f,
        @"name": @"TextColorAmber900",
        @"category": @"textColor",
        @"type": @"amber",
        @"item": @"900"
        },
      @"950": @{
        @"value": #451a03,
        @"name": @"TextColorAmber950",
        @"category": @"textColor",
        @"type": @"amber",
        @"item": @"950"
        }
      },
    @"yellow": @{
      @"50": @{
        @"value": #fefce8,
        @"name": @"TextColorYellow50",
        @"category": @"textColor",
        @"type": @"yellow",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef9c3,
        @"name": @"TextColorYellow100",
        @"category": @"textColor",
        @"type": @"yellow",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fef08a,
        @"name": @"TextColorYellow200",
        @"category": @"textColor",
        @"type": @"yellow",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fde047,
        @"name": @"TextColorYellow300",
        @"category": @"textColor",
        @"type": @"yellow",
        @"item": @"300"
        },
      @"400": @{
        @"value": #facc15,
        @"name": @"TextColorYellow400",
        @"category": @"textColor",
        @"type": @"yellow",
        @"item": @"400"
        },
      @"500": @{
        @"value": #eab308,
        @"name": @"TextColorYellow500",
        @"category": @"textColor",
        @"type": @"yellow",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ca8a04,
        @"name": @"TextColorYellow600",
        @"category": @"textColor",
        @"type": @"yellow",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a16207,
        @"name": @"TextColorYellow700",
        @"category": @"textColor",
        @"type": @"yellow",
        @"item": @"700"
        },
      @"800": @{
        @"value": #854d0e,
        @"name": @"TextColorYellow800",
        @"category": @"textColor",
        @"type": @"yellow",
        @"item": @"800"
        },
      @"900": @{
        @"value": #713f12,
        @"name": @"TextColorYellow900",
        @"category": @"textColor",
        @"type": @"yellow",
        @"item": @"900"
        },
      @"950": @{
        @"value": #422006,
        @"name": @"TextColorYellow950",
        @"category": @"textColor",
        @"type": @"yellow",
        @"item": @"950"
        }
      },
    @"lime": @{
      @"50": @{
        @"value": #f7fee7,
        @"name": @"TextColorLime50",
        @"category": @"textColor",
        @"type": @"lime",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ecfccb,
        @"name": @"TextColorLime100",
        @"category": @"textColor",
        @"type": @"lime",
        @"item": @"100"
        },
      @"200": @{
        @"value": #d9f99d,
        @"name": @"TextColorLime200",
        @"category": @"textColor",
        @"type": @"lime",
        @"item": @"200"
        },
      @"300": @{
        @"value": #bef264,
        @"name": @"TextColorLime300",
        @"category": @"textColor",
        @"type": @"lime",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3e635,
        @"name": @"TextColorLime400",
        @"category": @"textColor",
        @"type": @"lime",
        @"item": @"400"
        },
      @"500": @{
        @"value": #84cc16,
        @"name": @"TextColorLime500",
        @"category": @"textColor",
        @"type": @"lime",
        @"item": @"500"
        },
      @"600": @{
        @"value": #65a30d,
        @"name": @"TextColorLime600",
        @"category": @"textColor",
        @"type": @"lime",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4d7c0f,
        @"name": @"TextColorLime700",
        @"category": @"textColor",
        @"type": @"lime",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3f6212,
        @"name": @"TextColorLime800",
        @"category": @"textColor",
        @"type": @"lime",
        @"item": @"800"
        },
      @"900": @{
        @"value": #365314,
        @"name": @"TextColorLime900",
        @"category": @"textColor",
        @"type": @"lime",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1a2e05,
        @"name": @"TextColorLime950",
        @"category": @"textColor",
        @"type": @"lime",
        @"item": @"950"
        }
      },
    @"green": @{
      @"50": @{
        @"value": #f0fdf4,
        @"name": @"TextColorGreen50",
        @"category": @"textColor",
        @"type": @"green",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dcfce7,
        @"name": @"TextColorGreen100",
        @"category": @"textColor",
        @"type": @"green",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bbf7d0,
        @"name": @"TextColorGreen200",
        @"category": @"textColor",
        @"type": @"green",
        @"item": @"200"
        },
      @"300": @{
        @"value": #86efac,
        @"name": @"TextColorGreen300",
        @"category": @"textColor",
        @"type": @"green",
        @"item": @"300"
        },
      @"400": @{
        @"value": #4ade80,
        @"name": @"TextColorGreen400",
        @"category": @"textColor",
        @"type": @"green",
        @"item": @"400"
        },
      @"500": @{
        @"value": #22c55e,
        @"name": @"TextColorGreen500",
        @"category": @"textColor",
        @"type": @"green",
        @"item": @"500"
        },
      @"600": @{
        @"value": #16a34a,
        @"name": @"TextColorGreen600",
        @"category": @"textColor",
        @"type": @"green",
        @"item": @"600"
        },
      @"700": @{
        @"value": #15803d,
        @"name": @"TextColorGreen700",
        @"category": @"textColor",
        @"type": @"green",
        @"item": @"700"
        },
      @"800": @{
        @"value": #166534,
        @"name": @"TextColorGreen800",
        @"category": @"textColor",
        @"type": @"green",
        @"item": @"800"
        },
      @"900": @{
        @"value": #14532d,
        @"name": @"TextColorGreen900",
        @"category": @"textColor",
        @"type": @"green",
        @"item": @"900"
        },
      @"950": @{
        @"value": #052e16,
        @"name": @"TextColorGreen950",
        @"category": @"textColor",
        @"type": @"green",
        @"item": @"950"
        }
      },
    @"emerald": @{
      @"50": @{
        @"value": #ecfdf5,
        @"name": @"TextColorEmerald50",
        @"category": @"textColor",
        @"type": @"emerald",
        @"item": @"50"
        },
      @"100": @{
        @"value": #d1fae5,
        @"name": @"TextColorEmerald100",
        @"category": @"textColor",
        @"type": @"emerald",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a7f3d0,
        @"name": @"TextColorEmerald200",
        @"category": @"textColor",
        @"type": @"emerald",
        @"item": @"200"
        },
      @"300": @{
        @"value": #6ee7b7,
        @"name": @"TextColorEmerald300",
        @"category": @"textColor",
        @"type": @"emerald",
        @"item": @"300"
        },
      @"400": @{
        @"value": #34d399,
        @"name": @"TextColorEmerald400",
        @"category": @"textColor",
        @"type": @"emerald",
        @"item": @"400"
        },
      @"500": @{
        @"value": #10b981,
        @"name": @"TextColorEmerald500",
        @"category": @"textColor",
        @"type": @"emerald",
        @"item": @"500"
        },
      @"600": @{
        @"value": #059669,
        @"name": @"TextColorEmerald600",
        @"category": @"textColor",
        @"type": @"emerald",
        @"item": @"600"
        },
      @"700": @{
        @"value": #047857,
        @"name": @"TextColorEmerald700",
        @"category": @"textColor",
        @"type": @"emerald",
        @"item": @"700"
        },
      @"800": @{
        @"value": #065f46,
        @"name": @"TextColorEmerald800",
        @"category": @"textColor",
        @"type": @"emerald",
        @"item": @"800"
        },
      @"900": @{
        @"value": #064e3b,
        @"name": @"TextColorEmerald900",
        @"category": @"textColor",
        @"type": @"emerald",
        @"item": @"900"
        },
      @"950": @{
        @"value": #022c22,
        @"name": @"TextColorEmerald950",
        @"category": @"textColor",
        @"type": @"emerald",
        @"item": @"950"
        }
      },
    @"teal": @{
      @"50": @{
        @"value": #f0fdfa,
        @"name": @"TextColorTeal50",
        @"category": @"textColor",
        @"type": @"teal",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ccfbf1,
        @"name": @"TextColorTeal100",
        @"category": @"textColor",
        @"type": @"teal",
        @"item": @"100"
        },
      @"200": @{
        @"value": #99f6e4,
        @"name": @"TextColorTeal200",
        @"category": @"textColor",
        @"type": @"teal",
        @"item": @"200"
        },
      @"300": @{
        @"value": #5eead4,
        @"name": @"TextColorTeal300",
        @"category": @"textColor",
        @"type": @"teal",
        @"item": @"300"
        },
      @"400": @{
        @"value": #2dd4bf,
        @"name": @"TextColorTeal400",
        @"category": @"textColor",
        @"type": @"teal",
        @"item": @"400"
        },
      @"500": @{
        @"value": #14b8a6,
        @"name": @"TextColorTeal500",
        @"category": @"textColor",
        @"type": @"teal",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0d9488,
        @"name": @"TextColorTeal600",
        @"category": @"textColor",
        @"type": @"teal",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0f766e,
        @"name": @"TextColorTeal700",
        @"category": @"textColor",
        @"type": @"teal",
        @"item": @"700"
        },
      @"800": @{
        @"value": #115e59,
        @"name": @"TextColorTeal800",
        @"category": @"textColor",
        @"type": @"teal",
        @"item": @"800"
        },
      @"900": @{
        @"value": #134e4a,
        @"name": @"TextColorTeal900",
        @"category": @"textColor",
        @"type": @"teal",
        @"item": @"900"
        },
      @"950": @{
        @"value": #042f2e,
        @"name": @"TextColorTeal950",
        @"category": @"textColor",
        @"type": @"teal",
        @"item": @"950"
        }
      },
    @"cyan": @{
      @"50": @{
        @"value": #ecfeff,
        @"name": @"TextColorCyan50",
        @"category": @"textColor",
        @"type": @"cyan",
        @"item": @"50"
        },
      @"100": @{
        @"value": #cffafe,
        @"name": @"TextColorCyan100",
        @"category": @"textColor",
        @"type": @"cyan",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a5f3fc,
        @"name": @"TextColorCyan200",
        @"category": @"textColor",
        @"type": @"cyan",
        @"item": @"200"
        },
      @"300": @{
        @"value": #67e8f9,
        @"name": @"TextColorCyan300",
        @"category": @"textColor",
        @"type": @"cyan",
        @"item": @"300"
        },
      @"400": @{
        @"value": #22d3ee,
        @"name": @"TextColorCyan400",
        @"category": @"textColor",
        @"type": @"cyan",
        @"item": @"400"
        },
      @"500": @{
        @"value": #06b6d4,
        @"name": @"TextColorCyan500",
        @"category": @"textColor",
        @"type": @"cyan",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0891b2,
        @"name": @"TextColorCyan600",
        @"category": @"textColor",
        @"type": @"cyan",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0e7490,
        @"name": @"TextColorCyan700",
        @"category": @"textColor",
        @"type": @"cyan",
        @"item": @"700"
        },
      @"800": @{
        @"value": #155e75,
        @"name": @"TextColorCyan800",
        @"category": @"textColor",
        @"type": @"cyan",
        @"item": @"800"
        },
      @"900": @{
        @"value": #164e63,
        @"name": @"TextColorCyan900",
        @"category": @"textColor",
        @"type": @"cyan",
        @"item": @"900"
        },
      @"950": @{
        @"value": #083344,
        @"name": @"TextColorCyan950",
        @"category": @"textColor",
        @"type": @"cyan",
        @"item": @"950"
        }
      },
    @"sky": @{
      @"50": @{
        @"value": #f0f9ff,
        @"name": @"TextColorSky50",
        @"category": @"textColor",
        @"type": @"sky",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0f2fe,
        @"name": @"TextColorSky100",
        @"category": @"textColor",
        @"type": @"sky",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bae6fd,
        @"name": @"TextColorSky200",
        @"category": @"textColor",
        @"type": @"sky",
        @"item": @"200"
        },
      @"300": @{
        @"value": #7dd3fc,
        @"name": @"TextColorSky300",
        @"category": @"textColor",
        @"type": @"sky",
        @"item": @"300"
        },
      @"400": @{
        @"value": #38bdf8,
        @"name": @"TextColorSky400",
        @"category": @"textColor",
        @"type": @"sky",
        @"item": @"400"
        },
      @"500": @{
        @"value": #0ea5e9,
        @"name": @"TextColorSky500",
        @"category": @"textColor",
        @"type": @"sky",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0284c7,
        @"name": @"TextColorSky600",
        @"category": @"textColor",
        @"type": @"sky",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0369a1,
        @"name": @"TextColorSky700",
        @"category": @"textColor",
        @"type": @"sky",
        @"item": @"700"
        },
      @"800": @{
        @"value": #075985,
        @"name": @"TextColorSky800",
        @"category": @"textColor",
        @"type": @"sky",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0c4a6e,
        @"name": @"TextColorSky900",
        @"category": @"textColor",
        @"type": @"sky",
        @"item": @"900"
        },
      @"950": @{
        @"value": #082f49,
        @"name": @"TextColorSky950",
        @"category": @"textColor",
        @"type": @"sky",
        @"item": @"950"
        }
      },
    @"blue": @{
      @"50": @{
        @"value": #eff6ff,
        @"name": @"TextColorBlue50",
        @"category": @"textColor",
        @"type": @"blue",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dbeafe,
        @"name": @"TextColorBlue100",
        @"category": @"textColor",
        @"type": @"blue",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bfdbfe,
        @"name": @"TextColorBlue200",
        @"category": @"textColor",
        @"type": @"blue",
        @"item": @"200"
        },
      @"300": @{
        @"value": #93c5fd,
        @"name": @"TextColorBlue300",
        @"category": @"textColor",
        @"type": @"blue",
        @"item": @"300"
        },
      @"400": @{
        @"value": #60a5fa,
        @"name": @"TextColorBlue400",
        @"category": @"textColor",
        @"type": @"blue",
        @"item": @"400"
        },
      @"500": @{
        @"value": #3b82f6,
        @"name": @"TextColorBlue500",
        @"category": @"textColor",
        @"type": @"blue",
        @"item": @"500"
        },
      @"600": @{
        @"value": #2563eb,
        @"name": @"TextColorBlue600",
        @"category": @"textColor",
        @"type": @"blue",
        @"item": @"600"
        },
      @"700": @{
        @"value": #1d4ed8,
        @"name": @"TextColorBlue700",
        @"category": @"textColor",
        @"type": @"blue",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e40af,
        @"name": @"TextColorBlue800",
        @"category": @"textColor",
        @"type": @"blue",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1e3a8a,
        @"name": @"TextColorBlue900",
        @"category": @"textColor",
        @"type": @"blue",
        @"item": @"900"
        },
      @"950": @{
        @"value": #172554,
        @"name": @"TextColorBlue950",
        @"category": @"textColor",
        @"type": @"blue",
        @"item": @"950"
        }
      },
    @"indigo": @{
      @"50": @{
        @"value": #eef2ff,
        @"name": @"TextColorIndigo50",
        @"category": @"textColor",
        @"type": @"indigo",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0e7ff,
        @"name": @"TextColorIndigo100",
        @"category": @"textColor",
        @"type": @"indigo",
        @"item": @"100"
        },
      @"200": @{
        @"value": #c7d2fe,
        @"name": @"TextColorIndigo200",
        @"category": @"textColor",
        @"type": @"indigo",
        @"item": @"200"
        },
      @"300": @{
        @"value": #a5b4fc,
        @"name": @"TextColorIndigo300",
        @"category": @"textColor",
        @"type": @"indigo",
        @"item": @"300"
        },
      @"400": @{
        @"value": #818cf8,
        @"name": @"TextColorIndigo400",
        @"category": @"textColor",
        @"type": @"indigo",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6366f1,
        @"name": @"TextColorIndigo500",
        @"category": @"textColor",
        @"type": @"indigo",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4f46e5,
        @"name": @"TextColorIndigo600",
        @"category": @"textColor",
        @"type": @"indigo",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4338ca,
        @"name": @"TextColorIndigo700",
        @"category": @"textColor",
        @"type": @"indigo",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3730a3,
        @"name": @"TextColorIndigo800",
        @"category": @"textColor",
        @"type": @"indigo",
        @"item": @"800"
        },
      @"900": @{
        @"value": #312e81,
        @"name": @"TextColorIndigo900",
        @"category": @"textColor",
        @"type": @"indigo",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1e1b4b,
        @"name": @"TextColorIndigo950",
        @"category": @"textColor",
        @"type": @"indigo",
        @"item": @"950"
        }
      },
    @"violet": @{
      @"50": @{
        @"value": #f5f3ff,
        @"name": @"TextColorViolet50",
        @"category": @"textColor",
        @"type": @"violet",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ede9fe,
        @"name": @"TextColorViolet100",
        @"category": @"textColor",
        @"type": @"violet",
        @"item": @"100"
        },
      @"200": @{
        @"value": #ddd6fe,
        @"name": @"TextColorViolet200",
        @"category": @"textColor",
        @"type": @"violet",
        @"item": @"200"
        },
      @"300": @{
        @"value": #c4b5fd,
        @"name": @"TextColorViolet300",
        @"category": @"textColor",
        @"type": @"violet",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a78bfa,
        @"name": @"TextColorViolet400",
        @"category": @"textColor",
        @"type": @"violet",
        @"item": @"400"
        },
      @"500": @{
        @"value": #8b5cf6,
        @"name": @"TextColorViolet500",
        @"category": @"textColor",
        @"type": @"violet",
        @"item": @"500"
        },
      @"600": @{
        @"value": #7c3aed,
        @"name": @"TextColorViolet600",
        @"category": @"textColor",
        @"type": @"violet",
        @"item": @"600"
        },
      @"700": @{
        @"value": #6d28d9,
        @"name": @"TextColorViolet700",
        @"category": @"textColor",
        @"type": @"violet",
        @"item": @"700"
        },
      @"800": @{
        @"value": #5b21b6,
        @"name": @"TextColorViolet800",
        @"category": @"textColor",
        @"type": @"violet",
        @"item": @"800"
        },
      @"900": @{
        @"value": #4c1d95,
        @"name": @"TextColorViolet900",
        @"category": @"textColor",
        @"type": @"violet",
        @"item": @"900"
        },
      @"950": @{
        @"value": #2e1065,
        @"name": @"TextColorViolet950",
        @"category": @"textColor",
        @"type": @"violet",
        @"item": @"950"
        }
      },
    @"purple": @{
      @"50": @{
        @"value": #faf5ff,
        @"name": @"TextColorPurple50",
        @"category": @"textColor",
        @"type": @"purple",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3e8ff,
        @"name": @"TextColorPurple100",
        @"category": @"textColor",
        @"type": @"purple",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e9d5ff,
        @"name": @"TextColorPurple200",
        @"category": @"textColor",
        @"type": @"purple",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d8b4fe,
        @"name": @"TextColorPurple300",
        @"category": @"textColor",
        @"type": @"purple",
        @"item": @"300"
        },
      @"400": @{
        @"value": #c084fc,
        @"name": @"TextColorPurple400",
        @"category": @"textColor",
        @"type": @"purple",
        @"item": @"400"
        },
      @"500": @{
        @"value": #a855f7,
        @"name": @"TextColorPurple500",
        @"category": @"textColor",
        @"type": @"purple",
        @"item": @"500"
        },
      @"600": @{
        @"value": #9333ea,
        @"name": @"TextColorPurple600",
        @"category": @"textColor",
        @"type": @"purple",
        @"item": @"600"
        },
      @"700": @{
        @"value": #7e22ce,
        @"name": @"TextColorPurple700",
        @"category": @"textColor",
        @"type": @"purple",
        @"item": @"700"
        },
      @"800": @{
        @"value": #6b21a8,
        @"name": @"TextColorPurple800",
        @"category": @"textColor",
        @"type": @"purple",
        @"item": @"800"
        },
      @"900": @{
        @"value": #581c87,
        @"name": @"TextColorPurple900",
        @"category": @"textColor",
        @"type": @"purple",
        @"item": @"900"
        },
      @"950": @{
        @"value": #3b0764,
        @"name": @"TextColorPurple950",
        @"category": @"textColor",
        @"type": @"purple",
        @"item": @"950"
        }
      },
    @"fuchsia": @{
      @"50": @{
        @"value": #fdf4ff,
        @"name": @"TextColorFuchsia50",
        @"category": @"textColor",
        @"type": @"fuchsia",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fae8ff,
        @"name": @"TextColorFuchsia100",
        @"category": @"textColor",
        @"type": @"fuchsia",
        @"item": @"100"
        },
      @"200": @{
        @"value": #f5d0fe,
        @"name": @"TextColorFuchsia200",
        @"category": @"textColor",
        @"type": @"fuchsia",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f0abfc,
        @"name": @"TextColorFuchsia300",
        @"category": @"textColor",
        @"type": @"fuchsia",
        @"item": @"300"
        },
      @"400": @{
        @"value": #e879f9,
        @"name": @"TextColorFuchsia400",
        @"category": @"textColor",
        @"type": @"fuchsia",
        @"item": @"400"
        },
      @"500": @{
        @"value": #d946ef,
        @"name": @"TextColorFuchsia500",
        @"category": @"textColor",
        @"type": @"fuchsia",
        @"item": @"500"
        },
      @"600": @{
        @"value": #c026d3,
        @"name": @"TextColorFuchsia600",
        @"category": @"textColor",
        @"type": @"fuchsia",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a21caf,
        @"name": @"TextColorFuchsia700",
        @"category": @"textColor",
        @"type": @"fuchsia",
        @"item": @"700"
        },
      @"800": @{
        @"value": #86198f,
        @"name": @"TextColorFuchsia800",
        @"category": @"textColor",
        @"type": @"fuchsia",
        @"item": @"800"
        },
      @"900": @{
        @"value": #701a75,
        @"name": @"TextColorFuchsia900",
        @"category": @"textColor",
        @"type": @"fuchsia",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4a044e,
        @"name": @"TextColorFuchsia950",
        @"category": @"textColor",
        @"type": @"fuchsia",
        @"item": @"950"
        }
      },
    @"pink": @{
      @"50": @{
        @"value": #fdf2f8,
        @"name": @"TextColorPink50",
        @"category": @"textColor",
        @"type": @"pink",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fce7f3,
        @"name": @"TextColorPink100",
        @"category": @"textColor",
        @"type": @"pink",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fbcfe8,
        @"name": @"TextColorPink200",
        @"category": @"textColor",
        @"type": @"pink",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f9a8d4,
        @"name": @"TextColorPink300",
        @"category": @"textColor",
        @"type": @"pink",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f472b6,
        @"name": @"TextColorPink400",
        @"category": @"textColor",
        @"type": @"pink",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ec4899,
        @"name": @"TextColorPink500",
        @"category": @"textColor",
        @"type": @"pink",
        @"item": @"500"
        },
      @"600": @{
        @"value": #db2777,
        @"name": @"TextColorPink600",
        @"category": @"textColor",
        @"type": @"pink",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be185d,
        @"name": @"TextColorPink700",
        @"category": @"textColor",
        @"type": @"pink",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9d174d,
        @"name": @"TextColorPink800",
        @"category": @"textColor",
        @"type": @"pink",
        @"item": @"800"
        },
      @"900": @{
        @"value": #831843,
        @"name": @"TextColorPink900",
        @"category": @"textColor",
        @"type": @"pink",
        @"item": @"900"
        },
      @"950": @{
        @"value": #500724,
        @"name": @"TextColorPink950",
        @"category": @"textColor",
        @"type": @"pink",
        @"item": @"950"
        }
      },
    @"rose": @{
      @"50": @{
        @"value": #fff1f2,
        @"name": @"TextColorRose50",
        @"category": @"textColor",
        @"type": @"rose",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffe4e6,
        @"name": @"TextColorRose100",
        @"category": @"textColor",
        @"type": @"rose",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecdd3,
        @"name": @"TextColorRose200",
        @"category": @"textColor",
        @"type": @"rose",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fda4af,
        @"name": @"TextColorRose300",
        @"category": @"textColor",
        @"type": @"rose",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb7185,
        @"name": @"TextColorRose400",
        @"category": @"textColor",
        @"type": @"rose",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f43f5e,
        @"name": @"TextColorRose500",
        @"category": @"textColor",
        @"type": @"rose",
        @"item": @"500"
        },
      @"600": @{
        @"value": #e11d48,
        @"name": @"TextColorRose600",
        @"category": @"textColor",
        @"type": @"rose",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be123c,
        @"name": @"TextColorRose700",
        @"category": @"textColor",
        @"type": @"rose",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9f1239,
        @"name": @"TextColorRose800",
        @"category": @"textColor",
        @"type": @"rose",
        @"item": @"800"
        },
      @"900": @{
        @"value": #881337,
        @"name": @"TextColorRose900",
        @"category": @"textColor",
        @"type": @"rose",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4c0519,
        @"name": @"TextColorRose950",
        @"category": @"textColor",
        @"type": @"rose",
        @"item": @"950"
        }
      }
    },
  @"textDecorationColor": @{
    @"inherit": @{
      @"value": inherit,
      @"name": @"TextDecorationColorInherit",
      @"category": @"textDecorationColor",
      @"type": @"inherit"
      },
    @"current": @{
      @"value": currentColor,
      @"name": @"TextDecorationColorCurrent",
      @"category": @"textDecorationColor",
      @"type": @"current"
      },
    @"transparent": @{
      @"value": transparent,
      @"name": @"TextDecorationColorTransparent",
      @"category": @"textDecorationColor",
      @"type": @"transparent"
      },
    @"black": @{
      @"value": #000,
      @"name": @"TextDecorationColorBlack",
      @"category": @"textDecorationColor",
      @"type": @"black"
      },
    @"white": @{
      @"value": #fff,
      @"name": @"TextDecorationColorWhite",
      @"category": @"textDecorationColor",
      @"type": @"white"
      },
    @"slate": @{
      @"50": @{
        @"value": #f8fafc,
        @"name": @"TextDecorationColorSlate50",
        @"category": @"textDecorationColor",
        @"type": @"slate",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f1f5f9,
        @"name": @"TextDecorationColorSlate100",
        @"category": @"textDecorationColor",
        @"type": @"slate",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e2e8f0,
        @"name": @"TextDecorationColorSlate200",
        @"category": @"textDecorationColor",
        @"type": @"slate",
        @"item": @"200"
        },
      @"300": @{
        @"value": #cbd5e1,
        @"name": @"TextDecorationColorSlate300",
        @"category": @"textDecorationColor",
        @"type": @"slate",
        @"item": @"300"
        },
      @"400": @{
        @"value": #94a3b8,
        @"name": @"TextDecorationColorSlate400",
        @"category": @"textDecorationColor",
        @"type": @"slate",
        @"item": @"400"
        },
      @"500": @{
        @"value": #64748b,
        @"name": @"TextDecorationColorSlate500",
        @"category": @"textDecorationColor",
        @"type": @"slate",
        @"item": @"500"
        },
      @"600": @{
        @"value": #475569,
        @"name": @"TextDecorationColorSlate600",
        @"category": @"textDecorationColor",
        @"type": @"slate",
        @"item": @"600"
        },
      @"700": @{
        @"value": #334155,
        @"name": @"TextDecorationColorSlate700",
        @"category": @"textDecorationColor",
        @"type": @"slate",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e293b,
        @"name": @"TextDecorationColorSlate800",
        @"category": @"textDecorationColor",
        @"type": @"slate",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0f172a,
        @"name": @"TextDecorationColorSlate900",
        @"category": @"textDecorationColor",
        @"type": @"slate",
        @"item": @"900"
        },
      @"950": @{
        @"value": #020617,
        @"name": @"TextDecorationColorSlate950",
        @"category": @"textDecorationColor",
        @"type": @"slate",
        @"item": @"950"
        }
      },
    @"gray": @{
      @"50": @{
        @"value": #f9fafb,
        @"name": @"TextDecorationColorGray50",
        @"category": @"textDecorationColor",
        @"type": @"gray",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3f4f6,
        @"name": @"TextDecorationColorGray100",
        @"category": @"textDecorationColor",
        @"type": @"gray",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e7eb,
        @"name": @"TextDecorationColorGray200",
        @"category": @"textDecorationColor",
        @"type": @"gray",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d1d5db,
        @"name": @"TextDecorationColorGray300",
        @"category": @"textDecorationColor",
        @"type": @"gray",
        @"item": @"300"
        },
      @"400": @{
        @"value": #9ca3af,
        @"name": @"TextDecorationColorGray400",
        @"category": @"textDecorationColor",
        @"type": @"gray",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6b7280,
        @"name": @"TextDecorationColorGray500",
        @"category": @"textDecorationColor",
        @"type": @"gray",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4b5563,
        @"name": @"TextDecorationColorGray600",
        @"category": @"textDecorationColor",
        @"type": @"gray",
        @"item": @"600"
        },
      @"700": @{
        @"value": #374151,
        @"name": @"TextDecorationColorGray700",
        @"category": @"textDecorationColor",
        @"type": @"gray",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1f2937,
        @"name": @"TextDecorationColorGray800",
        @"category": @"textDecorationColor",
        @"type": @"gray",
        @"item": @"800"
        },
      @"900": @{
        @"value": #111827,
        @"name": @"TextDecorationColorGray900",
        @"category": @"textDecorationColor",
        @"type": @"gray",
        @"item": @"900"
        },
      @"950": @{
        @"value": #030712,
        @"name": @"TextDecorationColorGray950",
        @"category": @"textDecorationColor",
        @"type": @"gray",
        @"item": @"950"
        }
      },
    @"zinc": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"TextDecorationColorZinc50",
        @"category": @"textDecorationColor",
        @"type": @"zinc",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f4f4f5,
        @"name": @"TextDecorationColorZinc100",
        @"category": @"textDecorationColor",
        @"type": @"zinc",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e4e4e7,
        @"name": @"TextDecorationColorZinc200",
        @"category": @"textDecorationColor",
        @"type": @"zinc",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d8,
        @"name": @"TextDecorationColorZinc300",
        @"category": @"textDecorationColor",
        @"type": @"zinc",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a1a1aa,
        @"name": @"TextDecorationColorZinc400",
        @"category": @"textDecorationColor",
        @"type": @"zinc",
        @"item": @"400"
        },
      @"500": @{
        @"value": #71717a,
        @"name": @"TextDecorationColorZinc500",
        @"category": @"textDecorationColor",
        @"type": @"zinc",
        @"item": @"500"
        },
      @"600": @{
        @"value": #52525b,
        @"name": @"TextDecorationColorZinc600",
        @"category": @"textDecorationColor",
        @"type": @"zinc",
        @"item": @"600"
        },
      @"700": @{
        @"value": #3f3f46,
        @"name": @"TextDecorationColorZinc700",
        @"category": @"textDecorationColor",
        @"type": @"zinc",
        @"item": @"700"
        },
      @"800": @{
        @"value": #27272a,
        @"name": @"TextDecorationColorZinc800",
        @"category": @"textDecorationColor",
        @"type": @"zinc",
        @"item": @"800"
        },
      @"900": @{
        @"value": #18181b,
        @"name": @"TextDecorationColorZinc900",
        @"category": @"textDecorationColor",
        @"type": @"zinc",
        @"item": @"900"
        },
      @"950": @{
        @"value": #09090b,
        @"name": @"TextDecorationColorZinc950",
        @"category": @"textDecorationColor",
        @"type": @"zinc",
        @"item": @"950"
        }
      },
    @"neutral": @{
      @"50": @{
        @"value": #fafafa,
        @"name": @"TextDecorationColorNeutral50",
        @"category": @"textDecorationColor",
        @"type": @"neutral",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f5,
        @"name": @"TextDecorationColorNeutral100",
        @"category": @"textDecorationColor",
        @"type": @"neutral",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e5e5e5,
        @"name": @"TextDecorationColorNeutral200",
        @"category": @"textDecorationColor",
        @"type": @"neutral",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d4d4d4,
        @"name": @"TextDecorationColorNeutral300",
        @"category": @"textDecorationColor",
        @"type": @"neutral",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3a3a3,
        @"name": @"TextDecorationColorNeutral400",
        @"category": @"textDecorationColor",
        @"type": @"neutral",
        @"item": @"400"
        },
      @"500": @{
        @"value": #737373,
        @"name": @"TextDecorationColorNeutral500",
        @"category": @"textDecorationColor",
        @"type": @"neutral",
        @"item": @"500"
        },
      @"600": @{
        @"value": #525252,
        @"name": @"TextDecorationColorNeutral600",
        @"category": @"textDecorationColor",
        @"type": @"neutral",
        @"item": @"600"
        },
      @"700": @{
        @"value": #404040,
        @"name": @"TextDecorationColorNeutral700",
        @"category": @"textDecorationColor",
        @"type": @"neutral",
        @"item": @"700"
        },
      @"800": @{
        @"value": #262626,
        @"name": @"TextDecorationColorNeutral800",
        @"category": @"textDecorationColor",
        @"type": @"neutral",
        @"item": @"800"
        },
      @"900": @{
        @"value": #171717,
        @"name": @"TextDecorationColorNeutral900",
        @"category": @"textDecorationColor",
        @"type": @"neutral",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0a0a0a,
        @"name": @"TextDecorationColorNeutral950",
        @"category": @"textDecorationColor",
        @"type": @"neutral",
        @"item": @"950"
        }
      },
    @"stone": @{
      @"50": @{
        @"value": #fafaf9,
        @"name": @"TextDecorationColorStone50",
        @"category": @"textDecorationColor",
        @"type": @"stone",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f5f5f4,
        @"name": @"TextDecorationColorStone100",
        @"category": @"textDecorationColor",
        @"type": @"stone",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e7e5e4,
        @"name": @"TextDecorationColorStone200",
        @"category": @"textDecorationColor",
        @"type": @"stone",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d6d3d1,
        @"name": @"TextDecorationColorStone300",
        @"category": @"textDecorationColor",
        @"type": @"stone",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a8a29e,
        @"name": @"TextDecorationColorStone400",
        @"category": @"textDecorationColor",
        @"type": @"stone",
        @"item": @"400"
        },
      @"500": @{
        @"value": #78716c,
        @"name": @"TextDecorationColorStone500",
        @"category": @"textDecorationColor",
        @"type": @"stone",
        @"item": @"500"
        },
      @"600": @{
        @"value": #57534e,
        @"name": @"TextDecorationColorStone600",
        @"category": @"textDecorationColor",
        @"type": @"stone",
        @"item": @"600"
        },
      @"700": @{
        @"value": #44403c,
        @"name": @"TextDecorationColorStone700",
        @"category": @"textDecorationColor",
        @"type": @"stone",
        @"item": @"700"
        },
      @"800": @{
        @"value": #292524,
        @"name": @"TextDecorationColorStone800",
        @"category": @"textDecorationColor",
        @"type": @"stone",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1c1917,
        @"name": @"TextDecorationColorStone900",
        @"category": @"textDecorationColor",
        @"type": @"stone",
        @"item": @"900"
        },
      @"950": @{
        @"value": #0c0a09,
        @"name": @"TextDecorationColorStone950",
        @"category": @"textDecorationColor",
        @"type": @"stone",
        @"item": @"950"
        }
      },
    @"red": @{
      @"50": @{
        @"value": #fef2f2,
        @"name": @"TextDecorationColorRed50",
        @"category": @"textDecorationColor",
        @"type": @"red",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fee2e2,
        @"name": @"TextDecorationColorRed100",
        @"category": @"textDecorationColor",
        @"type": @"red",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecaca,
        @"name": @"TextDecorationColorRed200",
        @"category": @"textDecorationColor",
        @"type": @"red",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fca5a5,
        @"name": @"TextDecorationColorRed300",
        @"category": @"textDecorationColor",
        @"type": @"red",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f87171,
        @"name": @"TextDecorationColorRed400",
        @"category": @"textDecorationColor",
        @"type": @"red",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ef4444,
        @"name": @"TextDecorationColorRed500",
        @"category": @"textDecorationColor",
        @"type": @"red",
        @"item": @"500"
        },
      @"600": @{
        @"value": #dc2626,
        @"name": @"TextDecorationColorRed600",
        @"category": @"textDecorationColor",
        @"type": @"red",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b91c1c,
        @"name": @"TextDecorationColorRed700",
        @"category": @"textDecorationColor",
        @"type": @"red",
        @"item": @"700"
        },
      @"800": @{
        @"value": #991b1b,
        @"name": @"TextDecorationColorRed800",
        @"category": @"textDecorationColor",
        @"type": @"red",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7f1d1d,
        @"name": @"TextDecorationColorRed900",
        @"category": @"textDecorationColor",
        @"type": @"red",
        @"item": @"900"
        },
      @"950": @{
        @"value": #450a0a,
        @"name": @"TextDecorationColorRed950",
        @"category": @"textDecorationColor",
        @"type": @"red",
        @"item": @"950"
        }
      },
    @"orange": @{
      @"50": @{
        @"value": #fff7ed,
        @"name": @"TextDecorationColorOrange50",
        @"category": @"textDecorationColor",
        @"type": @"orange",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffedd5,
        @"name": @"TextDecorationColorOrange100",
        @"category": @"textDecorationColor",
        @"type": @"orange",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fed7aa,
        @"name": @"TextDecorationColorOrange200",
        @"category": @"textDecorationColor",
        @"type": @"orange",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fdba74,
        @"name": @"TextDecorationColorOrange300",
        @"category": @"textDecorationColor",
        @"type": @"orange",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb923c,
        @"name": @"TextDecorationColorOrange400",
        @"category": @"textDecorationColor",
        @"type": @"orange",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f97316,
        @"name": @"TextDecorationColorOrange500",
        @"category": @"textDecorationColor",
        @"type": @"orange",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ea580c,
        @"name": @"TextDecorationColorOrange600",
        @"category": @"textDecorationColor",
        @"type": @"orange",
        @"item": @"600"
        },
      @"700": @{
        @"value": #c2410c,
        @"name": @"TextDecorationColorOrange700",
        @"category": @"textDecorationColor",
        @"type": @"orange",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9a3412,
        @"name": @"TextDecorationColorOrange800",
        @"category": @"textDecorationColor",
        @"type": @"orange",
        @"item": @"800"
        },
      @"900": @{
        @"value": #7c2d12,
        @"name": @"TextDecorationColorOrange900",
        @"category": @"textDecorationColor",
        @"type": @"orange",
        @"item": @"900"
        },
      @"950": @{
        @"value": #431407,
        @"name": @"TextDecorationColorOrange950",
        @"category": @"textDecorationColor",
        @"type": @"orange",
        @"item": @"950"
        }
      },
    @"amber": @{
      @"50": @{
        @"value": #fffbeb,
        @"name": @"TextDecorationColorAmber50",
        @"category": @"textDecorationColor",
        @"type": @"amber",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef3c7,
        @"name": @"TextDecorationColorAmber100",
        @"category": @"textDecorationColor",
        @"type": @"amber",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fde68a,
        @"name": @"TextDecorationColorAmber200",
        @"category": @"textDecorationColor",
        @"type": @"amber",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fcd34d,
        @"name": @"TextDecorationColorAmber300",
        @"category": @"textDecorationColor",
        @"type": @"amber",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fbbf24,
        @"name": @"TextDecorationColorAmber400",
        @"category": @"textDecorationColor",
        @"type": @"amber",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f59e0b,
        @"name": @"TextDecorationColorAmber500",
        @"category": @"textDecorationColor",
        @"type": @"amber",
        @"item": @"500"
        },
      @"600": @{
        @"value": #d97706,
        @"name": @"TextDecorationColorAmber600",
        @"category": @"textDecorationColor",
        @"type": @"amber",
        @"item": @"600"
        },
      @"700": @{
        @"value": #b45309,
        @"name": @"TextDecorationColorAmber700",
        @"category": @"textDecorationColor",
        @"type": @"amber",
        @"item": @"700"
        },
      @"800": @{
        @"value": #92400e,
        @"name": @"TextDecorationColorAmber800",
        @"category": @"textDecorationColor",
        @"type": @"amber",
        @"item": @"800"
        },
      @"900": @{
        @"value": #78350f,
        @"name": @"TextDecorationColorAmber900",
        @"category": @"textDecorationColor",
        @"type": @"amber",
        @"item": @"900"
        },
      @"950": @{
        @"value": #451a03,
        @"name": @"TextDecorationColorAmber950",
        @"category": @"textDecorationColor",
        @"type": @"amber",
        @"item": @"950"
        }
      },
    @"yellow": @{
      @"50": @{
        @"value": #fefce8,
        @"name": @"TextDecorationColorYellow50",
        @"category": @"textDecorationColor",
        @"type": @"yellow",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fef9c3,
        @"name": @"TextDecorationColorYellow100",
        @"category": @"textDecorationColor",
        @"type": @"yellow",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fef08a,
        @"name": @"TextDecorationColorYellow200",
        @"category": @"textDecorationColor",
        @"type": @"yellow",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fde047,
        @"name": @"TextDecorationColorYellow300",
        @"category": @"textDecorationColor",
        @"type": @"yellow",
        @"item": @"300"
        },
      @"400": @{
        @"value": #facc15,
        @"name": @"TextDecorationColorYellow400",
        @"category": @"textDecorationColor",
        @"type": @"yellow",
        @"item": @"400"
        },
      @"500": @{
        @"value": #eab308,
        @"name": @"TextDecorationColorYellow500",
        @"category": @"textDecorationColor",
        @"type": @"yellow",
        @"item": @"500"
        },
      @"600": @{
        @"value": #ca8a04,
        @"name": @"TextDecorationColorYellow600",
        @"category": @"textDecorationColor",
        @"type": @"yellow",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a16207,
        @"name": @"TextDecorationColorYellow700",
        @"category": @"textDecorationColor",
        @"type": @"yellow",
        @"item": @"700"
        },
      @"800": @{
        @"value": #854d0e,
        @"name": @"TextDecorationColorYellow800",
        @"category": @"textDecorationColor",
        @"type": @"yellow",
        @"item": @"800"
        },
      @"900": @{
        @"value": #713f12,
        @"name": @"TextDecorationColorYellow900",
        @"category": @"textDecorationColor",
        @"type": @"yellow",
        @"item": @"900"
        },
      @"950": @{
        @"value": #422006,
        @"name": @"TextDecorationColorYellow950",
        @"category": @"textDecorationColor",
        @"type": @"yellow",
        @"item": @"950"
        }
      },
    @"lime": @{
      @"50": @{
        @"value": #f7fee7,
        @"name": @"TextDecorationColorLime50",
        @"category": @"textDecorationColor",
        @"type": @"lime",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ecfccb,
        @"name": @"TextDecorationColorLime100",
        @"category": @"textDecorationColor",
        @"type": @"lime",
        @"item": @"100"
        },
      @"200": @{
        @"value": #d9f99d,
        @"name": @"TextDecorationColorLime200",
        @"category": @"textDecorationColor",
        @"type": @"lime",
        @"item": @"200"
        },
      @"300": @{
        @"value": #bef264,
        @"name": @"TextDecorationColorLime300",
        @"category": @"textDecorationColor",
        @"type": @"lime",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a3e635,
        @"name": @"TextDecorationColorLime400",
        @"category": @"textDecorationColor",
        @"type": @"lime",
        @"item": @"400"
        },
      @"500": @{
        @"value": #84cc16,
        @"name": @"TextDecorationColorLime500",
        @"category": @"textDecorationColor",
        @"type": @"lime",
        @"item": @"500"
        },
      @"600": @{
        @"value": #65a30d,
        @"name": @"TextDecorationColorLime600",
        @"category": @"textDecorationColor",
        @"type": @"lime",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4d7c0f,
        @"name": @"TextDecorationColorLime700",
        @"category": @"textDecorationColor",
        @"type": @"lime",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3f6212,
        @"name": @"TextDecorationColorLime800",
        @"category": @"textDecorationColor",
        @"type": @"lime",
        @"item": @"800"
        },
      @"900": @{
        @"value": #365314,
        @"name": @"TextDecorationColorLime900",
        @"category": @"textDecorationColor",
        @"type": @"lime",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1a2e05,
        @"name": @"TextDecorationColorLime950",
        @"category": @"textDecorationColor",
        @"type": @"lime",
        @"item": @"950"
        }
      },
    @"green": @{
      @"50": @{
        @"value": #f0fdf4,
        @"name": @"TextDecorationColorGreen50",
        @"category": @"textDecorationColor",
        @"type": @"green",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dcfce7,
        @"name": @"TextDecorationColorGreen100",
        @"category": @"textDecorationColor",
        @"type": @"green",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bbf7d0,
        @"name": @"TextDecorationColorGreen200",
        @"category": @"textDecorationColor",
        @"type": @"green",
        @"item": @"200"
        },
      @"300": @{
        @"value": #86efac,
        @"name": @"TextDecorationColorGreen300",
        @"category": @"textDecorationColor",
        @"type": @"green",
        @"item": @"300"
        },
      @"400": @{
        @"value": #4ade80,
        @"name": @"TextDecorationColorGreen400",
        @"category": @"textDecorationColor",
        @"type": @"green",
        @"item": @"400"
        },
      @"500": @{
        @"value": #22c55e,
        @"name": @"TextDecorationColorGreen500",
        @"category": @"textDecorationColor",
        @"type": @"green",
        @"item": @"500"
        },
      @"600": @{
        @"value": #16a34a,
        @"name": @"TextDecorationColorGreen600",
        @"category": @"textDecorationColor",
        @"type": @"green",
        @"item": @"600"
        },
      @"700": @{
        @"value": #15803d,
        @"name": @"TextDecorationColorGreen700",
        @"category": @"textDecorationColor",
        @"type": @"green",
        @"item": @"700"
        },
      @"800": @{
        @"value": #166534,
        @"name": @"TextDecorationColorGreen800",
        @"category": @"textDecorationColor",
        @"type": @"green",
        @"item": @"800"
        },
      @"900": @{
        @"value": #14532d,
        @"name": @"TextDecorationColorGreen900",
        @"category": @"textDecorationColor",
        @"type": @"green",
        @"item": @"900"
        },
      @"950": @{
        @"value": #052e16,
        @"name": @"TextDecorationColorGreen950",
        @"category": @"textDecorationColor",
        @"type": @"green",
        @"item": @"950"
        }
      },
    @"emerald": @{
      @"50": @{
        @"value": #ecfdf5,
        @"name": @"TextDecorationColorEmerald50",
        @"category": @"textDecorationColor",
        @"type": @"emerald",
        @"item": @"50"
        },
      @"100": @{
        @"value": #d1fae5,
        @"name": @"TextDecorationColorEmerald100",
        @"category": @"textDecorationColor",
        @"type": @"emerald",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a7f3d0,
        @"name": @"TextDecorationColorEmerald200",
        @"category": @"textDecorationColor",
        @"type": @"emerald",
        @"item": @"200"
        },
      @"300": @{
        @"value": #6ee7b7,
        @"name": @"TextDecorationColorEmerald300",
        @"category": @"textDecorationColor",
        @"type": @"emerald",
        @"item": @"300"
        },
      @"400": @{
        @"value": #34d399,
        @"name": @"TextDecorationColorEmerald400",
        @"category": @"textDecorationColor",
        @"type": @"emerald",
        @"item": @"400"
        },
      @"500": @{
        @"value": #10b981,
        @"name": @"TextDecorationColorEmerald500",
        @"category": @"textDecorationColor",
        @"type": @"emerald",
        @"item": @"500"
        },
      @"600": @{
        @"value": #059669,
        @"name": @"TextDecorationColorEmerald600",
        @"category": @"textDecorationColor",
        @"type": @"emerald",
        @"item": @"600"
        },
      @"700": @{
        @"value": #047857,
        @"name": @"TextDecorationColorEmerald700",
        @"category": @"textDecorationColor",
        @"type": @"emerald",
        @"item": @"700"
        },
      @"800": @{
        @"value": #065f46,
        @"name": @"TextDecorationColorEmerald800",
        @"category": @"textDecorationColor",
        @"type": @"emerald",
        @"item": @"800"
        },
      @"900": @{
        @"value": #064e3b,
        @"name": @"TextDecorationColorEmerald900",
        @"category": @"textDecorationColor",
        @"type": @"emerald",
        @"item": @"900"
        },
      @"950": @{
        @"value": #022c22,
        @"name": @"TextDecorationColorEmerald950",
        @"category": @"textDecorationColor",
        @"type": @"emerald",
        @"item": @"950"
        }
      },
    @"teal": @{
      @"50": @{
        @"value": #f0fdfa,
        @"name": @"TextDecorationColorTeal50",
        @"category": @"textDecorationColor",
        @"type": @"teal",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ccfbf1,
        @"name": @"TextDecorationColorTeal100",
        @"category": @"textDecorationColor",
        @"type": @"teal",
        @"item": @"100"
        },
      @"200": @{
        @"value": #99f6e4,
        @"name": @"TextDecorationColorTeal200",
        @"category": @"textDecorationColor",
        @"type": @"teal",
        @"item": @"200"
        },
      @"300": @{
        @"value": #5eead4,
        @"name": @"TextDecorationColorTeal300",
        @"category": @"textDecorationColor",
        @"type": @"teal",
        @"item": @"300"
        },
      @"400": @{
        @"value": #2dd4bf,
        @"name": @"TextDecorationColorTeal400",
        @"category": @"textDecorationColor",
        @"type": @"teal",
        @"item": @"400"
        },
      @"500": @{
        @"value": #14b8a6,
        @"name": @"TextDecorationColorTeal500",
        @"category": @"textDecorationColor",
        @"type": @"teal",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0d9488,
        @"name": @"TextDecorationColorTeal600",
        @"category": @"textDecorationColor",
        @"type": @"teal",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0f766e,
        @"name": @"TextDecorationColorTeal700",
        @"category": @"textDecorationColor",
        @"type": @"teal",
        @"item": @"700"
        },
      @"800": @{
        @"value": #115e59,
        @"name": @"TextDecorationColorTeal800",
        @"category": @"textDecorationColor",
        @"type": @"teal",
        @"item": @"800"
        },
      @"900": @{
        @"value": #134e4a,
        @"name": @"TextDecorationColorTeal900",
        @"category": @"textDecorationColor",
        @"type": @"teal",
        @"item": @"900"
        },
      @"950": @{
        @"value": #042f2e,
        @"name": @"TextDecorationColorTeal950",
        @"category": @"textDecorationColor",
        @"type": @"teal",
        @"item": @"950"
        }
      },
    @"cyan": @{
      @"50": @{
        @"value": #ecfeff,
        @"name": @"TextDecorationColorCyan50",
        @"category": @"textDecorationColor",
        @"type": @"cyan",
        @"item": @"50"
        },
      @"100": @{
        @"value": #cffafe,
        @"name": @"TextDecorationColorCyan100",
        @"category": @"textDecorationColor",
        @"type": @"cyan",
        @"item": @"100"
        },
      @"200": @{
        @"value": #a5f3fc,
        @"name": @"TextDecorationColorCyan200",
        @"category": @"textDecorationColor",
        @"type": @"cyan",
        @"item": @"200"
        },
      @"300": @{
        @"value": #67e8f9,
        @"name": @"TextDecorationColorCyan300",
        @"category": @"textDecorationColor",
        @"type": @"cyan",
        @"item": @"300"
        },
      @"400": @{
        @"value": #22d3ee,
        @"name": @"TextDecorationColorCyan400",
        @"category": @"textDecorationColor",
        @"type": @"cyan",
        @"item": @"400"
        },
      @"500": @{
        @"value": #06b6d4,
        @"name": @"TextDecorationColorCyan500",
        @"category": @"textDecorationColor",
        @"type": @"cyan",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0891b2,
        @"name": @"TextDecorationColorCyan600",
        @"category": @"textDecorationColor",
        @"type": @"cyan",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0e7490,
        @"name": @"TextDecorationColorCyan700",
        @"category": @"textDecorationColor",
        @"type": @"cyan",
        @"item": @"700"
        },
      @"800": @{
        @"value": #155e75,
        @"name": @"TextDecorationColorCyan800",
        @"category": @"textDecorationColor",
        @"type": @"cyan",
        @"item": @"800"
        },
      @"900": @{
        @"value": #164e63,
        @"name": @"TextDecorationColorCyan900",
        @"category": @"textDecorationColor",
        @"type": @"cyan",
        @"item": @"900"
        },
      @"950": @{
        @"value": #083344,
        @"name": @"TextDecorationColorCyan950",
        @"category": @"textDecorationColor",
        @"type": @"cyan",
        @"item": @"950"
        }
      },
    @"sky": @{
      @"50": @{
        @"value": #f0f9ff,
        @"name": @"TextDecorationColorSky50",
        @"category": @"textDecorationColor",
        @"type": @"sky",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0f2fe,
        @"name": @"TextDecorationColorSky100",
        @"category": @"textDecorationColor",
        @"type": @"sky",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bae6fd,
        @"name": @"TextDecorationColorSky200",
        @"category": @"textDecorationColor",
        @"type": @"sky",
        @"item": @"200"
        },
      @"300": @{
        @"value": #7dd3fc,
        @"name": @"TextDecorationColorSky300",
        @"category": @"textDecorationColor",
        @"type": @"sky",
        @"item": @"300"
        },
      @"400": @{
        @"value": #38bdf8,
        @"name": @"TextDecorationColorSky400",
        @"category": @"textDecorationColor",
        @"type": @"sky",
        @"item": @"400"
        },
      @"500": @{
        @"value": #0ea5e9,
        @"name": @"TextDecorationColorSky500",
        @"category": @"textDecorationColor",
        @"type": @"sky",
        @"item": @"500"
        },
      @"600": @{
        @"value": #0284c7,
        @"name": @"TextDecorationColorSky600",
        @"category": @"textDecorationColor",
        @"type": @"sky",
        @"item": @"600"
        },
      @"700": @{
        @"value": #0369a1,
        @"name": @"TextDecorationColorSky700",
        @"category": @"textDecorationColor",
        @"type": @"sky",
        @"item": @"700"
        },
      @"800": @{
        @"value": #075985,
        @"name": @"TextDecorationColorSky800",
        @"category": @"textDecorationColor",
        @"type": @"sky",
        @"item": @"800"
        },
      @"900": @{
        @"value": #0c4a6e,
        @"name": @"TextDecorationColorSky900",
        @"category": @"textDecorationColor",
        @"type": @"sky",
        @"item": @"900"
        },
      @"950": @{
        @"value": #082f49,
        @"name": @"TextDecorationColorSky950",
        @"category": @"textDecorationColor",
        @"type": @"sky",
        @"item": @"950"
        }
      },
    @"blue": @{
      @"50": @{
        @"value": #eff6ff,
        @"name": @"TextDecorationColorBlue50",
        @"category": @"textDecorationColor",
        @"type": @"blue",
        @"item": @"50"
        },
      @"100": @{
        @"value": #dbeafe,
        @"name": @"TextDecorationColorBlue100",
        @"category": @"textDecorationColor",
        @"type": @"blue",
        @"item": @"100"
        },
      @"200": @{
        @"value": #bfdbfe,
        @"name": @"TextDecorationColorBlue200",
        @"category": @"textDecorationColor",
        @"type": @"blue",
        @"item": @"200"
        },
      @"300": @{
        @"value": #93c5fd,
        @"name": @"TextDecorationColorBlue300",
        @"category": @"textDecorationColor",
        @"type": @"blue",
        @"item": @"300"
        },
      @"400": @{
        @"value": #60a5fa,
        @"name": @"TextDecorationColorBlue400",
        @"category": @"textDecorationColor",
        @"type": @"blue",
        @"item": @"400"
        },
      @"500": @{
        @"value": #3b82f6,
        @"name": @"TextDecorationColorBlue500",
        @"category": @"textDecorationColor",
        @"type": @"blue",
        @"item": @"500"
        },
      @"600": @{
        @"value": #2563eb,
        @"name": @"TextDecorationColorBlue600",
        @"category": @"textDecorationColor",
        @"type": @"blue",
        @"item": @"600"
        },
      @"700": @{
        @"value": #1d4ed8,
        @"name": @"TextDecorationColorBlue700",
        @"category": @"textDecorationColor",
        @"type": @"blue",
        @"item": @"700"
        },
      @"800": @{
        @"value": #1e40af,
        @"name": @"TextDecorationColorBlue800",
        @"category": @"textDecorationColor",
        @"type": @"blue",
        @"item": @"800"
        },
      @"900": @{
        @"value": #1e3a8a,
        @"name": @"TextDecorationColorBlue900",
        @"category": @"textDecorationColor",
        @"type": @"blue",
        @"item": @"900"
        },
      @"950": @{
        @"value": #172554,
        @"name": @"TextDecorationColorBlue950",
        @"category": @"textDecorationColor",
        @"type": @"blue",
        @"item": @"950"
        }
      },
    @"indigo": @{
      @"50": @{
        @"value": #eef2ff,
        @"name": @"TextDecorationColorIndigo50",
        @"category": @"textDecorationColor",
        @"type": @"indigo",
        @"item": @"50"
        },
      @"100": @{
        @"value": #e0e7ff,
        @"name": @"TextDecorationColorIndigo100",
        @"category": @"textDecorationColor",
        @"type": @"indigo",
        @"item": @"100"
        },
      @"200": @{
        @"value": #c7d2fe,
        @"name": @"TextDecorationColorIndigo200",
        @"category": @"textDecorationColor",
        @"type": @"indigo",
        @"item": @"200"
        },
      @"300": @{
        @"value": #a5b4fc,
        @"name": @"TextDecorationColorIndigo300",
        @"category": @"textDecorationColor",
        @"type": @"indigo",
        @"item": @"300"
        },
      @"400": @{
        @"value": #818cf8,
        @"name": @"TextDecorationColorIndigo400",
        @"category": @"textDecorationColor",
        @"type": @"indigo",
        @"item": @"400"
        },
      @"500": @{
        @"value": #6366f1,
        @"name": @"TextDecorationColorIndigo500",
        @"category": @"textDecorationColor",
        @"type": @"indigo",
        @"item": @"500"
        },
      @"600": @{
        @"value": #4f46e5,
        @"name": @"TextDecorationColorIndigo600",
        @"category": @"textDecorationColor",
        @"type": @"indigo",
        @"item": @"600"
        },
      @"700": @{
        @"value": #4338ca,
        @"name": @"TextDecorationColorIndigo700",
        @"category": @"textDecorationColor",
        @"type": @"indigo",
        @"item": @"700"
        },
      @"800": @{
        @"value": #3730a3,
        @"name": @"TextDecorationColorIndigo800",
        @"category": @"textDecorationColor",
        @"type": @"indigo",
        @"item": @"800"
        },
      @"900": @{
        @"value": #312e81,
        @"name": @"TextDecorationColorIndigo900",
        @"category": @"textDecorationColor",
        @"type": @"indigo",
        @"item": @"900"
        },
      @"950": @{
        @"value": #1e1b4b,
        @"name": @"TextDecorationColorIndigo950",
        @"category": @"textDecorationColor",
        @"type": @"indigo",
        @"item": @"950"
        }
      },
    @"violet": @{
      @"50": @{
        @"value": #f5f3ff,
        @"name": @"TextDecorationColorViolet50",
        @"category": @"textDecorationColor",
        @"type": @"violet",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ede9fe,
        @"name": @"TextDecorationColorViolet100",
        @"category": @"textDecorationColor",
        @"type": @"violet",
        @"item": @"100"
        },
      @"200": @{
        @"value": #ddd6fe,
        @"name": @"TextDecorationColorViolet200",
        @"category": @"textDecorationColor",
        @"type": @"violet",
        @"item": @"200"
        },
      @"300": @{
        @"value": #c4b5fd,
        @"name": @"TextDecorationColorViolet300",
        @"category": @"textDecorationColor",
        @"type": @"violet",
        @"item": @"300"
        },
      @"400": @{
        @"value": #a78bfa,
        @"name": @"TextDecorationColorViolet400",
        @"category": @"textDecorationColor",
        @"type": @"violet",
        @"item": @"400"
        },
      @"500": @{
        @"value": #8b5cf6,
        @"name": @"TextDecorationColorViolet500",
        @"category": @"textDecorationColor",
        @"type": @"violet",
        @"item": @"500"
        },
      @"600": @{
        @"value": #7c3aed,
        @"name": @"TextDecorationColorViolet600",
        @"category": @"textDecorationColor",
        @"type": @"violet",
        @"item": @"600"
        },
      @"700": @{
        @"value": #6d28d9,
        @"name": @"TextDecorationColorViolet700",
        @"category": @"textDecorationColor",
        @"type": @"violet",
        @"item": @"700"
        },
      @"800": @{
        @"value": #5b21b6,
        @"name": @"TextDecorationColorViolet800",
        @"category": @"textDecorationColor",
        @"type": @"violet",
        @"item": @"800"
        },
      @"900": @{
        @"value": #4c1d95,
        @"name": @"TextDecorationColorViolet900",
        @"category": @"textDecorationColor",
        @"type": @"violet",
        @"item": @"900"
        },
      @"950": @{
        @"value": #2e1065,
        @"name": @"TextDecorationColorViolet950",
        @"category": @"textDecorationColor",
        @"type": @"violet",
        @"item": @"950"
        }
      },
    @"purple": @{
      @"50": @{
        @"value": #faf5ff,
        @"name": @"TextDecorationColorPurple50",
        @"category": @"textDecorationColor",
        @"type": @"purple",
        @"item": @"50"
        },
      @"100": @{
        @"value": #f3e8ff,
        @"name": @"TextDecorationColorPurple100",
        @"category": @"textDecorationColor",
        @"type": @"purple",
        @"item": @"100"
        },
      @"200": @{
        @"value": #e9d5ff,
        @"name": @"TextDecorationColorPurple200",
        @"category": @"textDecorationColor",
        @"type": @"purple",
        @"item": @"200"
        },
      @"300": @{
        @"value": #d8b4fe,
        @"name": @"TextDecorationColorPurple300",
        @"category": @"textDecorationColor",
        @"type": @"purple",
        @"item": @"300"
        },
      @"400": @{
        @"value": #c084fc,
        @"name": @"TextDecorationColorPurple400",
        @"category": @"textDecorationColor",
        @"type": @"purple",
        @"item": @"400"
        },
      @"500": @{
        @"value": #a855f7,
        @"name": @"TextDecorationColorPurple500",
        @"category": @"textDecorationColor",
        @"type": @"purple",
        @"item": @"500"
        },
      @"600": @{
        @"value": #9333ea,
        @"name": @"TextDecorationColorPurple600",
        @"category": @"textDecorationColor",
        @"type": @"purple",
        @"item": @"600"
        },
      @"700": @{
        @"value": #7e22ce,
        @"name": @"TextDecorationColorPurple700",
        @"category": @"textDecorationColor",
        @"type": @"purple",
        @"item": @"700"
        },
      @"800": @{
        @"value": #6b21a8,
        @"name": @"TextDecorationColorPurple800",
        @"category": @"textDecorationColor",
        @"type": @"purple",
        @"item": @"800"
        },
      @"900": @{
        @"value": #581c87,
        @"name": @"TextDecorationColorPurple900",
        @"category": @"textDecorationColor",
        @"type": @"purple",
        @"item": @"900"
        },
      @"950": @{
        @"value": #3b0764,
        @"name": @"TextDecorationColorPurple950",
        @"category": @"textDecorationColor",
        @"type": @"purple",
        @"item": @"950"
        }
      },
    @"fuchsia": @{
      @"50": @{
        @"value": #fdf4ff,
        @"name": @"TextDecorationColorFuchsia50",
        @"category": @"textDecorationColor",
        @"type": @"fuchsia",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fae8ff,
        @"name": @"TextDecorationColorFuchsia100",
        @"category": @"textDecorationColor",
        @"type": @"fuchsia",
        @"item": @"100"
        },
      @"200": @{
        @"value": #f5d0fe,
        @"name": @"TextDecorationColorFuchsia200",
        @"category": @"textDecorationColor",
        @"type": @"fuchsia",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f0abfc,
        @"name": @"TextDecorationColorFuchsia300",
        @"category": @"textDecorationColor",
        @"type": @"fuchsia",
        @"item": @"300"
        },
      @"400": @{
        @"value": #e879f9,
        @"name": @"TextDecorationColorFuchsia400",
        @"category": @"textDecorationColor",
        @"type": @"fuchsia",
        @"item": @"400"
        },
      @"500": @{
        @"value": #d946ef,
        @"name": @"TextDecorationColorFuchsia500",
        @"category": @"textDecorationColor",
        @"type": @"fuchsia",
        @"item": @"500"
        },
      @"600": @{
        @"value": #c026d3,
        @"name": @"TextDecorationColorFuchsia600",
        @"category": @"textDecorationColor",
        @"type": @"fuchsia",
        @"item": @"600"
        },
      @"700": @{
        @"value": #a21caf,
        @"name": @"TextDecorationColorFuchsia700",
        @"category": @"textDecorationColor",
        @"type": @"fuchsia",
        @"item": @"700"
        },
      @"800": @{
        @"value": #86198f,
        @"name": @"TextDecorationColorFuchsia800",
        @"category": @"textDecorationColor",
        @"type": @"fuchsia",
        @"item": @"800"
        },
      @"900": @{
        @"value": #701a75,
        @"name": @"TextDecorationColorFuchsia900",
        @"category": @"textDecorationColor",
        @"type": @"fuchsia",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4a044e,
        @"name": @"TextDecorationColorFuchsia950",
        @"category": @"textDecorationColor",
        @"type": @"fuchsia",
        @"item": @"950"
        }
      },
    @"pink": @{
      @"50": @{
        @"value": #fdf2f8,
        @"name": @"TextDecorationColorPink50",
        @"category": @"textDecorationColor",
        @"type": @"pink",
        @"item": @"50"
        },
      @"100": @{
        @"value": #fce7f3,
        @"name": @"TextDecorationColorPink100",
        @"category": @"textDecorationColor",
        @"type": @"pink",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fbcfe8,
        @"name": @"TextDecorationColorPink200",
        @"category": @"textDecorationColor",
        @"type": @"pink",
        @"item": @"200"
        },
      @"300": @{
        @"value": #f9a8d4,
        @"name": @"TextDecorationColorPink300",
        @"category": @"textDecorationColor",
        @"type": @"pink",
        @"item": @"300"
        },
      @"400": @{
        @"value": #f472b6,
        @"name": @"TextDecorationColorPink400",
        @"category": @"textDecorationColor",
        @"type": @"pink",
        @"item": @"400"
        },
      @"500": @{
        @"value": #ec4899,
        @"name": @"TextDecorationColorPink500",
        @"category": @"textDecorationColor",
        @"type": @"pink",
        @"item": @"500"
        },
      @"600": @{
        @"value": #db2777,
        @"name": @"TextDecorationColorPink600",
        @"category": @"textDecorationColor",
        @"type": @"pink",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be185d,
        @"name": @"TextDecorationColorPink700",
        @"category": @"textDecorationColor",
        @"type": @"pink",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9d174d,
        @"name": @"TextDecorationColorPink800",
        @"category": @"textDecorationColor",
        @"type": @"pink",
        @"item": @"800"
        },
      @"900": @{
        @"value": #831843,
        @"name": @"TextDecorationColorPink900",
        @"category": @"textDecorationColor",
        @"type": @"pink",
        @"item": @"900"
        },
      @"950": @{
        @"value": #500724,
        @"name": @"TextDecorationColorPink950",
        @"category": @"textDecorationColor",
        @"type": @"pink",
        @"item": @"950"
        }
      },
    @"rose": @{
      @"50": @{
        @"value": #fff1f2,
        @"name": @"TextDecorationColorRose50",
        @"category": @"textDecorationColor",
        @"type": @"rose",
        @"item": @"50"
        },
      @"100": @{
        @"value": #ffe4e6,
        @"name": @"TextDecorationColorRose100",
        @"category": @"textDecorationColor",
        @"type": @"rose",
        @"item": @"100"
        },
      @"200": @{
        @"value": #fecdd3,
        @"name": @"TextDecorationColorRose200",
        @"category": @"textDecorationColor",
        @"type": @"rose",
        @"item": @"200"
        },
      @"300": @{
        @"value": #fda4af,
        @"name": @"TextDecorationColorRose300",
        @"category": @"textDecorationColor",
        @"type": @"rose",
        @"item": @"300"
        },
      @"400": @{
        @"value": #fb7185,
        @"name": @"TextDecorationColorRose400",
        @"category": @"textDecorationColor",
        @"type": @"rose",
        @"item": @"400"
        },
      @"500": @{
        @"value": #f43f5e,
        @"name": @"TextDecorationColorRose500",
        @"category": @"textDecorationColor",
        @"type": @"rose",
        @"item": @"500"
        },
      @"600": @{
        @"value": #e11d48,
        @"name": @"TextDecorationColorRose600",
        @"category": @"textDecorationColor",
        @"type": @"rose",
        @"item": @"600"
        },
      @"700": @{
        @"value": #be123c,
        @"name": @"TextDecorationColorRose700",
        @"category": @"textDecorationColor",
        @"type": @"rose",
        @"item": @"700"
        },
      @"800": @{
        @"value": #9f1239,
        @"name": @"TextDecorationColorRose800",
        @"category": @"textDecorationColor",
        @"type": @"rose",
        @"item": @"800"
        },
      @"900": @{
        @"value": #881337,
        @"name": @"TextDecorationColorRose900",
        @"category": @"textDecorationColor",
        @"type": @"rose",
        @"item": @"900"
        },
      @"950": @{
        @"value": #4c0519,
        @"name": @"TextDecorationColorRose950",
        @"category": @"textDecorationColor",
        @"type": @"rose",
        @"item": @"950"
        }
      }
    },
  @"textDecorationThickness": @{
    @"0": @{
      @"value": 0px,
      @"name": @"TextDecorationThickness0",
      @"category": @"textDecorationThickness",
      @"type": @"0"
      },
    @"1": @{
      @"value": 1px,
      @"name": @"TextDecorationThickness1",
      @"category": @"textDecorationThickness",
      @"type": @"1"
      },
    @"2": @{
      @"value": 2px,
      @"name": @"TextDecorationThickness2",
      @"category": @"textDecorationThickness",
      @"type": @"2"
      },
    @"4": @{
      @"value": 4px,
      @"name": @"TextDecorationThickness4",
      @"category": @"textDecorationThickness",
      @"type": @"4"
      },
    @"8": @{
      @"value": 8px,
      @"name": @"TextDecorationThickness8",
      @"category": @"textDecorationThickness",
      @"type": @"8"
      },
    @"auto": @{
      @"value": auto,
      @"name": @"TextDecorationThicknessAuto",
      @"category": @"textDecorationThickness",
      @"type": @"auto"
      },
    @"from-font": @{
      @"value": from-font,
      @"name": @"TextDecorationThicknessFromFont",
      @"category": @"textDecorationThickness",
      @"type": @"from-font"
      }
    },
  @"textIndent": @{
    @"0": @{
      @"value": 0px,
      @"name": @"TextIndent0",
      @"category": @"textIndent",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"TextIndent1",
      @"category": @"textIndent",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"TextIndent2",
      @"category": @"textIndent",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"TextIndent3",
      @"category": @"textIndent",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"TextIndent4",
      @"category": @"textIndent",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"TextIndent5",
      @"category": @"textIndent",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"TextIndent6",
      @"category": @"textIndent",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"TextIndent7",
      @"category": @"textIndent",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"TextIndent8",
      @"category": @"textIndent",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"TextIndent9",
      @"category": @"textIndent",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"TextIndent10",
      @"category": @"textIndent",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"TextIndent11",
      @"category": @"textIndent",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"TextIndent12",
      @"category": @"textIndent",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"TextIndent14",
      @"category": @"textIndent",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"TextIndent16",
      @"category": @"textIndent",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"TextIndent20",
      @"category": @"textIndent",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"TextIndent24",
      @"category": @"textIndent",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"TextIndent28",
      @"category": @"textIndent",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"TextIndent32",
      @"category": @"textIndent",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"TextIndent36",
      @"category": @"textIndent",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"TextIndent40",
      @"category": @"textIndent",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"TextIndent44",
      @"category": @"textIndent",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"TextIndent48",
      @"category": @"textIndent",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"TextIndent52",
      @"category": @"textIndent",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"TextIndent56",
      @"category": @"textIndent",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"TextIndent60",
      @"category": @"textIndent",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"TextIndent64",
      @"category": @"textIndent",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"TextIndent72",
      @"category": @"textIndent",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"TextIndent80",
      @"category": @"textIndent",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"TextIndent96",
      @"category": @"textIndent",
      @"type": @"96"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"TextIndentPx",
      @"category": @"textIndent",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"TextIndent05",
      @"category": @"textIndent",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"TextIndent15",
      @"category": @"textIndent",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"TextIndent25",
      @"category": @"textIndent",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"TextIndent35",
      @"category": @"textIndent",
      @"type": @"3.5"
      }
    },
  @"textOpacity": @{
    @"0": @{
      @"value": 0,
      @"name": @"TextOpacity0",
      @"category": @"textOpacity",
      @"type": @"0"
      },
    @"5": @{
      @"value": 0.05,
      @"name": @"TextOpacity5",
      @"category": @"textOpacity",
      @"type": @"5"
      },
    @"10": @{
      @"value": 0.1,
      @"name": @"TextOpacity10",
      @"category": @"textOpacity",
      @"type": @"10"
      },
    @"15": @{
      @"value": 0.15,
      @"name": @"TextOpacity15",
      @"category": @"textOpacity",
      @"type": @"15"
      },
    @"20": @{
      @"value": 0.2,
      @"name": @"TextOpacity20",
      @"category": @"textOpacity",
      @"type": @"20"
      },
    @"25": @{
      @"value": 0.25,
      @"name": @"TextOpacity25",
      @"category": @"textOpacity",
      @"type": @"25"
      },
    @"30": @{
      @"value": 0.3,
      @"name": @"TextOpacity30",
      @"category": @"textOpacity",
      @"type": @"30"
      },
    @"35": @{
      @"value": 0.35,
      @"name": @"TextOpacity35",
      @"category": @"textOpacity",
      @"type": @"35"
      },
    @"40": @{
      @"value": 0.4,
      @"name": @"TextOpacity40",
      @"category": @"textOpacity",
      @"type": @"40"
      },
    @"45": @{
      @"value": 0.45,
      @"name": @"TextOpacity45",
      @"category": @"textOpacity",
      @"type": @"45"
      },
    @"50": @{
      @"value": 0.5,
      @"name": @"TextOpacity50",
      @"category": @"textOpacity",
      @"type": @"50"
      },
    @"55": @{
      @"value": 0.55,
      @"name": @"TextOpacity55",
      @"category": @"textOpacity",
      @"type": @"55"
      },
    @"60": @{
      @"value": 0.6,
      @"name": @"TextOpacity60",
      @"category": @"textOpacity",
      @"type": @"60"
      },
    @"65": @{
      @"value": 0.65,
      @"name": @"TextOpacity65",
      @"category": @"textOpacity",
      @"type": @"65"
      },
    @"70": @{
      @"value": 0.7,
      @"name": @"TextOpacity70",
      @"category": @"textOpacity",
      @"type": @"70"
      },
    @"75": @{
      @"value": 0.75,
      @"name": @"TextOpacity75",
      @"category": @"textOpacity",
      @"type": @"75"
      },
    @"80": @{
      @"value": 0.8,
      @"name": @"TextOpacity80",
      @"category": @"textOpacity",
      @"type": @"80"
      },
    @"85": @{
      @"value": 0.85,
      @"name": @"TextOpacity85",
      @"category": @"textOpacity",
      @"type": @"85"
      },
    @"90": @{
      @"value": 0.9,
      @"name": @"TextOpacity90",
      @"category": @"textOpacity",
      @"type": @"90"
      },
    @"95": @{
      @"value": 0.95,
      @"name": @"TextOpacity95",
      @"category": @"textOpacity",
      @"type": @"95"
      },
    @"100": @{
      @"value": 1,
      @"name": @"TextOpacity100",
      @"category": @"textOpacity",
      @"type": @"100"
      }
    },
  @"textUnderlineOffset": @{
    @"0": @{
      @"value": 0px,
      @"name": @"TextUnderlineOffset0",
      @"category": @"textUnderlineOffset",
      @"type": @"0"
      },
    @"1": @{
      @"value": 1px,
      @"name": @"TextUnderlineOffset1",
      @"category": @"textUnderlineOffset",
      @"type": @"1"
      },
    @"2": @{
      @"value": 2px,
      @"name": @"TextUnderlineOffset2",
      @"category": @"textUnderlineOffset",
      @"type": @"2"
      },
    @"4": @{
      @"value": 4px,
      @"name": @"TextUnderlineOffset4",
      @"category": @"textUnderlineOffset",
      @"type": @"4"
      },
    @"8": @{
      @"value": 8px,
      @"name": @"TextUnderlineOffset8",
      @"category": @"textUnderlineOffset",
      @"type": @"8"
      },
    @"auto": @{
      @"value": auto,
      @"name": @"TextUnderlineOffsetAuto",
      @"category": @"textUnderlineOffset",
      @"type": @"auto"
      }
    },
  @"transformOrigin": @{
    @"center": @{
      @"value": center,
      @"name": @"TransformOriginCenter",
      @"category": @"transformOrigin",
      @"type": @"center"
      },
    @"top": @{
      @"value": top,
      @"name": @"TransformOriginTop",
      @"category": @"transformOrigin",
      @"type": @"top"
      },
    @"top-right": @{
      @"value": top right,
      @"name": @"TransformOriginTopRight",
      @"category": @"transformOrigin",
      @"type": @"top-right"
      },
    @"right": @{
      @"value": right,
      @"name": @"TransformOriginRight",
      @"category": @"transformOrigin",
      @"type": @"right"
      },
    @"bottom-right": @{
      @"value": bottom right,
      @"name": @"TransformOriginBottomRight",
      @"category": @"transformOrigin",
      @"type": @"bottom-right"
      },
    @"bottom": @{
      @"value": bottom,
      @"name": @"TransformOriginBottom",
      @"category": @"transformOrigin",
      @"type": @"bottom"
      },
    @"bottom-left": @{
      @"value": bottom left,
      @"name": @"TransformOriginBottomLeft",
      @"category": @"transformOrigin",
      @"type": @"bottom-left"
      },
    @"left": @{
      @"value": left,
      @"name": @"TransformOriginLeft",
      @"category": @"transformOrigin",
      @"type": @"left"
      },
    @"top-left": @{
      @"value": top left,
      @"name": @"TransformOriginTopLeft",
      @"category": @"transformOrigin",
      @"type": @"top-left"
      }
    },
  @"transitionDelay": @{
    @"0": @{
      @"value": 0s,
      @"name": @"TransitionDelay0",
      @"category": @"transitionDelay",
      @"type": @"0"
      },
    @"75": @{
      @"value": 75ms,
      @"name": @"TransitionDelay75",
      @"category": @"transitionDelay",
      @"type": @"75"
      },
    @"100": @{
      @"value": 100ms,
      @"name": @"TransitionDelay100",
      @"category": @"transitionDelay",
      @"type": @"100"
      },
    @"150": @{
      @"value": 150ms,
      @"name": @"TransitionDelay150",
      @"category": @"transitionDelay",
      @"type": @"150"
      },
    @"200": @{
      @"value": 200ms,
      @"name": @"TransitionDelay200",
      @"category": @"transitionDelay",
      @"type": @"200"
      },
    @"300": @{
      @"value": 300ms,
      @"name": @"TransitionDelay300",
      @"category": @"transitionDelay",
      @"type": @"300"
      },
    @"500": @{
      @"value": 500ms,
      @"name": @"TransitionDelay500",
      @"category": @"transitionDelay",
      @"type": @"500"
      },
    @"700": @{
      @"value": 700ms,
      @"name": @"TransitionDelay700",
      @"category": @"transitionDelay",
      @"type": @"700"
      },
    @"1000": @{
      @"value": 1000ms,
      @"name": @"TransitionDelay1000",
      @"category": @"transitionDelay",
      @"type": @"1000"
      }
    },
  @"transitionDuration": @{
    @"0": @{
      @"value": 0s,
      @"name": @"TransitionDuration0",
      @"category": @"transitionDuration",
      @"type": @"0"
      },
    @"75": @{
      @"value": 75ms,
      @"name": @"TransitionDuration75",
      @"category": @"transitionDuration",
      @"type": @"75"
      },
    @"100": @{
      @"value": 100ms,
      @"name": @"TransitionDuration100",
      @"category": @"transitionDuration",
      @"type": @"100"
      },
    @"150": @{
      @"value": 150ms,
      @"name": @"TransitionDuration150",
      @"category": @"transitionDuration",
      @"type": @"150"
      },
    @"200": @{
      @"value": 200ms,
      @"name": @"TransitionDuration200",
      @"category": @"transitionDuration",
      @"type": @"200"
      },
    @"300": @{
      @"value": 300ms,
      @"name": @"TransitionDuration300",
      @"category": @"transitionDuration",
      @"type": @"300"
      },
    @"500": @{
      @"value": 500ms,
      @"name": @"TransitionDuration500",
      @"category": @"transitionDuration",
      @"type": @"500"
      },
    @"700": @{
      @"value": 700ms,
      @"name": @"TransitionDuration700",
      @"category": @"transitionDuration",
      @"type": @"700"
      },
    @"1000": @{
      @"value": 1000ms,
      @"name": @"TransitionDuration1000",
      @"category": @"transitionDuration",
      @"type": @"1000"
      },
    @"DEFAULT": @{
      @"value": 150ms,
      @"name": @"TransitionDurationDefault",
      @"category": @"transitionDuration",
      @"type": @"DEFAULT"
      }
    },
  @"transitionProperty": @{
    @"none": @{
      @"value": none,
      @"name": @"TransitionPropertyNone",
      @"category": @"transitionProperty",
      @"type": @"none"
      },
    @"all": @{
      @"value": all,
      @"name": @"TransitionPropertyAll",
      @"category": @"transitionProperty",
      @"type": @"all"
      },
    @"DEFAULT": @{
      @"value": color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter,
      @"name": @"TransitionPropertyDefault",
      @"category": @"transitionProperty",
      @"type": @"DEFAULT"
      },
    @"colors": @{
      @"value": color, background-color, border-color, text-decoration-color, fill, stroke,
      @"name": @"TransitionPropertyColors",
      @"category": @"transitionProperty",
      @"type": @"colors"
      },
    @"opacity": @{
      @"value": opacity,
      @"name": @"TransitionPropertyOpacity",
      @"category": @"transitionProperty",
      @"type": @"opacity"
      },
    @"shadow": @{
      @"value": box-shadow,
      @"name": @"TransitionPropertyShadow",
      @"category": @"transitionProperty",
      @"type": @"shadow"
      },
    @"transform": @{
      @"value": transform,
      @"name": @"TransitionPropertyTransform",
      @"category": @"transitionProperty",
      @"type": @"transform"
      }
    },
  @"transitionTimingFunction": @{
    @"DEFAULT": @{
      @"value": cubic-bezier(0.4, 0, 0.2, 1),
      @"name": @"TransitionTimingFunctionDefault",
      @"category": @"transitionTimingFunction",
      @"type": @"DEFAULT"
      },
    @"linear": @{
      @"value": linear,
      @"name": @"TransitionTimingFunctionLinear",
      @"category": @"transitionTimingFunction",
      @"type": @"linear"
      },
    @"in": @{
      @"value": cubic-bezier(0.4, 0, 1, 1),
      @"name": @"TransitionTimingFunctionIn",
      @"category": @"transitionTimingFunction",
      @"type": @"in"
      },
    @"out": @{
      @"value": cubic-bezier(0, 0, 0.2, 1),
      @"name": @"TransitionTimingFunctionOut",
      @"category": @"transitionTimingFunction",
      @"type": @"out"
      },
    @"in-out": @{
      @"value": cubic-bezier(0.4, 0, 0.2, 1),
      @"name": @"TransitionTimingFunctionInOut",
      @"category": @"transitionTimingFunction",
      @"type": @"in-out"
      }
    },
  @"translate": @{
    @"0": @{
      @"value": 0px,
      @"name": @"Translate0",
      @"category": @"translate",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"Translate1",
      @"category": @"translate",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"Translate2",
      @"category": @"translate",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"Translate3",
      @"category": @"translate",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"Translate4",
      @"category": @"translate",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"Translate5",
      @"category": @"translate",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"Translate6",
      @"category": @"translate",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"Translate7",
      @"category": @"translate",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"Translate8",
      @"category": @"translate",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"Translate9",
      @"category": @"translate",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"Translate10",
      @"category": @"translate",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"Translate11",
      @"category": @"translate",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"Translate12",
      @"category": @"translate",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"Translate14",
      @"category": @"translate",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"Translate16",
      @"category": @"translate",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"Translate20",
      @"category": @"translate",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"Translate24",
      @"category": @"translate",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"Translate28",
      @"category": @"translate",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"Translate32",
      @"category": @"translate",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"Translate36",
      @"category": @"translate",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"Translate40",
      @"category": @"translate",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"Translate44",
      @"category": @"translate",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"Translate48",
      @"category": @"translate",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"Translate52",
      @"category": @"translate",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"Translate56",
      @"category": @"translate",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"Translate60",
      @"category": @"translate",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"Translate64",
      @"category": @"translate",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"Translate72",
      @"category": @"translate",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"Translate80",
      @"category": @"translate",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"Translate96",
      @"category": @"translate",
      @"type": @"96"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"TranslatePx",
      @"category": @"translate",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"Translate05",
      @"category": @"translate",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"Translate15",
      @"category": @"translate",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"Translate25",
      @"category": @"translate",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"Translate35",
      @"category": @"translate",
      @"type": @"3.5"
      },
    @"1/2": @{
      @"value": 50%,
      @"name": @"Translate12",
      @"category": @"translate",
      @"type": @"1/2"
      },
    @"1/3": @{
      @"value": 33.333333%,
      @"name": @"Translate13",
      @"category": @"translate",
      @"type": @"1/3"
      },
    @"2/3": @{
      @"value": 66.666667%,
      @"name": @"Translate23",
      @"category": @"translate",
      @"type": @"2/3"
      },
    @"1/4": @{
      @"value": 25%,
      @"name": @"Translate14",
      @"category": @"translate",
      @"type": @"1/4"
      },
    @"2/4": @{
      @"value": 50%,
      @"name": @"Translate24",
      @"category": @"translate",
      @"type": @"2/4"
      },
    @"3/4": @{
      @"value": 75%,
      @"name": @"Translate34",
      @"category": @"translate",
      @"type": @"3/4"
      },
    @"full": @{
      @"value": 100%,
      @"name": @"TranslateFull",
      @"category": @"translate",
      @"type": @"full"
      }
    },
  @"size": @{
    @"0": @{
      @"value": 0px,
      @"name": @"Size0",
      @"category": @"size",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"Size1",
      @"category": @"size",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"Size2",
      @"category": @"size",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"Size3",
      @"category": @"size",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"Size4",
      @"category": @"size",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"Size5",
      @"category": @"size",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"Size6",
      @"category": @"size",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"Size7",
      @"category": @"size",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"Size8",
      @"category": @"size",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"Size9",
      @"category": @"size",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"Size10",
      @"category": @"size",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"Size11",
      @"category": @"size",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"Size12",
      @"category": @"size",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"Size14",
      @"category": @"size",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"Size16",
      @"category": @"size",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"Size20",
      @"category": @"size",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"Size24",
      @"category": @"size",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"Size28",
      @"category": @"size",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"Size32",
      @"category": @"size",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"Size36",
      @"category": @"size",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"Size40",
      @"category": @"size",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"Size44",
      @"category": @"size",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"Size48",
      @"category": @"size",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"Size52",
      @"category": @"size",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"Size56",
      @"category": @"size",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"Size60",
      @"category": @"size",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"Size64",
      @"category": @"size",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"Size72",
      @"category": @"size",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"Size80",
      @"category": @"size",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"Size96",
      @"category": @"size",
      @"type": @"96"
      },
    @"auto": @{
      @"value": auto,
      @"name": @"SizeAuto",
      @"category": @"size",
      @"type": @"auto"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"SizePx",
      @"category": @"size",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"Size05",
      @"category": @"size",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"Size15",
      @"category": @"size",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"Size25",
      @"category": @"size",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"Size35",
      @"category": @"size",
      @"type": @"3.5"
      },
    @"1/2": @{
      @"value": 50%,
      @"name": @"Size12",
      @"category": @"size",
      @"type": @"1/2"
      },
    @"1/3": @{
      @"value": 33.333333%,
      @"name": @"Size13",
      @"category": @"size",
      @"type": @"1/3"
      },
    @"2/3": @{
      @"value": 66.666667%,
      @"name": @"Size23",
      @"category": @"size",
      @"type": @"2/3"
      },
    @"1/4": @{
      @"value": 25%,
      @"name": @"Size14",
      @"category": @"size",
      @"type": @"1/4"
      },
    @"2/4": @{
      @"value": 50%,
      @"name": @"Size24",
      @"category": @"size",
      @"type": @"2/4"
      },
    @"3/4": @{
      @"value": 75%,
      @"name": @"Size34",
      @"category": @"size",
      @"type": @"3/4"
      },
    @"1/5": @{
      @"value": 20%,
      @"name": @"Size15",
      @"category": @"size",
      @"type": @"1/5"
      },
    @"2/5": @{
      @"value": 40%,
      @"name": @"Size25",
      @"category": @"size",
      @"type": @"2/5"
      },
    @"3/5": @{
      @"value": 60%,
      @"name": @"Size35",
      @"category": @"size",
      @"type": @"3/5"
      },
    @"4/5": @{
      @"value": 80%,
      @"name": @"Size45",
      @"category": @"size",
      @"type": @"4/5"
      },
    @"1/6": @{
      @"value": 16.666667%,
      @"name": @"Size16",
      @"category": @"size",
      @"type": @"1/6"
      },
    @"2/6": @{
      @"value": 33.333333%,
      @"name": @"Size26",
      @"category": @"size",
      @"type": @"2/6"
      },
    @"3/6": @{
      @"value": 50%,
      @"name": @"Size36",
      @"category": @"size",
      @"type": @"3/6"
      },
    @"4/6": @{
      @"value": 66.666667%,
      @"name": @"Size46",
      @"category": @"size",
      @"type": @"4/6"
      },
    @"5/6": @{
      @"value": 83.333333%,
      @"name": @"Size56",
      @"category": @"size",
      @"type": @"5/6"
      },
    @"1/12": @{
      @"value": 8.333333%,
      @"name": @"Size112",
      @"category": @"size",
      @"type": @"1/12"
      },
    @"2/12": @{
      @"value": 16.666667%,
      @"name": @"Size212",
      @"category": @"size",
      @"type": @"2/12"
      },
    @"3/12": @{
      @"value": 25%,
      @"name": @"Size312",
      @"category": @"size",
      @"type": @"3/12"
      },
    @"4/12": @{
      @"value": 33.333333%,
      @"name": @"Size412",
      @"category": @"size",
      @"type": @"4/12"
      },
    @"5/12": @{
      @"value": 41.666667%,
      @"name": @"Size512",
      @"category": @"size",
      @"type": @"5/12"
      },
    @"6/12": @{
      @"value": 50%,
      @"name": @"Size612",
      @"category": @"size",
      @"type": @"6/12"
      },
    @"7/12": @{
      @"value": 58.333333%,
      @"name": @"Size712",
      @"category": @"size",
      @"type": @"7/12"
      },
    @"8/12": @{
      @"value": 66.666667%,
      @"name": @"Size812",
      @"category": @"size",
      @"type": @"8/12"
      },
    @"9/12": @{
      @"value": 75%,
      @"name": @"Size912",
      @"category": @"size",
      @"type": @"9/12"
      },
    @"10/12": @{
      @"value": 83.333333%,
      @"name": @"Size1012",
      @"category": @"size",
      @"type": @"10/12"
      },
    @"11/12": @{
      @"value": 91.666667%,
      @"name": @"Size1112",
      @"category": @"size",
      @"type": @"11/12"
      },
    @"full": @{
      @"value": 100%,
      @"name": @"SizeFull",
      @"category": @"size",
      @"type": @"full"
      },
    @"min": @{
      @"value": min-content,
      @"name": @"SizeMin",
      @"category": @"size",
      @"type": @"min"
      },
    @"max": @{
      @"value": max-content,
      @"name": @"SizeMax",
      @"category": @"size",
      @"type": @"max"
      },
    @"fit": @{
      @"value": fit-content,
      @"name": @"SizeFit",
      @"category": @"size",
      @"type": @"fit"
      }
    },
  @"width": @{
    @"0": @{
      @"value": 0px,
      @"name": @"Width0",
      @"category": @"width",
      @"type": @"0"
      },
    @"1": @{
      @"value": 0.25rem,
      @"name": @"Width1",
      @"category": @"width",
      @"type": @"1"
      },
    @"2": @{
      @"value": 0.5rem,
      @"name": @"Width2",
      @"category": @"width",
      @"type": @"2"
      },
    @"3": @{
      @"value": 0.75rem,
      @"name": @"Width3",
      @"category": @"width",
      @"type": @"3"
      },
    @"4": @{
      @"value": 1rem,
      @"name": @"Width4",
      @"category": @"width",
      @"type": @"4"
      },
    @"5": @{
      @"value": 1.25rem,
      @"name": @"Width5",
      @"category": @"width",
      @"type": @"5"
      },
    @"6": @{
      @"value": 1.5rem,
      @"name": @"Width6",
      @"category": @"width",
      @"type": @"6"
      },
    @"7": @{
      @"value": 1.75rem,
      @"name": @"Width7",
      @"category": @"width",
      @"type": @"7"
      },
    @"8": @{
      @"value": 2rem,
      @"name": @"Width8",
      @"category": @"width",
      @"type": @"8"
      },
    @"9": @{
      @"value": 2.25rem,
      @"name": @"Width9",
      @"category": @"width",
      @"type": @"9"
      },
    @"10": @{
      @"value": 2.5rem,
      @"name": @"Width10",
      @"category": @"width",
      @"type": @"10"
      },
    @"11": @{
      @"value": 2.75rem,
      @"name": @"Width11",
      @"category": @"width",
      @"type": @"11"
      },
    @"12": @{
      @"value": 3rem,
      @"name": @"Width12",
      @"category": @"width",
      @"type": @"12"
      },
    @"14": @{
      @"value": 3.5rem,
      @"name": @"Width14",
      @"category": @"width",
      @"type": @"14"
      },
    @"16": @{
      @"value": 4rem,
      @"name": @"Width16",
      @"category": @"width",
      @"type": @"16"
      },
    @"20": @{
      @"value": 5rem,
      @"name": @"Width20",
      @"category": @"width",
      @"type": @"20"
      },
    @"24": @{
      @"value": 6rem,
      @"name": @"Width24",
      @"category": @"width",
      @"type": @"24"
      },
    @"28": @{
      @"value": 7rem,
      @"name": @"Width28",
      @"category": @"width",
      @"type": @"28"
      },
    @"32": @{
      @"value": 8rem,
      @"name": @"Width32",
      @"category": @"width",
      @"type": @"32"
      },
    @"36": @{
      @"value": 9rem,
      @"name": @"Width36",
      @"category": @"width",
      @"type": @"36"
      },
    @"40": @{
      @"value": 10rem,
      @"name": @"Width40",
      @"category": @"width",
      @"type": @"40"
      },
    @"44": @{
      @"value": 11rem,
      @"name": @"Width44",
      @"category": @"width",
      @"type": @"44"
      },
    @"48": @{
      @"value": 12rem,
      @"name": @"Width48",
      @"category": @"width",
      @"type": @"48"
      },
    @"52": @{
      @"value": 13rem,
      @"name": @"Width52",
      @"category": @"width",
      @"type": @"52"
      },
    @"56": @{
      @"value": 14rem,
      @"name": @"Width56",
      @"category": @"width",
      @"type": @"56"
      },
    @"60": @{
      @"value": 15rem,
      @"name": @"Width60",
      @"category": @"width",
      @"type": @"60"
      },
    @"64": @{
      @"value": 16rem,
      @"name": @"Width64",
      @"category": @"width",
      @"type": @"64"
      },
    @"72": @{
      @"value": 18rem,
      @"name": @"Width72",
      @"category": @"width",
      @"type": @"72"
      },
    @"80": @{
      @"value": 20rem,
      @"name": @"Width80",
      @"category": @"width",
      @"type": @"80"
      },
    @"96": @{
      @"value": 24rem,
      @"name": @"Width96",
      @"category": @"width",
      @"type": @"96"
      },
    @"auto": @{
      @"value": auto,
      @"name": @"WidthAuto",
      @"category": @"width",
      @"type": @"auto"
      },
    @"px": @{
      @"value": 1px,
      @"name": @"WidthPx",
      @"category": @"width",
      @"type": @"px"
      },
    @"0.5": @{
      @"value": 0.125rem,
      @"name": @"Width05",
      @"category": @"width",
      @"type": @"0.5"
      },
    @"1.5": @{
      @"value": 0.375rem,
      @"name": @"Width15",
      @"category": @"width",
      @"type": @"1.5"
      },
    @"2.5": @{
      @"value": 0.625rem,
      @"name": @"Width25",
      @"category": @"width",
      @"type": @"2.5"
      },
    @"3.5": @{
      @"value": 0.875rem,
      @"name": @"Width35",
      @"category": @"width",
      @"type": @"3.5"
      },
    @"1/2": @{
      @"value": 50%,
      @"name": @"Width12",
      @"category": @"width",
      @"type": @"1/2"
      },
    @"1/3": @{
      @"value": 33.333333%,
      @"name": @"Width13",
      @"category": @"width",
      @"type": @"1/3"
      },
    @"2/3": @{
      @"value": 66.666667%,
      @"name": @"Width23",
      @"category": @"width",
      @"type": @"2/3"
      },
    @"1/4": @{
      @"value": 25%,
      @"name": @"Width14",
      @"category": @"width",
      @"type": @"1/4"
      },
    @"2/4": @{
      @"value": 50%,
      @"name": @"Width24",
      @"category": @"width",
      @"type": @"2/4"
      },
    @"3/4": @{
      @"value": 75%,
      @"name": @"Width34",
      @"category": @"width",
      @"type": @"3/4"
      },
    @"1/5": @{
      @"value": 20%,
      @"name": @"Width15",
      @"category": @"width",
      @"type": @"1/5"
      },
    @"2/5": @{
      @"value": 40%,
      @"name": @"Width25",
      @"category": @"width",
      @"type": @"2/5"
      },
    @"3/5": @{
      @"value": 60%,
      @"name": @"Width35",
      @"category": @"width",
      @"type": @"3/5"
      },
    @"4/5": @{
      @"value": 80%,
      @"name": @"Width45",
      @"category": @"width",
      @"type": @"4/5"
      },
    @"1/6": @{
      @"value": 16.666667%,
      @"name": @"Width16",
      @"category": @"width",
      @"type": @"1/6"
      },
    @"2/6": @{
      @"value": 33.333333%,
      @"name": @"Width26",
      @"category": @"width",
      @"type": @"2/6"
      },
    @"3/6": @{
      @"value": 50%,
      @"name": @"Width36",
      @"category": @"width",
      @"type": @"3/6"
      },
    @"4/6": @{
      @"value": 66.666667%,
      @"name": @"Width46",
      @"category": @"width",
      @"type": @"4/6"
      },
    @"5/6": @{
      @"value": 83.333333%,
      @"name": @"Width56",
      @"category": @"width",
      @"type": @"5/6"
      },
    @"1/12": @{
      @"value": 8.333333%,
      @"name": @"Width112",
      @"category": @"width",
      @"type": @"1/12"
      },
    @"2/12": @{
      @"value": 16.666667%,
      @"name": @"Width212",
      @"category": @"width",
      @"type": @"2/12"
      },
    @"3/12": @{
      @"value": 25%,
      @"name": @"Width312",
      @"category": @"width",
      @"type": @"3/12"
      },
    @"4/12": @{
      @"value": 33.333333%,
      @"name": @"Width412",
      @"category": @"width",
      @"type": @"4/12"
      },
    @"5/12": @{
      @"value": 41.666667%,
      @"name": @"Width512",
      @"category": @"width",
      @"type": @"5/12"
      },
    @"6/12": @{
      @"value": 50%,
      @"name": @"Width612",
      @"category": @"width",
      @"type": @"6/12"
      },
    @"7/12": @{
      @"value": 58.333333%,
      @"name": @"Width712",
      @"category": @"width",
      @"type": @"7/12"
      },
    @"8/12": @{
      @"value": 66.666667%,
      @"name": @"Width812",
      @"category": @"width",
      @"type": @"8/12"
      },
    @"9/12": @{
      @"value": 75%,
      @"name": @"Width912",
      @"category": @"width",
      @"type": @"9/12"
      },
    @"10/12": @{
      @"value": 83.333333%,
      @"name": @"Width1012",
      @"category": @"width",
      @"type": @"10/12"
      },
    @"11/12": @{
      @"value": 91.666667%,
      @"name": @"Width1112",
      @"category": @"width",
      @"type": @"11/12"
      },
    @"full": @{
      @"value": 100%,
      @"name": @"WidthFull",
      @"category": @"width",
      @"type": @"full"
      },
    @"screen": @{
      @"value": 100vw,
      @"name": @"WidthScreen",
      @"category": @"width",
      @"type": @"screen"
      },
    @"svw": @{
      @"value": 100svw,
      @"name": @"WidthSvw",
      @"category": @"width",
      @"type": @"svw"
      },
    @"lvw": @{
      @"value": 100lvw,
      @"name": @"WidthLvw",
      @"category": @"width",
      @"type": @"lvw"
      },
    @"dvw": @{
      @"value": 100dvw,
      @"name": @"WidthDvw",
      @"category": @"width",
      @"type": @"dvw"
      },
    @"min": @{
      @"value": min-content,
      @"name": @"WidthMin",
      @"category": @"width",
      @"type": @"min"
      },
    @"max": @{
      @"value": max-content,
      @"name": @"WidthMax",
      @"category": @"width",
      @"type": @"max"
      },
    @"fit": @{
      @"value": fit-content,
      @"name": @"WidthFit",
      @"category": @"width",
      @"type": @"fit"
      }
    },
  @"willChange": @{
    @"auto": @{
      @"value": auto,
      @"name": @"WillChangeAuto",
      @"category": @"willChange",
      @"type": @"auto"
      },
    @"scroll": @{
      @"value": scroll-position,
      @"name": @"WillChangeScroll",
      @"category": @"willChange",
      @"type": @"scroll"
      },
    @"contents": @{
      @"value": contents,
      @"name": @"WillChangeContents",
      @"category": @"willChange",
      @"type": @"contents"
      },
    @"transform": @{
      @"value": transform,
      @"name": @"WillChangeTransform",
      @"category": @"willChange",
      @"type": @"transform"
      }
    },
  @"zIndex": @{
    @"0": @{
      @"value": 0,
      @"name": @"ZIndex0",
      @"category": @"zIndex",
      @"type": @"0"
      },
    @"10": @{
      @"value": 10,
      @"name": @"ZIndex10",
      @"category": @"zIndex",
      @"type": @"10"
      },
    @"20": @{
      @"value": 20,
      @"name": @"ZIndex20",
      @"category": @"zIndex",
      @"type": @"20"
      },
    @"30": @{
      @"value": 30,
      @"name": @"ZIndex30",
      @"category": @"zIndex",
      @"type": @"30"
      },
    @"40": @{
      @"value": 40,
      @"name": @"ZIndex40",
      @"category": @"zIndex",
      @"type": @"40"
      },
    @"50": @{
      @"value": 50,
      @"name": @"ZIndex50",
      @"category": @"zIndex",
      @"type": @"50"
      },
    @"auto": @{
      @"value": auto,
      @"name": @"ZIndexAuto",
      @"category": @"zIndex",
      @"type": @"auto"
      }
    }
  };
  });

  return dictionary;
}

@end

