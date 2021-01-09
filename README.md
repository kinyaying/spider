## 网页爬虫

## 命令行

启动

```
npm start
```

## 功能

爬取[网易财经](http://quotes.money.163.com/f10/zycwzb_600519.html) 网页中，茅台酒的**净利润(扣除非经常性损益后)(万元)**，并保存到 xls 表格中。

实现原理：

1. axios 获取http://quotes.money.163.com/f10/zycwzb_600519.html 内容
2. 返回内容是服务端渲染，数据和 dom 结构混合在一起，使用 cheerio 获取数据报告表格的 dom 片段
3. 使用正则解析 dom 片段，过滤出有用数据
4. 使用 node-xlsx 将数据写入 xls 文件

## 库

- nest 脚手架
- axios 发送 ajax 请求
- cheerio 类似 jquery，能够解析字符串形式的 dom
- node-xlsx 读写 xls 文件

## 收获

1. 编写正则的能力有所提升
2. 使用 nest.js 编写代码
