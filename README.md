Likedown示例文档
===============

**Likedown** 是参考了 [pagedown][1] 与 [stackedit][2] 的部分代码修改而来的 [markdown][3] 编辑器，其中图标则是用了 [segmentfault][4] 的编辑器图标。

![enter image description here][5]

基本的 Markdown 语法
-------------------
这是**粗体字**，这是*斜体字*，还可以加[链接][6]，图片就在下面再演示吧。
插一根横线吧。

----------

#### h1-h6字体

由于h1-h6会出现在目录中，这里只是把用法展示一下，效果就不说了。

```
# h1号字体
## h2号字体
### h3号字体
#### h4号字体
##### h5号字体
###### h6号字体
```

#### 有序列表

  1. 有序列表项 - 1
  2. 有序列表项 - 2
  3. 有序列表项 - 3

#### 无序列表

  - 无序列表项 - 1
  - 无序列表项 - 2
  - 无序列表项 - 3

> 注意：这一块是引用，或者说 **blockquote** 吧，反正如果你喜欢的话，就用吧

轮到代码块了，如 python 代码：

```python
# coding: utf-8
import os

def test():
    pass

def main():
    test()

if __name__ == '__main__':
    main()
```

Markdown 扩展语法
----------------

#### 下面演示一下表格

Item     | Value
-------- | ---
Computer | $1600
Phone    | $12
Pipe     | $1

#### 对齐的表格

| Item     | Value | Qty   |
| :------- | ----: | :---: |
| Computer | $1600 |  5    |
| Phone    | $12   |  12   |
| Pipe     | $1    |  234  |

#### 缩进列表

Term 1
Term 2
:   Definition A
:   Definition B

Term 3
:   Definition C
:   Definition D

#### 页脚标注

比如说需要页脚标注的时候，可以点一下[^footnote].
[^footnote]: 这个就是用于描述的 **页脚标注**.

#### 文档目录

想在文档中插入目录时，可以使用`[TOC]`:

[TOC]
 
#### 公式

不要问我这是什么公式啊, 我书读的少: $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$

$$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$

#### UML 图

```sequence
张三->李四: 欠我5毛钱什么时候还？
Note right of 李四: 有钱我也不还你
李四-->张三: 我没钱，宽限几天吧！
```

#### 流程图

```flow
st=>start: 开始
e=>end
op=>operation: 操作
cond=>condition: 是否成功?

st->op->cond
cond(yes)->e
cond(no)->op
```


  [1]: https://github.com/ujifgc/pagedown
  [2]: https://github.com/benweet/stackedit
  [3]: http://www.appinn.com/markdown/
  [4]: http://segmentfault.com/
  [5]: http://static.segmentfault.com/build/global/img/editor/editor@2x.png
  [6]: http://www.chiki.org/