import parse from "csv-parse"
import { Readable } from "stream"

export const readCsv = async (stream: Readable): Promise<unknown[]> => {
  const parser = parse({
    columns: true,
    trim: true,
  })

  const parsedRecords = stream.pipe(parser)
  const output: unknown[] = []

  for await (const record of parsedRecords) {
    output.push(record)
  }

  return output
}
