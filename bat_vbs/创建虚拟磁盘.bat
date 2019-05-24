@echo off
md D:\RECYCLED\UDrives.{25336920-03F9-11CF-8FD0-00AA00686F13}>NUL
if exist X:\NUL goto delete
subst X: D:\RECYCLED\UDrives.{25336920-03F9-11CF-8FD0-00AA00686F13}
start X:\
goto end
:delete
subst /D X:
:end
