import util from "./util";
const CONSTANT = {
    TiffTags: {
        // 0x0100: "ImageWidth",
        // 0x0101: "ImageHeight",
        0x8769: "ExifIFDPointer"
        // 0x8825: "GPSInfoIFDPointer",
        // 0xa005: "InteroperabilityIFDPointer",
        // 0x0102: "BitsPerSample",
        // 0x0103: "Compression",
        // 0x0106: "PhotometricInterpretation",
        // 0x0112: "Orientation",
        // 0x0115: "SamplesPerPixel",
        // 0x011c: "PlanarConfiguration",
        // 0x0212: "YCbCrSubSampling",
        // 0x0213: "YCbCrPositioning",
        // 0x011a: "XResolution",
        // 0x011b: "YResolution",
        // 0x0128: "ResolutionUnit",
        // 0x0111: "StripOffsets",
        // 0x0116: "RowsPerStrip",
        // 0x0117: "StripByteCounts",
        // 0x0201: "JPEGInterchangeFormat",
        // 0x0202: "JPEGInterchangeFormatLength",
        // 0x012d: "TransferFunction",
        // 0x013e: "WhitePoint",
        // 0x013f: "PrimaryChromaticities",
        // 0x0211: "YCbCrCoefficients",
        // 0x0214: "ReferenceBlackWhite",
        // 0x0132: "DateTime",
        // 0x010e: "ImageDescription",
        // 0x010f: "Make",
        // 0x0110: "Model",
        // 0x0131: "Software",
        // 0x013b: "Artist",
        // 0x8298: "Copyright"
    },
    ExifTags: {
        0x927c: "MakerNote"
        // 0x8602: "WB_GRGBLevels"
    },
    FujiTags: {
        0x0000: {
            tagName: "Version",
            parser: function(arr) {
                if (arr.length) {
                    return util.getStringFromDB(new DataView(new Uint8Array(arr).buffer), 0, 4);
                } else {
                    return "";
                }
            }
        },
        0x0010: {
            tagName: "InternalSerialNumber"
        },
        0x1000: {
            tagName: "Quality"
        },
        0x1001: {
            tagName: "Sharpness",
            optionsMap: {
                0x0: "-4 (softest)",
                0x1: "-3 (very soft)",
                0x2: "-2 (soft)",
                0x3: "0 (normal)",
                0x4: "+2 (hard)",
                0x5: "+3 (very hard)",
                0x6: "+4 (hardest)",
                0x82: "-1 (medium soft)",
                0x84: "+1 (medium hard)",
                0x8000: "Film Simulation",
                0xffff: "n/a"
            }
        },
        0x1002: {
            tagName: "WhiteBalance",
            optionsMap: {
                0x0: "Auto",
                0x1: "Auto (white priority)",
                0x2: "Auto (ambiance priority)",
                0x100: "Daylight",
                0x200: "Cloudy",
                0x300: "Daylight Fluorescent",
                0x301: "Day White Fluorescent",
                0x302: "White Fluorescent",
                0x303: "Warm White Fluorescent",
                0x304: "Living Room Warm White Fluorescent",
                0x400: "Incandescent",
                0x500: "Flash",
                0x600: "Underwater",
                0xf00: "Custom",
                0xf01: "Custom2",
                0xf02: "Custom3",
                0xf03: "Custom4",
                0xf04: "Custom5",
                0xff0: "Kelvin"
            }
        },
        0x1003: {
            tagName: "Saturation",
            optionsMap: {
                0x0: "0 (normal)",
                0x80: "+1 (medium high)",
                0xc0: "+3 (very high)",
                0xe0: "+4 (highest)",
                0x100: "+2 (high)",
                0x180: "-1 (medium low)",
                0x200: "Low",
                0x300: "None (B&W)",
                0x301: "B&W Red Filter",
                0x302: "B&W Yellow Filter",
                0x303: "B&W Green Filter",
                0x310: "B&W Sepia",
                0x400: "-2 (low)",
                0x4c0: "-3 (very low)",
                0x4e0: "-4 (lowest)",
                0x500: "Acros",
                0x501: "Acros Red Filter",
                0x502: "Acros Yellow Filter",
                0x503: "Acros Green Filter",
                0x8000: "Film Simulation"
            }
        },
        0x1004: {
            tagName: "Contrast",
            optionsMap: {
                0x0: "Normal",
                0x80: "Medium High",
                0x100: "High",
                0x180: "Medium Low",
                0x200: "Low",
                0x8000: "Film Simulation"
            }
        },
        0x1005: {
            tagName: "ColorTemperature"
        },
        0x1006: {
            tagName: "Contrast",
            optionsMap: {
                0x0: "Normal",
                0x100: "High",
                0x300: "Low"
            }
        },
        0x100a: {
            tagName: "WhiteBalanceFineTune",
            parser: function(arr) {
                if (arr.length) {
                    return `Red ${arr[0]}, Blue ${arr[1]}`;
                } else {
                    return "";
                }
            }
        },
        0x100b: {
            tagName: "NoiseReduction",
            optionsMap: {
                0x40: "Low",
                0x80: "Normal",
                0x100: "n/a"
            }
        },
        0x100e: {
            tagName: "NoiseReduction",
            optionsMap: {
                0x0: "0 (normal)",
                0x100: "+2 (strong)",
                0x180: "+1 (medium strong)",
                0x1c0: "+3 (very strong)",
                0x1e0: "+4 (strongest)",
                0x200: "-2 (weak)",
                0x280: "-1 (medium weak)",
                0x2c0: "-3 (very weak)",
                0x2e0: "-4 (weakest)"
            }
        },
        0x1010: {
            tagName: "FujiFlashMode",
            optionsMap: {
                0x0: "Auto",
                0x1: "On",
                0x2: "Off",
                0x3: "Red-eye reduction",
                0x4: "External",
                0x10: "Commander",
                0x8000: "Not Attached",
                0x8120: "TTL",
                0x8320: "TTL Auto - Did not fire",
                0x9840: "Manual",
                0x9860: "Flash Commander",
                0x9880: "Multi-flash",
                0xa920: "1st Curtain (front)",
                0xaa20: "TTL Slow - 1st Curtain (front)",
                0xab20: "TTL Auto - 1st Curtain (front)",
                0xad20: "TTL - Red-eye Flash - 1st Curtain (front)",
                0xae20: "TTL Slow - Red-eye Flash - 1st Curtain (front)",
                0xaf20: "TTL Auto - Red-eye Flash - 1st Curtain (front)",
                0xc920: "2nd Curtain (rear)",
                0xca20: "TTL Slow - 2nd Curtain (rear)",
                0xcb20: "TTL Auto - 2nd Curtain (rear)",
                0xcd20: "TTL - Red-eye Flash - 2nd Curtain (rear)",
                0xce20: "TTL Slow - Red-eye Flash - 2nd Curtain (rear)",
                0xcf20: "TTL Auto - Red-eye Flash - 2nd Curtain (rear)",
                0xe920: "High Speed Sync (HSS)"
            }
        },
        0x1011: {
            tagName: "FlashExposureComp"
        },
        0x1020: {
            tagName: "Macro",
            optionsMap: {
                0: "Off",
                1: "On"
            }
        },
        0x1021: {
            tagName: "FocusMode",
            optionsMap: {
                0: "Auto",
                1: "Manual",
                65535: "Movie"
            }
        },
        0x1022: {
            tagName: "AFMode",
            optionsMap: {
                0: "No",
                1: "Single Point",
                256: "Zone",
                512: "Wide/Tracking"
            }
        },
        0x1023: {
            tagName: "FocusPixel"
        },
        0x102b: {
            tagName: "PrioritySettings"
        },
        0x102d: {
            tagName: "FocusSettings"
        },
        0x102e: {
            tagName: "AFCSettings"
        },
        0x1030: {
            tagName: "SlowSync"
        },
        0x1031: {
            tagName: "PictureMode",
            optionsMap: {
                0x0: "Auto",
                0x1: "Portrait",
                0x2: "Landscape",
                0x3: "Macro",
                0x4: "Sports",
                0x5: "Night Scene",
                0x6: "Program AE",
                0x7: "Natural Light",
                0x8: "Anti-blur",
                0x9: "Beach & Snow",
                0xa: "Sunset",
                0xb: "Museum",
                0xc: "Party",
                0xd: "Flower",
                0xe: "Text",
                0xf: "Natural Light & Flash",
                0x10: "Beach",
                0x11: "Snow",
                0x12: "Fireworks",
                0x13: "Underwater",
                0x14: "Portrait with Skin Correction",
                0x16: "Panorama",
                0x17: "Night (tripod)",
                0x18: "Pro Low-light",
                0x19: "Pro Focus",
                0x1a: "Portrait 2",
                0x1b: "Dog Face Detection",
                0x1c: "Cat Face Detection",
                0x30: "HDR",
                0x40: "Advanced Filter",
                0x100: "Aperture-priority AE",
                0x200: "Shutter speed priority AE",
                0x300: "Manual"
            }
        },
        0x1032: {
            tagName: "ExposureCount"
        },
        0x1033: {
            tagName: "EXRAuto",
            optionsMap: {
                0: "Auto",
                1: "Manual"
            }
        },
        0x1034: {
            tagName: "EXRMode",
            optionsMap: {
                0x100: "HR (High Resolution)",
                0x200: "SN (Signal to Noise priority)",
                0x300: "DR (Dynamic Range priority)"
            }
        },
        0x1040: {
            tagName: "ShadowTone",
            optionsMap: {
                "-64": "+4 (hardest)",
                "-48": "+3 (very hard)",
                "-32": "+2 (hard)",
                "-16": "+1 (medium hard)",
                0: "0 (normal)",
                16: "-1 (medium soft)",
                32: "-2 (soft)"
            }
        },
        0x1041: {
            tagName: "HighlightTone",
            optionsMap: {
                "-64": "+4 (hardest)",
                "-48": "+3 (very hard)",
                "-32": "+2 (hard)",
                "-16": "+1 (medium hard)",
                0: "0 (normal)",
                16: "-1 (medium soft)",
                32: "-2 (soft)"
            }
        },
        0x1044: {
            tagName: "DigitalZoom"
        },
        0x1045: {
            tagName: "LensModulationOptimizer",
            optionsMap: {
                0: "Off",
                1: "On"
            }
        },
        0x1047: {
            tagName: "GrainEffect",
            optionsMap: {
                0: "Off",
                32: "Weak",
                64: "Strong"
            }
        },
        0x1048: {
            tagName: "ColorChromeEffect",
            optionsMap: {
                0: "Off",
                32: "Weak",
                64: "Strong"
            }
        },
        0x1049: {
            tagName: "BWAdjustment"
        },
        0x104d: {
            tagName: "CropMode",
            optionsMap: {
                0: "n/a",
                1: "Full-frame on GFX",
                2: "Sports Finder Mode",
                4: "Electronic Shutter 1.25x Crop"
            }
        },
        0x104e: {
            tagName: "ColorChromeFXBlue",
            optionsMap: {
                0: "Off",
                32: "Weak",
                64: "Strong"
            }
        },
        0x1050: {
            tagName: "ShutterType",
            optionsMap: {
                0: "Mechanical",
                1: "Electronic",
                2: "Electronic (long shutter speed)",
                3: "Electronic Front Curtain"
            }
        },
        0x1100: {
            tagName: "AutoBracketing",
            optionsMap: {
                0: "Off",
                1: "On",
                2: "No flash & flash",
                6: "Pixel Shift"
            }
        },
        0x1101: {
            tagName: "SequenceNumber"
        },
        0x1103: {
            tagName: "DriveSettings"
        },
        0x1105: {
            tagName: "PixelShiftShots"
        },
        0x1106: {
            tagName: "PixelShiftOffset"
        },
        0x1153: {
            tagName: "PanoramaAngle"
        },
        0x1154: {
            tagName: "PanoramaDirection",
            optionsMap: {
                1: "Right",
                2: "Up",
                3: "Left",
                4: "Down"
            }
        },
        0x1201: {
            tagName: "AdvancedFilter",
            optionsMap: {
                0x10000: "Pop Color",
                0x20000: "Hi Key",
                0x30000: "Toy Camera",
                0x40000: "Miniature",
                0x50000: "Dynamic Tone",
                0x60001: "Partial Color Red",
                0x60002: "Partial Color Yellow",
                0x60003: "Partial Color Green",
                0x60004: "Partial Color Blue",
                0x60005: "Partial Color Orange",
                0x60006: "Partial Color Purple",
                0x70000: "Soft Focus",
                0x90000: "Low Key"
            }
        },
        0x1210: {
            tagName: "ColorMode",
            optionsMap: {
                0x0: "Standard",
                0x10: "Chrome",
                0x30: "B & W"
            }
        },
        0x1300: {
            tagName: "BlurWarning",
            optionsMap: {
                0: "None",
                1: "Blur Warning"
            }
        },
        0x1301: {
            tagName: "FocusWarning",
            optionsMap: {
                0: "Good",
                1: "Out of focus"
            }
        },
        0x1302: {
            tagName: "ExposureWarning",
            optionsMap: {
                0: "Good",
                1: "Bad exposure"
            }
        },
        0x1304: {
            tagName: "GEImageSize"
        },
        0x1400: {
            tagName: "DynamicRange",
            optionsMap: {
                1: "Standard",
                3: "Wide"
            }
        },
        0x1401: {
            tagName: "FilmMode",
            optionsMap: {
                0x0: "F0/Standard (Provia)",
                0x100: "F1/Studio Portrait",
                0x110: "F1a/Studio Portrait Enhanced Saturation",
                0x120: "F1b/Studio Portrait Smooth Skin Tone (Astia)",
                0x130: "F1c/Studio Portrait Increased Sharpness",
                0x200: "F2/Fujichrome (Velvia)",
                0x300: "F3/Studio Portrait Ex",
                0x400: "F4/Velvia",
                0x500: "Pro Neg. Std",
                0x501: "Pro Neg. Hi",
                0x600: "Classic Chrome",
                0x700: "Eterna",
                0x800: "Classic Negative",
                0x900: "Bleach Bypass",
                0xa00: "Nostalgic Neg"
            }
        },
        0x1402: {
            tagName: "DynamicRangeSetting",
            optionsMap: {
                0x0: "Auto",
                0x1: "Manual",
                0x100: "Standard (100%)",
                0x200: "Wide1 (230%)",
                0x201: "Wide2 (400%)",
                0x8000: "Film Simulation"
            }
        },
        0x1403: {
            tagName: "DevelopmentDynamicRange"
        },
        0x1404: {
            tagName: "MinFocalLength"
        },
        0x1405: {
            tagName: "MaxFocalLength"
        },
        0x1406: {
            tagName: "MaxApertureAtMinFocal"
        },
        0x1407: {
            tagName: "MaxApertureAtMaxFocal"
        },
        0x140b: {
            tagName: "AutoDynamicRange"
        },
        0x1422: {
            tagName: "ImageStabilization"
        },
        0x1425: {
            tagName: "SceneRecognition",
            optionsMap: {
                0x0: "Unrecognized",
                0x100: "Portrait Image",
                0x103: "Night Portrait",
                0x105: "Backlit Portrait",
                0x200: "Landscape Image",
                0x300: "Night Scene",
                0x400: "Macro"
            }
        },
        0x1431: {
            tagName: "Rating"
        },
        0x1436: {
            tagName: "ImageGeneration",
            optionsMap: {
                0: "Original Image",
                1: "Re-developed from RAW"
            }
        },
        0x1438: {
            tagName: "ImageCount"
        },
        0x1443: {
            tagName: "DRangePriority",
            optionsMap: {
                0: "Auto",
                1: "Fixed"
            }
        },
        0x1444: {
            tagName: "DRangePriorityAuto",
            optionsMap: {
                1: "Weak",
                2: "Strong",
                3: "Plus"
            }
        },
        0x1445: {
            tagName: "DRangePriorityFixed",
            optionsMap: {
                1: "Weak",
                2: "Strong"
            }
        },
        0x1446: {
            tagName: "FlickerReduction"
        },
        0x1447: {
            tagName: "FujiModel",
            parser(val) {
                return val.replace(/\x00/g, "");
            }
        },
        0x1448: {
            tagName: "FujiModel2",
            parser(val) {
                return val.replace(/\x00/g, "");
            }
        },
        0x3803: {
            tagName: "VideoRecordingMode",
            optionsMap: {
                0x0: "Normal",
                0x10: "F-log",
                0x20: "HLG"
            }
        },
        0x3804: {
            tagName: "PeripheralLighting",
            optionsMap: {
                0: "Off",
                1: "On"
            }
        },
        0x3806: {
            tagName: "VideoCompression",
            optionsMap: {
                1: "Log GOP",
                2: "All Intra"
            }
        },
        0x3820: {
            tagName: "FrameRate"
        },
        0x3821: {
            tagName: "FrameWidth"
        },
        0x3822: {
            tagName: "FrameHeight"
        },
        0x3824: {
            tagName: "FullHDHighSpeedRec",
            optionsMap: {
                1: "Off",
                2: "On"
            }
        },
        0x4005: {
            tagName: "FaceElementSelected"
        },
        0x4100: {
            tagName: "FacesDetected"
        },
        0x4103: {
            tagName: "FacePositions"
        },
        0x4200: {
            tagName: "NumFaceElements"
        },
        0x4201: {
            tagName: "FaceElementTypes",
            optionsMap: {
                1: "Face",
                2: "Left Eye",
                3: "Right Eye",
                7: "Body",
                8: "Head",
                11: "Bike",
                12: "Body of Car",
                13: "Front of Car",
                14: "Animal Body",
                15: "Animal Head",
                16: "Animal Face",
                17: "Animal Left Eye",
                18: "Animal Right Eye",
                19: "Bird Body",
                20: "Bird Head",
                21: "Bird Left Eye",
                22: "Bird Right Eye",
                23: "Aircraft Body",
                25: "Aircraft Cockpit",
                26: "Train Front",
                27: "Train Cockpit"
            }
        },
        0x4203: {
            tagName: "FaceElementPositions"
        },
        0x4282: {
            tagName: "FaceRecInfo"
        },
        0x8000: {
            tagName: "FileSource"
        },
        0x8002: {
            tagName: "OrderNumber"
        },
        0x8003: {
            tagName: "FrameNumber"
        },
        0xb211: {
            tagName: "Parallax"
        }
    }
};

export default CONSTANT;
