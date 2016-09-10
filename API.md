#API

前辍http://115.28.223.2:9000/backend/

| 名称 | method | url | params | remark |
|--------|--------|--------|--------|
|   管理员登录     |   POST     |   login     |    ['name', 'password']    |  |
|   管理员退出     |   POST     |   logout     |        | |
|   上传图片     |   POST     |   upload     |    ['file', 'dir'] }    | |
|   dashboard   |   GET     |   dashboard     |       | need login |
|   管理员信息     |   GET     |   admin_info     | ['token]      | need login |


管理员

| 名称 | method | url | params | remark |
|--------|--------|--------|--------|
|   管理员列表     |   GET     |   admin     |       | need login |
|   管理员添加     |   POST     |   admin     |  ['name', 'email', 'password', 'image']     | need login |
|   管理员修改     |   PUT/PATCH     |   admin/{admin}     |  ['name', 'email', 'password', 'image']     | need login |
|   管理员删除     |   DELETE     |   admin/{admin}      |       | need login |

管理员

| 名称 | method | url | params | remark |
|--------|--------|--------|--------|
|   城市列表     |   GET     |   city     |       | need login |
|   城市添加     |   POST     |   city     |  ['name', 'parent_id']     | need login |
|   城市修改     |   PUT/PATCH     |   city/{city}     |  ['name', 'parent_id']     | need login |
|   城市删除     |   DELETE     |   city/{city}      |       | need login |

其它小区，用户，标签，评论同上