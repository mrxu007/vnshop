my first blog

    vue base {
        指令,
        模板,
        自定义指令,
        请求api的方式 {
            ajax,
            resource (vue的创始人已经停止对vue-resource维护) {
                可以直接使用jsonp get post
            },
            axios (功能于resource类似) {
                get post 不能直接使用 需要安装jsonp模块
            }
        },
        vue项目 {
            技术栈 {
                vuejs 2.0,
                nodejs
                express 是nodejs的一套框架
                mongondb
                redis
                jwt 权限验证
                passport 密码验证
            },
            第一个阶段
                express 简单的业务逻辑
            第二个阶段
                完全是在企业中应援  (来重构第一个阶段讲的)

            最后上线
                在Linux 那个 nginx
                解决多个不同端口跨域问题
        }
    }
    git命令 {
        github先创建仓库(有的话就不用操作)
        本地创建仓库文件  进入文件 右击点击git bach
                        git init   文件初始化
                        git status 查看文件当前状态
                        git remote add origin 仓库地址(更换仓库地址  不更换的话不操作)
                        git add . 添加全部本地文件
                        git commit -am "给一个备注名字"
                        git push origin master 推送到远程操作  需要登录密码


        本地配置ssh免密登录
            ssh-keygen -t rsa -C "邮箱"
    }