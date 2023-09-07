"use client";

import CalendarComponent from "@/components/calendar/calendarComponent";
import DatabaseTile from "@/components/calendar/databaseTile";
import DayTile from "@/components/calendar/dayTile";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { endOfMonth, getDate, getDaysInMonth, getISODay, getMonth, getYear, startOfMonth, startOfToday } from "date-fns";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";

const poppingsFont700 = Poppins({
	weight: "700",
	subsets: ["latin"],
});
const poppingsFont600 = Poppins({
	weight: "600",
	subsets: ["latin"],
});
const poppingsFont500 = Poppins({
	weight: "500",
	subsets: ["latin"],
});

export default function Page() {
	const [today, setToday] = useState<Date>(startOfToday());
	const [month, setMonth] = useState<number>(getMonth(startOfToday()));
	const [year, setYear] = useState<number>(getYear(startOfToday()));

	function changeMonth(up: boolean) {
		console.log(month);
		if (up) {
			if (month == 11) {
				setMonth(0);
				setYear((old) => old + 1);
			} else setMonth((old) => old + 1);
			setToday(startOfMonth(new Date(year, month + 1, 2)));
		} else {
			if (month == 0) {
				setMonth(11);
				setYear((old) => old - 1);
			} else setMonth((old) => old - 1);
			setToday(startOfMonth(new Date(year, month - 1, 2)));
		}
	}

	const weekDays = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
	const monthsNames = ["Styczeń", "Luty", "Marzec", "Kwiecieć", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

	return (
		<div className="flex">
			<div className="flex w-full flex-col p-12 gap-y-3 items-center">
				<h1 className={`w-fit text-7xl mt-9 mb-20 ${poppingsFont700.className}`}>Kalendarz</h1>

				<div className="mb-2 flex items-center w-full gap-x-4 justify-start">
					<FontAwesomeIcon icon={faBackward} className="text-MainDarkGray/80 h-5" onClick={() => changeMonth(false)} />
					<h3 className={`text-left w-fit text-5xl ${poppingsFont600.className}`}>{monthsNames[month]}</h3>
					<FontAwesomeIcon icon={faForward} className="text-MainDarkGray/80 h-5" onClick={() => changeMonth(true)} />
				</div>

				<div className="flex gap-x-6 text-MainDarkGray/60 w-full text-lg text-right pt-2 border-b-2">
					{weekDays.map((weekDay) => (
						<div className={`w-full px-1 ${poppingsFont500.className}`} key={weekDay}>
							{weekDay}
						</div>
					))}
				</div>

				<CalendarComponent today={today} month={month} year={year} />
			</div>
		</div>
	);
}
