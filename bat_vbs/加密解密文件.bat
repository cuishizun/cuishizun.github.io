@ECHO OFF

title Folder Private

if EXIST "Control Panel.{21EC2020-3AEA-1069-A2DD-08002B30309D}" goto UNLOCK

if NOT EXIST Private goto MDLOCKER

:CONFIRM

echo 你确定要给文件夹上锁吗？(Y/N)

set/p "cho=>"

if %cho%==Y goto LOCK

if %cho%==y goto LOCK

if %cho%==n goto END

if %cho%==N goto END

echo 无效选择。

goto CONFIRM

:LOCK

ren Private "Control Panel.{21EC2020-3AEA-1069-A2DD-08002B30309D}"

attrib +h +s "Control Panel.{21EC2020-3AEA-1069-A2DD-08002B30309D}"

echo 文件夹已上锁。

goto End

:UNLOCK

echo 输入密码以访问该文件夹：

set/p "pass=>"

if NOT %pass%== 123 goto FAIL

attrib -h -s "Control Panel.{21EC2020-3AEA-1069-A2DD-08002B30309D}"

ren "Control Panel.{21EC2020-3AEA-1069-A2DD-08002B30309D}" Private

echo 成功解锁。

goto End

:FAIL

echo 密码无效。

goto end

:MDLOCKER

md Private

echo 成功上锁。

goto End

:End
