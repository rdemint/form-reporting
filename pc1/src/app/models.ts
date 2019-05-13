export interface Practice {
	id?: number;
	daily_summaries?: DailySummary[];
	providers?: Provider[];
	name: string;
	slug: string;
	entity?: string;
	chart_data: any;
}

export interface Provider {
	first_name: string;
	last_name: string;
	full_name: string;
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
	email: string;
	first_name?: string;
	last_name?: string;
	user_type?: string;
}

export interface Entity {
	name?: string;
	slug?: string;
	practices?: Practice[];
	providers?: Provider[];
}


export interface ChartData {
	label: any;
	y: any;
}