var R = require('ramda');

import AstSearcher  from './ast-helpers/ast-searcher';
import AstInserter  from './ast-helpers/ast-inserter';
import SourceCode  from './source-code';

var RequireDebugSnippet = require('./snippets/require-debug');
var DebugDataSnippet = require('./snippets/debug-data');

/**
 * Instrumenter (static class)
 * use directly: Instrumenter.addDebugRequire(sourceCode);
 */
class Instrumenter {

  constructor() {
    throw new Error('use directly: Instrumenter.addDebugRequire(sourceCode);');
  }

  static addDebugRequire(sourceCode) {

    // get snippet AST
    var snippet_instance = new RequireDebugSnippet(sourceCode.filepath);
    var snippet_ast = snippet_instance.ast;

    var new_ast = AstInserter.insertSnippetBeforeMainProgramBody(sourceCode.ast, snippet_ast);
    var source_code_new = new SourceCode({ ast: new_ast });

    return source_code_new.code;
  }

  static addDebugFunctionCall(sourceCode) {

    // get all functions
    var allFunctions = AstSearcher.searchFunctions(sourceCode.ast);

    allFunctions.forEach(function (func) {
      // get function's name
      var func_name = AstSearcher.searchFunctionName(func);

      // get snippet AST
      var snippet_instance = new DebugDataSnippet(func_name, func.loc.start.line);
      var snippet_ast = snippet_instance.ast;

      AstInserter.insertSnippetBeforeFunctionBody(func, snippet_ast);
    });

    var source_code_new = new SourceCode({ ast: sourceCode.ast });

    return source_code_new.code;
  }

}

module.exports = Instrumenter;