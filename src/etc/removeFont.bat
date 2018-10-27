@echo off
@echo font name is(bat) %1 
PowerShell Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Bypass
PowerShell -command  "& '%~dp0remove-font.ps1' -file '%1'"