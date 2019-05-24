Dim Name,Msg
Name= "ÎÒ°®ÂÞ"
Msg = "Hellow£¡"
set ws=wscript.createobject("wscript.shell")
ws.Run "mshta vbscript:ClipboardData.SetData("&chr(34)&"text"&chr(34)&"," &Chr(34)& Name&Chr(34)& ")(close)",0,True
ws.sendKeys "^%w"
ws.appactivate ""
wscript.sleep 500
ws.sendKeys "^f"
wscript.sleep 500
ws.sendKeys "^v"
wscript.sleep 500
ws.sendKeys "{ENTER}"
wscript.sleep 200
ws.sendKeys "{TAB}"
wscript.sleep 200
ws.sendKeys "{ENTER}"
ws.Run "mshta vbscript:ClipboardData.SetData("&chr(34)&"text"&chr(34)&"," &Chr(34)& Msg &Chr(34)& ")(close)",0,True
wscript.sleep 200
ws.sendKeys "^v"
wscript.sleep 300
ws.sendKeys "{ENTER}"
