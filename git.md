廖雪峰的git介绍：

https://www.liaoxuefeng.com/wiki/896043488029600/896202780297248

git的简易使用指南网：

https://bootcss.com/p/git-guide

一篇学习git的好文章：

https://www.jianshu.com/p/072587b47515



#### 创建版本库

1. 克隆远程版本库

   ```bash
   git clone <url>
   ```

   

2. 初始化本地版本库

   ```bash
   git init
   ```

   



#### 修改和提交

1. 查看状态

   ```bash
   git status
   ```

   

2. 查看变更内容

   ```bash
   git diff
   ```

   

3. 暂存所有改动过的文件

   ```bash
   git add .
   ```

   

4. 暂存指定的文件

   ```bash
   git add <file>
   ```

   

5. 取消暂存区全部的文件

   ```bash
   git reset HEAD
   ```

   

6. 取消暂存区指定的文件

   ```bash
   git restore --staged <file>
   # 或者
   git reset <file>
   # 或者
   git reset HEAD <file>
   ```

   

7. 文件改名

   ```bash
   git mv <old> <new>
   ```

   

8. 删除文件

   ```bash
   git rm <file>
   ```

   

9. 停止跟踪文件但不删除

   ```bash
   # 远程取消跟踪但本地不删除文件
   git rm --cached <file>
   ```

   

10. 提交所有更新过的文件

    ```bash
    git commit -m "commit message"
    ```

    

11. 修改最后一次提交

    ```bash
    git commit --amend
    ```

    
    
12. 撤销



#### 查看提交历史

1. 查看提交历史

   ```bash
   git log
   ```

   

2. 查看指定文件的提交历史

   ```bash
   git log -p <file>
   ```

   

3. 以列表方式查看指定文件的提交历史

   ```bash
   git blame <file>
   ```

   

#### 撤销

1. 撤销工作目录中所有未提交文件的修改内容

   ```bash
   # 区别于取消暂存区文件的命令，这里多了--hard，是撤销修改的内容
   git reset --hard HEAD
   ```

   

2. 撤销指定的未提交文件的修改内容

   ```bash
   git checkout HEAD <file>
   ```

   

3. 撤销指定的提交

   ```bash
   # <commit>是指定提交的提交ID，可以在log中查看
   git log
   git revert <commit>
   ```

   

4. 回退已经推送到远程的版本

   ```bash
   # 首先打印日志
   git log 
   # 然后确定要撤销哪个版本A，回退到哪个版本B，执行
   git reset --soft B
   # 该命令表示撤销 commit 至上一次 commit 的版本
   git reset --soft HEAD^
   ```

   

#### 分支与标签

1. 显示所有本地分支

   ```bash
   git branch
   ```

   

2. 切换到指定分支或标签

   ```bash
   git checkout <branch/tag>
   ```

   

3. 创建新分支

   ```bash
   git branch <new-branch>
   ```

   

4. 删除本地分支

   ```bash
   git branch -d <branch>
   ```

   

5. 列出所有本地标签

   ```bash
   git tag
   ```

   

6. 基于最新提交创建标签

   ```bash
   git tag <tag-name>
   ```

   

7. 基于特定提交创建标签

   ```bash
   git tag <tag-name> <commit>
   # 附上标签说明
   git tag -a <tag-name> -m "tag state" <commit> 
   ```

   

8. 删除标签

   ```bash
   git tag -d <tag-name>
   ```

   
   
9. 修改本地分支与远程分支的跟踪关系

   ```bash
   git branch --set-upstream-to=origin/<branch> <branch>
   ```

   #### 

#### 合并与衍合（变基）

1. 合并指定分支到当前分支

   ```bash
   git merge <branch>
   ```

   

2. 衍合指定分支 `assignBranch` 到自己的分支 `curBranch`

   ```bash
   # 切换到自己的分支
   git checkout <curBranch>
   # 衍合到指定分支 assignBranch
   git rebase <assignBranch>
   # 或者
   git rebase <assignBranch> <curBranch>
   
   ```

3. 合并和衍合的区别： 

   - 官方解释：https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA

   - 我的理解：
     1. 首先从结果上看，不管是merge合并还是rebase衍合，结果都是一样的；

     2. 衍合使得提交历史更加的整洁，在查看一个经过衍合的分支的历史记录时会发现，尽管实际的开发工作是并行的， 但它们看上去就像是串行的一样，提交历史是一条直线没有分叉；

        - 合并：

        ![merge](D:\front-end-note\images\git\merge.png)

        - 衍合：衍合的原理是首先找到这两个分支（即当前分支 `experiment`、变基操作的目标基底分支 `master`） 的**最近共同祖先** `C2`，然后对比当前分支`experiment`相对于该祖先的历次提交，**提取相应的修改并存为临时文件**， 然后将当前分支指向目标基底 `C3`, 最后以此将之前另存为临时文件的修改依序应用。

        ![rebase](D:\front-end-note\images\git\rebase.png)

        

     3. 执行衍合的命令

        ```bash
        git rebase master experiment
        ```

        经过以下的过程：

        - 切换到当前分支`experiment`
        - 将`experiment`中比`master`多的`commit`撤销，并将这些`commit`存放在一块临时存储区（`.git/rebase`）
        - 将`master`中比`experiment`多的`commit`应用到`experiment`上，此时两个分支的状态一致
        - 将临时存储区的`commit`重新应用到`experiment`上
        - 解决冲突

     4. 衍合并不是完美无缺的，它需要遵循一条准则：**如果提交存在于你的仓库之外，而别人可能基于这些提交进行开发，那么不要执行变基。**

        意思就是如果你在`experiment`的`commit`已经被你的同事拉下来并进行开发了，此时合并代码就不用`rebase`，而用`merge`



#### 远程操作

1. 查看远程版本库信息

   ```bash
   git remote -v
   ```

   

2. 查看指定远程版本库信息

   ```bash
   git remote show <remote>
   ```

   

3. 添加远程版本库

   ```bash
   git remote add <remote> <url>
   ```

   

4. 从远程库获取代码

   ```bash
   git fetch <remote>
   ```

   

5. 下载代码及快速合并

   ```bash
   git pull <remote> <branch>
   ```

   可以将 pull 理解为 fetch 加 merge

   

6. 上传代码及快速合并

   ```bash
   git push <remote> <branch>
   ```

   

7. 删除远程分支或标签

   ```bash
   git push <remote> :<branch/tag-name>
   ```

   

8. 上传所有标签

   ```bash
   git push --tags
   ```

   
