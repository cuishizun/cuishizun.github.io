@ECHO OFF

title Folder Private

if EXIST "Control Panel.{21EC2020-3AEA-1069-A2DD-08002B30309D}" goto UNLOCK

if NOT EXIST Private goto MDLOCKER

:CONFIRM

echo ��ȷ��Ҫ���ļ���������(Y/N)

set/p "cho=>"

if %cho%==Y goto LOCK

if %cho%==y goto LOCK

if %cho%==n goto END

if %cho%==N goto END

echo ��Чѡ��

goto CONFIRM

:LOCK

ren Private "Control Panel.{21EC2020-3AEA-1069-A2DD-08002B30309D}"

attrib +h +s "Control Panel.{21EC2020-3AEA-1069-A2DD-08002B30309D}"

echo �ļ�����������

goto End

:UNLOCK

echo ���������Է��ʸ��ļ��У�

set/p "pass=>"

if NOT %pass%== 123 goto FAIL

attrib -h -s "Control Panel.{21EC2020-3AEA-1069-A2DD-08002B30309D}"

ren "Control Panel.{21EC2020-3AEA-1069-A2DD-08002B30309D}" Private

echo �ɹ�������

goto End

:FAIL

echo ������Ч��

goto end

:MDLOCKER

md Private

echo �ɹ�������

goto End

:End
