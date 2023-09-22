import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
	const month = parseInt(request.nextUrl.searchParams.get("month") || "20");
	const year = parseInt(request.nextUrl.searchParams.get("year") || "0");

	const numbers = await prisma.event.findMany({
		orderBy: [
			{
				day: { timeStamp: "asc" },
			},
		],

		where: {
			day: {
				year: year != 0 ? year : undefined,
				month: month != 20 ? month : undefined,
			},
		},
	});

	return NextResponse.json(numbers);
}
