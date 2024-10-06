export interface Event {
	year: number;
	text: string;
}

export interface Period {
	label: string;
	years: [number, number];
	items: Event[];
}
