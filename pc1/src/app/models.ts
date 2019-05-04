export interface Practice {
	id?: number;
	daily_summaries?: DailySummary[];
	providers?: Provider[];
	name: string;
	slug: string;
	entity?: string;
}

export interface Provider {
	first_name: string;
	last_name: string;
	credentials: string;
}


export interface DailySummary {
	id?: number;
	date: Date;
	last_updated?: string;
	visits: number;
	workdays: number;
	noshows: number;
	practice: number;
	provider: Provider;
}

export interface User {
	token: string;
	email: string;
	password?: string;
	practice?: number;
	entity?: number;
	user_type?: string;
}

export interface ChartData {
	label: any;
	y: any;
}

export interface Entity {
	name?: string;
	slug?: string;
	practices?: Practice[];
	providers?: Provider[];
}


export interface Practice {
	name: string;
	slug: string;
	providers?: Provider[];
}