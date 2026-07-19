# Notion文章示例
> 迁移自：[Notion文章示例](https://docs.tangly1024.com/article/example-1)
> 发布日期：2021-11-5
> 最后编辑：2024-10-28
> 原栏目：✒ Notion教程
> 标签：Notion、NotionNext
> 摘要：这是示例的文章摘要，摘要内容可被用做搜索，预览。文章列表默认展示概要；若要在列表直接展示文章内容，可在blog.config.js中配置。

## 基本段落

> 书中自有黄金屋，书中自有颜如玉

::: tip 提示
生活的意义并不是与他人争高下，而在于享受努力实现目标的过程，结果只是对自己行动的嘉奖。
:::


### **将进酒**

李白〔唐代〕

君不见黄河之水天上来，奔流到海不复回。
君不见高堂明镜悲白发，朝如青丝暮成雪。
人生得意须尽欢，莫使金樽空对月。
天生我材必有用，千金散尽还复来。
烹羊宰牛且为乐，会须一饮三百杯。
岑夫子，丹丘生，将进酒，杯莫停。
与君歌一曲，请君为我倾耳听。
钟鼓馔玉不足贵，但愿长醉不愿醒。
古来圣贤皆寂寞，惟有饮者留其名。
陈王昔时宴平乐，斗酒十千恣欢谑。
主人何为言少钱，径须沽取对君酌。
五花马、千金裘，呼儿将出换美酒，与尔同销万古愁。

[TANGLY's BLOG | 记录思考、分享我的学习笔记](/user-guide/intro)

记录思考、分享我的学习笔记


## 特殊段落


### 1.代码

```Bash
# Bash 安装zsh
$ sudo apt install zsh

# 配置ohmyzsh
$ sh -c "$(curl -fsSL &lt;https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh&gt;)"

# 配置ohmyzsh插件
# zsh-autosuggestions
$ git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions

# zsh-syntax-highlighting
$ git clone &lt;https://github.com/zsh-users/zsh-syntax-highlighting.git&gt; ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

// 启用插件
$ vim .zshrc
plugins=(git z zsh-autosuggestions zsh-syntax-highlighting)
```

<details>
<summary>其他更多语言</summary>

```Bash
ps -ef | grep java | awk '{print $2}' | xargs kill -9
```
```Java
@Test
public void test11() {

  long start = System.currentTimeMillis();
  int a = 0;
  for(int i=0;i&lt;1000000000;i++){
      try {
          a++;
      }catch (Exception e){
          e.printStackTrace();
      }
  }
  long useTime = System.currentTimeMillis()-start;
  System.out.println("useTime:"+useTime);
}
```
```Python
#!/usr/bin/python3
import json

# Python 字典类型转换为 JSON 对象
data = {
    'no' : 1,
    'name' : 'hello',
    'url' : '/user-guide/intro'
}

json_str = json.dumps(data)
print ("Python 原始数据：", repr(data))
print ("JSON 对象：", json_str)
```
```R
# R 语言
#file.edit(path.expand(file.path("~", ".Renviron")))
library(telegram.bot)
library(stringr)
# Initiate the bot session using the token from the enviroment variable.
bot = Bot(token = bot_token('your_bot'))
usr_list &lt;- c(12344566, 12345566)
```
```CSS
html {
	background-color: red;
}
```
```cpp
#include &lt;iostream&gt;
using namespace std;

// main() 是程序开始执行的地方

int main()
{
   cout &lt;&lt; "Hello World"; // 输出 Hello World
   return 0;
}
```
```csharp
using System;
namespace HelloWorldApplication
{
   class HelloWorld
   {
      static void Main(string[] args)
      {
         Console.WriteLine("Hello World");
         Console.ReadKey();
      }
   }
}
```
```asm6502
.section __TEXT,__text,regular,pure_instructions
.macosx_version_min 10, 13
.globl _add_a_b
.p2align 4, 0x90
_add_a_b: ## @add_a_b
.cfi_startproc

## BB#0:
pushq %rbp
Lcfi0:
.cfi_def_cfa_offset 16
Lcfi1:
.cfi_offset %rbp, -16
movq %rsp, %rbp
Lcfi2:
.cfi_def_cfa_register %rbp
movl %edi, -4(%rbp)
movl %esi, -8(%rbp)
movl -4(%rbp), %esi
addl -8(%rbp), %esi
movl %esi, %eax
popq %rbp
retq
.cfi_endproc

.globl _main
.p2align 4, 0x90
_main: ## @main
.cfi_startproc

## BB#0:
pushq %rbp
Lcfi3:
.cfi_def_cfa_offset 16
Lcfi4:
.cfi_offset %rbp, -16
movq %rsp, %rbp
Lcfi5:
.cfi_def_cfa_register %rbp
subq $16, %rsp
movl $1, %edi
movl $2, %esi
movl $0, -4(%rbp)
callq _add_a_b
addq $16, %rsp
popq %rbp
retq
.cfi_endproc
```

</details>


### 2.公式

- 数学公式
f\left(\left[\frac{1+\{x, y\}}{\left(\frac{x}{y}+\frac{y}{x}\right)(u+1)}+a\right]^{3 / 2}\right)\tag{行标}

- 化学方程
⁍

<details>
<summary>其他更多公式</summary>

\begin{aligned}
AACD \Rightarrow AAAD &= \frac 1 3\\
AACD \Rightarrow AACD &= \frac 1 3 + \frac 1 6 = \frac 1 2  \\
AACD \Rightarrow AACC &= \frac 1 6 \end{aligned}
\begin{bmatrix}
		c_{0}&c_{n-1}&c_{n-2}&\cdots &c_{1}\\
		c_{1}&c_{0}&c_{n-1} &  \cdots &c_{2}\\
		c_{2}&c_{1}&c_{0}&\cdots  &c_3 \\
		\vdots &\vdots& \vdots&\ddots &\vdots \\
		c_{n-1}&c_{n-2}&c_{n-3}&\dots &c_{0}
\end{bmatrix}
\begin{aligned} \sin 2\theta & = 2\sin \theta \cos \theta \\ & = \cfrac{2 \tan \theta}{1+\tan^2 \theta} \end{aligned}
AACD\Rightarrow \left\{\begin{matrix}
第1次取值 & 第2次取值 & 概率 & 最终状态\\
A & C,D &= \frac 1 2 \times \frac 2 3= \frac 1 3 &\Rightarrow AAAD \\
A & A &= \frac 1 2 \times \frac 1 3= \frac 1 6 &\Rightarrow AACD \\
C,D & A &= 2 \times \frac 1 4 \times \frac 2 3= \frac 1 3 &\Rightarrow CCAD \\
C,D & C,D &= 2 \times \frac 1 4 \times \frac 1 3= \frac 1 6 &\Rightarrow CCAA
\end{matrix}\right.

</details>


### 3. 图表

```Mermaid
graph LR;
公司架构--&gt;商务
公司架构--&gt;研发
公司架构--&gt;设计
公司架构--&gt;运营
公司架构--&gt;产品
```


### 4. PDF嵌入

tailwindcss.pdf


### 5.下载附件

下载PDF附件.pdf


### 6. 照片集


### 7. 内嵌网页

/user-guide/intro

### Notion HTML Block

Notion 2026 年新增的 HTML Block 可以在 Notion 中通过 Notion AI 生成交互式小工具，也可以上传 `.html` 文件。NotionNext 会将这种 `html_artifact` 以 sandbox iframe 渲染，适合房贷计算器、ROI 计算器、互动表单、轻量图表等只依赖前端 HTML/CSS/JavaScript 的内容。

使用建议：

- 在 Notion 页面中插入 HTML Block，使用 Notion AI 生成，或上传一个 `.html` 文件。
- HTML Block 会被隔离在 iframe 中运行，不会直接注入站点正文 DOM。
- 适合无后端的小工具；需要数据库、登录态、支付等能力时，仍应做成独立应用后再用普通 Embed 嵌入。
- 为避免页面数据过大，单个 HTML artifact 建议控制在 512KB 以内。


### 5.代办

家庭
洗衣
做饭
事业
开会
加班


### 6.折叠列表

<details>
<summary>点击展开</summary>

<details>
<summary>点击展开</summary>

<details>
<summary>点击展开</summary>

内容可以多级嵌套

</details>

</details>

</details>

---


### 8. 同步块

Notion支持将不同页面的块进行同步，即 SyncBlock，以下是来自另一个页面的块：

::: tip 提示
注意 ： 同步块的使用条件是源页面也要被**开放共享** ，否则NotionNext将无权访问，页面上会被忽略渲染。

![Untitled](/legacy/0583aa5143d9cb20.png)
:::


## 多级目录

heading标题在博客中自动转为目录


### 二级目录1
二级内容 1

### 二级目录2
二级内容2


### 二级目录3


#### 三级目录3.1
不同级别的heading代表不同级别的目录

#### 三级目录3.2
高一级目录嵌套低一级目录


### 多级列表

- 事物的必然性

1. 事物按规律变化，也有一种不可避免的性质．这种性质就叫做**必然性**
  1. 事物的必然性，是事物本身的性质（我们反对宿命论的是其认为这一切是受神明的支配，而不是反对事物发展中存在的不可避免的性质的事实）
    1. 第三级别列表
    1. 第三级别列表
  1. 其决定于它自己本身发展的情况和周围的条件
    1. 第三级别列表
      1. 第三级别列表


## 模板使用说明

若要部署你的NotionNext项目，请复制该模板，并按照模板格式创建文章：

[NOTION BLOG](https://tanghh.notion.site/02ab3b8678004aa69e9e415905ef32a5?v=b7eb215720224ca5827bfaa5ef82cf2d)

演示站点描述

Notion页面中，每篇文章都将有以下属性🤔：


## 评论插件

系统支持 Waline\Giscus\Valine\GitTalk\Utterance\Cusdis\Twikoo六种评论插件，并且可以同时开启，点击评论区的Tab来体验。

按照以下教程可以开启相应的评论插件

[评论插件说明 | NotionNext帮助手册](/user-guide/comments/overview)

NotionNext-快速免费建站

[Twikoo | NotionNext帮助手册](/user-guide/comments/twikoo)

NotionNext现在支持 Twikoo啦，很好用的评论 插件

[Waline | NotionNext帮助手册](/user-guide/comments/waline)

NotionNext-快速免费建站

测试嵌入PDF.pdf

## 原文链接

https://docs.tangly1024.com/article/example-1
