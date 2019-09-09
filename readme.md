## 本地运行

[![Greenkeeper badge](https://badges.greenkeeper.io/zanjs/lbs-map.svg)](https://greenkeeper.io/)


```
composer install

npm install

php artisan key:generate

```

### 数据库设置

mysql：修改.env文件的数据库配置

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=map
DB_USERNAME=root
DB_PASSWORD=

```

sqlite：修改config/database.php，使用sqlite

```
'default' => env('DB_CONNECTION', 'sqlite')

// 创建database.sqlite文件
touch database/database.sqlite

```


### 运行

```
// 创建数据库，填充数据
php artisan migrate
php artisan db:seed

// 后台服务
npm run web

// 前台测试
npm run dev

// 代码生成到publick/admin目录
npm run build

```
