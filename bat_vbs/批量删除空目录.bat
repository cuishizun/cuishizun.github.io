@echo off

echo ���ڲ��ҿ�Ŀ¼�����Ե�...

for %%i in (c d) do (

if exist %%i:\ (

for /f "delims=" %%a in ('dir /ad /b /s "%%i:\"^|sort /r') do (

rd "%%a">nul 2>nul &&echo ��Ŀ¼"%%a"�ɹ�ɾ����

)

)

)

pause
