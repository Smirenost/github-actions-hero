import { tokenMatcher } from "chevrotain";
import { And, BaseCstVisitor, Eq, NEq, Or } from "./parser";

class ExpressionEvaluator extends BaseCstVisitor {
  constructor() {
    super();

    // this.validateVisitor();
  }

  expression(ctx: any) {
    let result = this.visit(ctx.lhs);

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        let rhsResult = this.visit(rhsOperand);
        const operator = ctx.Operator[idx];

        // Coerce types
        if (typeof result != typeof rhsResult) {
          result = this._coerceValue(result);
          rhsResult = this._coerceValue(rhsResult);
        }

        switch (true) {
          // ==
          case tokenMatcher(operator, Eq):
            result = result == rhsResult;
            break;

          // !=
          case tokenMatcher(operator, NEq):
            result = result != rhsResult;
            break;

          // &&
          case tokenMatcher(operator, And):
            result = result && rhsResult;
            break;

          // ||
          case tokenMatcher(operator, Or):
            result = result || rhsResult;
            break;
        }
      });
    }

    return result;
  }

  subExpression(ctx: any) {
    switch (true) {
      case !!ctx.value:
        return this.visit(ctx.value);

      case !!ctx.logicalGrouping:
        return this.visit(ctx.logicalGrouping);
    }
  }

  logicalGrouping(ctx: any) {
    return this.visit(ctx.expression);
  }

  value(ctx: any) {
    switch (true) {
      case !!ctx.NumberLiteral:
        return parseFloat(ctx.NumberLiteral[0].image);

      case !!ctx.True:
        return true;

      case !!ctx.False:
        return false;

      case !!ctx.Null:
        return null;

      case !!ctx.StringLiteral: {
        const value: string = ctx.StringLiteral[0].image;
        // Remove leading and trailing '
        return "" + value.substring(1, value.length - 1).replace(/''/g, "'");
      }
    }
  }

  private _coerceValue(val: any): any {
    if (val === null) {
      return val;
    }
  }
}

export const evaluator = new ExpressionEvaluator();
