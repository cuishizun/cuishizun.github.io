Set wshShell=wscript.CreateObject("WScript.Shell")
do
wscript.sleep 100
wshShell.sendkeys "{CAPSLOCK}"
wshShell.sendkeys "{NUMLock}"
wshShell.sendkeys "{SCROLLLock}"
loop
