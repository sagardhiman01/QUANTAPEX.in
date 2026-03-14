@echo off
cd /d c:\Users\User\Downloads\portfolio
cloudflared tunnel --url http://localhost:5173 > cloudflared.log 2> cloudflared.err

