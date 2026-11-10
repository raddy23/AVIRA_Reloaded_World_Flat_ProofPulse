$ErrorActionPreference='Stop'
Set-Location $PSScriptRoot
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Node.js 20+ is required. Install Node.js LTS first.' }
Write-Host 'Running ProofPulse verification tests...'
& npm.cmd test
if($LASTEXITCODE -ne 0){ throw 'Tests failed. Server was not started.' }
Write-Host 'Starting ProofPulse at http://localhost:8081 (open in Edge/Chrome). Use Ctrl+C to stop.'
& npm.cmd start
