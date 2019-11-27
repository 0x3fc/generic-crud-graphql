declare interface String {
  captitalize(): string;
}

String.prototype.captitalize = function(): string {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
