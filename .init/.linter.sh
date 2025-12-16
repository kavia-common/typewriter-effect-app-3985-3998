#!/bin/bash
cd /tmp/kavia/workspace/code-generation/typewriter-effect-app-3985-3998/typewriter_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

