
# Paperwork Superadmin - (React)


## Installation 💻

Here are the steps to run the project locally.

1. Clone the repository

2. Go to project directory, and install dependencies

    ```bash
    npm install 
    ```

3. Copy and modify file ".env.example "to ".env" or ".env.local"

4. Run the project

    ```bash
    npm run dev
    ```

5. If you want to build the project
    ```bash
    npm run build
    ```


    
## Virtual Host For Local Development (Apache XAMPP) 📜

This configuration is for Windows, if you are using Linux or Mac, i am sorry, please do it yourself :)


1. Add new host in file "C:\Windows\System32\drivers\etc\hosts"

    ```
    127.0.0.1    superadmin.paperwork.local
    ```

2. Install SSL certificate, just double click file "server.key" in folder "ssl\server.key". Make sure you imported to "Local Machine" -> "Trusted Root Certification Authorities"

3. Add new virtual host in file "C:\xampp\apache\conf\extra\httpd-vhosts.conf"

    ```
    <VirtualHost superadmin.paperwork.local:443>
        ServerName superadmin.paperwork.local

        SSLEngine On
        SSLCertificateFile "<YOUR_PATH>\paperwork-app-superadmin-react\ssl\server.crt"
        SSLCertificateKeyFile "<YOUR_PATH>\paperwork-app-superadmin-react\ssl\server.key"

        SSLProxyEngine on
        SSLProxyVerify none 
        SSLProxyCheckPeerCN off
        SSLProxyCheckPeerName off
        SSLProxyCheckPeerExpire off

        ProxyPreserveHost On
        RewriteRule         ^/(.*)      https://127.0.0.1:5003/$1 [P,L]
        ProxyPass           /           https://127.0.0.1:5003/
        ProxyPassReverse    /           https://127.0.0.1:5003/
    </VirtualHost>
    ```

4. Restart apache

5. Test access https://superadmin.paperwork.local (HTTPS)