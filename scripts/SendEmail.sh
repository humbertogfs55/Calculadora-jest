#!/bin/bash

# Get the email address from the Jenkins environment variable
TO_EMAIL=$JENKINS_EMAIL

sudo apt-get install mailutils

# Check if the TO_EMAIL is set
if [ -z "$TO_EMAIL" ]; then
    echo "Error: JENKINS_EMAIL environment variable is not set."
    exit 1
fi

# Subject and Body of the email
SUBJECT="Build Notification"
BODY="The build process has completed. Please check Jenkins for more details."

echo "Pipeline run completed! Test results are available at http://localhost/"

# Send the email and check if it was successful
echo "$BODY" | mail -s "$SUBJECT" "$TO_EMAIL"
if [ $? -eq 0 ]; then
    echo "Email sent successfully to $TO_EMAIL."
else
    echo "Failed to send email to $TO_EMAIL."
    exit 1
fi
