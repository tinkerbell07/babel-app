class Cl {
  #privateField = "top secret string";

  constructor() {
    this.publicField = "not secret string";
  }

  get #privateFieldValue() {
    return this.#privateField;
  }

  set #privateFieldValue(newValue) {
    this.#privateField = newValue;
  }

  publicGetPrivateField() {
    return this.#privateFieldValue;
  }

  publicSetPrivateField(newValue) {
    this.#privateFieldValue = newValue;
  }

  get publicFieldValue() {
    return this.publicField;
  }

  set publicFieldValue(newValue) {
    this.publicField = newValue;
  }

  testUpdates() {
    this.#privateField = 0n;
    this.publicField = 0n;
    this.#privateFieldValue = this.#privateFieldValue++;
    this.publicFieldValue = this.publicFieldValue++;

    ++this.#privateFieldValue;
    ++this.publicFieldValue;

    this.#privateFieldValue += 1n;
    this.publicFieldValue += 1n;

    this.#privateFieldValue = -(this.#privateFieldValue ** this.#privateFieldValue);
    this.publicFieldValue = -(this.publicFieldValue ** this.publicFieldValue);
  }
}