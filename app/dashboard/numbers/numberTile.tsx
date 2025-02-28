"use client";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDate, getMonth, getYear, isWeekend } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useState } from "react";
import DayTile from "./dayTile";

const plusJakartaSans800 = Plus_Jakarta_Sans({
	weight: "800",
	subsets: ["latin"],
});

export default function NumberTile(props: { day: number; number?: number; date: Date; reFetch: Function }) {
	const [number, setNumber] = useState<number | string>("");

	async function changeNumber() {
		const data = new FormData();
		data.set("day", getDate(props.date).toString());
		data.set("year", getYear(props.date).toString());
		data.set("month", getMonth(props.date).toString());
		data.set("number", number.toString());

		const res = await fetch("/api/dashboard/calendar/setNumber/", {
			method: "PUT",
			body: data,
		});
		props.reFetch();
		setNumber("");
	}

	if (isWeekend(props.date)) {
		return <DayTile day={props.day} isWeekend={true} />;
	} else
		return (
			<div className={`relative day-tile !aspect-square lg:!aspect-[5/4] p-2 !justify-between bg-LightColor/20 `}>
				<div className="flex justify-between items-center w-full">
					<div className={`day-number plusJakartaSans800 bg-LightColor text-SecondColor`}>{props.day}</div>
					<div
						className={`outline-[3px] lg:outline-4 outline-LightColor me-0.5 lg:me-1 outline bg-LightColor/40 text-center w-[19px] md:w-6 lg:w-7 xl:w-9 3xl:w-10 4xl:w-11 h-fit p-0.5 md:p-1 xl:p-1.5 4xl:p-2 rounded-full text-2xs md:text-xs lg:text-sm xl:text-base 3xl:text-xl text-MainDarkGray ${
							plusJakartaSans800.className
						} ${!props.number ? "hidden" : "block"}`}
					>
						{props.number}
					</div>
				</div>

				<div className="flex lg:gap-x-3 gap-x-0.5 md:gap-2 w-full items-center justify-between">
					<input
						className="w-full outline-none border-[1px] p-0.5 md:px-2 md:py-0.5 rounded-lg border-DarkColor text-2xs sm:text-xs md:text-base 3xl:text-xl"
						type="text"
						value={number}
						min={1}
						onChange={(e) => {
							const newNumber = Number(e.target.value);

							if (newNumber > 0 && newNumber < 40) setNumber(newNumber);
							else if (e.target.value == "") setNumber("");
							else setNumber((old) => old);
						}}
					/>
					<AnimatePresence>
						{number != "" && (
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								transition={{ duration: 0.15, type: "tween" }}
								className={`flex aspect-square items-center justify-center h-4 w-4 sm:w-5 sm:h-5 xs:w-6 xs:h-6 bg-DarkColor text-white transition-all duration-200 p-1 sm:p-1.5 lg:p-2.5 rounded-full 
							hover:bg-LightColor hover:text-MainDarkGray cursor-pointer
						`}
							>
								<FontAwesomeIcon icon={faCheck} onClick={() => changeNumber()} />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		);
}
