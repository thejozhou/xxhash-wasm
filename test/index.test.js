import test from "jest-t-assert";
import Xxhash from "../src";

// The test cases were taken from tests of other implementation and the
// resulting hashes have been generated by running another implementation.
// All cases used the seed 0.
const testCases = [
  { input: "", h32: "2cc5d05", h64: "ef46db3751d8e999" },
  { input: "a", h32: "550d7456", h64: "d24ec4f1a98c6e5b" },
  { input: "as", h32: "9d5a0464", h64: "1c330fb2d66be179" },
  { input: "asd", h32: "3d83552b", h64: "631c37ce72a97393" },
  { input: "asdf", h32: "5e702c32", h64: "415872f599cea71e" },
  { input: "abc", h32: "32d153ff", h64: "44bc2cf5ad770999" },
  { input: "abcd", h32: "a3643705", h64: "de0327b0d25d92cc" },
  {
    input: "Call me Ishmael. Some years ago--never mind how long precisely-",
    h32: "6f320359",
    h64: "2a2e85470d6fd96"
  },
  {
    input:
      "The quick brown fox jumps over the lazy dog http://i.imgur.com/VHQXScB.gif",
    h32: "5ce7b616",
    h64: "93267f9820452ead"
  },
  { input: "heiå", h32: "db5abccc", h64: "b9d3d990d2001a1a" },
  { input: "κόσμε", h32: "d855f606", h64: "a0488960c70d8772" }
];

for (const testCase of testCases) {
  test(`h32 of ${testCase.input}`, async t => {
    const xxhash = new Xxhash();
    const h32 = await xxhash.h32(testCase.input);
    t.is(h32, testCase.h32);
  });

  test(`h64 of ${testCase.input}`, async t => {
    const xxhash = new Xxhash();
    const h64 = await xxhash.h64(testCase.input);
    t.is(h64, testCase.h64);
  });
}

test("h32 with different seeds produces different hashes", async t => {
  const xxhash = new Xxhash();
  const input = "different seeds";
  const h320 = await xxhash.h32(input, 0);
  const h32abcd = await xxhash.h32(input, 0xabcd);
  t.not(h320, h32abcd);
});

test("h64 with different seeds produces different hashes", async t => {
  const xxhash = new Xxhash();
  const input = "different seeds";
  const h640 = await xxhash.h64(input, 0, 0);
  const h64lowAbcd = await xxhash.h64(input, 0, 0xabcd);
  const h64highAbcd = await xxhash.h64(input, 0xabcd, 0);
  t.not(h640, h64lowAbcd);
  t.not(h640, h64highAbcd);
  t.not(h64lowAbcd, h64highAbcd);
});
