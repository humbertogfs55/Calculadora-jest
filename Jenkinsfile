pipeline {
    agent any

    stages {
        stage('Notification') {
            steps {
                echo 'Sending notification...'
                echo 'ls'
                sh '''
                   cd scripts
                   chmod 775 *
                   ./SendEmail.sh
                   '''
            }
            post {
                success {
                    echo 'Notification sent successfully.'
                }
                failure {
                    echo 'Notification failed.'
                }
            }
        }
    }
}
