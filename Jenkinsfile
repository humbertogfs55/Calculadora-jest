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

        stage('Build Electron App') {
            steps {
                echo 'Building Electron app...'
                sh 'npm run build'
            }
            post {
                success {
                    echo 'Build successful, proceeding to notification...'
                }
                failure {
                    echo 'Build failed, skipping notification step.'
                }
            }
        }

        stage('Notification') {
            steps {
                echo 'Sending notification...'
                sh 'ls'
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

        stage('Publish Artifacts') {
            steps {
                echo 'Publishing artifacts...'
                archiveArtifacts artifacts: 'build/*.exe', allowEmptyArchive: true
                archiveArtifacts artifacts: 'test-results/*.xml', allowEmptyArchive: true
            }
            post {
                success {
                    echo 'Artifacts published successfully.'
                }
                failure {
                    echo 'Artifact publishing failed.'
                }
            }
        }
    }
}
