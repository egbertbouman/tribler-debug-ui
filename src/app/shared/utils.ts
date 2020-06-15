export default class Utils {
  static formatBytes(bytes: number) {
    if (bytes == 0) { return "0.00 B"; }
    var e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes/Math.pow(1024, e)).toFixed(2)+' '+' KMGTP'.charAt(e)+'B';
  }
  static formatTimeDiff(time: number) {
	const now = Date.now() / 1000;
	return Utils.formatTime(now - time);
  }
  static formatTime(time: number) {
    var date = new Date(0);
    date.setSeconds(time);
    return date.toISOString().substr(11, 8);
  }
  static formatFlags(flags: [number]) {
    var flag_to_string = {1: 'RELAY',
                          2: 'EXIT_ANY',
                          4: 'EXIT_IPV8'}
  	var result = '';
	var flag;
	for (flag of flags)
      result = result + flag_to_string[flag] + ' ';
    return result;
  }
}