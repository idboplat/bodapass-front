#!/bin/bash
source $HOME/.bash_profile
pm2 start pnpm --name "client" -- start -p "3050"
