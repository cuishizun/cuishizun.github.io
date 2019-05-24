::制定起始文件夹 想换盘更换D:\这个就好
set DIR="D:\"
::想换格式就更换*.mp4这个后缀就好(任何后缀都可以)
for /R %DIR% %%f in (*.MP4) do (
 echo %%f
)
pause