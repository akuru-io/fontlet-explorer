@echo off
@echo path of thr font file or folder %1 
PowerShell Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Bypass
PowerShell -command "& '%~dp0add-font.ps1' -path '%~dp0%1%'"