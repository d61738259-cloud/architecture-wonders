# Architecture Wonders — MongoDB Atlas Backup & Disaster Recovery Guide

## 1. Overview
Architecture Wonders utilizes MongoDB Atlas for persistence of projects, incoming client inquiries, custom cost calculator settings, editorial articles, client testimonials, and site content.

This document details the production backup strategy, retention policies, restore workflows, and automated recovery steps.

---

## 2. Backup Strategy Architecture

### A. Continuous Cloud Backups (MongoDB Atlas Native)
In production on MongoDB Atlas (M10+ or dedicated clusters):
* **Point-in-Time Restore (PITR)**: Atlas provides continuous change stream oplog tracking enabling database state restoration to any exact second within the retention window.
* **Scheduled Snapshots**:
  * **Frequency**: Snapshots taken automatically every 6 hours.
  * **Retention Policy**:
    * Daily snapshots retained for 7 days.
    * Weekly snapshots retained for 4 weeks.
    * Monthly snapshots retained for 12 months.
* **Geographic Redundancy**: Multi-region snapshot distribution ensures data availability even in the unlikely event of an AWS/GCP regional outage.

### B. Logical Automated Dump Script (Free / Shared Tier M0/M2/M5)
For Atlas Shared clusters where continuous native backup is not bundled, use the provided automated `mongodump` script.

#### Prerequisites
Install `mongodump` and `mongorestore` from MongoDB Database Tools.

#### Running Backup Script
```bash
# Set your MongoDB Atlas URI
export MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/architecture_wonders"

# Execute logical dump with gzip compression and timestamps
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backups/backup_${TIMESTAMP}"

mongodump --uri="$MONGODB_URI" --gzip --out="$BACKUP_DIR"
echo "Backup saved to: $BACKUP_DIR"
```

---

## 3. Step-by-Step Restoration Procedure

### Scenario 1: Restoring via MongoDB Atlas Cloud Console
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. Navigate to **Database Deployments** and select your cluster (`architecture-wonders-cluster`).
3. Click on the **Backup** tab.
4. Select the desired snapshot or point in time.
5. Choose **Restore Snapshot**:
   * Option A: *Restore to another cluster* (Recommended for testing and verification before production cutover).
   * Option B: *Restore to the current cluster* (Overwrites current database with snapshot state).
6. Confirm the restore action. Atlas completes the restoration within minutes.

### Scenario 2: Restoring via Logical Dump Archive
```bash
# To restore the database from a compressed dump archive
mongorestore --uri="$MONGODB_URI" --gzip --drop ./backups/backup_YYYYMMDD_HHMMSS/
```
*Note*: The `--drop` flag drops existing collections prior to restoration, ensuring clean restoration without duplicate key errors.

---

## 4. Verification & Testing Procedures

Perform regular backup verification every quarter:
1. Restore the latest snapshot to a temporary staging cluster: `architecture_wonders_staging`.
2. Run database integrity checks:
   * Verify document count across collections (`admins`, `projects`, `enquiries`, `calculatorsettings`).
   * Test Admin authentication against the restored collection.
   * Verify Cost Calculator rate settings against standard test cases.
3. Terminate staging cluster after verification passes.
