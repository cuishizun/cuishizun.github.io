@echo off

reg add "HKEY_CLASSES_ROOT\.vbs\ShellNew" /v nullfile /t reg_sz /d "" /f

reg add "HKEY_CLASSES_ROOT\.vbs\ShellNew" /v FileName /t reg_expand_sz /d "" /f

pause>Nul