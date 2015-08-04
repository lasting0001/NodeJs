# NodeJs
NodeJs的一些自用模块 (Some nodejs modules used myself)

1、LinkedList
the linked-list module based on basic link-list
基于基础链表的上层封装(the linked-list module based on basic link-list)
双向链表，支持基本的操作，亦可用作队列

2、ExecPool
parallel serial execute functions
并行、串行执行一系列方法

//并行串行执行模块
//参数请自己遵守约束,减少检测，提高性能
//_ExecPool.parallel({fns: [func1, func2, func3], args: [null, null, {game_id: 1}], errorBack: errorCall, overBack: overCall});
//_ExecPool.serial({fns: [func1, func2, func3], args: [null, null, {game_id: 1}], errorBack: errorCall, overBack: overCall});
//并行parallel：自定义function的arguments[0]必有如下参数：callBack：自定义函数执行完毕后callBack(null,results) 或者 callBack(error)-此时后面的函数将不会在执行;arg：自定义参数，可空
//串行serial：自定义function的arguments[0]必有如下参数：pre_results：上一个函数的执行结果;callBack：自定义函数执行完毕后callBack(null,results) 或者 callBack(error)-此时后面的函数将不会在执行;arg：自定义参数，可空
