#!/bin/bash
set -e

SITE=$1
VPS="root@187.124.147.244"

if [ -z "$SITE" ]; then
  echo "Usage: ./scripts/deploy.sh pest-control|plumbing"
  exit 1
fi

case $SITE in
  pest-control)
    REMOTE_DIR="/var/www/pest-control-static"
    ;;
  plumbing)
    REMOTE_DIR="/var/www/plumbing-static"
    ;;
  *)
    echo "Site inconnu: $SITE"
    exit 1
    ;;
esac

echo "→ Build $SITE..."
rm -rf .next out
SITE_SLUG=$SITE npm run build

echo "→ Deploy vers $VPS:$REMOTE_DIR..."
ssh $VPS "rm -rf $REMOTE_DIR/*"
scp -r out/* $VPS:$REMOTE_DIR/

echo "→ Reload Nginx..."
ssh $VPS "systemctl reload nginx"

echo "✓ Deploy $SITE terminé"
