import GTA6Icon from "@/assets/gta6_icon.webp";
import GTA6LargeIcon from "@/assets/gta6_large_icon.webp";
import GTA6Banner from "@/assets/gta6_banner.webp";
import GodOfWarIcon from "@/assets/gow_ragnarok_icon.webp";
import GodOfWarLargeIcon from "@/assets/gow_ragnarok_large_icon.webp";
import GodOfWarBanner from "@/assets/gow_ragnarok_banner.webp";
import StreetFighter6Icon from "@/assets/street_fighter_6_icon.webp";
import StreetFighter6LargeIcon from "@/assets/street_fighter_6_large_icon.webp";
import StreetFighter6Banner from "@/assets/street_fighter_6_banner.webp";
import EldenRingIcon from "@/assets/eldenring_icon.webp";
import EldenRingLargeIcon from "@/assets/eldenring_large_icon.webp";
import EldenRingBanner from "@/assets/eldenring_banner.webp";
import GranTurismo7Icon from "@/assets/gran_turismo_7_icon.webp";
import GranTurismo7LargeIcon from "@/assets/gran_turismo_7_large_icon.webp";
import GranTurismo7Banner from "@/assets/gran_turismo_7_banner.webp";

export const games = [
	{
		name: "Grand Theft Auto VI",
		desc: "Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet.",
		icon: GTA6Icon,
		largeIcon: GTA6LargeIcon,
		largeIconShape: "square",
		banner: GTA6Banner,
		link: {
			href: "/gta6",
			target: "_self",
			text: "Watch Trailer",
		},
	},
	{
		name: "Gran Turismo 7",
		desc: "Gran Turismo 7 brings together the very best features of the Real Driving Simulator.",
		icon: GranTurismo7Icon,
		largeIcon: GranTurismo7LargeIcon,
		largeIconShape: "square",
		banner: GranTurismo7Banner,
		link: {
			href: "https://www.playstation.com/en-in/games/gran-turismo-7",
			target: "_blank",
			text: "Get Game",
		},
	},
	{
		name: "Street Fighter 6",
		desc: "Street Fighter 6 offers a highly evolved combat system with three control types - Classic, Modern and Dynamic - allowing you to quickly play to your skill level.",
		icon: StreetFighter6Icon,
		largeIcon: StreetFighter6LargeIcon,
		largeIconShape: "rectangle",
		banner: StreetFighter6Banner,
		link: {
			href: "https://www.streetfighter.com/6",
			target: "_blank",
			text: "Get Game",
		},
	},
	{
		name: "Elden Ring",
		desc: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
		icon: EldenRingIcon,
		largeIcon: EldenRingLargeIcon,
		largeIconShape: "rectangle",
		banner: EldenRingBanner,
		link: {
			href: "https://en.bandainamcoent.eu/elden-ring/elden-ring",
			target: "_blank",
			text: "Get Game",
		},
	},
	{
		name: "God Of War Ragnarok",
		desc: "Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go",
		icon: GodOfWarIcon,
		largeIcon: GodOfWarLargeIcon,
		largeIconShape: "rectangle",
		banner: GodOfWarBanner,
		link: {
			href: "https://www.playstation.com/en-in/games/god-of-war-ragnarok",
			target: "_blank",
			text: "Get Game",
		},
	},
];
