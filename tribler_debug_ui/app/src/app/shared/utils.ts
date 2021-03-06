declare var sha1: any;

export default class Utils {
  static formatBytes(bytes: number) {
    if (bytes === 0) { return '0.00 B'; }
    const e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B';
  }
  static formatTimeDiff(time: number) {
    if (time === 0) { return '-'; }
    const now = Date.now() / 1000;
    return Utils.formatTime(now - time);
  }
  static formatTime(time: number) {
    if (time === 0) { return '-'; }
    const date = new Date(0);
    date.setSeconds(time);
    return date.toISOString().substr(11, 8);
  }
  static formatFlags(flags: [number]) {
    const flagToString = {1: 'RELAY',
                          2: 'EXIT_ANY',
                          4: 'EXIT_IPV8',
                          8: 'SPEEDTEST',
                          32768: 'EXIT_HTTP'};
    let result = '';
    let flag;
    for (flag of flags) {
      result = result + (flagToString[flag] || flag) + ' ';
    }
    return result;
  }
  static average = (...numbers) => numbers.reduce((a, b) => a + b) / numbers.length;
  static median(...numbers) {
    if (numbers.length === 0) { return 0; }

    numbers.sort((a, b) => a - b);

    const half = Math.floor(numbers.length / 2);

    if (numbers.length % 2) {
      return numbers[half];
    }
    return (numbers[half - 1] + numbers[half]) / 2.0;
  }
  static encodeHTML(html) {
    const entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;',
        '/': '&#x2F;'
    };
    return html.replace(/[&<>"'\/]/g, (s) => entityMap[s] );
  }
  static prettyJSON(obj) {
    return JSON.stringify(obj, null, '  ');
  }
  static publicKeyToMidArray(pkHex: string) {
    const pkArr = pkHex.match(/\w{2}/g).map((a) => parseInt(a, 16));
    return sha1(pkArr).match(/\w{2}/g).map((a) => parseInt(a, 16));
  }
  static publicKeyToMid(pkHex: string): string {
    const midArr = Utils.publicKeyToMidArray(pkHex);
    return Array.from(midArr, (byte: any) => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
  }
}
