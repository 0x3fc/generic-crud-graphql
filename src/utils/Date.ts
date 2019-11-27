declare interface Date {
  unix(): number;
}

Date.prototype.unix = function(): number {
  return (Date.now() / 1000) | 0;
};
