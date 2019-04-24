export interface Practice {
	id?: number;
	daily_summaries?: DailySummary[];
	name: string;
	slug: string;
	entity?: string;
}


export interface DailySummary {
	id?: number;
	date: Date;
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
	entity?: number;
	user_type?: string;
}

export interface ChartData {
	label: any;
	y: any;
}

export interface Entity {
	name: string;
	slug: string;
	practices?: Practice[];
}