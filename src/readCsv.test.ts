import { readCsv } from "./readCsv"
import fs from "fs"
import { Readable } from "stream"

describe("readCsv", () => {
  let readStream: Readable

  beforeEach(() => {
    readStream = fs.createReadStream(`${__dirname}/fixtures/sales-records.csv`, {
      flags: "r",
      encoding: "utf8",
      autoClose: true,
    })
  })

  it("should return the correct number of records", async () => {
    const records = await readCsv(readStream)

    expect(records).toHaveLength(1000)
  })

  it("should return the records formatted correctly", async () => {
    const records = await readCsv(readStream)
    const processed = JSON.parse(
      fs.readFileSync(`${__dirname}/fixtures/correct.json`, {
        encoding: "utf8",
      }),
    )

    expect(records.slice(0, 5)).toEqual(processed)
  })
})
