# iVlog --- 用视频记录生活

[项目github仓库](https://github.com/doubleZ0108/iVlog)

# Table of Contents

- [iVlog --- 用视频记录生活](#ivlog-----用视频记录生活)
  - [1. 项目简介](#1-项目简介)
  - [2. 功能简介](#2-功能简介)
  - [3. 小组成员](#3-小组成员)
  - [4. 开发环境配置](#4-开发环境配置)
    - [4.1 Oracle 12c安装配置](#41-oracle-12c安装配置)
      - [4.1.1 .配置安全更新](#411-配置安全更新)
      - [4.1.2 安装选项](#412-安装选项)
      - [4.1.3 选择系统类](#413-选择系统类)
      - [4.1.4 选择Oracle主目录用户](#414-选择oracle主目录用户)
      - [4.1.5 目录选择、版本](#415-目录选择版本)
      - [4.1.6 先决条件检查](#416-先决条件检查)
      - [4.1.7 概要信息](#417-概要信息)
      - [4.1.8 安装数据库软件](#418-安装数据库软件)
    - [4.2 ADO.NET Entity Framework模型导入](#42-adonet-entity-framework模型导入)
    - [4.3 ASP.NET MVC项目配置](#43-aspnet-mvc项目配置)
    - [4.4 IIS Services部署](#44-iis-services部署)
      - [4.4.1 租用服务器](#441-租用服务器)
      - [4.4.2 安装与配置](#442-安装与配置)
      - [4.4.3 项目demo](#443-项目demo)
      - [4.4.4 发布到IIS](#444-发布到iis)
      - [4.4.5 远程访问](#445-远程访问)
  - [5. 核心功能具体实现](#5-核心功能具体实现)
    - [5.1 文件上传](#51-文件上传)
      - [5.1.1 HTML表单](#511-html表单)
      - [5.1.2 点击上传文件，调用UploadSubmitClick()函数](#512-点击上传文件调用uploadsubmitclick函数)
      - [5.1.3 保存视频文件，将视频信息保存到数据库](#513-保存视频文件将视频信息保存到数据库)
      - [5.1.3 效果展示](#513-效果展示)
        - [上传视频](#上传视频)
        - [上传成功](#上传成功)
        - [保存到文件夹中](#保存到文件夹中)
        - [保存到数据库中](#保存到数据库中)
  - [6. 功能截屏展示](#6-功能截屏展示)
    - [6.1 Account](#61-account)
      - [6.1.1 Account/Index -&gt; 登陆界面](#611-accountindex---登陆界面)
      - [6.1.2 Account/Register -&gt;注册界面](#612-accountregister--注册界面)
    - [6.2 Main](#62-main)
      - [6.2.1 Main/Index -&gt; 首页](#621-mainindex---首页)
        - [分区](#分区)
        - [排行榜](#排行榜)
        - [拖动调整分区顺序](#拖动调整分区顺序)
      - [6.2.2 Main/Search -&gt; 搜索界面](#622-mainsearch---搜索界面)
      - [6.2.3 Main/Upload -&gt; 投稿界面](#623-mainupload---投稿界面)
    - [6.3 Video](#63-video)
      - [6.3.1 Video/Index -&gt; 视频播放界面](#631-videoindex---视频播放界面)
        - [评论](#评论)
    - [6.4 User](#64-user)
      - [6.4.1 User/Index -&gt; 个人主页（我的动态）](#641-userindex---个人主页我的动态)
      - [6.4.2 User/Attention -&gt; 个人主页（我的关注）](#642-userattention---个人主页我的关注)
      - [6.4.3 User/History -&gt; 个人主页（浏览历史）](#643-userhistory---个人主页浏览历史)
      - [6.4.4 User/Favorite -&gt; 个人主页（我的收藏）](#644-userfavorite---个人主页我的收藏)
      - [6.4.5 User/Message -&gt; 个人主页（我的消息）](#645-usermessage---个人主页我的消息)
      - [6.5.6 User/Setting -&gt; 个人主页（个人信息设置）](#656-usersetting---个人主页个人信息设置)
    - [6.5 myError](#65-myerror)
      - [6.5.1 myError/Error403 -&gt; 403错误页面](#651-myerrorerror403---403错误页面)
      - [6.5.2 myError/Error404 -&gt; 404错误页面](#652-myerrorerror404---404错误页面)
      - [6.5.3 myError/Error500 -&gt; 500错误页面](#653-myerrorerror500---500错误页面)
  - [7. 项目结构](#7-项目结构)



## 1. 项目简介

当今时代是一个网络高速发展，新娱乐媒体不断进化的时代。越来越多的人愿意再网络上分享自己的生活，展示自己的个性；同时，还有更多的人乐于从各种渠道发现获取自己感兴趣的视频内容，追随自己喜欢的视频播主。所以，我们希望能有这样一个平台，能够让所有人在上面展示自己的视频作品，获得观众们的喝彩；也能让所有去接触自己喜爱的视频创作者。所以iVlog就应运而生了。

“iVlog“-vlog分享平台顺应互联网时代的发展潮流，同时为人们提供了一个优秀的社交平台。





## 2. 功能简介

iVlog是一个专注于让用户分享生活，分享兴趣的视频网站。我们支持用户通过上传视频，观看他人视频，评论视频的方式来与其他用户互动。此外，关注功能使用户能够在自己的个人主页“我的关注”一栏快捷地看到最近上传视频的被关注者；点赞功能使用户可以为自己所喜爱的视频进行点赞；我的消息功能可以使用户查看收到的“点赞”，“关注”，“举报”，“评论”消息；我的收藏功能可以使用户管理自己收藏过的视频。

为了保护用户的隐私，用户必须注册账号并登陆后才可浏览网站中的内容，其他用户在访问单个用户的个人主页时无法查看其收藏夹和浏览历史中的内容，用户也可以根据自己的需要在个人主页中修改自己信息。

为了方便网站的运营人员管理系统，我们为管理员设置了特殊的个人主页，管理员可以审核视频或者用户后在自己的个人主页中删除视频或者删除用户。



















## 3. 小组成员

| 姓名                            | 学号    | 贡献度 |
| ------------------------------- | ------- | ------ |
| 张   喆<sup>[Team Leader]</sup> | 1754060 | 100%   |
| 许靖宁                          | 1751714 | 100%   |
| 李博阳                          | 1752792 | 100%   |
| 李雨龙                          | 1750160 | 100%   |
| 吕雪飞                          | 1752289 | 100%   |
| 杨   乐                         | 1751894 | 100%   |
| 叶一凡                          | 1752580 | 100%   |
| 刘一默                          | 1752339 | 100%   |
| 卜   滴                         | 1753414 | 100%   |
| 陈开昕                          | 1753188 | 100%   |



**指导老师:** 袁时金老师

**数据库课程设计上课时间:** 2019/07/08 ~ 2019/07/12

**联系方式:**  [doubleZ0108@gmail.com](mailto:doubleZ0108@gmail.com)





























## 4. 开发环境配置

### 4.1 Oracle 12c安装配置

先安装`Oracle 12C`数据库，然后下载安装`Oracle Developer Tool for 2017`，进入`Visual Studio 2017`连接数据库。

#### 4.1.1 .配置安全更新

![1.png](https://upload-images.jianshu.io/upload_images/12014150-986bbd6091e10094.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 4.1.2 安装选项

![2.png](https://upload-images.jianshu.io/upload_images/12014150-c80b9b4228eca94d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 4.1.3 选择系统类

![3.png](https://upload-images.jianshu.io/upload_images/12014150-85a083126c60daf6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 4.1.4 选择Oracle主目录用户

图为发行版2，在发行版1无“虚拟”选项于是选了“使用内置账户”

![4.png](https://upload-images.jianshu.io/upload_images/12014150-a8ca470b365c4a4b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 4.1.5 目录选择、版本

（口令要记好Ab123456？）

![5.jpg](https://upload-images.jianshu.io/upload_images/12014150-99045aaa86887876.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

附：[Oracle(12c)三版本标准版、企业版、易捷版对比](https://wenku.baidu.com/view/b6b36b2677232f60dccca157.html)

#### 4.1.6 先决条件检查

![6.jpg](https://upload-images.jianshu.io/upload_images/12014150-241cab0ad7832ac8.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 4.1.7 概要信息

![7.jpg](https://upload-images.jianshu.io/upload_images/12014150-2f22cfac13f6aaa7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 4.1.8 安装数据库软件

![8.jpg](https://upload-images.jianshu.io/upload_images/12014150-f787794e10b6d596.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 在工具中选择“连接到数据库”，进入以下界面，选择Oracle Database: ODP.NET，并确定

  ![9.png](https://upload-images.jianshu.io/upload_images/12014150-c54755b3af267ff5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 进入以下界面，用户名输入SYSTEM，再输入密码，点击测试连接，显示连接成功后点击确定便能连接成功

  ![10.png](https://upload-images.jianshu.io/upload_images/12014150-dbd685a59a66e115.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 4.2 ADO.NET Entity Framework模型导入

1. 打开**Visual Studio**，点击**文件**，**新建**项目，新建一个**ASP.NET Web 应用程序（.NET Framework)**的项目。

   ![1562938736204.png](https://upload-images.jianshu.io/upload_images/12014150-f77cf723d2c45500.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. 选择模板为**MVC**。

   ![1562938970328.png](https://upload-images.jianshu.io/upload_images/12014150-5f42bae119f5687f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3. 单击**工具**->**NuGet包管理器**->**管理解决方案的NuGet程序包**

   ![1562939138548.png](https://upload-images.jianshu.io/upload_images/12014150-6ec90b14ae7a1591.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

4. 安装6.2.0版本的**EntityFramework**以及**EntityFramework.zh-Hans**, 安装与自己的**ODT**版本一致的**Oracle.ManagedDataAccess**和**Oracle.ManagedDataAccess.EntityFramework**。

   ![1562940008103.png](https://upload-images.jianshu.io/upload_images/12014150-1476733940ac5bdd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

   ![1562940032050.png](https://upload-images.jianshu.io/upload_images/12014150-9ce9971bba34a1ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

5. 右击解决方案中的**Models**文件夹，**添加**->**新建项**

   ![1562940100172.png](https://upload-images.jianshu.io/upload_images/12014150-62cf292e44cbaf2f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

6. 选择**ADO.NET 实体数据模型**，**添加**

   ![1562940248667.png](https://upload-images.jianshu.io/upload_images/12014150-ef94c88a2d171709.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

7. 选择**来自数据库的EF设计器**，点击**下一步**

   ![1562940325798.png](https://upload-images.jianshu.io/upload_images/12014150-38559eed1ea6bf09.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

8. 点击**新建**连接，如图建立数据库连接，点击**确定**。

   ![1562940397674.png](https://upload-images.jianshu.io/upload_images/12014150-66da8ade9a73c2bc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

9. 如图，选择**是，在连接字符串中包含敏感数据**，点击**下一步**。

   ![1562940497802.png](https://upload-images.jianshu.io/upload_images/12014150-5663ebb7644062d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

10. 之后默认为**实体框架6.x**。

11. 点击**表**->**SYSTEM**,添加数据库中的表，分别为

    | 表名              |
    | ----------------- |
    | COMMENTS          |
    | FAVORITE          |
    | GET_MESSAGE       |
    | HAS_COMMENT       |
    | HAS_FAVORITES     |
    | HAS_TAG           |
    | HAS_VIDEO         |
    | HAS_ZONE          |
    | LIKES             |
    | MESSAGE_LIBRARY   |
    | RANKING           |
    | SEND_COMMENT      |
    | SEND_MESSAGE      |
    | SORT_VIDEO        |
    | TAG               |
    | UPLOAD_VIDEO      |
    | USERS             |
    | USER_RELATIONSHIP |
    | VIDEOS            |
    | VISIT             |
    | ZONE              |

    *<u>此处应注意，选择时耐心等待响应，否则会出现程序未响应情况。</u>*

12. 点击**完成**，就可将**ADO.NET实体数据模型**导入数据库。

### 4.3 ASP.NET MVC项目配置

1. 打开Visua Studio(Visual Studio Community 2017  15.9.10)，文件->新建->项目，选择`ASP.NET Web`应用程序，点击确定。

![新建ASP.NET Web应用程序.png](https://upload-images.jianshu.io/upload_images/12014150-ba7f5c56d4185ca9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. 选择`MVC模板`，点击确定。

![选择MVC模板.png](https://upload-images.jianshu.io/upload_images/12014150-bcc659940597babc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3. 创建成功

![创建成功-1562937656389.png](https://upload-images.jianshu.io/upload_images/12014150-694256d412999faa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 4.4 IIS Services部署

#### 4.4.1 租用服务器

为了搭建网站，首先我们需要一个服务器，出于性价比的考虑，我们最终选择了租用阿里云的轻量应用服务器。

![1.png](https://upload-images.jianshu.io/upload_images/12014150-004a485c8ddf6b9b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

<u>可以看到我们服务器的ip为`47.101.205.252`</u>

#### 4.4.2 安装与配置

- 为了将网站部署到IIS上，首先我们需要配置相关的服务。![2.png](https://upload-images.jianshu.io/upload_images/12014150-3f86aa35d514964b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)![3.png](https://upload-images.jianshu.io/upload_images/12014150-327b8207b7a0005a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 在服务器管理器中，进行“添加角色和功能”的操作

  ![4.png](https://upload-images.jianshu.io/upload_images/12014150-276280fea0ab9feb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 在IIS管理器的应用程序池中设置“Default Web Site”的版本

  ![5.png](https://upload-images.jianshu.io/upload_images/12014150-e4f9ab475668a3b4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 4.4.3 项目demo

- 在VS新建一个 ASP.NET MVC项目

  ![6.png](https://upload-images.jianshu.io/upload_images/12014150-2a2cb8c800e4e608.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 安装NuGET包EntityFramework、EntityFramework.zh-Hans、Oracle.managedDataAccess.EntityFramework的相应版本

  ![7.png](https://upload-images.jianshu.io/upload_images/12014150-71bb97925a9bab6f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  ![8.png](https://upload-images.jianshu.io/upload_images/12014150-adbcf06027558b93.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 将数据库中的表添加到项目的Models中

  ![9.png](https://upload-images.jianshu.io/upload_images/12014150-b72111103e0a321a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 此处仅添加USERS表进行测试

  ![10.png](https://upload-images.jianshu.io/upload_images/12014150-aa3863262d532b51.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 在Controllers中添加基架项目

  ![11.png](https://upload-images.jianshu.io/upload_images/12014150-9c41821f9c38619c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 重新生成项目，然后进行发布

#### 4.4.4 发布到IIS

- 选择“IIS、FTP等”，并选择“创建配置文件”

  ![12.png](https://upload-images.jianshu.io/upload_images/12014150-5cf17d11b0ccc2f1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 进行相关配置

  ![13.png](https://upload-images.jianshu.io/upload_images/12014150-ca69818f3342311e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 进行发布

  ![14.png](https://upload-images.jianshu.io/upload_images/12014150-5a80a6445ea4aa97.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 4.4.5 远程访问

- 访问项目发布url `47.101.205.252/demo`, 跳转到自动生成的主页

  ![15.png](https://upload-images.jianshu.io/upload_images/12014150-2d32daa5ddb02173.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 访问url `47.101.205.252/demo/users`

  ![16.png](https://upload-images.jianshu.io/upload_images/12014150-8708ed90c6b9db6e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 可以点击`Create New`来插入数据

  ![17.png](https://upload-images.jianshu.io/upload_images/12014150-4e1d185893b0b1c0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  ![18.png](https://upload-images.jianshu.io/upload_images/12014150-ab85644e9eb5f5d4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 可以看到数据已经被插入到数据库中（user_id通过触发器和队列自增分配所以和输入不同）

  ![19.png](https://upload-images.jianshu.io/upload_images/12014150-15ed5f8301ebf55b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



## 5. 核心功能具体实现

### 5.1 文件上传

#### 5.1.1 HTML表单

```html
<form id="upload_info_form" class="el-form clearfix" action="/Main/Upload" method="post" enctype="multipart/form-data"
    style="background-image:url(../../img/upload/vertical-bg.png);background-repeat:no-repeat;background-size:cover;">
    <div class="main" style="background-color:rgba(255,255,255,.7);">
        <div data-v-1fd51a84="" id="app" class="canary-container">
            <div data-v-6ec1eb48="" class="upload-v2-container">
                <div class="upload-v2-step2-container" style="">

                    <div class="file-list-v2-container">
                        <!--文件上传-->
                        <div data-v-30e71375="" class="file-title">
                            <h1 data-v-30e71375="">文件上传</h1>
                            <p data-v-30e71375="">（推荐采用mp4、flv格式，可有效缩短审核转码耗时）</p>
                        </div>
                        <div data-v-989a575e="" class="file-list-v2-wrp">
                            <div data-v-989a575e="">
                                <div data-v-989a575e="" class="file-list-v2-item">
                                    <div data-v-989a575e="" class="file-list-v2-item-icon">
                                        <span data-v-989a575e=""></span>
                                    </div>
                                    <div data-v-989a575e="" class="file-list-v2-item-wrp">
                                        <div data-v-989a575e="" class="item-status-wrp">
                                            <p data-v-989a575e="" class="item-title">视频上传</p>
                                        </div>
                                        <div data-v-989a575e="" class="item-upload-info">
                                            <span id="upload-state" data-v-989a575e=""
                                                class="upload-status-intro">等待上传</span>
                                        </div>
                                        <div data-v-989a575e="" class="item-upload-progress" id="progress_line">
                                            <div data-v-989a575e="" class="item-upload-progress-complete"
                                                style="width: 100%;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--添加视频按钮-->
                        <input id="video-upload_input" type="file" onchange="video_previewFile()"
                            name="video_upload_name" accept=".mp4, .flv">
                        <video id="video-upload" src="" width="600"></video>

                        <div data-v-30e71375="" class="dividing-line"></div>
                    </div>

                    <div class="file-content-v2-container">
                        <div class="normal-v2-container">
                            <!--基本信息-->
                            <div data-v-640a3622="" class="normal-title-wrp">
                                <h1 data-v-640a3622="">基本信息</h1>
                            </div>
                            <!--上传封面-->
                            <div data-v-5f41e6e1="" data-v-640a3622="" class="cover-v2-container">
                                <div data-v-704ae438="" data-v-5f41e6e1="" class="section-title-v2-container">
                                    <h3 data-v-704ae438="" class="section-title-v2-content-main">视频封面设置</h3>
                                    <p data-v-704ae438="" class="section-title-v2-content-sub">
                                        （格式jpeg、png，文件大小≤5MB，建议尺寸≥1146*717，最低尺寸≥960*600）
                                    </p>
                                </div>
                                <div data-v-5f41e6e1="" class="cover-v2-detail-wrp">
                                    <div data-v-5f41e6e1="" class="cover-v2-preview">
                                        <input id="img_upload_input" type="file" onchange="previewFile()"
                                            name="cover_upload_name" accept=".jpg, .jpeg, .png"><br>
                                        <img id="cover" src="../../img/upload/bilibili.png" width="300"
                                            alt="Image preview..." />
                                        <!--
                                            <div data-v-5f41e6e1="" class="cover-v2-preview-show">
                                                <img data-v-5f41e6e1="" src="../../img/upload/img1.jpg" alt="cover-preview-show"
                                                     class="cover-preview-show">
                                                <span data-v-5f41e6e1="" class="cover-v2-upload-show-tip">上传封面</span>
                                            </div>
                                            <input data-v-5f41e6e1="" type="file" accept="image/jpeg, image/jpg, image/png"></div>
                                            -->
                                    </div>
                                </div>
                                <div class="ui-v2-normal-line-white-divide"></div>
                                <div data-v-da25fc02="" data-v-640a3622="" class="copyright-v2-container">
                                    <!--隐私-->
                                    <div data-v-704ae438="" data-v-da25fc02="" class="section-title-v2-container">
                                        <p data-v-704ae438="" class="section-title-v2-deg">*</p>
                                        <h3 data-v-704ae438="" class="section-title-v2-content-main">隐私</h3>
                                    </div>

                                    <!--所有人、自己可见-->
                                    <div data-v-da25fc02="" class="copyright-v2-check-radio-wrp">
                                        <form>
                                            <input type="radio" name="privacy" value="all" /> 所有人可见
                                            <input type="radio" name="privacy" value="only" /> 仅自己可见
                                        </form>
                                    </div>
                                </div>
                                <div class="ui-v2-normal-line-white-divide"></div>

                                <div data-v-c90917e2="" data-v-640a3622="" id="type-list-v2-container"
                                    class="type-list-v2-container">
                                    <!--分区-->
                                    <div data-v-704ae438="" data-v-c90917e2="" class="section-title-v2-container">
                                        <p data-v-704ae438="" class="section-title-v2-deg">*</p>
                                        <h3 data-v-704ae438="" class="section-title-v2-content-main">分区</h3>
                                        <!---->
                                        <!---->
                                        <!---->
                                    </div>
                                    <!--选择分区-->
                                    <div class="div-select">
                                        <select id="section" data-v-c90917e3="" name="zone_name">
                                            <option value="" disabled selected hidden style="color: #99a2aa">点击选择
                                            </option>
                                            <option value="game">中医</option>
                                            <option value="life">古琴</option>
                                            <option value="fun">数据库</option>
                                            <option value="video">其它</option>
                                        </select>
                                    </div>

                                    <div class="ui-v2-normal-line-white-divide"></div>
                                    <!--标题-->
                                    <div data-v-b3b70444="" data-v-640a3622="" class="content-title-v2-container">
                                        <div data-v-704ae438="" data-v-b3b70444="" class="section-title-v2-container">
                                            <p data-v-704ae438="" class="section-title-v2-deg">*</p>
                                            <h3 data-v-704ae438="" class="section-title-v2-content-main">标题</h3>
                                        </div>
                                        <div data-v-b3b70444="" class="content-title-v2-input-wrp">
                                            <div data-v-4550f808="" data-v-b3b70444="" class="input-box-v2-1-container">
                                                <div data-v-4550f808="" class="input-box-v2-1-instance">
                                                    <input id="title" data-v-4550f808="" type="text" maxlength="80"
                                                        placeholder="请输入稿件标题" name="title_name"
                                                        class="input-box-v2-1-val">
                                                </div>
                                                <p data-v-4550f808="" class="input-box-v2-1-max-tip">80字以内</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="ui-v2-normal-line-white-divide"></div>

                                    <!--标签-->
                                    <div data-v-063bec8e="" data-v-640a3622="" id="content-tag-v2-container"
                                        class="content-tag-v2-container">
                                        <div data-v-704ae438="" data-v-063bec8e="" class="section-title-v2-container">
                                            <p data-v-704ae438="" class="section-title-v2-deg">*</p>
                                            <h3 data-v-704ae438="" class="section-title-v2-content-main">标签</h3>
                                            <p data-v-704ae438="" class="section-title-v2-content-sub">
                                                （为视频的相关内容添加标签）
                                            </p>
                                            <!---->
                                            <!---->
                                        </div>

                                        <div data-v-063bec8e="" class="content-tag-v2-input-wrp">
                                            <div data-v-4550f808="" data-v-063bec8e="" class="input-box-v2-1-container">
                                                <div data-v-063bec8e="" data-v-4550f808=""
                                                    class="content-tag-v2-pre-wrp"></div>
                                                <div data-v-4550f808="" class="input-box-v2-1-instance">
                                                    <input id="tag" data-v-4550f808="" type="text" maxlength="20"
                                                        placeholder="请输入相关标签" name="tag_name"
                                                        class="input-box-v2-1-val">
                                                </div>
                                                <p data-v-063bec8e="" data-v-4550f808=""
                                                    class="content-tag-v2-last-wrp">
                                                    标签之间用分号分隔
                                                </p>
                                            </div>
                                        </div>

                                        <div data-v-063bec8e="" class="content-tag-v2-other-wrp">
                                            <p data-v-063bec8e="" class="content-tag-v2-other-label">推荐标签：</p>
                                            <div data-v-063bec8e="" class="content-tag-v2-other-tag-wrp">
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!---->
                                                        <span>音乐</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!---->
                                                        <span>MV</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!---->
                                                        <span>OP</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!---->
                                                        <span>剪辑</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!---->
                                                        <span>动漫</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!---->
                                                        <span>童年</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!---->
                                                        <span>原创</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!---->
                                                        <span>自制</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!---->
                                                        <span>搞笑</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!---->
                                                        <span>舞蹈</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!----><span>完整版</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!---->
                                                        <span>日常</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!----><span>动漫歌曲</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!---->
                                                        <span>ED</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!----><span>BGM</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!---->
                                                        <span>国产</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!----><span>动漫音乐</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!---->
                                                        <span>学习</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!---->
                                                        <span>经典</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                                <div data-v-063bec8e="" class="label-item-v2-2-container">
                                                    <p>
                                                        <!---->
                                                        <span>美女</span>
                                                        <!---->
                                                    </p>
                                                    <!---->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui-v2-normal-line-white-divide"></div>

                                    <!--视频简介-->
                                    <div data-v-766da648="" data-v-640a3622="" class="content-desc-v2-container">
                                        <div data-v-704ae438="" data-v-766da648="" class="section-title-v2-container">
                                            <!---->
                                            <h3 data-v-704ae438="" class="section-title-v2-content-main">
                                                简介
                                            </h3>
                                            <!---->
                                            <!---->
                                            <!---->
                                        </div>
                                        <div data-v-766da648="" class="content-desc-v2-text-wrp">
                                            <div data-v-3552b974="" data-v-766da648=""
                                                class="text-area-box-v2-container">
                                                <textarea id="description" data-v-3552b974="" maxlength="500"
                                                    name="description_name"
                                                    class="text-area-box-v2-val placeholder-style"></textarea>
                                                <input name="user_id" value="100000" style="display:none">
                                                <p data-v-3552b974="" class="text-area-box-v2-max-tip">500字以内</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="dividing-line"></div>
                                </div>
                                <div data-v-53027468="" data-v-3e9c20f4="" class="submit-button-group-v2-container">
                                    <input id="submit" type="button" data-v-53027468="" class="submit-btn-group-add"
                                        value="立即投稿" onclick="UploadSubmitClick();" />
                                    @*onClick="custom_submit()">*@
                                    <input id="close" type="button" data-v-53027468="" class="submit-btn-group-tpl"
                                        value="取消投稿" /> @*onClick="custom_close()">*@
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</form>
```

#### 5.1.2 点击上传文件，调用UploadSubmitClick()函数

```html
<script language="javascript">
    function UploadSubmitClick() {
        var formData = new FormData($("#upload_info_form")[0]);
        console.log(FormData);
        $.ajax({
            url: "/Main/Upload",
            data: formData,
            type: "POST",
            async: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
                var data = eval("(" + data + ")");
                console.log(data.flag);
                alert("上传成功!")

            },
            error: function (message) {
                alert("上传失败, 请稍后再试！");
            }
        });
    }
</script>
```

#### 5.1.3 保存视频文件，将视频信息保存到数据库

```c#
//上传视频
public ActionResult UploadVideoDB (FormCollection formdata) {
    HttpPostedFileBase file = Request.Files["video_upload_name"];
    HttpPostedFileBase cover = Request.Files["cover_upload_name"];
    var zoneName = Request.Form["zone_name"];
    var privacy = Request.Form["privacy"];
    var title = Request.Form["title_name"];
    var tagNames = Request.Form["tag_name"];
    var description = Request.Form["description_name"];
    var uploaderId = Request.Form["user_id"];

    if (file == null || cover == null) {
        Dictionary<string, string> JData = new Dictionary<string, string> ();
        JData.Add ("Flag", "false");
        return Json (JsonConvert.SerializeObject (JData, Formatting.Indented));
    }

    //判断各个参数是否存在
    var z = db.ZONE.Find (zoneName);
    if (z == null || privacy == null || title == null || tagNames == null || tagNames == "") {
        Dictionary<string, string> JData = new Dictionary<string, string> ();
        JData.Add ("Flag", "false");
        return Json (JsonConvert.SerializeObject (JData, Formatting.Indented));
    }

    //video实例
    VIDEOS video = new VIDEOS ();
    video.VIDEO_ID = "0";
    if (privacy == "all") {
        video.PRIVACY = true;
    } else {
        video.PRIVACY = false;
    }
    video.TITLE = title;
    video.DESCRIPTION = description;
    video.LIKES_NUM = 0;
    video.PLAY_NUM = 0;
    video.COLLECT_NUM = 0;
    video.SHARE_NUM = 0;
    video.UPLOAD_TIME = DateTime.Now;
    USERS uploader = db.USERS.Find (uploaderId);

    //加入VIDEOS元组
    if (ModelState.IsValid) {
        db.VIDEOS.Add (video);
        db.SaveChanges ();
    } else {
        Dictionary<string, string> JsonD = new Dictionary<string, string> ();
        JsonD.Add ("Flag", "false");
        return Json (JsonConvert.SerializeObject (JsonD, Formatting.Indented));
    }

    //获取刚新建的元组
    var Ids = db.Database.SqlQuery<string> ("select video_id from videos where upload_time=(select max(upload_time) from videos)").ToList ();
    string newId = Ids[0];
    video = db.VIDEOS.Find (newId);

    //联系集Upload_Video
    var uv = new UPLOAD_VIDEO ();
    uv.USER_ID = uploader.USER_ID;
    uv.VIDEO_ID = video.VIDEO_ID;
    db.UPLOAD_VIDEO.Add (uv);
    db.SaveChanges ();

    //联系集Has_Tag
    string[] names = tagNames.Split (';');
    for (int i = 0; i < names.Length; i++) {
        var tag = db.TAG.Find (names[i]);
        if (tag == null) {
            tag = new TAG ();
            tag.TAG_NAME = names[i];
            tag.REFER_NUM = 0;
            db.TAG.Add (tag);
            db.SaveChanges ();
        }
        tag.REFER_NUM++;

        video.TAG.Add (tag);
        db.SaveChanges ();
    }

    //联系集Has_Zone
    var hz = new HAS_ZONE ();
    hz.VIDEO_ID = video.VIDEO_ID;
    hz.ZONE_NAME = z.ZONE_NAME;
    db.HAS_ZONE.Add (hz);
    db.SaveChanges ();
    z.VIDEO_NUM++;
    db.Entry (z).State = EntityState.Modified;
    db.SaveChanges ();

    //存视频文件
    var filePath = "C:\\Users\\16214\\Desktop\\iVlog\\iVlog\\source\\file\\v\\" + newId;
    if (!System.IO.Directory.Exists (filePath)) {
        System.IO.Directory.CreateDirectory (filePath);
    }
    var fileName = file.FileName;
    file.SaveAs (Path.Combine (filePath, fileName));

    filePath = "../../source/file/v/" + newId;
    video.PATH = Path.Combine (filePath, fileName);
    db.Entry (video).State = EntityState.Modified;
    db.SaveChanges ();

    //存封面文件
    var coverPath = "C:\\Users\\16214\\Desktop\\iVlog\\iVlog\\source\\file\\c\\" + newId;
    if (!System.IO.Directory.Exists (coverPath)) {
        System.IO.Directory.CreateDirectory (coverPath);
    }
    var coverName = cover.FileName;
    file.SaveAs (Path.Combine (coverPath, coverName));

    coverPath = "../../source/file/c/" + newId;
    video.COVER = Path.Combine (coverPath, coverName);
    db.Entry (video).State = EntityState.Modified;
    db.SaveChanges ();

    //发布消息
    var ur = from a in db.USER_RELATIONSHIP
    where a.PASSIVE_USER_ID == uploaderId
    select a.ACTIVE_USER_ID;
    foreach (var item in ur) {
        SendMessage (4, uploaderId, item);
    }

    Dictionary<string, string> JsonData = new Dictionary<string, string> ();
    JsonData.Add ("Flag", "true");
    return Json (JsonConvert.SerializeObject (JsonData, Formatting.Indented));
}

public ActionResult Upload () {
    return View ();
}

[HttpPost]
[Route ("PostFile")]
public ActionResult Upload (FormCollection formdata) {
    var data = UploadVideoDB (formdata);
    return data;
}

```

#### 5.1.3 效果展示

##### 上传视频

- 选择视频文件，填写详细信息

  ![视频上传1.png](https://upload-images.jianshu.io/upload_images/12014150-05bb355541a5ba92.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  ![视频上传2.png](https://upload-images.jianshu.io/upload_images/12014150-7bc6426dd8694a28.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 上传成功

- 网站提示上传成功

  ![上传成功.png](https://upload-images.jianshu.io/upload_images/12014150-c6b77ca4a475a835.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 保存到文件夹中

![保存到文件夹下.png](https://upload-images.jianshu.io/upload_images/12014150-62c9db5ddf08bb8b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 保存到数据库中

- 视频ID由系统分配，在这里是100029

  ![保存到数据库中.png](https://upload-images.jianshu.io/upload_images/12014150-fcddcb9b31272100.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



## 6. 功能截屏展示

### 6.1 Account

#### 6.1.1 Account/Index -> 登陆界面

![1562942793995.png](https://upload-images.jianshu.io/upload_images/12014150-c00b0eef12f39d11.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![1562942869858.png](https://upload-images.jianshu.io/upload_images/12014150-018c748dedb09762.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 6.1.2 Account/Register ->注册界面

![1562942911851.png](https://upload-images.jianshu.io/upload_images/12014150-fae3cb5859ec0c3a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 6.2 Main

#### 6.2.1 Main/Index -> 首页

![1562942978345.png](https://upload-images.jianshu.io/upload_images/12014150-ab9ddf600a44caf5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 分区

![1562942996834.png](https://upload-images.jianshu.io/upload_images/12014150-9b4071643b77785a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 排行榜

![1562943026870.png](https://upload-images.jianshu.io/upload_images/12014150-7d81e6f54701e7ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 拖动调整分区顺序

![1562943059405.png](https://upload-images.jianshu.io/upload_images/12014150-cf6661bf2e472b95.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 6.2.2 Main/Search -> 搜索界面

![1562943539801.png](https://upload-images.jianshu.io/upload_images/12014150-a23462fcaafdcd9e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![1562943558669.png](https://upload-images.jianshu.io/upload_images/12014150-5cd992e25df98b53.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 6.2.3 Main/Upload -> 投稿界面

![1562943463008.png](https://upload-images.jianshu.io/upload_images/12014150-5ebd08d0f514814a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![1562943476249.png](https://upload-images.jianshu.io/upload_images/12014150-f40deb0bb6043139.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 6.3 Video

#### 6.3.1 Video/Index -> 视频播放界面 

![1562943915561.png](https://upload-images.jianshu.io/upload_images/12014150-0a7668d7ffe09d3f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 评论

![1562943935645.png](https://upload-images.jianshu.io/upload_images/12014150-cbca5ff2c73444f7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 6.4 User

#### 6.4.1 User/Index -> 个人主页（我的动态）

![1562943103893.png](https://upload-images.jianshu.io/upload_images/12014150-75e7992b01cb2e67.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 6.4.2 User/Attention -> 个人主页（我的关注）

![1562943201440.png](https://upload-images.jianshu.io/upload_images/12014150-64fc391317d8536d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 6.4.3 User/History -> 个人主页（浏览历史）

![1562944062712.png](https://upload-images.jianshu.io/upload_images/12014150-d3a72b84702f018c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 6.4.4 User/Favorite -> 个人主页（我的收藏）

![1562943397925.png](https://upload-images.jianshu.io/upload_images/12014150-948223b0e9a38e88.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 6.4.5 User/Message -> 个人主页（我的消息）

![1562943416110.png](https://upload-images.jianshu.io/upload_images/12014150-f1f9fe0ba05d289e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 6.5.6 User/Setting -> 个人主页（个人信息设置）

![1562943436838.png](https://upload-images.jianshu.io/upload_images/12014150-c89eee9017f7ac29.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 6.5 myError

#### 6.5.1 myError/Error403 -> 403错误页面

![1562943703935.png](https://upload-images.jianshu.io/upload_images/12014150-c917d1b91878cab2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 6.5.2 myError/Error404 -> 404错误页面

![1562943648476.png](https://upload-images.jianshu.io/upload_images/12014150-88824f2372eef3ee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 6.5.3 myError/Error500 -> 500错误页面

![1562943737438.png](https://upload-images.jianshu.io/upload_images/12014150-b73663c803906f6c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



## 7. 项目结构
```

│  README.md       
│  README.pdf       
│      
├─database       
│      DataDefault.sql    
│      README.md    
│      total.sql    
│          
├─document       
│  │  iVlog.mp4    
│  │  iVlog.pptx    
│  │  ppt转视频.mp4    
│  │  README.md    
│  │      
│  ├─数据库设计       
│  │      数据库设计文档.docx    
│  │      数据库设计文档.pdf    
│  │          
│  ├─系统设计与实现       
│  │      系统设计与实现文档.pages    
│  │      系统设计与实现文档.pdf    
│  │          
│  └─系统需求与分析       
│          系统需求与分析文档.pages    
│          系统需求与分析文档.pdf    
│              
└─program       
    │  iVlog.sln       
    │      
    ├─iVlog       
    │  │  favicon.ico    
    │  │  Global.asax    
    │  │  Global.asax.cs    
    │  │  iVlog.csproj    
    │  │  iVlog.csproj.user    
    │  │  packages.config    
    │  │  Web.config    
    │  │  Web.Debug.config    
    │  │  Web.Release.config    
    │  │      
    │  ├─App_Data       
    │  ├─App_Start       
    │  │      BundleConfig.cs    
    │  │      FilterConfig.cs    
    │  │      RouteConfig.cs    
    │  │          
    │  ├─bin       
    │  │  │  Antlr3.Runtime.dll    
    │  │  │  Antlr3.Runtime.pdb    
    │  │  │  EntityFramework.dll    
    │  │  │  EntityFramework.SqlServer.dll    
    │  │  │  EntityFramework.SqlServer.xml    
    │  │  │  EntityFramework.xml    
    │  │  │  iVlog.dll    
    │  │  │  iVlog.dll.config    
    │  │  │  iVlog.pdb    
    │  │  │  LitJson.dll    
    │  │  │  Microsoft.CodeDom.Providers.DotNetCompilerPlatform.dll    
    │  │  │  Microsoft.CodeDom.Providers.DotNetCompilerPlatform.xml    
    │  │  │  Microsoft.Web.Infrastructure.dll    
    │  │  │  Newtonsoft.Json.dll    
    │  │  │  Newtonsoft.Json.xml    
    │  │  │  Oracle.ManagedDataAccess.dll    
    │  │  │  Oracle.ManagedDataAccess.EntityFramework.dll    
    │  │  │  System.Web.Helpers.dll    
    │  │  │  System.Web.Helpers.xml    
    │  │  │  System.Web.Mvc.dll    
    │  │  │  System.Web.Mvc.xml    
    │  │  │  System.Web.Optimization.dll    
    │  │  │  System.Web.Optimization.xml    
    │  │  │  System.Web.Razor.dll    
    │  │  │  System.Web.Razor.xml    
    │  │  │  System.Web.WebPages.Deployment.dll    
    │  │  │  System.Web.WebPages.Deployment.xml    
    │  │  │  System.Web.WebPages.dll    
    │  │  │  System.Web.WebPages.Razor.dll    
    │  │  │  System.Web.WebPages.Razor.xml    
    │  │  │  System.Web.WebPages.xml    
    │  │  │  WebGrease.dll    
    │  │  │      
    │  │  ├─roslyn       
    │  │  │      csc.exe    
    │  │  │      csc.exe.config    
    │  │  │      csc.rsp    
    │  │  │      csi.exe    
    │  │  │      csi.exe.config    
    │  │  │      csi.rsp    
    │  │  │      Microsoft.Build.Tasks.CodeAnalysis.dll    
    │  │  │      Microsoft.CodeAnalysis.CSharp.dll    
    │  │  │      Microsoft.CodeAnalysis.CSharp.Scripting.dll    
    │  │  │      Microsoft.CodeAnalysis.dll    
    │  │  │      Microsoft.CodeAnalysis.Scripting.dll    
    │  │  │      Microsoft.CodeAnalysis.VisualBasic.dll    
    │  │  │      Microsoft.CSharp.Core.targets    
    │  │  │      Microsoft.DiaSymReader.Native.amd64.dll    
    │  │  │      Microsoft.DiaSymReader.Native.x86.dll    
    │  │  │      Microsoft.Managed.Core.targets    
    │  │  │      Microsoft.VisualBasic.Core.targets    
    │  │  │      System.AppContext.dll    
    │  │  │      System.Collections.Immutable.dll    
    │  │  │      System.Console.dll    
    │  │  │      System.Diagnostics.FileVersionInfo.dll    
    │  │  │      System.Diagnostics.StackTrace.dll    
    │  │  │      System.IO.Compression.dll    
    │  │  │      System.IO.FileSystem.dll    
    │  │  │      System.IO.FileSystem.Primitives.dll    
    │  │  │      System.IO.Pipes.AccessControl.dll    
    │  │  │      System.IO.Pipes.dll    
    │  │  │      System.Reflection.Metadata.dll    
    │  │  │      System.Security.AccessControl.dll    
    │  │  │      System.Security.Claims.dll    
    │  │  │      System.Security.Cryptography.Algorithms.dll    
    │  │  │      System.Security.Cryptography.Encoding.dll    
    │  │  │      System.Security.Cryptography.Primitives.dll    
    │  │  │      System.Security.Cryptography.X509Certificates.dll    
    │  │  │      System.Security.Principal.Windows.dll    
    │  │  │      System.Text.Encoding.CodePages.dll    
    │  │  │      System.ValueTuple.dll    
    │  │  │      System.Xml.ReaderWriter.dll    
    │  │  │      System.Xml.XmlDocument.dll    
    │  │  │      System.Xml.XPath.dll    
    │  │  │      System.Xml.XPath.XDocument.dll    
    │  │  │      vbc.exe    
    │  │  │      vbc.exe.config    
    │  │  │      vbc.rsp    
    │  │  │      VBCSCompiler.exe    
    │  │  │      VBCSCompiler.exe.config    
    │  │  │          
    │  │  └─zh-Hans       
    │  │          EntityFramework.resources.dll    
    │  │          System.Web.Helpers.resources.dll    
    │  │          System.Web.Mvc.resources.dll    
    │  │          System.Web.Optimization.resources.dll    
    │  │          System.Web.Razor.resources.dll    
    │  │          System.Web.WebPages.Deployment.resources.dll    
    │  │          System.Web.WebPages.Razor.resources.dll    
    │  │          System.Web.WebPages.resources.dll    
    │  │              
    │  ├─Content    
    │  │      bootstrap-theme.css    
    │  │      bootstrap-theme.css.map    
    │  │      bootstrap-theme.min.css    
    │  │      bootstrap-theme.min.css.map    
    │  │      bootstrap.css    
    │  │      bootstrap.css.map    
    │  │      bootstrap.min.css    
    │  │      bootstrap.min.css.map    
    │  │      Site.css    
    │  │          
    │  ├─Controllers       
    │  │      AccountController.cs    
    │  │      AdministratorController.cs    
    │  │      HomeController.cs    
    │  │      MainController.cs    
    │  │      myErrorController.cs    
    │  │      UserController.cs    
    │  │      VideoController.cs    
    │  │          
    │  ├─css       
    │  │  │  bootstrap-theme.min.css    
    │  │  │  bootstrap.min.css    
    │  │  │      
    │  │  ├─bootstrap       
    │  │  │      bootstrap-theme.css    
    │  │  │      bootstrap-theme.min.css    
    │  │  │      bootstrap.css    
    │  │  │      bootstrap.min.css    
    │  │  │          
    │  │  ├─header_footer       
    │  │  │      fontAwesome.css    
    │  │  │      header_footer.css    
    │  │  │      hero-slider.css    
    │  │  │      style.css    
    │  │  │          
    │  │  ├─login_register       
    │  │  │      background.png    
    │  │  │      bg.png    
    │  │  │      cover.png    
    │  │  │      covered.png    
    │  │  │      demo.css    
    │  │  │      font-awesome.min.css    
    │  │  │      hu.png    
    │  │  │      iVlog-covered.png    
    │  │  │      iVlog.png    
    │  │  │      letter_bg_01.jpg    
    │  │  │      letter_bg_02.jpg    
    │  │  │      letter_bg_03.jpg    
    │  │  │      pattern.png    
    │  │  │      style1.css    
    │  │  │      style2.css    
    │  │  │      style3.css    
    │  │  │      style4.css    
    │  │  │      templatemo-style.css    
    │  │  │          
    │  │  ├─main       
    │  │  │      main.css    
    │  │  │      style.css    
    │  │  │          
    │  │  ├─search       
    │  │  │      search.css    
    │  │  │          
    │  │  └─user       
    │  │          bootstrap.min.css    
    │  │          font-awesome.4.6.0.css    
    │  │          gender_female.png    
    │  │          gender_male.png    
    │  │          he.css    
    │  │          settings.css    
    │  │              
    │  ├─fonts       
    │  │  │  fontawesome-webfont.eot    
    │  │  │  fontawesome-webfont.svg    
    │  │  │  fontawesome-webfont.ttf    
    │  │  │  fontawesome-webfont.woff    
    │  │  │  fontawesome-webfont.woff2    
    │  │  │  FontAwesome.otf    
    │  │  │  glyphicons-halflings-regular.eot    
    │  │  │  glyphicons-halflings-regular.svg    
    │  │  │  glyphicons-halflings-regular.ttf    
    │  │  │  glyphicons-halflings-regular.woff    
    │  │  │  glyphicons-halflings-regular.woff2    
    │  │  │      
    │  │  └─main       
    │  │          polar.otf    
    │  │              
    │  ├─img       
    │  │  ├─error       
    │  │  │      403.png    
    │  │  │      404.png    
    │  │  │      500.png    
    │  │  │          
    │  │  ├─header_footer       
    │  │  │      footer.png       
    │  │  │      footer_light.png       
    │  │  │      header-black.png       
    │  │  │      header-white.png       
    │  │  │      icon.jpg       
    │  │  │      logo-black.png       
    │  │  │      logo-white.png       
    │  │  │      profile.jpeg       
    │  │  │      white-bg-1.png       
    │  │  │      white-bg-2.png        
    │  │  │          
    │  │  ├─login_register       
    │  │  │      background.png       
    │  │  │      bg.png       
    │  │  │      cover.png       
    │  │  │      covered.png       
    │  │  │      hu.png       
    │  │  │      iVlog-covered.png       
    │  │  │      iVlog.png       
    │  │  │      letter_bg_01.jpg       
    │  │  │      letter_bg_02.jpg       
    │  │  │      letter_bg_03.jpg       
    │  │  │      pattern.png       
    │  │  │          
    │  │  ├─main       
    │  │  │      3d-slider-1.jpg    
    │  │  │      3d-slider-2.jpg    
    │  │  │      3d-slider-3.jpg    
    │  │  │      3d-slider-4.jpg    
    │  │  │      arrow.png    
    │  │  │      datab.jpg    
    │  │  │      footer.png    
    │  │  │      footer_light.png    
    │  │  │      go_top.png    
    │  │  │      guqin.png    
    │  │  │      guzheng.jpg    
    │  │  │      header-black.png    
    │  │  │      header-white.png    
    │  │  │      huihua.png    
    │  │  │      icoCircle.gif    
    │  │  │      ivlog.png    
    │  │  │      left.png    
    │  │  │      logo-black.png    
    │  │  │      logo-white.png    
    │  │  │      photo.jpg    
    │  │  │      photo6.jpg    
    │  │  │      pic1.png    
    │  │  │      pic2.png    
    │  │  │      pic3.png    
    │  │  │      pic4.png    
    │  │  │      pic5.png    
    │  │  │      pic6.png    
    │  │  │      qita.png    
    │  │  │      quanbufenqu.png    
    │  │  │      remen.png    
    │  │  │      scope.jpg    
    │  │  │      shujuku.png    
    │  │  │      white-bg-1.png    
    │  │  │      white-bg-2.png    
    │  │  │      zhongyi.png    
    │  │  │          
    │  │  ├─search       
    │  │  │      gender_female.png    
    │  │  │      gender_male.png    
    │  │  │      head.png    
    │  │  │      head1.jpg    
    │  │  │      head10.jpg    
    │  │  │      head2.jpg    
    │  │  │      head2.png    
    │  │  │      head3.jpg    
    │  │  │      head4.jpg    
    │  │  │      head5.jpg    
    │  │  │      head6.jpg    
    │  │  │      head7.jpg    
    │  │  │      head8.jpg    
    │  │  │      head9.jpg    
    │  │  │      icon.png    
    │  │  │      logo.png    
    │  │  │      photo.jpg    
    │  │  │      photo10.jpg    
    │  │  │      photo2.jpg    
    │  │  │      photo3.jpg    
    │  │  │      photo4.jpg    
    │  │  │      photo5.jpg    
    │  │  │      photo6.jpg    
    │  │  │      photo7.jpg    
    │  │  │      photo8.jpg    
    │  │  │      photo9.jpg    
    │  │  │      white-bg-1.png    
    │  │  │          
    │  │  ├─upload       
    │  │  │      1.mp4    
    │  │  │      bilibili.png    
    │  │  │      img1.jpg    
    │  │  │      sky.jpg    
    │  │  │      vertical-bg.png    
    │  │  │      video.png    
    │  │  │          
    │  │  ├─user       
    │  │  │      balabala.png    
    │  │  │      cb07adc2d2edede6689f1dfabe75bfa78f7f949d.jpg@150w_150h.jpg&quot    
    │  │  │      for.jpg    
    │  │  │      header-touming.png    
    │  │  │      hhh.jpeg    
    │  │  │      history.jpg    
    │  │  │      logo-white.png    
    │  │  │      page-bg.jpg    
    │  │  │      page-bg.png    
    │  │  │      personal-bgPic.jpg    
    │  │  │      profile.jpeg    
    │  │  │          
    │  │  └─video       
    │  │          cat.jpg    
    │  │              
    │  ├─js       
    │  │  │  bootstrap-3.3.7.js    
    │  │  │  bootstrap.js    
    │  │  │  bootstrap.min.js    
    │  │  │  jquery.js    
    │  │  │  npm.js    
    │  │  │      
    │  │  ├─administrator       
    │  │  │      adDomain.js    
    │  │  │      userList.js    
    │  │  │      videoList.js    
    │  │  │          
    │  │  ├─cookie       
    │  │  │      cookie.js    
    │  │  │      model.js    
    │  │  │          
    │  │  ├─header_footer       
    │  │  │      hide.js    
    │  │  │      main.js    
    │  │  │      plugins.js    
    │  │  │          
    │  │  ├─login_register       
    │  │  │      animation_particles.js    
    │  │  │      indexOnLoad.js    
    │  │  │      login.js    
    │  │  │      modernizr.custom.86080.js    
    │  │  │      register.js    
    │  │  │          
    │  │  ├─main       
    │  │  │      default.css    
    │  │  │      hide.js    
    │  │  │      jquery-1.8.3.min.js    
    │  │  │      jquery.js    
    │  │  │      jquery.SuperSlide.2.1.3.js    
    │  │  │      jquery.SuperSlide.2.1.3.source.js    
    │  │  │      jquery1.42.min.js    
    │  │  │      lazyload.min.js    
    │  │  │      main.js    
    │  │  │      top_slide.js    
    │  │  │          
    │  │  ├─search       
    │  │  │      search.js    
    │  │  │          
    │  │  └─user       
    │  │          attention.js       
    │  │          attention_info.json    
    │  │          bgColorChange.js    
    │  │          choosePosition.js    
    │  │          domain.js    
    │  │          favorite.js    
    │  │          favorite_info.json    
    │  │          history.js    
    │  │          history_info.json    
    │  │          json.js    
    │  │          message.js    
    │  │          message_info.json    
    │  │          position.js    
    │  │          user_info.json    
    │  │          view.js    
    │  │          visible-change-copy.js    
    │  │          visible-change.js    
    │  │          willN.js    
    │  │              
    │  ├─Models       
    │  │      ADMINISTRATOR.cs    
    │  │      COMMENTS.cs    
    │  │      FAVORITE.cs    
    │  │      GET_MESSAGE.cs    
    │  │      HAS_COMMENT.cs    
    │  │      HAS_FAVORITES.cs    
    │  │      HAS_VIDEO.cs    
    │  │      HAS_ZONE.cs    
    │  │      MESSAGE_LIBRARY.cs    
    │  │      Model.Context.cs    
    │  │      Model.Context.tt    
    │  │      Model.cs    
    │  │      Model.Designer.cs    
    │  │      Model.edmx    
    │  │      Model.edmx.diagram    
    │  │      Model.tt    
    │  │      RANKING.cs    
    │  │      SEND_COMMENT.cs    
    │  │      SEND_MESSAGE.cs    
    │  │      SORT_VIDEO.cs    
    │  │      TAG.cs    
    │  │      UPLOAD_VIDEO.cs    
    │  │      USERS.cs    
    │  │      USER_RELATIONSHIP.cs    
    │  │      VIDEOS.cs    
    │  │      VISIT.cs    
    │  │      ZONE.cs    
    │  │          
    │  ├─obj       
    │  │  ├─Debug       
    │  │  │  │  DesignTimeResolveAssemblyReferencesInput.cache    
    │  │  │  │  iVlog.csproj.CopyComplete    
    │  │  │  │  iVlog.csproj.CoreCompileInputs.cache    
    │  │  │  │  iVlog.csproj.FileListAbsolute.txt    
    │  │  │  │  iVlog.csprojAssemblyReference.cache    
    │  │  │  │  iVlog.dll    
    │  │  │  │  iVlog.pdb    
    │  │  │  │  TemporaryGeneratedFile_036C0B5B-1481-4323-8D20-8F5ADCB23D92.cs    
    │  │  │  │  TemporaryGeneratedFile_5937a670-0e60-4077-877b-f7221da3dda1.cs    
    │  │  │  │  TemporaryGeneratedFile_E7A71F73-0F8D-4B9B-B56E-8E70B10BC5D3.cs    
    │  │  │  │      
    │  │  │  ├─edmxResourcesToEmbed       
    │  │  │  │  └─Models       
    │  │  │  │          Model.csdl    
    │  │  │  │          Model.msl    
    │  │  │  │          Model.ssdl    
    │  │  │  │              
    │  │  │  ├─TempPE       
    │  │  │  │      Models.Model.Context.cs.dll    
    │  │  │  │      Models.Model.cs.dll    
    │  │  │  │      Models.Model.Designer.cs.dll    
    │  │  │  │          
    │  │  │  └─__testMsDeployConnection__    
    │  │  └─Release       
    │  │      │  CSAutoParameterize.parameters.xml    
    │  │      │  iVlog.csproj.CopyComplete    
    │  │      │  iVlog.csproj.CoreCompileInputs.cache    
    │  │      │  iVlog.csproj.FileListAbsolute.txt    
    │  │      │  iVlog.csprojAssemblyReference.cache    
    │  │      │  iVlog.dll    
    │  │      │  iVlog.pdb    
    │  │      │  TemporaryGeneratedFile_036C0B5B-1481-4323-8D20-8F5ADCB23D92.cs    
    │  │      │  TemporaryGeneratedFile_5937a670-0e60-4077-877b-f7221da3dda1.cs    
    │  │      │  TemporaryGeneratedFile_E7A71F73-0F8D-4B9B-B56E-8E70B10BC5D3.cs    
    │  │      │  _WPPLastBuildInfo.txt    
    │  │      │      
    │  │      ├─CSAutoParameterize       
    │  │      │  ├─original       
    │  │      │  │  │  Web.config    
    │  │      │  │  │      
    │  │      │  │  └─Views       
    │  │      │  │          Web.config    
    │  │      │  │              
    │  │      │  └─transformed       
    │  │      │      │  Web.config    
    │  │      │      │      
    │  │      │      └─Views       
    │  │      │              Web.config    
    │  │      │                  
    │  │      ├─Database    
    │  │      ├─edmxResourcesToEmbed    
    │  │      │  └─Models       
    │  │      │          Model.csdl    
    │  │      │          Model.msl    
    │  │      │          Model.ssdl    
    │  │      │              
    │  │      ├─Package       
    │  │      │  │  iVlog.SourceManifest.xml    
    │  │      │  │      
    │  │      │  └─PackageTmp       
    │  │      │      │  favicon.ico    
    │  │      │      │  Global.asax    
    │  │      │      │  Web.config    
    │  │      │      │      
    │  │      │      ├─bin       
    │  │      │      │  │  Antlr3.Runtime.dll    
    │  │      │      │  │  Antlr3.Runtime.pdb    
    │  │      │      │  │  EntityFramework.dll    
    │  │      │      │  │  EntityFramework.SqlServer.dll    
    │  │      │      │  │  iVlog.dll    
    │  │      │      │  │  iVlog.pdb    
    │  │      │      │  │  LitJson.dll    
    │  │      │      │  │  Microsoft.CodeDom.Providers.DotNetCompilerPlatform.dll    
    │  │      │      │  │  Microsoft.Web.Infrastructure.dll    
    │  │      │      │  │  Newtonsoft.Json.dll    
    │  │      │      │  │  Oracle.ManagedDataAccess.dll    
    │  │      │      │  │  Oracle.ManagedDataAccess.EntityFramework.dll    
    │  │      │      │  │  System.Web.Helpers.dll    
    │  │      │      │  │  System.Web.Mvc.dll    
    │  │      │      │  │  System.Web.Optimization.dll    
    │  │      │      │  │  System.Web.Razor.dll    
    │  │      │      │  │  System.Web.WebPages.Deployment.dll    
    │  │      │      │  │  System.Web.WebPages.dll    
    │  │      │      │  │  System.Web.WebPages.Razor.dll    
    │  │      │      │  │  WebGrease.dll    
    │  │      │      │  │      
    │  │      │      │  ├─roslyn       
    │  │      │      │  │      csc.exe    
    │  │      │      │  │      csc.exe.config    
    │  │      │      │  │      csc.rsp    
    │  │      │      │  │      csi.exe    
    │  │      │      │  │      csi.exe.config    
    │  │      │      │  │      csi.rsp    
    │  │      │      │  │      Microsoft.Build.Tasks.CodeAnalysis.dll    
    │  │      │      │  │      Microsoft.CodeAnalysis.CSharp.dll    
    │  │      │      │  │      Microsoft.CodeAnalysis.CSharp.Scripting.dll    
    │  │      │      │  │      Microsoft.CodeAnalysis.dll    
    │  │      │      │  │      Microsoft.CodeAnalysis.Scripting.dll    
    │  │      │      │  │      Microsoft.CodeAnalysis.VisualBasic.dll    
    │  │      │      │  │      Microsoft.CSharp.Core.targets    
    │  │      │      │  │      Microsoft.DiaSymReader.Native.amd64.dll    
    │  │      │      │  │      Microsoft.DiaSymReader.Native.x86.dll    
    │  │      │      │  │      Microsoft.Managed.Core.targets    
    │  │      │      │  │      Microsoft.VisualBasic.Core.targets    
    │  │      │      │  │      System.AppContext.dll    
    │  │      │      │  │      System.Collections.Immutable.dll    
    │  │      │      │  │      System.Console.dll    
    │  │      │      │  │      System.Diagnostics.FileVersionInfo.dll    
    │  │      │      │  │      System.Diagnostics.StackTrace.dll    
    │  │      │      │  │      System.IO.Compression.dll    
    │  │      │      │  │      System.IO.FileSystem.dll    
    │  │      │      │  │      System.IO.FileSystem.Primitives.dll    
    │  │      │      │  │      System.IO.Pipes.AccessControl.dll    
    │  │      │      │  │      System.IO.Pipes.dll    
    │  │      │      │  │      System.Reflection.Metadata.dll    
    │  │      │      │  │      System.Security.AccessControl.dll    
    │  │      │      │  │      System.Security.Claims.dll    
    │  │      │      │  │      System.Security.Cryptography.Algorithms.dll    
    │  │      │      │  │      System.Security.Cryptography.Encoding.dll    
    │  │      │      │  │      System.Security.Cryptography.Primitives.dll    
    │  │      │      │  │      System.Security.Cryptography.X509Certificates.dll    
    │  │      │      │  │      System.Security.Principal.Windows.dll    
    │  │      │      │  │      System.Text.Encoding.CodePages.dll    
    │  │      │      │  │      System.ValueTuple.dll    
    │  │      │      │  │      System.Xml.ReaderWriter.dll    
    │  │      │      │  │      System.Xml.XmlDocument.dll    
    │  │      │      │  │      System.Xml.XPath.dll    
    │  │      │      │  │      System.Xml.XPath.XDocument.dll    
    │  │      │      │  │      vbc.exe    
    │  │      │      │  │      vbc.exe.config    
    │  │      │      │  │      vbc.rsp    
    │  │      │      │  │      VBCSCompiler.exe    
    │  │      │      │  │      VBCSCompiler.exe.config    
    │  │      │      │  │          
    │  │      │      │  └─zh-Hans       
    │  │      │      │          EntityFramework.resources.dll    
    │  │      │      │          System.Web.Helpers.resources.dll    
    │  │      │      │          System.Web.Mvc.resources.dll    
    │  │      │      │          System.Web.Optimization.resources.dll    
    │  │      │      │          System.Web.Razor.resources.dll    
    │  │      │      │          System.Web.WebPages.Deployment.resources.dll    
    │  │      │      │          System.Web.WebPages.Razor.resources.dll    
    │  │      │      │          System.Web.WebPages.resources.dll    
    │  │      │      │              
    │  │      │      ├─Content       
    │  │      │      │      bootstrap-theme.css    
    │  │      │      │      bootstrap-theme.css.map    
    │  │      │      │      bootstrap-theme.min.css    
    │  │      │      │      bootstrap-theme.min.css.map    
    │  │      │      │      bootstrap.css    
    │  │      │      │      bootstrap.css.map    
    │  │      │      │      bootstrap.min.css    
    │  │      │      │      bootstrap.min.css.map    
    │  │      │      │      Site.css    
    │  │      │      │          
    │  │      │      ├─css       
    │  │      │      │  │  bootstrap-theme.min.css    
    │  │      │      │  │  bootstrap.min.css    
    │  │      │      │  │      
    │  │      │      │  ├─bootstrap       
    │  │      │      │  │      bootstrap-theme.css    
    │  │      │      │  │      bootstrap-theme.min.css    
    │  │      │      │  │      bootstrap.css    
    │  │      │      │  │      bootstrap.min.css    
    │  │      │      │  │          
    │  │      │      │  ├─header_footer       
    │  │      │      │  │      fontAwesome.css    
    │  │      │      │  │      header_footer.css    
    │  │      │      │  │      hero-slider.css    
    │  │      │      │  │      style.css    
    │  │      │      │  │          
    │  │      │      │  ├─login_register       
    │  │      │      │  │      background.png    
    │  │      │      │  │      bg.png    
    │  │      │      │  │      cover.png    
    │  │      │      │  │      covered.png    
    │  │      │      │  │      demo.css    
    │  │      │      │  │      font-awesome.min.css    
    │  │      │      │  │      hu.png    
    │  │      │      │  │      iVlog-covered.png    
    │  │      │      │  │      iVlog.png    
    │  │      │      │  │      letter_bg_01.jpg    
    │  │      │      │  │      letter_bg_02.jpg    
    │  │      │      │  │      letter_bg_03.jpg    
    │  │      │      │  │      pattern.png    
    │  │      │      │  │      style1.css    
    │  │      │      │  │      style2.css    
    │  │      │      │  │      style3.css    
    │  │      │      │  │      style4.css    
    │  │      │      │  │      templatemo-style.css    
    │  │      │      │  │          
    │  │      │      │  ├─main       
    │  │      │      │  │      main.css    
    │  │      │      │  │      style.css    
    │  │      │      │  │          
    │  │      │      │  ├─search       
    │  │      │      │  │      search.css    
    │  │      │      │  │          
    │  │      │      │  └─user       
    │  │      │      │          bootstrap.min.css    
    │  │      │      │          font-awesome.4.6.0.css    
    │  │      │      │          gender_female.png    
    │  │      │      │          gender_male.png    
    │  │      │      │          he.css    
    │  │      │      │          settings.css    
    │  │      │      │              
    │  │      │      ├─fonts       
    │  │      │      │  │  fontawesome-webfont.eot    
    │  │      │      │  │  fontawesome-webfont.svg    
    │  │      │      │  │  fontawesome-webfont.ttf    
    │  │      │      │  │  fontawesome-webfont.woff    
    │  │      │      │  │  fontawesome-webfont.woff2    
    │  │      │      │  │  FontAwesome.otf    
    │  │      │      │  │  glyphicons-halflings-regular.eot    
    │  │      │      │  │  glyphicons-halflings-regular.svg    
    │  │      │      │  │  glyphicons-halflings-regular.ttf    
    │  │      │      │  │  glyphicons-halflings-regular.woff    
    │  │      │      │  │  glyphicons-halflings-regular.woff2    
    │  │      │      │  │      
    │  │      │      │  └─main       
    │  │      │      │          polar.otf    
    │  │      │      │              
    │  │      │      ├─img       
    │  │      │      │  ├─error       
    │  │      │      │  │      403.png    
    │  │      │      │  │      404.png    
    │  │      │      │  │      500.png    
    │  │      │      │  │          
    │  │      │      │  ├─header_footer       
    │  │      │      │  │      footer.png    
    │  │      │      │  │      footer_light.png    
    │  │      │      │  │      header-black.png    
    │  │      │      │  │      header-white.png    
    │  │      │      │  │      icon.jpg    
    │  │      │      │  │      logo-black.png    
    │  │      │      │  │      logo-white.png    
    │  │      │      │  │      profile.jpeg    
    │  │      │      │  │      white-bg-1.png    
    │  │      │      │  │      white-bg-2.png    
    │  │      │      │  │          
    │  │      │      │  ├─login_register       
    │  │      │      │  │      background.png    
    │  │      │      │  │      bg.png    
    │  │      │      │  │      cover.png    
    │  │      │      │  │      covered.png    
    │  │      │      │  │      hu.png    
    │  │      │      │  │      iVlog-covered.png    
    │  │      │      │  │      iVlog.png    
    │  │      │      │  │      letter_bg_01.jpg    
    │  │      │      │  │      letter_bg_02.jpg    
    │  │      │      │  │      letter_bg_03.jpg    
    │  │      │      │  │      pattern.png    
    │  │      │      │  │          
    │  │      │      │  ├─main       
    │  │      │      │  │      3d-slider-1.jpg    
    │  │      │      │  │      3d-slider-2.jpg    
    │  │      │      │  │      3d-slider-3.jpg    
    │  │      │      │  │      3d-slider-4.jpg    
    │  │      │      │  │      arrow.png    
    │  │      │      │  │      footer.png    
    │  │      │      │  │      footer_light.png    
    │  │      │      │  │      go_top.png    
    │  │      │      │  │      guqin.png    
    │  │      │      │  │      header-black.png    
    │  │      │      │  │      header-white.png    
    │  │      │      │  │      huihua.png    
    │  │      │      │  │      icoCircle.gif    
    │  │      │      │  │      ivlog.png    
    │  │      │      │  │      left.png    
    │  │      │      │  │      logo-black.png    
    │  │      │      │  │      logo-white.png    
    │  │      │      │  │      photo.jpg    
    │  │      │      │  │      photo6.jpg    
    │  │      │      │  │      pic1.png    
    │  │      │      │  │      pic2.png    
    │  │      │      │  │      pic3.png    
    │  │      │      │  │      pic4.png    
    │  │      │      │  │      pic5.png    
    │  │      │      │  │      pic6.png    
    │  │      │      │  │      qita.png    
    │  │      │      │  │      quanbufenqu.png    
    │  │      │      │  │      remen.png    
    │  │      │      │  │      shujuku.png    
    │  │      │      │  │      white-bg-1.png    
    │  │      │      │  │      white-bg-2.png    
    │  │      │      │  │      zhongyi.png    
    │  │      │      │  │          
    │  │      │      │  ├─search       
    │  │      │      │  │      gender_female.png    
    │  │      │      │  │      gender_male.png    
    │  │      │      │  │      head.png    
    │  │      │      │  │      head1.jpg    
    │  │      │      │  │      head10.jpg    
    │  │      │      │  │      head2.jpg    
    │  │      │      │  │      head2.png    
    │  │      │      │  │      head3.jpg    
    │  │      │      │  │      head4.jpg    
    │  │      │      │  │      head5.jpg    
    │  │      │      │  │      head6.jpg    
    │  │      │      │  │      head7.jpg    
    │  │      │      │  │      head8.jpg    
    │  │      │      │  │      head9.jpg    
    │  │      │      │  │      icon.png    
    │  │      │      │  │      logo.png    
    │  │      │      │  │      photo.jpg    
    │  │      │      │  │      photo10.jpg    
    │  │      │      │  │      photo2.jpg    
    │  │      │      │  │      photo3.jpg    
    │  │      │      │  │      photo4.jpg    
    │  │      │      │  │      photo5.jpg    
    │  │      │      │  │      photo6.jpg    
    │  │      │      │  │      photo7.jpg    
    │  │      │      │  │      photo8.jpg    
    │  │      │      │  │      photo9.jpg    
    │  │      │      │  │      white-bg-1.png    
    │  │      │      │  │          
    │  │      │      │  ├─upload       
    │  │      │      │  │      1.mp4    
    │  │      │      │  │      bilibili.png    
    │  │      │      │  │      img1.jpg    
    │  │      │      │  │      sky.jpg    
    │  │      │      │  │      vertical-bg.png    
    │  │      │      │  │      video.png    
    │  │      │      │  │          
    │  │      │      │  ├─user       
    │  │      │      │  │      balabala.png    
    │  │      │      │  │      cb07adc2d2edede6689f1dfabe75bfa78f7f949d.jpg@150w_150h.jpg&quot    
    │  │      │      │  │      for.jpg    
    │  │      │      │  │      header-touming.png    
    │  │      │      │  │      hhh.jpeg    
    │  │      │      │  │      history.jpg    
    │  │      │      │  │      logo-white.png    
    │  │      │      │  │      page-bg.jpg    
    │  │      │      │  │      page-bg.png    
    │  │      │      │  │      personal-bgPic.jpg    
    │  │      │      │  │      profile.jpeg    
    │  │      │      │  │          
    │  │      │      │  └─video       
    │  │      │      │          cat.jpg    
    │  │      │      │              
    │  │      │      ├─js       
    │  │      │      │  │  bootstrap-3.3.7.js    
    │  │      │      │  │  bootstrap.js    
    │  │      │      │  │  bootstrap.min.js    
    │  │      │      │  │  jquery.js    
    │  │      │      │  │  npm.js    
    │  │      │      │  │      
    │  │      │      │  ├─administrator       
    │  │      │      │  │      adDomain.js    
    │  │      │      │  │      userList.js    
    │  │      │      │  │      videoList.js    
    │  │      │      │  │          
    │  │      │      │  ├─cookie       
    │  │      │      │  │      cookie.js    
    │  │      │      │  │      model.js    
    │  │      │      │  │          
    │  │      │      │  ├─header_footer       
    │  │      │      │  │      hide.js    
    │  │      │      │  │      main.js    
    │  │      │      │  │      plugins.js    
    │  │      │      │  │          
    │  │      │      │  ├─login_register    
    │  │      │      │  │      animation_particles.js    
    │  │      │      │  │      indexOnLoad.js    
    │  │      │      │  │      login.js    
    │  │      │      │  │      modernizr.custom.86080.js    
    │  │      │      │  │      register.js    
    │  │      │      │  │          
    │  │      │      │  ├─main       
    │  │      │      │  │      default.css    
    │  │      │      │  │      hide.js    
    │  │      │      │  │      jquery-1.8.3.min.js    
    │  │      │      │  │      jquery.js    
    │  │      │      │  │      jquery.SuperSlide.2.1.3.js    
    │  │      │      │  │      jquery.SuperSlide.2.1.3.source.js    
    │  │      │      │  │      jquery1.42.min.js    
    │  │      │      │  │      lazyload.min.js    
    │  │      │      │  │      main.js    
    │  │      │      │  │      top_slide.js    
    │  │      │      │  │          
    │  │      │      │  ├─search       
    │  │      │      │  │      search.js    
    │  │      │      │  │          
    │  │      │      │  └─user       
    │  │      │      │          attention.js    
    │  │      │      │          attention_info.json    
    │  │      │      │          bgColorChange.js    
    │  │      │      │          choosePosition.js    
    │  │      │      │          domain.js    
    │  │      │      │          favorite.js    
    │  │      │      │          favorite_info.json    
    │  │      │      │          history.js    
    │  │      │      │          history_info.json    
    │  │      │      │          json.js    
    │  │      │      │          message.js    
    │  │      │      │          message_info.json    
    │  │      │      │          position.js    
    │  │      │      │          user_info.json    
    │  │      │      │          view.js    
    │  │      │      │          visible-change-copy.js    
    │  │      │      │          visible-change.js    
    │  │      │      │          willN.js    
    │  │      │      │              
    │  │      │      ├─Models       
    │  │      │      │      Model.edmx.diagram    
    │  │      │      │          
    │  │      │      ├─Scripts       
    │  │      │      │      bootstrap.js    
    │  │      │      │      bootstrap.min.js    
    │  │      │      │      jquery-3.3.1.js    
    │  │      │      │      jquery-3.3.1.min.js    
    │  │      │      │      jquery-3.3.1.min.map    
    │  │      │      │      jquery-3.3.1.slim.js    
    │  │      │      │      jquery-3.3.1.slim.min.js    
    │  │      │      │      jquery-3.3.1.slim.min.map    
    │  │      │      │      jquery.validate.js    
    │  │      │      │      jquery.validate.min.js    
    │  │      │      │      jquery.validate.unobtrusive.js    
    │  │      │      │      jquery.validate.unobtrusive.min.js    
    │  │      │      │      modernizr-2.8.3.js    
    │  │      │      │          
    │  │      │      ├─video       
    │  │      │      │      1.mp4    
    │  │      │      │      img1.jpg    
    │  │      │      │      Tutorial.mp4    
    │  │      │      │      投稿.html    
    │  │      │      │          
    │  │      │      └─Views    
    │  │      │          │  Web.config       
    │  │      │          │  _ViewStart.cshtml    
    │  │      │          │      
    │  │      │          ├─Account       
    │  │      │          │      Index.cshtml    
    │  │      │          │      Login.cshtml    
    │  │      │          │      Register.cshtml    
    │  │      │          │          
    │  │      │          ├─Administrator       
    │  │      │          │      Index.cshtml    
    │  │      │          │      Videolist.cshtml    
    │  │      │          │          
    │  │      │          ├─Home       
    │  │      │          │      About.cshtml    
    │  │      │          │      Contact.cshtml    
    │  │      │          │      Index.cshtml    
    │  │      │          │          
    │  │      │          ├─Main       
    │  │      │          │      Index.cshtml    
    │  │      │          │      Search.cshtml    
    │  │      │          │      Upload.cshtml    
    │  │      │          │          
    │  │      │          ├─myError       
    │  │      │          │      Error403.cshtml    
    │  │      │          │      Error404.cshtml    
    │  │      │          │      Error500.cshtml    
    │  │      │          │      Index.cshtml    
    │  │      │          │          
    │  │      │          ├─Shared    
    │  │      │          │      Error.cshtml    
    │  │      │          │      _iVlogMainLayout.cshtml    
    │  │      │          │      _Layout.cshtml    
    │  │      │          │          
    │  │      │          ├─User       
    │  │      │          │      Attention.cshtml    
    │  │      │          │      Favorite.cshtml    
    │  │      │          │      History.cshtml    
    │  │      │          │      Index.cshtml    
    │  │      │          │      Message.cshtml    
    │  │      │          │      Other.cshtml    
    │  │      │          │      Setting.cshtml    
    │  │      │          │          
    │  │      │          └─Video       
    │  │      │                  Index.cshtml    
    │  │      │                      
    │  │      ├─ProfileTransformWebConfig       
    │  │      │  └─transformed    
    │  │      │      └─Views    
    │  │      ├─TempPE       
    │  │      │      Models.Model.Context.cs.dll    
    │  │      │      Models.Model.cs.dll    
    │  │      │      Models.Model.Designer.cs.dll    
    │  │      │          
    │  │      └─TransformWebConfig       
    │  │          ├─assist    
    │  │          │      Web.config    
    │  │          │          
    │  │          ├─original    
    │  │          │      Web.config    
    │  │          │          
    │  │          └─transformed    
    │  │              │  Web.config    
    │  │              │      
    │  │              └─Views    
    │  ├─Properties       
    │  │  │  AssemblyInfo.cs    
    │  │  │      
    │  │  └─PublishProfiles    
    │  │          CustomProfile.pubxml    
    │  │          CustomProfile.pubxml.user    
    │  │              
    │  ├─Scripts       
    │  │      bootstrap.js    
    │  │      bootstrap.min.js    
    │  │      jquery-3.3.1.intellisense.js    
    │  │      jquery-3.3.1.js    
    │  │      jquery-3.3.1.min.js    
    │  │      jquery-3.3.1.min.map    
    │  │      jquery-3.3.1.slim.js    
    │  │      jquery-3.3.1.slim.min.js    
    │  │      jquery-3.3.1.slim.min.map    
    │  │      jquery.validate-vsdoc.js    
    │  │      jquery.validate.js    
    │  │      jquery.validate.min.js    
    │  │      jquery.validate.unobtrusive.js    
    │  │      jquery.validate.unobtrusive.min.js    
    │  │      modernizr-2.8.3.js    
    │  │          
    │  ├─source       
    │  │  └─file    
    │  │      ├─a    
    │  │      │  └─100000    
    │  │      ├─c    
    │  │      │  ├─100024    
    │  │      │  ├─100025    
    │  │      │  ├─100026    
    │  │      │  ├─100027    
    │  │      │  └─100028    
    │  │      └─v    
    │  │          ├─100024    
    │  │          ├─100025    
    │  │          ├─100026    
    │  │          ├─100027    
    │  │          └─100028    
    │  ├─video       
    │  │      1.mp4    
    │  │      img1.jpg    
    │  │      Tutorial.mp4    
    │  │      投稿.html    
    │  │          
    │  └─Views       
    │      │  Web.config    
    │      │  _ViewStart.cshtml    
    │      │      
    │      ├─Account       
    │      │      Index.cshtml    
    │      │      Login.cshtml    
    │      │      Register.cshtml    
    │      │          
    │      ├─Administrator       
    │      │      Index.cshtml    
    │      │      Videolist.cshtml    
    │      │          
    │      ├─Home       
    │      │      About.cshtml    
    │      │      Contact.cshtml    
    │      │      Index.cshtml    
    │      │          
    │      ├─Main    
    │      │      Index.cshtml    
    │      │      Search.cshtml    
    │      │      Upload.cshtml    
    │      │          
    │      ├─myError       
    │      │      Error403.cshtml    
    │      │      Error404.cshtml    
    │      │      Error500.cshtml    
    │      │      Index.cshtml    
    │      │          
    │      ├─Shared       
    │      │      Error.cshtml    
    │      │      _iVlogMainLayout.cshtml    
    │      │      _Layout.cshtml    
    │      │          
    │      ├─User       
    │      │      Attention.cshtml    
    │      │      Favorite.cshtml    
    │      │      History.cshtml    
    │      │      Index.cshtml    
    │      │      Message.cshtml    
    │      │      Other.cshtml    
    │      │      Setting.cshtml    
    │      │          
    │      └─Video       
    │              Index.cshtml    
    │                  
    └─packages       
        ├─Antlr.3.5.0.2      
        │  │  Antlr.3.5.0.2.nupkg    
        │  │      
        │  └─lib    
        │          Antlr3.Runtime.dll    
        │          Antlr3.Runtime.pdb    
        │              
        ├─bootstrap.3.3.7       
        │  │  bootstrap.3.3.7.nupkg    
        │  │      
        │  └─content       
        │      ├─Content    
        │      │      bootstrap-theme.css    
        │      │      bootstrap-theme.css.map    
        │      │      bootstrap-theme.min.css    
        │      │      bootstrap-theme.min.css.map    
        │      │      bootstrap.css    
        │      │      bootstrap.css.map    
        │      │      bootstrap.min.css    
        │      │      bootstrap.min.css.map    
        │      │          
        │      ├─fonts       
        │      │      glyphicons-halflings-regular.eot    
        │      │      glyphicons-halflings-regular.svg    
        │      │      glyphicons-halflings-regular.ttf    
        │      │      glyphicons-halflings-regular.woff    
        │      │      glyphicons-halflings-regular.woff2    
        │      │          
        │      └─Scripts       
        │              bootstrap.js    
        │              bootstrap.min.js    
        │                  
        ├─EntityFramework.6.2.0       
        │  │  .signature.p7s    
        │  │  EntityFramework.6.2.0.nupkg    
        │  │      
        │  ├─content    
        │  │  └─net40       
        │  │          App.config.transform    
        │  │          Web.config.transform    
        │  │              
        │  ├─lib    
        │  │  ├─net40       
        │  │  │  │  EntityFramework.dll    
        │  │  │  │  EntityFramework.SqlServer.dll    
        │  │  │  │  EntityFramework.SqlServer.xml    
        │  │  │  │  EntityFramework.xml    
        │  │  │  │      
        │  │  │  └─zh-Hans    
        │  │  │          EntityFramework.resources.dll    
        │  │  │          EntityFramework.xml    
        │  │  │              
        │  │  └─net45       
        │  │      │  EntityFramework.dll    
        │  │      │  EntityFramework.SqlServer.dll    
        │  │      │  EntityFramework.SqlServer.xml    
        │  │      │  EntityFramework.xml    
        │  │      │      
        │  │      └─zh-Hans    
        │  │              EntityFramework.resources.dll    
        │  │              EntityFramework.xml    
        │  │                  
        │  └─tools    
        │          about_EntityFramework.help.txt    
        │          EntityFramework.PowerShell.dll    
        │          EntityFramework.PowerShell.Utility.dll    
        │          EntityFramework.psd1    
        │          EntityFramework.psm1    
        │          init.ps1    
        │          install.ps1    
        │          migrate.exe    
        │              
        ├─EntityFramework.zh-Hans.6.2.0       
        │  │  EntityFramework.zh-Hans.6.2.0.nupkg       
        │  │      
        │  └─lib       
        │      ├─net40       
        │      │  └─zh-Hans       
        │      │          EntityFramework.resources.dll    
        │      │          EntityFramework.xml    
        │      │              
        │      └─net45      
        │          └─zh-Hans      
        │                  EntityFramework.resources.dll    
        │                  EntityFramework.xml    
        │                      
        ├─jQuery.3.3.1       
        │  │  jQuery.3.3.1.nupkg    
        │  │      
        │  ├─Content    
        │  │  └─Scripts    
        │  │          jquery-3.3.1-vsdoc.js    
        │  │          jquery-3.3.1.js    
        │  │          jquery-3.3.1.min.js    
        │  │          jquery-3.3.1.min.map    
        │  │          jquery-3.3.1.slim.js    
        │  │          jquery-3.3.1.slim.min.js    
        │  │          jquery-3.3.1.slim.min.map    
        │  │              
        │  └─Tools       
        │          common.ps1    
        │          install.ps1    
        │          jquery-3.3.1.intellisense.js    
        │          uninstall.ps1    
        │              
        ├─jQuery.Validation.1.17.0    
        │  │  jQuery.Validation.1.17.0.nupkg    
        │  │      
        │  └─Content    
        │      └─Scripts    
        │              jquery.validate-vsdoc.js    
        │              jquery.validate.js    
        │              jquery.validate.min.js    
        │                  
        ├─Microsoft.AspNet.Mvc.5.2.4       
        │  │  Microsoft.AspNet.Mvc.5.2.4.nupkg    
        │  │      
        │  ├─Content    
        │  │      Web.config.install.xdt    
        │  │      Web.config.uninstall.xdt    
        │  │          
        │  └─lib    
        │      └─net45    
        │          │  System.Web.Mvc.dll    
        │          │  System.Web.Mvc.xml    
        │          │      
        │          └─zh-Hans    
        │                  System.Web.Mvc.resources.dll    
        │                  System.Web.Mvc.xml    
        │                      
        ├─Microsoft.AspNet.Mvc.zh-Hans.5.2.4       
        │  │  Microsoft.AspNet.Mvc.zh-Hans.5.2.4.nupkg       
        │  │      
        │  └─lib    
        │      └─net45    
        │          └─zh-Hans    
        │                  System.Web.Mvc.resources.dll    
        │                  System.Web.Mvc.xml    
        │                      
        ├─Microsoft.AspNet.Razor.3.2.4       
        │  │  Microsoft.AspNet.Razor.3.2.4.nupkg    
        │  │      
        │  └─lib    
        │      └─net45    
        │          │  System.Web.Razor.dll    
        │          │  System.Web.Razor.xml    
        │          │      
        │          └─zh-Hans    
        │                  System.Web.Razor.resources.dll    
        │                  system.web.razor.xml    
        │                      
        ├─Microsoft.AspNet.Razor.zh-Hans.3.2.4    
        │  │  Microsoft.AspNet.Razor.zh-Hans.3.2.4.nupkg    
        │  │      
        │  └─lib    
        │      └─net45    
        │          └─zh-Hans    
        │                  System.Web.Razor.resources.dll    
        │                  system.web.razor.xml    
        │                      
        ├─Microsoft.AspNet.Web.Optimization.1.1.3    
        │  │  Microsoft.AspNet.Web.Optimization.1.1.3.nupkg    
        │  │         
        │  └─lib       
        │      └─net40        
        │          │  System.Web.Optimization.dll        
        │          │  system.web.optimization.xml    
        │          │      
        │          └─zh-Hans    
        │                  System.Web.Optimization.resources.dll    
        │                      
        ├─Microsoft.AspNet.Web.Optimization.zh-Hans.1.1.3       
        │  │  Microsoft.AspNet.Web.Optimization.zh-Hans.1.1.3.nupkg    
        │  │      
        │  └─lib    
        │      └─net40    
        │          └─zh-Hans    
        │                  System.Web.Optimization.resources.dll    
        │                      
        ├─Microsoft.AspNet.WebPages.3.2.4    
        │  │  Microsoft.AspNet.WebPages.3.2.4.nupkg    
        │  │      
        │  ├─Content       
        │  │      Web.config.install.xdt    
        │  │      Web.config.uninstall.xdt    
        │  │          
        │  └─lib    
        │      └─net45       
        │          │  System.Web.Helpers.dll    
        │          │  System.Web.Helpers.xml    
        │          │  System.Web.WebPages.Deployment.dll    
        │          │  System.Web.WebPages.Deployment.xml    
        │          │  System.Web.WebPages.dll    
        │          │  System.Web.WebPages.Razor.dll    
        │          │  System.Web.WebPages.Razor.xml    
        │          │  System.Web.WebPages.xml    
        │          │      
        │          └─zh-Hans    
        │                  System.Web.Helpers.resources.dll    
        │                  system.web.helpers.xml    
        │                  System.Web.WebPages.Deployment.resources.dll    
        │                  system.web.webpages.deployment.xml    
        │                  System.Web.WebPages.Razor.resources.dll    
        │                  system.web.webpages.razor.xml    
        │                  System.Web.WebPages.resources.dll    
        │                  system.web.webpages.xml    
        │                      
        ├─Microsoft.AspNet.WebPages.zh-Hans.3.2.4    
        │  │  Microsoft.AspNet.WebPages.zh-Hans.3.2.4.nupkg    
        │  │      
        │  └─lib    
        │      └─net45    
        │          └─zh-Hans    
        │                  System.Web.Helpers.resources.dll    
        │                  system.web.helpers.xml    
        │                  System.Web.WebPages.Deployment.resources.dll    
        │                  system.web.webpages.deployment.xml    
        │                  System.Web.WebPages.Razor.resources.dll    
        │                  system.web.webpages.razor.xml    
        │                  System.Web.WebPages.resources.dll    
        │                  system.web.webpages.xml    
        │                      
        ├─Microsoft.CodeDom.Providers.DotNetCompilerPlatform.2.0.0       
        │  │  .signature.p7s    
        │  │  Microsoft.CodeDom.Providers.DotNetCompilerPlatform.2.0.0.nupkg    
        │  │      
        │  ├─build    
        │  │  ├─net45    
        │  │  │      Microsoft.CodeDom.Providers.DotNetCompilerPlatform.Extensions.props    
        │  │  │      Microsoft.CodeDom.Providers.DotNetCompilerPlatform.props    
        │  │  │          
        │  │  └─net46    
        │  │          Microsoft.CodeDom.Providers.DotNetCompilerPlatform.Extensions.props    
        │  │          Microsoft.CodeDom.Providers.DotNetCompilerPlatform.props    
        │  │              
        │  ├─content    
        │  │  ├─net45    
        │  │  │      app.config.install.xdt    
        │  │  │      app.config.uninstall.xdt    
        │  │  │      web.config.install.xdt    
        │  │  │      web.config.uninstall.xdt    
        │  │  │          
        │  │  └─net46    
        │  │          app.config.install.xdt    
        │  │          app.config.uninstall.xdt    
        │  │          web.config.install.xdt    
        │  │          web.config.uninstall.xdt    
        │  │              
        │  ├─lib    
        │  │  └─net45    
        │  │          Microsoft.CodeDom.Providers.DotNetCompilerPlatform.dll    
        │  │          Microsoft.CodeDom.Providers.DotNetCompilerPlatform.xml    
        │  │              
        │  └─tools    
        │      ├─net45    
        │      │      install.ps1    
        │      │      uninstall.ps1    
        │      │          
        │      ├─Roslyn45    
        │      │      csc.exe    
        │      │      csc.exe.config    
        │      │      csc.rsp    
        │      │      csi.exe    
        │      │      csi.rsp    
        │      │      Microsoft.Build.Tasks.CodeAnalysis.dll    
        │      │      Microsoft.CodeAnalysis.CSharp.dll    
        │      │      Microsoft.CodeAnalysis.CSharp.Scripting.dll    
        │      │      Microsoft.CodeAnalysis.dll    
        │      │      Microsoft.CodeAnalysis.Scripting.dll    
        │      │      Microsoft.CodeAnalysis.VisualBasic.dll    
        │      │      Microsoft.CSharp.Core.targets    
        │      │      Microsoft.DiaSymReader.Native.amd64.dll    
        │      │      Microsoft.DiaSymReader.Native.x86.dll    
        │      │      Microsoft.VisualBasic.Core.targets    
        │      │      System.AppContext.dll    
        │      │      System.Collections.Immutable.dll    
        │      │      System.Diagnostics.StackTrace.dll    
        │      │      System.IO.FileSystem.dll    
        │      │      System.IO.FileSystem.Primitives.dll    
        │      │      System.Reflection.Metadata.dll    
        │      │      vbc.exe    
        │      │      vbc.exe.config    
        │      │      vbc.rsp    
        │      │      VBCSCompiler.exe    
        │      │      VBCSCompiler.exe.config    
        │      │          
        │      └─RoslynLatest    
        │              csc.exe    
        │              csc.exe.config    
        │              csc.rsp    
        │              csi.exe    
        │              csi.exe.config    
        │              csi.rsp    
        │              Microsoft.Build.Tasks.CodeAnalysis.dll    
        │              Microsoft.CodeAnalysis.CSharp.dll    
        │              Microsoft.CodeAnalysis.CSharp.Scripting.dll    
        │              Microsoft.CodeAnalysis.dll    
        │              Microsoft.CodeAnalysis.Scripting.dll    
        │              Microsoft.CodeAnalysis.VisualBasic.dll    
        │              Microsoft.CSharp.Core.targets    
        │              Microsoft.DiaSymReader.Native.amd64.dll    
        │              Microsoft.DiaSymReader.Native.x86.dll    
        │              Microsoft.Managed.Core.targets    
        │              Microsoft.VisualBasic.Core.targets    
        │              System.AppContext.dll    
        │              System.Collections.Immutable.dll    
        │              System.Console.dll    
        │              System.Diagnostics.FileVersionInfo.dll    
        │              System.Diagnostics.StackTrace.dll    
        │              System.IO.Compression.dll    
        │              System.IO.FileSystem.dll    
        │              System.IO.FileSystem.Primitives.dll    
        │              System.IO.Pipes.AccessControl.dll    
        │              System.IO.Pipes.dll    
        │              System.Reflection.Metadata.dll    
        │              System.Security.AccessControl.dll    
        │              System.Security.Claims.dll    
        │              System.Security.Cryptography.Algorithms.dll    
        │              System.Security.Cryptography.Encoding.dll    
        │              System.Security.Cryptography.Primitives.dll    
        │              System.Security.Cryptography.X509Certificates.dll    
        │              System.Security.Principal.Windows.dll    
        │              System.Text.Encoding.CodePages.dll    
        │              System.ValueTuple.dll    
        │              System.Xml.ReaderWriter.dll    
        │              System.Xml.XmlDocument.dll    
        │              System.Xml.XPath.dll    
        │              System.Xml.XPath.XDocument.dll    
        │              vbc.exe    
        │              vbc.exe.config    
        │              vbc.rsp    
        │              VBCSCompiler.exe    
        │              VBCSCompiler.exe.config    
        │                  
        ├─Microsoft.jQuery.Unobtrusive.Validation.3.2.4       
        │  │  Microsoft.jQuery.Unobtrusive.Validation.3.2.4.nupkg    
        │  │      
        │  └─Content    
        │      └─Scripts    
        │              jquery.validate.unobtrusive.js    
        │              jquery.validate.unobtrusive.min.js    
        │                  
        ├─Microsoft.Web.Infrastructure.1.0.0.0       
        │  │  Microsoft.Web.Infrastructure.1.0.0.0.nupkg    
        │  │      
        │  └─lib    
        │      └─net40    
        │              Microsoft.Web.Infrastructure.dll    
        │                  
        ├─Modernizr.2.8.3       
        │  │  Modernizr.2.8.3.nupkg    
        │  │      
        │  ├─Content    
        │  │  └─Scripts    
        │  │          modernizr-2.8.3.js    
        │  │              
        │  └─Tools    
        │          common.ps1    
        │          install.ps1    
        │          uninstall.ps1    
        │              
        ├─Newtonsoft.Json.11.0.1    
        │  │  LICENSE.md    
        │  │  Newtonsoft.Json.11.0.1.nupkg    
        │  │      
        │  └─lib    
        │      ├─net20    
        │      │      Newtonsoft.Json.dll    
        │      │      Newtonsoft.Json.xml    
        │      │          
        │      ├─net35    
        │      │      Newtonsoft.Json.dll    
        │      │      Newtonsoft.Json.xml    
        │      │          
        │      ├─net40    
        │      │      Newtonsoft.Json.dll    
        │      │      Newtonsoft.Json.xml    
        │      │          
        │      ├─net45    
        │      │      Newtonsoft.Json.dll    
        │      │      Newtonsoft.Json.xml    
        │      │          
        │      ├─netstandard1.0    
        │      │      Newtonsoft.Json.dll    
        │      │      Newtonsoft.Json.xml    
        │      │          
        │      ├─netstandard1.3    
        │      │      Newtonsoft.Json.dll    
        │      │      Newtonsoft.Json.xml    
        │      │          
        │      ├─netstandard2.0    
        │      │      Newtonsoft.Json.dll    
        │      │      Newtonsoft.Json.xml    
        │      │          
        │      ├─portable-net40%2Bsl5%2Bwin8%2Bwp8%2Bwpa81    
        │      │      Newtonsoft.Json.dll    
        │      │      Newtonsoft.Json.xml    
        │      │          
        │      └─portable-net45%2Bwin8%2Bwp8%2Bwpa81    
        │              Newtonsoft.Json.dll    
        │              Newtonsoft.Json.xml    
        │                  
        ├─Oracle.ManagedDataAccess.18.3.0    
        │  │  .signature.p7s    
        │  │  info.txt    
        │  │  Oracle.ManagedDataAccess.18.3.0.nupkg    
        │  │  readme.txt    
        │  │      
        │  ├─bin    
        │  │  ├─x64    
        │  │  │      Oracle.ManagedDataAccessDTC.dll    
        │  │  │      Oracle.ManagedDataAccessIOP.dll    
        │  │  │          
        │  │  └─x86    
        │  │          Oracle.ManagedDataAccessDTC.dll    
        │  │          Oracle.ManagedDataAccessIOP.dll    
        │  │              
        │  ├─content    
        │  │  └─net40    
        │  │          App.config.install.xdt    
        │  │          App.config.transform    
        │  │          App.config.uninstall.xdt    
        │  │          Web.config.install.xdt    
        │  │          Web.config.transform    
        │  │          Web.config.uninstall.xdt    
        │  │              
        │  └─lib    
        │      └─net40    
        │              Oracle.ManagedDataAccess.dll    
        │                  
        ├─Oracle.ManagedDataAccess.EntityFramework.18.3.0    
        │  │  .signature.p7s    
        │  │  info.txt    
        │  │  Oracle.ManagedDataAccess.EntityFramework.18.3.0.nupkg    
        │  │  readme.txt    
        │  │      
        │  ├─content    
        │  │  └─net45    
        │  │          App.config.install.xdt    
        │  │          App.config.uninstall.xdt    
        │  │          Web.config.install.xdt    
        │  │          Web.config.uninstall.xdt    
        │  │              
        │  └─lib    
        │      └─net45    
        │              Oracle.ManagedDataAccess.EntityFramework.dll    
        │                  
        └─WebGrease.1.6.0    
            │  WebGrease.1.6.0.nupkg    
            │      
            ├─lib    
            │      WebGrease.dll    
            │          
            └─tools    
                    WG.EXE    
 ```
