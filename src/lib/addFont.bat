@echo off
PowerShell Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Bypass
PowerShell -command "& '%~dp0add-font2.ps1' -path '%~dp0..\..\_tmp\Roboto-Black.ttf'"