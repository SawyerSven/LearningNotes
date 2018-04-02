# [git 常用操作总结](https://juejin.im/post/5a2cdfe26fb9a0452936b07f)

- HEAD: 当前commit引用

- git version # -> git版本

- git branch # -> 查看本地所有分支

- git branch -r # -> 查看远程所有分支

- git branch -a # -> 查看所有远程分支和本地分支

- git branch -d <branchname> # -> 删除本地branchname分支

- git branche -m brancholdname branchnewname # -> 重命名分支

- git branch <branchename> # -> 创建branchname分支

- git checkout <branchname> # -> 切换分支到branchname

- git checkout - b <branchname> # -> 等同于执行商量不，即创建新的分支并切换到该分支

- git checkout -- xx/xx # -> 回滚单个文件

- git pull origin master:master # -> 将远程origin主机的master分支合并到当前的master分支，冒号后面部分代表当前本地所在分支

- git push origin -d <branchname> # -> 删除远程branchname分支

- git fetch --p # -> 更新分支

- git status # ->查看仓库状态

- git add xx # -> 把xx文件添加到暂存区

- git commit -m '' # -> 提交文件 -m后面是注释(不建议使用)

- git commit -am(-a -m) # -> 提交所有的修改，等同于上两步(不建议使用)

- git commit ./xx # -> 等同于git add ./xx + git commit (建议使用)

- git commit --amend # -> 将暂存区和当前commit 合并创建一个新的commit 去替换当前commit

- git stash # -> 把当前的工作隐藏起来 等以后回复现场后继续工作

- git stash pop # -> 恢复工作现场

- git fetch --all # -> 将远程主机的更新全部取回本地

- git merge origin/master # -> 在本地(当前)分支上合并远程分支

- git merge --abort # -> 终止本次merge,并回到merge前的状态

- git pull origim master # ->从远程获取最新版本并merge到本地等同于git fetch + git merge

- git push origin master # -> 将本地master分支推送到远程origin主机的master分支

- git log xx # -> 查看xx文件的commit 记录

- git log -p xx # -> 查看xx文件每次提交的diff

- git log --pretty=online xx # -> 查看xx文件的提交历史(只显示哈希值和提交说明)

- git log --pretty=raw # -> 查看commit之间的父子关系(root commit是没有父提交的)

- git log --graph #-> 查看当前分支commit生成的树状图

- git diff HEAD HEAD^1 -- XX # -> 查看xx文件不同版本之间的差异

- git diff HEAD~1 # -> 显示父节点的提交


### git中'~'和'^'的区别

(<commit>|HEAD)^n , 指的是HEAD的第n个父提交，可以通过在^后面跟上一个数字，表示是第几个父提交。"^"相当"^1"。例如：HEAD^2表示HEAD的第二次父提交。(<commit|HEAD>)~n,指的是HEAD的第n个祖先提交，可以通过在'~'后面跟上一个数字，表示第几个祖父提交，"~"相当于"~1","~n"相当于连续的<n>个"^"。

等式1： HEAD~ === HEAD ^ === HEAD^1

等式2： HEAD~2 === HEAD^^ === HEAD^1^1


- git diff --staged/--cached # -> 显示暂存区和上一次提交的不同。

- git show --stat # -> 查看最后一次的修改

- git show HEAD # -> 查看指定版本的修改(可省略HEAD，默认当前版本)

- git show HEAD xxx -> 查看置顶版本xx文件的修改(可省略HEAD，默认当前版本)

- git reset --hard HEAD # ->回滚到指定版本，同时清空工作目录的所有改动

- git reset --soft HEAD # ->　回滚到指定版本，同事保留工作目录和暂存区的内容，并把重置的位置所导致的新文件差异放进暂存区

- git reset --mixed HEAD # -> 回滚到指定版本，同时保留工作目录的内容，并清空暂存区。

- git reset --hard origin/master  # -> 将本地master与远程master同步

- git remote show origin # -> 查看remote地址，远程分支还有本地分支之间相对应关系等。

- git remote prune origin # -> 删除那些远程仓库不存在的分支 === git fetch -p

- git config # -> 查看和编辑GIT的配置

#### 查看

- 格式： git config [--local|--global|--system] -l

- git config --local -l # -> 查看仓库级的config

- git config --global -l # -> 查看全局级的config

#### 编辑

- 格式： git config [--local|--global|--system] -e

- git config --local -e # -> 编辑机仓库级的config

- git config --global -e # -> 编辑机全局级的config

#### 修改

- 格式: git config [--local|--global|--system] section.key value

- git config --local push.default 'simple' # ->修改仓库级的push.default的默认行为

- git config --global push-default 'current' # -> 修改全局级的push.default的默认行为

#### 增加

- 格式: git config [--local|--global|--system] --add section.key value(默认是添加在local配置中)

- git config --add cat.name songhw # -> local配置写入 cat.name = songhw

- git config --local --add cate.name songhw # -> 等同于上一步

- git config --global --add cat.name lhammer # -> global配置写入cat.name = lhammer

#### 获取

- 格式：git config [--local|--global|--system] --get section.key(默认是获取local配置中内容)

- git config --get cat.name # -> 输出songhw

- git config --local --get cat.name # -> 同上

- git config --global --get cat.name # -> 输出lhammer

#### 删除

- git config [--local|--global|--system] --unset section.key

- git config --local --unset cat.name 

- git config --global --unset cat.name # -> 删除local配置中的cat.name = lhammer


- git rebase master # -> 在当前分支对master进行rebase

- git rebase -i 目标commit  # -> 修改历史某一次提交

- git rebase --continue 接上一步修改完之后 继续rebase

- git rebase --onto HEAD HEAD^1 <branchname> # -> 撤销指定的commit,即消失在历史中

- git push origin <branchname> -f # -> 忽略冲突 强制提交

- git revert HEAD # -> 撤销指定的commit

### git revert 和 git rebase --onto的区别

git revert会增加一条新的commit,他的内容与指commit的修改时相反的，两次相互抵消从而达到撤销的效果，并且在commit历史中，会存在两条提交，一条原始commit,一条它反转commit,而git rebase --onto是直接将commit从历史记录中珊瑚虫。

