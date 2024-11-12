pwd
false
sudo apt-get install mailutils

# Get the email address from the Jenkins environment variable
TO_EMAIL=$JENKINS_EMAIL

# Subject and Body of the email
SUBJECT="Build Notification"
BODY="The build process has completed. Please check Jenkins for more details."

echo "Pipeline run completed ! Test results are available at http://localhost/"

# Send the email
echo "$BODY" | mail -s "$SUBJECT" "$TO_EMAIL"