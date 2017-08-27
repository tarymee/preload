# preload.js

preload.js是一个图片预加载插件。


## 快速使用
使用之前必须先引用这个脚本 然后

```javascript
new Preload(array, config)
```

+ array：要预加载的图片数组，不可为空
+ config：配置对象【config可以为空 为空的话使用默认值】

```javascript
new Preload(['demo.jpg'], {
    handleFileLoad: function(img, para) {
        console.log('图像加载成功:' + img.src)
        console.log('图像加载进度:' + para.progress)
        console.log('图像加载进度百分比:' + para.percent)
        document.body.appendChild(img)
    },
    handleComplete: function(img, para) {
        console.log('所有图像加载完成')
        console.log('图像总数量:' + para.total)
        console.log('图像错误数量:' + para.errored)
        console.log('图像加载数量:' + para.loaded)
    },
    handleError: function(img, para) {
        console.log('图像错误:' + img.src)
    }
})
```


**[【DEMO】](index.html)**

## API

### 自定义配置config
参数 | 说明 | 默认值
--- | --- | ---
handleFileLoad | 每张图片加载完之后执行函数 | function(img, para){}
handleComplete | 所有图片加载完之后执行函数 | function(img, para){}
handleError | 图片加载出错之后执行函数 | function(img, para){}

以上三个函数均提供img和para参数
+ img 加载某张图片的图片信息
+ para 加载图片数组的整体进度信息

以下是para对象的内容

参数 | 说明 | 数据类型 | 默认值
--- | --- | --- | ---
total | 需要预加载的图片数量 | number | array.length
loaded | 已经加载完成的图片数量 | number | 0
errored | 加载出错的图片数量 | number | 0
progress | 预加载的图片进度 | number | 0
percent | 预加载的图片进度百分比 | string | 0%




