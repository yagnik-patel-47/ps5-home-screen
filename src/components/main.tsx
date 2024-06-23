import "./main.css";
import { AnimatePresence, motion as m } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { games } from "@/lib/data";
import WrenchAvatar from "@/assets/wrench.webp";
import { cn } from "@/lib/utils";

export default function MainScreen() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const gamepadRef = useRef<Gamepad | null>(null);

	const incrementIndex = useCallback(() => {
		if (currentIndex + 1 === games.length) setCurrentIndex(0);
		else setCurrentIndex((prev) => prev + 1);
	}, [currentIndex]);

	const decrementIndex = useCallback(() => {
		if (currentIndex === 0) setCurrentIndex(games.length - 1);
		else setCurrentIndex((prev) => prev - 1);
	}, [currentIndex]);

	let directionLx = 0;

	const updateGamepadState = useCallback(() => {
		if (gamepadRef.current) {
			const gamepad = navigator.getGamepads()[gamepadRef.current.index];
			if (gamepad) {
				const leftStickX = gamepad.axes[0];
				const leftStickY = gamepad.axes[1];
				const threshold = 0.1; // Adjust threshold as needed

				if (leftStickX === 0) {
					directionLx = 0;
				} else if (leftStickX > threshold && directionLx !== 1) {
					directionLx = 1;
					// console.log("do +1");
					incrementIndex();
				} else if (leftStickX < -threshold && directionLx !== -1) {
					directionLx = -1;
					// console.log("do -1");
					decrementIndex();
				}

				if (Math.abs(leftStickX) < threshold) {
					directionLx = 0;
				}
			}
		}
		requestAnimationFrame(updateGamepadState);
	}, [incrementIndex, decrementIndex, directionLx]);

	useEffect(() => {
		const handleGamepadConnected = (event: GamepadEvent) => {
			gamepadRef.current = event.gamepad;
			updateGamepadState();
		};

		const handleGamepadDisconnected = () => {
			gamepadRef.current = null;
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") decrementIndex();
			if (e.key === "ArrowRight") incrementIndex();
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("gamepadconnected", handleGamepadConnected);
		window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

		return () => {
			window.removeEventListener("gamepadconnected", handleGamepadConnected);
			window.removeEventListener(
				"gamepaddisconnected",
				handleGamepadDisconnected,
			);
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [incrementIndex, decrementIndex, updateGamepadState]);

	return (
		<>
			<AnimatePresence initial={false}>
				{games.map(
					(game, index) =>
						currentIndex === index && (
							<m.img
								className="fixed inset-0 w-full h-full object-cover z-[-1]"
								key={index}
								src={game.banner.src}
								alt={game.name}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: [1, 1, 1, 0] }}
								transition={{ duration: 0.25 }}
							/>
						),
				)}
			</AnimatePresence>
			<div className="fixed w-1/2 h-full bg-gradient-to-r from-black/60 from-20% z-[-1] left-0 top-0"></div>
			<div className="fixed h-1/2 w-full bg-gradient-to-b from-black/60 from-20% z-[-1] left-0 top-0"></div>
			<div className="flex flex-col justify-between h-dvh">
				<div>
					<Header />
					<m.div layout className="flex gap-2 px-20 items-start">
						{games.map((game, index) => (
							<m.button
								onClick={() => setCurrentIndex(index)}
								className={cn(
									"relative rounded-xl size-20",
									index === currentIndex && "size-32",
								)}
								key={game.name}
								layout="preserve-aspect"
								animate={{
									borderWidth: index === currentIndex ? 2 : 0,
									x: currentIndex * -80,
								}}
								transition={{ duration: 0.2 }}
							>
								<m.div
									layout
									data-active={index === currentIndex ? "true" : "false"}
									className={cn(
										"relative w-full h-full rounded-xl shine overflow-hidden",
										currentIndex === index && "after:animate-shine",
									)}
								></m.div>
								<m.img
									layout="preserve-aspect"
									transition={{ duration: 0.2 }}
									className={cn("rounded-xl size-full absolute inset-0")}
									src={game.icon.src}
									alt={game.name}
								/>
								<AnimatePresence mode="popLayout" initial={false}>
									{currentIndex === index && (
										<m.span
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 0.5, delay: 0.25 }}
											className="absolute text-lg bottom-[10%] whitespace-nowrap left-[calc(100%+8px)]"
											layout
										>
											{game.name}
										</m.span>
									)}
								</AnimatePresence>
							</m.button>
						))}
					</m.div>
				</div>
				<AnimatePresence mode="wait" initial={false}>
					{games.map(
						(game, index) =>
							currentIndex === index && (
								<m.div
									key={game.name}
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: 20, opacity: 0 }}
									transition={{ duration: 0.25 }}
									className="space-y-6 px-40 mb-32"
								>
									<img
										className={cn(
											"h-auto",
											game.largeIconShape === "square" ? "w-60" : "w-[30rem]",
										)}
										src={game.largeIcon.src}
										alt={`${game.name} icon`}
									/>
									<p className="max-w-prose">{game.desc}</p>
									<div className="flex items-center gap-4">
										<a
											target={game.link.target}
											href={game.link.href}
											className="px-14 py-4 bg-white/20 rounded-full"
										>
											{game.link.text}
										</a>
										<button className="p-4 bg-white/20 rounded-full">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												height="24px"
												viewBox="0 -960 960 960"
												width="24px"
												fill="#e8eaed"
											>
												<path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
											</svg>
										</button>
									</div>
								</m.div>
							),
					)}
				</AnimatePresence>
			</div>
		</>
	);
}

function Header() {
	return (
		<header className="flex items-center justify-between w-full px-40 py-16">
			<div className="flex gap-10 text-xl">
				<h6 className="font-semibold">Games</h6>
				<h6>Media</h6>
			</div>
			<div className="flex items-center gap-14">
				<button>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#e8eaed"
						className="size-6"
					>
						<path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
					</svg>
				</button>
				<button>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#e8eaed"
						className="size-6"
					>
						<path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
					</svg>
				</button>
				<button>
					<img
						className="size-8 rounded-full"
						src={WrenchAvatar.src}
						alt="Watch Dogs 2 Wrench"
					/>
				</button>
				<p className="text-xl">
					{new Date().toLocaleTimeString([], {
						hour: "numeric",
						minute: "2-digit",
					})}
				</p>
			</div>
		</header>
	);
}
