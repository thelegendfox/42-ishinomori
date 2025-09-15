export class AnsiRaw {
	public static readonly Reset = "\x1b[0m";
	public static readonly Bright = "\x1b[1m";
	public static readonly Dim = "\x1b[2m";
	public static readonly Underscore = "\x1b[4m";
	public static readonly Blink = "\x1b[5m";
	public static readonly Reverse = "\x1b[7m";
	public static readonly Hidden = "\x1b[8m";

	public static readonly Foreground = {
		Black: "\x1b[30m",
		Red: "\x1b[31m",
		Green: "\x1b[32m",
		Yellow: "\x1b[33m",
		Blue: "\x1b[34m",
		Magenta: "\x1b[35m",
		Cyan: "\x1b[36m",
		White: "\x1b[37m",
		Gray: "\x1b[90m",
	};

	public static readonly Background = {
		Black: "\x1b[40m",
		Red: "\x1b[41m",
		Green: "\x1b[42m",
		Yellow: "\x1b[43m",
		Blue: "\x1b[44m",
		Magenta: "\x1b[45m",
		Cyan: "\x1b[46m",
		White: "\x1b[47m",
		Gray: "\x1b[100m",
	};
}

export default class Ansi {
	public static readonly Info = `${AnsiRaw.Foreground.Black}${AnsiRaw.Background.White}INFO:${AnsiRaw.Reset}`;
	public static readonly Warn = `${AnsiRaw.Foreground.Black}${AnsiRaw.Background.Yellow}${AnsiRaw.Bright}WARN:${AnsiRaw.Reset}`;
	public static readonly Error = `${AnsiRaw.Foreground.Black}${AnsiRaw.Background.Red}${AnsiRaw.Blink}${AnsiRaw.Bright}ERROR:${AnsiRaw.Reset}`;
	public static readonly Cmd = `${AnsiRaw.Foreground.Black}${AnsiRaw.Background.Cyan}CMD:${AnsiRaw.Reset}`;
	public static readonly Mngmt = `${AnsiRaw.Foreground.Black}${AnsiRaw.Background.Green}MNGMT:${AnsiRaw.Reset}`;
}
