git diff  改变了哪些东西
git merge 分支名字   合并分支的更新内容




想要.gitignore 忽略某个文件
        首先需要远程仓库没有管理这个文件
            其次把这个文件从本地仓库删除
                例如 git  rm -r --cached .idea
                    然后更改.gitignore   查看 状态  git status
                        添加到缓存  git add .gitignore
                        添加到本地仓库 git commit -am "更新gitignore"
                        最后面推送这个操作  就可以了