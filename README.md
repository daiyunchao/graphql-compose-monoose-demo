# graphql-compose-monoose-demo

使用 koa + mongoose + graphql-compose-monoose(自动生成graphql代码框架)

> 实现了如下功能:

使用`graphql-compose-mongoose`实现单Schema的增删改查功能

添加自定义的query/mutaion方法

多scheam的基础功能

添加关系,并实现关系查询

调用控制,有的api只能管理员调用

隐藏关联scheam的一些字段(只能查看到好友的基本资料,隐私资料不能查询)

显示/隐藏scheam的内部字段(隐藏用户数据中的_id)


--------------------------------------------------------------------------------------------

> 目录结构说明:

`config/index.js` -- 配置mongodb数据库

`mongodb/index.js` -- 启动数据库的方法 

`schema` -- schema文件夹,mongoose + graphql-compose-monoose 实现的graphql方法

`schema/index.js` -- schema汇总文件

`schema/user-homework-relation.js` -- user和homework的关系

`server.js` -- 启动koa的和 graphql的路由文件

`start.js` -- 转换es6的启动文件



更详细的代码说明和解析可见:https://daiyunchao.github.io/2019/05/29/graphql-compose-mongoose%E5%AE%9E%E9%99%85%E4%BD%93%E9%AA%8C/
