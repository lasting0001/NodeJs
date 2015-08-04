/**
 * Created by Jun.li on 2015/8/3.
 */
"use strict";

//并行串行执行模块
//参数请自己遵守约束,减少检测，提高性能
//_ExecPool.parallel({fns: [func1, func2, func3], args: [null, null, {game_id: 1}], errorBack: errorCall, overBack: overCall});
//_ExecPool.serial({fns: [func1, func2, func3], args: [null, null, {game_id: 1}], errorBack: errorCall, overBack: overCall});
//并行parallel：自定义function的arguments[0]必有如下参数：callBack：自定义函数执行完毕后callBack(null,results) 或者 callBack(error)-此时后面的函数将不会在执行;arg：自定义参数，可空
//串行serial：自定义function的arguments[0]必有如下参数：pre_results：上一个函数的执行结果;callBack：自定义函数执行完毕后callBack(null,results) 或者 callBack(error)-此时后面的函数将不会在执行;arg：自定义参数，可空
function ExecPool() {
    return {
        parallel: function (params) {
            params = params || {};
            var fns = params.fns;
            var overBack = params.overBack;
            var errorBack = params.errorBack;
            if (!errorBack) {
                return;
            }
            if (!fns || !overBack) {
                return errorBack(new Error('params error'));
            }
            var over = 0;
            var count = 0;
            var len = fns.length;
            var args = params.args || [];
            var entities = params.entities || [];
            for (var j = 0; j < len; j++) {
                var fj = fns[j];
                var ps = {arg: args[j]};
                ps.callback = function (err, results) {
                    if (over) {
                        return;
                    }
                    if (err) {
                        over = true;
                        return errorBack(err);
                    }
                    (++count === len) && overBack(results);
                };
                (typeof  fj === 'function') && (fj.call(entities[j] || null, ps));
            }
        },
        serial: function (params) {
            params = params || {};
            var fns = params.fns;
            var overBack = params.overBack;
            var errorBack = params.errorBack;
            if (!errorBack) {
                return;
            }
            if (!fns || !overBack) {
                return errorBack(new Error('params error'));
            }
            var over = 0;
            var ll = new _LinkedList();
            var args = params.args || [];
            var entities = params.entities || [];
            for (var i = 0, len = fns.length; i < len; i++) {
                var fi = fns[i];
                ll.addTail(fi);
            }
            var index = 0;
            var elm = ll.cutHead();
            var ps = {arg: args[index]};
            ps.callback = function (err, results) {
                if (over) {
                    return;
                }
                if (err) {
                    over = true;
                    return errorBack(err);
                }
                elm = ll.cutHead();
                if (!elm) {
                    return overBack(results);
                }
                ++index;
                ps.arg = args[index];
                ps.pre_results = results;
                (typeof  elm === 'function') && (elm.call(entities[index] || null, ps));
            };
            (typeof  elm === 'function') && (elm.call(entities[index] || null, ps));
        }
    }
}

global._ExecPool = ExecPool();
