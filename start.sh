#!/bin/bash
source $HOME/.bash_profile
pm2 start pnpm --name "admin" -- start
