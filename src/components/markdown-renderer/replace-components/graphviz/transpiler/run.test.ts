import { GraphVizLexer } from './lexer'
import { GraphVizParser } from './parser'

const testGraphs = [`graph {
  a -- b
  c -- d
  b -- a [color=blue]
}`, `digraph structs {
  node [shape=record];
  struct1 [label="<f0> left|<f1> mid&#92; dle|<f2> right"];
  struct2 [label="<f0> one|<f1> two"];
  struct3 [label="hello&#92;nworld |{ b |{c|<here> d|e}| f}| g | h"];
  struct1:f1 -> struct2:f0;
  struct1:f2 -> struct3:here;
}`, `digraph G {
  main -> parse -> execute;
  main -> init;
  main -> cleanup;
  execute -> make_string;
  execute -> printf
  init -> make_string;
  main -> printf;
  execute -> compare;
}`]
describe('test parser', () => {
  testGraphs.forEach((graph, index) => {
    it(`graph ${index + 1}`, () => {
      const lexingResult = GraphVizLexer.tokenize(graph)

      console.log('lexingResults')
      lexingResult.tokens.forEach(token => console.log(token.image))

      const parser = new GraphVizParser()

      parser.input = lexingResult.tokens
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      parser.graph()
      if (parser.errors.length > 0) {
        console.log('parser errors', JSON.stringify(parser.errors, null, 2))
        throw new Error('Parsing errors detected')
      }
    })
  })
})