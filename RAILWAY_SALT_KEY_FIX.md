# Railway LITELLM_SALT_KEY Decryption Error Fix

## Error

```
Error decrypting value for key: model, Did your master_key/salt key change recently?
Decryption failed. Ciphertext failed verification
```

## Root Cause

The `LITELLM_SALT_KEY` in Railway doesn't match the key that was used to encrypt the data in your database.

## Critical Understanding

⚠️ **LITELLM_SALT_KEY encrypts sensitive data in the database:**
- API keys
- Model configurations
- Credentials

Once data is encrypted with a salt key, you **MUST** use the same key to decrypt it. If you change the key, all encrypted data becomes unreadable.

## Solution Options

### Option 1: Find the Original Salt Key (BEST)

The database was encrypted with a specific salt key. You need to find it.

**Check these locations:**

1. **Gitpod Environment Variables:**
   - If you were using Gitpod before Railway
   - Check Gitpod workspace environment variables
   - Look for `LITELLM_SALT_KEY`

2. **Local .env File:**
   ```bash
   cat .env | grep LITELLM_SALT_KEY
   ```
   Current value: `sk-1234567890abcdef1234567890abcdef`

3. **Previous Deployment:**
   - If you migrated from another platform
   - Check that platform's environment variables

4. **Git History:**
   ```bash
   git log --all --full-history --source -- .env
   ```

**Once you find the original key, set it in Railway:**
```bash
LITELLM_SALT_KEY=<original-key-here>
```

### Option 2: Clear Database and Start Fresh (DESTRUCTIVE)

If you can't find the original salt key, you must clear the encrypted data.

⚠️ **WARNING: This will delete all models, API keys, and configurations from the database!**

**Steps:**

1. **Connect to Railway Postgres:**
   ```bash
   railway connect postgres
   ```

2. **Delete encrypted data:**
   ```sql
   -- Delete all models
   DELETE FROM "LiteLLM_ModelTable";
   
   -- Delete all verification tokens (API keys)
   DELETE FROM "LiteLLM_VerificationToken";
   
   -- Delete all user data
   DELETE FROM "LiteLLM_UserTable";
   
   -- Delete all team data
   DELETE FROM "LiteLLM_TeamTable";
   
   -- Verify tables are empty
   SELECT COUNT(*) FROM "LiteLLM_ModelTable";
   SELECT COUNT(*) FROM "LiteLLM_VerificationToken";
   ```

3. **Set a NEW salt key in Railway:**
   ```bash
   # Generate a new secure key
   echo "sk-$(openssl rand -hex 32)"
   
   # Example output: sk-a1b2c3d4e5f6...
   ```

4. **Add the NEW key to Railway:**
   ```bash
   LITELLM_SALT_KEY=sk-<your-new-generated-key>
   ```

5. **Restart Railway service**

6. **Re-add your models through the UI**

### Option 3: Use Unencrypted Storage (NOT RECOMMENDED)

You can disable encryption, but this is **insecure** for production.

Add to Railway environment variables:
```bash
LITELLM_DISABLE_ENCRYPTION=True
```

⚠️ **Security Risk:** API keys and credentials will be stored in plain text in the database.

## How to Verify the Fix

After setting the correct salt key:

1. **Check Railway logs:**
   ```bash
   railway logs --follow
   ```
   
   Should NOT see decryption errors anymore.

2. **Test model listing:**
   ```bash
   curl https://anos-production.up.railway.app/v1/models \
     -H "Authorization: Bearer sk-1234"
   ```

3. **Test the UI:**
   - Go to Models page
   - Should see your models without errors

## Prevention for Future

1. **Document your salt key securely:**
   - Store in password manager
   - Keep backup in secure location
   - NEVER commit to git

2. **Use the same salt key everywhere:**
   - Development
   - Staging
   - Production (if using same database)

3. **Set it once and never change it:**
   - Changing the salt key breaks all encrypted data
   - If you must change it, you must re-encrypt all data

## Current Situation Analysis

Based on your error, here's what likely happened:

1. ✅ Database was created and data was encrypted with Salt Key A
2. ❌ Railway is now using Salt Key B (different from A)
3. ❌ Railway cannot decrypt data encrypted with Salt Key A

**You need to either:**
- Find Salt Key A and use it in Railway
- OR clear the database and start fresh with a new salt key

## Recommended Action

**If you have important data in the database:**
→ Find the original salt key (check Gitpod, local .env, previous deployments)

**If the database is new/test data:**
→ Clear the database and generate a new salt key

## Questions to Answer

1. Where was this database originally used? (Gitpod? Local? Other?)
2. Do you have access to that environment's variables?
3. Is the data in the database important, or can you start fresh?

Once you answer these, we can proceed with the correct fix.
