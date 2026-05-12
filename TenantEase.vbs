Set objShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

' Get the folder where this script lives
strDir = objFSO.GetParentFolderName(WScript.ScriptFullName)

' Kill any old node processes first
objShell.Run "taskkill /f /im node.exe", 0, True

' Wait 1 second
WScript.Sleep 1000

' Start Backend
objShell.Run "cmd /k ""cd /d """ & strDir & "\backend"" && npm run dev""", 1, False

' Wait 8 seconds for backend to boot
WScript.Sleep 8000

' Start Frontend
objShell.Run "cmd /k ""cd /d """ & strDir & "\app"" && npm run dev""", 1, False

' Wait 12 seconds for Vite to compile
WScript.Sleep 12000

' Open browser
objShell.Run "http://localhost:5173"

WScript.Echo "TenantEase is running!" & vbCrLf & vbCrLf & "Backend: http://localhost:3000" & vbCrLf & "Frontend: http://localhost:5173" & vbCrLf & vbCrLf & "Login: manager@tenantease.com" & vbCrLf & "Password: password123"
