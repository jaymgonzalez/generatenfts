#!/bin/bash

# Set the name of the directory to be uploaded
UPLOAD_DIR=$(pwd)'/out'

# Iterate through all files in the directory
for file in $(find "$UPLOAD_DIR" -type f); do
  # Get the file name
  filename=$(basename "$file")

  # Get the subdirectory path and remove the leading "./"
  subdir_path=$(echo "$file" | sed 's|/home/jay-pc/workspace/earnWeb3/ai-nft/front-end/out||')

  # Construct the full file name with the subdirectory path
  full_filename=${subdir_path#'/'}

  # Upload the file to Cloudflare Workers
  curl -X PUT "https://generatenfts.jaimedevelops.workers.dev/$full_filename" --header "X-Custom-Auth-Key: $SECRET" --data-binary "@$file"
done

# unsecretomuysecreto