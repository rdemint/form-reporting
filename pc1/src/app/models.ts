export interface Practice {
	id?: number;
	daily_summaries?: DailySummary[];
	name: string;
	slug: string;
}


export interface DailySummary {
	id?: number;
	date: string;
	last_updated?: string;
	visits: number;
	workdays: number;
	noshows: number;
	practice: number;
}

export interface User {
	email: string;
	password: string;
	practice?: number;
}

export interface ChartData {
	label: any;
	y: any;
}