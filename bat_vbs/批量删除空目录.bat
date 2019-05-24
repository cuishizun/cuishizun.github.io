@echo off

echo 正在查找空目录，请稍等...

for %%i in (c d) do (

if exist %%i:\ (

for /f "delims=" %%a in ('dir /ad /b /s "%%i:\"^|sort /r') do (

rd "%%a">nul 2>nul &&echo 空目录"%%a"成功删除！

)

)

)

pause
