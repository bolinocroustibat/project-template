#!/bin/sh

generateKey(){
  # random 16 bytes (32 hex symbols)
  openssl rand -hex 16
}

echo "APP_KEYS='$(generateKey),$(generateKey),$(generateKey),$(generateKey)'"
echo "API_TOKEN_SALT='$(generateKey)'"
echo "ADMIN_JWT_SECRET='$(generateKey)'"
echo "JWT_SECRET='$(generateKey)'"