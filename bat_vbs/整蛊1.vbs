text()
function text()
dim a
a=InputBox("请大声说出我是猪！")
if a="我是猪" then
Msgbox"哈哈哈，我也觉得你是猪！",0,"恭喜"
else
Msgbox"不行，你一定要说我是猪！",0,"再来一次"
text()
end if
end function
