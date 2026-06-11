// ========== SUBJECTS MODULE ==========

// Reference AppState from main.js (global scope)
// ========== VIDEO SUMMARIES ==========
// Hardcoded summaries for One-shot videos (clickable timestamps)
const VIDEO_SUMMARIES = {
    "Light – Reflection and Refraction": {
        "Science 1": {
            "One-shot": [
                {
                    title: "Reflection of Light",
                    timeRange: "02:43 - 44:54",
                    startTime: "02:43",
                    points: [
                        "Basics: Light follows rectilinear propagation (travels in a straight line) and reflects off surfaces (02:23).",
                        "Concave Mirror: Acts as a converging mirror. Used in shaving mirrors, makeup mirrors, solar furnaces, and vehicle headlights (where the bulb is placed at the focus to project light) (33:25 - 34:50).",
                        "Convex Mirror: Acts as a diverging mirror. Always forms virtual, erect, and diminished images.",
                        "Pole (P): The center of the reflecting surface (16:17).",
                        "Center of Curvature (C): The center of the sphere of which the mirror is a part (16:26).",
                        "Focus (F): The midpoint between P and C (16:55).",
                        "Focal Length (f): Distance between focus and pole; related to radius of curvature by f = R/2 (17:45).",
                        "Mirror Formula: 1/f = 1/v + 1/u (44:54).",
                        "Magnification (m): m = Height of Image / Height of Object = -v/u (44:54). Negative sign = real and inverted image. Positive sign = virtual and erect image (46:00)."
                    ]
                },
                {
                    title: "Refraction of Light",
                    timeRange: "57:54 - 1:19:25",
                    startTime: "57:54",
                    points: [
                        "Laws of Refraction: Light bends when moving between different optical media.",
                        "Refractive Index (n): Measures how much light bends; calculated as n = c/v (speed of light in vacuum/speed of light in medium) (1:10:11).",
                        "Relative Refractive Index: To find refractive index of medium 2 w.r.t. medium 1 (n21), use ratio of refractive indices (n2/n1) or inverse ratio of light speeds (v1/v2) (1:11:19)."
                    ]
                },
                {
                    title: "Spherical Lenses",
                    timeRange: "1:19:25 - 1:44:53",
                    startTime: "1:19:25",
                    points: [
                        "Convex Lens: A converging lens used for magnifying glasses, microscopes, and telescopes (1:34:07).",
                        "Concave Lens: A diverging lens used in optical instruments like door peepholes and laser flashlights (1:38:06).",
                        "Lens Formula: 1/f = 1/v - 1/u (1:43:07).",
                        "Magnification (m): m = v/u (1:44:22).",
                        "Power of Lens: P = 1/f (f must be in meters), measured in Dioptre (D) (1:44:53)."
                    ]
                }
            ]
        }
    },
    "Human Eye and Colourful World": {
        "Science 1": {
            "One-shot": [
                {
                    title: "The Human Eye Structure",
                    timeRange: "0:01:26 - 0:15:20",
                    startTime: "0:01:26",
                    points: [
                        "The eye is compared to a house with several functional parts.",
                        "Cornea: The outer transparent membrane that acts as a gate, allowing light entry and performing the primary refraction (0:07:57).",
                        "Iris & Pupil: The iris controls the size of the pupil, which regulates the amount of light entering the eye (0:09:01).",
                        "Ciliary Muscles: These control the shape of the lens (0:11:31).",
                        "Retina: The screen where images form; contains photoreceptors to send signals to the brain via the Optic Nerve (0:07:48).",
                        "Vitreous & Aqueous Humor: Provide pressure and shape to the eyeball (0:11:41 - 0:12:08)."
                    ]
                },
                {
                    title: "Power of Accommodation",
                    timeRange: "0:15:20 - 0:21:22",
                    startTime: "0:15:20",
                    points: [
                        "The ability of the lens to adjust its focal length based on object distance.",
                        "Distant Objects: Ciliary muscles are relaxed, the lens becomes thin, and focal length increases (0:16:15 - 0:18:00).",
                        "Nearby Objects: Ciliary muscles contract, the lens becomes thick, and focal length decreases (0:18:19)."
                    ]
                },
                {
                    title: "Defects of Vision",
                    timeRange: "0:21:22 - 0:39:00",
                    startTime: "0:21:22",
                    points: [
                        "Myopia (Nearsightedness): Cannot see distant objects; image forms before the retina. Corrected with a concave lens (0:24:00 - 0:30:30).",
                        "Hypermetropia (Farsightedness): Cannot see near objects; image forms behind the retina. Corrected with a convex lens (0:27:17 - 0:32:30).",
                        "Presbyopia: Age-related loss of accommodation; corrected with bifocal lenses (0:34:00 - 0:35:20)."
                    ]
                },
                {
                    title: "Prism and Dispersion",
                    timeRange: "0:39:00 - 0:53:23",
                    startTime: "0:39:00",
                    points: [
                        "Refraction: Monochromatic light bends toward the base of a prism (0:42:00).",
                        "Dispersion: White light splits into the VIBGYOR spectrum (0:43:40). Red light deviates the least due to its longest wavelength, while Violet deviates the most (0:47:20)."
                    ]
                },
                {
                    title: "Atmospheric Refraction",
                    timeRange: "0:59:04 - 1:06:13",
                    startTime: "0:59:04",
                    points: [
                        "Twinkling of Stars: Caused by changing air densities causing light rays to bend constantly, fluctuating the intensity of light reaching our eyes (1:02:00).",
                        "Advanced Sunrise/Delayed Sunset: Atmospheric refraction allows us to see the sun 2 minutes before it physically rises and 2 minutes after it sets (1:17:22)."
                    ]
                },
                {
                    title: "Scattering of Light",
                    timeRange: "1:06:13 - 1:19:13",
                    startTime: "1:06:13",
                    points: [
                        "Tyndall Effect: Scattering of light by dust particles in a colloidal medium (1:09:13).",
                        "Sky Appearance: The sky is blue due to the scattering of shorter wavelengths (blue) by particles in the atmosphere (1:10:25). At sunrise/sunset, light travels a longer path, and only the longer-wavelength red light reaches the observer (1:14:52)."
                    ]
                }
            ]
        }
    },
    "Electricity": {
        "Science 1": {
            "One-shot": [
                {
                    title: "Basics of Electricity",
                    timeRange: "0:10:02 - 0:18:19",
                    startTime: "0:10:02",
                    points: [
                        "Electric Current (I): Defined as the rate of flow of electric charge (I = Q/t). The SI unit is the Ampere.",
                        "Direction: Electrons flow from negative to positive, while conventional current flows from positive to negative (10:20).",
                        "Potential Difference (V): The work done to move a unit charge between two points (W/Q), measured in Volts (18:19)."
                    ]
                },
                {
                    title: "Ohm's Law and Circuit Components",
                    timeRange: "0:32:42 - 0:37:24",
                    startTime: "0:32:42",
                    points: [
                        "Ohm's Law: States that potential difference is directly proportional to current (V = IR), provided the temperature remains constant.",
                        "V-I Graphs: The slope of a Voltage-Current graph represents the resistance of the conductor.",
                        "Circuit Symbols: Includes symbols for resistors, variable resistors (rheostats), ammeters (connected in series), and voltmeters (connected in parallel)."
                    ]
                },
                {
                    title: "Factors Affecting Resistance",
                    timeRange: "0:41:27 - 0:49:47",
                    startTime: "0:41:27",
                    points: [
                        "Resistance depends on length (directly proportional), area of cross-section (inversely proportional), temperature, and the nature of the material (resistivity).",
                        "Resistivity (rho): A material-specific constant that does not change with length or area (43:27)."
                    ]
                },
                {
                    title: "Series and Parallel Circuits",
                    timeRange: "0:58:43 - 1:19:33",
                    startTime: "0:58:43",
                    points: [
                        "Series: Current is constant; voltage is divided. Total resistance is the sum of individual resistances.",
                        "Parallel: Voltage is constant; current is divided. Preferred for household appliances because if one device fails, others remain functional (1:18:24)."
                    ]
                },
                {
                    title: "Heating Effects and Applications",
                    timeRange: "1:40:14 - 1:48:07",
                    startTime: "1:40:14",
                    points: [
                        "Joule's Law of Heating: Energy dissipated as heat (H = I^2Rt).",
                        "Bulbs: Use Tungsten filaments due to high melting points and resistance (1:41:12).",
                        "Fuses: Use low-melting-point alloys (Lead/Tin) to protect circuits from excess current (1:43:21).",
                        "Heaters: Use Nichrome wire for its high resistivity and oxidation resistance (1:45:42)."
                    ]
                },
                {
                    title: "Power and Energy",
                    timeRange: "1:51:28 - 2:16:06",
                    startTime: "1:51:28",
                    points: [
                        "Electrical Power: The rate of energy consumption (P = VI or P = I^2R).",
                        "Commercial Energy: Measured in Kilowatt-hour (kWh), which is the unit used for household electricity bills (2:05:54)."
                    ]
                }
            ]
        }
    },
    "Magnetic Effects of Electric Current": {
        "Science 1": {
            "One-shot": [
                {
                    title: "Fundamentals of Magnetism",
                    timeRange: "0:01:22 - 0:18:13",
                    startTime: "0:01:22",
                    points: [
                        "Magnetic Field Lines: Explains that magnetic field lines originate from the North Pole and terminate at the South Pole outside the magnet, and move South to North internally (0:06:15 - 0:07:05).",
                        "Key Properties: Field lines are continuous, do not intersect, and are denser near the poles where the magnetic strength is greatest (0:14:35 - 0:16:50)."
                    ]
                },
                {
                    title: "Electromagnetism",
                    timeRange: "0:22:25 - 0:41:43",
                    startTime: "0:22:25",
                    points: [
                        "Right-Hand Thumb Rule: A method to determine the direction of the magnetic field around a straight current-carrying conductor (0:26:02 - 0:27:03).",
                        "Circular Loops: Explains that at the center of a circular current-carrying loop, the magnetic field lines appear as a straight line (0:36:29 - 0:38:10)."
                    ]
                },
                {
                    title: "Solenoids & Electromagnets",
                    timeRange: "0:41:45 - 0:52:00",
                    startTime: "0:41:45",
                    points: [
                        "Solenoid: A coil of many circular turns of wire that behaves like a bar magnet (0:44:13).",
                        "Electromagnet: Created by placing a soft iron core inside a solenoid (0:50:04). The magnetic strength can be controlled by varying the current or the number of turns (0:47:51 - 0:48:40)."
                    ]
                },
                {
                    title: "Force on Conductors",
                    timeRange: "0:55:23 - 1:13:58",
                    startTime: "0:55:23",
                    points: [
                        "Fleming's Left-Hand Rule: Used to find the direction of the force exerted on a current-carrying conductor placed in a magnetic field (0:59:06 - 1:02:13)."
                    ]
                },
                {
                    title: "Domestic Electric Circuits",
                    timeRange: "1:13:59 - 1:25:20",
                    startTime: "1:13:59",
                    points: [
                        "Wire Color Codes: Live (Red), Neutral (Black), and Earth (Green) wires serve specific roles in safety and current delivery (1:16:02 - 1:16:54).",
                        "Fuse: Designed to melt and break the circuit when excess current flows, preventing damage (0:17:15 - 1:18:34).",
                        "Earth Wire: Connects metallic body components to the ground to prevent electrical shocks (1:16:25 - 1:16:58).",
                        "Short-Circuiting: Live and neutral wires touch, leading to zero resistance and infinite current (1:21:15 - 1:23:46).",
                        "Overloading: Connecting too many devices to one socket, causing excess current flow (1:21:15 - 1:23:46)."
                    ]
                },
                {
                    title: "AC vs. DC",
                    timeRange: "1:25:47 - 1:27:01",
                    startTime: "1:25:47",
                    points: [
                        "Alternating Current (AC): Reverses direction periodically; ideal for long-distance transmission.",
                        "Direct Current (DC): Flows in a single direction; typical of battery-operated devices."
                    ]
                }
            ]
        }
    },
    "Chemical Reactions and Equations": {
        "Science 1": {
            "One-shot": [
                {
                    title: "Chemical vs. Physical Changes",
                    timeRange: "0:01:57 - 0:07:55",
                    startTime: "0:01:57",
                    points: [
                        "Chemical reactions are processes that transform substances into new products, differentiating them from physical changes (like tearing paper or melting) where the chemical identity remains the same."
                    ]
                },
                {
                    title: "Chemical Equations",
                    timeRange: "0:11:39 - 0:16:06",
                    startTime: "0:11:39",
                    points: [
                        "Explains how to represent reactions using symbols and formulas.",
                        "Highlights the importance of balancing equations to satisfy the Law of Conservation of Mass, ensuring equal numbers of atoms on both sides."
                    ]
                },
                {
                    title: "Types of Chemical Reactions",
                    timeRange: "0:30:36 - 1:17:49",
                    startTime: "0:30:36",
                    points: [
                        "Combination (0:31:46): Multiple reactants forming one single product (e.g., Magnesium burning, Quicklime with water).",
                        "Decomposition (0:44:02 - 1:03:14): Breaking down a reactant into multiple products using Thermal (heat), Electrolytic (electricity), or Photolytic (sunlight) energy.",
                        "Displacement (1:03:14): A more reactive element replaces a less reactive one. The video provides the 'Reactivity Series' mnemonic: K-Na-Ca-Mg-Al-Zn-Fe-Pb-H-Cu.",
                        "Double Displacement (1:11:45): Mutual exchange of ions, frequently leading to the formation of an insoluble precipitate.",
                        "Redox Reactions (1:19:00 - 1:20:29): Covers the simultaneous occurrence of oxidation (addition of oxygen/removal of hydrogen) and reduction. A 'swipe' trick is provided to easily identify Oxidizing and Reducing Agents."
                    ]
                },
                {
                    title: "Everyday Effects",
                    timeRange: "1:27:27 - 1:30:38",
                    startTime: "1:27:27",
                    points: [
                        "Corrosion: Iron rusting due to air and water.",
                        "Rancidity: The oxidation of fats/oils.",
                        "Preventive strategies include adding nitrogen gas, refrigeration, and the use of antioxidants."
                    ]
                }
            ]
        }
    },
    "Acids, Bases and Salts": {
        "Science 1": {
            "One-shot": [
                {
                    title: "Fundamentals of Acids and Bases",
                    timeRange: "01:17 - 07:48",
                    startTime: "01:17",
                    points: [
                        "Acids: Substances that donate H+ ions; they have a sour taste and turn blue litmus paper red. Examples include Hydrochloric, Sulfuric, and Citric acids.",
                        "Natural sources: Acetic acid in vinegar (05:12) and lactic acid in curd (05:30).",
                        "Bases: Substances that accept H+ ions or release OH- ions; they have a bitter taste, a slippery feel, and turn red litmus paper blue."
                    ]
                },
                {
                    title: "Indicators",
                    timeRange: "07:48 - 21:19",
                    startTime: "07:48",
                    points: [
                        "Natural: Litmus (Neutral=Purple, Acid=Red, Base=Blue), Hydrangea flowers (Base=Pink), and Turmeric (Base=Red/Brown stain).",
                        "Synthetic: Phenolphthalein (Acid=Colorless, Base=Pink) and Methyl Orange (Acid=Red, Base=Yellow).",
                        "Olfactory: Substances like onion, vanilla, and clove oil that change their smell in acidic or basic environments."
                    ]
                },
                {
                    title: "Chemical Properties",
                    timeRange: "21:19 - 42:02",
                    startTime: "21:19",
                    points: [
                        "Acid/Base + Metal: Produces salt and Hydrogen gas (detected via the pop sound test).",
                        "Acid + Metal Carbonate/Bicarbonate: Produces salt, water, and CO2. The CO2 can be tested by passing it through lime water, turning it milky (calcium carbonate formation) (24:14).",
                        "Neutralisation Reaction: Acid + Base = Salt + Water (25:21).",
                        "Metal Oxides: Acting as bases, they react with acids to form salt and water (27:29)."
                    ]
                },
                {
                    title: "Strength, pH, and Daily Life",
                    timeRange: "42:02 - 57:43",
                    startTime: "42:02",
                    points: [
                        "pH Scale: Ranges 0-14. <7 is acidic (lower value = stronger acid), >7 is basic (higher value = stronger base), 7 is neutral.",
                        "Universal Indicator: A mixture showing different colors at different pH values (e.g., Red for strong acid, Green for neutral, Blue/Violet for bases).",
                        "Digestive system: Pepsin works in acidic environments.",
                        "Soil health: Using quick lime/slaked lime to treat acidic soil.",
                        "Tooth decay: Prevention via basic toothpaste.",
                        "Bee stings: Relief using mild bases like baking soda."
                    ]
                },
                {
                    title: "Important Chemical Salts",
                    timeRange: "57:43 - 1:28:22",
                    startTime: "57:43",
                    points: [
                        "Common Salt (NaCl) (1:02:18): Essential for food and as a raw material.",
                        "Sodium Hydroxide (NaOH) (1:03:33): Produced via the Chlor-alkali process.",
                        "Bleaching Powder (CaOCl2) (1:10:47): Used for disinfecting and textile bleaching.",
                        "Baking Soda (NaHCO3) (1:12:28): Used in cooking and as a fire extinguisher.",
                        "Washing Soda (Na2CO3.10H2O) (1:18:48): Used in glass, soap, and paper industries.",
                        "Plaster of Paris (CaSO4.1/2H2O) (1:21:07): Formed by heating Gypsum at 373K (100°C); used for medical casts and statues."
                    ]
                }
            ]
        }
    },
    "Metals and Non-metals": {
        "Science 1": {
            "One-shot": [
                {
                    title: "Fundamental Concepts",
                    timeRange: "0:01:29 - 0:02:18",
                    startTime: "0:01:29",
                    points: [
                        "Metals are elements that lose electrons to form cations (positively charged ions).",
                        "Non-metals gain electrons to form anions (negatively charged ions)."
                    ]
                },
                {
                    title: "Physical Properties",
                    timeRange: "0:02:19 - 0:11:40",
                    startTime: "0:02:19",
                    points: [
                        "Malleability: Ability to be hammered into sheets. Gold and Silver are the most malleable.",
                        "Ductility: Ability to be drawn into wires.",
                        "Exceptions: Sodium and Potassium are soft enough to cut. Mercury is liquid at room temperature."
                    ]
                },
                {
                    title: "Chemical Reactivity & Displacement",
                    timeRange: "0:12:17 - 0:43:03",
                    startTime: "0:12:17",
                    points: [
                        "Reactivity Series: Use the mnemonic 'Katarina ne car maangi...' to memorize metal reactivity hierarchy.",
                        "Displacement Reactions: High-reactivity metals displace less reactive ones from their salt solutions (0:37:15).",
                        "Water Reactions: Some metals react vigorously with cold water (like Sodium), while others require steam (like Iron)."
                    ]
                },
                {
                    title: "Ionic Bonding",
                    timeRange: "0:44:31 - 0:52:14",
                    startTime: "0:44:31",
                    points: [
                        "Ionic Compounds: Formed via transfer of electrons and resulting electrostatic attraction between ions (0:48:30).",
                        "Properties: High melting and boiling points due to strong inter-ionic forces. Generally soluble in water (0:58:16)."
                    ]
                },
                {
                    title: "Metallurgy (Extraction of Metals)",
                    timeRange: "1:02:13 - 1:26:20",
                    startTime: "1:02:13",
                    points: [
                        "Low Reactivity: Metals are extracted from sulphide ores via roasting (heating in the presence of oxygen) (1:09:41 - 1:13:28).",
                        "Moderate Reactivity: Employs calcination (for carbonates) or roasting (for sulphides), followed by reduction with carbon (1:14:27 - 1:20:22).",
                        "High Reactivity: Requires electrolytic reduction (1:22:46 - 1:26:19)."
                    ]
                },
                {
                    title: "Refining & Corrosion",
                    timeRange: "1:27:02 - 1:40:44",
                    startTime: "1:27:02",
                    points: [
                        "Electrolytic Refining: Using an electrolytic cell to obtain high-purity copper (1:27:35 - 1:32:06).",
                        "Corrosion Prevention: Methods include painting, greasing, and galvanization (coating with zinc) to prevent iron from reacting with moisture and oxygen (1:35:37 - 1:38:22)."
                    ]
                },
                {
                    title: "Alloys",
                    timeRange: "1:38:23 - 1:42:37",
                    startTime: "1:38:23",
                    points: [
                        "Alloys are homogeneous mixtures of metals (or a metal and non-metal).",
                        "Brass: Copper + Zinc.",
                        "Bronze: Copper + Tin.",
                        "Steel: Iron + Carbon.",
                        "Alloys have improved strength and corrosion resistance compared to pure metals."
                    ]
                }
            ]
        }
    },
    "Carbon and its Compounds": {
        "Science 1": {
            "One-shot": [
                {
                    title: "Fundamentals of Carbon",
                    timeRange: "0:01:06 - 0:05:23",
                    startTime: "0:01:06",
                    points: [
                        "Carbon is a non-metal with an atomic number of 6 and an electronic configuration of 2,4.",
                        "Its tetravalency and ability to share electrons (covalent bonding) allow it to form millions of unique compounds, serving as the basis for all living organisms."
                    ]
                },
                {
                    title: "Bonding and Carbon's Uniqueness",
                    timeRange: "0:05:23 - 0:16:09",
                    startTime: "0:05:23",
                    points: [
                        "Covalent Bonds: Formed by sharing electron pairs; can be single, double, or triple bonds.",
                        "Versatility: Driven by catenation (self-linking of carbon atoms) and the formation of isomers (compounds with the same molecular formula but different structures)."
                    ]
                },
                {
                    title: "Allotropes",
                    timeRange: "0:16:09 - 0:21:53",
                    startTime: "0:16:09",
                    points: [
                        "Diamond: A 3D rigid structure; the hardest natural substance and a non-conductor of electricity.",
                        "Graphite: A hexagonal layered structure; soft, slippery, and conducts electricity due to free electrons."
                    ]
                },
                {
                    title: "Hydrocarbon Classification and Nomenclature",
                    timeRange: "0:30:33 - 1:00:30",
                    startTime: "0:30:33",
                    points: [
                        "Classification: Saturated (alkanes with single bonds) vs. Unsaturated (alkenes with double bonds; alkynes with triple bonds).",
                        "IUPAC Naming: A systematic guide to naming hydrocarbons based on chain length, bond type, and attached functional groups (Halogens, Alcohols, Aldehydes, Ketones, and Carboxylic Acids).",
                        "Cyclic Compounds: Rules for naming ring-structured hydrocarbons like cyclopropane and cyclohexane."
                    ]
                },
                {
                    title: "Homologous Series",
                    timeRange: "1:00:30 - 1:08:12",
                    startTime: "1:00:30",
                    points: [
                        "A group of organic compounds where successive members differ by a CH2 unit (14 atomic mass units).",
                        "They share identical functional groups and chemical properties but exhibit a graduation in physical properties like boiling and melting points."
                    ]
                },
                {
                    title: "Chemical Properties",
                    timeRange: "1:19:09 - 1:30:20",
                    startTime: "1:19:09",
                    points: [
                        "Combustion: Complete combustion yields blue flames; incomplete combustion (common in saturated hydrocarbons with limited oxygen) yields yellow, sooty flames.",
                        "Addition Reactions: Conversion of unsaturated oils to saturated fats using nickel or palladium catalysts."
                    ]
                },
                {
                    title: "Key Compounds: Ethanol and Ethanoic Acid",
                    timeRange: "1:30:20 - 1:50:56",
                    startTime: "1:30:20",
                    points: [
                        "Ethanol: Used as fuel and in industry (denatured alcohol to prevent misuse). Reaction with H2SO4 acts as a dehydrating agent to form ethene.",
                        "Ethanoic Acid: Explores esterification reactions and acid-base properties."
                    ]
                },
                {
                    title: "Soaps and Detergents",
                    timeRange: "1:50:56 - 1:59:19",
                    startTime: "1:50:56",
                    points: [
                        "Cleaning action via micelle formation. The hydrophobic tail attaches to oil/dirt while the hydrophilic head remains in water.",
                        "Difference between hard water (calcium/magnesium ions) and soft water."
                    ]
                }
            ]
        }
    },
    "Life Processes": {
        "Science 2": {
            "One-shot": [
                {
                    title: "Nutrition",
                    timeRange: "2:41 - 40:15",
                    startTime: "2:41",
                    points: [
                        "Autotrophic vs. Heterotrophic: Discusses how organisms obtain energy.",
                        "Photosynthesis (11:54): Explains the process in plants, the role of chloroplasts, and the function of stomata (16:10) in gas exchange and transpiration.",
                        "Human Nutrition (25:04): Covers the digestive system, including the breakdown of complex sugars by salivary amylase (26:50), the role of the liver and gallbladder in producing bile juice for fat emulsification (31:01), and the function of the pancreas (32:21) in secreting enzymes (trypsin, lipase, and amylase).",
                        "Absorption (34:27): Details how villi in the small intestine increase surface area for nutrient absorption."
                    ]
                },
                {
                    title: "Respiration",
                    timeRange: "40:15 - 1:00:45",
                    startTime: "40:15",
                    points: [
                        "Cellular Respiration: Differentiates between aerobic and anaerobic respiration. Mentions the formation of lactic acid in muscles during intense activity (46:13).",
                        "Human Respiratory System (48:50): Highlights the role of alveoli (51:17) as the site for gas exchange between the lungs and the blood."
                    ]
                },
                {
                    title: "Transportation",
                    timeRange: "1:00:45 - 1:37:33",
                    startTime: "1:00:45",
                    points: [
                        "Blood and Heart (1:09:49): Explains the anatomy of the human heart, the double circulation system (1:17:15), and the function of the septum (1:14:37) in separating oxygenated and deoxygenated blood.",
                        "Lymphatic System (1:26:32): Describes lymph as a colorless tissue fluid that helps maintain the internal environment and transport substances.",
                        "Plant Transportation (1:31:02): Details xylem (water/minerals) and phloem (food) and explains the process of transpiration pull (1:34:43) and translocation (1:35:32)."
                    ]
                },
                {
                    title: "Excretion",
                    timeRange: "1:37:33 - 1:52:08",
                    startTime: "1:37:33",
                    points: [
                        "Human Excretion (1:41:06): Explains the structure and function of the nephron in the kidneys, focusing on glomerular filtration, tubular reabsorption, and secretion.",
                        "Excretion in Plants (1:50:25): Describes how plants get rid of waste through oxygen/carbon dioxide diffusion, transpiration, storing waste in leaves/barks, and secreting resins and gums (1:51:34)."
                    ]
                }
            ]
        }
    },
    "Control and Coordination": {
        "Science 2": {
            "One-shot": [
                {
                    title: "The Nervous System (Animals)",
                    timeRange: "0:00:00 - 0:40:00",
                    startTime: "0:00:00",
                    points: [
                        "Neurons: Structural components include dendrites (receive chemical signals), cell body/cyton (contains nucleus), and axon (transmits impulses at high speed) (0:16:12 - 0:19:19).",
                        "Nerve Transmission: Chemical signals are converted to electrical impulses for speed. The synapse is the gap between neurons (0:29:36 - 0:33:02).",
                        "Reflex Actions: Reflex arcs are rapid, involuntary responses where the spinal cord acts as the primary control center rather than the brain (0:35:22 - 0:38:25)."
                    ]
                },
                {
                    title: "The Human Brain",
                    timeRange: "0:40:00 - 0:59:17",
                    startTime: "0:40:00",
                    points: [
                        "Forebrain: Houses the cerebrum (thinking, memory, and emotions) and the hypothalamus (regulates hunger, thirst, and body temperature) (0:46:19 - 0:47:49).",
                        "Midbrain: Acts as a connector between the forebrain and hindbrain and manages certain involuntary movements (0:48:03 - 0:48:45).",
                        "Hindbrain: Comprises the pons, cerebellum (posture and balance), and medulla (involuntary actions like breathing and heartbeat) (0:48:59 - 0:59:17)."
                    ]
                },
                {
                    title: "The Endocrine System and Hormones",
                    timeRange: "0:59:20 - 1:16:15",
                    startTime: "0:59:20",
                    points: [
                        "Pituitary: Master gland that produces growth hormone.",
                        "Thyroid: Produces thyroxine which regulates metabolism.",
                        "Adrenal: Produces adrenaline for fight or flight response.",
                        "Pancreas: Produces insulin for sugar regulation.",
                        "Reproductive glands: Testis and ovary produce sex hormones.",
                        "Feedback Mechanism: The body uses feedback loops (e.g., blood sugar levels) to maintain chemical homeostasis (1:14:24 - 1:16:15)."
                    ]
                },
                {
                    title: "Coordination in Plants",
                    timeRange: "1:16:15 - 1:44:49",
                    startTime: "1:16:15",
                    points: [
                        "Tropic Movements: Growth-dependent, directional responses including Phototropism (light), Geotropism (gravity), Hydrotropism (water), and Thigmotropism (touch) (1:25:51 - 1:34:00).",
                        "Nastic Movements: Non-growth, reversible responses like those seen in Mimosa pudica due to water pressure changes (1:34:00 - 1:35:46).",
                        "Auxin: Growth promoter for cell elongation and bending towards light (1:38:02 - 1:42:11).",
                        "Gibberellin: Promotes germination.",
                        "Cytokinin: Promotes cell division.",
                        "Abscisic Acid: Growth inhibitor and stress hormone; causes stomata closure (1:42:14 - 1:44:49).",
                        "Ethylene: Plant hormone responsible for fruit ripening."
                    ]
                }
            ]
        }
    },
    "Reproduction": {
        "Science 2": {
            "One-shot": [
                {
                    title: "Fundamentals of Reproduction",
                    timeRange: "0:04:12 - 1:19:46",
                    startTime: "0:04:12",
                    points: [
                        "DNA Copying: The core of reproduction is the replication of DNA within cells. Since the process is not perfectly precise, it creates variations (0:36:11 - 0:38:20).",
                        "Importance of Variation: These slight differences ensure species' survival in changing niches/environments, preventing total population wipeouts (1:13:41 - 1:17:30)."
                    ]
                },
                {
                    title: "Asexual Reproduction",
                    timeRange: "1:19:46 - 2:18:24",
                    startTime: "1:19:46",
                    points: [
                        "Fission: Binary fission in organisms like Amoeba and Leishmania (longitudinal fission), and multiple fission in Plasmodium (1:25:27 - 1:39:20).",
                        "Regeneration and Fragmentation: The ability of simpler organisms to regrow lost body parts (1:43:42 - 1:55:03).",
                        "Budding and Spore Formation: Covers Hydra (budding) and Rhizopus (spore formation) (1:55:03 - 2:10:25).",
                        "Vegetative Propagation: Using plant parts (stems, roots, leaves) to grow new plants (e.g., Bryophyllum leaves, potato tubers) (2:10:25 - 2:18:24)."
                    ]
                },
                {
                    title: "Sexual Reproduction in Plants",
                    timeRange: "2:18:24 - 3:11:57",
                    startTime: "2:18:24",
                    points: [
                        "Floral Structure: Breakdown of the stamen (male part: anther/filament) and carpel/pistil (female part: stigma, style, ovary) (2:50:24 - 2:54:46).",
                        "Pollination and Fertilization: Process of pollen transfer to the stigma and the subsequent fusion of gametes to form a zygote, eventually becoming a seed (2:57:23 - 3:11:57)."
                    ]
                },
                {
                    title: "Human Reproduction",
                    timeRange: "3:11:57 - 4:11:46",
                    startTime: "3:11:57",
                    points: [
                        "Puberty and Changes: Overview of physical and emotional changes during adolescence (3:13:12 - 3:18:09).",
                        "Male System: Function of testes (sperm production, testosterone), vas deferens, and glands (seminal vesicles, prostate gland) which provide fluids for sperm nutrition and mobility (3:21:48 - 3:41:59).",
                        "Female System: Function of ovaries (releasing an egg), fallopian tubes, uterus (where implantation occurs), and the menstrual cycle (3:41:59 - 4:10:11)."
                    ]
                },
                {
                    title: "Reproductive Health and Society",
                    timeRange: "4:11:46 - 4:32:11",
                    startTime: "4:11:46",
                    points: [
                        "STDs: Bacterial infections (gonorrhea, syphilis) and viral infections (HIV/AIDS, warts) (4:13:00 - 4:13:52).",
                        "Contraception: Mechanical (barrier methods like condoms), chemical (pills that disrupt hormonal balance), and surgical methods to prevent pregnancy and disease transmission (4:17:27 - 4:27:09)."
                    ]
                }
            ]
        }
    },
    "Heredity and Evolution": {
        "Science 2": {
            "One-shot": [
                {
                    title: "Foundations of Genetics",
                    timeRange: "1:14 - 26:07",
                    startTime: "1:14",
                    points: [
                        "Heredity vs. Variation: Heredity is the transmission of traits (alleles) from parents to offspring. Genetic variation is essential for species adaptation (1:14 - 2:44).",
                        "DNA: The genetic blueprint that carries hereditary information.",
                        "Chromosomes: Thread-like structures that carry genes. Humans have 46 chromosomes (23 pairs) (6:16).",
                        "Genotype vs. Phenotype: Genotype is the genetic sequence (e.g., Tt, 25:27). Phenotype is the physical expression (e.g., Tall, 25:16).",
                        "Haploid vs. Diploid: Haploid cells have one set of chromosomes (n), diploid cells have two sets (2n). Maintained through meiosis and fertilization (8:24 - 9:27)."
                    ]
                },
                {
                    title: "Gregor Mendel's Experiments",
                    timeRange: "27:51 - 1:12:16",
                    startTime: "27:51",
                    points: [
                        "Why Pea Plants? Mendel used Pisum sativum due to its short life cycle, ease of cultivation, and distinct contrasting traits (28:46 - 33:05).",
                        "Monohybrid Cross: Focusing on a single trait like height. F1 generation shows uniform expression. F2 generation shows the 3:1 phenotypic ratio (34:05 - 59:14).",
                        "Dihybrid Cross: Studies two traits simultaneously (e.g., seed shape and color), revealing more complex genetic combinations (59:14 - 1:12:16)."
                    ]
                },
                {
                    title: "The Laws of Inheritance",
                    timeRange: "1:12:16 - 1:21:07",
                    startTime: "1:12:16",
                    points: [
                        "Law of Dominance: Dominant alleles mask recessive ones in the F1 generation.",
                        "Law of Segregation: Alleles for a trait separate during gamete formation, ensuring each parent contributes only one allele.",
                        "Law of Independent Assortment: Traits are inherited independently, allowing for new variations in the F2 generation."
                    ]
                },
                {
                    title: "Sex Determination",
                    timeRange: "1:21:07 - 1:31:22",
                    startTime: "1:21:07",
                    points: [
                        "Human sex is determined at fertilization by the combination of chromosomes: XX for female, XY for male.",
                        "The father determines the sex of the child by passing on either an X or Y chromosome.",
                        "Debunks social stigmas regarding female responsibility in sex determination."
                    ]
                }
            ]
        }
    },
    "Our Environment": {
        "Science 2": {
            "One-shot": [
                {
                    title: "Ecosystems and Components",
                    timeRange: "0:05:37 - 0:14:17",
                    startTime: "0:05:37",
                    points: [
                        "An ecosystem is a community where biotic (living organisms) and abiotic (non-living factors like air, water, and soil) interact.",
                        "Classification: Natural ecosystems (forests, oceans) or Artificial ecosystems (aquariums, crop fields).",
                        "Energy Flow: The system is cyclic. Producers (plants) create food, consumers eat producers, and decomposers break down dead matter, returning nutrients to the soil."
                    ]
                },
                {
                    title: "Food Chains and Trophic Levels",
                    timeRange: "0:18:19 - 0:25:00",
                    startTime: "0:18:19",
                    points: [
                        "A food chain represents the linear, unidirectional flow of energy.",
                        "1st Level: Autotrophs/Producers (Plants).",
                        "2nd Level: Primary Consumers (Herbivores).",
                        "3rd/4th Levels: Secondary and Tertiary Consumers (Carnivores)."
                    ]
                },
                {
                    title: "The 10% Energy Law",
                    timeRange: "0:25:15 - 0:29:58",
                    startTime: "0:25:15",
                    points: [
                        "Only 10% of energy is transferred to the next trophic level.",
                        "90% is consumed by life processes like digestion and movement.",
                        "This limited energy availability is why food chains typically stop at 4 or 5 levels."
                    ]
                },
                {
                    title: "Food Web vs. Food Chain",
                    timeRange: "0:31:56 - 0:36:05",
                    startTime: "0:31:56",
                    points: [
                        "A Food Web is an interconnected network of multiple food chains.",
                        "Demonstrates that species are interdependent.",
                        "If one organism is removed, the entire web is affected."
                    ]
                },
                {
                    title: "Bio-magnification",
                    timeRange: "0:36:48 - 0:41:46",
                    startTime: "0:36:48",
                    points: [
                        "Toxic substances (e.g., pesticides or mercury) increase in concentration as they move up the food chain.",
                        "The concentration is highest at the top trophic level.",
                        "Apex predators face the highest risks from bio-magnification."
                    ]
                },
                {
                    title: "The Ozone Layer",
                    timeRange: "0:41:57 - 0:46:25",
                    startTime: "0:41:57",
                    points: [
                        "Ozone (O3) in the stratosphere protects the Earth from harmful UV radiation.",
                        "Formation: UV rays split oxygen molecules (O2), which then bond to form O3.",
                        "Depletion: CFCs (Chlorofluorocarbons) from refrigerators and ACs react with ozone, breaking it down and creating holes."
                    ]
                },
                {
                    title: "Waste Management",
                    timeRange: "0:46:38 - 0:54:14",
                    startTime: "0:46:38",
                    points: [
                        "Biodegradable waste: Decomposed naturally by microbes (e.g., vegetable scraps).",
                        "Non-biodegradable waste: Persists in the environment for thousands of years (e.g., plastic).",
                        "Disposal Methods: Recycling, composting (for biodegradable waste), landfills, and incineration (for medical/toxic waste)."
                    ]
                }
            ]
        }
    }
};

// Curriculum data
const science1Chapters = {
    "Maharashtra": ["Gravitation", "Periodic Classification of Elements", "Chemical Reactions and Equations", "Effects of Electric Current", "Heat", "Refraction of Light", "Lenses", "Metallurgy", "Carbon Compounds", "Space Missions"],
    "Delhi": ["Light – Reflection and Refraction", "Human Eye and Colourful World", "Electricity", "Magnetic Effects of Electric Current", "Chemical Reactions and Equations", "Acids, Bases and Salts", "Metals and Non-metals", "Carbon and its Compounds"]
};
const science2Chapters = {
    "Maharashtra": ["Life Processes in Living Organisms", "Heredity and Evolution", "Cell Biology and Biotechnology", "Introduction to Microbiology", "Animal Classification", "Environmental Management", "Social Health", "Towards Green Energy"],
    "Delhi": ["Life Processes", "Control and Coordination", "Reproduction", "Heredity and Evolution", "Our Environment", "Natural Resources"]
};
const maths1Chapters = {
    "Maharashtra": ["Linear Equations in Two Variables", "Quadratic Equations", "Arithmetic Progression", "Financial Planning", "Statistics", "Probability"],
    "Delhi": ["Real Numbers", "Polynomials", "Linear Equations in Two Variables", "Quadratic Equations", "Arithmetic Progressions"]
};
const maths2Chapters = {
    "Maharashtra": ["Similarity", "Pythagoras Theorem", "Circle", "Constructions", "Coordinate Geometry", "Trigonometry", "Mensuration"],
    "Delhi": ["Triangles", "Coordinate Geometry", "Trigonometry", "Applications of Trigonometry", "Circles", "Areas Related to Circles", "Surface Areas and Volumes", "Statistics", "Probability"]
};
const historyChapters = {
    "Maharashtra": ["Applied History", "Heritage Management", "Mass Media and History", "Entertainment and History", "History of Indian Arts", "Tourism and History", "Sports and History", "Historiography"],
    "Delhi": ["Nationalism in India", "Nationalism in Europe", "Global World", "Industrialisation", "Print Culture"]
};
const geographyChapters = {
    "Maharashtra": ["Climate", "Physiography and Drainage", "Population", "Natural Vegetation and Wildlife", "Economy and Occupations", "Transport and Communication", "Location and Extent", "Settlements", "Field Visit"],
    "Delhi": ["Agriculture", "Manufacturing Industries", "Resources and Development", "Water Resources", "Minerals and Energy Resources", "Lifelines of National Economy"]
};
const civicsChapters = {
    "Maharashtra": ["Working of the Constitution", "Political Parties", "Social and Political Movements", "Challenges to Democracy", "Public Facilities"],
    "Delhi": ["Power Sharing", "Federalism", "Democracy and Diversity", "Political Parties", "Outcomes of Democracy", "Challenges to Democracy"]
};
const economicsChapters = {
    "Delhi": ["Sectors of the Economy", "Globalisation and the Indian Economy", "Development Experience of India", "Money and Credit", "Consumer Rights"],
    "Maharashtra": ["Sectors of the Economy", "Globalisation and the Indian Economy", "Development Experience of India", "Money and Credit", "Consumer Rights"]
};

function getSubjectsList() {
    if (!AppState.selectedState || !AppState.selectedClass) return [];
    const currentClass = String(AppState.selectedClass).replace(/Class\s+/ig, '').trim();
    let maths = (AppState.selectedState === 'Maharashtra')
        ? [{ name: 'Maths 1', icon: 'ph-calculator', color: '#10b981' }, { name: 'Maths 2', icon: 'ph-function', color: '#059669' }]
        : [{ name: 'Maths', icon: 'ph-calculator', color: '#10b981' }];
    
    if (currentClass === '8') return [{ name: 'Science', icon: 'ph-flask', color: '#DC2626' }, ...maths, { name: 'History', icon: 'ph-scroll', color: '#ec4899' }, { name: 'Geography', icon: 'ph-globe-hemisphere-east', color: '#14b8a6' }, { name: 'Civics', icon: 'ph-bank', color: '#f59e0b' }];
    if (currentClass === '9') return [{ name: 'Science', icon: 'ph-flask', color: '#DC2626' }, ...maths, { name: 'History', icon: 'ph-scroll', color: '#ec4899' }, { name: 'Geography', icon: 'ph-globe-hemisphere-east', color: '#14b8a6' }, { name: 'Civics', icon: 'ph-bank', color: '#f59e0b' }];
    return [{ name: 'Science 1', icon: 'ph-flask', color: '#A6FF1F' }, { name: 'Science 2', icon: 'ph-dna', color: '#A6FF1F' }, ...maths, { name: 'History', icon: 'ph-scroll', color: '#ec4899' }, { name: 'Geography', icon: 'ph-globe-hemisphere-east', color: '#14b8a6' }, { name: 'Civics', icon: 'ph-bank', color: '#f59e0b' }, { name: 'Economics', icon: 'ph-coin', color: '#f59e0b' }];
}

function getChaptersForSubject(subjectName) {
    // Convert to string for comparison and remove "Class" prefix
    const classStr = String(AppState.selectedClass).replace(/Class\s+/ig, '').trim();
    
    if (parseInt(classStr) !== 10) return ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"];
    
    const state = AppState.selectedState;
    if (subjectName === 'Science 1') return science1Chapters[state] || science1Chapters["Delhi"];
    if (subjectName === 'Science 2') return science2Chapters[state] || science2Chapters["Delhi"];
    if (subjectName === 'Maths 1') return maths1Chapters[state] || maths1Chapters["Delhi"];
    if (subjectName === 'Maths 2') return maths2Chapters[state] || maths2Chapters["Delhi"];
    if (subjectName === 'Maths') return (maths1Chapters[state] || maths1Chapters["Delhi"]).concat(maths2Chapters[state] || maths2Chapters["Delhi"]);
    if (subjectName === 'History') return historyChapters[state] || historyChapters["Delhi"];
    if (subjectName === 'Geography') return geographyChapters[state] || geographyChapters["Delhi"];
    if (subjectName === 'Civics') return civicsChapters[state] || civicsChapters["Delhi"];
    if (subjectName === 'Economics') return economicsChapters[state] || economicsChapters["Delhi"];
    return ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"];
}

function getChapterVideoConfig(chapterName, subjectName) {
    const norm = chapterName.toLowerCase();
    const isMaths = ['Maths', 'Maths 1', 'Maths 2'].includes(subjectName);
    
    if (isMaths) {
        if (norm.includes('real numbers')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/MX1iSpb4tRE", title: "Real Numbers One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/jbpt9NJ2ZFo", title: "Real Numbers PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/mDa3R4StLkw", title: "Real Numbers Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/yZKgxEof9JE", title: "Real Numbers Revision" }
        ];
        if (norm.includes('polynomial')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/Hnoe8hNPFr8", title: "Polynomials One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/__JOCkAFR5k", title: "Polynomials PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/y2oQG1gG7WY", title: "Polynomials Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/aWSxxpX79YE", title: "Polynomials Revision" }
        ];
        if (norm.includes('linear')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/uz1yjvlu-RU", title: "Pair of Linear Equations in Two Variables One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/7fUxzREECQI", title: "Linear Equations in Two Variables PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/YOpoDj3Nc8I", title: "Linear Equations in Two Variables Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/S6hCiHmky_U", title: "Linear Equations in Two Variables Revision" }
        ];
        if (norm.includes('quadratic')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/hayFtYnAB-Q", title: "Quadratic Equations One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/7XD2TkrKnsA", title: "Quadratic Equations PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/ckdBrL24dcY", title: "Quadratic Equations Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/6xTECgxWtgE", title: "Quadratic Equations Revision" }
        ];
        if (norm.includes('arithmetic')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/zPKdZKBG4oQ", title: "Arithmetic Progression One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/Q1jc8cGuCMQ", title: "Arithmetic Progression PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/JYBywt30T8E", title: "Arithmetic Progression Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/olY7lA63XwI", title: "Arithmetic Progression Revision" }
        ];
        if (norm.includes('triangle')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/nxo1ItY3oTo", title: "Triangles One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/fsRjM2zAkHw", title: "Triangles PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/G4Bs2Em_HjE", title: "Triangles Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/bu8jHS83KV0", title: "Triangles Revision" }
        ];
        if (norm.includes('coordinate')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/xhvK4DHRqqo", title: "Coordinate Geometry One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/kuVOWPThx_c", title: "Coordinate Geometry PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/XUx87Bbn-v0", title: "Coordinate Geometry Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/ULsojkwgI9M", title: "Coordinate Geometry Revision" }
        ];
        if (norm.includes('trigonometry')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/wdaBwIv7Jso", title: "Introduction to Trigonometry One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/ZtFNhmn4PO8", title: "Trigonometry PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/CV0355P_7gw", title: "Trigonometry Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/Mkb5AwroEJM", title: "Trigonometry Revision" }
        ];
        if (norm.includes('application')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/_61nBmmoRWk", title: "Applications of Trigonometry One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/zcPfOq7Ert4", title: "Applications of Trigonometry PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/bgxacN97zkI", title: "Applications of Trigonometry Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/o589uRU9txM", title: "Applications of Trigonometry Revision" }
        ];
        if (norm.includes('circle') && !norm.includes('area')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/Kos9JqyXHrE", title: "Circles One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/B2QTvEkpn9g", title: "Circles PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/CzNYB4J7FKo", title: "Circles Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/WvISDNx6gmU", title: "Circles Revision" }
        ];
        if (norm.includes('area')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/DHjVOYojw58", title: "Areas Related to Circles One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/QNjjeD-9h4I", title: "Areas Related to Circles PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/6ISZUJ169vc", title: "Areas Related to Circles Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/H9Np2eLEz8Y", title: "Areas Related to Circles Revision" }
        ];
        if (norm.includes('surface')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/Bat0RRWD2cM", title: "Surface Areas and Volumes One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/xxyS1U8fAc0", title: "Surface Areas and Volumes PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/o99ipp9OJ7o", title: "Surface Areas and Volumes Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/AeN99Qi786k", title: "Surface Areas and Volumes Revision" }
        ];
        if (norm.includes('statistic')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/fFncQze5dBc", title: "Statistics One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/ARktEFNohz4", title: "Statistics PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/hn1GDbIznWA", title: "Statistics Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/K6AglEzRzp4", title: "Statistics Revision" }
        ];
        if (norm.includes('probabilit')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/OFuHbyJYq6Y", title: "Probability One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/XO_9GICxAoo", title: "Probability PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/3WhocSKYu7g", title: "Probability Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/w5fOb1y6VoM", title: "Probability Revision" }
        ];
    }
    
    if (subjectName === 'Science 1') {
        if (norm.includes('light')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/8Rwv2hvdZFo", title: "Light – Reflection and Refraction One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/iE0Y27qDnRY", title: "Light – Reflection and Refraction PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/7WN1uzbgEac", title: "Light – Reflection and Refraction Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/IfWAhHZl1FY", title: "Light – Reflection and Refraction Revision" }
        ];
        if (norm.includes('human eye') || norm.includes('colourful world')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/VWNxgkOr55Y", title: "Human Eye and Colourful World One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/-MANeQgSyVo", title: "Human Eye and Colourful World PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/xgdYoZhyRj8", title: "Human Eye and Colourful World Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/ntvqlm2ZXqk", title: "Human Eye and Colourful World Revision" }
        ];
        if (norm.includes('electricity')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/J3DvsZfYEfs", title: "Electricity One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/zEOm4Fvye-A", title: "Electricity PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/dAOA_LF3xqU", title: "Electricity Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/UI8nM-dSfh4", title: "Electricity Revision" }
        ];
        if (norm.includes('magnetic')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/5YMxdILh5II", title: "Magnetic Effects of Electric Current One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/f_9vj2dnGd8", title: "Magnetic Effects of Electric Current PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/7-gY8zZWu3E", title: "Magnetic Effects of Electric Current Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/D5rouymJ_UA", title: "Magnetic Effects of Electric Current Revision" }
        ];
        if (norm.includes('chemical reactions')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/gQ-X9wV8TXQ", title: "Chemical Reactions and Equations One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/G7QPE3rDnhY", title: "Chemical Reactions and Equations PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/_Wv97T-ekSM", title: "Chemical Reactions and Equations Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/TfXOwxXprtE", title: "Chemical Reactions and Equations Revision" }
        ];
        if (norm.includes('acids')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/qKl4mieovu0", title: "Acids, Bases and Salts One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/14ihi1h0dOg", title: "Acids, Bases and Salts PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/gVTM87Zpeec", title: "Acids, Bases and Salts Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/7k2rs5yGOFM", title: "Acids, Bases and Salts Revision" }
        ];
        if (norm.includes('metals')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/YV1BFWi-AWY", title: "Metals and Non-metals One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/1ndFVZiAAW4", title: "Metals and Non-metals PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/ERTeJFYDY-w", title: "Metals and Non-metals Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/NsbZY_b0D8k", title: "Metals and Non-metals Revision" }
        ];
        if (norm.includes('carbon')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/7pGHWkSRFU4", title: "Carbon and its Compounds One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/bbfH9cWedSo", title: "Carbon and its Compounds PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/6zIU7YebW10", title: "Carbon and its Compounds Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/Ff0t3zTzgR8", title: "Carbon and its Compounds Revision" }
        ];
        if (norm.includes('periodic')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/8B9C0D1E2F", title: "Periodic Classification One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/9C0D1E2F3G", title: "Periodic Classification PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/0D1E2F3G4H", title: "Periodic Classification Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/1E2F3G4H5I", title: "Periodic Classification Revision" }
        ];
        if (norm.includes('gravitation')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/2F3G4H5I6J", title: "Gravitation One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/3G4H5I6J7K", title: "Gravitation PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/4H5I6J7K8L", title: "Gravitation Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/5I6J7K8L9M", title: "Gravitation Revision" }
        ];
        if (norm.includes('heat')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/6J7K8L9M0N", title: "Heat One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/7K8L9M0N1O", title: "Heat PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/8L9M0N1O2P", title: "Heat Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/9M0N1O2P3Q", title: "Heat Revision" }
        ];
        if (norm.includes('lenses')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/0N1O2P3Q4R", title: "Lenses One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/1O2P3Q4R5S", title: "Lenses PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/2P3Q4R5S6T", title: "Lenses Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/3Q4R5S6T7U", title: "Lenses Revision" }
        ];
        if (norm.includes('metallurgy')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/4R5S6T7U8V", title: "Metallurgy One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/5S6T7U8V9W", title: "Metallurgy PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/6T7U8V9W0X", title: "Metallurgy Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/7U8V9W0X1Y", title: "Metallurgy Revision" }
        ];
        if (norm.includes('space')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/8V9W0X1Y2Z", title: "Space Missions One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/9W0X1Y2Z3A", title: "Space Missions PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/0X1Y2Z3A4B", title: "Space Missions Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/1Y2Z3A4B5C", title: "Space Missions Revision" }
        ];
        if (norm.includes('effects of electric current')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/2Z3A4B5C6D", title: "Effects of Electric Current One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/3A4B5C6D7E", title: "Effects of Electric Current PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/4B5C6D7E8F", title: "Effects of Electric Current Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/5C6D7E8F9G", title: "Effects of Electric Current Revision" }
        ];
    }

    if (subjectName === 'Science 2') {
        if (norm.includes('life process')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/2anxgj0TUgQ", title: "Life Processes Complete Chapter One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/DpndLMkR2AI", title: "Life Processes PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/ISGZMf2iiJ4", title: "Life Processes Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/5YOf-Rm4B7I", title: "Life Processes Revision" }
        ];
        if (norm.includes('control')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/2SvKmS99xhM", title: "Control and Coordination One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/L8fXCCFNnvU", title: "Control and Coordination PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/H5aeaO8lheg", title: "Control and Coordination Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/jz4fzgC20Gg", title: "Control and Coordination Revision" }
        ];
        if (norm.includes('reproduction')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/Sqz_U1oNPIY", title: "How Do Organisms Reproduce One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/jUVOaKZuw6U", title: "How Do Organisms Reproduce PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/pQfRNZKRFMs", title: "How Do Organisms Reproduce Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/n4LLUcXOYgc", title: "How Do Organisms Reproduce Revision" }
        ];
        if (norm.includes('heredity')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/LE3PUf5ueS4", title: "Heredity and Evolution One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/2CFsawmgL6U", title: "Heredity and Evolution PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/Chliha2R9xg", title: "Heredity and Evolution Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/m1vfHJaaf4E", title: "Heredity and Evolution Revision" }
        ];
        if (norm.includes('environment')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/fKZDHRTbu8Q", title: "Our Environment One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/zfEPpfxuRRY", title: "Our Environment PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/o4aRhzmiBk4", title: "Our Environment Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/WGdQZoMYSjk", title: "Our Environment Revision" }
        ];
        if (norm.includes('natural')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/-a-Rawc8-zg", title: "Management of Natural Resources One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/RaD1FbATf7o", title: "Management of Natural Resources PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/x3PJkeGyDjw", title: "Management of Natural Resources Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/1-KrNOGBaR8", title: "Management of Natural Resources Revision" }
        ];
    }

    // ===== HISTORY =====
    if (subjectName === 'History') {
        if (norm.includes('nationalism in india')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/exByrWPeYvk", title: "Nationalism in India One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/xTh4ILZSlpk", title: "Nationalism in India Back Exercise" }
        ];
        if (norm.includes('nationalism in europe')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/ksTPzTWUb6o", title: "Nationalism in Europe One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/UuJueWq80ME", title: "Nationalism in Europe Back Exercise" }
        ];
        if (norm.includes('global world') || norm.includes('making of a global')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/QXHtptFKVm8", title: "The Making of a Global World One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/yE8DKZGP2hQ", title: "The Making of a Global World Back Exercise" }
        ];
        if (norm.includes('industrialisation') || norm.includes('industrialization')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/9XWKDo5LElU", title: "The Age of Industrialisation One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/x_w2dQEmujU", title: "The Age of Industrialisation Back Exercise" }
        ];
        if (norm.includes('print culture')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/8osoP6PNtoQ", title: "Print Culture and the Modern World One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/V5uibi-3IXw", title: "Print Culture and the Modern World Back Exercise" }
        ];
    }

    // ===== GEOGRAPHY =====
    if (subjectName === 'Geography') {
        if (norm.includes('resources and development')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/1LA2-5rEMUE", title: "Resources and Development One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/yggIg_TRkLI", title: "Resources and Development Back Exercise" }
        ];
        if (norm.includes('forest') || norm.includes('wildlife')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/GqLBGoMkEVA", title: "Forest and Wildlife Resources One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/E5NZ-gVaERA", title: "Forest and Wildlife Resources Back Exercise" }
        ];
        if (norm.includes('water')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/xOyDX8nAc_o", title: "Water Resources One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/jnKfmIZHIas", title: "Water Resources Back Exercise" }
        ];
        if (norm.includes('agriculture')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/q0R-WDKp8N8", title: "Agriculture One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/1aAoGBdAGEQ", title: "Agriculture Back Exercise" }
        ];
        if (norm.includes('mineral') || norm.includes('energy')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/zaiju4KFOPg", title: "Minerals and Energy Resources One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/1DhABvu5HWY", title: "Minerals and Energy Resources Back Exercise" }
        ];
        if (norm.includes('manufacturing')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/NTcr_rYHiSE", title: "Manufacturing Industries One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/85rP0htdeyQ", title: "Manufacturing Industries Back Exercise" }
        ];
        if (norm.includes('lifeline') || norm.includes('national economy')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/x0OzQNRziaE", title: "Lifelines of National Economy One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/vZfzozVck1k", title: "Lifelines of National Economy Back Exercise" }
        ];
    }

    // ===== CIVICS =====
    if (subjectName === 'Civics') {
        if (norm.includes('power sharing') || norm.includes('power-sharing')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/FngG6lgrNrk", title: "Power Sharing One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/F3v1BFfixKU", title: "Power Sharing Back Exercise" }
        ];
        if (norm.includes('federalism')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/K5lK3zq5cAc", title: "Federalism One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/LAxR6DYvLac", title: "Federalism Back Exercise" }
        ];
        if (norm.includes('democracy and diversity') || norm.includes('diversity')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/O4GfrcwDF24", title: "Democracy and Diversity One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/d4SmgJLgBqk", title: "Democracy and Diversity Back Exercise" }
        ];
        if (norm.includes('political parties') || norm.includes('political party')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/rCNNEZFLwtM", title: "Political Parties One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/NZI2D8CH2d8", title: "Political Parties Back Exercise" }
        ];
        if (norm.includes('outcomes of democracy') || norm.includes('outcome')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/JVBWKBYsvH4", title: "Outcomes of Democracy One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/de3UwAG4tk8", title: "Outcomes of Democracy Back Exercise" }
        ];
        if (norm.includes('challenges to democracy') || norm.includes('challenge')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/mim9Z_HxX-Q", title: "Challenges to Democracy One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/Kl_pl-4EzDI", title: "Challenges to Democracy Back Exercise" }
        ];
    }

    // ===== ECONOMICS =====
    if (subjectName === 'Economics') {
        if (norm.includes('sectors of the economy') || norm.includes('sectors')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/6avWRnhAvSU", title: "Sectors of the Economy One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/rRi6Hf6-3-Y", title: "Sectors of the Economy Back Exercise" }
        ];
        if (norm.includes('globalisation') || norm.includes('globalization')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/8kiUJ65f8iQ", title: "Globalisation and the Indian Economy One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/SL_nvFm4obs", title: "Globalisation and the Indian Economy Back Exercise" }
        ];
        if (norm.includes('development') || norm.includes('poverty') || norm.includes('india\'s development')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/mRf-YyeB56U", title: "Development Experience of India One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/mxaaZ7I7UxE", title: "Development Experience of India Back Exercise" }
        ];
        if (norm.includes('money') || norm.includes('credit') || norm.includes('banking')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/V6LPuBEXCfE", title: "Money and Credit One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/k0xi_KrOxXA", title: "Money and Credit Back Exercise" }
        ];
        if (norm.includes('consumer') || norm.includes('consumer rights') || norm.includes('copra')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/gtFjdcVcvys", title: "Consumer Rights One-shot" },
            { label: "Back Exercise", embedUrl: "https://www.youtube.com/embed/lYZ_A_-5Wx4", title: "Consumer Rights Back Exercise" }
        ];
    }

    return null;
}

function openSubjects() {
    console.log('openSubjects called');
    
    // Clean up class string if needed
    if (AppState.selectedClass && typeof AppState.selectedClass === 'string') {
        AppState.selectedClass = AppState.selectedClass.replace(/Class\s+/ig, '').trim();
    }
    
    // If state is missing, try to restore from localStorage
    if (!AppState.selectedState || !AppState.selectedClass) {
        console.log('Missing state/class, attempting restore from localStorage');
        const savedBoard = localStorage.getItem('userBoard');
        const savedClass = localStorage.getItem('userClass');
        const savedState = localStorage.getItem('userState');
        
        if (savedBoard && savedClass && savedState) {
            AppState.selectedBoard = savedBoard;
            AppState.selectedClass = savedClass.replace('Class ', '');
            AppState.selectedState = savedState;
            
            // Ensure board matches state
            if (savedState === 'Maharashtra') {
                AppState.selectedBoard = 'MH Board';
                AppState.selectedState = 'Maharashtra';
            } else if (savedState === 'Delhi') {
                AppState.selectedBoard = 'CBSE Board';
                AppState.selectedState = 'Delhi';
            } else if (savedState === 'Tamil Nadu') {
                AppState.selectedBoard = 'Tamilnadu board';
                AppState.selectedState = 'Tamil Nadu';
            }
            console.log('Restored - State:', AppState.selectedState, 'Class:', AppState.selectedClass);
        } else {
            console.log('No saved data found, subjects cannot load');
            return;
        }
    }
    
    // FORCE state to be correct based on board
    if (AppState.selectedBoard === 'CBSE Board') {
        AppState.selectedState = 'Delhi';
    } else if (AppState.selectedBoard === 'MH Board') {
        AppState.selectedState = 'Maharashtra';
    } else if (AppState.selectedBoard === 'Tamilnadu board') {
        AppState.selectedState = 'Tamil Nadu';
    }
    
    console.log('OpenSubjects - State:', AppState.selectedState, 'Board:', AppState.selectedBoard, 'Class:', AppState.selectedClass);
    
    const subjectsView = document.getElementById('subjects-view');
    if (!subjectsView) {
        console.error('subjects-view element not found');
        return;
    }
    
    // Build the subjects view HTML
    subjectsView.innerHTML = `
        <div class="profile-header">
            <h2>Subjects</h2>
            <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${AppState.selectedBoard} • Class ${AppState.selectedClass}</p>
        </div>
        <div id="subjects-grid" class="subjects-grid"></div>
    `;
    
    const grid = document.getElementById('subjects-grid');
    if (!grid) {
        console.error('subjects-grid element not found');
        return;
    }
    
    const subjects = getSubjectsList();
    console.log('Subjects list:', subjects);
    
    if (!subjects || subjects.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No subjects available</p>';
        return;
    }
    
    subjects.forEach(sub => {
        const chapters = getChaptersForSubject(sub.name);
        const prog = computeSubjectProgress(sub.name, chapters);
        const circ = 100.53;
        const dash = (prog.percent / 100) * circ;
        
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.innerHTML = `
            <div class="subject-icon" style="color: ${sub.color}; background: ${sub.color}20;"><i class="ph ${sub.icon}"></i></div>
            <h4>${sub.name}</h4>
            <div class="subject-progress-circle" title="${prog.completed}/${prog.total} chapters">
                <svg viewBox="0 0 40 40" class="subject-progress-svg">
                    <circle class="subject-progress-bg" cx="20" cy="20" r="16"></circle>
                    <circle class="subject-progress-fg" cx="20" cy="20" r="16" style="stroke-dasharray: ${dash} ${circ};"></circle>
                </svg>
                <span class="subject-progress-text">${prog.percent}%</span>
            </div>
        `;
        card.addEventListener('click', () => {
            openChapters(sub.name);
            if (typeof switchView === 'function') {
                switchView('chapters-view', document.getElementById('nav-subjects'));
            }
        });
        grid.appendChild(card);
    });
    
    if (typeof updateOverallSyllabusProgress === 'function') {
        updateOverallSyllabusProgress();
    }
}

function openChapters(subjectName) {
    const chaptersView = document.getElementById('chapters-view');
    if (!chaptersView) return;
    
    chaptersView.innerHTML = `
        <div class="profile-header" style="display: flex; align-items: center; justify-content: center; position: relative;">
            <button id="back-to-subjects" class="icon-btn" style="position: absolute; left: 0; border:none; background:none; cursor:pointer; color: var(--text-primary);">
                <i class="ph ph-arrow-left" style="font-size: 24px;"></i>
            </button>
            <div>
                <h2 style="margin-bottom: 0;">${escapeHtml(subjectName)}</h2>
                <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${AppState.selectedBoard} • Class ${AppState.selectedClass}</p>
            </div>
        </div>
        <div id="chapters-list" class="profile-menu"></div>
    `;
    
    const backBtn = document.getElementById('back-to-subjects');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            openSubjects();
            if (typeof switchView === 'function') {
                switchView('subjects-view', document.getElementById('nav-subjects'));
            }
        });
    }
    
    const list = document.getElementById('chapters-list');
    if (!list) return;
    
    const chapters = getChaptersForSubject(subjectName);
    
    chapters.forEach((chapter, idx) => {
        const plain = stripChapterMarkup(chapter);
        const videoConf = getChapterVideoConfig(plain, subjectName);
        const hasVideo = Boolean(videoConf);
        const completed = isChapterCompleted(subjectName, plain);
        
        // Get chapter weightage data
        const meta = (typeof window.CHAPTER_META !== 'undefined') ? (window.CHAPTER_META[plain] || window.CHAPTER_META[chapter] || null) : null;
        const marksMeta = meta && meta.marks ? meta.marks : null;
        const difficultyMeta = meta ? meta.difficulty : null;
        
        const item = document.createElement('div');
        item.className = 'menu-item chapter-menu-item';
        if (completed) item.classList.add('chapter-completed');
        
        item.innerHTML = `
            <div class="menu-icon-wrap" style="color:#A6FF1F; background:rgba(166,255,31,0.1); width:36px; height:36px; min-width:36px; border-radius:10px; display:flex; align-items:center; justify-content:center;"><span style="font-size:15px; font-weight:700; line-height:1;">${idx + 1}</span></div>
            <div class="chapter-text-wrap"><span style="line-height:1.3;">${escapeHtml(chapter)}</span><p class="chapter-hold-hint">Hold to Tick</p></div>
            <div class="chapter-badges">
                ${marksMeta ? `<span class="chapter-marks-badge">${marksMeta} marks</span>` : ''}
                ${difficultyMeta ? `<span class="chapter-difficulty-badge ${difficultyMeta === 'Hard' ? 'hard' : difficultyMeta === 'Medium' ? 'medium' : 'easy'}">${difficultyMeta}</span>` : ''}
            </div>
            ${completed ? '<i class="ph ph-check-circle chapter-check-icon"></i>' : '<i class="ph ph-caret-right chevron"></i>'}
        `;
        
        let timer = null, didHold = false;
        
        item.addEventListener('pointerdown', () => {
            didHold = false;
            timer = setTimeout(() => {
                didHold = true;
                if (typeof AppState !== 'undefined') {
                    AppState.suppressChapterClickUntil = Date.now() + 400;
                }
                toggleChapterCompleted(subjectName, plain);
                openChapters(subjectName);
                openSubjects();
                if (typeof updateOverallSyllabusProgress === 'function') {
                    updateOverallSyllabusProgress();
                }
            }, 500); // HOLD_TO_TICK_MS
        });
        
        const clearTimer = () => { if (timer) { clearTimeout(timer); timer = null; } };
        item.addEventListener('pointerup', clearTimer);
        item.addEventListener('click', (e) => {
            if (didHold) return;
            if (typeof AppState !== 'undefined' && Date.now() < AppState.suppressChapterClickUntil) return;
            if (hasVideo && videoConf) {
                openChapterDetail(plain, subjectName, videoConf);
                if (typeof switchView === 'function') {
                    switchView('chapter-detail-view', document.getElementById('nav-subjects'));
                }
            }
        });
        item.addEventListener('pointerleave', clearTimer);
        item.addEventListener('pointercancel', clearTimer);
        
        list.appendChild(item);
    });
}

// Helper function to escape HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function setupChapterVideoTracking(subjectName, chapterName, videoConfig) {
    if (!AppState.youtubeApiReady || !(window.YT && window.YT.Player)) return;
    if (typeof clearYouTubeTracking === 'function') {
        clearYouTubeTracking();
    }
    
    videoConfig.forEach((video, idx) => {
        const iframeId = `chapter-video-iframe-${idx}`;
        try {
            const player = new YT.Player(iframeId, {
                events: {
                    onStateChange: (event) => {
                        if (event.data === YT.PlayerState.PLAYING) {
                            const interval = setInterval(() => {
                                const dur = player.getDuration ? player.getDuration() : 0;
                                const cur = player.getCurrentTime ? player.getCurrentTime() : 0;
                                if (!dur) return;
                                const percent = Math.min(100, Math.round((cur / dur) * 100));
                                if (typeof storeContinueLearningProgress === 'function') {
                                    storeContinueLearningProgress({
                                        board: AppState.selectedBoard, state: AppState.selectedState, class: AppState.selectedClass,
                                        subject: subjectName, chapter: chapterName, chapterNumber: 1,
                                        videoLabel: video.label, videoTitle: video.title, videoIndex: idx,
                                        videoEmbedUrl: video.embedUrl, progressPercent: percent,
                                        currentSeconds: Math.round(cur), durationSeconds: Math.round(dur)
                                    });
                                }
                            }, 2000);
                            AppState.playerProgressIntervals.push(interval);
                        }
                        if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                            AppState.playerProgressIntervals.forEach(clearInterval);
                            AppState.playerProgressIntervals = [];
                        }
                    }
                }
            });
            AppState.activeYouTubePlayers.push(player);
        } catch(e) {
            console.warn('Failed to create YT player for', iframeId, e);
        }
    });
}

function openChapterDetail(chapterName, subjectName, videoConfig, preferred = null) {
    const chapterDetailView = document.getElementById('chapter-detail-view');
    if (!chapterDetailView) return;
    
    chapterDetailView.innerHTML = `
        <div class="profile-header" style="display: flex; align-items: center; justify-content: center; position: relative;">
            <button id="back-to-chapters" class="icon-btn" style="position: absolute; left: 0; border:none; background:none; cursor:pointer; color: var(--text-primary);">
                <i class="ph ph-arrow-left" style="font-size: 24px;"></i>
            </button>
            <div>
                <h2 style="margin-bottom: 0;">${escapeHtml(chapterName)}</h2>
                <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${escapeHtml(subjectName)} • ${AppState.selectedBoard} • Class ${AppState.selectedClass}</p>
            </div>
        </div>
        <div id="chapter-detail-content" class="profile-menu"></div>
    `;
    
    const backBtn = document.getElementById('back-to-chapters');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (typeof switchView === 'function') {
                switchView('chapters-view', document.getElementById('nav-subjects'));
            }
        });
    }
    
    const content = document.getElementById('chapter-detail-content');
    if (!content) return;
    
    let html = '<div style="display:grid; gap:14px;">';
    
    videoConfig.forEach((v, i) => {
        const wrapperId = `video-wrapper-${i}`;
        const isOneShot = v.label === 'One-shot' && (subjectName === 'Science 1' || subjectName === 'Science 2');
        const videoSummary = (typeof VIDEO_SUMMARIES !== 'undefined') ? VIDEO_SUMMARIES : null;
        const summaryData = videoSummary && videoSummary[chapterName] && videoSummary[chapterName][subjectName] && videoSummary[chapterName][subjectName][v.label];
        const summaryId = `video-summary-${i}`;

        html += `
            <div data-video-label="${v.label}" style="margin-bottom:16px; position: relative;">
                <p style="font-size:12px; color:var(--text-secondary); margin:0 0 8px;">${escapeHtml(v.label)}</p>
                <div id="${wrapperId}" style="position:relative; width:100%; padding-top:56.25%; border-radius:12px; overflow:hidden; background:#000;">
                    <iframe id="chapter-video-iframe-${i}" src="${toEmbedWithApi(v.embedUrl)}" 
                        title="${escapeHtml(v.title)}" style="position:absolute; inset:0; width:100%; height:100%; border:0;" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen></iframe>
                </div>
                ${isOneShot ? `
                    <button class="video-summary-btn" data-summary-id="${summaryId}" data-video-index="${i}" style="margin-top:10px; display:inline-flex; align-items:center; gap:8px; background:rgba(166,255,31,0.1); border:1px solid rgba(166,255,31,0.3); border-radius:10px; padding:8px 16px; cursor:pointer; color:#A6FF1F; font-size:13px; font-weight:600; transition:all 0.2s;">
                        <i class="ph ph-magic-wand" style="font-size:16px;"></i>
                        <span>Summary</span>
                    </button>
                    <div id="${summaryId}" class="video-summary-panel" style="display:none; margin-top:10px; background:rgba(0,0,0,0.85); border:1px solid rgba(166,255,31,0.2); border-radius:14px; padding:16px;">
                        ${summaryData ? `
                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:14px;">
                                <i class="ph-fill ph-sparkle" style="color:#A6FF1F; font-size:18px;"></i>
                                <span style="font-size:14px; font-weight:700; color:#A6FF1F;">Summary</span>
                                <span class="summary-typing-status" style="font-size:10px; color:#a0a0a0; margin-left:auto; font-style:italic;"></span>
                            </div>
                            ${summaryData.map((section, sIdx) => `
                                <div class="summary-section" style="margin-bottom:16px;">
                                    <button class="summary-timestamp-btn" data-video-index="${i}" data-time="${section.startTime}" style="background:rgba(166,255,31,0.12); border:1px solid rgba(166,255,31,0.3); border-radius:8px; padding:6px 12px; cursor:pointer; font-size:12px; font-weight:600; margin-bottom:8px; display:flex; align-items:center; gap:6px; transition:all 0.2s;">
                                        <i class="ph ph-clock-counter-clockwise" style="font-size:14px; color:#A6FF1F;"></i>
                                        <span style="color:#A6FF1F;">${escapeHtml(section.title)}</span><span class="timestamp-time" style="color:#3B82F6; font-size:11px;"> (${section.timeRange})</span>
                                    </button>
                                    <ul class="summary-points-list" data-summary-id="${summaryId}" data-section="${sIdx}" style="margin:0; padding:0 0 0 16px; display:flex; flex-direction:column; gap:6px;">
                                        ${section.points.map((point, pIdx) => `
                                            <li class="summary-point" data-point-text="${point.replace(/"/g, '&quot;')}" style="font-size:12.5px; color:#e0e0e0; line-height:1.5; display:none;"></li>
                                        `).join('')}
                                    </ul>
                                </div>
                            `).join('')}
                        ` : `
                            <div style="text-align:center; padding:20px; color:#a0a0a0; font-size:13px;">
                                <i class="ph ph-hourglass" style="font-size:24px; display:block; margin-bottom:8px; color:#A6FF1F;"></i>
                                Summary not available for this video yet.
                            </div>
                        `}
                    </div>
                ` : ''}
            </div>`;
    });
    html += '</div>';
    content.innerHTML = html;
    
    // Setup video tracking AFTER iframes are loaded
    setTimeout(() => {
        setupChapterVideoTracking(subjectName, chapterName, videoConfig);
        if (preferred) {
            const target = content.querySelector(`[data-video-label="${preferred}"]`);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                target.style.outline = '1px solid rgba(220,38,38,0.6)';
                setTimeout(() => target.style.outline = 'none', 1200);
            }
        }
    }, 80);

    // Summary toggle button click handlers
    content.querySelectorAll('.video-summary-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const summaryId = btn.dataset.summaryId;
            const panel = document.getElementById(summaryId);
            if (panel) {
                if (panel.style.display === 'none') {
                    panel.style.display = 'block';
                    const span = btn.querySelector('span');
                    if (span) span.textContent = 'Hide Summary';
                    btn.style.background = 'rgba(166,255,31,0.2)';
                    // Trigger typewriter animation on first open only
                    if (!panel.dataset.typed) {
                        panel.dataset.typed = 'true';
                        startTypewriterAnimation(panel);
                    }
                } else {
                    panel.style.display = 'none';
                    const span = btn.querySelector('span');
                    if (span) span.textContent = 'Summary';
                    btn.style.background = 'rgba(166,255,31,0.1)';
                }
            }
        });
    });

    // Timestamp click handlers — seek YouTube iframe to that time
    content.querySelectorAll('.summary-timestamp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const videoIndex = parseInt(btn.dataset.videoIndex);
            const timeStr = btn.dataset.time;
            const wrapper = document.getElementById('video-wrapper-' + videoIndex);
            const iframe = document.getElementById('chapter-video-iframe-' + videoIndex);
            if (!iframe || !wrapper) return;

            // Parse time string to seconds (format: "MM:SS" or "H:MM:SS")
            const parts = timeStr.split(':').map(Number);
            let seconds = 0;
            if (parts.length === 3) {
                seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
            } else if (parts.length === 2) {
                seconds = parts[0] * 60 + parts[1];
            }

            // Extract video ID from current iframe src
            const src = iframe.src;
            const embedMatch = src.match(/\/embed\/([^?&\/]+)/);
            if (!embedMatch) return;
            const videoId = embedMatch[1];

            // Build new embed URL with start time and autoplay
            const newSrc = 'https://www.youtube.com/embed/' + videoId + '?start=' + seconds + '&autoplay=1&rel=0&enablejsapi=1';
            iframe.src = newSrc;

            // Scroll the video wrapper into view so student sees the video play
            wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
}

// ========== TYPEWRITER ANIMATION ==========
function startTypewriterAnimation(panel) {
    const lists = panel.querySelectorAll('.summary-points-list');
    const statusEl = panel.querySelector('.summary-typing-status');
    let totalPoints = 0;
    lists.forEach(list => {
        totalPoints += list.querySelectorAll('.summary-point').length;
    });
    let currentPoint = 0;

    function typeNextPoint(listIndex) {
        if (listIndex >= lists.length) {
            if (statusEl) statusEl.textContent = '';
            return;
        }
        const list = lists[listIndex];
        const points = list.querySelectorAll('.summary-point');

        function typePoint(pIdx) {
            if (pIdx >= points.length) {
                // Move to next section
                typeNextPoint(listIndex + 1);
                return;
            }
            const li = points[pIdx];
            const text = li.dataset.pointText || '';
            li.style.display = 'list-item';
            li.textContent = '';

            let charIdx = 0;
            if (statusEl) statusEl.textContent = 'Generating summary...';

            const interval = setInterval(() => {
                if (charIdx < text.length) {
                    li.textContent += text[charIdx];
                    charIdx++;
                } else {
                    clearInterval(interval);
                    currentPoint++;
                    if (statusEl) statusEl.textContent = currentPoint + '/' + totalPoints + ' points';
                    // Small delay before next point
                    setTimeout(() => typePoint(pIdx + 1), 80);
                }
            }, 12);
        }

        typePoint(0);
    }

    typeNextPoint(0);
}

// Helper function for YouTube embed with API
function toEmbedWithApi(url) {
    try {
        const parsed = new URL(url, window.location.origin);
        if (window.location.protocol !== 'file:') {
            parsed.searchParams.set('enablejsapi', '1');
            if (window.location.origin && window.location.origin !== 'null') parsed.searchParams.set('origin', window.location.origin);
        }
        parsed.searchParams.set('playsinline', '0');
        parsed.searchParams.set('controls', '1');
        parsed.searchParams.set('fs', '1');
        parsed.searchParams.set('rel', '0');
        return parsed.toString();
    } catch(e) { 
        return url; 
    }
}