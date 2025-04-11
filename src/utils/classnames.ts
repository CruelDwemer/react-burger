/* string или false для того, чтобы можно было использовать с && выражениями */
const classnames = (...args: Array<string | false>): string =>
	args.filter((s) => s).join(' ');

export default classnames;
