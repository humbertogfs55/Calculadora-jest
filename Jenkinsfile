pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
            post {
                success {
                    echo 'Dependencies installed successfully.'
                }
                failure {
                    echo 'Dependency installation failed.'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
            post {
                success {
                    echo 'Tests passed, proceeding to build the app...'
                }
                failure {
                    echo 'Tests failed, skipping build and notification steps.'
                }
            }
        }

        stage('Notification') {
            steps {
                echo 'Sending notification...'
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
