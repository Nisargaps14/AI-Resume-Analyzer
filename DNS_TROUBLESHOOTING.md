# 🔧 DNS Troubleshooting Guide

## ⚠️ Current Error: "Domain's DNS record could not be retrieved"

This error means GitHub Pages cannot find or verify your DNS configuration.

## 📋 **Immediate Steps to Fix:**

### **1. Verify DNS Configuration**
**Your DNS should have:**
```
Type: CNAME
Name/Host: @
Value/Points to: nisargaps14.github.io
TTL: 3600
```

### **2. Check DNS Propagation Status**
Use these tools to verify your DNS:
- **https://www.whatsmydns.net/** - Enter smart-resume-tools.com
- **https://dnschecker.org/** - Free DNS lookup tool
- **https://www.nslookup.io/** - Simple DNS verification

### **3. Common Issues & Solutions**

#### **Issue: DNS Not Propagated**
**Symptoms:**
- "DNS record could not be retrieved"
- "InvalidDNSError" in GitHub Pages
- Site works on GitHub.io but not custom domain

**Solutions:**
1. **Wait longer**: DNS can take 15-48 hours to propagate
2. **Check from different locations**: Use mobile data vs WiFi
3. **Clear local DNS cache**:
   - Windows: `ipconfig /flushdns`
   - Mac: `sudo dscacheutil -flushcache`
   - Linux: `sudo systemctl restart systemd-resolved`

#### **Issue: Incorrect CNAME Value**
**Symptoms:**
- DNS exists but points to wrong location
- GitHub Pages shows DNS error

**Solutions:**
1. **Verify exact value**: Must be `nisargaps14.github.io` (no trailing slash)
2. **Case sensitivity**: DNS is case-insensitive but be precise
3. **No extra characters**: No http:// or https:// prefix

#### **Issue: Conflicting Records**
**Symptoms:**
- Both A record and CNAME for @
- Multiple CNAME records
- Wildcard conflicts

**Solutions:**
1. **Remove A records**: Delete any A records for @
2. **Single CNAME**: Only one CNAME record for @
3. **Check subdomains**: Ensure www doesn't conflict

## 🛠️ **Step-by-Step Fix Process**

### **Step 1: Verify Current Status**
1. Go to: https://github.com/Nisargaps14/AI-Resume-Analyzer/settings/pages
2. Check "Custom domain" section
3. Note any error messages

### **Step 2: DNS Provider Check**
1. Login to your domain registrar (GoDaddy, Namecheap, etc.)
2. Navigate to DNS management
3. Verify CNAME record exists and points correctly

### **Step 3: Make Corrections**
1. Update CNAME to: `nisargaps14.github.io`
2. Set TTL to: 3600 (or default)
3. Remove any conflicting A records
4. Save changes

### **Step 4: Wait and Test**
1. **Wait 15-30 minutes** after changes
2. **Test DNS**: Use https://www.whatsmydns.net/
3. **Check GitHub Pages**: Refresh settings page
4. **Try accessing**: https://smart-resume-tools.com

## 📱 **Alternative Solutions**

### **Option 1: Use www Subdomain**
If @ record causes issues:
```
Type: CNAME
Name/Host: www
Value/Points to: nisargaps14.github.io
```
Then access: https://www.smart-resume-tools.com

### **Option 2: Temporary GitHub Pages**
While DNS propagates:
- Use: https://nisargaps14.github.io/AI-Resume-Analyzer/
- Full functionality available
- Switch to custom domain once DNS works

### **Option 3: Different Domain**
If issues persist:
- Try a different domain name
- Some domains have propagation delays
- Consider domain registrar reputation

## 📞 **Get Help**

### **Domain Provider Support**
- **GoDaddy**: 480-463-8800
- **Namecheap**: 66-444-9870
- **Google Domains**: 855-836-3987

### **GitHub Pages Status**
- Check: https://www.githubstatus.com/
- Report issues: https://github.com/contact

### **Community Support**
- GitHub Discussions: https://github.com/Nisargaps14/AI-Resume-Analyzer/discussions
- Stack Overflow: Tag with github-pages

## ⏱️ **Timeline Expectations**

- **15 minutes**: Initial DNS propagation
- **1 hour**: Most DNS updates visible
- **4-6 hours**: Full propagation for most domains
- **24-48 hours**: Worst-case propagation time

## 🎯 **Success Indicators**

✅ **DNS resolves correctly** to nisargaps14.github.io  
✅ **GitHub Pages shows** "Your site is published"  
✅ **Custom domain loads** your AI Resume Analyzer  
✅ **HTTPS works** with valid certificate  
✅ **All features function** properly  

---

**If you continue having issues, tell me the specific error message and I'll help troubleshoot further!** 🚀
